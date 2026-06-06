/**
 * scripts/fix-ap-physics-2-titles.ts
 *
 * One-off cleanup: the upload pipeline flattens filename underscores,
 * which strips apostrophes and em-dash separators ("Pascal s Law",
 * "Archimedes, Principle"). Re-write the 55 ap-physics-2-ultimate
 * chapter titles with hand-corrected punctuation.
 *
 *   npx tsx scripts/fix-ap-physics-2-titles.ts
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

(function loadEnv() {
  const text = readFileSync(".env.local", "utf8");
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const k = line.slice(0, eq);
    const v = line.slice(eq + 1).replace(/^"|"$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
})();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const SLUG = "ap-physics-2-ultimate";

const TITLES: Record<string, string> = {
  "01.01": "Pressure in Fluids — Depth and Pascal's Law",
  "01.02": "Buoyancy and Archimedes' Principle",
  "01.03": "Fluid Flow — Continuity and Bernoulli's Equation",
  "01.04": "Viscosity and Real Fluid Behavior",
  "01.05": "Surface Tension and Capillary Action",
  "01.06": "Applications of Fluid Statics — Dams, Blood Pressure, Atmosphere",
  "01.07": "Fluid Dynamics in Biological Systems",
  "01.08": "Plasma — The Fourth State of Matter",
  "02.01": "Temperature, Heat, and Thermal Equilibrium",
  "02.02": "Ideal Gas Law and Kinetic Theory",
  "02.03": "Thermodynamic Processes — P-V Diagrams",
  "02.04": "Heat Engines and the Second Law",
  "02.05": "Entropy and the Direction of Natural Processes",
  "02.06": "Heat Transfer — Conduction, Convection, Radiation",
  "02.07": "Phase Changes and Latent Heat",
  "02.08": "Refrigerators, Heat Pumps, and Real Cycles",
  "03.01": "Coulomb's Law and Electric Force",
  "03.02": "Electric Fields — The Vector Field",
  "03.03": "Electric Potential and Potential Energy",
  "03.04": "Conductors and Charge Distribution",
  "03.05": "Capacitors — Storing Electric Energy",
  "03.06": "Electric Potential in Uniform and Non-Uniform Fields",
  "03.07": "Gauss's Law — Using Symmetry",
  "03.08": "Electric Dipoles and Polarization",
  "04.01": "Current, Resistance, and Ohm's Law",
  "04.02": "Series and Parallel Circuits",
  "04.03": "Kirchhoff's Laws — Solving Complex Circuits",
  "04.04": "Power in Circuits — Where Energy Goes",
  "04.05": "Capacitors in Circuits — Charging and Discharging",
  "04.06": "Internal Resistance and Real Batteries",
  "04.07": "Ammeters, Voltmeters, and Wheatstone Bridge",
  "04.08": "Semiconductors and Diodes",
  "05.01": "Magnetic Fields — Sources and Visualization",
  "05.02": "Magnetic Force on Moving Charges",
  "05.03": "Magnetic Force on Current-Carrying Wires",
  "05.04": "Electromagnetic Induction — Faraday's Law",
  "05.05": "Transformers and AC Circuits",
  "05.06": "Inductors and Self-Inductance",
  "05.07": "Maxwell's Equations — The Complete Picture",
  "05.08": "Electromagnetic Waves — Properties and Spectrum",
  "06.01": "Reflection and Refraction — Snell's Law",
  "06.02": "Lenses and Mirrors — Thin Lens Equation",
  "06.03": "Ray Diagrams — Three Principal Rays",
  "06.04": "Wave Optics — Double Slit Interference",
  "06.05": "Single Slit Diffraction and Resolution",
  "06.06": "Thin Film Interference — Phase Shifts",
  "06.07": "Polarization and Optical Activity",
  "06.08": "Optical Instruments — Microscopes and Telescopes",
  "07.01": "Photons and the Photoelectric Effect",
  "07.02": "Matter Waves and de Broglie Wavelength",
  "07.03": "Atomic Spectra and Energy Levels",
  "07.04": "Nuclear Structure and Stability",
  "07.05": "Radioactive Decay — Alpha, Beta, Gamma",
  "07.06": "Half-Life and Radioactive Dating",
  "07.07": "Fission and Fusion — Mass-Energy Equivalence",
};

async function main() {
  const { data: tb, error: tbErr } = await supabase
    .from("textbooks")
    .select("id")
    .eq("slug", SLUG)
    .single();
  if (tbErr || !tb) throw new Error(`textbook lookup: ${tbErr?.message}`);

  let updated = 0;
  for (const [chapterNumber, title] of Object.entries(TITLES)) {
    const { error } = await supabase
      .from("textbook_chapters")
      .update({ title })
      .eq("textbook_id", tb.id)
      .eq("chapter_number", chapterNumber);
    if (error) throw new Error(`chapter ${chapterNumber}: ${error.message}`);
    console.log(`  ${chapterNumber} → ${title}`);
    updated++;
  }
  console.log(`\n[done] updated=${updated}`);
}

main().catch((err) => { console.error("[fatal]", err); process.exit(1); });
