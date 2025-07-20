"use client";

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Link from "next/link";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { draggableItems } from "./client/data/draggableItems";
import Container from "./client/components/DraggableContainer";
import { FlipWords } from "@/components/ui/flip-words";
import CardSlider from "./client/components/CardSlider";
import { sliderCards } from "./client/data/homecardslider";
import ImageCarousel from "./client/components/ImageCarousel";
import { diningSlides } from "./client/data/diningCarousel";
import TabsModule from "./client/components/TabsModule";
import { tabsData } from "./client/data/tabsData";

export default function HomePage() {
  /* SECTION 1 VARS */

  // video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  //auto play video on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay blocked:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  //  play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  //mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  /* END OF SECTION 1 VARS */

  /* SECTION 2 VARS */

  // FlipWords
  const words = ["brightest", "glamorous", "exclusive", "luxurious"];

  // Draggable items for the showcase
  const containerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  /* END OF SECTION 2 VARS */

  /* SECTION 3 VARS */

  /* END OF SECTION 3 VARS */

  return (
    <div>
      {/* SECTION 1 */}
      <section className="relative h-[865px] text-white overflow-hidden">
        {/* vid layr */}
        <video
          ref={videoRef}
          src="/videos/halperin-hotel-1.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* dark overlay for vid */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* vid control*/}
        <div className="absolute bottom-6 sm:bottom-8 rtl:left-4 ltr:right-4 lg:ltr:right-1/2 lg:ltr:translate-x-2/4 lg:rtl:left-1/2 lg:rtl:-translate-x-2/4 flex gap-2 xl:bottom-10 z-30">
          <button
            onClick={togglePlay}
            className="rounded-full uppercase px-4 py-[6px] sm:py-2 border border-white/50 text-white flex items-center justify-center text-sm leading-4 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-6 h-4 fill-white" />
            ) : (
              <Play className="w-6 h-4 fill-white" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="rounded-full uppercase px-4 py-[6px] sm:py-2 border border-white/50 text-white flex items-center justify-center text-sm leading-4 cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 fill-white" />
            ) : (
              <Volume2 className="w-6 h-6 fill-white" />
            )}
          </button>
        </div>
      </section>
      {/* END OF SECTION 1 */}

      {/* SECTION 2 */}
      <section className="py-5 bg-white">
        <DraggableCardContainer
          ref={containerRef}
          className="relative flex flex-col min-h-screen w-full items-center justify-start overflow-clip select-none"
        >
          {/* Top */}
          <div className="w-full px-4 pt-10 z-20">
            <div className="container mx-auto">
              <div className="flex flex-col items-center justify-center overflow-hidden text-center">
                <h1 className="text-[#8b6c26] font-bold text-lg">
                  THE HALPERIN HOTEL
                </h1>
                <div className="text-[54px] font-normal pt-2 text-neutral-700 dark:text-neutral-400">
                  For Hollywood's <FlipWords words={words} /> lights
                </div>
                <p className="max-w-3xl text-[15px] pt-2">
                  She greets you like a movie star from the moment you pass the
                  iconic sign, step onto the famous red carpet and enter the
                  grand lobby. The ultimate beacon of shining glamour... where
                  else could you possibly call home in the city of angels?
                </p>
              </div>
            </div>
          </div>

          {/* back of carsd*/}
          <p className="absolute top-3/5 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-500 md:text-4xl dark:text-neutral-800 z-0">
            If it's your first stay with us, prepare to experience timeless
            elegance.
          </p>

          {/* draggable cards */}
          <div className="flex flex-wrap justify-center gap-6 pt-20 z-10">
            {draggableItems.map((item) => (
              <DraggableCardBody
                dragBoundaryRef={containerRef}
                key={item.title}
                className={`border-2 border-[#8b6c26] rounded-xl shadow-lg ${item.className}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="pointer-events-none relative z-10 h-80 w-80 object-cover"
                />
              </DraggableCardBody>
            ))}
          </div>
        </DraggableCardContainer>
      </section>
      {/* END OF SECTION 2 */}

      {/* SECTION 3 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto py-10">
          <div className="flex flex-row justify-center gap-x-35 overflow-hidden">
            <div className="text-[35px] items-start font-normal tracking-wide text-black ">
              Living like true Hollywood royalty
            </div>
            <p className="max-w-sm text-[14px] pt-5 tracking-wide text-justify">
              Guest rooms and suites in the main house embody LA's sparkling
              elegance, while the bungalows draw inspiration from the lush
              surrounding landscape for an effortless and modern Californian
              design.
            </p>
          </div>
        </div>
        <div className="mt-15">
          <CardSlider cards={sliderCards} />
        </div>
      </section>
      {/*END OF SECTION 3 */}

      {/* SECTION 4 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-row items-between justify-between mx-45 gap-25 overflow-hidden">
            <div className="flex flex-col justify-center gap-y-10 overflow-hidden max-w-4xl">
              <div className="text-[#8b6c26] text-sm">THE ORIGINAL ICON</div>
              <p className="text-3xl/10 indent-10 tracking-wide text-justify">
                This is the legendary LA hideaway, famous for playing host and
                friend to Hollywood royalty for over a century. From the deals
                made in the Polo Lounge to the romances lived out in the
                secluded bungalows, this has been Tinsel Town's playground since
                Beverly Hills was born.
              </p>
            </div>
            <div className="flex flex-col justify-center pt-8 space-y-3 font-thin text-xs">
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
                <p>EST. 1912</p>
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
                <p>MAGNET FOR HOLLYWOOD LOCALS</p>
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
                <p>LEGENDARY PINK PALACE</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*END OF SECTION 4 */}

      {/* SECTION 5 */}
      <section className="py-32 bg-white">
        <div className="container mx-auto">
          <ImageCarousel slides={diningSlides} />
        </div>
      </section>
      {/* END OF SECTION 5 */}

      {/* SECTION 6 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-row items-center justify-center gap-x-16 overflow-hidden">
            <div className="w-[180px] h-[180px] bg-gray-100 shadow-md">
              <div className="border-8 border-white/90  overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="/images/Amy-icon.png"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-y-16 max-w-4xl">
              <p className="text-2xl items-start font-normal tracking-wide text-justify text-black">
                “Behind every hallway we cleared and every threat we faced,
                there was a team that refused to give up. Halperin Hotel stands
                today because we gave it a second chance and we'll keep
                defending the legacy we built.”
              </p>
              <div className="flex flex-row items-center gap-10 font-thin text-xs">
                <h6>AMY VICTORS</h6>
                <h6>SLAYER (IMMUNE)</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END OF SECTION 6 */}

      {/* SECTION 7 */}
      <section className="py-2 0 bg-white">
        <div className="container mx-auto">
          <TabsModule tabs={tabsData} />
        </div>
      </section>
      {/* END OF SECTION 7 */}

      {/* SECTION 8 */}
      <section className="bg-white">
        <div className="container mx-auto pb-40">
          <div className="flex flex-row justify-center gap-x-35 overflow-hidden">
            <div className="text-[35px] items-start font-normal tracking-wide text-black ">
              Where legends belong
            </div>
            <p className="max-w-sm text-[14px] pt-5 tracking-wide text-justify">
              Extraordinary places where memorable stories continue to be
              written and where legends are made.
            </p>
          </div>
        </div>
      </section>
      {/*END OF SECTION 8 */}
    </div>
  );
}
