"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BedDouble, DollarSign, Users } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] p-6 md:p-10">
      <h1 className="text-3xl font-bold text-[#8b6c26] mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Bookings Today */}
        <Card className="border-[#8b6c26]">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <BedDouble className="w-8 h-8 text-[#8b6c26]" />
            <CardTitle className="text-lg font-semibold text-neutral-700">Bookings Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-neutral-800">23</div>
            <div className="text-xs text-neutral-500 mt-1">as of now</div>
          </CardContent>
        </Card>
        {/* Occupancy Rate */}
        <Card className="border-[#8b6c26]">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Users className="w-8 h-8 text-[#8b6c26]" />
            <CardTitle className="text-lg font-semibold text-neutral-700">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-neutral-800">78%</div>
            <div className="text-xs text-neutral-500 mt-1">of rooms occupied</div>
          </CardContent>
        </Card>
        {/* Revenue Summary */}
        <Card className="border-[#8b6c26]">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <DollarSign className="w-8 h-8 text-[#8b6c26]" />
            <CardTitle className="text-lg font-semibold text-neutral-700">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-neutral-800">$4,200</div>
            <div className="text-xs text-neutral-500 mt-1">today</div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <Button className="bg-[#8b6c26] hover:bg-[#a88d4a] text-white font-semibold flex items-center gap-2 px-6 py-3">
          <Plus className="w-5 h-5" />
          Create Reservation
        </Button>
        <Button variant="outline" className="border-[#8b6c26] text-[#8b6c26] hover:bg-[#8b6d2636] font-semibold flex items-center gap-2 px-6 py-3">
          <BedDouble className="w-5 h-5" />
          Assign Room
        </Button>
      </div>
      {/* Placeholder for charts, tables, etc. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#8b6c26] min-h-[250px] flex items-center justify-center">
          <span className="text-neutral-400">[Analytics/Charts Placeholder]</span>
        </Card>
        <Card className="border-[#8b6c26] min-h-[250px] flex items-center justify-center">
          <span className="text-neutral-400">[Upcoming Reservations Table Placeholder]</span>
        </Card>
      </div>
    </div>
  );
} 