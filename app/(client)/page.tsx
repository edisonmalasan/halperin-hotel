"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Link from "next/link";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { draggableItems } from "./data/draggableItems";
import Container from "./components/DraggableContainer";
import { FlipWords } from "@/components/ui/flip-words";

export default function GuestHomePage() {
  /* SECTION 1 VARS */

  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay blocked:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  // Toggle play/pause functionality
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

  // Toggle mute/unmute functionality
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

  return (
    <div className="min-h-screen">
      {/* vid section */}
      <section className="relative h-[865px] text-white overflow-hidden">
        {/* vid layr */}
        <video
          ref={videoRef}
          src="/videos/halperin-hotel.mp4"
          autoPlay
          muted={false}
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

      {/* SECTION 2 SHOWCASE */}
      <section className="py-5 bg-gray-50">
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
            If it’s your first stay with us, prepare to experience timeless
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

      {/* SECTION 3 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hotel Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Free WiFi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  High-speed internet throughout the hotel
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Swimming Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Outdoor pool with city view</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Restaurant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fine dining experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
