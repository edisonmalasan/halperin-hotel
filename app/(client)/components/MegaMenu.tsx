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
  singleColumn?: boolean;
};

export default function MegaMenu({
  items,
  singleColumn = false,
}: MegaMenuProps) {
  const [selected, setSelected] = useState(items[0]);

  if (singleColumn) {
    return (
      <div className="bg-white shadow-lg rounded-md p-4 w-[300px] flex flex-col gap-2">
        <ul>
          {items.map((item) => (
            <li key={item.href} className="p-2 hover:bg-[#8b6d2636] rounded">
              <Link href={item.href} className="font-medium text-xs">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white shadow-lg rounded-md
        p-4
        grid grid-cols-2 gap-x-8 gap-y-2
        w-[630px] h-full
      "
    >
      {/* Left: List */}
      <ul className="space-y-2 border-r pr-4">
        {items.map((item) => (
          <li
            key={item.href}
            className={`cursor-pointer p-2 rounded group ${
              selected.title === item.title ? "" : ""
            }`}
            onMouseEnter={() => setSelected(item)}
          >
            <div
              className={`flex items-center justify-between text-xs transition-all duration-200 ${
                selected.title === item.title ? "font-medium" : "font-normal"
              } group-hover:font-medium`}
            >
              {item.title}
              <span
                className={`ml-2 transition-opacity duration-200 ${
                  selected.title === item.title ||
                  (selected.title !== item.title &&
                    false) /* placeholder for hover, see below */
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <svg
                  width="17"
                  height="12"
                  viewBox="0 0 17 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="long rtl:rotate-180"
                >
                  <path
                    d="M10.5 12C10.5 6 16 6 16 6M16 6C16 6 10.5 6 10.5 0M16 6L0 6"
                    stroke="#8B6C26"
                    strokeLinejoin="bevel"
                  ></path>
                </svg>
              </span>
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
            className="rounded w-[full] h-[237px] object-cover"
          />
        )}
        {selected.description && (
          <p className="text-xs">{selected.description}</p>
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
