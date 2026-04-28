import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { activationFee, addOns, brand, plans } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Dark Code pricing: Presence from £59/month and Visibility from £119/month, plus a one-off £99 activation fee.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Two clear plans. Same sharp build."
        body="Start with a free preview. If you go ahead, choose the plan that fits how much visibility and support you need."
      />
      <section className="section-shell pb-24">
        <div className="grid gap-5 lg:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`glass rounded-[2rem] p-7 ${plan.featured ? "border-[var(--accent)]/45 shadow-[0_0_90px_rgba(127,255,176,0.16)]" : ""}`}
            >
              {plan.featured ? (
                <p className="mb-5 inline-flex rounded-full bg-[var(--accent)] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-ink)]">
                  Most popular
                </p>
              ) : null}
              <h2 className="text-3xl font-semibold tracking-[-0.05em]">{plan.name}</h2>
              <p className="mt-3 min-h-16 text-sm leading-7 text-[var(--muted)]">{plan.description}</p>
              <p className="mt-8">
                <span className="text-6xl font-semibold tracking-[-0.07em]">£{plan.price}</span>
                <span className="text-[var(--muted)]">/month</span>
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">Plus a one-off {activationFee.label} activation fee.</p>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-[var(--muted)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={brand.calUrl}
                className="mt-8 inline-flex w-full justify-center rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--accent-ink)]"
              >
                Start with a free preview
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Add-ons</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {addOns.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-semibold">{item.label}</p>
                  <p className="font-mono text-sm text-[var(--accent)]">{item.price}</p>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
