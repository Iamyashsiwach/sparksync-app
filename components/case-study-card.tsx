/**
 * Case Study Card Component for Revee InfoTech website
 * Displays a visually appealing card for individual case studies with 
 * industry-specific styling and information
 */
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Props interface for the CaseStudyCard component
 * @property {string} title - The title of the case study
 * @property {string} description - Brief description of the case study
 * @property {string} client - Name of the client company
 * @property {string} industry - Industry sector the case study belongs to
 * @property {string} image - URL of the featured image
 * @property {string} slug - URL slug for the detailed case study page
 */
interface CaseStudyCardProps {
  title: string;
  description: string;
  client: string;
  industry: string;
  image: string;
  slug: string;
}

/**
 * CaseStudyCard component for displaying individual case study previews
 * Features hover effects, industry-specific coloring, and responsive design
 * @param {CaseStudyCardProps} props - The properties for the case study card
 */
const CaseStudyCard = ({ title, description, client, industry, image, slug }: CaseStudyCardProps) => {
  /**
   * Helper function to determine the color scheme based on industry
   * @param {string} industry - The industry name to get color for
   * @returns {string} - The CSS background color class
   */
  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'Manufacturing':
        return 'bg-orange-500';
      case 'Financial Services':
        return 'bg-blue-600';
      case 'Healthcare':
        return 'bg-green-600';
      case 'Retail':
        return 'bg-purple-600';
      case 'Education':
        return 'bg-yellow-500';
      case 'Legal':
        return 'bg-red-500';
      default:
        return 'bg-teal';
    }
  };

  // Get the appropriate color for the current industry
  const industryColor = getIndustryColor(industry);

  return (
    <div className="h-full transform transition-transform duration-200 hover:-translate-y-2">
      <Card className="h-full overflow-hidden border-gray-200 hover:border-teal transition-colors duration-300 shadow-md hover:shadow-xl relative">
        {/* Industry badge in the top-right corner */}
        <div className={`absolute top-0 right-0 ${industryColor} text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20`}>
          {industry}
        </div>

        {/* Image container with overlay and hover effect */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent z-10" />
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Client info badge */}
          <div className="absolute bottom-3 left-4 z-20">
            <span className="text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded">Client: <span className="font-semibold">{client}</span></span>
          </div>
        </div>

        {/* Card title section */}
        <CardHeader className="px-4 sm:px-6 pt-5 pb-2">
          <CardTitle className="text-navy font-poppins text-lg sm:text-xl line-clamp-2">{title}</CardTitle>
        </CardHeader>

        {/* Card content with description and tags */}
        <CardContent className="px-4 sm:px-6 py-2">
          <CardDescription className="text-gray-600 text-sm line-clamp-3 mb-4">
            {description}
          </CardDescription>
          
          {/* Industry-specific tag badges */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
            {/* Manufacturing industry tags */}
            {industry === 'Manufacturing' && (
              <>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Network Infrastructure</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Global Deployment</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Performance</span>
              </>
            )}
            {/* Financial Services industry tags */}
            {industry === 'Financial Services' && (
              <>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Cloud Security</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Compliance</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Scalability</span>
              </>
            )}
            {/* Healthcare industry tags */}
            {industry === 'Healthcare' && (
              <>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">HIPAA Compliance</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Security</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Patient Data</span>
              </>
            )}
            {/* Retail industry tags */}
            {industry === 'Retail' && (
              <>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">VoIP</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Multi-Location</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Cost Savings</span>
              </>
            )}
            {/* Education industry tags */}
            {industry === 'Education' && (
              <>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">IT Management</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Student Support</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Optimization</span>
              </>
            )}
            {/* Legal industry tags */}
            {industry === 'Legal' && (
              <>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Disaster Recovery</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Data Protection</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Business Continuity</span>
              </>
            )}
          </div>
        </CardContent>

        {/* Card footer with call-to-action button */}
        <CardFooter className="px-4 sm:px-6 pt-0">
          <Button asChild className={`w-full ${industryColor} hover:opacity-90 text-white`}>
            <Link href={`/case-studies/${slug}`}>View Case Study</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CaseStudyCard; 