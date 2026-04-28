import Link from "next/link";
import { brand } from "@/content/site";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold tracking-[0.18em] text-[var(--accent)]">DARK CODE</p>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            Technically sharp sites for small businesses. Built fast, hosted properly, looked after for you.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm text-[var(--muted)]" aria-label="Footer navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--foreground)]">
              {link.label}
            </Link>
          ))}
          <a href={`mailto:${brand.email}`} className="hover:text-[var(--foreground)]">
            {brand.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
