"use client";

import React, { useState, useRef, useEffect } from "react";

// structure for a single content item
interface ContentItem {
  label: string;
  heading: string;
  description: string;
  image: string;
  linkText: string;
  linkHref: string;
}

// structure for a single tab
interface TabData {
  title: string;
  content: ContentItem[];
}

interface TabsModuleProps {
  tabs: TabData[];
}

export default function TabsModule({ tabs }: TabsModuleProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // useEffect to update the underline position when activeTab changes
  useEffect(() => {
    const activeTabRef = tabRefs.current[activeTab];
    if (activeTabRef) {
      setUnderlineStyle({
        left: activeTabRef.offsetLeft,
        width: activeTabRef.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  const renderContentItem = (item: ContentItem, index: number) => {
    const isReversed = index % 2 !== 0; // Alternate layout
    return (
      <div
        key={index}
        className={`flex ${
          isReversed ? "flex-row-reverse" : "flex-row"
        } items-center justify-evenly gap-16 py-10`}
      >
        {/* Text Content */}
        <div className="flex flex-col gap-4 max-w-md">
          <span className="text-xs text-[#8b6c26] tracking-widest uppercase">
            {item.label}
          </span>
          <h2 className="text-4xl font-normal text-neutral-800">
            {item.heading}
          </h2>
          <p className="text-neutral-600 leading-relaxed">{item.description}</p>
          <a
            href={item.linkHref}
            className="group inline-flex items-center gap-3 mt-4 text-sm font-semibold text-neutral-700 hover:text-[#8b6c26]"
          >
            {item.linkText}
            <svg
              width="30"
              height="30"
              viewBox="0 0 56 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrowHover rtl:rotate-180 text-[#8b6c26] transition-transform group-hover:translate-x-1"
            >
              <rect
                x="0.5"
                y="1.498"
                width="55"
                height="39"
                rx="19.5"
                stroke="currentColor"
                strokeOpacity="0.5"
                fill="transparent"
              ></rect>
              <path
                d="M30.5 27C30.5 21 36 21 36 21M36 21C36 21 30.5 21 30.5 15M36 21H20"
                stroke="black"
                strokeLinejoin="bevel"
              ></path>
            </svg>
          </a>
        </div>
        {/* Image */}
        <div className="w-[500px] h-[500px] bg-gray-100 shadow-md">
          <div className="relative w-full h-full overflow-hidden border-8 border-white/90">
            <img
              src={item.image}
              alt={item.heading}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-4 border-black/10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="relative border-b border-gray-200">
        <div className="flex justify-center items-center gap-60">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => setActiveTab(index)}
              className={`py-4 text-sm font-semibold tracking-wider transition-colors ${
                activeTab === index
                  ? "text-[#8b6c26]"
                  : "text-neutral-500 hover:text-[#8b6c26]"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div
          className="absolute bottom-[-1px] h-[2px] bg-[#8b6c26] transition-all duration-300 ease-in-out"
          style={underlineStyle}
        />
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 ${
              activeTab === index ? "opacity-100" : "opacity-0 absolute -z-10"
            }`}
          >
            {tab.content.map(renderContentItem)}
          </div>
        ))}
      </div>
    </div>
  );
}
