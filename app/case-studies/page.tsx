/**
 * Case Studies Page for Revee InfoTech website
 * Displays a collection of case studies in a grid layout with filtering and search
 */
import { Metadata } from "next";
import CaseStudyCard from "@/components/case-study-card";
import CTA from "@/components/cta";
import Image from "next/image";

/**
 * Metadata for SEO optimization
 */
export const metadata: Metadata = {
  title: "Case Studies | sparksync",
  description: "Explore our case studies showcasing successful network integration and IT infrastructure projects",
};

/**
 * Main case studies page component
 * Displays a collection of case studies with filtering options and results overview
 */
export default function CaseStudiesPage() {
  // Sample case studies data
  const caseStudies = [
    {
      title: "Enterprise Network Overhaul for Global Manufacturing Company",
      description: "Redesigned and implemented a scalable network infrastructure across 15 global locations, resulting in 40% improved performance and enhanced security.",
      client: "GlobalTech Manufacturing",
      industry: "Manufacturing",
      image: "https://images.unsplash.com/photo-1633907284646-7abf4a195875?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      slug: "globaltech-manufacturing",
    },
    {
      title: "Cloud Migration for Financial Services Firm",
      description: "Seamlessly migrated critical infrastructure to a hybrid cloud environment, improving scalability while maintaining strict regulatory compliance.",
      client: "Secure Financial Group",
      industry: "Financial Services",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      slug: "secure-financial-cloud",
    },
    {
      title: "Cybersecurity Enhancement for Healthcare Provider",
      description: "Implemented comprehensive security solutions to protect patient data and ensure HIPAA compliance across a network of 12 clinics.",
      client: "MedCare Solutions",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      slug: "medcare-cybersecurity",
    },
    {
      title: "VoIP Implementation for Multi-Location Retail Chain",
      description: "Deployed a unified communications system across 25 retail locations, reducing communication costs by 35% and improving customer service.",
      client: "RetailPlus Chain",
      industry: "Retail",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      slug: "retailplus-voip",
    },
    {
      title: "Managed IT Services for Educational Institution",
      description: "Provided comprehensive IT management for a university with 5,000 students, optimizing operations and reducing IT incidents by 60%.",
      client: "Metro University",
      industry: "Education",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      slug: "metro-university",
    },
    {
      title: "Disaster Recovery Solution for Legal Firm",
      description: "Implemented robust backup and recovery systems that ensured business continuity during a major system failure with minimal data loss.",
      client: "Johnson & Partners Legal",
      industry: "Legal",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      slug: "johnson-disaster-recovery",
    },
  ];

  return (
    <>
      {/* Hero Section with heading and industry filters */}
      <section className="py-16 md:py-24 bg-white text-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-teal"></div>
        
        {/* Background patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -skew-x-12 transform origin-top-right z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left column with heading and industry tags */}
            <div>
              <div className="w-24 h-2 bg-teal mb-6"></div>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-navy">
                Our <span className="text-teal">Success Stories</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Explore how we&apos;ve helped organizations across various industries transform their network infrastructure and technology systems.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">Manufacturing</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Financial</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Healthcare</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Retail</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">Education</span>
              </div>
            </div>
            {/* Right column with featured image - hidden on mobile */}
            <div className="hidden lg:block">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-8 border-white">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt="Team collaborating on successful projects"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Bar Section */}
      <section className="py-6 bg-blue-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Industry filter buttons */}
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              <button className="px-4 py-2 bg-navy text-white rounded-md text-sm font-medium">All Industries</button>
              <button className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">Healthcare</button>
              <button className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">Financial</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium">Manufacturing</button>
              <button className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">Education</button>
            </div>
            {/* Search input field */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search case studies..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map through case studies array to display cards */}
            {caseStudies.map((caseStudy) => (
              <div key={caseStudy.slug}>
                <CaseStudyCard
                  title={caseStudy.title}
                  description={caseStudy.description}
                  client={caseStudy.client}
                  industry={caseStudy.industry}
                  image={caseStudy.image}
                  slug={caseStudy.slug}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Overview Section with metrics */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div>
              <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                Measurable Results
              </h2>
              <p className="text-gray-700">
                Our solutions deliver tangible outcomes that help our clients achieve their business objectives.
              </p>
            </div>
          </div>

          {/* Metrics cards with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Performance metric */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-teal hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-teal text-4xl md:text-5xl font-bold mb-2">40%</div>
              <p className="text-navy font-semibold">Average Performance Improvement</p>
            </div>

            {/* Uptime metric */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-navy hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-navy text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <p className="text-navy font-semibold">Network Uptime</p>
            </div>

            {/* Incident reduction metric */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-orange-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-orange-500 text-4xl md:text-5xl font-bold mb-2">60%</div>
              <p className="text-navy font-semibold">Reduction in IT Incidents</p>
            </div>

            {/* Cost savings metric */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-blue-500 text-4xl md:text-5xl font-bold mb-2">35%</div>
              <p className="text-navy font-semibold">Average Cost Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <CTA
        title="Ready to Achieve Similar Results?"
        subtitle="Contact us today to discuss how we can help your business transform its network infrastructure."
        buttonText="Get Started"
        buttonLink="/contact"
      />
    </>
  );
} 