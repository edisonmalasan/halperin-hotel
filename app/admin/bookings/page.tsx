"use client";

import React, { useState } from "react";

const mockBookings = [
  {
    id: 1,
    guest: "John Doe",
    room: "101",
    dates: "2024-07-20 to 2024-07-22",
    status: "Booked",
  },
  {
    id: 2,
    guest: "Jane Smith",
    room: "102",
    dates: "2024-07-21 to 2024-07-23",
    status: "Checked-in",
  },
  {
    id: 3,
    guest: "Alice Lee",
    room: "201",
    dates: "2024-07-19 to 2024-07-21",
    status: "Checked-out",
  },
  {
    id: 4,
    guest: "Bob Brown",
    room: "202",
    dates: "2024-07-22 to 2024-07-24",
    status: "Booked",
  },
];

const statusColors: Record<string, string> = {
  Booked: "bg-blue-500",
  "Checked-in": "bg-green-500",
  "Checked-out": "bg-gray-500",
  Cancelled: "bg-red-500",
};

export default function AdminBookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter bookings by search and status
  const filteredBookings = mockBookings.filter(
    (b) =>
      (b.guest.toLowerCase().includes(search.toLowerCase()) ||
        b.room.includes(search) ||
        b.status.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter ? b.status === statusFilter : true)
  );

  return (
    <div className="min-h-screen bg-[#181828] text-white p-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          className="rounded-lg px-4 py-2 text-white w-full md:w-1/3"
          placeholder="Search by guest, room, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-lg px-4 py-2 text-white w-full md:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option className="text-black" value="">
            All Statuses
          </option>
          <option className="text-black" value="Booked">
            Booked
          </option>
          <option className="text-black" value="Checked-in">
            Checked-in
          </option>
          <option className="text-black" value="Checked-out">
            Checked-out
          </option>
          <option className="text-black" value="Cancelled">
            Cancelled
          </option>
        </select>
        <button className="bg-[#3ecfff] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#1fa7d7] transition">
          Bulk Check-in
        </button>
        <button className="bg-[#ffe082] text-black px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#ffe082]/80 transition">
          Bulk Check-out
        </button>
        <button className="bg-[#ffb085] text-black px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#ffb085]/80 transition">
          Bulk Cancel
        </button>
      </div>

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
      <div className="rounded-2xl bg-[#232334] p-6 shadow-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-[#3ecfff]/20">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Guest</th>
              <th className="py-3 px-4">Room</th>
              <th className="py-3 px-4">Dates</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b, idx) => (
              <tr
                key={b.id}
                className="border-b border-[#3ecfff]/10 hover:bg-[#232334]/60 transition"
              >
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{b.guest}</td>
                <td className="py-2 px-4">{b.room}</td>
                <td className="py-2 px-4">{b.dates}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[b.status] || "bg-gray-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  {b.status === "Booked" && (
                    <button className="bg-[#3ecfff] text-white px-3 py-1 rounded shadow hover:bg-[#1fa7d7] transition text-xs">
                      Check-in
                    </button>
                  )}
                  {b.status === "Checked-in" && (
                    <button className="bg-[#ffe082] text-black px-3 py-1 rounded shadow hover:bg-[#ffe082]/80 transition text-xs">
                      Check-out
                    </button>
                  )}
                  <button className="bg-[#4be6a9] text-white px-3 py-1 rounded shadow hover:bg-[#3ecfff] transition text-xs">
                    Edit
                  </button>
                  <button className="bg-[#ffb085] text-black px-3 py-1 rounded shadow hover:bg-[#ffb085]/80 transition text-xs">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-lg">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}
