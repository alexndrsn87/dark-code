export function FounderNote() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="section-shell">
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Founder note</p>
          <blockquote className="relative mt-8 max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-[-0.05em] md:text-5xl">
            Dark Code is new. We&apos;re building it the way we build for clients: fast, considered, and without the
            agency bloat.
          </blockquote>
          <p className="relative mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            If you&apos;re one of the first, we&apos;ll treat your project like it&apos;s the only one we have. Because
            it is. No fake case studies, no borrowed logos, no mystery process. Just a sharp preview, a clean build,
            and a site that works.
          </p>
          <p className="relative mt-8 font-mono text-sm text-[var(--foreground)]">Alex, Dark Code</p>
        </div>
      </div>
    </section>
  );
}
