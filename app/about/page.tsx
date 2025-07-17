import { Metadata } from "next";
import Image from "next/image";
import CTA from "@/components/cta";

export const metadata: Metadata = {
  title: "About Us | sparksync",
  description: "Learn about sparksync's mission, values, and team of network integration experts",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "John Smith",
      title: "CEO & Founder",
      bio: "With over 20 years of experience in network engineering, John founded sparksync to deliver enterprise-grade solutions to businesses of all sizes.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Jane Doe",
      title: "CTO",
      bio: "Jane oversees all technical operations and ensures our solutions leverage cutting-edge technology while maintaining reliability and security.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "David Chen",
      title: "Network Security Specialist",
      bio: "David specializes in cybersecurity solutions, helping our clients protect their critical infrastructure from emerging threats.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Sarah Johnson",
      title: "Cloud Solutions Architect",
      bio: "Sarah designs and implements scalable cloud infrastructure solutions that help businesses grow and adapt to changing demands.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white text-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-teal"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-navy"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal/10 -skew-x-12 transform origin-top-right z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-navy">
                About <span className="text-teal">sparksync</span>
              </h1>
              <p className="text-xl text-gray-700">
                We&lsquo;re a team of network integration specialists helping businesses build resilient and secure IT infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-24 h-2 bg-teal mb-4"></div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                At sparksync, our journey began with a vision to bridge the gap between cutting-edge technology and real-world business needs. Founded on the principles of innovation, reliability, and customer-centricity, we've grown into a trusted partner for businesses seeking digital transformation.
                </p>
                <p>
                From our early days focusing on network device sales and support, we quickly expanded our expertise to include structured cabling, CCTV installation, and advanced IT infrastructure services. As technology evolved, so did we—diving deep into cloud computing, data analytics, and enterprise mobility to offer end-to-end solutions that empower businesses to scale efficiently and securely.
                </p>
                <p>
                What sets us apart is our team of certified professionals who don’t just implement technology—they align it with your unique business goals. Whether you're building from the ground up or enhancing existing systems, we provide a seamless experience from consultation to implementation and ongoing support.
              
                </p>
                <p>
                sparksync is more than an IT service provider—we are your digital transformation partner, committed to helping you stay ahead in a fast-paced, tech-driven world.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-8 border-white">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt="Team collaboration on network solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-teal/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div>
              <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                Our Mission & Values
              </h2>
              <p className="text-gray-700">
                We&lsquo;re driven by a commitment to excellence, innovation, and client satisfaction. Our core values guide everything we do.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
           <div className="text-blue-500 mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the solutions we design to the support we provide.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
            <div className="text-blue-500 mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore new technologies and approaches to deliver the best solutions to our clients.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-500 hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-blue-500 mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-navy mb-4">Partnership</h3>
              <p className="text-gray-600">
                We view our client relationships as partnerships, working collaboratively to achieve their business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div>
              <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-6">
                Meet Our Team
              </h2>
              <p className="text-gray-700">
                Our team of certified professionals brings decades of experience and passion to every project.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 border-t-4 border-teal">
                  <h3 className="text-xl font-poppins font-semibold text-navy">{member.name}</h3>
                  <p className="text-teal mb-4">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <CTA
        title="Ready to Work with Our Team?"
        subtitle="Contact us today to discuss how we can help with your network infrastructure needs."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
} 