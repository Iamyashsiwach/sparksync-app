"use client";
/**
 * Navigation Bar Component for sparksync website
 * Includes responsive design with mobile menu toggle functionality
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * Navbar component that provides site navigation
 * Features responsive design with hamburger menu for mobile devices
 */
const Navbar = () => {
  // State to track whether mobile menu is open or closed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle function for mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-3 md:py-4 px-4 md:px-6">
        {/* Logo and brand name */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-bold text-navy">sparksync</span>
        </Link>
        
        {/* Desktop navigation menu - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="text-gray-600 hover:text-navy font-medium">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-navy font-medium">
            About
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-navy font-medium">
            Services
          </Link>
          <Link href="/case-studies" className="text-gray-600 hover:text-navy font-medium">
            Case Studies
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-navy font-medium">
            Contact
          </Link>
        </nav>
        
        {/* CTA button and mobile menu toggle */}
        <div className="flex items-center">
          {/* CTA buttons - hidden on extra small screens */}
          <div className="hidden sm:flex space-x-2">
          </div>
          
          {/* Mobile menu hamburger icon - only visible on mobile */}
          <button 
            className="md:hidden ml-4"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-navy">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - only renders when mobileMenuOpen is true */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {/* Mobile navigation links - each closes the menu when clicked */}
            <Link 
              href="/" 
              className="text-gray-600 hover:text-navy font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-navy font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-navy font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/case-studies" 
              className="text-gray-600 hover:text-navy font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-navy font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Mobile CTA buttons */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar; 