import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const occasions = [
  {
    id: 1,
    name: "Weddings",
    description: "Create unforgettable memories with our elegant wedding venues and services",
    image: "/images/wedding.jpg",
    features: [
      "Indoor and outdoor venues",
      "Wedding planning services",
      "Catering options",
      "Accommodation for guests",
    ],
  },
  {
    id: 2,
    name: "Corporate Events",
    description: "Professional meeting spaces and conference facilities for your business needs",
    image: "/images/corporate.jpg",
    features: [
      "Conference rooms",
      "Business center",
      "Catering services",
      "Audio-visual equipment",
    ],
  },
  {
    id: 3,
    name: "Social Gatherings",
    description: "Perfect spaces for birthdays, anniversaries, and special celebrations",
    image: "/images/social.jpg",
    features: [
      "Private dining rooms",
      "Customized menus",
      "Event decoration",
      "Professional staff",
    ],
  },
  {
    id: 4,
    name: "Holiday Celebrations",
    description: "Special events and packages for holiday seasons",
    image: "/images/holiday.jpg",
    features: [
      "Themed decorations",
      "Special menus",
      "Entertainment options",
      "Family packages",
    ],
  },
];

export default function OccasionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Special Occasions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {occasions.map((occasion) => (
          <Card key={occasion.id} className="overflow-hidden">
            <div className="aspect-video relative bg-gray-200">
              {/* Add actual images later */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {occasion.name} Image
              </div>
            </div>
            <CardHeader>
              <CardTitle>{occasion.name}</CardTitle>
              <CardDescription>{occasion.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2">
                  {occasion.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={`/occasions/${occasion.id}`}>Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Plan Your Special Event</CardTitle>
            <CardDescription>
              Let us help you create an unforgettable experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Our Events Team</h3>
                <p className="text-gray-600">
                  Our experienced event planners are here to help you create the perfect celebration.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Phone:</strong> +1 234 567 890
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> events@halperinhotel.com
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Request Information</h3>
                <p className="text-gray-600">
                  Fill out our event inquiry form and we'll get back to you within 24 hours.
                </p>
                <Button asChild>
                  <Link href="/occasions/inquiry">Request Information</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 