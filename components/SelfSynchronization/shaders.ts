// All GLSL strings for SelfSynchronization. Four programs:
//   - splitVertex / splitFragment    → every body part (skin, hair, cloth, pants)
//   - particleVertex / particleFragment → background sparks
//   - seamVertex / seamFragment      → vertical energy strip
//   - auraVertex / auraFragment      → additive plane behind the figure
//
// Each fragment shader stays under ~80 lines and uses the same
// uniform set so the JS side only has to swap uBaseColor per part.

export const splitVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    // Subtle breathing — overall scale modulation so the figure
    // looks alive even before any sync change.
    float breath = 1.0 + sin(uTime * 0.7) * 0.008;
    vec3 pos = position * breath;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal   = normalize(mat3(modelMatrix) * normal);
    vViewDir  = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const splitFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSync;
  uniform float uCompletion;
  uniform float uGlitch;
  uniform vec3  uBaseColor;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  // Cheap 2D fractal noise — used for the LEFT-side static + the
  // glitch band displacement on the seam.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    // Split position: as uSync rises, the seam moves left so the
    // ideal half takes over more of the figure. uSync ∈ [0, 1].
    float splitX  = -(uSync - 0.08) * 1.5;
    float sideRaw = vWorldPos.x - splitX;
    float side    = smoothstep(-0.025, 0.025, sideRaw);

    // ── LEFT: desaturated, glitchy, dim ────────────────────────
    float lum       = dot(uBaseColor, vec3(0.299, 0.587, 0.114));
    vec3  leftBase  = mix(uBaseColor, vec3(lum), 0.85) * 0.35;
    float fresnelL  = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.2);
    vec3  rimColdL  = vec3(0.42, 0.45, 0.62) * fresnelL * 0.55;
    float topDim    = max(0.0, vNormal.y) * 0.18;
    float dust      = noise(vWorldPos.xy * 22.0 + uTime * 0.3) * 0.07;
    // Glitch bands: a horizontal-band threshold modulated by uGlitch
    float band      = step(0.94, fract(vWorldPos.y * 7.0 - uTime * 4.0));
    float glitchAmt = band * uGlitch;
    vec3  leftCol   = leftBase + rimColdL + topDim + dust;
    leftCol         = mix(leftCol, vec3(0.55, 0.10, 0.18), glitchAmt * 0.7);

    // ── RIGHT: alive, three-point lit ─────────────────────────
    vec3 N = normalize(vNormal);
    vec3 keyDir  = normalize(vec3( 0.5, 0.9,  0.7));
    vec3 fillDir = normalize(vec3(-0.4, 0.4,  0.5));
    vec3 rimDir  = normalize(vec3( 0.7, 0.2, -0.5));
    float key  = max(0.0, dot(N, keyDir));
    float fill = max(0.0, dot(N, fillDir));
    float rim  = pow(1.0 - max(dot(N, vViewDir), 0.0), 3.0);
    vec3 rightBase = uBaseColor;
    vec3 rightCol  = rightBase * (0.32 + key * 0.85)
                   + vec3(0.55, 0.60, 0.95) * fill * 0.35
                   // Rim term softened (0.65 → 0.5) so faces don't
                   // halogen-glow on the cheek and nose tip.
                   + vec3(0.72, 0.66, 0.96) * rim * 0.50;
    // Subsurface scattering — warm red bleed on thin angles, tinted
    // by the base color so hair/cloth/skin all behave naturally.
    vec3 ssColor = vec3(0.92, 0.55, 0.50);
    float ss = pow(1.0 - max(dot(N, vViewDir), 0.0), 1.5);
    rightCol += ssColor * ss * 0.15 * uBaseColor;
    // Edge subsurface highlight at the silhouette — keeps cheeks
    // and ears feeling fleshy.
    float ssEdge = pow(1.0 - max(dot(N, vViewDir), 0.0), 4.0) * max(0.0, key);
    rightCol += vec3(0.95, 0.55, 0.55) * ssEdge * 0.10;

    // ── Blend halves ──────────────────────────────────────────
    vec3 col = mix(leftCol, rightCol, side);

    // ── Seam glow at the split ────────────────────────────────
    float seamPulse  = 0.65 + 0.35 * sin(uTime * 2.6);
    float seamGlow   = exp(-abs(sideRaw) * 45.0) * seamPulse;
    col += vec3(0.78, 0.62, 1.0) * seamGlow * 0.7;

    // ── Completion burst ─────────────────────────────────────
    if (uCompletion > 0.001) {
      // White flare on RIGHT, violet ghost on LEFT.
      col += vec3(1.0) * uCompletion * side * 0.55;
      col += vec3(0.65, 0.45, 1.0) * uCompletion * (1.0 - side) * 0.35;
    }

    // Gamma-ish output for nicer values without a tonemap pass.
    col = pow(max(col, 0.0), vec3(0.92));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uCompletion;
  uniform float uPixelRatio;
  attribute float aSpeed;
  attribute float aSide;
  attribute float aSize;
  varying float vSide;
  varying float vAlpha;

  void main() {
    vSide = aSide; // -1 left, +1 right
    vec3 p = position;
    // Drift upward; wrap at top.
    float y = mod(p.y + uTime * aSpeed * 0.4, 4.0) - 1.5;
    p.y = y;
    // Subtle horizontal wobble.
    p.x += sin(uTime * 0.6 + position.z * 4.0) * 0.05;
    // Completion: pulled toward seam (x → 0).
    p.x += aSide * 0.3 * uCompletion;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float sizeScale = aSide > 0.0 ? 1.25 : 0.85;
    // 60% smaller than v1 + hard cap at 8px so particles never
    // bokeh-over the character.
    float raw = aSize * sizeScale * uPixelRatio * (100.0 / -mv.z);
    gl_PointSize = min(8.0, raw);
    vAlpha = (aSide > 0.0 ? 0.6 : 0.3) + uCompletion * 0.2;
  }
