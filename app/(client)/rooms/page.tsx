"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { rooms } from "../data/rooms";

function BookButton() {
  const { isAuthenticated } = useKindeBrowserClient();
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-2">
        <span className="block mb-2 text-sm text-red-600">
          You need to <LoginLink>Sign In</LoginLink> or{" "}
          <RegisterLink>Sign Up</RegisterLink> to book a room.
        </span>
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
      <section>
        <div>
          <div>
            <picture>
              {/*<!-- Mobile first -->*/}
              <source
                media="(max-width: 639px)"
                srcSet="/images/rooms/rooms-mobile.png"
                type="image/png"
              />
              <source
                media="(max-width: 639px)"
                srcSet="/images/rooms/rooms-mobile.png"
              />

              {/*<!-- Tablets -->*/}
              <source
                media="(min-width: 640px) and (max-width: 1023px)"
                srcSet="/images/rooms/rooms-tablets.png"
              />

              {/*<!-- Desktop --> */}
              <source
                media="(min-width: 1024px)"
                srcSet="/images/rooms/rooms-desktop.png"
              />

              <img
                className="w-full h-auto object-contain"
                src="/images/rooms/rooms-desktop.png"
                alt="Room Hero"
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 p-4 sm:p-6 md:p-10">
            <h1 className="text-[#8b6c26] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider">
              THE HALPERIN HOTEL
            </h1>
            <div className="text-2xl sm:text-3xl md:text-5xl font-extralight text-center">
              Living like true Hollywood royalty
            </div>
            <h1 className="text-base">ROOMS</h1>
            <p className="text-center max-w-sm text-sm sm:text-base font-light">
              Our guest rooms pay stylish homage to the stellar heritage of this
              legendary hotel, but with a luxuriously modern edge.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div></div>
        <div></div>
      </section>

      <br />
      <h1 className="text-3xl font-bold mb-8">Our Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.title} className="overflow-hidden">
            <div className="aspect-video relative bg-gray-200">
              {room.image ? (
                <img
                  src={room.image}
                  alt={room.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Room Image
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{room.title}</CardTitle>
              <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2">
                  {room.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
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
