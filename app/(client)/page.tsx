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
import Link from "next/link";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function GuestHomePage() {
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
      <section className="relative h-[780px] text-white overflow-hidden">
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
              <h1 className=" text-center text-[#8b6c26] font-bold">
                THE HALPERIN HOTEL
              </h1>
              <h2>
                <p className="text-center text-[40px] text-black pt-1">
                  For Hollywood's brightest lights
                </p>
              </h2>
            </div>
            <div className="max-w-xl text-[12px] text-center pt-4">
              She greets you like a movie star from the moment you pass the
              iconic sign, step onto the famous red carpet and enter the grand
              lobby. The ultimate beacon of shining glamour... where else could
              you possibly call home in the city of angels?
            </div>
          </div>
        </div>
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
