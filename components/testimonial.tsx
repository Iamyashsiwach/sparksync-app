import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  image?: string;
  color?: string;
}

const colorMap: Record<string, string> = {
  teal: 'bg-teal-500',
  'blue-500': 'bg-blue-500',
  'purple-500': 'bg-purple-500',
};

const Testimonial = ({ quote, name, title, company, image, color = "teal" }: TestimonialProps) => {
  const bgColor = colorMap[color] || 'bg-teal-500';
  return (
    <div>
      <Card className={`h-full border-gray-200 hover:border-${color}/50 transition-colors duration-300 bg-white shadow-sm hover:shadow-md`}>
        <CardContent className="pt-6">
          <div className={`text-${color} mb-4`}>
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="text-gray-700 mb-6 italic">{quote}</p>
          <div className="flex items-center">
            {image ? (
              <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden">
                <Image src={image} alt={name} fill className="object-cover" />
              </div>
            ) : (
              <div className={`mr-4 w-12 h-12 rounded-full ${bgColor} text-white flex items-center justify-center text-xl font-semibold`}>
                {name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-poppins font-semibold text-navy">{name}</p>
              <p className="text-sm text-gray-600">{title}, {company}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testimonial; 