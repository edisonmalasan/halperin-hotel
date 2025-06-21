import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardFeature {
  icon?: React.ReactNode;
  text: string;
}

export interface CardSliderCard {
  mainImage: string;
  secondaryImage: string;
  title: string;
  description: string;
  features: CardFeature[];
  link: string;
  linkLabel: string;
}

interface CardSliderProps {
  cards: CardSliderCard[];
}

export default function CardSlider({ cards }: CardSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = cards.length;
  const sliderRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  const card = cards[current];

  return (
    <div className="relative w-full max-w-[1300px] mx-auto min-h-[700px] flex flex-col justify-center">
      {/* Image Slider */}
      <div className="overflow-hidden w-full">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {cards.map((imgCard, idx) => (
            <div
              key={idx}
              className="flex flex-row w-full justify-between items-end mb-8 gap-12 min-w-full px-2"
            >
              <a
                href={imgCard.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={imgCard.linkLabel}
                className="block group flex-shrink-0"
              >
                <div className="overflow-hidden w-[900px] h-[570px] bg-gray-100 border-8 border-white shadow-lg">
                  <img
                    src={imgCard.mainImage}
                    alt={imgCard.title}
                    className="object-cover w-full h-full"
                    draggable={false}
                  />
                </div>
              </a>
              <div className="flex-shrink-0 flex items-end h-[440px]">
                <div className="overflow-hidden shadow-lg w-[315px] h-[315px] bg-gray-100 border-8 border-white flex items-center justify-center">
                  <img
                    src={imgCard.secondaryImage}
                    alt={imgCard.title + " secondary"}
                    className="object-cover w-full h-full"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Features and Description (no sliding effect) */}
      <div className="flex flex-row w-full gap-8 items-center mt-2 px-2">
        <div className="flex flex-col gap-3 min-w-[180px]">
          {card.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs tracking-widest text-neutral-700 uppercase font-medium"
            >
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  fill="#8B6C26"
                  d="M4.603 0.449h0.819c0.361 2.147 2.282 3.927 4.377 4.384v0.808c-2.074 0.43-4.031 2.288-4.376 4.407h-0.822c-0.372-2.133-2.301-3.965-4.402-4.407v-0.805c2.124-0.507 3.993-2.203 4.405-4.387z"
                />
              </svg>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start max-w-2xl">
          <div className="text-2xl font-bold text-neutral-800 mb-1">
            {card.title}
          </div>
          <div className="text-base text-neutral-600 leading-relaxed mb-2">
            {card.description}
          </div>
        </div>
        {/* Navigation & Counter */}
        <div className="flex flex-col justify-center items-end flex-1 min-w-[140px]">
          <div className="flex items-center gap-6">
            <span className="font-mono text-lg text-neutral-700">
              {String(current + 1).padStart(2, "0")}{" "}
              <span className="opacity-50">
                - {String(total).padStart(2, "0")}
              </span>
            </span>
            <button aria-label="Previous" onClick={prev} className="group">
              <span className="block rotate-180">
                <svg
                  width="64"
                  height="65"
                  viewBox="0 0 64 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrowHover rtl:rotate-180 text-[#8b6c26]"
                >
                  <rect
                    x="0.5"
                    y="1.49805"
                    width="63"
                    height="63"
                    rx="31.5"
                    stroke="#CFB67D"
                    strokeOpacity="0.5"
                    fill="transparent"
                    className="transition-colors duration-200 group-hover:fill-[#8b6c26]"
                  ></rect>
                  <path
                    className="transition-colors duration-200 group-hover:stroke-white"
                    d="M34.5 38.998C34.5 32.998 40 32.998 40 32.998M40 32.998C40 32.998 34.5 32.998 34.5 26.998M40 32.998H24"
                    stroke="black"
                    strokeLinejoin="bevel"
                  ></path>
                </svg>
              </span>
            </button>
            <button aria-label="Next" onClick={next} className="group">
              <span className="block rotate-360">
                <svg
                  width="64"
                  height="65"
                  viewBox="0 0 64 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrowHover rtl:rotate-180 text-[#8b6c26]"
                >
                  <rect
                    x="0.5"
                    y="1.49805"
                    width="63"
                    height="63"
                    rx="31.5"
                    stroke="#CFB67D"
                    strokeOpacity="0.5"
                    fill="transparent"
                    className="transition-colors duration-200 group-hover:fill-[#8b6c26]"
                  ></rect>
                  <path
                    className="transition-colors duration-200 group-hover:stroke-white"
                    d="M34.5 38.998C34.5 32.998 40 32.998 40 32.998M40 32.998C40 32.998 34.5 32.998 34.5 26.998M40 32.998H24"
                    stroke="black"
                    strokeLinejoin="bevel"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
