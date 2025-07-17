"use client";
/**
 * Call-to-Action (CTA) Component for Revee InfoTech website
 * A reusable component that displays a prominent call to action section
 * with customizable text and button
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Props interface for the CTA component
 * @property {string} title - The main heading for the CTA
 * @property {string} subtitle - Descriptive text below the heading
 * @property {string} buttonText - Text to display on the CTA button
 * @property {string} buttonLink - URL the button should link to
 */
interface CTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

/**
 * CTA component that creates a visually appealing call-to-action section
 * Features gradient background, decorative elements, and a prominent button
 * @param {CTAProps} props - The properties for the CTA component
 */
const CTA = ({ title, subtitle, buttonText, buttonLink }: CTAProps) => {
  return (
    <section className="bg-gradient-to-r from-teal/30 via-teal/20 to-teal/10 py-16 md:py-20 relative overflow-hidden">
      {/* Subtle dot pattern background overlay */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      {/* Decorative gradient accent stripe at the top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-navy/70 to-transparent"></div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            {/* Title with emphasized styling */}
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy">{title}</h2>
            {/* Subtitle with supportive information */}
            <p className="text-lg text-gray-700">{subtitle}</p>
            {/* CTA button with hover effects */}
            <div className="pt-4">
              <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-navy border border-navy font-medium px-8 py-3 h-auto shadow-lg transition-all duration-300 hover:scale-105">
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;