"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import {
  IconBookmark,
  IconCalendarCheck,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";
import Image from "next/image";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const statCards = [
  {
    label: "New Booking",
    value: 872,
    icon: <IconBookmark size={36} className="text-white/80" />,
    bg: "bg-[#3ecfff]",
    text: "text-white",
  },
  {
    label: "Schedule Room",
    value: 285,
    icon: <IconCalendarCheck size={36} className="text-white/80" />,
    bg: "bg-[#4be6a9]",
    text: "text-white",
  },
  {
    label: "Check In",
    value: 53,
    icon: <IconLogin size={36} className="text-white/80" />,
    bg: "bg-[#ffe082]",
    text: "text-gray-900",
  },
  {
    label: "Check Out",
    value: 78,
    icon: <IconLogout size={36} className="text-white/80 rotate-180" />,
    bg: "bg-[#ffb085]",
    text: "text-gray-900",
  },
];

const donutData = {
  labels: ["Available", "Occupied"],
  datasets: [
    {
      data: [785, 215],
      backgroundColor: ["#3ecfff", "#232334"],
      borderWidth: 0,
    },
  ],
};

const donutOptions = {
  cutout: "75%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
};

const lineData = {
  labels: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ],
  datasets: [
    {
      label: "Check In",
      data: [400, 420, 600, 500, 700, 800, 900, 1000, 800, 700, 750, 800],
      borderColor: "#3ecfff",
      backgroundColor: "rgba(62, 207, 255, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      borderWidth: 3,
    },
    {
      label: "Check Out",
      data: [300, 320, 400, 350, 400, 500, 600, 700, 600, 500, 550, 600],
      borderColor: "#ffb085",
      backgroundColor: "rgba(255, 176, 133, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      borderWidth: 3,
    },
  ],
};

const lineOptions = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#bdbdbd" },
    },
    y: {
      grid: { color: "#232334" },
      ticks: { color: "#bdbdbd" },
    },
  },
};

const progressData = [
  { label: "Pending", value: 234, color: "bg-yellow-400" },
  { label: "Done", value: 65, color: "bg-cyan-400" },
  { label: "Finish", value: 763, color: "bg-purple-400" },
];

const reviews = [
  {
    name: "Ali Muzair",
    avatar: "/public/images/rooms/bungalow/bungalow-mm.png",
    date: "26/04/2020, 12:42 AM",
    rating: 5,
    text: "I have been there many times. Rooms, Food and Service are excellent. We did lots of Excursions and all the places are from the Hotel reachable. We visited Long Waterfall and was very helpful and excellent.",
  },
  {
    name: "Keanu Repes",
    avatar: "/public/images/rooms/bungalow/bungalow-patio-mm.png",
    date: "26/04/2020, 12:42 AM",
    rating: 3,
    text: "I have been there many times. Rooms, Food and Service are excellent. We did lots of Excursions and all the places are from the Hotel reachable. We visited Long Waterfall and was very helpful and excellent.",
  },
  {
    name: "Chintya Clara",
    avatar: "/public/images/rooms/bungalow/bungalow-studio-balcony-mm.png",
    date: "26/04/2020, 12:42 AM",
    rating: 4,
    text: "I have been there many times. Rooms, Food and Service are excellent. We did lots of Excursions and all the places are from the Hotel reachable. We visited Long Waterfall and was very helpful and excellent.",
  },
];

