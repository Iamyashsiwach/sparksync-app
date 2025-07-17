/**
 * Dynamic Service Page Component for Revee InfoTech website
 * Displays detailed information about a specific service based on the URL slug
 */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import CTA from "@/components/cta";

/**
 * Generates metadata for the service page based on the slug parameter
 * This function is called at build time by Next.js
 * @param {Object} props - The props object
 * @param {Object} props.params - The route parameters containing the slug
 * @returns {Metadata} - The metadata for the page
 */
export const generateMetadata = ({ params }: { params: any }): Metadata => {
  const service = getServiceBySlug(params.slug);
  
  if (!service) {
    return {
      title: "Service Not Found | sparksync",
      description: "The requested service could not be found.",
    };
  }
  
  return {
    title: `${service.title} | sparksync Services`,
    description: service.description,
  };
};

/**
 * Generates static paths for each service slug.
 * This is required for static site generation (`output: 'export'`).
 */
export async function generateStaticParams() {
  const services = [
    { slug: "network-design" },
    { slug: "cybersecurity" },
    { slug: "cloud-solutions" },
    { slug: "managed-services" },
    { slug: "voip-solutions" },
    { slug: "passive-services" },
    { slug: "it-consulting" },
  ];
  return services.map((s) => ({
    slug: s.slug,
  }));
}

/**
 * Helper function to retrieve a service by its slug
 * @param {string} slug - The URL slug of the service to retrieve
 * @returns {Object|undefined} - The service object if found, or undefined
 */
