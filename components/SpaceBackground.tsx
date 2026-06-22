"use client";

/**
 * Global page backdrop. The old starry "space" scene (planets, astronaut, ship
 * lights, scanlines) was replaced with a clean, premium deep gradient — light
 * pages (home, /parents) cover it with their own surface; dark product pages
 * sit on this calm gradient instead of cluttered cosmic art.
 */
export default function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(120% 80% at 50% -10%, #111a2e 0%, #0a1120 42%, #070b14 72%, #05070d 100%)",
      }}
    />
  );
}
