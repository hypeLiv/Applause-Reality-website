"use client";

import { useRef } from "react";

/**
 * Tilts its child toward the pointer in 3D, with a soft sheen that follows the
 * cursor — for framed, physical-feeling objects (certificates, a portrait).
 * Writes CSS variables straight to the element, so moving the pointer never
 * re-renders React. Inert on touch and under reduced motion.
 */
export default function Tilt({
  children,
  max = 8,
  className = "",
}: {
  children: React.ReactNode;
  /** Maximum rotation in degrees. */
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--sheen", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
        el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        el.style.setProperty("--sheen", "1");
      }}
      onPointerLeave={reset}
      className={`[perspective:1100px] ${className}`}
    >
      <div
        className="relative transition-transform duration-300 ease-[var(--ease-lux)] will-change-transform [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]"
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--sheen,0)] mix-blend-soft-light transition-opacity duration-300 [background:radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgb(255_255_255/0.55),transparent_55%)]"
        />
      </div>
    </div>
  );
}
