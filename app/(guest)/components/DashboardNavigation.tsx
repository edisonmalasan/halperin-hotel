"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { use } from "react";

const navigation = [
  { name: "Dashboard", href: "/public/dashboard" },
  { name: "Settings", href: "/public/settings" },
  { name: "Profile", href: "/public/profile" },
  { name: "Rooms", href: "/public/rooms" },
  { name: "Bookings", href: "/public/bookings" },
  { name: "Guests", href: "/public/guests" },
  { name: "Reports", href: "/public/reports" },
  { name: "Help", href: "/public/help" },
];

export default function DashboardNavigation() {
  const pathname = usePathname();
  return (
    <>
      {navigation.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "text-base font-bold transition-colors hover:text-foreground",
            link.href === pathname
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
