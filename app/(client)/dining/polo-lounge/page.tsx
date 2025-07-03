import React from "react";
import { dining } from "../../data/dining";
import BookCard from "../../components/BookCard";

export default function PoloLoungePage() {
  const item = dining.find((d) => d.href === "/dining/polo-lounge");
  if (!item) return <div>Dining option not found.</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <BookCard {...item} />
    </div>
  );
}
