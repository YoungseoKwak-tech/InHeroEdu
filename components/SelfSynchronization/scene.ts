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
  eyeVertex,
  eyeFragment,
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
    // Smaller head + 6.5x body ratio lets the camera move slightly
    // closer; lookAt aimed at chest (y=0.7) shows the full upper
    // body including hands.
    this.camera.position.set(0, 0.9, 5.8);
    this.camera.lookAt(0, 0.7, 0);

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
    // Subtle weight-shift lean — keeps the figure from reading as
    // a stiff action figure.
    this.charGroup.position.set(0.02, 0.0, 0);
    this.scene.add(this.charGroup);

    const skinMat  = this._makeSplitMat(COLOR_SKIN);
    const hairMat  = this._makeSplitMat(COLOR_HAIR);
    const clothMat = this._makeSplitMat(COLOR_SHIRT);
    const pantsMat = this._makeSplitMat(COLOR_PANTS);

    // ── HEAD ─────────────────────────────────────────────────
    // Head smaller (radius 0.26, was 0.32) and shifted down so
    // the head:body ratio reads ~1:6.5 instead of 1:3 (Mii-mode).
    this.headGroup = new THREE.Group();
    this.headGroup.position.y = 1.40;
    this.headGroup.rotation.z = -0.03; // tiny natural tilt
    this.charGroup.add(this.headGroup);

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.26, 48, 48), skinMat);
    skull.scale.set(0.92, 1.08, 0.95);
    this.headGroup.add(skull);

    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 32), skinMat);
    jaw.scale.set(0.95, 0.7, 0.85);
    jaw.position.set(0, -0.16, 0.02);
    this.headGroup.add(jaw);

    // ── FACE STRUCTURE ───────────────────────────────────────
    // Subtle volume so features don't read as decals on a sphere.
    // Brow ridge: horizontal ellipse above the eyes.
    const browRidge = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), skinMat);
    browRidge.scale.set(2.2, 0.4, 0.5);
    browRidge.position.set(0, 0.13, 0.21);
    this.headGroup.add(browRidge);

    // Cheekbones — one per side, gives the face dimension.
    for (const sx of [-1, 1]) {
      const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), skinMat);
      cheek.scale.set(1.4, 0.8, 0.6);
      cheek.position.set(0.13 * sx, -0.04, 0.22);
      this.headGroup.add(cheek);
    }

    // Chin — small protrusion off the jaw.
    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), skinMat);
    chin.scale.set(1.2, 0.9, 0.7);
    chin.position.set(0, -0.22, 0.18);
    this.headGroup.add(chin);

    // ── NOSE: bridge + tip + nostril hints ───────────────────
    const noseBridge = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 16), skinMat);
    noseBridge.scale.set(0.5, 2.0, 1.5);
    noseBridge.position.set(0, 0.03, 0.24);
    this.headGroup.add(noseBridge);

    const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 16), skinMat);
    noseTip.scale.set(0.9, 0.8, 1.1);
    noseTip.position.set(0, -0.06, 0.265);
    this.headGroup.add(noseTip);

    const nostrilMat = new THREE.MeshBasicMaterial({ color: 0x4a2a20 });
    const nostrilGeo = new THREE.SphereGeometry(0.008, 8, 8);
    const nostrilL = new THREE.Mesh(nostrilGeo, nostrilMat);
    nostrilL.position.set(-0.015, -0.085, 0.275);
    this.headGroup.add(nostrilL);
    const nostrilR = new THREE.Mesh(nostrilGeo, nostrilMat);
    nostrilR.position.set(0.015, -0.085, 0.275);
    this.headGroup.add(nostrilR);

    // ── EARS: helix torus + lobe + concha per side ───────────
    const makeEar = (side: number): THREE.Group => {
      const earGroup = new THREE.Group();

      // Outer helix — open torus arc.
      const outer = new THREE.Mesh(
        new THREE.TorusGeometry(0.035, 0.012, 8, 16, Math.PI * 1.3),
        skinMat,
      );
      outer.rotation.y = side * Math.PI * 0.5;
      outer.rotation.z = Math.PI * 0.15;
      earGroup.add(outer);

      // Earlobe — slightly elongated sphere.
      const lobeGeo = new THREE.SphereGeometry(0.018, 12, 12);
      lobeGeo.scale(1, 1.3, 0.7);
      const lobe = new THREE.Mesh(lobeGeo, skinMat);
      lobe.position.y = -0.04;
      earGroup.add(lobe);

      // Inner concha — tucked slightly inward.
      const innerGeo = new THREE.SphereGeometry(0.022, 12, 12);
      innerGeo.scale(0.6, 1.1, 0.4);
      const inner = new THREE.Mesh(innerGeo, skinMat);
      inner.position.x = side * 0.005;
      earGroup.add(inner);

      earGroup.position.set(side * 0.255, -0.02, 0.02);
      earGroup.rotation.y = side * 0.3;
      return earGroup;
    };
    this.headGroup.add(makeEar(-1));
    this.headGroup.add(makeEar(1));

    // ── HAIR ─────────────────────────────────────────────────
    // Cap lifted slightly + extended back so it doesn't grip the
    // forehead like a swim cap.
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.30, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.55),
      hairMat,
    );
    hairCap.scale.set(1.05, 1.05, 1.12);
    hairCap.position.y = 0.10;
    this.headGroup.add(hairCap);

    // Asymmetric sweep — LEFT bang.
    const bang = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 20), hairMat);
    bang.scale.set(1.8, 0.4, 0.5);
    bang.position.set(-0.08, 0.18, 0.22);
    bang.rotation.set(-0.15, 0, 0.4);
    this.headGroup.add(bang);

    // Second hair lock on the RIGHT — falls forward.
    const lock = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), hairMat);
    lock.scale.set(1.0, 1.6, 0.5);
    lock.position.set(0.12, 0.08, 0.19);
    lock.rotation.z = -0.3;
    this.headGroup.add(lock);

    // Side hair strands — shorter so they don't poke wide.
    for (const sx of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), hairMat);
      side.scale.set(0.5, 1.2, 0.6);
      side.position.set(0.26 * sx, -0.05, 0.05);
      this.headGroup.add(side);
    }

    // ── EYES ─────────────────────────────────────────────────
    // Eyes use a dedicated procedural shader (sclera + iris +
    // pupil + catch light). depthTest + depthWrite OFF and a high
    // renderOrder so the disc always paints over the skull curve
    // instead of getting z-fought.
    const leftEyeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: this.uTime,
        uSide: { value: 0 },
      },
      vertexShader: eyeVertex,
      fragmentShader: eyeFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    // Wider than tall — eye plane geometry now 0.11 × 0.085.
    // x±0.10 (slightly wider apart per "one eye width apart"
    // rule) and y=0.05 (slightly above center).
    this.leftEye = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.085), leftEyeMat);
    this.leftEye.position.set(-0.10, 0.05, 0.248);
    this.leftEye.scale.y = 0.45; // tired/half-closed baseline
    this.leftEye.renderOrder = 10;
    this.headGroup.add(this.leftEye);

    const rightEyeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: this.uTime,
        uSide: { value: 1 },
      },
      vertexShader: eyeVertex,
      fragmentShader: eyeFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    this.rightEye = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.085), rightEyeMat);
    this.rightEye.position.set(0.10, 0.05, 0.248);
    this.rightEye.renderOrder = 10;
    this.headGroup.add(this.rightEye);

    // Soft violet glow ring behind the right eye.
    const rightEyeGlowMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    this.rightEyeGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.11), rightEyeGlowMat);
    this.rightEyeGlow.position.set(0.10, 0.05, 0.246);
    this.rightEyeGlow.renderOrder = 9;
    this.headGroup.add(this.rightEyeGlow);

    // Eyebrows just above each eye.
    const browLMat = new THREE.MeshBasicMaterial({ color: 0x2a2025, transparent: true, opacity: 0.55 });
    const browL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.013, 0.018), browLMat);
    browL.position.set(-0.10, 0.13, 0.24);
    browL.rotation.z = 0.15;
    this.headGroup.add(browL);
    const browRMat = new THREE.MeshBasicMaterial({ color: 0x3a2418 });
    const browR = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.013, 0.018), browRMat);
    browR.position.set(0.10, 0.13, 0.24);
    browR.rotation.z = -0.1;
    this.headGroup.add(browR);

    // Mouth: small + pinker.
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0xc4666e });
    this.mouth = new THREE.Mesh(new THREE.SphereGeometry(0.03, 20, 16), mouthMat);
    this.mouth.scale.set(1.8, 0.5, 0.4);
    this.mouth.position.set(0, -0.16, 0.245);
    this.headGroup.add(this.mouth);

    // Upper-lip line — subtle torus arc.
    const lipMat = new THREE.MeshBasicMaterial({ color: 0xa44850, transparent: true, opacity: 0.6 });
    const lipLine = new THREE.Mesh(
      new THREE.TorusGeometry(0.04, 0.005, 8, 16, Math.PI),
      lipMat,
    );
    lipLine.position.set(0, -0.155, 0.245);
    lipLine.rotation.x = Math.PI * 0.1;
    this.headGroup.add(lipLine);

    // Right-side blush.
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xff9999, transparent: true, opacity: 0.32 });
    const blush = new THREE.Mesh(new THREE.CircleGeometry(0.045, 24), blushMat);
    blush.position.set(0.13, -0.09, 0.244);
    this.headGroup.add(blush);

    // ── NECK ─────────────────────────────────────────────────
    // Taller, slot bottom into torso top — no separate collarbone
    // mesh, no V-collar torus. The torso lathe's clavicle dip
    // does the visual work.
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.13, 0.28, 24), skinMat);
    neck.position.y = 1.10;
    this.charGroup.add(neck);

    // ── TORSO ────────────────────────────────────────────────
    // 9-point hourglass: wide shoulders → narrow waist → slightly
    // wider hip. Top point [0.001, 0.55] sits where the neck
    // bottom meets it.
    const torsoProfile = [
      new THREE.Vector2(0.001,  0.55),
      new THREE.Vector2(0.10,   0.50),  // neckline dip
      new THREE.Vector2(0.22,   0.42),  // shoulder slope start
      new THREE.Vector2(0.34,   0.30),  // shoulder widest
      new THREE.Vector2(0.36,   0.10),  // chest
      new THREE.Vector2(0.34,  -0.10),  // upper ribs
      new THREE.Vector2(0.30,  -0.30),  // waist (narrowest)
      new THREE.Vector2(0.34,  -0.50),  // hips widen back
      new THREE.Vector2(0.001, -0.55),
    ];
    const torso = new THREE.Mesh(new THREE.LatheGeometry(torsoProfile, 48), clothMat);
    torso.position.y = 0.45;
    this.charGroup.add(torso);

    // ── ARMS ─────────────────────────────────────────────────
    // Anchored at the new wider shoulder bone (x=±0.28, y=1.10
    // to meet the shoulder slope of the lathe). Shoulder sphere
    // bumped to 0.085 so it covers the seam where it overlaps
    // the torso silhouette by ~0.02. Upper + forearm tilted
    // outward/inward slightly for a natural hang.
    for (const sx of [-1, 1]) {
      const armGroup = new THREE.Group();
      armGroup.position.set(0.28 * sx, 1.10, 0);
      armGroup.rotation.z = 0.05 * sx;
      this.charGroup.add(armGroup);

      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 24), clothMat);
      armGroup.add(shoulder);

      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.42, 20), clothMat);
      upper.position.y = -0.26;
      upper.rotation.x = 0.05;
      armGroup.add(upper);

      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.05, 20, 20), skinMat);
      elbow.position.y = -0.50;
      armGroup.add(elbow);

      const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.40, 20), skinMat);
      fore.position.y = -0.72;
      fore.rotation.x = 0.08;
      armGroup.add(fore);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 20, 20), skinMat);
      hand.scale.set(0.85, 1.3, 0.55);
      hand.position.y = -0.97;
      armGroup.add(hand);

      armGroup.userData.armSide = sx;
      armGroup.name = sx < 0 ? "armLeft" : "armRight";
    }

    // ── LOWER BODY (pants) — slight tilt for natural pose ────
    const pantsProfile = [
      new THREE.Vector2(0.001,  0.0),
      new THREE.Vector2(0.36, -0.05),
      new THREE.Vector2(0.40, -0.30),
      new THREE.Vector2(0.34, -0.60),
      new THREE.Vector2(0.28, -1.0),
      new THREE.Vector2(0.24, -1.3),
      new THREE.Vector2(0.001,-1.35),
    ];
    const pants = new THREE.Mesh(new THREE.LatheGeometry(pantsProfile, 36), pantsMat);
    pants.position.y = -0.15;
    pants.rotation.z = 0.02; // subtle hip tilt
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
    this.camera.position.y = 0.9 + camBreatheY + this.smoothedMouse.y * 0.06;

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

    this.camera.lookAt(0, 0.7, 0);
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