const getServiceBySlug = (slug: string) => {
  const services = [
    {
      slug: "network-design",
      title: "Network Design & Implementation",
      description: "Custom network architecture design and implementation for businesses of all sizes.",
      longDescription: "Our network design and implementation services provide businesses with custom-tailored network infrastructure solutions. From initial assessment to final deployment, we create reliable, secure, and scalable network systems that meet your specific requirements.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      features: [
        "Comprehensive network assessment and planning",
        "Custom topology design for optimal performance",
        "Hardware procurement and implementation",
        "Network security integration",
        "Thorough testing and validation",
        "Detailed documentation and knowledge transfer",
      ],
      benefits: [
        "Improved network reliability and uptime",
        "Enhanced performance and reduced latency",
        "Scalable infrastructure that grows with your business",
        "Reduced operational costs through efficient design",
        "Simplified management and maintenance",
      ],
    },
    {
      slug: "cybersecurity",
      title: "Cybersecurity",
      description: "Protect your business with comprehensive security solutions and threat monitoring.",
      longDescription: "Our cybersecurity services provide comprehensive protection for your business against evolving digital threats. We implement robust security measures, continuous monitoring, and rapid incident response to safeguard your critical data and systems.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      features: [
        "Security assessment and vulnerability scanning",
        "Firewall implementation and management",
        "Endpoint protection deployment",
        "24/7 security monitoring and threat detection",
        "Incident response planning and execution",
        "Security awareness training for employees",
      ],
      benefits: [
        "Reduced risk of data breaches and cyber attacks",
        "Protection of sensitive customer information",
        "Compliance with industry regulations and standards",
        "Early detection of security threats",
        "Rapid response to security incidents",
      ],
    },
    {
      slug: "cloud-solutions",
      title: "Cloud Solutions",
      description: "Seamlessly migrate and manage your infrastructure in the cloud for better scalability.",
      longDescription: "Our cloud solutions help businesses leverage the power and flexibility of cloud computing. We design, implement, and manage cloud environments that enhance scalability, reduce costs, and improve accessibility for your organization.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      features: [
        "Cloud readiness assessment",
        "Migration planning and execution",
        "AWS, Azure, and Google Cloud implementation",
        "Hybrid and multi-cloud solutions",
        "Cloud security and compliance",
        "Ongoing cloud optimization and management",
      ],
      benefits: [
        "Improved scalability to meet changing business demands",
        "Reduced capital expenditures on hardware",
        "Enhanced business continuity and disaster recovery",
        "Increased flexibility and mobility for your workforce",
        "Access to advanced technologies and services",
      ],
    },
    {
      slug: "managed-services",
      title: "Managed IT Services",
      description: "Comprehensive IT management and support for your business needs.",
      longDescription: "Our managed IT services provide businesses with complete management and support of their technology infrastructure. We handle monitoring, maintenance, and support, allowing you to focus on your core business operations.",
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      features: [
        "24/7 infrastructure monitoring and management",
        "Proactive maintenance and updates",
        "Help desk support for end users",
        "Vendor relationship management",
        "Regular reporting and IT strategy planning",
        "Technology asset management",
      ],
      benefits: [
        "Predictable monthly IT costs",
        "Reduced downtime and improved reliability",
        "Fast resolution of IT issues",
        "Access to a team of IT specialists",
        "Strategic IT planning aligned with business goals",
      ],
    },
    // {
    //   slug: "data-backup-recovery",
    //   title: "Data Backup & Recovery",
    //   description: "Ensure business continuity with robust backup and disaster recovery solutions.",
    //   longDescription: "Our data backup and recovery services protect your critical business information from loss. We implement comprehensive backup solutions and disaster recovery plans to ensure your data remains safe and accessible even in worst-case scenarios.",
    //   image: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
    //   features: [
    //     "Automated backup implementation",
    //     "Multi-location data replication",
    //     "Disaster recovery planning and testing",
    //     "Rapid data restoration capabilities",
    //     "Regular backup verification",
    //     "Secure offsite storage solutions",
    //   ],
    //   benefits: [
    //     "Protection against data loss from various causes",
    //     "Minimized downtime during recovery operations",
    //     "Business continuity during and after disasters",
    //     "Compliance with data retention requirements",
    //     "Peace of mind knowing your data is protected",
    //   ],
    // },
    {
      slug: "voip-solutions",
      title: "VoIP Solutions",
      description: "Modern, flexible, and cost-effective business communication systems.",
      longDescription: "Our VoIP solutions provide businesses with advanced communication systems that enhance collaboration and reduce costs. We design, implement, and support unified communications platforms that integrate voice, video, and messaging.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      features: [
        "IP phone system implementation",
        "Video conferencing integration",
        "Unified communications platforms",
        "Mobile device integration",
        "Call center and IVR solutions",
        "Quality of service optimization",
      ],
      benefits: [
        "Reduced communication costs",
        "Enhanced collaboration capabilities",
        "Improved flexibility and mobility",
        "Advanced features not available with traditional phone systems",
        "Simplified management through unified platforms",
      ],
    },
    {
      slug: "passive-services",
      title: "Passive Services",
      description: "Professional passive networking infrastructure design and installation for reliable connectivity.",
      longDescription: "Our passive services provide expert design and installation of structured cabling, fiber optics, and copper solutions. We ensure your network backbone is reliable, well-documented, and certified for optimal performance.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
      features: [
        "Structured cabling design",
        "Fiber optic and copper installation",
        "Rack and patch panel setup",
        "Labeling and documentation",
        "Testing and certification",
      ],
      benefits: [
        "Reliable network backbone",
        "Certified and documented infrastructure",
        "Reduced downtime and maintenance costs",
        "Future-proof cabling for upgrades",
        "Professional installation and support",
      ],
    },
    {
      slug: "it-consulting",
      title: "IT Consulting",
      description: "Strategic technology consulting to drive your business forward with expert guidance and solutions.",
      longDescription: "Our IT consulting services provide businesses with expert guidance on technology strategy, digital transformation, and IT infrastructure optimization. We help organizations align their technology investments with business goals, improve operational efficiency, and stay ahead of technological trends.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      features: [
        "Technology strategy development",
        "Digital transformation planning",
        "IT infrastructure assessment",
        "Cloud migration consulting",
        "Cybersecurity strategy",
        "IT governance and compliance",
        "Technology roadmap development",
        "Vendor management and selection",
        "IT budget optimization",
        "Process improvement consulting"
      ],
      benefits: [
        "Strategic technology alignment with business goals",
        "Reduced IT costs and improved ROI",
        "Enhanced operational efficiency",
        "Better risk management and compliance",
        "Future-proof technology investments",
        "Improved decision-making with data-driven insights",
        "Streamlined IT operations",
        "Increased competitive advantage",
        "Scalable technology solutions",
        "Expert guidance from industry professionals"
      ],
    },
  ];
  
  return services.find(service => service.slug === slug);
};

