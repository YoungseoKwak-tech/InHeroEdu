// SelfSynchronization Three.js scene.
//
// Owns the renderer, camera, character (procedural primitives),
// background elements (aura, particles, seam, ground glow), and
// the requestAnimationFrame loop. Exposes startFocus() and a
// strict dispose() for hot-reload safety.

import * as THREE from "three";
import {
  splitVertex,
  splitFragment,
  particleVertex,
  particleFragment,
  seamVertex,
  seamFragment,
  auraVertex,
  auraFragment,
} from "./shaders";
import type { SyncSceneOptions } from "./types";

const BREATH_SPEED = 0.7;
const IDLE_SWAY_FREQ = 0.4;
const BLINK_INTERVAL_MIN = 2.5;
const BLINK_INTERVAL_MAX = 6.5;
const BLINK_DURATION = 0.18;
const GLITCH_INTERVAL_MIN = 3;
const GLITCH_INTERVAL_MAX = 7;
const FOCUS_DURATION_REAL = 25 * 60; // seconds
const FOCUS_DURATION_DEMO = 2.5;
const COMPLETION_PULSE_DURATION = 2.5;
const SYNC_BUMP_PER_FOCUS = 6;

const COLOR_SKIN  = new THREE.Color("#e8c4a8");
const COLOR_HAIR  = new THREE.Color("#4a2f25");
const COLOR_SHIRT = new THREE.Color("#f5f0e8");
const COLOR_PANTS = new THREE.Color("#3a3550");

// TODO: swap — when a Ready-Player-Me-style .glb is ready, comment
// out _buildCharacter() and load a GLTF model at this insertion
// point. The split shader can still be applied by traversing the
// loaded scene and replacing each Mesh.material with a
// makeSplitMat() instance keyed off the original material's color.

export class SyncScene {
  private readonly canvas: HTMLCanvasElement;
  private readonly container: HTMLDivElement;
  private readonly opts: SyncSceneOptions;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  // Character + groups
  private charGroup!: THREE.Group;
  private headGroup!: THREE.Group;
  private leftEye!: THREE.Mesh;
  private rightEye!: THREE.Mesh;
  private rightEyeGlow!: THREE.Mesh;
  private mouth!: THREE.Mesh;

  // Shared uniforms across every body material.
  private uTime = { value: 0 };
  private uSync = { value: 0.08 };
  private uCompletion = { value: 0 };
  private uGlitch = { value: 0 };
  private splitMats: THREE.ShaderMaterial[] = [];

  // Background pieces
  private auraMat!: THREE.ShaderMaterial;
  private seamMat!: THREE.ShaderMaterial;
  private seamMesh!: THREE.Mesh;
  private particleMat!: THREE.ShaderMaterial;
  private particleGeo!: THREE.BufferGeometry;
  private uParticleTime = { value: 0 };
  private uPixelRatio = { value: 1 };

  // State / animation timers
  private raf = 0;
  private clock = new THREE.Clock();
  private startTime = 0;
  private targetSync: number; // 0–100
  private displayedSync: number; // 0–100, smoothed
  private demoPulseAt = 0;
  private demoFlickerEvery = 2.5;
  private mouse = { x: 0, y: 0 };
  private smoothedMouse = { x: 0, y: 0 };
  private nextBlinkAt = 1.5;
  private blinkUntil = 0;
  private blinkProgress = 0; // 0–1 during a blink
  private nextGlitchAt = 0;
  private glitchUntil = 0;
  private inFocus = false;
  private focusStartedAt = 0;
  private completionStartedAt = 0;
  private prefersReducedMotion = false;
  private isPaused = false;
  private intersectionVisible = true;

