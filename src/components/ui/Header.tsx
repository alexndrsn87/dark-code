import Link from "next/link";
import { brand } from "@/content/site";

const navItems = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#0a0a0b]/75 px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${brand.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] font-mono text-sm font-bold text-[var(--accent)] shadow-[0_0_30px_rgba(127,255,176,0.2)]">
            DC
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.18em] text-[var(--foreground)]">
            DARK CODE
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={brand.calUrl}
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_28px_rgba(127,255,176,0.28)] transition-transform hover:-translate-y-0.5"
        >
          Start something
        </a>
      </div>
    </header>
  );
}
