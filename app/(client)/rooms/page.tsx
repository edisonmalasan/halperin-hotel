import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

const roomDirs = [
  "deluxe",
  "bungalow",
  "bungalow-patio",
  "bungalow-studio",
  "deluxe-balcony",
  "superior-balcony",
  "superior",
  "deluxe-patio",
];

const roomDisplayNames: Record<string, string> = {
  "deluxe": "Deluxe Room",
  "bungalow": "Bungalow",
  "bungalow-patio": "Bungalow Patio",
  "bungalow-studio": "Bungalow Studio",
  "deluxe-balcony": "Deluxe Balcony Room",
  "superior-balcony": "Superior Balcony Room",
  "superior": "Superior Room",
  "deluxe-patio": "Deluxe Patio Room",
};

function BookButton() {
  const { isAuthenticated } = useKindeBrowserClient();
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-2">
        <span className="block mb-2 text-sm text-red-600">You need to <LoginLink>sign in</LoginLink> or <RegisterLink>sign up</RegisterLink> to book a room.</span>
      </div>
    );
  }
  return (
    <Button className="w-full mt-2" disabled>
      Book Now
    </Button>
  );
}

export default function RoomsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomDirs.map((dir) => (
          <Card key={dir} className="overflow-hidden">
            <div className="aspect-video relative bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Room Image
              </div>
            </div>
            <CardHeader>
              <CardTitle>{roomDisplayNames[dir] || dir}</CardTitle>
              <CardDescription>Experience comfort and style in our {roomDisplayNames[dir] || dir}.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">•</span>
                    Free WiFi
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">•</span>
                    Private bathroom
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">•</span>
                    Air conditioning
                  </li>
                </ul>
                <BookButton />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 