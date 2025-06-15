import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const rooms = [
  {
    id: 1,
    name: "Standard Room",
    description: "Comfortable room with essential amenities",
    price: 150,
    image: "/images/standard-room.jpg",
    features: ["Queen bed", "Private bathroom", "Free WiFi", "TV"],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Spacious room with premium amenities",
    price: 250,
    image: "/images/deluxe-room.jpg",
    features: ["King bed", "Private bathroom", "Free WiFi", "TV", "Mini bar"],
  },
  {
    id: 3,
    name: "Suite",
    description: "Luxurious suite with separate living area",
    price: 400,
    image: "/images/suite.jpg",
    features: ["King bed", "Living room", "Private bathroom", "Free WiFi", "TV", "Mini bar", "Room service"],
  },
];

export default function RoomsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Rooms</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="aspect-video relative bg-gray-200">
              {/* Add actual images later */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Room Image
              </div>
            </div>
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${room.price}</span>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
                <ul className="space-y-2">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={`/rooms/${room.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 