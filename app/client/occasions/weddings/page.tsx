"use client";

import React from "react";
import CardSlider from "../../components/CardSlider";
import { OccasionsCardSlider } from "../data/WeddingCardSlider";
import ImageCarousel from "../../components/ImageCarousel";
import { diningSlides } from "../../data/diningCarousel";

export default function WeddingsPage() {
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
                srcSet="/images/occasions/weddings/weddings-page.png"
              />

              <img
                className="w-full h-auto object-contain"
                src="/images/occasions/weddings/weddings-page.png"
                alt="WEDDINGS AT THE HALPERIN HOTEL"
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 p-4 sm:p-6 md:p-10">
            <h1 className="text-[#8b6c26] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider">
              THE HALPERIN HOTEL
            </h1>
            <div className="text-2xl sm:text-3xl md:text-5xl font-extralight text-center">
              Love, done magnificently
            </div>
            <h1 className="text-base">WEDDINGS</h1>
            <p className="text-center max-w-lg text-sm sm:text-base font-light">
              The ‘Pink Palace’ has been the chosen wedding venue for Hollywood
              legends, international dignitaries, royalty and locals alike. Our
              incredible setting and wonderful team create an unforgettable way
              for everyone to celebrate their ultimate day.
            </p>
          </div>
        </div>
      </section>
      {/* END OF SECTION 1 */}

      {/* SECTION 2 */}
      <section className="w-full flex justify-center items-center bg-transparent pt-20 pb-10">
        <div className="relative w-[1000px] h-[844px]">
          {/* Background image */}
          <img
            src="/images/occasions/weddings/weddings-open1.png"
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
          <CardSlider cards={OccasionsCardSlider} />
        </div>
      </section>
      {/* END OF SECTION 2 */}

      {/* SECTION 3 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-row items-between justify-between mx-45 gap-25 overflow-hidden">
            <div className="flex flex-col justify-center gap-y-10 overflow-hidden max-w-4xl">
              <div className="text-[#8b6c26] text-sm">WEDDINGS</div>
              <p className="text-3xl/10 indent-10 tracking-wide text-justify">
                A tropical garden surrounded by palms. A grand ballroom flooded
                with natural light. The view of glamorous LA sparkling beyond
                the windows. Within our beautiful spaces, weddings transform
                into moments of the spectacular.
              </p>
            </div>
            <div className="flex flex-col justify-center pt-8 space-y-3 font-light text-xs">
              <div className="flex flex-row items-center gap-x-2">
                <svg
                  data-v-34474e68=""
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 shrink-0"
                >
                  <path
                    data-v-34474e68=""
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60439 3.45001H8.42317C8.78455 5.59706 10.7056 7.37761 12.8002 7.83462V8.64301C10.7262 9.07276 8.76897 10.9312 8.42404 13.05H7.6022C7.23015 10.9169 5.30108 9.08481 3.2002 8.64252V7.83765C5.32364 7.33027 7.19233 5.63394 7.60439 3.45001ZM7.91258 3.82536C7.44401 5.88476 5.57175 7.59523 3.57555 8.13173V8.34081C5.56263 8.83508 7.47386 10.6719 7.91419 12.6747H8.10878C8.54109 10.6386 10.4504 8.83845 12.4248 8.34084V8.13437C10.4413 7.63331 8.54189 5.83692 8.10939 3.82536H7.91258Z"
                    fill="#8B6C26"
                    stroke="#8B6C26"
                    strokeWidth="0.5"
                  ></path>
                </svg>
                <p>CELEBRATED HISTORY</p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                {" "}
                <svg
                  data-v-34474e68=""
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 shrink-0"
                >
                  <path
                    data-v-34474e68=""
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60439 3.45001H8.42317C8.78455 5.59706 10.7056 7.37761 12.8002 7.83462V8.64301C10.7262 9.07276 8.76897 10.9312 8.42404 13.05H7.6022C7.23015 10.9169 5.30108 9.08481 3.2002 8.64252V7.83765C5.32364 7.33027 7.19233 5.63394 7.60439 3.45001ZM7.91258 3.82536C7.44401 5.88476 5.57175 7.59523 3.57555 8.13173V8.34081C5.56263 8.83508 7.47386 10.6719 7.91419 12.6747H8.10878C8.54109 10.6386 10.4504 8.83845 12.4248 8.34084V8.13437C10.4413 7.63331 8.54189 5.83692 8.10939 3.82536H7.91258Z"
                    fill="#8B6C26"
                    stroke="#8B6C26"
                    strokeWidth="0.5"
                  ></path>
                </svg>
                <p>LIGHT FILLED</p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                {" "}
                <svg
                  data-v-34474e68=""
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 shrink-0"
                >
                  <path
                    data-v-34474e68=""
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60439 3.45001H8.42317C8.78455 5.59706 10.7056 7.37761 12.8002 7.83462V8.64301C10.7262 9.07276 8.76897 10.9312 8.42404 13.05H7.6022C7.23015 10.9169 5.30108 9.08481 3.2002 8.64252V7.83765C5.32364 7.33027 7.19233 5.63394 7.60439 3.45001ZM7.91258 3.82536C7.44401 5.88476 5.57175 7.59523 3.57555 8.13173V8.34081C5.56263 8.83508 7.47386 10.6719 7.91419 12.6747H8.10878C8.54109 10.6386 10.4504 8.83845 12.4248 8.34084V8.13437C10.4413 7.63331 8.54189 5.83692 8.10939 3.82536H7.91258Z"
                    fill="#8B6C26"
                    stroke="#8B6C26"
                    strokeWidth="0.5"
                  ></path>
                </svg>
                <p>A PLACE TO BE SEEN</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*END OF SECTION 3 */}

      {/* SECTION 4 */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-20">
        {/* Top */}
        <div className="flex flex-row justify-between gap-x-50 text-center md:text-left">
          <h2 className="text-3xl font-light mb-4">The range of spaces</h2>
          <p className="text-neutral-600 text-base max-w-2xl mx-auto md:mx-0">
            Generations have celebrated in these beautiful rooms, and we’ve
            looked after them all with a refined sense of style and an eternally
            thoughtful dedication to perfection.
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
