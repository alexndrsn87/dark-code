import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { processSteps, prototype } from "@/content/site";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How Dark Code works: start with a free preview, approve the direction, then launch with hosting and support handled.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From first message to live website."
        body="Here’s exactly what happens when you work with Dark Code. No long discovery theatre, no mystery portal, no waiting months."
      />
      <section className="section-shell pb-24">
        <div className="grid gap-5">
          {processSteps.map((step, index) => (
            <article key={step.title} className="glass grid gap-6 rounded-[2rem] p-7 md:grid-cols-[8rem_1fr] md:p-9">
              <div>
                <p className="font-mono text-sm text-[var(--accent)]">Step 0{index + 1}</p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.05em]">{step.title}</h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[var(--accent)]/30 bg-black/40 p-7 md:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Short version</p>
          <ul className="mt-6 grid gap-3 text-lg md:grid-cols-2">
            <li>Free preview in {prototype.buildWindow}, built around your business.</li>
            <li>You review the direction before the full build starts.</li>
            <li>Full site built and launched in days, not months.</li>
            <li>Hosting, domain connection, updates, and support handled for you.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
