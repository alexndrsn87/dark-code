import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { privacyParagraphs } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Dark Code handles personal data, enquiries, service delivery, and support records.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy policy."
        body="Simple notes on what we collect, why we collect it, and how to ask us about your data."
      />
      <section className="section-shell max-w-3xl pb-24">
        <div className="glass space-y-5 rounded-[2rem] p-7 text-sm leading-7 text-[var(--muted)] md:p-10">
          {privacyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