  // Listeners (kept for dispose).
  private onResize = () => { this._resize(); };
  private onMouse = (e: MouseEvent) => {
    const rect = this.container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.mouse.x = Math.max(-1, Math.min(1, x));
    this.mouse.y = Math.max(-1, Math.min(1, y));
  };
  private onVisibility = () => { this.isPaused = document.hidden; };
  private io: IntersectionObserver | null = null;
  private mqReduced: MediaQueryList | null = null;
  private onMqChange = () => { this.prefersReducedMotion = !!this.mqReduced?.matches; };
  private onCtaClick = () => { this.startFocus(); };

  constructor(opts: SyncSceneOptions) {
    this.canvas = opts.canvas;
    this.container = opts.container;
    this.opts = opts;
    this.targetSync = opts.initialSync;
    this.displayedSync = opts.initialSync;

    this._initRenderer();
    this._buildLights();
    this._buildCharacter();
    this._buildBackground();
    this._setupEvents();
    this._resize();

    if (opts.startBtn) opts.startBtn.addEventListener("click", this.onCtaClick);
    this.raf = requestAnimationFrame(this._tick);
  }

  // ── public surface ────────────────────────────────────────────

  public startFocus() {
    if (this.inFocus) return;
    this.inFocus = true;
    this.focusStartedAt = this.clock.getElapsedTime();
    if (this.opts.startBtn) {
      this.opts.startBtn.textContent = "SYNCHRONIZING";
      this.opts.startBtn.style.opacity = "0.5";
      this.opts.startBtn.style.pointerEvents = "none";
    }
    this.opts.onFocusStart?.();
  }

