import { IconBookmark, IconLogin, IconBed, IconBuildingSkyscraper, IconTable, IconConfetti } from "@tabler/icons-react";

export default function StatCards({ stats }: { stats: any }) {
  const statCards = [
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
  ];
  return (
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
  );
} 