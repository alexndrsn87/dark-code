"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/content/site";

type Phase = "intro" | "constellation" | "assembling" | "assembled" | "dissolving";

const phaseDurations: Record<Phase, number> = {
  intro: 1400,
  constellation: 4200,
  assembling: 1400,
  assembled: 3200,
  dissolving: 1200,
};

const mockupTypes = ["saas", "landing", "portfolio", "ecommerce", "blog"] as const;
const mockupLabels: Record<(typeof mockupTypes)[number], string> = {
  saas: "dashboard.tsx",
  landing: "hero.jsx",
  portfolio: "gallery.tsx",
  ecommerce: "shop.tsx",
  blog: "editorial.tsx",
};

const textSnippets = ["<hero/>", "<nav/>", "<cta/>", "ship()", "deploy()", "build()"] as const;

class Node {
  isText: boolean;
  text: string;
  cx: number;
  cy: number;
  cz: number;
  tx: number;
  ty: number;
  tz: number;
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  targetOpacity: number;

  constructor(index: number, total: number) {
    // Only every 6th node is text — keeps things legible.
    this.isText = index % 6 === 0;
    this.text = textSnippets[Math.floor(index / 6) % textSnippets.length];
    const angle = index * 2.399963229728653;
    const radius = Math.sqrt((index + 0.5) / total);
    this.cx = Math.cos(angle) * radius * 1.2;
    this.cy = Math.sin(angle) * radius * 0.92;
    this.cz = 0.4 + (index % 7) * 0.12;
    this.tx = this.cx;
    this.ty = this.cy;
    this.tz = this.cz;
    this.x = this.cx;
    this.y = this.cy;
    this.z = this.cz;
    this.size = this.isText ? 11 : 2.2;
    this.opacity = 0;
    this.targetOpacity = this.isText ? 0.7 : 0.55;
  }

  setTarget(x: number, y: number, z: number) {
    this.tx = x;
    this.ty = y;
    this.tz = z;
  }

  setConstellationTarget() {
    this.tx = this.cx;
    this.ty = this.cy;
    this.tz = this.cz;
  }

  project(width: number, height: number, parallaxX: number, parallaxY: number, camera: number) {
    const cx = width / 2;
    const cy = height / 2;
    const base = Math.min(width, height);
    const fov = base * 1.45 * camera;
    const scale = fov / (fov + this.z * base * 0.52);
    return {
      x: cx + (this.x * width * 0.42 + parallaxX) * scale,
      y: cy + (this.y * height * 0.4 + parallaxY) * scale,
      scale,
    };
  }
}

function generateMockup(type: (typeof mockupTypes)[number], count: number) {
  const targets: { x: number; y: number; z: number }[] = [];
  const addLine = (x1: number, x2: number, y: number, points: number, z = 0.4) => {
    for (let i = 0; i < points; i++) {
      const progress = points === 1 ? 0 : i / (points - 1);
      targets.push({ x: x1 + (x2 - x1) * progress, y, z });
    }
  };
  const addRect = (x: number, y: number, w: number, h: number, points: number, z = 0.4) => {
    const perimeter = 2 * (w + h);
    for (let i = 0; i < points; i++) {
      const t = (i / points) * perimeter;
      let px = 0;
      let py = 0;
      if (t < w) {
        px = x - w / 2 + t;
        py = y - h / 2;
      } else if (t < w + h) {
        px = x + w / 2;
        py = y - h / 2 + (t - w);
      } else if (t < 2 * w + h) {
        px = x + w / 2 - (t - w - h);
        py = y + h / 2;
      } else {
        px = x - w / 2;
        py = y + h / 2 - (t - 2 * w - h);
      }
      targets.push({ x: px, y: py, z });
    }
  };

  if (type === "saas") {
    addLine(-0.72, 0.72, -0.62, 10);
    addRect(-0.36, -0.18, 0.5, 0.28, 14);
    addRect(0.36, -0.18, 0.5, 0.28, 14);
    addRect(0, 0.32, 1.04, 0.26, 18);
  } else if (type === "landing") {
    addLine(-0.6, 0.6, -0.6, 10);
    addLine(-0.55, 0.55, -0.22, 12);
    addLine(-0.4, 0.4, -0.04, 10);
    addLine(-0.3, 0.3, 0.12, 8);
    addRect(0, 0.4, 0.4, 0.18, 12);
  } else if (type === "portfolio") {
    addRect(-0.42, -0.22, 0.4, 0.4, 14);
    addRect(0.16, -0.22, 0.4, 0.4, 14);
    addRect(-0.13, 0.32, 0.86, 0.24, 20);
  } else if (type === "ecommerce") {
    addLine(-0.65, 0.65, -0.58, 10);
    for (let col = 0; col < 3; col++) {
      const x = -0.46 + col * 0.46;
      addRect(x, 0.08, 0.36, 0.46, 12);
    }
  } else {
    addLine(-0.55, 0.55, -0.55, 10);
    addLine(-0.55, 0.55, -0.32, 10);
    for (let line = 0; line < 4; line++) {
      addLine(-0.5, 0.5 - (line % 2) * 0.12, -0.08 + line * 0.18, 8);
    }
  }

  const realCount = targets.length;
  while (targets.length < count) {
    targets.push({ x: 0, y: 0, z: 3.5 });
  }

  return { targets, realCount };
}

