"use client";
import { useState } from "react";
import Link from "next/link";

type MegaMenuItem = {
  title: string;
  href: string;
  image?: string;
  description?: string;
  features?: string[];
};

type MegaMenuProps = {
  items: MegaMenuItem[];
};

export default function MegaMenu({ items }: MegaMenuProps) {
  const [selected, setSelected] = useState(items[0]);

  return (
    <div
      className="
        bg-white shadow-lg rounded-md
        p-4
        grid grid-cols-2 gap-x-8 gap-y-2
        w-[600px] h-[577px]
      "
    >
      {/* Left: List */}
      <ul className="space-y-2 border-r pr-4">
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
            <div className="font-medium text-xs flex items-center justify-between">
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
          <p className="text-xs flex-1">{selected.description}</p>
        )}
        {selected.features && (
          <ul className="text-xs grid gap-1">
            {selected.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-[#8b6c26]">◆</span> {f}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={selected.href}
          className="text-xs text-blue-600 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
