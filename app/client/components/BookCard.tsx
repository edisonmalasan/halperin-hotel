"use client";

import React, { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { ROUTES } from "@/app/api/routes";
import { resolve } from "path";

interface BookCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  href: string;
  typeName: string;
  prefix?: string;
  slug?: string;
}

const gold = "#8b6c26";

// helper
const resolveRoute = (href: string) => {
  switch (href) {
    case "/client/rooms/superior":
      return ROUTES.rooms.superior;
    case "/client/rooms/superior-balcony":
      return ROUTES.rooms.superiorBalcony;
    case "/client/rooms/deluxe":
      return ROUTES.rooms.deluxe;
    case "/client/rooms/deluxe-balcony":
      return ROUTES.rooms.deluxeBalcony;
    case "/client/rooms/deluxe-patio":
      return ROUTES.rooms.deluxePatio;
    case "/client/rooms/bungalow":
      return ROUTES.rooms.bungalow;
    case "/client/rooms/bungalow-patio":
      return ROUTES.rooms.bungalowPatio;
    case "/client/rooms/bungalow-studio":
      return ROUTES.rooms.bungalowStudio;
    case "/client/suites/junior":
      return ROUTES.suites.junior;
    case "/client/suites/junior-patio":
      return ROUTES.suites.juniorPatio;
    case "/client/suites/junior-halperin":
      return ROUTES.suites.juniorHalperin;
    case "/client/suites/rodeo":
      return ROUTES.suites.rodeo;
    case "/client/suites/crescent":
      return ROUTES.suites.crescent;
    case "/client/suites/premier":
      return ROUTES.suites.premier;
    case "/client/suites/presidential":
      return ROUTES.suites.presidential;
    case "/client/suites/grand-deluxe":
      return ROUTES.suites.grandDeluxe;
    case "/client/dining/polo-lounge":
      return ROUTES.dining.poloLounge;
    case "/client/dining/cabana-cafe":
      return ROUTES.dining.cabanaCafe;
    case "/client/dining/fountain-coffee":
      return ROUTES.dining.fountainCoffee;
    case "/client/occasions/weddings":
      return ROUTES.occasions.weddings;
    case "/client/occasions/social-events":
      return ROUTES.occasions.socialEvents;
    case "/client/occasions/meetings":
      return ROUTES.occasions.meetings;
    default:
      return href;
  }
};

// mapping for type name
export const titleToTypeName = {
  // Rooms
  "Superior Room": "Superior",
  "Superior Room with Balcony": "Superior",
  "Deluxe Room": "Deluxe",
  "Deluxe Room with Balcony": "Deluxe",
  "Deluxe Room with Patio": "Deluxe",
  "Bungalow Room": "Bungalow",
  "Bungalow Room with Patio": "Bungalow",
  "Bungalow Studio with Balcony": "Bungalow",
  // Suites
  "Junior Suite": "Junior Suite",
  "Junior Suite with Patio": "Junior Suite",
  "Junior Halperin Suite": "Junior Halperin Suite",
  "Rodeo Suite": "Rodeo Suite",
  "Crescent Suite": "Crescent Suite",
  "Premier Suite": "Premier Suite",
  "Presidential Suite": "Presidential Suite",
  "Grand Deluxe Suite": "Grand Deluxe Suite",
  // Dining
  "Polo Lounge": "Polo Lounge",
  "The Cabana Cafe": "The Cabana Cafe",
  "The Fountain Coffee Room": "The Fountain Coffee Room",
  // Events
  Weddings: "Wedding",
  "Social Events": "Social Event",
  Meetings: "Meeting",
};