const calendarDays = [
  ["29", "30", "1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "11", "12"],
  ["13", "14", "15", "16", "17", "18", "19"],
  ["20", "21", "22", "23", "24", "25", "26"],
  ["27", "28", "29", "30", "31", "1", "2"],
];

const newestBookings = [
  {
    name: "Samantha Humble",
    date: "October 3th, 2020",
    room: "Room A-21",
    people: "3-5 Person",
    avatar: "/public/images/rooms/bungalow/bungalow-mm.png",
  },
  {
    name: "Louise Marquee",
    date: "October 3th, 2020",
    room: "Room A-21",
    people: "3-5 Person",
    avatar: "/public/images/rooms/bungalow/bungalow-patio-mm.png",
  },
  {
    name: "Richard Smile",
    date: "October 3th, 2020",
    room: "Room A-21",
    people: "3-5 Person",
    avatar: "/public/images/rooms/bungalow/bungalow-studio-balcony-mm.png",
  },
  {
    name: "Bella Yen",
    date: "October 3th, 2020",
    room: "Room A-21",
    people: "3-5 Person",
    avatar: "/public/images/rooms/bungalow/bungalow-tab-1.png",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-500"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div className="h-full bg-[#181828] text-white px-2 md:px-6 py-6 space-y-8">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl p-6 flex flex-col gap-2 items-start shadow-lg ${card.bg} ${card.text}`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-3xl font-bold">{card.value}</span>
              {card.icon}
            </div>
            <span className="text-lg font-medium opacity-80">{card.label}</span>
          </div>
        ))}
      </div>

      {/* Analytics and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Donut Chart Card */}
          <div className="rounded-2xl bg-[#232334] p-6 flex flex-col items-center shadow-lg">
            <div className="w-32 h-32 mb-2">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className="text-3xl font-bold">785</div>
            <div className="text-gray-400">Available Room Today</div>
          </div>
          {/* Booked Room Today */}
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg">
            <div className="font-semibold mb-4">Booked Room Today</div>
            <div className="space-y-3">
              {progressData.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                  <span className="w-24 text-sm">{item.label}</span>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full mx-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.value / 1062) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-10 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Donut Chart for Check In/Out */}
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg flex flex-col items-center">
            <div className="flex gap-8 w-full justify-center mb-2">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20">
                  <Doughnut
                    data={{
                      labels: ["Check In", "Check Out"],
                      datasets: [
                        {
                          data: [70, 30],
                          backgroundColor: ["#3ecfff", "#ffe082"],
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={donutOptions}
                  />
                </div>
                <div className="text-2xl font-bold mt-2">
                  70%{" "}
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
                          data: [30, 70],
                          backgroundColor: ["#ffb085", "#3ecfff"],
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={donutOptions}
                  />
                </div>
                <div className="text-2xl font-bold mt-2">
                  30%{" "}
                  <span className="text-base font-normal text-gray-400">
                    Check Out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Center Column: Reservation Statistic and Reviews */}
        <div className="rounded-2xl bg-transparent p-0 shadow-none flex flex-col gap-6 self-start w-full">
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg flex flex-col self-start w-full">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xl font-semibold">
                  Reservation Statistic
                </div>
                <div className="text-gray-400 text-sm">
                  Lorem ipsum dolor sit amet
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-lg font-bold">
                  549{" "}
                  <span className="text-xs font-normal text-gray-400">
                    Check In
                  </span>
                </div>
                <div className="text-lg font-bold">
                  327{" "}
                  <span className="text-xs font-normal text-gray-400">
                    Check Out
                  </span>
                </div>
              </div>
            </div>
            <div className="max-w-full">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
          {/* Latest Customer Review */}
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg">
            <div className="font-semibold mb-4">Latest Customer Review</div>
            <div className="flex flex-col gap-4">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start border-b border-[#232334] pb-4 last:border-b-0"
                >
                  <img
                    src={r.avatar.replace("/public", "")}
                    alt={r.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white">{r.name}</div>
                    <div className="text-xs text-gray-400 mb-1">
                      Posted on {r.date}
                    </div>
                    <div className="text-sm text-gray-200 mb-1">{r.text}</div>
                    <StarRating rating={r.rating} />
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <button className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      &#10003;
                    </button>
                    <button className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                      &#10005;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Column: Calendar & Donut Charts */}
        <div className="flex flex-col gap-6">
          {/* Calendar */}
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <button className="text-2xl">&#8592;</button>
              <div className="font-semibold text-lg">July 2025</div>
              <button className="text-2xl">&#8594;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-gray-400 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.flat().map((day, i) => (
                <div
                  key={i}
                  className={`py-1 rounded-lg ${
                    day === "15"
                      ? "bg-[#3ecfff] text-white font-bold"
                      : "text-gray-300"
                  } ${day === "15" ? "relative" : ""}`}
                >
                  {day}
                  {day === "15" && (
                    <span className="absolute right-1 top-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Newest Booking Card */}
          <div className="rounded-2xl bg-[#232334] p-6 shadow-lg">
            <div className="font-semibold mb-2">Newest Booking</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {newestBookings.map((b) => (
                <div
                  key={b.name}
                  className="flex items-center gap-3 bg-[#232334] border border-[#232334] rounded-lg p-2"
                >
                  <img
                    src={b.avatar.replace("/public", "")}
                    alt={b.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-white flex items-center gap-1">
                      {b.name}{" "}
                      <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block"></span>
                    </div>
                    <div className="text-xs text-gray-400">{b.date}</div>
                    <div className="text-xs text-gray-400">
                      {b.room} {b.people}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
