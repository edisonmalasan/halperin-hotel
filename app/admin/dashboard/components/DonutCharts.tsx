import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function DonutCharts({ stats }: { stats: any }) {
  const total = stats.totalRooms + stats.totalSuites;
  const occupied = stats.occupiedRooms + stats.occupiedSuites;
  const available = total - occupied;

  const donutData = {
    labels: ["Occupied", "Available"],
    datasets: [
      {
        data: [occupied, available],
        backgroundColor: ["#232334", "#fff"],
        borderWidth: 0,
      },
    ],
  };
  const diningDonutData = {
    labels: ["Available", "Booked"],
    datasets: [
      {
        data: [stats.availableDiningTables, stats.bookedDiningTables],
        backgroundColor: ["#00b894", "#232334"],
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
  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-2xl bg-[#232334] p-6 flex flex-col items-center shadow-lg">
        <div className="w-32 h-32 mb-2">
          <Doughnut data={donutData} options={donutOptions} />
        </div>
        <div className="text-3xl font-bold">
          {stats.availableRooms + stats.availableSuites}
        </div>
        <div className="text-gray-400">Total Available Room & Suites</div>
      </div>
      <div className="rounded-2xl bg-[#232334] p-6 flex flex-col items-center shadow-lg">
        <div className="w-32 h-32 mb-2">
          <Doughnut data={diningDonutData} options={donutOptions} />
        </div>
        <div className="text-3xl font-bold">{stats.availableDiningTables}</div>
        <div className="text-gray-400">Total Available Table For Dining</div>
      </div>
    </div>
  );
}
