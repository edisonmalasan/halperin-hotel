"use client";
import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

type MegaMenuItem = {
  title: string;
  href: string;
  image?: string;
  description?: string;
  features?: string[];
};

type MegaMenuProps = {
  label: string;
  items: MegaMenuItem[];
  menuTriggerClassName?: string;
};

export default function MegaMenu({
  label,
  items,
  menuTriggerClassName,
}: MegaMenuProps) {
  const [selected, setSelected] = useState(items[0]);

  return (
    <NavigationMenuItem className="relative group">
      <NavigationMenuTrigger className={menuTriggerClassName || ""}>
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className="
          bg-white shadow-lg rounded-md
          w-[700px] h-[260px] p-4
          grid grid-cols-2 gap-4
        "
        style={{ minWidth: 700 }}
      >
        {/* Left: List */}
        <ul className="space-y-2 border-r pr-4 overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.href}
              className={`cursor-pointer p-2 rounded hover:bg-[#8b6d2636] ${
                selected.title === item.title
                  ? "bg-[#8b6d2636] text-[#8b6c26]"
                  : ""
              }`}
              onMouseEnter={() => setSelected(item)}
            >
              <div className="font-medium text-sm flex items-center justify-between">
                {item.title}
                {selected.title === item.title && (
                  <span className="ml-2 text-[#8b6c26]">→</span>
                )}
              </div>
            </li>
          ))}
        </ul>
        {/* Right: Preview */}
        <div className="space-y-3 flex flex-col h-full">
          {selected.image && (
            <img
              src={selected.image}
              alt={selected.title}
              className="rounded w-full h-[120px] object-cover"
            />
          )}
          {selected.description && (
            <p className="text-sm flex-1">{selected.description}</p>
          )}
          {selected.features && (
            <ul className="text-sm grid gap-1">
              {selected.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#8b6c26]">◆</span> {f}
                </li>
              ))}
            </ul>
          )}
          <Link
            href={selected.href}
            className="text-sm text-blue-600 hover:underline"
          >
            View Details →
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
