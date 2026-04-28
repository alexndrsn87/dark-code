"use client";

import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Html, Line, RoundedBox } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Group, MathUtils, Vector3 } from "three";
import { Pause, Play } from "lucide-react";
import { brand } from "@/content/site";
import { codeFragments, mockupStyles, type CodeFragment } from "./mockups";

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduced(query.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

function CodePill({
  fragment,
  assembled,
  paused,
}: {
  fragment: CodeFragment;
  assembled: boolean;
  paused: boolean;
}) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const orbit = useMemo(() => new Vector3(...fragment.orbit), [fragment.orbit]);
  const mockup = useMemo(() => new Vector3(...fragment.mockup), [fragment.mockup]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const target = assembled ? mockup : orbit;
    group.current.position.lerp(target, 0.045);
    const pulse = paused ? 0 : Math.sin(clock.elapsedTime * 1.8 + orbit.x) * 0.025;
    group.current.scale.setScalar((hovered ? 1.16 : 1) + pulse);
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, assembled ? 0 : orbit.x * 0.08, 0.05);
  });

  const handlePointer = (event: ThreeEvent<PointerEvent>, next: boolean) => {
    event.stopPropagation();
    setHovered(next);
    document.body.style.cursor = next ? "pointer" : "";
  };

  return (
    <group ref={group} position={fragment.orbit}>
      <Html transform occlude={false} distanceFactor={9}>
        <div
          onPointerEnter={(event) => handlePointer(event as unknown as ThreeEvent<PointerEvent>, true)}
          onPointerLeave={(event) => handlePointer(event as unknown as ThreeEvent<PointerEvent>, false)}
          className={`rounded-2xl border px-3 py-2 font-mono text-[10px] shadow-2xl backdrop-blur-md transition-all duration-500 ${
            hovered
              ? "border-[var(--accent)] bg-[rgba(127,255,176,0.16)] text-[var(--foreground)]"
              : "border-white/12 bg-black/50 text-[var(--muted)]"
          }`}
        >
          <span className="mr-2 text-[var(--accent)]">{fragment.language}</span>
          {fragment.code}
          <div
            className={`mt-1 max-w-[14rem] text-[9px] leading-4 text-[var(--foreground)] transition-opacity ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {fragment.explain}
          </div>
        </div>
      </Html>
    </group>
  );
}

function WebsiteMockup({ assembled, activeIndex }: { assembled: boolean; activeIndex: number }) {
  const group = useRef<Group>(null);
  const mockup = mockupStyles[activeIndex % mockupStyles.length];

  useFrame(({ clock }) => {
    if (!group.current) return;
    const targetScale = assembled ? 1 : 0.18;
    group.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.065);
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.12;
    group.current.rotation.x = -0.08 + Math.sin(clock.elapsedTime * 0.2) * 0.035;
  });

  return (
    <group ref={group} position={[0, 0, -0.08]} scale={0.18}>
      <RoundedBox args={[3.35, 2.15, 0.12]} radius={0.12} smoothness={8}>
        <meshBasicMaterial color="#111513" transparent opacity={0.94} />
      </RoundedBox>
      <Html transform position={[0, 0, 0.09]} distanceFactor={6.3}>
        <div className="w-[340px] rounded-[22px] border border-[var(--accent)]/25 bg-[#0d100f]/95 p-4 font-sans shadow-[0_0_70px_rgba(127,255,176,0.22)]">
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]/80" />
          </div>
          <div className="rounded-2xl bg-[var(--accent)]/12 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">{mockup.name}</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">{mockup.headline}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {mockup.lines.map((line) => (
                <div key={line} className="rounded-xl border border-white/10 bg-white/[0.06] p-2 text-[10px] text-[var(--muted)]">
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-full w-3/4 rounded-full bg-[var(--accent)]" />
          </div>
        </div>
      </Html>
    </group>
  );
}

function Scene({ paused, reduced }: { paused: boolean; reduced: boolean }) {
  const rig = useRef<Group>(null);
  const [assembled, setAssembled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (paused || reduced) return;
    const interval = window.setInterval(() => {
      setAssembled((current) => {
        if (!current) return true;
        setActiveIndex((index) => (index + 1) % mockupStyles.length);
        return false;
      });
    }, assembled ? 2200 : 8000);
    return () => window.clearInterval(interval);
  }, [assembled, paused, reduced]);

  useFrame(({ pointer, clock }) => {
    if (!rig.current) return;
    rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.23, 0.035);
    rig.current.rotation.x = MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.13, 0.035);
    if (!paused && !reduced) {
      rig.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.08;
    }
  });

  const linePoints = codeFragments.map((fragment) => fragment.orbit);

  return (
    <group ref={rig}>
      {!assembled && (
        <Line points={linePoints} color="#7fffb0" transparent opacity={0.2} lineWidth={1} dashed dashScale={18} />
      )}
      <WebsiteMockup assembled={assembled || reduced} activeIndex={activeIndex} />
      {codeFragments.map((fragment) => (
        <CodePill key={fragment.id} fragment={fragment} assembled={assembled || reduced} paused={paused || reduced} />
      ))}
    </group>
  );
}

function FallbackHero() {
  return (
    <div className="grid min-h-[420px] place-items-center rounded-[2rem] border border-white/10 bg-black/30 p-6">
      <div className="w-full max-w-lg rounded-[2rem] border border-[var(--accent)]/25 bg-[#0e1110] p-5 shadow-[0_0_70px_rgba(127,255,176,0.18)]">
        <div className="mb-5 flex items-center justify-between font-mono text-xs text-[var(--accent)]">
          <span>code</span>
          <span>to site</span>
        </div>
        <div className="space-y-3 font-mono text-sm text-[var(--muted)]">
          <p>&lt;section class=&quot;hero&quot;&gt;</p>
          <p className="pl-5 text-[var(--foreground)]">&lt;h1&gt;Beautiful websites, shipped&lt;/h1&gt;</p>
          <p className="pl-5 text-[var(--accent)]">deploy({"{ target: 'production' }"})</p>
          <p>&lt;/section&gt;</p>
        </div>
        <div className="mt-6 rounded-2xl bg-[var(--accent)]/12 p-4">
          <div className="h-4 w-2/3 rounded-full bg-[var(--foreground)]/80" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="h-16 rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CodeConstellationHero() {
  const reduced = useReducedMotionPreference();
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-32 md:pt-40">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent)]">
            The hero is the portfolio
          </p>
          <h1 className="mt-6 text-balance text-6xl font-semibold tracking-[-0.07em] md:text-8xl">
            We turn code into sites people trust.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Dark Code builds managed websites for small businesses. The preview is free. The build is fast. The
            technical stuff stays handled.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={brand.calUrl}
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-center font-semibold text-black shadow-[0_0_34px_rgba(127,255,176,0.28)] transition-transform hover:-translate-y-0.5"
            >
              Start something
            </a>
            <a
              href="/pricing"
              className="rounded-full border border-white/12 px-6 py-3 text-center font-semibold text-[var(--foreground)] transition-colors hover:bg-white/6"
            >
              See pricing
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          <div className="absolute right-4 top-4 z-20">
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-xs text-[var(--muted)] backdrop-blur-md transition-colors hover:text-[var(--foreground)]"
              aria-pressed={paused}
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              {paused ? "Play motion" : "Pause motion"}
            </button>
          </div>
          <div className="glass relative min-h-[520px] overflow-hidden rounded-[2rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(127,255,176,0.13),transparent_28rem)]" />
            {reduced ? (
              <FallbackHero />
            ) : (
              <Canvas camera={{ position: [0, 0, 6.3], fov: 48 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={1.8} />
                <Scene paused={paused} reduced={reduced} />
              </Canvas>
            )}
          </div>
          <p className="mt-4 text-center font-mono text-xs text-[var(--muted)]">
            Move your cursor over the code fragments. Every few seconds, they assemble into a site.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