function drawMockupScaffold(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  type: (typeof mockupTypes)[number],
  alpha: number,
) {
  const x = width * 0.14;
  const y = height * 0.16;
  const w = width * 0.72;
  const h = height * 0.66;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(127,255,176,1)";
  ctx.fillStyle = "rgba(127,255,176,0.08)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, h, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(245,241,234,0.22)";
  ctx.fillRect(x + 22, y + 24, w * 0.18, 6);
  ctx.fillRect(x + w - 110, y + 24, 38, 5);
  ctx.fillRect(x + w - 60, y + 24, 38, 5);

  if (type === "saas") {
    ctx.fillStyle = "rgba(245,241,234,0.1)";
    roundRect(ctx, x + 24, y + 64, w * 0.18, h - 92, 12);
    ctx.fill();
    for (let i = 0; i < 2; i++) {
      roundRect(ctx, x + w * 0.28 + i * w * 0.34, y + 80, w * 0.3, h * 0.28, 12);
      ctx.fill();
    }
    roundRect(ctx, x + w * 0.28, y + h * 0.5, w * 0.64, h * 0.34, 12);
    ctx.fill();
  } else if (type === "landing") {
    ctx.fillRect(x + w * 0.25, y + h * 0.34, w * 0.5, 10);
    ctx.fillRect(x + w * 0.32, y + h * 0.44, w * 0.36, 7);
    roundRect(ctx, x + w * 0.4, y + h * 0.6, w * 0.2, 30, 16);
    ctx.fill();
  } else if (type === "portfolio") {
    [
      [0.08, 0.18, 0.4, 0.4],
      [0.52, 0.18, 0.4, 0.4],
      [0.08, 0.62, 0.84, 0.22],
    ].forEach(([cx, cy, cw, ch]) => {
      roundRect(ctx, x + w * cx, y + h * cy, w * cw, h * ch, 12);
      ctx.fill();
    });
  } else if (type === "ecommerce") {
    for (let col = 0; col < 3; col++) {
      roundRect(ctx, x + w * (0.08 + col * 0.31), y + h * 0.28, w * 0.27, h * 0.5, 12);
      ctx.fill();
    }
  } else {
    ctx.fillRect(x + w * 0.2, y + h * 0.22, w * 0.6, 9);
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(x + w * 0.18, y + h * (0.36 + i * 0.1), w * (0.64 - (i % 2) * 0.1), 5);
    }
  }
  ctx.restore();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function CodeConstellationHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const sizeRef = useRef({ width: 1, height: 1 });
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0, active: false });
  const phaseRef = useRef<Phase>("intro");
  const phaseStartRef = useRef(0);
  const mockupIdxRef = useRef(0);
  const pausedRef = useRef(false);
  const [phaseLabel, setPhaseLabel] = useState("initializing");
  const [paused, setPaused] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const nodeCount = 54;
    nodesRef.current = Array.from({ length: nodeCount }, (_, index) => new Node(index, nodeCount));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setPhase = (next: Phase) => {
      phaseRef.current = next;
      phaseStartRef.current = performance.now();

      if (next === "assembling") {
        const type = mockupTypes[mockupIdxRef.current];
        nodesRef.current.forEach((n) => {
          n.setConstellationTarget();
          n.targetOpacity = n.isText ? 0 : 0.18;
        });
        setPhaseLabel(mockupLabels[type]);
      } else if (next === "dissolving") {
        nodesRef.current.forEach((n) => {
          n.setConstellationTarget();
          n.targetOpacity = n.isText ? 0.7 : 0.55;
        });
        setPhaseLabel("dissolving");
      } else if (next === "constellation") {
        mockupIdxRef.current = (mockupIdxRef.current + 1) % mockupTypes.length;
        setPhaseLabel("constellation");
      } else if (next === "assembled") {
        setPhaseLabel(`${mockupLabels[mockupTypes[mockupIdxRef.current]]} live`);
      } else {
        setPhaseLabel("initializing");
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(320, rect.width);
      const h = Math.max(360, rect.height);
      sizeRef.current = { width: w, height: h };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseRef.current.x = w / 2;
      mouseRef.current.y = h / 2;
      mouseRef.current.px = w / 2;
      mouseRef.current.py = h / 2;
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    setPhase("intro");

    let raf = 0;
    const loop = (now: number) => {
      const w = sizeRef.current.width;
      const h = sizeRef.current.height;
      const elapsed = now - phaseStartRef.current;
      const phase = phaseRef.current;

      if (!pausedRef.current) {
        if (phase === "intro" && elapsed > phaseDurations.intro) setPhase("constellation");
      }

      ctx.clearRect(0, 0, w, h);

      mouseRef.current.px += (mouseRef.current.x - mouseRef.current.px) * 0.08;
      mouseRef.current.py += (mouseRef.current.y - mouseRef.current.py) * 0.08;

      const isConstellation = phase === "constellation" || phase === "intro";
      const cameraFly = phase === "assembling" || phase === "assembled" ? 0.88 : 1;
      const parallaxX = isConstellation ? (mouseRef.current.px - w / 2) * 0.04 : 0;
      const parallaxY = isConstellation ? (mouseRef.current.py - h / 2) * 0.04 : 0;
      const currentType = mockupTypes[mockupIdxRef.current];

      let scaffoldAlpha = 0;
      if (phase === "assembling") scaffoldAlpha = easeInOut(Math.min(1, elapsed / phaseDurations.assembling)) * 0.85;
      else if (phase === "assembled") scaffoldAlpha = 0.9;
      else if (phase === "dissolving") scaffoldAlpha = (1 - easeInOut(Math.min(1, elapsed / phaseDurations.dissolving))) * 0.85;
      if (scaffoldAlpha > 0.01) drawMockupScaffold(ctx, w, h, currentType, scaffoldAlpha);

      // Single, smooth easing speed for all transitions — synchronizes the motion.
      const lerpSpeed = phase === "assembling" || phase === "dissolving" ? 0.07 : 0.04;

      const t = now * 0.0004;
      nodesRef.current.forEach((n, idx) => {
        const drift = isConstellation ? Math.sin(t + idx * 0.7) * 0.018 : 0;
        const driftY = isConstellation ? Math.cos(t * 0.85 + idx * 0.55) * 0.014 : 0;
        const targetX = (isConstellation ? n.cx : n.tx) + drift;
        const targetY = (isConstellation ? n.cy : n.ty) + driftY;
        const targetZ = isConstellation ? n.cz : n.tz;
        n.x += (targetX - n.x) * (pausedRef.current ? 0 : lerpSpeed);
        n.y += (targetY - n.y) * (pausedRef.current ? 0 : lerpSpeed);
        n.z += (targetZ - n.z) * (pausedRef.current ? 0 : lerpSpeed);
        n.opacity += (n.targetOpacity - n.opacity) * 0.06;
      });

      const sorted = [...nodesRef.current].sort((a, b) => b.z - a.z);

      if (isConstellation) {
        ctx.lineWidth = 0.6;
        const projections = sorted.map((n) => n.project(w, h, parallaxX, parallaxY, cameraFly));
        for (let i = 0; i < sorted.length; i++) {
          const p1 = projections[i];
          for (let j = i + 1; j < sorted.length; j++) {
            const p2 = projections[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.14 * Math.min(sorted[i].opacity, sorted[j].opacity);
              ctx.strokeStyle = `rgba(127,255,176,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      sorted.forEach((n) => {
        const p = n.project(w, h, parallaxX, parallaxY, cameraFly);
        if (n.isText) {
          if (!isConstellation) return;
          const size = n.size * p.scale;
          ctx.font = `${size}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `rgba(245,241,234,${Math.min(0.9, n.opacity)})`;
          ctx.fillText(n.text, p.x, p.y);
        } else {
          ctx.fillStyle = `rgba(127,255,176,${Math.min(0.85, n.opacity)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, n.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-32 md:pt-40">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
          >
            <span className="mr-3 inline-block h-px w-7 bg-[var(--accent)] align-middle" />
            Dark Code - independent build studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="max-w-[12ch] text-[clamp(52px,5.6vw,82px)] font-medium leading-[0.98] tracking-[-0.055em] text-[var(--foreground)]"
          >
            <span className="block">We turn <span className="font-light italic text-[var(--accent)]">code</span></span>
            <span className="block">into websites</span>
            <span className="block font-mono text-[0.8em] font-normal tracking-[-0.02em] text-[var(--foreground)]">
              that. feel. built
            </span>
          </motion.h1>

          <motion.div
            className="pointer-events-auto space-y-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
          >
            <p className="max-w-[440px] text-sm leading-7 text-[var(--muted)] md:text-base">
              A small studio building fast, considered websites for people who care about details. No decks, no fake
              polish, just a free preview and a clean build.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)]/55 hover:text-[var(--accent)]"
              >
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                {paused ? "play" : "pause"}
              </button>
              <a
                href={brand.calUrl}
                className="group inline-flex items-center gap-3 border border-white/15 bg-black/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[var(--foreground)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                Start something
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="relative"
        >
          <div className="glass relative min-h-[560px] overflow-hidden rounded-[2rem]">
            <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" />
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(10,10,11,0.72)_100%)]" />
            <div className="pointer-events-none absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 font-mono text-[11px] text-[var(--muted)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
              rendering · {phaseLabel}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
