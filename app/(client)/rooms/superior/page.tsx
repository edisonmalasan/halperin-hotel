"use client";

import React from "react";
import TabsModule from "../../components/TabsModule";
import { tabsData } from "../data/superiorTabsData";
import ImageCarousel from "../../components/ImageCarousel";
import { diningSlides } from "../../data/diningCarousel";

export default function SuperiorRoomPage() {
  return (
    <div>
      {/* SECTION 1 */}
      <section>
        <div>
          <div>
            <picture>
              {/*<!-- Mobile first -->*/}
              <source
                media="(max-width: 639px)"
                srcSet="/images/rooms/rooms-mobile.png"
                type="image/png"
              />
              <source
                media="(max-width: 639px)"
                srcSet="/images/rooms/rooms-mobile.png"
              />

              {/*<!-- Tablets -->*/}
              <source
                media="(min-width: 640px) and (max-width: 1023px)"
                srcSet="/images/rooms/rooms-tablets.png"
              />

              {/*<!-- Desktop --> */}
              <source
                media="(min-width: 1024px)"
                srcSet="/images/rooms/superior/superior-room-page.png"
              />

              <img
                className="w-full h-auto object-contain"
                src="/images/rooms/superior/superior-room-page.png"
                alt="Room Hero"
              />
            </picture>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 p-4 sm:p-6 md:p-10">
            <h1 className="text-[#8b6c26] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider">
              THE HALPERIN HOTEL
            </h1>
            <div className="text-2xl sm:text-3xl md:text-5xl font-extralight text-center">
              Experience true Beverly Hills glamour
            </div>
            <h1 className="text-base">SUPERIOR ROOM</h1>
            <p className="text-center max-w-sm text-sm sm:text-base font-light">
              Enjoy lovely garden views from these light and airy rooms. Here,
              in the centre of the hotel, Old Hollywood glamour blends with a
              warm, contemporary style.
            </p>
          </div>
        </div>
      </section>
      {/* END OF SECTION 1 */}

      {/* SECTION 2 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-row items-between justify-between mx-45 gap-25 overflow-hidden">
            <div className="flex flex-col justify-center gap-y-10 overflow-hidden max-w-4xl">
              <div className="text-[#8b6c26] text-sm">YOUR ROOM</div>
              <p className="text-3xl/10 indent-10 tracking-wide text-justify">
                Spacious and airy, impeccably stylish with a dash of timeless
                Hollywood glamour. Perfect for the business traveller in search
                of some luxurious comfort and a true home from home.
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
                <p>ROMANTIC BREAK</p>
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
                <p>TRANQUIL SETTING</p>
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
                <p>SOLO TRAVELERS</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END OF SECTION 2 */}

      {/* SECTION 3 */}
      <section className="py-2 0 bg-white">
        <div className="container mx-auto">
          <TabsModule tabs={tabsData} />
        </div>
      </section>
      {/* END OF SECTION 3 */}

      {/* SECTION 4 */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16">
        {/* Top */}
        <div className="flex flex-row justify-between mb-10 text-center md:text-left">
          <h2 className="text-3xl font-light mb-4">At a glance</h2>
          <p className="text-neutral-600 text-base max-w-2xl mx-auto md:mx-0">
            The warm, welcoming combination of elegant design and soft colour
            make these bright rooms perfect for the business traveller.
          </p>
        </div>
        {/* Bottom */}
        <div className="mx-auto w-full">
          {/* 1st row*/}
          <div className="flex flex-col md:flex-row w-full px-5 text-sm font-light">
            <div className="flex-1 flex items-center gap-2 py-2">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                className="shrink-0"
              >
                <path
                  fill="#8B6C26"
                  stroke="#8B6C26"
                  strokeWidth="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.604 3.45h.819c.361 2.147 2.282 3.928 4.377 4.385v.808c-2.074.43-4.031 2.288-4.376 4.407h-.822c-.372-2.133-2.301-3.965-4.402-4.407v-.805c2.124-.507 3.993-2.203 4.405-4.387zM7.913 3.825c-.469 2.06-2.341 3.77-4.337 4.307v.209c1.987.494 3.899 2.331 4.339 4.334h.195c.432-2.036 2.341-3.836 4.316-4.334V8.134c-1.984-.501-3.883-2.297-4.316-4.309h-.197z"
                />
              </svg>
              <span>
                37m²/400ft<sup>2</sup>
              </span>
            </div>
            <div className="flex-1 flex items-center gap-2 py-2">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                className="shrink-0"
              >
                <path
                  fill="#8B6C26"
                  stroke="#8B6C26"
                  strokeWidth="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.604 3.45h.819c.361 2.147 2.282 3.928 4.377 4.385v.808c-2.074.43-4.031 2.288-4.376 4.407h-.822c-.372-2.133-2.301-3.965-4.402-4.407v-.805c2.124-.507 3.993-2.203 4.405-4.387zM7.913 3.825c-.469 2.06-2.341 3.77-4.337 4.307v.209c1.987.494 3.899 2.331 4.339 4.334h.195c.432-2.036 2.341-3.836 4.316-4.334V8.134c-1.984-.501-3.883-2.297-4.316-4.309h-.197z"
                />
              </svg>
              <span>Peaceful location</span>
            </div>
          </div>
          {/* dividr */}
          <div className="border-t border-gray-200 my-2 w-full" />
          {/* 2nd row */}
          <div className="flex flex-col md:flex-row w-full px-5 text-sm font-light">
            <div className="flex-1 flex items-center gap-2 py-2">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                className="shrink-0"
              >
                <path
                  fill="#8B6C26"
                  stroke="#8B6C26"
                  strokeWidth="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.604 3.45h.819c.361 2.147 2.282 3.928 4.377 4.385v.808c-2.074.43-4.031 2.288-4.376 4.407h-.822c-.372-2.133-2.301-3.965-4.402-4.407v-.805c2.124-.507 3.993-2.203 4.405-4.387zM7.913 3.825c-.469 2.06-2.341 3.77-4.337 4.307v.209c1.987.494 3.899 2.331 4.339 4.334h.195c.432-2.036 2.341-3.836 4.316-4.334V8.134c-1.984-.501-3.883-2.297-4.316-4.309h-.197z"
                />
              </svg>
              <span>Garden views</span>
            </div>
            <div className="flex-1 flex items-center gap-2 py-2">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                className="shrink-0"
              >
                <path
                  fill="#8B6C26"
                  stroke="#8B6C26"
                  strokeWidth="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.604 3.45h.819c.361 2.147 2.282 3.928 4.377 4.385v.808c-2.074.43-4.031 2.288-4.376 4.407h-.822c-.372-2.133-2.301-3.965-4.402-4.407v-.805c2.124-.507 3.993-2.203 4.405-4.387zM7.913 3.825c-.469 2.06-2.341 3.77-4.337 4.307v.209c1.987.494 3.899 2.331 4.339 4.334h.195c.432-2.036 2.341-3.836 4.316-4.334V8.134c-1.984-.501-3.883-2.297-4.316-4.309h-.197z"
                />
              </svg>
              <span>Lots of natural light</span>
            </div>
          </div>
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
          {/* Overlay for darkening if needed */}
          <div className="absolute inset-0" />
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
