import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Syne, Space_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
};

const META_TITLE = "AIR - AI Replacement Risk: Displacement, Creation, and Your Future";
const META_DESC = "Comprehensive data-driven insights on AI's impact on employment. Calculate your AI replacement risk, view job displacement data, industry analysis, and personalized action recommendations. Data from MIT, McKinsey, WEF, PwC.";

async function resolveMetadataBaseFromHeaders() {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (!host) {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://air.democra.ai';
  }
  const proto = h.get('x-forwarded-proto') ?? (host.includes('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL(await resolveMetadataBaseFromHeaders());

  return {
    metadataBase,
    title: META_TITLE,
    description: META_DESC,
    keywords: ["AI", "employment", "jobs", "automation", "replacement risk", "job creation", "data protection", "AI training data", "WEF", "PwC", "MIT", "McKinsey"],
    openGraph: {
      title: "AIR - How Fast Is AI Replacing Human Jobs?",
      description: "Calculate your AI replacement risk. MIT: 11.7% replaceable now. McKinsey: 57% technically possible. Your data is training AI to replace you.",
      siteName: "AIR",
      type: "website",
      url: metadataBase.toString(),
      locale: "en_US",
      images: [{ url: "/share-card.png", width: 1200, height: 630, alt: "AIR - AI Replacement Risk Platform" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "AIR - How Fast Is AI Replacing Human Jobs?",
      description: "Calculate your AI replacement risk. MIT: 11.7% replaceable now. McKinsey: 57% technically possible.",
      images: ["/share-card.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(syne.variable, spaceGrotesk.variable, jetbrainsMono.variable, "font-sans", geist.variable, "dark")} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('air-style');if(s)document.documentElement.setAttribute('data-style',s);var t=localStorage.getItem('air-theme');document.documentElement.setAttribute('data-theme',t||'dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased font-body bg-background text-foreground transition-colors duration-300">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
