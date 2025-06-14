import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function GuestHomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Halperin Hotel</h1>
          <p className="text-xl mb-8">
            Experience luxury and comfort in the heart of the city
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/rooms">View Rooms</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/login">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Featured Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Deluxe Room */}
            <Card>
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <CardTitle>Deluxe Room</CardTitle>
                <CardDescription>Spacious room with city view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">King Bed</Badge>
                  <Badge variant="secondary">City View</Badge>
                  <Badge variant="secondary">40m²</Badge>
                </div>
                <p className="text-2xl font-bold">
                  $200
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/login">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Executive Suite */}
            <Card>
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <CardTitle>Executive Suite</CardTitle>
                <CardDescription>Luxury suite with ocean view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">King Bed</Badge>
                  <Badge variant="secondary">Ocean View</Badge>
                  <Badge variant="secondary">60m²</Badge>
                </div>
                <p className="text-2xl font-bold">
                  $350
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/login">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Family Suite */}
            <Card>
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <CardTitle>Family Suite</CardTitle>
                <CardDescription>Perfect for family stays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">2 Queen Beds</Badge>
                  <Badge variant="secondary">City View</Badge>
                  <Badge variant="secondary">75m²</Badge>
                </div>
                <p className="text-2xl font-bold">
                  $400
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/login">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hotel Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Free WiFi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  High-speed internet throughout the hotel
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Swimming Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Outdoor pool with city view</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Restaurant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fine dining experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
