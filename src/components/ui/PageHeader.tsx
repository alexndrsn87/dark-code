import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <header className="section-shell pb-12 pt-36 md:pb-16 md:pt-44">
      <Link href="/" className="mb-8 inline-flex text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
        Back to home
      </Link>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent)]">{eyebrow}</p>
      <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{body}</p>
    </header>
  );
}