/**
 * Service Page component that renders detailed information about a specific service
 * @param {Object} props - The component props
 * @param {Object} props.params - The route parameters containing the slug
 * @returns {JSX.Element} - The rendered service page
 */
export default function Page({ params }: { params: any }) {
  const service = getServiceBySlug(params.slug);
  
  if (!service) {
    notFound();
  }
  
  return (
    <>
      {/* Hero Section - Banner image with title overlay */}
      <section className="relative py-20 md:py-28 bg-navy text-navy overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy/80"></div>
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div>
              {/* Service title */}
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-gray-900">
                {service.title}
              </h1>
              {/* Service long description */}
              <p className="text-xl text-gray-800 mb-8">
                {service.longDescription}
              </p>
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-black font-semibold px-6">
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-6">
                  <Link href="/case-studies">View Case Studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">
                Key Features
              </h2>
              <p className="text-lg text-gray-700">
                Comprehensive solutions tailored to your business needs
              </p>
            </div>
            {/* Compact features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white via-blue-50 to-teal/10 p-4 rounded-xl shadow-md border border-teal/10 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-teal/10 group-hover:bg-teal/20 transition-colors">
                    <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-900 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">
                Benefits
              </h2>
              <p className="text-lg text-gray-700">
                Why choose our services for your business
              </p>
            </div>
            {/* Compact benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white via-blue-100 to-teal/10 p-4 rounded-xl shadow-md border border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-blue-200/30 group-hover:bg-blue-300/40 transition-colors">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-900 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section - Value proposition cards */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section heading */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                Why Choose Our {service.title} Services
              </h2>
              <p className="text-gray-600">
                With years of experience and a team of certified experts, we deliver reliable and effective solutions that meet your business needs.
              </p>
            </div>
          </div>
          
          {/* Three-column grid of value proposition cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Certified Experts card */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-teal mb-4 w-12 h-12 flex items-center justify-center rounded-md bg-teal/10">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-2">Certified Experts</h3>
              <p className="text-gray-600">
                Our team consists of industry-certified professionals with extensive experience in implementing and managing {service.title.toLowerCase()} solutions.
              </p>
            </div>
            
            {/* Proven Methodology card */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-teal mb-4 w-12 h-12 flex items-center justify-center rounded-md bg-teal/10">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-2">Proven Methodology</h3>
              <p className="text-gray-600">
                We follow a structured and tested methodology that ensures successful implementation and delivers measurable results for your business.
              </p>
            </div>
            
            {/* Ongoing Support card */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-teal mb-4 w-12 h-12 flex items-center justify-center rounded-md bg-teal/10">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                We provide comprehensive support and maintenance after implementation, ensuring your systems continue to operate at peak performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Services Section - Link to all services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                Explore Our Other Services
              </h2>
              <p className="text-gray-600">
                Discover our full range of IT and network solutions designed to help your business thrive.
              </p>
            </div>
          </div>
          
          {/* Button to view all services */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-black font-semibold px-8">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Final call to action */}
      <CTA
        title={`Ready to Transform Your ${service.title}?`}
        subtitle="Contact us today for a free consultation and discover how our solutions can help your business grow."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
} 