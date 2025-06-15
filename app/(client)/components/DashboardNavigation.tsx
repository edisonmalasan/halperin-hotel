"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { rooms } from "./../data/rooms";
import { suites } from "./../data/suites";
import { dining } from "./../data/dining";
import { occasions } from "./../data/occasions";

export default function DashboardNavigation() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="container text-sm font-thin mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg text-black">
          THE HALPERIN HOTEL
        </Link>

        <div className="flex flex-1 justify-center gap-4 mx-8">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium hover:text-[#8b6c26]">
                  Rooms
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {rooms.map((room) => (
                      <li key={room.href}>
                        <Link
                          href={room.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#8b6d2636] hover:text-[#8b6c26] focus:bg-[#8b6d2636] focus:text-[#8b6c26]",
                            pathname === room.href &&
                              "bg-[#8b6d2636] text-[#8b6c26]"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {room.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {room.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium hover:text-[#8b6c26]">
                  Suites
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {suites.map((suite) => (
                      <li key={suite.href}>
                        <Link
                          href={suite.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#8b6d2636] hover:text-[#8b6c26] focus:bg-[#8b6d2636] focus:text-[#8b6c26]",
                            pathname === suite.href &&
                              "bg-[#8b6d2636] text-[#8b6c26]"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {suite.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {suite.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium hover:text-[#8b6c26]">
                  Dining
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {dining.map((venue) => (
                      <li key={venue.href}>
                        <Link
                          href={venue.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#8b6d2636] hover:text-[#8b6c26] focus:bg-[#8b6d2636] focus:text-[#8b6c26]",
                            pathname === venue.href &&
                              "bg-[#8b6d2636] text-[#8b6c26]"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {venue.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {venue.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium hover:text-[#8b6c26]">
                  Occasions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {occasions.map((occasion) => (
                      <li key={occasion.href}>
                        <Link
                          href={occasion.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#8b6d2636] hover:text-[#8b6c26] focus:bg-[#8b6d2636] focus:text-[#8b6c26]",
                            pathname === occasion.href &&
                              "bg-[#8b6d2636] text-[#8b6c26]"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {occasion.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {occasion.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className={cn(
                    "text-sm font-medium hover:text-[#8b6c26] transition-colors",
                    pathname === "/contact" && "text-[#8b6c26]"
                  )}
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          {session ? (
            <Button
              size={"sm"}
              variant="outline"
              onClick={() => signOut()}
              className="border-[#8b6c26] text-black hover:bg-[#8b6d2636] px-3 hover:px-5 transition-all duration-300 ease-in-out"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                asChild
                size={"sm"}
                variant="outline"
                className="border-[#8b6c26] text-black hover:bg-[#8b6d2636] px-3 hover:px-5 transition-all duration-300 ease-in-out"
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
