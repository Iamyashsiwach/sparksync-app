"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative bg-white text-navy py-16 lg:py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-3/4 h-full bg-gradient-to-r from-blue-50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-3/4 h-4/5 bg-gradient-to-l from-teal-500/5 to-transparent"></div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/2 -skew-x-12 transform origin-top-right bg-blue-50/70 z-0"></div>
        <div className="absolute top-20 right-40 h-40 w-40 rounded-full bg-teal-500/10 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 z-10"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-teal/10 text-teal px-4 py-1 rounded-full text-sm font-medium">Leading Network Integration</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold leading-tight">
                Next-Gen Network <span className="text-teal relative inline-block">
                  Solutions
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-teal/30"></span>
                </span> For Modern Business
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl">
                We design, implement, and manage secure, scalable network infrastructure that drives innovation and growth for enterprises of all sizes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
                <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-navy font-semibold px-6 py-3 h-auto rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <Link href="/services">Explore Services</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white text-navy border-teal hover:bg-navy hover:text-white font-semibold px-6 py-3 h-auto rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Cybersecurity</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Passive Services</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">Managed IT</span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">Network Design</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-lg -rotate-6 z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal/10 rounded-lg rotate-6 z-0"></div>
              
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white z-10">
                <div className="aspect-video relative">
                  <Image
                    src="/hero.jpg"
                    alt="Modern network infrastructure"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal/20 via-transparent to-purple-500/10"></div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-teal p-2 rounded-lg shadow-lg flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium text-sm">Enterprise Security</span>
                </div>
                
                {/* <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-blue-600 p-2 rounded-lg shadow-lg flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium text-sm">High Performance</span>
                </div> */}
              </div>
            </div>
            
            {/* Stats counters */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-xl px-4 py-3 flex justify-center gap-6 z-20 w-5/6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Projects</p>
                <p className="text-xl font-bold text-navy">500+</p>
              </div>
              <div className="text-center border-l border-r border-gray-200 px-6">
                <p className="text-sm text-gray-500">Clients</p>
                <p className="text-xl font-bold text-navy">200+</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Uptime</p>
                <p className="text-xl font-bold text-navy">99.9%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 