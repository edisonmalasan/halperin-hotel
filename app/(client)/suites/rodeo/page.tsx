import React from "react";
import { suites } from "../../data/suites";
import BookCard from "../../components/BookCard";

export default function RodeoSuitePage() {
  const suite = suites.find((s) => s.href === "/suites/rodeo");
  if (!suite) return <div>Suite not found.</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <BookCard {...suite} />
    </div>
  );
}
