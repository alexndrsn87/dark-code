import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { termsSections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms",
  description: "Dark Code terms covering contracts, pricing, ownership, cancellation, and service scope.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title="Terms of service."
        body="Plain-English terms for Dark Code website subscriptions and related services."
      />
      <section className="section-shell max-w-3xl pb-24">
        <div className="glass space-y-10 rounded-[2rem] p-7 md:p-10">
          <p className="leading-7 text-[var(--muted)]">
            These terms apply to all website subscriptions and related services provided by Dark Code. If anything here
            is unclear, ask us and we will explain it in plain English.
          </p>
          {termsSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
