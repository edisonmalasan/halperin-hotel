"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import StatCards from "./components/StatCards";
import DonutCharts from "./components/DonutCharts";
import AnalyticsChart from "./components/AnalyticsChart";
import RecentBookingsTable from "./components/RecentBookingsTable";
import DashboardCalendar from "./components/DashboardCalendar";

export default function AdminDashboardPage() {
  const { user, isLoading } = useKindeBrowserClient();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="h-screen w-full overflow-y-scroll bg-[#181828] text-white px-2 md:px-6 py-6 space-y-8">
      {/* Stat Cards Row */}
      <StatCards stats={stats} />

      {/* Analytics and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* donut charts left column */}
        <DonutCharts stats={stats} />
        {/* analytical and recent bookings */}
        <div className="rounded-2xl bg-[#232334] p-6 shadow-lg flex flex-col self-start w-full min-h-[300px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xl font-semibold">Booking Statistic</div>
              <div className="text-gray-400 text-sm">
                Check In / Check Out (last 12 days)
              </div>
            </div>
          </div>
          <AnalyticsChart analytics={stats.analytics} />
          <RecentBookingsTable recentBookings={stats.recentBookings} />
        </div>
        {/* calendar*/}
        <div className="flex flex-col gap-4">
          <DashboardCalendar />
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg flex flex-col items-center mt-4">
            <div className="text-lg font-semibold mb-1">Total Revenue (This Month)</div>
            <div className="text-3xl font-bold text-[#3ecfff]">
              {require('@/lib/utils').formatPeso(stats.monthlyRevenue)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
