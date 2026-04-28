import type { Metadata } from "next";
import { Calendar, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a free Dark Code website preview or ask a question.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start with a message."
        body="No long form, no sales theatre. Book a slot or email us with what you need."
      />
      <section className="section-shell pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          <a href={brand.calUrl} className="glass rounded-[2rem] p-7 transition-transform hover:-translate-y-1">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Calendar className="h-6 w-6" />
            </span>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.05em]">Book a free preview call</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Use the placeholder Cal.com link for now. We can swap it for your real booking page whenever you are
              ready.
            </p>
          </a>
          <a href={`mailto:${brand.email}`} className="glass rounded-[2rem] p-7 transition-transform hover:-translate-y-1">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.05em]">Email Dark Code</h2>
            <p className="mt-4 font-mono text-sm text-[var(--accent)]">{brand.email}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Tell us what your business does and what you want the site to achieve. We will take it from there.
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
