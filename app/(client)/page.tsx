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

export default function GuestHomePage() {
  const containerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay blocked:", error);
        setIsPlaying(false);
      });
    }
  }, []);

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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

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
        <div className="container mx-auto py-5">
          <div className="flex flex-col items-center justify-center overflow-hidden">
            <div>
              <h1 className=" text-center text-[#8b6c26] font-bold text-lg">
                THE HALPERIN HOTEL
              </h1>
              <h2>
                <p className="text-center text-[55px] text-black">
                  For Hollywood's brightest lights
                </p>
              </h2>
            </div>
            <div className="max-w-3xl text-[15px] text-center pt-2">
              She greets you like a movie star from the moment you pass the
              iconic sign, step onto the famous red carpet and enter the grand
              lobby. The ultimate beacon of shining glamour... where else could
              you possibly call home in the city of angels?
            </div>
          </div>
        </div>
        {/* <DraggableCardContainer
          ref={containerRef}
          className="relative my-10 flex min-h-screen w-full justify-center overflow-clip"
        >
          <div className="grid w-full max-w-5xl grid-cols-1 items-center justify-center gap-10 md:grid-cols-3">
            <Container>
              <DraggableCardBody dragBoundaryRef={containerRef}>
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=3634&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Some mountains"
                  className="pointer-events-none relative z-10 h-80 w-full object-cover"
                />
                <p className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                  How
                </p>
              </DraggableCardBody>
            </Container>
          </div>
        </DraggableCardContainer> */}
        <DraggableCardContainer
          ref={containerRef}
          className="relative flex min-h-screen w-full items-center justify-center overflow-clip select-none"
        >
          <p className="absolute mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
            If it’s your first stay with us, prepare to experience timeless
            elegance.
          </p>
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
        </DraggableCardContainer>
      </section>

      {/* Features Section */}
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
