/**
 * Dynamic Case Study Page Component for Revee InfoTech website
 * Displays detailed information about a specific case study based on the URL slug
 */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import CTA from "@/components/cta";

/**
 * Generates metadata for the case study page based on the slug parameter
 * This function is called at build time by Next.js
 * @param {Object} props - The component props
 * @param {Object} props.params - The route parameters containing the slug
 * @returns {Promise<Metadata>} - The metadata for the page
 */
export async function generateMetadata({ 
  params 
}: { 
  params: any
}): Promise<Metadata> {
  const slug = params?.slug;
  const caseStudy = getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    return {
      title: "Case Study Not Found | sparksync",
      description: "The requested case study could not be found.",
    };
  }
  
  return {
    title: `${caseStudy.title} | sparksync Case Studies`,
    description: caseStudy.description,
  };
}

/**
 * Generates static paths for each case study slug.
 * This is required for static site generation (`output: 'export'`).
 */
export async function generateStaticParams() {
  // We need to define the case studies data here or import it
  // For now, I'll hardcode the slugs based on the existing data in getCaseStudyBySlug
  const caseStudies = [
    { slug: "globaltech-manufacturing" },
    { slug: "secure-financial-cloud" },
    { slug: "medcare-cybersecurity" },
  ];
  
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}


/**
 * Helper function to retrieve a case study by its slug
 * @param {string} slug - The URL slug of the case study to retrieve
 * @returns {object|undefined} - The case study object if found, or undefined
 */
const getCaseStudyBySlug = (slug: string) => {
  // Array of case study data objects
  const caseStudies = [
    {
      slug: "globaltech-manufacturing",
      title: "Enterprise Network Overhaul for Global Manufacturing Company",
      shortTitle: "GlobalTech Manufacturing Network Overhaul",
      description: "Redesigned and implemented a scalable network infrastructure across 15 global locations, resulting in 40% improved performance and enhanced security.",
      client: "GlobalTech Manufacturing",
      industry: "Manufacturing",
      image: "https://images.unsplash.com/photo-1507732052797-d22d0c5a3e66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      challenge: "GlobalTech Manufacturing, a Fortune 500 company with operations in 15 countries, was experiencing significant network performance issues and security vulnerabilities due to an outdated and inconsistent network infrastructure. Each location had implemented its own networking solutions, resulting in compatibility issues, maintenance challenges, and security gaps. The company needed a standardized, high-performance network solution that could support their global operations while providing enhanced security and scalability.",
      solution: "Our team conducted a comprehensive assessment of the existing network infrastructure across all locations and developed a standardized design that could be implemented globally while accommodating local requirements. We deployed a modern, software-defined wide area network (SD-WAN) solution with advanced security features, including next-generation firewalls, intrusion prevention systems, and endpoint protection. The implementation was carefully phased to minimize disruption to manufacturing operations, with each location transitioning during planned maintenance windows.",
      results: [
        "40% improvement in network performance and reduced latency between locations",
        "99.99% network uptime, exceeding the client's target of 99.9%",
        "75% reduction in security incidents within the first year",
        "Standardized infrastructure reduced IT management complexity by 60%",
        "Enabled real-time collaboration between global teams, improving product development efficiency",
      ],
      technologies: [
        "Cisco SD-WAN",
        "Palo Alto Networks Next-Generation Firewalls",
        "VMware NSX",
        "Cisco Catalyst 9000 Series Switches",
        "Splunk for network monitoring and security analytics",
      ],
      testimonial: {
        quote: "sparksync transformed our global infrastructure, providing us with a secure, high-performance network that has significantly improved our operational efficiency. Their methodical approach to the implementation ensured minimal disruption to our manufacturing processes.",
        name: "Robert Chen",
        title: "CIO",
        company: "GlobalTech Manufacturing",
      },
    },
    {
      slug: "secure-financial-cloud",
      title: "Cloud Migration for Financial Services Firm",
      shortTitle: "Secure Financial Cloud Migration",
      description: "Seamlessly migrated critical infrastructure to a hybrid cloud environment, improving scalability while maintaining strict regulatory compliance.",
      client: "Secure Financial Group",
      industry: "Financial Services",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      challenge: "Secure Financial Group, a mid-sized financial services firm managing over $5 billion in assets, was operating with an aging on-premises infrastructure that was becoming increasingly expensive to maintain and couldn't scale to meet growing business demands. The firm needed to modernize its IT infrastructure while ensuring strict compliance with financial regulations, including SOC 2, PCI DSS, and GDPR. Additionally, they required a solution that would provide robust disaster recovery capabilities and enhance data security.",
      solution: "Our team designed and implemented a hybrid cloud strategy that leveraged both private and public cloud resources. We began with a detailed assessment of all applications and data, creating a migration roadmap that prioritized workloads based on business criticality and compliance requirements. Highly sensitive data remained in a private cloud environment with enhanced security controls, while other workloads were migrated to a public cloud platform with appropriate security measures. We implemented a comprehensive security framework that included encryption, identity and access management, and continuous compliance monitoring. The migration was executed in phases to minimize risk, with thorough testing at each stage.",
      results: [
        "Reduced infrastructure costs by 32% while improving performance and scalability",
        "Achieved 100% compliance with all relevant financial regulations",
        "Improved disaster recovery capabilities with 15-minute recovery time objective (RTO)",
        "Enhanced data security with multi-layer encryption and access controls",
        "Increased business agility, allowing new services to be deployed 70% faster",
      ],
      technologies: [
        "Microsoft Azure and Azure Stack",
        "VMware Cloud Foundation",
        "Azure Security Center",
        "HashiCorp Vault for secrets management",
        "Zerto for disaster recovery",
        "Prisma Cloud for cloud security posture management",
      ],
      testimonial: {
        quote: "sparksync's expertise in both cloud technologies and financial compliance was exactly what we needed. They developed and executed a migration strategy that has given us the benefits of cloud computing without compromising security or regulatory compliance.",
        name: "Sarah Johnson",
        title: "CISO",
        company: "Secure Financial Group",
      },
    },
    {
      slug: "medcare-cybersecurity",
      title: "Cybersecurity Enhancement for Healthcare Provider",
      shortTitle: "MedCare Cybersecurity Enhancement",
      description: "Implemented comprehensive security solutions to protect patient data and ensure HIPAA compliance across a network of 12 clinics.",
      client: "MedCare Solutions",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
      challenge: "MedCare Solutions, a healthcare provider operating 12 clinics across the region, faced increasing cybersecurity threats targeting patient data. A security assessment revealed vulnerabilities in their network infrastructure, endpoint protection, and access control systems. The organization needed to strengthen their security posture to protect sensitive patient information, ensure HIPAA compliance, and prevent potential data breaches that could lead to significant financial and reputational damage.",
      solution: "Our team implemented a comprehensive cybersecurity solution tailored to healthcare environments. We deployed a layered security approach that included next-generation firewalls, advanced endpoint protection, and network segmentation to isolate critical systems containing patient data. We enhanced authentication systems with multi-factor authentication and implemented detailed access controls based on role-based permissions. A security information and event management (SIEM) system was deployed to provide real-time monitoring and alerting for potential security incidents. Additionally, we conducted security awareness training for all staff members to address the human element of cybersecurity.",
      results: [
        "Successfully passed HIPAA compliance audit with zero findings",
        "Reduced security vulnerabilities by 85% within three months",
        "Implemented 24/7 security monitoring with automated incident response",
        "Enhanced protection of patient data with advanced encryption and access controls",
        "Increased staff security awareness, reducing successful phishing attempts by 92%",
      ],
      technologies: [
        "Fortinet Security Fabric",
        "CrowdStrike Falcon endpoint protection",
        "Okta Identity and Access Management",
        "Splunk Enterprise Security",
        "KnowBe4 security awareness training",
      ],
      testimonial: {
        quote: "The cybersecurity solution implemented by sparksync has transformed our security posture. Their healthcare-specific expertise ensured that we not only protected our patient data but did so in a way that maintained operational efficiency for our clinical staff.",
        name: "Dr. Michael Reed",
        title: "Chief Medical Information Officer",
        company: "MedCare Solutions",
      },
    },
  ];
  
  // Find and return the case study with the matching slug
  return caseStudies.find(caseStudy => caseStudy.slug === slug);
};

