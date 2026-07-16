import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { wastageTrend } from "../../mockData/analytics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function WastageTrendChart() {
  const data = {
    labels: wastageTrend.labels,
    datasets: [
      {
        label: "Wastage %",
        data: wastageTrend.data,
      },
    ],
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-bold">
        Weekly Wastage Trend
      </h2>

      <div className="mt-6">
        <Line data={data} />
      </div>
    </div>
  );
}