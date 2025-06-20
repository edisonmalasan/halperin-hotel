import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DiningSlide {
  image: string;
  name: string;
  description: string;
}

interface DiningImageCarouselProps {
  slides: DiningSlide[];
}

export default function DiningImageCarousel({ slides }: DiningImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  const goTo = (idx: number) => setCurrent(idx);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Main Image Slider */}
      <div className="relative w-full aspect-[16/7] bg-black overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Overlay: name, description, label */}
            <div className="absolute left-0 bottom-0 p-8 pb-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent w-full flex flex-col gap-2">
              <span className="text-xs text-white/80 tracking-widest uppercase mb-1">Dining</span>
              <div className="text-3xl font-bold text-white drop-shadow-lg">{slide.name}</div>
              <div className="text-base text-white/90 max-w-xl drop-shadow-lg">{slide.description}</div>
            </div>
            {/* Page indicator */}
            <div className="absolute bottom-6 right-8 text-white/90 text-sm font-mono">
              {idx + 1} - {total}
            </div>
          </div>
        ))}
      </div>
      {/* Thumbnails Row */}
      <div className="flex flex-row gap-4 justify-center items-center mt-2">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`border-2 ${idx === current ? "border-[#8B6C26]" : "border-transparent"} rounded-md overflow-hidden w-32 h-20 transition-all duration-200 focus:outline-none`}
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
      <div className="flex flex-row justify-between items-center mt-4">
        <button
          aria-label="Previous"
          onClick={prev}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-[#CFB67D] text-[#8B6C26] bg-white hover:bg-[#f5f5f5] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          aria-label="Next"
          onClick={next}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-[#8B6C26] bg-[#8B6C26] text-white hover:bg-[#a48d4a] transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
} 