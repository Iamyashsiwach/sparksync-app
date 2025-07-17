/**
 * Home Page Component for sparksync website
 * Main landing page showcasing services, industries, testimonials and company features
 */
import Hero from "@/components/hero";
import ServiceCard from "@/components/service-card";
import Testimonial from "@/components/testimonial";
import CTA from "@/components/cta";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  /**
   * Services data array with information about each service offering
   * Used to generate service cards in the services section
   */
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
      color: "teal",
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
      color: "blue-500",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: "Passive Services",
      description: "Seamlessly migrate and manage your infrastructure in the cloud for better scalability.",
      slug: "passive-services",
      color: "purple-500",
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
      color: "green-500",
    },
  ];

  /**
   * Industries data array with information about each industry we serve
   * Used to generate industry cards in the industries section
   */
  const industries = [
    {
      name: "Manufacturing",
      description: "Connecting production lines and improving operational efficiency with secure industrial networks.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: "bg-orange-100 text-orange-700",
      borderColor: "border-orange-500",
    },
    {
      name: "Healthcare",
      description: "Secure networks for patient data and medical devices, ensuring HIPAA compliance.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "bg-green-100 text-green-700",
      borderColor: "border-green-500",
    },
    {
      name: "Financial Services",
      description: "High-security infrastructure for financial institutions with compliance requirements.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-blue-100 text-blue-700",
      borderColor: "border-blue-500",
    },
    {
      name: "Education",
      description: "Campus-wide networks supporting thousands of users, devices, and learning technologies.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      color: "bg-purple-100 text-purple-700",
      borderColor: "border-purple-500",
    },
  ];

  /**
   * Testimonials data array with client feedback
   * Used to generate testimonial cards in the testimonials section
   */
  const testimonials = [
    {
      quote: "sparksync provided seamless network cabling for our new office. The team was punctual, professional, and ensured everything was perfectly organized.",
      name: "Amit Sharma",
      title: "IT Manager",
      company: "Reliant Logistics",
      color: "teal",
    },
    {
      quote: "We were impressed by their technical expertise and transparent communication. Our network is now faster and more reliable than ever.",
      name: "Priya Nair",
      title: "Head of Operations",
      company: "Bharat Manufacturing",
      color: "blue-500",
    },
    {
      quote: "The sparksync team handled our campus-wide upgrade with minimal disruption. Their documentation and support have been excellent.",
      name: "Rohit Verma",
      title: "Systems Administrator",
      company: "Medico Health Group",
      color: "purple-500",
    },
  ];

  return (
    <>
      {/* Hero Section - Main banner with call to action */}
      <Hero />
      
      {/* Services Section - Overview of our main service offerings */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 transform origin-top-left z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Section heading */}
          <div className="text-center mb-12">
            <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">Our Services</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We provide comprehensive network solutions tailored to your business needs, ensuring reliability, security, and performance.
            </p>
          </div>
          
          {/* Services grid display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.slug} className="transform transition-transform duration-300 hover:-translate-y-2">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  slug={service.slug}
                  color={service.color}
                />
              </div>
            ))}
          </div>

          {/* Services CTA button */}
          <div className="text-center mt-10">
            <Button asChild className="bg-teal hover:bg-teal/90 text-black">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Industries We Serve Section - Industries that benefit from our solutions */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-teal/5 -skew-x-12 transform origin-bottom-right z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section heading */}
          <div className="text-center mb-12">
            <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">Industries We Serve</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Our specialized network solutions are tailored to meet the unique challenges of diverse industries.
            </p>
          </div>
          
          {/* Industry cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {industries.map((industry) => (
              <div key={industry.name} className={`bg-white rounded-lg shadow-lg p-6 border-t-4 ${industry.borderColor} hover:shadow-xl transition-shadow duration-300`}>
                <div className={`w-12 h-12 rounded-full ${industry.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{industry.name}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section - Our company's value proposition */}
      <section className="py-16 md:py-24 bg-white relative">
        {/* Decorative accent bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-teal"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column with value proposition text */}
            <div>
              <div className="w-24 h-2 bg-teal mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                Why Choose <span className="text-teal">sparksync</span>?
              </h2>
              <p className="text-gray-700 mb-8">
                With over experience in network integration, we bring expertise and reliability to every project. Our team of certified professionals ensures that your network infrastructure is optimized for performance, security, and scalability.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-teal rounded-full p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">Expert Team</h3>
                    <p className="text-gray-700">
                      Our team of certified engineers brings decades of combined experience to every project.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-blue-500 rounded-full p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">Customized Solutions</h3>
                    <p className="text-gray-700">
                      We design solutions tailored to your specific business requirements and industry needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-500 rounded-full p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">24/7 Support</h3>
                    <p className="text-gray-700">
                      Round-the-clock monitoring and support to ensure your network is always operational.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-purple-500 rounded-full p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">Industry Expertise</h3>
                    <p className="text-gray-700">
                      Specialized knowledge across multiple industries including healthcare, finance, and manufacturing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="rounded-lg shadow-xl overflow-hidden relative border-8 border-white">
                  <div className="aspect-square relative">
        <Image
                      src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                      alt="Network professional working on server infrastructure"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-teal text-white rounded-lg shadow-xl p-5">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-semibold">100% Secure</span>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 bg-blue-500 text-white rounded-lg shadow-xl p-5">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-semibold">Fast & Reliable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section
      <section className="py-16 md:py-20 bg-teal text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-sm md:text-base font-medium">Years Experience</div>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-base font-medium">Projects Completed</div>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base font-medium">Certified Engineers</div>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-sm md:text-base font-medium">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section> */}
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal/5 -skew-x-12 transform origin-top-right z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">Client Testimonials</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Hear from our satisfied clients about how our network solutions have transformed their businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="transform transition-transform duration-300 hover:-translate-y-2">
                <Testimonial
                  quote={testimonial.quote}
                  name={testimonial.name}
                  title={testimonial.title}
                  company={testimonial.company}
                  color={testimonial.color}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Case Study */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-24 h-2 bg-teal mb-4"></div>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">Featured Case Study</span>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">
                Financial Services Network Transformation
              </h2>
              <p className="text-gray-700 mb-6">
                We helped a regional bank upgrade their entire network infrastructure across 25 locations, improving security, performance, and reliability while reducing operational costs by 30%.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">99.99% uptime guarantee</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Enhanced security posture</span>
          </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Streamlined operations with integrated monitoring</span>
          </li>
              </ul>
              <Button asChild className="bg-teal hover:bg-teal/90 text-white">
                <Link href="/case-studies">View More Case Studies</Link>
              </Button>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-8 border-white">
                <div className="aspect-video relative">
            <Image
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Financial services network infrastructure"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-500/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTA
        title="Ready to Transform Your Network Infrastructure?"
        subtitle="Contact us today for a free consultation and discover how our solutions can help your business grow."
        buttonText="Get Started"
        buttonLink="/contact"
      />
    </>
  );
}
