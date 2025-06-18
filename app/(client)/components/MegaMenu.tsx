"use client";
import { useState } from "react";
import Link from "next/link";

type MegaMenuItem = {
  title: string;
  href: string;
  image?: string;
  description?: string;
  features?: string[];
};

type MegaMenuProps = {
  items: MegaMenuItem[];
  singleColumn?: boolean;
};

export default function MegaMenu({
  items,
  singleColumn = false,
}: MegaMenuProps) {
  const [selected, setSelected] = useState(items[0]);

  // function helper to get the explore text and link
  function getExploreAll() {
    if (items[0]?.href?.includes("rooms")) {
      return {
        text: "EXPLORE ALL OUR ROOMS",
        href: items[0].href,
      };
    }
    if (items[0]?.href?.includes("suites")) {
      return {
        text: "EXPLORE ALL OUR SUITES",
        href: items[0].href,
      };
    }
    if (items[0]?.href?.includes("dining")) {
      return {
        text: "EXPLORE ALL DINING",
        href: items[0].href,
      };
    }
    if (items[0]?.href?.includes("occasions")) {
      return {
        text: "EXPLORE ALL OCCASIONS",
        href: items[0].href,
      };
    }
    return {
      text: "EXPLORE ALL",
      href: items[0]?.href || "#",
    };
  }

  if (singleColumn) {
    return (
      <div className="bg-white shadow-lg rounded-md p-4 w-[300px] flex flex-col gap-2">
        <ul>
          {items.map((item) => (
            <li key={item.href} className="p-2 hover:bg-[#8b6d2636] rounded">
              <Link href={item.href} className="font-medium text-xs">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white shadow-lg rounded-md
        p-4 pb-8
        grid grid-cols-2 gap-x-8 gap-y-2
        w-[800px] h-full
      "
    >
      {/* Explore All Button */}
      <div className="col-span-2 ">
        <Link
          href="/rooms"
          aria-label={getExploreAll().text}
          className="pb-4 flex gap-4 items-center uppercase text-[12px] leading-[16px] font-light group"
          role="button"
          draggable="false"
        >
          <span>{getExploreAll().text}</span>
          <svg
            width="56"
            height="41"
            viewBox="0 0 56 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrowHover rtl:rotate-180 text-[#8b6c26]"
          >
            <rect
              x="0.5"
              y="1.49805"
              width="55"
              height="39"
              rx="19.5"
              stroke="currentColor"
              strokeOpacity="0.5"
              fill="transparent"
              className="transition-colors duration-200 group-hover:fill-[#8b6c26]"
            ></rect>
            <path
              d="M30.5 26.998C30.5 20.998 36 20.998 36 20.998M36 20.998C36 20.998 30.5 20.998 30.5 14.998M36 20.998H20"
              stroke="black"
              strokeLinejoin="bevel"
              className="transition-colors duration-200 group-hover:stroke-white"
            ></path>
          </svg>
        </Link>
        <hr className="border-t border-gray-200 mb-2" />
      </div>

      {/* Left: List */}
      <ul className="space-y-5 border-r pr-4">
        {items.map((item) => (
          <li
            key={item.href}
            className={`cursor-pointer p-2 rounded group`}
            onMouseEnter={() => setSelected(item)}
          >
            <div className="flex items-center justify-between text-xs transition-all duration-200 text-black">
              <span
                className={`transition-opacity duration-200 ${
                  selected.title === item.title
                    ? "opacity-100"
                    : "opacity-90 group-hover:opacity-100"
                }`}
              >
                {item.title}
              </span>
              <div className="overflow-hidden relative w-6 shrink-0">
                <div
                  className={`arrow-wrapper flex transition-all duration-300 ease-in-out w-8 justify-around
                    ${
                      selected.title === item.title
                        ? "ml-0"
                        : "-ml-12 group-hover:ml-0"
                    }
                  `}
                >
                  <svg
                    width="17"
                    height="12"
                    viewBox="0 0 17 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="long rtl:rotate-180"
                  >
                    <path
                      d="M10.5 12C10.5 6 16 6 16 6M16 6C16 6 10.5 6 10.5 0M16 6L0 6"
                      stroke="#8B6C26"
                      strokeLinejoin="bevel"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Right: Preview */}
      <div
        key={selected.title}
        className="space-y-3 flex flex-col h-full transition-all duration-300 ease-in-out opacity-0 -translate-x-4 animate-fade-in-right"
      >
        {selected.image && (
          <img
            src={selected.image}
            alt={selected.title}
            className="rounded w-[full] h-[237px] object-cover"
          />
        )}
        {selected.description && (
          <p className="text-xs">{selected.description}</p>
        )}
        {selected.features && (
          <ul className="text-xs grid gap-1">
            {selected.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-[#8b6c26]">
                  <svg
                    data-v-34474e68=""
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 shrink-0"
                  >
                    <path
                      data-v-34474e68=""
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.60439 3.45001H8.42317C8.78455 5.59706 10.7056 7.37761 12.8002 7.83462V8.64301C10.7262 9.07276 8.76897 10.9312 8.42404 13.05H7.6022C7.23015 10.9169 5.30108 9.08481 3.2002 8.64252V7.83765C5.32364 7.33027 7.19233 5.63394 7.60439 3.45001ZM7.91258 3.82536C7.44401 5.88476 5.57175 7.59523 3.57555 8.13173V8.34081C5.56263 8.83508 7.47386 10.6719 7.91419 12.6747H8.10878C8.54109 10.6386 10.4504 8.83845 12.4248 8.34084V8.13437C10.4413 7.63331 8.54189 5.83692 8.10939 3.82536H7.91258Z"
                      fill="#8B6C26"
                      stroke="#8B6C26"
                      strokeWidth="0.5"
                    ></path>
                  </svg>
                </span>{" "}
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
