"use client";

import React, { useEffect, useState } from "react";
import { BookingsTable, Booking } from "./components/BookingsTable";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/book")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#181828] text-white p-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-[#232334] p-6 flex flex-col items-center">
          <div className="text-2xl font-bold">2</div>
          <div className="text-gray-300">Check-ins Today</div>
        </div>
        <div className="rounded-xl bg-[#232334] p-6 flex flex-col items-center">
          <div className="text-2xl font-bold">1</div>
          <div className="text-gray-300">Check-outs Today</div>
        </div>
        <div className="rounded-xl bg-[#232334] p-6 flex flex-col items-center">
          <div className="text-2xl font-bold">3</div>
          <div className="text-gray-300">Upcoming</div>
        </div>
        <div className="rounded-xl bg-[#232334] p-6 flex flex-col items-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-300">Overdue</div>
        </div>
      </div>

      {/* Bookings Table */}
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-[#181828]">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-16 w-16 text-white mb-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <div className="text-3xl font-bold text-white">
              Loading bookings...
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 py-8 text-lg">{error}</div>
      ) : (
        <BookingsTable data={bookings} />
      )}
    </div>
  );
}
