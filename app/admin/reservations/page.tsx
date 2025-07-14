"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useState } from "react";

const mockReservations = [
  { id: "R-1001", guest: "John Doe", room: "101", checkin: "2024-06-10", checkout: "2024-06-12", status: "Confirmed" },
  { id: "R-1002", guest: "Jane Smith", room: "202", checkin: "2024-06-11", checkout: "2024-06-13", status: "Checked In" },
  { id: "R-1003", guest: "Alice Brown", room: "303", checkin: "2024-06-12", checkout: "2024-06-14", status: "Cancelled" },
];

export default function ReservationsPage() {
  const [filters, setFilters] = useState({ date: "", guest: "", room: "" });

  const filtered = mockReservations.filter((r) =>
    (!filters.date || r.checkin === filters.date || r.checkout === filters.date) &&
    (!filters.guest || r.guest.toLowerCase().includes(filters.guest.toLowerCase())) &&
    (!filters.room || r.room.includes(filters.room))
  );

  return (
    <div>
      <Card className="border-[#8b6c26] mb-6">
        <CardHeader>
          <CardTitle className="text-[#8b6c26]">Reservation Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#8b6c26]" />
              <Input
                type="date"
                value={filters.date}
                onChange={e => setFilters(f => ({ ...f, date: e.target.value }))}
                className="max-w-[160px] border-[#8b6c26]"
              />
            </div>
            <Input
              placeholder="Guest Name"
              value={filters.guest}
              onChange={e => setFilters(f => ({ ...f, guest: e.target.value }))}
              className="max-w-[180px] border-[#8b6c26]"
            />
            <Input
              placeholder="Room #"
              value={filters.room}
              onChange={e => setFilters(f => ({ ...f, room: e.target.value }))}
              className="max-w-[120px] border-[#8b6c26]"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-[#8b6c26] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Reservation #</th>
                  <th className="px-4 py-2 text-left">Guest Name</th>
                  <th className="px-4 py-2 text-left">Room</th>
                  <th className="px-4 py-2 text-left">Check-in</th>
                  <th className="px-4 py-2 text-left">Check-out</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-neutral-400">No reservations found.</td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2 font-mono">{r.id}</td>
                      <td className="px-4 py-2">{r.guest}</td>
                      <td className="px-4 py-2">{r.room}</td>
                      <td className="px-4 py-2">{r.checkin}</td>
                      <td className="px-4 py-2">{r.checkout}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          r.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : r.status === "Checked In"
                            ? "bg-blue-100 text-blue-700"
                            : r.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#8b6c26] text-[#8b6c26]">Edit</Button>
                        <Button size="sm" variant="destructive">Cancel</Button>
                        <Button size="sm" className="bg-[#8b6c26] text-white">View</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 