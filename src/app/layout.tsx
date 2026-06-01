import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { berkeley, links, person, SITE_URL } from "@/data/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const title = `${person.name} · ${person.positioning}`;
const description =
  "EECS at UC Berkeley. Backend systems, machine learning pipelines and instrumented hardware, from an internal AI dashboard at LG NOVA to poverty prediction research and Formula SAE brake systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  authors: [{ name: person.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "profile",
    url: SITE_URL,
    siteName: person.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: SITE_URL,
  email: links.email.display,
  jobTitle: "Software Engineer",
  description,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: berkeley.institution,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berkeley",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [links.linkedin.href, links.github.href],
};

export const viewport: Viewport = {
  themeColor: "#0b1526",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[color:var(--ink-invert)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