  public dispose() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    this.container.removeEventListener("mousemove", this.onMouse);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.io?.disconnect();
    this.mqReduced?.removeEventListener("change", this.onMqChange);
    if (this.opts.startBtn) {
      this.opts.startBtn.removeEventListener("click", this.onCtaClick);
    }
    this.scene.traverse((obj) => {
      const m = obj as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) mat.dispose();
    });
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }

  // ── setup ─────────────────────────────────────────────────────

  private _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    // Pulled back so the upper body occupies ~60% of viewport
    // height instead of filling it. lookAt aimed at chest level
    // (y=0.9) so the head sits in the upper third.
    this.camera.position.set(0, 1.2, 6.8);
    this.camera.lookAt(0, 0.9, 0);

    this.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
  }

  private _buildLights() {
    // The split shader does its own lighting math, but we keep a
    // dim ambient + one fill light for any meshes that fall back
    // to MeshBasic/Standard (eyes, mouth) so they aren't pitch black.
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const fill = new THREE.DirectionalLight(0xaab0ff, 0.35);
    fill.position.set(-2, 3, 4);
    this.scene.add(fill);
  }

  // Factory for a shader material that participates in the split.
  private _makeSplitMat(color: THREE.Color): THREE.ShaderMaterial {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       this.uTime,
        uSync:       this.uSync,
        uCompletion: this.uCompletion,
        uGlitch:     this.uGlitch,
        uBaseColor:  { value: color },
      },
      vertexShader:   splitVertex,
      fragmentShader: splitFragment,
      transparent: false,
    });
    this.splitMats.push(mat);
    return mat;
  }

  private _buildCharacter() {
    this.charGroup = new THREE.Group();
    this.charGroup.position.set(0, 0.0, 0);
    this.scene.add(this.charGroup);

    const skinMat  = this._makeSplitMat(COLOR_SKIN);
    const hairMat  = this._makeSplitMat(COLOR_HAIR);
    const clothMat = this._makeSplitMat(COLOR_SHIRT);
    const pantsMat = this._makeSplitMat(COLOR_PANTS);

    // ── HEAD ─────────────────────────────────────────────────
    this.headGroup = new THREE.Group();
    this.headGroup.position.y = 1.55;
    this.charGroup.add(this.headGroup);

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.32, 48, 48), skinMat);
    skull.scale.set(0.92, 1.08, 0.95);
    this.headGroup.add(skull);

    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), skinMat);
    jaw.scale.set(0.95, 0.7, 0.85);
    jaw.position.set(0, -0.20, 0.02);
    this.headGroup.add(jaw);

    // Nose: cone pushed forward through the skull face plane (z=0.30).
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 16), skinMat);
    nose.rotation.x = Math.PI;
    nose.position.set(0, -0.05, 0.33);
    this.headGroup.add(nose);

    // Ears: at the equator of the skull, slightly wider than the
    // half-width so they read at the side of the head.
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.05, 20, 20), skinMat);
      ear.scale.set(0.5, 1.1, 0.8);
      ear.position.set(0.32 * sx, 0, 0);
      this.headGroup.add(ear);
    }

    // ── HAIR ─────────────────────────────────────────────────
    // Cap: half-dome that stops well above the face plane so it
    // doesn't read as a helmet. theta_length 0.55π lifts the
    // hairline above the forehead.
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.55),
      hairMat,
    );
    hairCap.scale.set(1.0, 1.0, 1.05);
    hairCap.position.y = 0.05;
    this.headGroup.add(hairCap);

    // Single swept-forward bang on the LEFT (asymmetric, gives
    // the face direction without floating tufts in front).
    const bang = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), hairMat);
    bang.scale.set(1.8, 0.4, 0.5);
    bang.position.set(-0.05, 0.22, 0.28);
    bang.rotation.set(-0.15, 0, 0.3);
    this.headGroup.add(bang);

    // Side hair strands — frame the cheeks.
    for (const sx of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 20), hairMat);
      side.scale.set(0.5, 1.8, 0.6);
      side.position.set(0.30 * sx, -0.10, 0.05);
      this.headGroup.add(side);
    }
    // Back hair deliberately removed — let the upper-body
    // silhouette breathe. Re-add later if hairstyle gains length.

    // ── EYES ─────────────────────────────────────────────────
    // Bigger PlaneGeometry per spec — 0.20 × 0.18. LEFT is dim/
    // half-closed (baseline scale.y 0.45). RIGHT is bright with a
    // violet glow ring behind it.
    const leftEyeMat = new THREE.MeshBasicMaterial({ color: 0x2a2025, transparent: true, opacity: 0.55 });
    this.leftEye = new THREE.Mesh(new THREE.PlaneGeometry(0.20, 0.18), leftEyeMat);
    this.leftEye.position.set(-0.11, 0.02, 0.30);
    this.leftEye.scale.y = 0.45;
    this.headGroup.add(this.leftEye);

    const rightEyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.rightEye = new THREE.Mesh(new THREE.PlaneGeometry(0.20, 0.18), rightEyeMat);
    this.rightEye.position.set(0.11, 0.02, 0.30);
    this.headGroup.add(this.rightEye);

    const rightEyeGlowMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.45 });
    this.rightEyeGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.22), rightEyeGlowMat);
    this.rightEyeGlow.position.set(0.11, 0.02, 0.298);
    this.headGroup.add(this.rightEyeGlow);

    // Eyebrows just above each eye.
    const browLMat = new THREE.MeshBasicMaterial({ color: 0x2a2025, transparent: true, opacity: 0.5 });
    const browL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.02), browLMat);
    browL.position.set(-0.11, 0.13, 0.30);
    browL.rotation.z = 0.15;
    this.headGroup.add(browL);
    const browRMat = new THREE.MeshBasicMaterial({ color: 0x3a2418 });
    const browR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.02), browRMat);
    browR.position.set(0.11, 0.13, 0.30);
    browR.rotation.z = -0.1;
    this.headGroup.add(browR);

    // Mouth (scale.y animates 0.3 → 2.7 on completion = "oh shit").
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0xb84656 });
    this.mouth = new THREE.Mesh(new THREE.SphereGeometry(0.04, 20, 16), mouthMat);
    this.mouth.scale.set(1.4, 0.3, 0.5);
    this.mouth.position.set(0, -0.16, 0.30);
    this.headGroup.add(this.mouth);

    // Right-side blush — pulled out a touch further so it reads.
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xff9999, transparent: true, opacity: 0.35 });
    const blush = new THREE.Mesh(new THREE.CircleGeometry(0.05, 24), blushMat);
    blush.position.set(0.16, -0.10, 0.29);
    this.headGroup.add(blush);

    // ── NECK ─────────────────────────────────────────────────
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.18, 24), skinMat);
    neck.position.y = 1.25;
    this.charGroup.add(neck);

    // ── TORSO ────────────────────────────────────────────────
    // Hourglass profile: narrow at shoulders, chest taper, waist
    // pinch, hip widens slightly. Replaces the prior "refrigerator
    // block" lathe points.
    const torsoProfile = [
      new THREE.Vector2(0.001,  0.40),
      new THREE.Vector2(0.32,   0.40),  // shoulders narrower
      new THREE.Vector2(0.40,   0.20),  // taper to chest
      new THREE.Vector2(0.38,   0.0),
      new THREE.Vector2(0.36,  -0.25),  // waist pinch
      new THREE.Vector2(0.40,  -0.50),  // hip widens slightly
      new THREE.Vector2(0.001, -0.50),
    ];
    const torso = new THREE.Mesh(new THREE.LatheGeometry(torsoProfile, 48), clothMat);
    torso.position.y = 0.55;
    this.charGroup.add(torso);

    // Collar
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.025, 12, 32, Math.PI),
      clothMat,
    );
    collar.position.set(0, 1.1, 0.05);
    collar.rotation.x = -0.3;
    this.charGroup.add(collar);

    // ── ARMS ─────────────────────────────────────────────────
    // All ~35% slimmer than v1 + brought closer to the body so
    // they don't read as Doraemon arms.
    for (const sx of [-1, 1]) {
      const armGroup = new THREE.Group();
      armGroup.position.set(0.42 * sx, 1.0, 0);
      armGroup.rotation.z = 0.15 * sx;
      this.charGroup.add(armGroup);

      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), clothMat);
      armGroup.add(shoulder);
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.45, 20), clothMat);
      upper.position.y = -0.28;
      armGroup.add(upper);
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 20), skinMat);
      elbow.position.y = -0.52;
      armGroup.add(elbow);
      const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.42, 20), skinMat);
      fore.position.y = -0.75;
      armGroup.add(fore);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 20), skinMat);
      hand.scale.set(0.85, 1.25, 0.55);
      hand.position.y = -1.0;
      armGroup.add(hand);

      armGroup.userData.armSide = sx;
      armGroup.name = sx < 0 ? "armLeft" : "armRight";
    }

    // ── LOWER BODY (pants) ───────────────────────────────────
    const pantsProfile = [
      new THREE.Vector2(0.001, 0.0),
      new THREE.Vector2(0.45, -0.05),
      new THREE.Vector2(0.5,  -0.3),
      new THREE.Vector2(0.42, -0.6),
      new THREE.Vector2(0.32, -1.0),
      new THREE.Vector2(0.28, -1.3),
      new THREE.Vector2(0.001,-1.35),
    ];
    const pants = new THREE.Mesh(new THREE.LatheGeometry(pantsProfile, 36), pantsMat);
    pants.position.y = 0.0;
    this.charGroup.add(pants);
  }

  private _buildBackground() {
    // ── AURA (behind right side) ─────────────────────────────
    const auraGeo = new THREE.PlaneGeometry(5.5, 6.5, 1, 1);
    this.auraMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       this.uTime,
        uSync:       this.uSync,
        uCompletion: this.uCompletion,
      },
      vertexShader:   auraVertex,
      fragmentShader: auraFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const aura = new THREE.Mesh(auraGeo, this.auraMat);
    aura.position.set(0, 0.5, -0.8);
    this.scene.add(aura);

    // ── SEAM (vertical energy strip) ─────────────────────────
    const seamGeo = new THREE.PlaneGeometry(0.05, 4, 1, 1);
    this.seamMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       this.uTime,
        uCompletion: this.uCompletion,
      },
      vertexShader:   seamVertex,
      fragmentShader: seamFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const seam = new THREE.Mesh(seamGeo, this.seamMat);
    seam.position.set(0, 0.5, 0.6);
    seam.userData.isSeam = true;
    // Stash a handle for the RAF loop — moves the seam's X each
    // frame based on uSync so the strip visually tracks the split.
    this.seamMesh = seam;
    this.scene.add(seam);

    // ── GROUND GLOW ──────────────────────────────────────────
    const groundGeo = new THREE.PlaneGeometry(4.5, 1.2, 1, 1);
    const groundMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       this.uTime,
        uSync:       this.uSync,
        uCompletion: this.uCompletion,
      },
      vertexShader:   auraVertex,
      fragmentShader: auraFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.4;
    this.scene.add(ground);

    // ── PARTICLES ────────────────────────────────────────────
    // 100 sparks instead of 200 — keeps the scene quiet, less
    // Disney-intro bokeh. Their size is also clamped in the shader
    // (gl_PointSize capped at 8px on average).
    const COUNT = 100;
    const positions = new Float32Array(COUNT * 3);
    const aSpeed = new Float32Array(COUNT);
    const aSide = new Float32Array(COUNT);
    const aSize = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const sideSign = Math.random() < 0.55 ? 1 : -1; // bias toward right
      const x = sideSign * (0.05 + Math.random() * 1.6);
      const y = (Math.random() * 4) - 1.5;
      const z = (Math.random() - 0.5) * 1.6 + 0.2;
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      aSpeed[i] = 0.3 + Math.random() * 0.8;
      aSide[i]  = sideSign;
      aSize[i]  = 1 + Math.random() * 2.5;
    }
    this.particleGeo = new THREE.BufferGeometry();
    this.particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.particleGeo.setAttribute("aSpeed",   new THREE.BufferAttribute(aSpeed, 1));
    this.particleGeo.setAttribute("aSide",    new THREE.BufferAttribute(aSide, 1));
    this.particleGeo.setAttribute("aSize",    new THREE.BufferAttribute(aSize, 1));
    this.particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       this.uTime,
        uCompletion: this.uCompletion,
        uPixelRatio: this.uPixelRatio,
      },
      vertexShader:   particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(this.particleGeo, this.particleMat);
    this.scene.add(particles);
  }

  private _setupEvents() {
    window.addEventListener("resize", this.onResize);
    this.container.addEventListener("mousemove", this.onMouse);
    document.addEventListener("visibilitychange", this.onVisibility);

    // Pause when off-screen.
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          this.intersectionVisible = e.isIntersecting;
        }
      },
      { threshold: 0.05 },
    );
    this.io.observe(this.container);

    // Reduced motion.
    if (typeof window.matchMedia === "function") {
      this.mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.prefersReducedMotion = this.mqReduced.matches;
      this.mqReduced.addEventListener("change", this.onMqChange);
    }
  }

  private _resize() {
    const { clientWidth: w, clientHeight: h } = this.container;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // Mobile narrows the FOV up.
    this.camera.fov = w < 640 ? 32 : 28;
    if (w < 640) this.charGroup.scale.setScalar(0.85);
    else this.charGroup.scale.setScalar(1.0);
    this.camera.updateProjectionMatrix();
    this.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
  }

  // ── RAF loop ──────────────────────────────────────────────────

  private _tick = () => {
    this.raf = requestAnimationFrame(this._tick);
    if (this.isPaused || !this.intersectionVisible) return;

    const t = this.clock.getElapsedTime();
    const dt = Math.min(0.05, t - this.uTime.value || 0.016);
    this.uTime.value = t;

    // ── Demo loop oscillation when no focus is running ─────
    if (!this.inFocus && !this.prefersReducedMotion) {
      if (t > this.demoPulseAt) {
        this.demoPulseAt = t + this.demoFlickerEvery;
      }
      const wave = Math.sin(t * 0.4) * 1.5;
      this.targetSync = this.opts.initialSync + wave;
    }

    // ── Smooth displayed sync toward target ────────────────
    this.displayedSync += (this.targetSync - this.displayedSync) * Math.min(1, dt * 4);
    this.uSync.value = this._clamp01(this.displayedSync / 100);

    // ── Update sync label in HUD ───────────────────────────
    if (this.opts.syncLabel) {
      const next = Math.round(this.displayedSync);
      if (this.opts.syncLabel.textContent !== String(next)) {
        this.opts.syncLabel.textContent = String(next);
      }
    }

    // ── Glitch pulses on LEFT side ─────────────────────────
    if (!this.prefersReducedMotion && t > this.nextGlitchAt) {
      this.glitchUntil = t + 0.12 + Math.random() * 0.15;
      this.nextGlitchAt = t +
        GLITCH_INTERVAL_MIN + Math.random() * (GLITCH_INTERVAL_MAX - GLITCH_INTERVAL_MIN);
    }
    this.uGlitch.value = t < this.glitchUntil ? 1.0 : 0.0;

    // ── Blink ──────────────────────────────────────────────
    if (!this.prefersReducedMotion && t > this.nextBlinkAt) {
      this.blinkUntil = t + BLINK_DURATION;
      this.nextBlinkAt = t +
        BLINK_INTERVAL_MIN + Math.random() * (BLINK_INTERVAL_MAX - BLINK_INTERVAL_MIN);
    }
    // 0 = open, 1 = closed
    if (t < this.blinkUntil) {
      const k = 1 - (this.blinkUntil - t) / BLINK_DURATION;
      this.blinkProgress = Math.sin(k * Math.PI); // smooth in/out
    } else {
      this.blinkProgress = 0;
    }
    // Left eye stays mostly closed (baseline 0.45 scale.y → 0 on blink).
    const leftBase = 0.45;
    this.leftEye.scale.y = Math.max(0.02, leftBase * (1 - this.blinkProgress));
    // Right eye is wide (1.0 → 0 on blink).
    const rEyeY = Math.max(0.02, 1 - this.blinkProgress);
    this.rightEye.scale.y = rEyeY;
    this.rightEyeGlow.scale.y = rEyeY;

    // ── Idle sway: arms + head ─────────────────────────────
    if (!this.prefersReducedMotion) {
      const sway = Math.sin(t * IDLE_SWAY_FREQ) * 0.03;
      this.charGroup.children.forEach((c) => {
        if (c.name === "armLeft")  c.rotation.z = 0.15 - sway;
        if (c.name === "armRight") c.rotation.z = -0.15 + sway;
      });
    }

    // ── Mouse parallax (smoothed) ──────────────────────────
    this.smoothedMouse.x += (this.mouse.x - this.smoothedMouse.x) * 0.07;
    this.smoothedMouse.y += (this.mouse.y - this.smoothedMouse.y) * 0.07;
    // Camera breathing offset (small).
    const camBreatheX = this.prefersReducedMotion ? 0 : Math.sin(t * 0.18) * 0.06;
    const camBreatheY = this.prefersReducedMotion ? 0 : Math.sin(t * 0.13) * 0.04;
    this.camera.position.x = camBreatheX + this.smoothedMouse.x * 0.1;
    this.camera.position.y = 1.2 + camBreatheY + this.smoothedMouse.y * 0.06;

    // Head subtly tracks mouse.
    if (!this.prefersReducedMotion) {
      this.headGroup.rotation.y = this.smoothedMouse.x * 0.18;
      this.headGroup.rotation.x = -this.smoothedMouse.y * 0.1;
    }

    // Move seam X based on uSync (matches splitX in fragment).
    if (this.seamMesh) {
      this.seamMesh.position.x = -(this.uSync.value - 0.08) * 1.5;
    }

    // ── Focus countdown ────────────────────────────────────
    if (this.inFocus && this.completionStartedAt === 0) {
      const focusDur = this.opts.demoMode ? FOCUS_DURATION_DEMO : FOCUS_DURATION_REAL;
      const elapsed = t - this.focusStartedAt;
      const remaining = Math.max(0, focusDur - elapsed);
      if (this.opts.countdownLabel) {
        if (!this.opts.demoMode) {
          const mm = Math.floor(remaining / 60).toString().padStart(2, "0");
          const ss = Math.floor(remaining % 60).toString().padStart(2, "0");
          this.opts.countdownLabel.textContent = `${mm}:${ss}`;
        } else {
          this.opts.countdownLabel.textContent = remaining.toFixed(1) + "s";
        }
      }
      if (elapsed >= focusDur) this._triggerCompletion();
    }

    // ── Completion cinematic ───────────────────────────────
    if (this.completionStartedAt > 0) {
      const since = t - this.completionStartedAt;
      // Camera zoom in then out.
      const camPulse = since < 0.7
        ? (since / 0.7)
        : 1 - ((since - 0.7) / (COMPLETION_PULSE_DURATION - 0.7));
      const z = 5.2 - 0.3 * Math.max(0, Math.min(1, camPulse));
      this.camera.position.z = z;
      // uCompletion falls off quadratically over the pulse duration.
      const u = Math.max(0, 1 - since / COMPLETION_PULSE_DURATION);
      this.uCompletion.value = u * u;
      // Mouth opens then closes.
      const mouthBoost = since < 0.4
        ? since / 0.4
        : Math.max(0, 1 - (since - 0.4) / 0.8);
      this.mouth.scale.y = 0.3 + mouthBoost * 2.4;

      if (since >= COMPLETION_PULSE_DURATION) {
        this.uCompletion.value = 0;
        this.completionStartedAt = 0;
        this.camera.position.z = 5.2;
        this.mouth.scale.y = 0.3;
        // Restore CTA after the cinematic ends.
        if (this.opts.startBtn) {
          this.opts.startBtn.textContent = "▶ START FOCUS";
          this.opts.startBtn.style.opacity = "1";
          this.opts.startBtn.style.pointerEvents = "auto";
        }
      }
    }

    this.camera.lookAt(0, 0.9, 0);
    this.renderer.render(this.scene, this.camera);
  };

  // ── Completion: flash, shockwave, popup, sync bump ────────────

  private _triggerCompletion() {
    this.inFocus = false;
    this.completionStartedAt = this.clock.getElapsedTime();
    this.targetSync = Math.min(100, this.targetSync + SYNC_BUMP_PER_FOCUS);

    this._playFlash();
    this._playShock();
    this._playPopup();

    this.opts.onFocusComplete?.(this.targetSync);
  }

  private _playFlash() {
    const el = this.opts.flashEl;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "1";
    // next frame, ease out to 0 over 1.35s
    requestAnimationFrame(() => {
      el.style.transition = "opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "0";
    });
  }

  private _playShock() {
    const el = this.opts.shockEl;
    if (!el) return;
    el.style.transition = "none";
    el.style.transform = "scale(0)";
    el.style.opacity = "1";
    requestAnimationFrame(() => {
      el.style.transition = "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.4s ease-out";
      el.style.transform = "scale(40)";
      el.style.opacity = "0";
    });
  }

  private _playPopup() {
    const el = this.opts.popupEl;
    if (!el) return;
    el.textContent = `+${SYNC_BUMP_PER_FOCUS}%`;
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translate(-50%, 0)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 1.8s ease-out, transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translate(-50%, -80px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.6s ease-in";
        el.style.opacity = "0";
      }, 1200);
    });
  }

  private _clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
}
