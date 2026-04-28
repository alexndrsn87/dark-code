import { processSteps } from "@/content/site";

export function Process() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Process</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Three steps. No theatre.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="glass rounded-[1.7rem] p-6">
              <p className="font-mono text-sm text-[var(--accent)]">0{index + 1}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
