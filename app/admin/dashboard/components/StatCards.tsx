import {
  IconBookmark,
  IconLogin,
  IconBed,
  IconBuildingSkyscraper,
  IconTable,
  IconConfetti,
} from "@tabler/icons-react";
import { formatPeso } from "@/lib/utils";

export default function StatCards({ stats }: { stats: any }) {
  // group stat by categ
  const groups = [
    {
      label: "Rooms",
      icon: <IconBed size={24} className="inline mr-2 text-white/80" />,
      layout: "row",
      cards: [
        {
          label: "Total Rooms",
          value: stats.totalRooms,
          icon: <IconBed size={36} className="text-white/80" />,
          bg: "bg-[#7c83fd]",
          text: "text-white",
        },
        {
          label: "Available Rooms",
          value: stats.availableRooms,
          icon: <IconBed size={36} className="text-white/80" />,
          bg: "bg-[#4be6a9]",
          text: "text-white",
        },
        {
          label: "Occupied Rooms",
          value: stats.occupiedRooms,
          icon: <IconBed size={36} className="text-white/80" />,
          bg: "bg-[#ffb085]",
          text: "text-white",
        },
      ],
    },
    {
      label: "Suites",
      icon: (
        <IconBuildingSkyscraper
          size={24}
          className="inline mr-2 text-white/80"
        />
      ),
      layout: "row",
      cards: [
        {
          label: "Total Suites",
          value: stats.totalSuites,
          icon: <IconBuildingSkyscraper size={36} className="text-white/80" />,
          bg: "bg-[#f7b801]",
          text: "text-white",
        },
        {
          label: "Available Suites",
          value: stats.availableSuites,
          icon: <IconBuildingSkyscraper size={36} className="text-white/80" />,
          bg: "bg-[#00b894]",
          text: "text-white",
        },
        {
          label: "Occupied Suites",
          value: stats.occupiedSuites,
          icon: <IconBuildingSkyscraper size={36} className="text-white/80" />,
          bg: "bg-[#fd79a8]",
          text: "text-white",
        },
      ],
    },
    {
      label: "Dining",
      icon: <IconTable size={24} className="inline mr-2 text-white/80" />,
      layout: "row",
      cards: [
        {
          label: "Dining Tables",
          value: stats.totalDiningTables,
          icon: <IconTable size={36} className="text-white/80" />,
          bg: "bg-[#00b894]",
          text: "text-white",
        },
        {
          label: "Available Dining Tables",
          value: stats.availableDiningTables,
          icon: <IconTable size={36} className="text-white/80" />,
          bg: "bg-[#3ecfff]",
          text: "text-white",
        },
        {
          label: "Booked Dining Tables",
          value: stats.bookedDiningTables,
          icon: <IconTable size={36} className="text-white/80" />,
          bg: "bg-[#ffb085]",
          text: "text-white",
        },
      ],
    },
    {
      label: "Events",
      icon: <IconConfetti size={24} className="inline mr-2 text-white/80" />,
      layout: "row",
      cards: [
        {
          label: "Total Events",
          value: stats.totalEvents,
          icon: <IconConfetti size={36} className="text-white/80" />,
          bg: "bg-[#fd79a8]",
          text: "text-white",
        },
        {
          label: "Available Events",
          value: stats.availableEvents,
          icon: <IconConfetti size={36} className="text-white/80" />,
          bg: "bg-[#4be6a9]",
          text: "text-white",
        },
        {
          label: "Booked Events",
          value: stats.bookedEvents,
          icon: <IconConfetti size={36} className="text-white/80" />,
          bg: "bg-[#ffb085]",
          text: "text-white",
        },
      ],
    },
    {
      label: "Overall Metrics",
      icon: <IconBookmark size={24} className="inline mr-2 text-white/80" />,
      layout: "col",
      cards: [
        {
          label: "Total Bookings",
          value: stats.totalBookings,
          icon: <IconBookmark size={36} className="text-white/80" />,
          bg: "bg-[#3ecfff]",
          text: "text-white",
        },
        {
          label: "Total Guests",
          value: stats.totalGuests,
          icon: <IconLogin size={36} className="text-white/80" />,
          bg: "bg-[#ffe082]",
          text: "text-white",
        },
      ],
    },
  ];

  // split group
  const topGroups = groups.slice(0, 4);
  const metricsGroup = groups[4];

  return (
    <div className="flex flex-col w-full">
      {/* top rows */}
      <div className="flex flex-row gap-8 w-full">
        {topGroups.map((group, idx) => (
          <div key={group.label} className="flex flex-col flex-1 min-w-[220px]">
            <div className="flex items-center justify-center mb-2">
              <span className="text-xl font-semibold text-white/90">
                {group.icon}
                {group.label}
              </span>
            </div>
            <div className="rounded-xl p-4 flex flex-col gap-6 h-full justify-evenly">
              {group.cards.map((card) => (
                <div
                  key={card.label}
                  className={`rounded-2xl p-6 flex flex-col items-center gap-2 shadow-lg ${card.bg} ${card.text} w-full`}
                >
                  <span className="text-3xl font-bold">{card.value}</span>
                  {card.icon}
                  <span className="text-lg font-medium opacity-80 text-center">
                    {card.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Divider */}
      <hr className="my-8 border-neutral-700" />
      {/* Bottom: Overall Metrics */}
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center mb-2">
          <span className="text-xl font-semibold text-white/90">
            {metricsGroup.icon}
            {metricsGroup.label}
          </span>
        </div>
        <div className="rounded-xl p-4 flex flex-row gap-6 w-full">
          {metricsGroup.cards.map((card) => (
            <div
              key={card.label}
              className={`rounded-2xl p-6 flex flex-col items-center gap-2 shadow-lg ${card.bg} ${card.text} w-full`}
            >
              <span className="text-3xl font-bold">{card.value}</span>
              <span className="text-lg font-medium opacity-80 text-center">
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
