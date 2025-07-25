/**
 * Footer Component for sparksync website
 * Contains company information, navigation links, and contact details
 */
import Link from "next/link";

/**
 * Footer component with responsive grid layout
 * Displays company info, services, quick links, and contact information
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Footer content grid - responsive layout with 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Company information and social media links */}
          <div>
            <h3 className="text-lg md:text-xl font-poppins font-semibold mb-3 md:mb-4 text-teal-400">sparksync</h3>
            <p className="text-sm md:text-base text-gray-200 mb-4">
              Enterprise network solutions for businesses of all sizes. Delivering reliable and secure network infrastructure.
            </p>
            {/* Social media icons */}
            <div className="flex space-x-4">
              {/* LinkedIn icon */}
              <a href="https://www.linkedin.com/company/sparksync" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-teal-400 p-1">
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Instagram icon */}
              <a href="https://www.instagram.com/sparksync" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-teal-400 p-1">
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Services links */}
          <div>
            <h3 className="text-lg md:text-xl font-poppins font-semibold mb-3 md:mb-4 text-teal-400">Services</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><Link href="/services/network-design" className="text-gray-200 hover:text-teal-400">Network Design</Link></li>
              <li><Link href="/services/cybersecurity" className="text-gray-200 hover:text-teal-400">Cybersecurity</Link></li>
              <li><Link href="/services/passive-services" className="text-gray-200 hover:text-teal-400">Passive Services</Link></li>
              <li><Link href="/services/managed-services" className="text-gray-200 hover:text-teal-400">Managed Services</Link></li>
              <li><Link href="/services/voip-solutions" className="text-gray-200 hover:text-teal-400">VoIP Solutions</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Quick links */}
          <div>
            <h3 className="text-lg md:text-xl font-poppins font-semibold mb-3 md:mb-4 text-teal-400">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><Link href="/about" className="text-gray-200 hover:text-teal-400">About Us</Link></li>
              <li><Link href="/case-studies" className="text-gray-200 hover:text-teal-400">Case Studies</Link></li>
              <li><Link href="/contact" className="text-gray-200 hover:text-teal-400">Contact</Link></li>
              {/* <li><Link href="/privacy-policy" className="text-gray-200 hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-200 hover:text-teal-400">Terms of Service</Link></li> */}
            </ul>
          </div>
          
          {/* Column 4: Contact information with icons */}
          <div>
            <h3 className="text-lg md:text-xl font-poppins font-semibold mb-3 md:mb-4 text-teal-400">Contact Us</h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-200">
              {/* Office Address with icon */}
              <li className="flex items-start">
                <svg className="h-5 w-5 md:h-6 md:w-6 mr-2 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Office Address: 3rd Floor, Oahfeo Coworking Space, Sector 45 Gurgaon 122003</span>
              </li>
              {/* Phone with icon */}
              <li className="flex items-start">
                <svg className="h-5 w-5 md:h-6 md:w-6 mr-2 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+917056803350" className="text-gray-200 hover:text-teal-400">Mobile No: +91 7056803350</a>
              </li>
              {/* Email with icon */}
              <li className="flex items-start">
                <svg className="h-5 w-5 md:h-6 md:w-6 mr-2 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@sparksync.in" className="text-gray-200 hover:text-teal-400">Email ID: support@sparksync.in</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="border-t border-gray-700 mt-8 md:mt-10 pt-4 md:pt-6 text-center text-xs md:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} sparksync. All rights reserved.</p>
          <p className="mt-1">
            Designed and developed by <a href="https://www.bluelayerstudio.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">BlueLayer Studio</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;