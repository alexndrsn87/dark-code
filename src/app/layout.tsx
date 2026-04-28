import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Header } from "@/components/ui/Header";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { brand } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.canonicalUrl),
  title: {
    default: "Dark Code | Websites for small businesses from £59/month",
    template: "%s | Dark Code",
  },
  description: brand.tagline,
  openGraph: {
    title: "Dark Code | The hero is the portfolio",
    description: brand.tagline,
    url: brand.canonicalUrl,
    siteName: brand.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <GrainOverlay />
        <CursorGlow />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
