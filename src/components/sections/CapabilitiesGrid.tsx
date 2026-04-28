"use client";

import { motion } from "framer-motion";
import { Activity, Gauge, MousePointer2, Palette, Search, ServerCog } from "lucide-react";

const capabilities = [
  {
    title: "Animation",
    body: "Motion that explains the idea instead of distracting from it.",
    Icon: Activity,
    demo: "wave",
  },
  {
    title: "Performance",
    body: "Fast-loading pages with sensible assets and clean structure.",
    Icon: Gauge,
    demo: "score",
  },
  {
    title: "Interaction",
    body: "Small details that make the site feel built, not templated.",
    Icon: MousePointer2,
    demo: "target",
  },
  {
    title: "Design",
    body: "Sharp layouts, calm contrast, and brand systems that scale.",
    Icon: Palette,
    demo: "palette",
  },
  {
    title: "SEO foundations",
    body: "The boring but important metadata, schema, sitemap, and search setup.",
    Icon: Search,
    demo: "bars",
  },
  {
    title: "Managed hosting",
    body: "Hosting, monitoring, security basics, and updates handled for you.",
    Icon: ServerCog,
    demo: "pulse",
  },
] as const;

function Demo({ type }: { type: (typeof capabilities)[number]["demo"] }) {
  if (type === "score") {
    return (
      <div className="grid h-28 place-items-center rounded-2xl bg-black/30 font-mono">
        <motion.span
          className="text-5xl font-semibold text-[var(--accent)]"
          initial={{ opacity: 0.4 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          99
        </motion.span>
      </div>
    );
  }

  if (type === "palette") {
    return (
      <div className="grid h-28 grid-cols-4 gap-2 rounded-2xl bg-black/30 p-3">
        {["#7FFFB0", "#F5F1EA", "#FFB347", "#1B1E1C"].map((color, index) => (
          <motion.span
            key={color}
            className="rounded-xl"
            style={{ background: color }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            custom={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-28 overflow-hidden rounded-2xl bg-black/30 p-4">
      <motion.div
        className="absolute inset-x-4 top-1/2 h-px bg-[var(--accent)]/30"
        animate={{ scaleX: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-[var(--accent)] bg-[var(--accent)]/15"
        animate={{
          x: type === "target" ? [-40, 36, -10, -40] : [-20, 28, -20],
          y: type === "pulse" ? [0, -14, 0] : [-10, 8, -10],
          scale: type === "bars" ? [0.85, 1.2, 0.85] : [1, 1.08, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function CapabilitiesGrid() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Capabilities</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">The work proves itself.</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Each card is a small demo. Not a list of buzzwords. A signal that we can build the details that matter.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ title, body, Icon, demo }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
              className="glass group rounded-[1.7rem] p-5 transition-transform duration-500 hover:-translate-y-1"
            >
              <Demo type={demo} />
              <div className="mt-6 flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--accent)]/30 bg-black/40 text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
