import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  slug: string;
  color?: string;
}

const ServiceCard = ({ icon, title, description, slug, color = "teal" }: ServiceCardProps) => {
  return (
    <div className="h-full">
      <Card className={`h-full border-gray-200 hover:border-${color} transition-colors duration-300 shadow-sm hover:shadow-md`}>
        <CardHeader className="px-4 sm:px-6 pt-5 pb-3">
          <div className="mb-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md bg-blue-100">
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                  className: `${(icon as React.ReactElement<any>).props.className || ''} h-6 w-6 text-blue-500`.trim(),
                })
              : icon}
          </div>
          <CardTitle className="text-navy font-poppins text-lg sm:text-xl">{title}</CardTitle>
          <CardDescription className="text-gray-600 text-sm sm:text-base line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow px-4 sm:px-6 pt-0">
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-start sm:items-center text-gray-700">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Customized solutions</span>
            </li>
            <li className="flex items-start sm:items-center text-gray-700">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Expert implementation</span>
            </li>
            <li className="flex items-start sm:items-center text-gray-700">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Ongoing support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="px-4 sm:px-6 pb-5">
          <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base py-2">
            <Link href={`/services/${slug}`}>Learn More</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServiceCard; 