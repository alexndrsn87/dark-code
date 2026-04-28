export type CodeFragment = {
  id: string;
  language: "html" | "css" | "js";
  code: string;
  explain: string;
  orbit: [number, number, number];
  mockup: [number, number, number];
};

export const codeFragments: CodeFragment[] = [
  {
    id: "hero",
    language: "html",
    code: "<section class='hero'>",
    explain: "Sets the first impression.",
    orbit: [-2.7, 1.35, 0],
    mockup: [-1.45, 0.75, 0.18],
  },
  {
    id: "headline",
    language: "html",
    code: "<h1>Book in minutes</h1>",
    explain: "Turns visitors into action.",
    orbit: [1.9, 1.65, -0.4],
    mockup: [-0.65, 0.82, 0.2],
  },
  {
    id: "cta",
    language: "html",
    code: "<button>Start now</button>",
    explain: "Makes the next step obvious.",
    orbit: [2.85, -0.45, 0.25],
    mockup: [0.38, -0.85, 0.28],
  },
  {
    id: "grid",
    language: "css",
    code: "grid-template-columns: repeat(3, 1fr);",
    explain: "Keeps layouts clean.",
    orbit: [-1.8, -1.55, -0.55],
    mockup: [0.55, 0.38, 0.18],
  },
  {
    id: "motion",
    language: "css",
    code: "transition: 420ms cubic-bezier(.2,.8,.2,1);",
    explain: "Makes the interface feel considered.",
    orbit: [0.25, 2.2, 0.5],
    mockup: [1.35, 0.1, 0.25],
  },
  {
    id: "schema",
    language: "js",
    code: "addStructuredData({ type: 'LocalBusiness' })",
    explain: "Helps search engines understand the site.",
    orbit: [-3.1, -0.3, 0.5],
    mockup: [-1.2, -0.35, 0.26],
  },
  {
    id: "perf",
    language: "js",
    code: "preloadCriticalAssets();",
    explain: "Keeps important pages fast.",
    orbit: [0.45, -2.05, -0.2],
    mockup: [1.0, -0.62, 0.18],
  },
  {
    id: "form",
    language: "html",
    code: "<form action='/lead'>",
    explain: "Captures enquiries without friction.",
    orbit: [2.2, -1.7, -0.35],
    mockup: [-0.15, -0.2, 0.28],
  },
  {
    id: "theme",
    language: "css",
    code: "--accent: #7FFFB0;",
    explain: "Gives the brand a pulse.",
    orbit: [-0.9, 2.35, -0.25],
    mockup: [1.42, 0.72, 0.2],
  },
  {
    id: "deploy",
    language: "js",
    code: "await deploy({ target: 'production' })",
    explain: "Turns the build into a live site.",
    orbit: [3.05, 0.75, 0.45],
    mockup: [-1.35, -0.88, 0.2],
  },
];

export const mockupStyles = [
  {
    name: "Local service",
    headline: "Emergency plumber",
    lines: ["Callout areas", "Reviews", "Book now"],
  },
  {
    name: "Booking page",
    headline: "Appointments live",
    lines: ["Calendar", "Lead form", "Instant trust"],
  },
  {
    name: "Portfolio",
    headline: "Selected work",
    lines: ["Gallery", "Story", "Enquiry"],
  },
  {
    name: "SaaS",
    headline: "Operator dashboard",
    lines: ["Metrics", "Automations", "Reports"],
  },
  {
    name: "Product",
    headline: "Launch offer",
    lines: ["Feature stack", "Proof", "Checkout"],
  },
] as const;
