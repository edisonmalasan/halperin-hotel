"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  Home,
  CalendarCheck,
  BedDouble,
  Brush,
  Users,
  Receipt,
  BarChart2,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <Home /> },
  {
    label: "Reservations",
    href: "/admin/reservations",
    icon: <CalendarCheck />,
  },
  { label: "Rooms", href: "/admin/rooms", icon: <BedDouble /> },
  { label: "Housekeeping", href: "/admin/housekeeping", icon: <Brush /> },
  { label: "Guests", href: "/admin/guests", icon: <Users /> },
  { label: "Billing", href: "/admin/billing", icon: <Receipt /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart2 /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings /> },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="w-full md:w-64 bg-white border-r border-[#8b6c26] min-h-screen flex flex-col py-6 px-2 md:px-4">
      <div className="mb-8 text-2xl font-bold text-[#8b6c26] text-center">
        PMS Admin
      </div>
      <ul className="flex flex-row md:flex-col gap-2 md:gap-1 justify-center md:justify-start">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-base md:text-sm ${
                  active
                    ? "bg-[#8b6c26] text-white shadow"
                    : "text-neutral-700 hover:bg-[#8b6d2636] hover:text-[#8b6c26]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
