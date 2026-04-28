import { brand } from "@/content/site";

export function Cta() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-[var(--accent)]/25 bg-[var(--accent)] px-8 py-12 text-[var(--accent-ink)] md:px-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-ink)]/85">
            Free preview
          </p>
          <h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.07em] md:text-7xl">
            Be our first. Get the full attention.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--accent-ink)]/90">
            Start with a free website preview. No card details, no commitment, and nothing to lose.
          </p>
          <a
            href={brand.calUrl}
            className="mt-8 inline-flex rounded-full bg-black px-6 py-3 font-semibold text-[var(--foreground)] transition-transform hover:-translate-y-0.5"
          >
            Start something
          </a>
        </div>
      </div>
    </section>
  );
}
