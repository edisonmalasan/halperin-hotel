"use client";

import React from "react";
import CardSlider from "@/app/(client)/components/CardSlider";
import { RoomCardSlider } from "@/app/(client)/rooms/data/RoomCardSlider";
import TabsModule from "../../components/TabsModule";
import { tabsData } from "../data/superiorTabsData";

export default function SuperiorRoomPage() {
  return (
    <div>
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

      <section>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex flex-row items-center justify-evenly gap-x-5 p-4 sm:p-6 md:p-10">
            <div className="text-4xl max-w-xl">
              Dazzling history, contemporary style
            </div>
            <p className="text-justify max-w-sm text-[15px] font-light pt-5">
              Guest rooms in the main house embody LA's sparkling elegance,
              while the bungalows draw inspiration from the lush surrounding
              landscape for an effortless and modern Californian design.
            </p>
          </div>
          <div className="my-15">
            <CardSlider cards={RoomCardSlider} />
          </div>
        </div>
      </section>

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

      <section className="py-2 0 bg-white">
        <div className="container mx-auto">
          <TabsModule tabs={tabsData} />
        </div>
      </section>

      <section>
        <div></div>
      </section>
    </div>
  );
}
