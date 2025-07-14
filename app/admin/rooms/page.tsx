"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const statusColors: Record<string, string> = {
  Clean: "bg-green-100 text-green-700",
  Dirty: "bg-yellow-100 text-yellow-700",
  Occupied: "bg-blue-100 text-blue-700",
  Maintenance: "bg-red-100 text-red-700",
};

const mockRooms = [
  { number: "101", type: "Deluxe King", status: "Clean", capacity: 2, rate: 220 },
  { number: "102", type: "Deluxe Twin", status: "Occupied", capacity: 2, rate: 210 },
  { number: "201", type: "Suite", status: "Dirty", capacity: 4, rate: 350 },
  { number: "202", type: "Standard", status: "Maintenance", capacity: 2, rate: 180 },
];

const statuses = ["Clean", "Dirty", "Occupied", "Maintenance"];

export default function RoomsPage() {
  const [rooms, setRooms] = useState(mockRooms);

  // Mock drag-and-drop: click status badge to cycle status
  const handleStatusClick = (idx: number) => {
    setRooms((prev) => {
      const nextStatusIdx = (statuses.indexOf(prev[idx].status) + 1) % statuses.length;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], status: statuses[nextStatusIdx] };
      return updated;
    });
  };

  return (
    <div>
      <Card className="border-[#8b6c26] mb-6">
        <CardHeader>
          <CardTitle className="text-[#8b6c26]">Room Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-[#8b6c26] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Room #</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Capacity</th>
                  <th className="px-4 py-2 text-left">Rate</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-neutral-400">No rooms found.</td>
                  </tr>
                ) : (
                  rooms.map((room, idx) => (
                    <tr key={room.number} className="border-b last:border-b-0">
                      <td className="px-4 py-2 font-mono">{room.number}</td>
                      <td className="px-4 py-2">{room.type}</td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => handleStatusClick(idx)}
                          className="focus:outline-none"
                          title="Click to change status"
                        >
                          <span className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${statusColors[room.status]}`}>{room.status}</span>
                        </button>
                      </td>
                      <td className="px-4 py-2">{room.capacity}</td>
                      <td className="px-4 py-2">${room.rate}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#8b6c26] text-[#8b6c26]">Edit</Button>
                        <Button size="sm" className="bg-[#8b6c26] text-white">Setup</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-neutral-500 mt-2">Click a status to change it (mock drag-and-drop).</div>
        </CardContent>
      </Card>
    </div>
  );
} 