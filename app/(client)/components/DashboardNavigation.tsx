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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
          {/* Mega Menus */}
          <NavigationMenu>
            <NavigationMenuList className="flex flex-1 justify-center gap-4 mx-8">
              <MegaMenu label="Rooms" items={rooms} />
              <MegaMenu label="Suites" items={suites} />
              <MegaMenu label="Dining" items={dining} />
              <MegaMenu label="Occasions" items={occasions} />
              <MegaMenu label="More" items={more} />
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
