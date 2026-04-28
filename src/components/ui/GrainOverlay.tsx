export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="noise-mask pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen"
    />
  );
}
