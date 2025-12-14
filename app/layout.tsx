import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DesiA11y - ADA/WCAG Compliance Scanner for India | Automated Accessibility Testing",
  description: "Built for Indian teams. Scan your website for ADA, WCAG 2.1, IS 17802, and RPWD Act compliance. Get actionable fixes, detailed PDF reports with Indian context. Powered by Axe-core and Lighthouse.",
  keywords: ["ADA compliance", "WCAG compliance", "IS 17802", "RPWD Act", "GIGW compliance", "accessibility scanner India", "website accessibility", "automated accessibility testing", "Section 508", "accessibility audit India"],
  openGraph: {
    title: "DesiA11y - Accessibility Compliance Scanner for India",
    description: "Built for Indian teams. Fast, accurate accessibility compliance with RPWD, IS 17802, and GIGW context. Actionable fixes, not just reports.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DesiA11y - Accessibility Compliance Scanner for India",
    description: "Built for Indian teams. Fast, accurate accessibility compliance with RPWD, IS 17802, and GIGW context. Actionable fixes, not just reports.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