/**
 * Case Study Page component that renders detailed information about a specific case study
 * @param {Object} props - The component props
 * @param {Object} props.params - The route parameters containing the slug
 * @returns {JSX.Element} - The rendered case study page
 */
export default function Page({ 
  params 
}: { 
  params: any
}) {
  const slug = params?.slug;
  const caseStudy = getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    notFound();
  }
  
  return (
    <>
      {/* Hero Section - Banner image with title overlay */}
      <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
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
              {/* Industry badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-medium">
                  {caseStudy.industry}
                </span>
              </div>
              {/* Case study title */}
              <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                {caseStudy.title}
              </h1>
              {/* Client name */}
              <p className="text-xl text-gray-300 mb-4">
                Client: <span className="text-white font-medium">{caseStudy.client}</span>
              </p>
              {/* Brief description */}
              <p className="text-xl text-gray-300 mb-8">
                {caseStudy.description}
              </p>
              {/* CTA button */}
              <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white font-semibold px-6">
                <Link href="/contact">Discuss Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Challenge & Solution Section - Two-column layout */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenge column */}
            <div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-6">
                The Challenge
              </h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p>{caseStudy.challenge}</p>
              </div>
            </div>
            
            {/* Solution column */}
            <div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-6">
                Our Solution
              </h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p>{caseStudy.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section - Checkmarked list of outcomes */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                The Results
              </h2>
              <p className="text-gray-600">
                Our solution delivered measurable improvements and tangible business outcomes.
              </p>
            </div>
          </div>
          
          {/* Results card with checkmark bullets */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <ul className="space-y-4">
                {caseStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 bg-teal/10 rounded-full p-1.5 mr-4">
                      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-lg">{result}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Used Section - Tags display */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-8 text-center">
                Technologies Used
              </h2>
              {/* Technology tags */}
              <div className="flex flex-wrap justify-center gap-4">
                {caseStudy.technologies.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 text-navy rounded-md text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section - Client quote */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md">
              {/* Quote icon */}
              <div className="text-teal mb-6">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              {/* Client testimonial quote */}
              <p className="text-xl text-gray-700 mb-8 italic">
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </p>
              {/* Client information with avatar */}
              <div className="flex items-center">
                <div className="mr-4 w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center text-xl font-semibold">
                  {caseStudy.testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-poppins font-semibold text-navy">{caseStudy.testimonial.name}</p>
                  <p className="text-sm text-gray-600">{caseStudy.testimonial.title}, {caseStudy.testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* More Case Studies Section - Link to all case studies */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                Explore More Case Studies
              </h2>
              <p className="text-gray-600">
                Discover how we&lsquove helped other organizations overcome their technology challenges.
              </p>
            </div>
          </div>
          
          {/* Button to view all case studies */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-navy hover:bg-navy/90 text-white font-semibold px-8">
              <Link href="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Final call to action */}
      <CTA
        title="Ready to Achieve Similar Results?"
        subtitle="Contact us today to discuss how we can help transform your IT infrastructure."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
} 