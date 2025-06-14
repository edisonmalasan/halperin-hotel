"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { use } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Settings", href: "/settings" },
  { name: "Profile", href: "/profile" },
  { name: "Rooms", href: "/rooms" },
  { name: "Bookings", href: "/bookings" },
  { name: "Guests", href: "/guests" },
  { name: "Reports", href: "/reports" },
  { name: "Help", href: "/help" },
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
