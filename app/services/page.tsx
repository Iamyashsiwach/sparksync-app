import { Metadata } from "next";
import ServiceCard from "@/components/service-card";
import CTA from "@/components/cta";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Services | sparksync",
  description: "Explore our comprehensive network integration services including network design, cybersecurity, cloud solutions, and managed IT services",
};

export default function ServicesPage() {
  const services = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Network Design & Implementation",
      description: "Custom network architecture design and implementation for businesses of all sizes.",
      slug: "network-design",
      features: [
        "Network architecture planning",
        "Infrastructure implementation",
        "Performance optimization",
        "Scalability planning",
        "Network documentation",
      ],
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Cybersecurity",
      description: "Protect your business with comprehensive security solutions and threat monitoring.",
      slug: "cybersecurity",
      features: [
        "Security assessment",
        "Firewall implementation",
        "Endpoint protection",
        "Security monitoring",
        "Incident response planning",
      ],
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: "Passive Services",
      description: "Professional passive networking infrastructure design and installation for reliable connectivity.",
      slug: "passive-services",
      features: [
        "Structured cabling design",
        "Fiber optic and copper installation",
        "Rack and patch panel setup",
        "Labeling and documentation",
        "Testing and certification",
      ],
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Managed IT Services",
      description: "Comprehensive IT management and support for your business needs.",
      slug: "managed-services",
      features: [
        "24/7 monitoring",
        "Proactive maintenance",
        "Help desk support",
        "Vendor management",
        "IT strategy consulting",
      ],
    },
    // {
    //   icon: (
    //     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    //     </svg>
    //   ),
    //   title: "Data Backup & Recovery",
    //   description: "Ensure business continuity with robust backup and disaster recovery solutions.",
    //   slug: "data-backup-recovery",
    //   features: [
    //     "Automated backups",
    //     "Offsite replication",
    //     "Disaster recovery planning",
    //     "Fast data restoration",
    //     "Recovery testing",
    //   ],
    // },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "VoIP Solutions",
      description: "Modern, flexible, and cost-effective business communication systems.",
      slug: "voip-solutions",
      features: [
        "IP phone systems",
        "Video conferencing",
        "Unified communications",
        "Mobile integration",
        "Call center solutions",
      ],
    },
    // {
    //   icon: (
    //     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    //     </svg>
    //   ),
    //   title: "IT Compliance & Governance",
    //   description: "Ensure your IT infrastructure meets regulatory requirements and industry standards.",
    //   slug: "compliance-governance",
    //   features: [
    //     "Compliance assessment",
    //     "Policy development",
    //     "Security controls",
    //     "Audit preparation",
    //     "Regulatory reporting",
    //   ],
    // },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "IT Consulting",
      description: "Strategic technology advice to align your IT infrastructure with business goals.",
      slug: "it-consulting",
      features: [
        "IT assessments",
        "Technology roadmapping",
        "Digital transformation",
        "IT budgeting",
        "Project management",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white text-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-teal"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -skew-x-12 transform origin-top-right z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="w-24 h-2 bg-teal mb-6"></div>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-navy">
                Our <span className="text-teal">Services</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Comprehensive network and IT solutions designed to support your business growth and enhance security.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-sm font-medium">Network Design</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Cybersecurity</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Cloud Solutions</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Managed IT</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-8 border-white">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Network infrastructure services"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
              What We Offer
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore our wide range of network and IT solutions tailored to meet your specific business requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.slug}>
                <div className="h-full">
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    slug={service.slug}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
              How We Work
            </h2>
            <p className="text-gray-700">
              Our proven process ensures we deliver solutions that meet your specific business needs and exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative text-center bg-white p-8 rounded-lg shadow-lg border-t-4 border-teal hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-teal text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 z-10 border-4 border-white shadow-md">
                  1
                </div>
                {/* Connector line */}
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-teal/30 z-0"></div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-2">Discovery</h3>
              <p className="text-gray-600">
                We thoroughly assess your current infrastructure and understand your business needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 z-10 border-4 border-white shadow-md">
                  2
                </div>
                {/* Connector line */}
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-blue-500/30 z-0"></div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-2">Strategy</h3>
              <p className="text-gray-600">
                We design a tailored solution that addresses your specific challenges and goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center bg-white p-8 rounded-lg shadow-lg border-t-4 border-purple-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 z-10 border-4 border-white shadow-md">
                  3
                </div>
                {/* Connector line */}
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-purple-500/30 z-0"></div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-2">Implementation</h3>
              <p className="text-gray-600">
                Our experts deploy your solution with minimal disruption to your operations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center bg-white p-8 rounded-lg shadow-lg border-t-4 border-green-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 z-10 border-4 border-white shadow-md">
                  4
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                We provide continuous monitoring, maintenance, and optimization services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to Enhance Your Network Infrastructure?"
        subtitle="Contact us today for a free consultation on how our services can benefit your business."
        buttonText="Get Started"
        buttonLink="/contact"
      />
    </>
  );
} 