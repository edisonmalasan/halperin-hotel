"use client";

import React from "react";
import CardSlider from "../../components/CardSlider";
import { DiningCardSlider } from "@/app/client/dining/data/DiningCardSlider";
import TabsModule from "../../components/TabsModule";
import { tabsData } from "../data/cabanaTabsData";
import ImageCarousel from "../../components/ImageCarousel";
import { diningSlides } from "../../data/diningCarousel";

export default function CabanaCafePage() {
  return (
    <div>
      {/* SECTION 1 */}
      <section>
        <div>
          <div>
            <picture>
              {/*<!-- Mobile first -->*/}
              {/* <source
                            media="(max-width: 639px)"
                            srcSet="/images/rooms/rooms-mobile.png"
                            type="image/png"
                          />
                          <source
                            media="(max-width: 639px)"
                            srcSet="/images/rooms/rooms-mobile.png"
                          /> */}

              {/*<!-- Tablets -->*/}
              {/* <source
                            media="(min-width: 640px) and (max-width: 1023px)"
                            srcSet="/images/rooms/rooms-tablets.png"
                          /> */}

              {/*<!-- Desktop --> */}
              <source
                media="(min-width: 1024px)"
                srcSet="/images/dining/cabana-cafe/cabana-cafe-page.png"
              />

              <img
                className="w-full h-auto object-contain"
                src="/images/dining/cabana-cafe/cabana-cafe-page.png"
                alt="Cabana Cafe"
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 p-4 sm:p-6 md:p-10">
            <h1 className="text-[#8b6c26] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider">
              THE HALPERIN HOTEL
            </h1>
            <div className="text-2xl sm:text-3xl md:text-5xl font-extralight text-center">
              Al fresco dining at its glamorous best
            </div>
            <h1 className="text-base">THE CABANA CAFE</h1>
            <p className="text-center max-w-lg text-sm sm:text-base font-light">
              Casual, fresh dining in a picture-perfect setting. Enjoy a relaxed
              meal in the LA sunshine while your view of the pool sparkles with
              sheer pleasure.
            </p>
          </div>
        </div>
      </section>
      {/* END OF SECTION 1 */}

      {/* SECTION 2 */}
      <section className="w-full flex justify-center items-center bg-transparent pt-20 pb-10">
        <div
          className="relative w-full"
          style={{
            maxWidth: "1449px",
            aspectRatio: "1449 / 744",
            minHeight: "744 px",
          }}
        >
          {/* Background image */}
          <img
            src="/images/dining/cabana-cafe/cabana-cafe-open.png"
            alt="Serene spa room with two beds and arched window"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            draggable="false"
          />
        </div>
      </section>
      {/* END OF SECTION 2 */}

      {/* SECTION 2 */}
      <section className="w-full flex justify-center items-center bg-transparent pt-20 pb-10">
        <div className="mt-15">
          <CardSlider cards={DiningCardSlider} />
        </div>
      </section>
      {/* END OF SECTION 2 */}

      {/* SECTION 2.1 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto py-10">
          <div className="flex flex-row justify-center gap-x-100 overflow-hidden">
            <div className="text-[35px] items-start font-normal tracking-wide text-black ">
              After hours
            </div>
            <p className="max-w-sm text-[14px] pt-5 tracking-wide text-justify">
              The Cabana Cafe is available after hours so you can host your own
              private party here. Be it a birthday, anniversary or rehearsal
              dinner, this relaxed and fun poolside setting will serve up a
              treat for your guests.
            </p>
          </div>
        </div>
      </section>
      {/* END OF SECTION 2.1 */}

      {/* SECTION 3 */}
      <section className="py-2 0 bg-white">
        <div className="container mx-auto">
          <TabsModule tabs={tabsData} />
        </div>
      </section>
      {/* END OF SECTION 3 */}

      {/* SECTION 4 */}
      <section className="w-full max-w-7xl mx-auto px-6">
        {/* Top */}
        <div className="flex flex-row justify-between text-center md:text-left">
          <h2 className="text-3xl font-light mb-4">Dining in style</h2>
          <p className="text-neutral-600 text-base max-w-2xl mx-auto md:mx-0">
            For every occasion and every mood, The Beverly Hills Hotel has the
            restaurant for you.
          </p>
        </div>
      </section>
      {/* END OF SECTION 4 */}

      {/* SECTION 5 */}
      <section className="py-32 bg-white">
        <div className="container mx-auto">
          <ImageCarousel slides={diningSlides} />
        </div>
      </section>
      {/* END OF SECTION 5 */}

      {/* SECTION 6 */}
      <section className="w-full flex justify-center items-center bg-transparent py-20 pb-40">
        <div
          className="relative w-full"
          style={{
            maxWidth: "1449px",
            aspectRatio: "1449 / 744",
            minHeight: "300px",
          }}
        >
          {/* Background image */}
          <img
            src="/images/rooms/superior/last-section.png"
            alt="Serene spa room with two beds and arched window"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            draggable="false"
          />

          {/* Main heading and subheading */}
          <div className="relative z-20 w-full flex flex-col items-center justify-center text-center px-4 h-full">
            <h2 className="text-white text-4xl md:text-6xl font-extralight leading-tight mt-12 md:mt-0">
              Welcome to a world of
              <br />
              <span className="font-normal">bliss</span>
            </h2>
            {/* Wellness tag */}
            <span className="absolute right-10 bottom-1/3 text-white text-sm tracking-widest font-light z-30 hidden md:block">
              WELLNESS
            </span>
          </div>
          {/* Description bottom left */}
          <div className="absolute left-0 bottom-0 p-6 md:p-10 max-w-md text-white text-xs md:text-sm font-light z-30 text-left">
            Our serene spa is designed to create a sense of deep relaxation from
            the moment you step inside. Choose from a range of luxurious
            treatments, unwind with steam showers and indulgent spa products,
            and emerge feeling refreshed and rejuvenated.
          </div>
        </div>
      </section>
      {/* END OF SECTION 6 */}
    </div>
  );
}