`;

export const particleFragment = /* glsl */ `
  varying float vSide;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    // Right side: violet → teal blend; left side: dim grey.
    vec3 right = mix(vec3(0.55, 0.40, 0.95), vec3(0.40, 0.92, 0.85), 0.5);
    vec3 left  = vec3(0.32, 0.32, 0.42);
    vec3 col   = mix(left, right, smoothstep(-0.1, 0.1, vSide));
    float a = (1.0 - d * 2.0) * vAlpha;
    gl_FragColor = vec4(col, a);
  }
`;

export const seamVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const seamFragment = /* glsl */ `
  uniform float uTime;
  uniform float uCompletion;
  varying vec2 vUv;
  void main() {
    // Energy travelling upward along the strip.
    float t = sin(vUv.y * 18.0 - uTime * 3.5) * 0.5 + 0.5;
    float pulse = pow(t, 5.0);
    // Center column glow — falls off horizontally.
    float core = exp(-pow((vUv.x - 0.5) * 5.0, 2.0));
    float a = pulse * core * (0.8 + uCompletion * 1.5);
    vec3 col = mix(vec3(0.65, 0.50, 1.0), vec3(0.55, 0.95, 0.92), pulse);
    gl_FragColor = vec4(col, a);
  }
`;

export const auraVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const eyeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Procedural eye: sclera + iris + pupil + catch-light. uSide:
//   0 = LEFT (tired, dim brown iris)
//   1 = RIGHT (galaxy iris — violet→teal radial with sparkle stars)
// The plane is rectangular but we mask to a circle via discard so
// the eye reads as a sphere on the face. Catch-light position
// fixed at (-0.04, +0.04) in centered UV space.
export const eyeFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSide;
  varying vec2 vUv;

  float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 c = vUv - vec2(0.5);
    float d = length(c);
    if (d > 0.40) discard;

    // Sclera (off-white) — base for the visible disc.
    vec3 sclera = vec3(0.96, 0.95, 0.93);

    // LEFT iris: muted brown.
    vec3 leftIris = vec3(0.29, 0.21, 0.145);

    // RIGHT iris: violet center → teal edge + tiny sparkle stars.
    float r = clamp(d / 0.18, 0.0, 1.0);
    vec3 rightIris = mix(vec3(0.65, 0.45, 1.0), vec3(0.35, 0.92, 0.85), r);
    if (uSide > 0.5 && d < 0.18) {
      float starHash = hash21(c * 30.0);
      float star = step(0.965, starHash) * 0.85;
      // Twinkle the stars at slightly different phases.
      star *= 0.6 + 0.4 * sin(uTime * 4.2 + starHash * 12.0);
      rightIris += vec3(star);
    }

    vec3 iris = mix(leftIris, rightIris, uSide);

    // Blend: iris where d < 0.18, sclera outside that.
    vec3 col = mix(iris, sclera, smoothstep(0.16, 0.20, d));

    // Pupil — solid black inside r < 0.07.
    col = mix(vec3(0.0), col, smoothstep(0.058, 0.075, d));

    // Catch light at upper-left of pupil.
    vec2 cl = c - vec2(-0.04, 0.04);
    float clDist = length(cl);
    float clMask = 1.0 - smoothstep(0.0, 0.025, clDist);
    col = mix(col, vec3(1.0), clMask * 0.95);

    // Soft outer edge so the disc fades into the face plane.
    float edge = 1.0 - smoothstep(0.36, 0.40, d);
    gl_FragColor = vec4(col, edge);
  }
`;

export const auraFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSync;
  uniform float uCompletion;
  varying vec2 vUv;
  void main() {
    // Mask to the right side using a soft step (seam moves with sync).
    float seam = 0.5 - (uSync - 0.08) * 0.18;
    float right = smoothstep(seam - 0.02, seam + 0.18, vUv.x);
    // Radial falloff centered on (0.65, 0.55).
    vec2  c   = vUv - vec2(0.65, 0.55);
    float d   = length(c);
    float fall = smoothstep(0.55, 0.0, d);
    float breathe = 0.7 + 0.3 * sin(uTime * 1.3);
    float intensity = right * fall * breathe;
    intensity += uCompletion * fall * 0.9;
    vec3 col = mix(vec3(0.45, 0.32, 0.92), vec3(0.32, 0.85, 0.85), fall * 0.6);
    gl_FragColor = vec4(col * intensity, intensity);
  }
`;
