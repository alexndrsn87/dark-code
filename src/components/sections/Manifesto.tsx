"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="px-4 py-24 md:py-32">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65 }}
          className="max-w-5xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Manifesto</p>
          <h2 className="mt-7 text-balance text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
            We don&apos;t do mockups. We don&apos;t do decks. We open a terminal and ship.
          </h2>
          <div className="mt-10 h-px origin-left bg-[var(--accent)]" style={{ transformOrigin: "left" }}>
            <motion.div className="h-full bg-[var(--accent)]" style={{ scaleX }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
