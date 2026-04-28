import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common Dark Code questions about pricing, contracts, domains, updates, SEO, and support.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Plain answers. No agency fog."
        body="Everything you need to know before starting a free preview with Dark Code."
      />
      <section className="section-shell pb-24">
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <details
              key={item.q}
              className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 open:border-[var(--accent)]/35"
              open={index === 0}
            >
              <summary className="cursor-pointer list-none text-lg font-semibold tracking-[-0.02em] marker:hidden">
                {item.q}
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
