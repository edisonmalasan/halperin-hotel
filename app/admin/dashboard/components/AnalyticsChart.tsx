import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function AnalyticsChart({ analytics }: { analytics: any }) {
  const lineData = {
    labels: analytics.labels,
    datasets: [
      {
        label: "Check In",
        data: analytics.checkIn,
        borderColor: "#3ecfff",
        backgroundColor: "rgba(62, 207, 255, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        label: "Check Out",
        data: analytics.checkOut,
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
      legend: { display: true },
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
  return (
    <div className="max-w-full mb-6">
      <Line data={lineData} options={lineOptions} />
    </div>
  );
} 