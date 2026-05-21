// Outfit mesh builders + half-body clipping.
//
// All outfit builders produce a full lathe-revolved torso (so we don't
// have to model half-symmetric geometry by hand). `applyClipping`
// then clips the group to ONE side of x=0 by attaching a THREE.Plane
// to every material in the group — past lives on x<0, future on x>0,
// and they meet at the seam without any backside artifacts because
// the lathe is a single outer-facing surface.
//
// cloneMatWithColor SHARES the template's dynamic uniform refs
// (uTime, uSync, uCompletion, uGlitch) so every cloned outfit
// material picks up the per-frame uniform writes from the RAF loop
// — no rescan pass needed.

import * as THREE from "three";

export interface OutfitMaterials {
  /** Split-shader template; outfit builders clone this for each piece. */
  primary: THREE.ShaderMaterial;
  /** Same template, separate name so builders read intentfully. */
  accent: THREE.ShaderMaterial;
}

export type OutfitSide = "past" | "future";

export function cloneMatWithColor(
  template: THREE.ShaderMaterial,
  hexColor: number,
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: template.vertexShader,
    fragmentShader: template.fragmentShader,
    uniforms: {
      uTime:       template.uniforms.uTime,
      uSync:       template.uniforms.uSync,
      uCompletion: template.uniforms.uCompletion,
      uGlitch:     template.uniforms.uGlitch,
      uBaseColor:  { value: new THREE.Color(hexColor) },
    },
    transparent: template.transparent ?? false,
  });
}

/**
 * Attaches a half-space clipping plane to every material in `group`.
 * Past keeps x < 0, future keeps x > 0. Three.js' convention is that
 * fragments with negative signed distance to the plane are clipped,
 * so the kept side is the half-space the normal points away from.
 */
export function applyClipping(group: THREE.Group, side: OutfitSide): void {
  const normal = side === "past"
    ? new THREE.Vector3(-1, 0, 0)
    : new THREE.Vector3( 1, 0, 0);
  const plane = new THREE.Plane(normal, 0);

  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const mat = obj.material as THREE.Material | THREE.Material[];
      const apply = (m: THREE.Material) => {
        m.clippingPlanes = [plane];
        m.clipShadows = true;
      };
      if (Array.isArray(mat)) mat.forEach(apply);
      else if (mat)           apply(mat);
    }
  });
  group.userData.side = side;
}

// Standard torso silhouette — wider shoulders, shorter body. Used by
// every outfit that doesn't have a custom long-form drape.
const STANDARD_TORSO_POINTS: [number, number][] = [
  [0.001,  0.45],
  [0.24,   0.42],
  [0.42,   0.32],
  [0.44,   0.10],
  [0.40,  -0.10],
  [0.42,  -0.30],
  [0.001, -0.35],
];

function torsoLathe(points: [number, number][]): THREE.LatheGeometry {
  return new THREE.LatheGeometry(
    points.map(([x, y]) => new THREE.Vector2(x, y)),
    40,
  );
}

function makeTorso(template: THREE.ShaderMaterial, color: number): THREE.Mesh {
  const geo = torsoLathe(STANDARD_TORSO_POINTS);
  const mesh = new THREE.Mesh(geo, cloneMatWithColor(template, color));
  mesh.position.y = 0.45;
  return mesh;
}

// ═════════════════════════════════════════════════════════════
// PAST SELF — current / casual / grounded
// ═════════════════════════════════════════════════════════════

// PLAIN T-SHIRT
export function buildTshirt(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-tshirt";
  group.add(makeTorso(mats.primary, 0xd8d4cc));
  // Crew neck hint.
  const collarGeo = new THREE.TorusGeometry(0.12, 0.012, 8, 24);
  const collar = new THREE.Mesh(collarGeo, cloneMatWithColor(mats.accent, 0xc5beb0));
  collar.position.y = 0.93;
  collar.rotation.x = Math.PI / 2;
  group.add(collar);
  group.userData.sleeveOverride = 0xd8d4cc;
  return group;
}

// HOODIE — cream, hood + drawstrings
export function buildHoodie(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-hoodie";
  group.add(makeTorso(mats.primary, 0xf5f0e8));
  const hoodGeo = new THREE.SphereGeometry(0.32, 24, 24);
  hoodGeo.scale(1.1, 0.7, 0.6);
  const hood = new THREE.Mesh(hoodGeo, cloneMatWithColor(mats.accent, 0xeae0d0));
  hood.position.set(0, 1.00, -0.18);
  group.add(hood);
  const stringGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.15, 8);
  for (const sx of [-1, 1]) {
    const s = new THREE.Mesh(stringGeo, cloneMatWithColor(mats.accent, 0xeae0d0));
    s.position.set(0.05 * sx, 0.80, 0.18);
    group.add(s);
  }
  // Hoodie sleeves stay default cream cloth.
  return group;
}

