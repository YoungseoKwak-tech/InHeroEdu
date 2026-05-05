"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 5;

export default function SpaceCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef({ x: -100, y: -100 });
  const trailPositions = useRef(Array(TRAIL_COUNT).fill({ x: -100, y: -100 }));
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement;
      const isClickable = el.matches("a, button, [role='button'], input, select, textarea, label, [tabindex]");
      setHovered(isClickable);
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      const { x, y } = posRef.current;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      // Update trails with stagger
      trailPositions.current = [{ x, y }, ...trailPositions.current.slice(0, TRAIL_COUNT - 1)];
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = i + 1;
        const trailX = trailPositions.current[Math.min(delay * 2, TRAIL_COUNT - 1)].x;
        const trailY = trailPositions.current[Math.min(delay * 2, TRAIL_COUNT - 1)].y;
        el.style.transform = `translate(${trailX}px, ${trailY}px)`;
        el.style.opacity = String(0.25 - i * 0.04);
        el.style.width = `${6 - i}px`;
        el.style.height = `${6 - i}px`;
        el.style.marginLeft = `${-(3 - i * 0.5)}px`;
        el.style.marginTop = `${-(3 - i * 0.5)}px`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="cursor-trail"
          style={{ position: "fixed", top: 0, left: 0, borderRadius: "50%", background: "var(--signal-green)", pointerEvents: "none", zIndex: 9998 }}
        />
      ))}
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="space-cursor"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
      >
        <div className="space-cursor-h" />
        <div className="space-cursor-v" />
        <div className="space-cursor-inner" />
        <div className={`space-cursor-ring${hovered ? " hovered" : ""}`} />
      </div>
    </>
  );
}
