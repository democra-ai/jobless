import type { Metadata } from "next";
import "./globals.css";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";

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

export const metadata: Metadata = {
  title: "JOBLESS - AI's Impact on Jobs: Displacement, Creation, and Your Future",
  description: "Comprehensive data-driven insights on AI's impact on employment. View job displacement AND creation, industry analysis, and personalized risk assessment with action recommendations.",
  keywords: ["AI", "employment", "jobs", "automation", "replacement risk", "job creation", "WEF", "PwC", "MIT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-body bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
