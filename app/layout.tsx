/**
 * Main layout component for the sparksync website
 * This file defines the root layout that wraps all pages in the application
 */
import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

// Configure Poppins font for headings with specific weights
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Configure Open Sans font for body text with specific weights
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

// Define global metadata for SEO
export const metadata: Metadata = {
  title: "sparksync - Enterprise Network Solutions",
  description: "Professional network integration services for enterprises",
  keywords: ["network integration", "IT infrastructure", "enterprise networking", "network security"],
};

// Structured data for SEO
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "sparksync",
  url: "https://sparksync.in",
  logo: "https://sparksync.in/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cabin No 4, 3rd Floor, Oahfeo Coworking Space, Sector 45 Gurgaon 122003"
  },
  sameAs: [
    "https://www.linkedin.com/company/sparksync",
    "https://www.instagram.com/sparksync"
  ],
  contactPoint: [{
    "@type": "ContactPoint",
    telephone: "+91 8950803350",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"]
  }]
};

/**
 * Root layout component that wraps all pages
 * Includes the navbar, main content area, and footer
 * @param {React.ReactNode} children - The page content to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-open-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
