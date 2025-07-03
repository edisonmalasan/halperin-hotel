import React from "react";
import { rooms } from "../../data/rooms";
import BookCard from "../../components/BookCard";

export default function BungalowStudioRoomPage() {
  const room = rooms.find((r) => r.href === "/rooms/bungalow-studio");
  if (!room) return <div>Room not found.</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <BookCard {...room} />
    </div>
  );
}