// TRACKSUIT — dark gray, zipper + stand collar
export function buildTracksuit(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-tracksuit";
  group.add(makeTorso(mats.primary, 0x3a3a44));
  const zipperGeo = new THREE.BoxGeometry(0.012, 0.55, 0.04);
  const zipper = new THREE.Mesh(zipperGeo, cloneMatWithColor(mats.accent, 0x8a8590));
  zipper.position.set(0, 0.55, 0.36);
  group.add(zipper);
  const collarGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.10, 24, 1, true);
  const collar = new THREE.Mesh(collarGeo, cloneMatWithColor(mats.primary, 0x2a2a32));
  collar.position.y = 1.00;
  group.add(collar);
  group.userData.sleeveOverride = 0x3a3a44;
  return group;
}

// KNIT SWEATER — warm tan, cable hint, turtleneck
export function buildSweater(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-sweater";
  group.add(makeTorso(mats.primary, 0xa89070));
  for (let i = -1; i <= 1; i += 2) {
    const cableGeo = new THREE.BoxGeometry(0.025, 0.55, 0.02);
    const cable = new THREE.Mesh(cableGeo, cloneMatWithColor(mats.accent, 0x8a7560));
    cable.position.set(i * 0.12, 0.55, 0.37);
    group.add(cable);
  }
  const necklineGeo = new THREE.CylinderGeometry(0.13, 0.15, 0.12, 24);
  const neckline = new THREE.Mesh(necklineGeo, cloneMatWithColor(mats.primary, 0xa89070));
  neckline.position.y = 1.02;
  group.add(neckline);
  group.userData.sleeveOverride = 0xa89070;
  return group;
}

// DENIM JACKET — two chest pockets
export function buildCasualJacket(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-denim";
  group.add(makeTorso(mats.primary, 0x4a6488));
  for (let i = -1; i <= 1; i += 2) {
    const pocketGeo = new THREE.BoxGeometry(0.10, 0.10, 0.012);
    const pocket = new THREE.Mesh(pocketGeo, cloneMatWithColor(mats.accent, 0x405878));
    pocket.position.set(i * 0.18, 0.62, 0.37);
    group.add(pocket);
  }
  group.userData.sleeveOverride = 0x4a6488;
  return group;
}

// ═════════════════════════════════════════════════════════════
// FUTURE SELF — aspirational / elevated
// ═════════════════════════════════════════════════════════════

// CRISP SHIRT — white, button placket, small V-collar
export function buildShirt(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-shirt";
  group.add(makeTorso(mats.primary, 0xf8f5ed));
  const collarGeo = new THREE.BoxGeometry(0.08, 0.05, 0.04);
  for (const sx of [-1, 1]) {
    const w = new THREE.Mesh(collarGeo, cloneMatWithColor(mats.primary, 0xf0ebe0));
    w.position.set(0.04 * sx, 0.92, 0.36);
    w.rotation.z = 0.3 * -sx;
    group.add(w);
  }
  for (let i = 0; i < 4; i++) {
    const btn = new THREE.Mesh(
      new THREE.SphereGeometry(0.008, 12, 12),
      cloneMatWithColor(mats.accent, 0xcfc8b8),
    );
    btn.position.set(0, 0.65 - i * 0.16, 0.38);
    group.add(btn);
  }
  group.userData.sleeveOverride = 0xf8f5ed;
  return group;
}

// CORNELL VARSITY — navy body, gold placket, red C patch
export function buildVarsity(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-varsity";
  group.add(makeTorso(mats.primary, 0x1a2440));
  const placket = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.55, 0.05),
    cloneMatWithColor(mats.accent, 0xc8b888),
  );
  placket.position.set(0, 0.55, 0.36);
  group.add(placket);
  const patch = new THREE.Mesh(
    new THREE.CircleGeometry(0.04, 24),
    cloneMatWithColor(mats.accent, 0xc8232b),
  );
  patch.position.set(-0.16, 0.70, 0.37);
  group.add(patch);
  group.userData.sleeveOverride = 0xe8dcc0;
  return group;
}

