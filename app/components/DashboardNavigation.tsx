"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function DashboardNavigation() {
  const { data: session } = useSession();

  // 🔹 Public navigation links
  const publicLinks = [
    { href: "/rooms", label: "Rooms" },
    { href: "/suites", label: "Suites" },
    { href: "/dining", label: "Dining" },
    { href: "/contact", label: "Contact" },
  ];

  // authenticated/user logged in links
  const authLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/bookings", label: "My Bookings" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center text-sm font-thin">
        {/* Logo */}
        <Link href="/" className=" flex-shrink-0 ">
          THE HALPERIN HOTEL
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-1 justify-center gap-8 mx-8 ">
          {[...publicLinks, ...(session ? authLinks : [])].map(
            ({ href, label }) => (
              <div key={href} className="relative group">
                <Link
                  href={href}
                  className=" transition-colors duration-200 font-medium"
                >
                  {label}
                </Link>
                <div className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-[#8b6c26] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></div>
              </div>
            )
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          {session ? (
            <Button
              size={"sm"}
              variant="outline"
              onClick={() => signOut()}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                asChild
                size={"sm"}
                variant="outline"
                className="border-[#8b6c26] text-black hover:bg-[#8b6d2636] px-3 hover:px-5 transition-all duration-300 ease-in-out "
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                size={"sm"}
                className="relative overflow-hidden bg-[#8b6c26] hover:bg-[#8b6c26] text-white px-3 hover:px-5 transition-all duration-300 ease-in-out"
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
