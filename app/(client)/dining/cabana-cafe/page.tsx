import React from "react";
import { dining } from "../../data/dining";
import BookCard from "../../components/BookCard";

export default function CabanaCafePage() {
  const item = dining.find((d) => d.href === "/dining/cabana-cafe");
  if (!item) return <div>Dining option not found.</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <BookCard {...item} />
    </div>
  );
}