// LAB COAT — off-white, long-form, V-lapel, buttons, stethoscope
export function buildLabCoat(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-labcoat";
  const coatPoints: [number, number][] = [
    [0.001,  0.45],
    [0.22,   0.42],
    [0.40,   0.32],
    [0.42,   0.10],
    [0.42,  -0.10],
    [0.44,  -0.40],
    [0.46,  -0.85],
    [0.46,  -1.10],
    [0.001, -1.15],
  ];
  const coat = new THREE.Mesh(
    torsoLathe(coatPoints),
    cloneMatWithColor(mats.primary, 0xfafaf6),
  );
  coat.position.y = 0.45;
  group.add(coat);
  const lapel = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.15, 0.04),
    cloneMatWithColor(mats.accent, 0xe5e0d0),
  );
  lapel.position.set(0, 0.87, 0.36);
  lapel.rotation.x = -0.15;
  group.add(lapel);
  for (let i = 0; i < 4; i++) {
    const btn = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 12, 12),
      cloneMatWithColor(mats.accent, 0xc8c2b0),
    );
    btn.position.set(0, 0.55 - i * 0.18, 0.37);
    group.add(btn);
  }
  const pocket = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.07, 0.005),
    cloneMatWithColor(mats.accent, 0xf0ebe0),
  );
  pocket.position.set(-0.15, 0.60, 0.37);
  group.add(pocket);
  const steth = new THREE.Mesh(
    new THREE.TorusGeometry(0.12, 0.012, 8, 24, Math.PI),
    cloneMatWithColor(mats.accent, 0x1a1a22),
  );
  steth.position.set(0, 0.95, 0.28);
  steth.rotation.x = -0.4;
  group.add(steth);
  group.userData.sleeveOverride = 0xfafaf6;
  return group;
}

// TAILORED SUIT — near-black, white shirt V, lapels, wine tie
export function buildSuit(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-suit";
  const bodyPoints: [number, number][] = [
    [0.001,  0.45],
    [0.24,   0.42],
    [0.40,   0.32],
    [0.42,   0.10],
    [0.36,  -0.15],
    [0.38,  -0.30],
    [0.40,  -0.50],
    [0.001, -0.50],
  ];
  const torso = new THREE.Mesh(
    torsoLathe(bodyPoints),
    cloneMatWithColor(mats.primary, 0x14141a),
  );
  torso.position.y = 0.45;
  group.add(torso);
  const shirt = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.22, 0.04),
    cloneMatWithColor(mats.accent, 0xf5f5f0),
  );
  shirt.position.set(0, 0.80, 0.36);
  group.add(shirt);
  function makeLapel(side: number): THREE.Mesh {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(side * 0.12, -0.05);
    shape.lineTo(side * 0.08, -0.22);
    shape.lineTo(0, -0.26);
    shape.lineTo(0, 0);
    const m = new THREE.Mesh(
      new THREE.ShapeGeometry(shape),
      cloneMatWithColor(mats.primary, 0x0a0a10),
    );
    m.position.set(0, 0.92, 0.37);
    return m;
  }
  group.add(makeLapel(-1));
  group.add(makeLapel(1));
  const tie = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.30, 0.02),
    cloneMatWithColor(mats.accent, 0x6c2030),
  );
  tie.position.set(0, 0.70, 0.385);
  group.add(tie);
  const knot = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.05, 0.025),
    cloneMatWithColor(mats.accent, 0x5a1825),
  );
  knot.position.set(0, 0.86, 0.39);
  group.add(knot);
  group.userData.sleeveOverride = 0x14141a;
  return group;
}

// GRADUATION GOWN — long black robe, Cornell-red stoles, cap + tassel
export function buildGown(mats: OutfitMaterials): THREE.Group {
  const group = new THREE.Group();
  group.name = "outfit-gown";
  const robePoints: [number, number][] = [
    [0.001,  0.45],
    [0.26,   0.42],
    [0.44,   0.32],
    [0.48,   0.10],
    [0.52,  -0.30],
    [0.60,  -0.80],
    [0.68,  -1.30],
    [0.001, -1.35],
  ];
  const robe = new THREE.Mesh(
    torsoLathe(robePoints),
    cloneMatWithColor(mats.primary, 0x18181f),
  );
  robe.position.y = 0.45;
  group.add(robe);
  for (const sx of [-1, 1]) {
    const stole = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.62, 0.04),
      cloneMatWithColor(mats.accent, 0xc8232b),
    );
    stole.position.set(0.12 * sx, 0.55, 0.36);
    group.add(stole);
  }
  const capGroup = new THREE.Group();
  const capCrown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24),
    cloneMatWithColor(mats.primary, 0x18181f),
  );
  capGroup.add(capCrown);
  const capBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.02, 0.55),
    cloneMatWithColor(mats.primary, 0x18181f),
  );
  capBoard.position.y = 0.05;
  capGroup.add(capBoard);
  const tasselString = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.005, 0.18, 8),
    cloneMatWithColor(mats.accent, 0xc8a830),
  );
  tasselString.position.set(0.2, -0.05, 0.2);
  capGroup.add(tasselString);
  const tasselBallGeo = new THREE.SphereGeometry(0.025, 12, 12);
  tasselBallGeo.scale(0.6, 1.4, 0.6);
  const tasselBall = new THREE.Mesh(
    tasselBallGeo,
    cloneMatWithColor(mats.accent, 0xc8a830),
  );
  tasselBall.position.set(0.2, -0.18, 0.2);
  capGroup.add(tasselBall);
  capGroup.position.y = 1.65;
  group.add(capGroup);
  group.userData.sleeveOverride = 0x18181f;
  return group;
}
