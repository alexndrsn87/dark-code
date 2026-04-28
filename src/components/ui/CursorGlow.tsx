"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 140, damping: 32, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 32, mass: 0.2 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncEnabled = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    function handleMove(event: PointerEvent) {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
    }

    finePointer.addEventListener("change", syncEnabled);
    reducedMotion.addEventListener("change", syncEnabled);
    window.addEventListener("pointermove", handleMove);
    return () => {
      finePointer.removeEventListener("change", syncEnabled);
      reducedMotion.removeEventListener("change", syncEnabled);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-5 w-5 rounded-full border border-[var(--accent)]/55 bg-[var(--accent)]/18 shadow-[0_0_34px_rgba(127,255,176,0.55)]"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
