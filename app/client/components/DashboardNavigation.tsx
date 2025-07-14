"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import MegaMenu from "./MegaMenu";
import { rooms } from "../data/rooms";
import { suites } from "../data/suites";
import { dining } from "../data/dining";
import { occasions } from "../data/occasions";
import { more } from "../data/more";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ROUTES } from "@/app/api/routes";

export default function DashboardNavigation() {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<
    "rooms" | "suites" | "dining" | "occasions" | "more" | null
  >(null);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        setTimeout(() => setActiveMenu(null), 300);
      }
    }
    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  useEffect(() => {
    // Close menu on route change
    setIsVisible(false);
    setTimeout(() => setActiveMenu(null), 300);
  }, [pathname]);

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
        setTimeout(() => setIsVisible(true), 10);
      }
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <>
      {/* backdrop overlay */}
      {activeMenu &&
        mounted &&
        createPortal(
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => setActiveMenu(null), 300);
            }}
            aria-label="Close menu"
          />,
          document.body
        )}
      <nav className="container text-sm font-thin mx-auto px-4 py-4 z-50 relative">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl text-black">
            THE HALPERIN HOTEL
          </Link>

          <div className="relative flex-1" ref={menuRef}>
            <ul className="flex justify-center gap-10 mx-8 z-50 relative">
              <li className="relative">
                <button
                  onClick={() => handleMenuClick("rooms")}
                  className="text-base font-medium flex items-center gap-1 group relative"
                >
                  <span
                    className={`relative transition-colors duration-300 ${
                      activeMenu === "rooms"
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    Rooms
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                        activeMenu === "rooms"
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
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
                  className="text-base font-medium flex items-center gap-1 group relative"
                >
                  <span
                    className={`relative transition-colors duration-300 ${
                      activeMenu === "suites"
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    Suites
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                        activeMenu === "suites"
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
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
                  className="text-base font-medium flex items-center gap-1 group relative"
                >
                  <span
                    className={`relative transition-colors duration-300 ${
                      activeMenu === "dining"
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    Dining
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                        activeMenu === "dining"
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
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
                  className="text-base font-medium flex items-center gap-1 group relative"
                >
                  <span
                    className={`relative transition-colors duration-300 ${
                      activeMenu === "occasions"
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    Occasions
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                        activeMenu === "occasions"
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
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
                  className="text-base font-medium flex items-center gap-1 group relative"
                >
                  <span
                    className={`relative transition-colors duration-300 ${
                      activeMenu === "more"
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    More
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b6c26] transition-opacity duration-300 ease ${
                        activeMenu === "more"
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
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

            {/* Mega Menu Content (content of each nav links) */}
            <div
              className={`
                absolute left-1/2 -translate-x-1/2 top-full mt-8 z-50
                transition-all duration-300 ease
                ${
                  activeMenu && isVisible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }
              `}
              style={{ minWidth: 400 }}
            >
              {activeMenu === "rooms" && (
                <MegaMenu items={rooms} category="rooms" />
              )}
              {activeMenu === "suites" && (
                <MegaMenu items={suites} category="suites" />
              )}
              {activeMenu === "dining" && (
                <MegaMenu items={dining} category="dining" />
              )}
              {activeMenu === "occasions" && (
                <MegaMenu items={occasions} category="occasions" />
              )}
              {activeMenu === "more" && <MegaMenu items={more} singleColumn />}
            </div>
          </div>

          {/* auth buttons */}
          <div className="flex gap-3 flex-shrink-0 items-center">
            {isLoading ? null : isAuthenticated ? (
              <>
                {/* User avatar/icon */}
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={
                      user.given_name ||
                      user.family_name ||
                      user.email ||
                      "User"
                    }
                    title={
                      user.given_name ||
                      user.family_name ||
                      user.email ||
                      "User"
                    }
                    className="w-9 h-9 rounded-full object-cover border border-[#8b6c26] shadow-sm mr-1"
                  />
                ) : (
                  <span
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 border border-[#8b6c26] mr-1"
                    title={user?.email || "User"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#8b6c26"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25v-.75z"
                      />
                    </svg>
                  </span>
                )}
                <LogoutLink>
                  <span
                    onClick={handleSignOut}
                    className="inline-flex items-center justify-center border border-[#8b6c26] text-black hover:bg-[#8b6d2636] px-3 py-1.5 rounded text-sm hover:px-5 font-medium transition-all duration-400 ease"
                  >
                    Sign Out
                  </span>
                </LogoutLink>
              </>
            ) : (
              <>
                <LoginLink>
                  <span className="inline-flex items-center justify-center border relative overflow-hidden border-[#8b6c26] text-black hover:bg-[#8b6d2636] px-3 py-1.5 rounded text-sm hover:px-5 font-medium transition-all duration-400 ease">
                    Sign In
                  </span>
                </LoginLink>
                <RegisterLink>
                  <span className="inline-flex items-center justify-center border relative overflow-hidden bg-[#8b6c26] hover:bg-[#8b6c26] text-white px-3 py-1.5 rounded text-sm hover:px-5 font-medium transition-all duration-400 ease">
                    Sign Up
                  </span>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
