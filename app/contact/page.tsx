"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-white text-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-teal"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -skew-x-12 transform origin-top-right z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="w-24 h-2 bg-teal mb-6"></div>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-navy">
                Contact <span className="text-teal">Us</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Get in touch with our team to discuss your needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-sm font-medium">Enterprise Solutions</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Network Design</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Technical Support</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-8 border-white">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Contact and support team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="w-24 h-2 bg-teal mb-4"></div>
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-navy mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start">
                  <div className="mr-3 md:mr-4 bg-teal rounded-full p-2 text-white">
                    <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-navy mb-1 md:mb-2">Registered Address</h3>
                    <p className="text-sm md:text-base text-gray-700">
                      Hono 2171, Lig Housing Board Colony<br />
                      Sector 13-17, Panipat Haryana 132103
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 md:mr-4 bg-teal rounded-full p-2 text-white">
                    <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-navy mb-1 md:mb-2">Office Address</h3>
                    <p className="text-sm md:text-base text-gray-700">
                     3rd Floor, Block B, Green Wood Plaza,<br />
                     Netaji Subhash Marg, Sector 45 Gurugram, 122003
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 md:mr-4 bg-blue-500 rounded-full p-2 text-white">
                    <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-navy mb-1 md:mb-2">Mobile No</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-1">+91 7056803350</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 md:mr-4 bg-green-500 rounded-full p-2 text-white">
                    <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-navy mb-1 md:mb-2">Email ID</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-1">support@sparksync.in</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 md:mr-4 bg-purple-500 rounded-full p-2 text-white">
                    <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-navy mb-1 md:mb-2">Business Hours</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-1">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    <p className="text-sm md:text-base text-gray-700"> Sunday: Closed</p>
                    <p className="text-sm md:text-base text-gray-700 mt-2">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-10">
                <h3 className="text-xl font-poppins font-semibold text-navy mb-3 md:mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-3 md:space-x-4">
                  <a href="https://www.linkedin.com/company/sparksync" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full transition-colors">
                    <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/sparksync" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-500 text-white hover:bg-pink-600 rounded-full transition-colors">
                    <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="shadow-xl border-t-4 border-teal overflow-hidden">
                <CardContent className="p-5 md:p-8">
                  <h2 className="text-xl md:text-2xl font-poppins font-bold text-navy mb-4 md:mb-6">
                    Or, Send Us a Message
                  </h2>
                  <div className="text-gray-700">
                    <p>You can reach us by email at <a href="mailto:support@sparksync.in" className="text-teal underline">support@sparksync.in</a>.</p>
                    <p className="mt-4">We look forward to hearing from you!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <div>
              <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
              <h2 className="text-2xl md:text-4xl font-poppins font-bold text-navy mb-4 md:mb-6">
                Our Location
              </h2>
              <p className="text-sm md:text-base text-gray-700">
                Visit our office or contact us using the information below.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-xl border-4 border-gray-100">
            <div className="relative h-[400px] md:h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112.43968590964445!2d77.05986358594269!3d28.444690300000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1943b30191d7%3A0xc915422ab30615d6!2sOahfeo%20Workspaces%20-%20Best%20Coworking%20Space%20Gurugram%20Sector%2045%20%7C%20Private%20Office%20on%20Rent%20%7C%20Virtual%20Office!5e0!3m2!1sen!2sin!4v1713476890584!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            {/* Optional directions link - currently commented out */}
            {/* <div className="p-4 bg-white border-t border-gray-100">
              <a 
                href="https://www.google.com/maps/place/Oahfeo+Workspaces+-+Best+Coworking+Space+Gurugram+Sector+45+%7C+Private+Office+on+Rent+%7C+Virtual+Office/@28.4446903,77.0598636,21z/data=!3m1!5s0x390d17f13d95e89b:0xb83793a3fd870d26!4m6!3m5!1s0x390d1943b30191d7:0xc915422ab30615d6!8m2!3d28.4446401!4d77.0597294!16s%2Fg%2F11sckjhxz9?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal text-black rounded-lg hover:bg-teal/90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </a>
            </div> */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div>
                <div className="w-24 h-2 bg-teal mx-auto mb-4"></div>
                <h2 className="text-2xl md:text-4xl font-poppins font-bold text-navy mb-4 md:mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm md:text-base text-gray-700">
                  Find quick answers to common questions about our services and support.
                </p>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border-l-4 border-teal">
                <h3 className="text-lg md:text-xl font-semibold text-navy mb-2 md:mb-3">What areas do you service?</h3>
                <p className="text-sm md:text-base text-gray-700">
                  We provide network integration services across the entire United States, with on-site support available in major metropolitan areas and remote support nationwide.
                </p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                <h3 className="text-lg md:text-xl font-semibold text-navy mb-2 md:mb-3">How quickly can you respond to service requests?</h3>
                <p className="text-sm md:text-base text-gray-700">
                  For our managed service clients, we offer response times as fast as 15 minutes for critical issues. Our standard response time for service requests is within 2-4 hours during business hours.
                </p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                <h3 className="text-lg md:text-xl font-semibold text-navy mb-2 md:mb-3">Do you offer 24/7 support?</h3>
                <p className="text-sm md:text-base text-gray-700">
                  Yes, we offer 24/7 emergency support for critical network issues. Our extended support packages provide round-the-clock monitoring and assistance for businesses that require continuous operation.
                </p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                <h3 className="text-lg md:text-xl font-semibold text-navy mb-2 md:mb-3">What industries do you specialize in?</h3>
                <p className="text-sm md:text-base text-gray-700">
                  We have experience across multiple industries, with particular expertise in healthcare, financial services, manufacturing, education, and professional services. Our team understands the unique regulatory and operational requirements of these sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 