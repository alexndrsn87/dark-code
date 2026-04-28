export const brand = {
  name: "Dark Code",
  domain: "dark-code.co.uk",
  canonicalUrl: "https://dark-code.co.uk",
  email: "hello@dark-code.co.uk",
  calUrl: "https://cal.com/dark-code/start",
  tagline:
    "Technically sharp websites for small businesses from £59/month. We build it, host it, and keep it running.",
} as const;

export const prototype = {
  priceLabel: "Free",
  normalPriceLabel: "£99",
  buildWindow: "a few days",
  buildWindowShort: "few days",
} as const;

export const activationFee = {
  label: "£99",
  description: "One-off activation fee on sign-up",
} as const;

export const billing = {
  cancelNotice: "30 days' notice",
  minimumTerm: "12 months",
} as const;

export const updates = {
  standardTurnaround: "48 hours",
} as const;

export const plans = [
  {
    id: "presence",
    name: "Presence",
    price: 59,
    featured: false,
    description: "A sharp, managed website for businesses that need to look credible online.",
    bestFor: "Best for trades, local services, consultants, and independents.",
    features: [
      "5-page website",
      "Mobile-first design",
      "Hosting and domain connection",
      "Basic SEO foundations",
      "One small content update per quarter",
      "Email support",
    ],
  },
  {
    id: "visibility",
    name: "Visibility",
    price: 119,
    featured: true,
    description: "Everything in Presence, plus the local search foundations that help people find you.",
    bestFor: "Best for businesses that want to show up better on Google.",
    features: [
      "Everything in Presence",
      "Google Business Profile setup",
      "Schema markup and sitemap",
      "Search Console setup",
      "One small content update per month",
      "Priority support",
    ],
  },
] as const;

export const addOns = [
  { label: "Extra small content change", price: "£25", note: "For updates that take under 30 minutes." },
  { label: "Domain registration", price: "£25/year", note: "If you do not already own one." },
  { label: "Extra page", price: "From £75", note: "Quoted before we build it." },
  { label: "Booking or enquiry widget", price: "£75 one-off", note: "Calendly, Acuity, or Tally, embedded and styled." },
] as const;

export const processSteps = [
  {
    title: "Start with a free preview",
    body: `We build a working preview in ${prototype.buildWindow}. No card details and no commitment.`,
  },
  {
    title: "Approve the direction",
    body: "Tell us what to keep, change, sharpen, or remove. We do the full build once the direction feels right.",
  },
  {
    title: "Go live and stay looked after",
    body: `We handle launch, hosting, updates, and the boring technical bits. Small updates are usually handled within ${updates.standardTurnaround}.`,
  },
] as const;

export const heroMockups = [
  "Local service site",
  "Booking landing page",
  "Portfolio homepage",
  "SaaS dashboard",
  "Product page",
] as const;
