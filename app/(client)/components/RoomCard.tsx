"use client";

import React, { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  href: string;
}

const gold = "#8b6c26";

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  description,
  image,
  features,
  href,
}) => {
  const { isAuthenticated } = useKindeBrowserClient();
  const [showModal, setShowModal] = useState(false);

  const handleBook = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      return;
    }
    // Booking logic here
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden max-w-3xl mx-auto h-full flex flex-col">
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover"
        style={{ minHeight: 260, maxHeight: 400 }}
      />
      <div className="flex-1 flex flex-row gap-x-10 p-8">
        <div className="flex flex-col flex-1 min-w-0">
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: gold }}
          >
            ROOMS
          </div>
          <div className="text-2xl font-semibold mb-2 text-neutral-800">
            {title}
          </div>
          <div className="text-sm text-neutral-600 mb-4 text-justify">
            {description}
          </div>
        </div>
        <div className="flex-shrink-0 items-center justify-center pt-10">
          <ul className="flex flex-col justify-center text-sm mt-8 md:mt-0">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
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
      <div className="flex gap-4 mt-auto px-8 pb-8">
        <button
          onClick={handleBook}
          className="bg-[#8b6c26] hover:bg-[#a88d4a] text-white font-semibold px-6 py-2 rounded-full shadow-md transition-colors duration-200"
        >
          BOOK NOW
        </button>
        <Link href={href} passHref legacyBehavior>
          <button className="border border-[#8b6c26] text-[#8b6c26] hover:bg-[#f7f3ea] font-semibold px-6 py-2 rounded-full shadow-md transition-colors duration-200">
            EXPLORE
          </button>
        </Link>
      </div>
      {showModal && (
        <div className="fixed left-1/2 bottom-10 transform -translate-x-1/2 z-50">
          <div className="bg-[#8b6c26] text-white px-6 py-3 rounded-lg shadow-lg text-base font-semibold animate-fade-in-out">
            You need to sign in to book a room.
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in-out {
          animation: fadeInOut 2s;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default RoomCard;
