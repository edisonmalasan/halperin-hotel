import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  occasions,
  type Venue,
  type Package,
} from "@/app/(client)/data/occasions";
import Image from "next/image";

export default function OccasionPage({ params }: { params: { id: string } }) {
  const occasion = occasions[params.id];

  if (!occasion) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="aspect-video relative bg-gray-200">
        <Image
          src={occasion.image}
          alt={occasion.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{occasion.name}</h1>
          <p className="text-gray-600">{occasion.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Available Venues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {occasion.details.venues.map((venue: Venue) => (
                  <div key={venue.name} className="space-y-4">
                    <div className="aspect-video relative bg-gray-200">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{venue.name}</h3>
                      <p className="text-sm text-gray-600">{venue.capacity}</p>
                      <p className="text-sm text-gray-600">
                        {venue.description}
                      </p>
                      <ul className="space-y-1">
                        {venue.features.map((feature: string) => (
                          <li
                            key={feature}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <span className="mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {occasion.details.packages.map((pkg: Package) => (
                  <div key={pkg.name} className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{pkg.name}</h3>
                        <p className="text-sm text-gray-600">
                          {pkg.description}
                        </p>
                      </div>
                      <span className="text-sm font-medium">{pkg.price}</span>
                    </div>
                    <ul className="space-y-1">
                      {pkg.includes.map((item: string) => (
                        <li
                          key={item}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <span className="mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plan Your Event</CardTitle>
            <CardDescription>
              Let us help you create an unforgettable experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Contact Our Events Team
                </h3>
                <p className="text-gray-600">
                  Our experienced event planners are here to help you create the
                  perfect celebration.
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
                  Fill out our event inquiry form and we'll get back to you
                  within 24 hours.
                </p>
                <Button asChild>
                  <Link href={`/occasions/inquiry?type=${occasion.id}`}>
                    Request Information
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
