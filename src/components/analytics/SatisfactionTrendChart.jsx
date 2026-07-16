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
import { satisfactionTrend } from "../../mockData/analytics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function SatisfactionTrendChart() {
  const data = {
    labels: satisfactionTrend.labels,
    datasets: [
      {
        label: "Satisfaction %",
        data: satisfactionTrend.data,
      },
    ],
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-bold">
        Weekly Satisfaction Trend
      </h2>

      <div className="mt-6">
        <Line data={data} />
      </div>
    </div>
  );
}