"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import StatCards from "./components/StatCards";
import DonutCharts from "./components/DonutCharts";
import AnalyticsChart from "./components/AnalyticsChart";
import RecentBookingsTable from "./components/RecentBookingsTable";
import DashboardCalendar from "./components/DashboardCalendar";
import { usdToPhp, formatPeso } from "@/lib/utils";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

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
  if (
    !stats ||
    !stats.monthlyRevenueArr ||
    !stats.monthlyBookingsArr ||
    !stats.monthLabels
  )
    return <div>Loading stats...</div>;

  return (
    <div className="h-screen w-full overflow-y-scroll bg-[#181828] text-white px-2 md:px-6 py-6 space-y-8">
      {/* Stat Cards Row */}
      <StatCards stats={stats} />

      {/* Analytics and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* donut charts left column */}
        <DonutCharts stats={stats} />
        {/* Revenue/Bookings Center Card */}
        <div className="rounded-2xl bg-[#232334] p-6 shadow-lg flex flex-col items-center w-full min-h-[300px]">
          <div className="text-xl font-semibold mb-2">
            Monthly Revenue & Bookings
          </div>
          <Line
            data={{
              labels: stats.monthLabels,
              datasets: [
                {
                  label: "Revenue (PHP)",
                  data: stats.monthlyRevenueArr.map((usd: number) =>
                    usdToPhp(usd)
                  ),
                  borderColor: "#3ecfff",
                  backgroundColor: "rgba(62,207,255,0.1)",
                  yAxisID: "y",
                },
                {
                  label: "Bookings",
                  data: stats.monthlyBookingsArr,
                  borderColor: "#ffe082",
                  backgroundColor: "rgba(255,224,130,0.1)",
                  yAxisID: "y1",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, labels: { color: "#fff" } },
                tooltip: { enabled: true },
              },
              scales: {
                y: {
                  type: "linear",
                  display: true,
                  position: "left",
                  ticks: {
                    color: "#3ecfff",
                    callback: (v: any) => formatPeso(v),
                  },
                  title: {
                    display: true,
                    text: "Revenue (PHP)",
                    color: "#3ecfff",
                  },
                },
                y1: {
                  type: "linear",
                  display: true,
                  position: "right",
                  grid: { drawOnChartArea: false },
                  ticks: { color: "#ffe082" },
                  title: { display: true, text: "Bookings", color: "#ffe082" },
                },
                x: {
                  ticks: { color: "#fff" },
                },
              },
            }}
            height={220}
          />
          <div className="flex flex-row gap-8 mt-6 w-full justify-center">
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold mb-1">
                Revenue (This Month)
              </div>
              <div className="text-2xl font-bold text-[#3ecfff]">
                {formatPeso(usdToPhp(stats.monthlyRevenue))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold mb-1">
                Bookings (This Month)
              </div>
              <div className="text-2xl font-bold text-[#ffe082]">
                {stats.monthlyBookingsArr[stats.monthlyBookingsArr.length - 1]}
              </div>
            </div>
          </div>
        </div>
        {/* calendar right column */}
        <div className="flex flex-col gap-4">
          <DashboardCalendar />
          {/* Donut Chart for Check In/Out */}
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg flex flex-col items-center w-full mt-8">
            <div className="flex gap-8 w-full justify-center mb-2">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20">
                  <Doughnut
                    data={{
                      labels: ["Check In", "Check Out"],
                      datasets: [
                        {
                          data: [
                            stats.analytics.checkIn.reduce(
                              (a: number, b: number) => a + b,
                              0
                            ),
                            stats.analytics.checkOut.reduce(
                              (a: number, b: number) => a + b,
                              0
                            ),
                          ],
                          backgroundColor: ["#3ecfff", "#ffe082"],
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      cutout: "75%",
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },
                    }}
                  />
                </div>
                <div className="text-2xl font-bold mt-2">
                  {(() => {
                    const total =
                      stats.analytics.checkIn.reduce(
                        (a: number, b: number) => a + b,
                        0
                      ) +
                      stats.analytics.checkOut.reduce(
                        (a: number, b: number) => a + b,
                        0
                      );
                    const percent =
                      total === 0
                        ? 0
                        : Math.round(
                            (stats.analytics.checkIn.reduce(
                              (a: number, b: number) => a + b,
                              0
                            ) /
                              total) *
                              100
                          );
                    return `${percent}%`;
                  })()}{" "}
                  <span className="text-base font-normal text-gray-400">
                    Check In
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20">
                  <Doughnut
                    data={{
                      labels: ["Check Out", "Check In"],
                      datasets: [
                        {
                          data: [
                            stats.analytics.checkOut.reduce(
                              (a: number, b: number) => a + b,
                              0
                            ),
                            stats.analytics.checkIn.reduce(
                              (a: number, b: number) => a + b,
                              0
                            ),
                          ],
                          backgroundColor: ["#ffb085", "#3ecfff"],
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      cutout: "75%",
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },
                    }}
                  />
                </div>
                <div className="text-2xl font-bold mt-2">
                  {(() => {
                    const total =
                      stats.analytics.checkIn.reduce(
                        (a: number, b: number) => a + b,
                        0
                      ) +
                      stats.analytics.checkOut.reduce(
                        (a: number, b: number) => a + b,
                        0
                      );
                    const percent =
                      total === 0
                        ? 0
                        : Math.round(
                            (stats.analytics.checkOut.reduce(
                              (a: number, b: number) => a + b,
                              0
                            ) /
                              total) *
                              100
                          );
                    return `${percent}%`;
                  })()}{" "}
                  <span className="text-base font-normal text-gray-400">
                    Check Out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Statistics and Recent Bookings Section */}
      <div className="rounded-2xl bg-[#232334] p-8 shadow-lg flex flex-col w-full mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-semibold">Booking Statistics</div>
            <div className="text-gray-400 text-sm">
              Check In / Check Out (last 12 days)
            </div>
          </div>
        </div>
        <AnalyticsChart analytics={stats.analytics} />
        <div className="mt-8">
          <RecentBookingsTable recentBookings={stats.recentBookings} />
        </div>
      </div>
    </div>
  );
}
