import React from "react";
import { occasions } from "../../data/occasions";
import BookCard from "../../components/BookCard";

export default function MeetingsPage() {
  const occasion = occasions.find((o) => o.href === "/occasions/meetings");
  if (!occasion) return <div>Occasion not found.</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <BookCard {...occasion} features={[]} />
    </div>
  );
}
