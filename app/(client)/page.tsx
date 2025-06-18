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

      {/* Featured Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Featured Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Deluxe Room */}
            <Card>
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <CardTitle>Deluxe Room</CardTitle>
                <CardDescription>Spacious room with city view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">King Bed</Badge>
                  <Badge variant="secondary">City View</Badge>
                  <Badge variant="secondary">40m²</Badge>
                </div>
                <p className="text-2xl font-bold">
                  $200
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/login">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Executive Suite */}
            <Card>
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <CardTitle>Executive Suite</CardTitle>
                <CardDescription>Luxury suite with ocean view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">King Bed</Badge>
                  <Badge variant="secondary">Ocean View</Badge>
                  <Badge variant="secondary">60m²</Badge>
                </div>
                <p className="text-2xl font-bold">
                  $350
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/login">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Family Suite */}
            <Card>
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <CardTitle>Family Suite</CardTitle>
                <CardDescription>Perfect for family stays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">2 Queen Beds</Badge>
                  <Badge variant="secondary">City View</Badge>
                  <Badge variant="secondary">75m²</Badge>
                </div>
                <p className="text-2xl font-bold">
                  $400
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/login">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
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