const BookCard: React.FC<BookCardProps> = ({
  title,
  description,
  image,
  features,
  href,
  typeName,
  prefix,
  slug,
}) => {
  const { isAuthenticated } = useKindeBrowserClient();
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState<number | null>(null);
  const [availabilityType, setAvailabilityType] = useState<string>("");

  // helper category
  const getCategory = () => {
    if (href.includes("/rooms/")) return "room";
    if (href.includes("/suites/")) return "suite";
    if (href.includes("/dining/")) return "dining";
    if (href.includes("/occasions/")) return "event";
    return "room";
  };

  const handleBook = async () => {
    if (!isAuthenticated) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      return;
    }
    // fetch availability
    const category = getCategory();
    setAvailabilityType(category);
    let body: any = { type: typeName, description, category };
    if (category === "room" && slug) {
      body = { roomTypeSlug: slug, category };
    } else if (category === "suite" && slug) {
      body = { suiteTypeSlug: slug, category };
    } else if (category === "dining" && slug) {
      body = { diningVenueSlug: slug, category };
    } else if (category === "event" && slug) {
      body = { eventTypeSlug: slug, category };
    }
    const res = await fetch("/api/availability", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setAvailability(data.available);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setAvailability(null);
    }, 3000);
  };

  return (
    <div className="bg-white  border border-gray-200 shadow-lg overflow-hidden max-w-3xl mx-auto h-full flex flex-col">
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover"
        style={{ minHeight: 260, maxHeight: 400 }}
      />
      <div className="flex-1 flex flex-row gap-x-30 p-8">
        <div className="flex flex-col flex-1 min-w-0">
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: gold }}
          >
            {resolveRoute(href).replace(/^\//, "").split("/")[0].toUpperCase()}
          </div>
          <div className="text-2xl font-normal mb-3 text-neutral-800">
            {title}
          </div>
          <div className="text-sm text-neutral-600 mb-4 text-justify">
            {description}
          </div>
        </div>
        <div className="flex-shrink-0 items-center justify-center pt-15">
          <ul className="flex flex-col justify-center text-sm mt-8 md:mt-0">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs">
                <span className="text-[#8b6c26]">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.60439 3.45001H8.42317C8.78455 5.59706 10.7056 7.37761 12.8002 7.83462V8.64301C10.7262 9.07276 8.76897 10.9312 8.42404 13.05H7.6022C7.23015 10.9169 5.30108 9.08481 3.2002 8.64252V7.83765C5.32364 7.33027 7.19233 5.63394 7.60439 3.45001ZM7.91258 3.82536C7.44401 5.88476 5.57175 7.59523 3.57555 8.13173V8.34081C5.56263 8.83508 7.47386 10.6719 7.91419 12.6747H8.10878C8.54109 10.6386 10.4504 8.83845 12.4248 8.34084V8.13437C10.4413 7.63331 8.54189 5.83692 8.10939 3.82536H7.91258Z"
                      fill="#8B6C26"
                      stroke="#8B6C26"
                      strokeWidth="0.5"
                    ></path>
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-4 mt-auto px-8 pb-8 text-[13px]">
        <button
          onClick={handleBook}
          className="bg-[#8b6c26] hover:bg-[#a88d4a] text-white px-5 py-2 rounded-full shadow-md hover:px-8 font-medium transition-all duration-300 ease"
        >
          BOOK NOW
        </button>
        <Link href={resolveRoute(href)} passHref>
          <button className="border border-[#8b6c26] text-black/80 hover:bg-[#8b6c26] hover:text-white font-medium px-5 py-2 rounded-full shadow-md transition-colors duration-300">
            EXPLORE
          </button>
        </Link>
      </div>
      {/* show if ilan avail na room using the handleBook which ifefetch nya ilan avail na room*/}
      {showModal && (
        <div className="fixed left-1/2 bottom-10 transform -translate-x-1/2 z-50">
          <div
            className={`bg-[#8b6c26] text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold animate-fade-in-out`}
          >
            {availability !== null
              ? `There are ${availability} available ${
                  availabilityType === "dining"
                    ? "tables"
                    : availabilityType === "event"
                    ? "events"
                    : "rooms"
                } for ${title}`
              : "You need to sign in to book."}
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in-out {
          animation: fadeInOut 2s;
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BookCard;
