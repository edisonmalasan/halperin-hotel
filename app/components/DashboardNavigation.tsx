"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function DashboardNavigation() {
  const { data: session } = useSession();

  const navLinks = [
    {
      label: "Rooms",
      href: "/rooms",
      dropdown: [
        { label: "Standard", href: "/rooms/standard" },
        { label: "Deluxe", href: "/rooms/deluxe" },
      ],
    },
    {
      label: "Suites",
      href: "/suites",
      dropdown: [
        { label: "Junior Suite", href: "/suites/junior" },
        { label: "Presidential", href: "/suites/presidential" },
      ],
    },
    {
      label: "Dining",
      href: "/dining",
      dropdown: [
        { label: "Restaurants", href: "/dining/restaurants" },
        { label: "Bars", href: "/dining/bars" },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      dropdown: [], // Or skip NavigationMenuContent if no dropdown
    },
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
        <div className="flex flex-1 justify-center gap-4 mx-8">
          {navLinks.map(({ label, href, dropdown }) => (
            <NavigationMenu key={label}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium hover:text-[#8b6c26]">
                    {label}
                  </NavigationMenuTrigger>
                  {dropdown?.length > 0 && (
                    <NavigationMenuContent>
                      <ul className="grid gap-2 p-4 w-[200px]">
                        {dropdown.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} passHref legacyBehavior>
                              <NavigationMenuLink className="block px-2 py-1 hover:bg-gray-100 rounded-md transition">
                                {item.label}
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
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
