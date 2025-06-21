import React, { useState } from "react";

interface slide {
  image: string;
  name: string;
  description: string;
}

interface ImageCarouselProps {
  slides: slide[];
}

export default function ImageCarousel({ slides }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  const goTo = (idx: number) => setCurrent(idx);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* Main Image Slider */}
      <div className="relative w-full aspect-[16/7] h-[638px] bg-black overflow-hidden border-8 border-white/100 shadow-md">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Overlay: name, description, label */}
            <div className="absolute left-0 bottom-0 p-8 pb-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent w-full flex flex-col gap-2">
              <span className="text-xs text-white/80 tracking-widest uppercase mb-5">
                Dining
              </span>
              <div className="text-3xl font-bold text-white drop-shadow-lg">
                {slide.name}
              </div>
              <div className="text-sm text-justify tracking-tight indent-10 text-white/90 max-w-xl drop-shadow-lg">
                {slide.description}
              </div>
            </div>
            {/* Page indicator */}
            <div className="absolute bottom-6 right-8 text-white/90 text-sm font-mono">
              {idx + 1} - {total}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between items-center">
        {/* Thumbnails Row */}
        <div className="flex flex-row gap-4 justify-center items-center mt-2">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`border-2 ${
                idx === current ? "border-[#8B6C26]" : "border-transparent"
              } rounded-md overflow-hidden w-42 h-25 transition-all duration-200 focus:outline-none`}
              aria-label={`Go to ${slide.name}`}
            >
              <img
                src={slide.image}
                alt={slide.name + " thumbnail"}
                className="object-cover w-full h-full"
                draggable={false}
              />
            </button>
          ))}
        </div>
        {/* Navigation Buttons */}
        <div className="flex flex-row justify-between gap-x-5 items-center mt-4">
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
  );
}
