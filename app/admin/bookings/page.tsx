"use client";

import React, { useEffect, useState } from "react";
import { BookingsTable, Booking } from "./components/BookingsTable";

export default function AdminBookingsPage() {
  const [stats, setStats] = useState({
    totalCheckIns: 0,
    totalCheckOuts: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    const res = await fetch("/api/admin/stats");
    const data = await res.json();
    setStats({
      totalCheckIns: data.totalCheckIns || 0,
      totalCheckOuts: data.totalCheckOuts || 0,
    });
  };

  useEffect(() => {
    fetchStats();
    async function fetchBookings() {
      setLoading(true);
      try {
        const res = await fetch("/api/book");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#181828] text-white p-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl bg-[#232334] p-6 flex flex-col items-center">
          <div className="text-2xl font-bold">{stats.totalCheckIns}</div>
          <div className="text-gray-300">Total Check-ins</div>
        </div>
        <div className="rounded-xl bg-[#232334] p-6 flex flex-col items-center">
          <div className="text-2xl font-bold">{stats.totalCheckOuts}</div>
          <div className="text-gray-300">Total Check-outs</div>
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
        <BookingsTable data={bookings} onAction={fetchStats} />
      )}
    </div>
  );
}
