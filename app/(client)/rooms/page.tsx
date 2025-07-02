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
import CardSlider from "../components/CardSlider";
import { RoomCardSlider } from "@/app/(client)/rooms/data/RoomCardSlider";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { rooms } from "../data/rooms";
import RoomCard from "../components/RoomCard";

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
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex flex-row items-center justify-evenly gap-x-5 p-4 sm:p-6 md:p-10">
            <div className="text-4xl max-w-xl">
              Dazzling history, contemporary style
            </div>
            <p className="text-justify max-w-sm text-[15px] font-light pt-5">
              Guest rooms in the main house embody LA's sparkling elegance,
              while the bungalows draw inspiration from the lush surrounding
              landscape for an effortless and modern Californian design.
            </p>
          </div>
          <div className="mt-15">
            <CardSlider cards={RoomCardSlider} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex flex-col justify-center px-30 py-10">
            <div className="text-4xl max-w-2xl">
              Rooms at The Halperin Hotel
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 gap-y-25 justify-center">
            {rooms.map((room, idx) => (
              <RoomCard key={room.title + idx} {...room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
