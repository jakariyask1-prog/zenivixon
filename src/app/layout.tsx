import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COMPANY_INFO, SITE_METADATA } from "@/lib/constants";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: {
    default: "ZENIVIXON | AI-First Technology Company",
    template: "%s | ZENIVIXON",
  },
  description:
    "ZENIVIXON builds practical AI agents, intelligent workflow automation, and custom enterprise AI integrations for international businesses.",
  keywords: [
    "AI Agents",
    "AI Automation",
    "AI Integration",
    "Custom AI Solutions",
    "Enterprise AI",
    "Software Engineering",
    "Autonomous Agents",
    "ZENIVIXON",
    "ZENIVIXON TECHNOLOGIES",
  ],
  authors: [{ name: "ZENIVIXON TECHNOLOGIES" }],
  creator: "ZENIVIXON TECHNOLOGIES",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.url,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: COMPANY_INFO.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
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
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FCFDFE] dark:bg-[#020817] text-[#0F172A] dark:text-slate-50 selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-50 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Framed Layout Borders */}
          <div className="fixed left-0 top-0 bottom-0 w-3 md:w-5 lg:w-6 bg-[#FCFDFE] dark:bg-[#020817] border-r border-slate-200 dark:border-slate-800 z-[60] pointer-events-none transition-colors duration-300"></div>
          <div className="fixed right-0 top-0 bottom-0 w-3 md:w-5 lg:w-6 bg-[#FCFDFE] dark:bg-[#020817] border-l border-slate-200 dark:border-slate-800 z-[60] pointer-events-none transition-colors duration-300"></div>
          
          <div className="px-3 md:px-5 lg:px-6 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
