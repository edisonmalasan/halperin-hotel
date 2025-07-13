"use client";

import React from "react";
import TabsModule from "../../components/TabsModule";
import { tabsData } from "../data/juniorTabsData";
import ImageCarousel from "../../components/ImageCarousel";
import { diningSlides } from "../../data/diningCarousel";
import { suites } from "../../data/suites";

export default function JuniorHalperinSuitePage() {
  const suite = suites.find((s) => s.href === "/suites/junior-halperin");
  if (!suite) return <div>Suite not found.</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <BookCard {...suite} />
    </div>
  );
}
