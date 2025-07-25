"use client";

import React from "react";
import CardSlider from "../components/CardSlider";
import { DiningCardSlider } from "@/app/client/dining/data/DiningCardSlider";
import { dining } from "../data/dining";
import BookCard from "../components/BookCard";
import { useState } from "react";
import { usdToPhp } from "@/lib/utils";

export default function DiningPage() {
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const totalResults = dining.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalResults);
  const pagedSuites = dining.slice(startIdx, endIdx);

  const pagedDiningWithType: any[] = pagedSuites.map((dining) => ({
    ...dining,
    typeName: dining.title,
    price: usdToPhp(dining.price), // convert to php currency
  }));

  return (
    <div>
      <section>
        <div>
          <div>
            <picture>
              {/*<!-- Mobile first -->*/}
              <source
                media="(max-width: 639px)"
                srcSet="/images/dining/pool-tablets.png"
                type="image/png"
              />
              <source
                media="(max-width: 639px)"
                srcSet="/images/dining/pool-tablets.png"
              />

              {/*<!-- Tablets -->*/}
              <source
                media="(min-width: 640px) and (max-width: 1023px)"
                srcSet="/images/dining/pool-tablets.png"
              />

              {/*<!-- Desktop --> */}
              <source
                media="(min-width: 1024px)"
                srcSet="/images/dining/pool-desktop.png"
              />

              <img
                className="w-full h-auto object-contain"
                src="/images/dining/pool-desktop.png"
                alt="Pool Hero"
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 p-4 sm:p-6 md:p-10">
            <h1 className="text-[#8b6c26] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider">
              THE HALPERIN HOTEL
            </h1>
            <div className="text-2xl sm:text-3xl md:text-5xl font-extralight text-center">
              From power lunches to poolside lounging
            </div>
            <h1 className="text-base">Restaurants and bars</h1>
            <p className="text-center max-w-sm text-sm sm:text-base font-light">
              For every occasion and every mood, The Halperin Hotel has the
              restaurant for you.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex flex-row items-center justify-evenly gap-x-5 p-4 sm:p-6 md:p-10">
            <div className="text-4xl max-w-xl">
              Flavors that inspire, settings that shine
            </div>
            <p className="text-justify max-w-sm text-[15px] font-light pt-5">
              Casual, fresh dining in a picture-perfect setting. Enjoy a relaxed
              meal in the LA sunshine while your view of the pool sparkles with
              sheer pleasure.
            </p>
          </div>
          <div className="mt-15">
            <CardSlider cards={DiningCardSlider} />
          </div>
        </div>
      </section>

      <section className="py-30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex flex-col justify-center px-30">
            <div className="text-4xl max-w-2xl tracking-wide">
              Dining at The Halperin Hotel
            </div>
          </div>

          {/* Show Results Indicator */}
          <div className="flex justify-end items-center mt-4 mb-2">
            <span className="text-xs tracking-widest text-neutral-500 font-medium">
              SHOWING <span className="text-black font-semibold">{endIdx}</span>{" "}
              / <span className="text-black font-semibold">{totalResults}</span>{" "}
              RESULTS
            </span>
          </div>

          {/* Card Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-20 justify-center">
            {pagedDiningWithType.map((dining, idx) => (
              <BookCard key={dining.title + idx} {...dining} />
            ))}
          </div>

          {/* Pagination Navigation */}
          <div className="flex items-center justify-between mt-20 px-25">
            {/* Page Counter */}
            <div className="text-[16px] font-medium text-black/80">
              {String(page).padStart(2, "0")}{" "}
              <span className="text-neutral-400">
                - {String(totalPages).padStart(2, "0")}
              </span>
            </div>
            {/* Arrows */}
            <div className="flex gap-4">
              {/* Previous Button */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className={`group w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 p-0 ${
                  page === 1
                    ? "border border-neutral-200 text-neutral-300 cursor-not-allowed opacity-50 pointer-events-none"
                    : "border border-[#CFB67D] text-[#8b6c26] hover:bg-[#8b6c26]/10"
                }`}
              >
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
              {/* Next Button */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className={`group w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 p-0 ${
                  page === totalPages
                    ? "border border-neutral-200 text-neutral-300 cursor-not-allowed opacity-50 pointer-events-none"
                    : "border border-[#CFB67D] text-[#8b6c26] hover:bg-[#8b6c26]/10"
                }`}
              >
                <span className="block">
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
      </section>
    </div>
  );
}
