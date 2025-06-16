"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import MegaMenu from "./MegaMenu";
import { rooms } from "../data/rooms";
import { suites } from "../data/suites";
import { dining } from "../data/dining";
import { occasions } from "../data/occasions";
import { more } from "../data/more";
import { useState, useRef, useEffect } from "react";

export default function DashboardNavigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<
    "rooms" | "suites" | "dining" | "occasions" | "more" | null
  >(null);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        setTimeout(() => setActiveMenu(null), 300);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (
    menu: "rooms" | "suites" | "dining" | "occasions" | "more"
  ) => {
    if (activeMenu === menu) {
      setIsVisible(false);
      setTimeout(() => setActiveMenu(null), 300);
    } else {
      if (activeMenu) {
        setIsVisible(false);
        setTimeout(() => {
          setActiveMenu(menu);
          setIsVisible(true);
        }, 300);
      } else {
        setActiveMenu(menu);
        setIsVisible(true);
      }
    }
  };

  return (
    <nav className="container text-sm font-thin mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg text-black">
          THE HALPERIN HOTEL
        </Link>

        <div className="relative flex-1" ref={menuRef}>
          <ul className="flex justify-center gap-10 mx-8">
            <li className="relative">
              <button
                onClick={() => handleMenuClick("rooms")}
                className="text-sm font-medium flex items-center gap-1 group relative"
              >
                <span className={`relative transition-colors duration-300 ${
                  activeMenu === "rooms" ? "text-black" : "text-gray-500 hover:text-black"
                }`}>
                  Rooms
                  <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                    activeMenu === "rooms" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    activeMenu === "rooms" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    data-v-52d273a6=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      data-v-52d273a6=""
                      d="M6 9.5C12 9.5 12 15 12 15C12 15 12 9.5 18 9.5"
                      stroke="#8B6C26"
                      strokeLinejoin="bevel"
                    ></path>
                  </svg>
                </span>
              </button>
            </li>

            <li className="relative">
              <button
                onClick={() => handleMenuClick("suites")}
                className="text-sm font-medium flex items-center gap-1 group relative"
              >
                <span className={`relative transition-colors duration-300 ${
                  activeMenu === "suites" ? "text-black" : "text-gray-500 hover:text-black"
                }`}>
                  Suites
                  <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                    activeMenu === "suites" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    activeMenu === "suites" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    data-v-52d273a6=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      data-v-52d273a6=""
                      d="M6 9.5C12 9.5 12 15 12 15C12 15 12 9.5 18 9.5"
                      stroke="#8B6C26"
                      strokeLinejoin="bevel"
                    ></path>
                  </svg>
                </span>
              </button>
            </li>

            <li className="relative">
              <button
                onClick={() => handleMenuClick("dining")}
                className="text-sm font-medium flex items-center gap-1 group relative"
              >
                <span className={`relative transition-colors duration-300 ${
                  activeMenu === "dining" ? "text-black" : "text-gray-500 hover:text-black"
                }`}>
                  Dining
                  <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                    activeMenu === "dining" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    activeMenu === "dining" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    data-v-52d273a6=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      data-v-52d273a6=""
                      d="M6 9.5C12 9.5 12 15 12 15C12 15 12 9.5 18 9.5"
                      stroke="#8B6C26"
                      strokeLinejoin="bevel"
                    ></path>
                  </svg>
                </span>
              </button>
            </li>

            <li className="relative">
              <button
                onClick={() => handleMenuClick("occasions")}
                className="text-sm font-medium flex items-center gap-1 group relative"
              >
                <span className={`relative transition-colors duration-300 ${
                  activeMenu === "occasions" ? "text-black" : "text-gray-500 hover:text-black"
                }`}>
                  Occasions
                  <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                    activeMenu === "occasions" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    activeMenu === "occasions" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    data-v-52d273a6=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      data-v-52d273a6=""
                      d="M6 9.5C12 9.5 12 15 12 15C12 15 12 9.5 18 9.5"
                      stroke="#8B6C26"
                      strokeLinejoin="bevel"
                    ></path>
                  </svg>
                </span>
              </button>
            </li>

            <li className="relative">
              <button
                onClick={() => handleMenuClick("more")}
                className="text-sm font-medium flex items-center gap-1 group relative"
              >
                <span className={`relative transition-colors duration-300 ${
                  activeMenu === "more" ? "text-black" : "text-gray-500 hover:text-black"
                }`}>
                  More
                  <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                    activeMenu === "more" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    activeMenu === "more" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    data-v-52d273a6=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      data-v-52d273a6=""
                      d="M6 9.5C12 9.5 12 15 12 15C12 15 12 9.5 18 9.5"
                      stroke="#8B6C26"
                      strokeLinejoin="bevel"
                    ></path>
                  </svg>
                </span>
              </button>
            </li>
          </ul>

          {/* Mega Menu Content */}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 top-full mt-8 z-50
              transition-all duration-300 ease
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }
            `}
          >
            {activeMenu === "rooms" && <MegaMenu items={rooms} />}
            {activeMenu === "suites" && <MegaMenu items={suites} />}
            {activeMenu === "dining" && <MegaMenu items={dining} />}
            {activeMenu === "occasions" && <MegaMenu items={occasions} />}
            {activeMenu === "more" && <MegaMenu items={more} singleColumn />}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          {session ? (
            <Button
              size={"sm"}
              variant="outline"
              onClick={() => signOut()}
              className="border-[#8b6c26] text-black hover:bg-[#8b6d2636] px-3 hover:px-5 transition-all duration-300 ease"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                asChild
                size={"sm"}
                variant="outline"
                className="border-[#8b6c26] text-black hover:bg-[#8b6d2636] px-3 hover:px-5 transition-all duration-300 ease"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                size={"sm"}
                className="relative overflow-hidden bg-[#8b6c26] hover:bg-[#8b6c26] text-white px-3 hover:px-5 transition-all duration-300 ease"
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
