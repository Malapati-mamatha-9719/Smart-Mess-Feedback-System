import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

const RECOMMENDATION_STYLE = {
  "Consider removing — consistently low satisfaction": "bg-red-100 text-red-700",
  "Monitor closely": "bg-amber-100 text-amber-700",
  "Keep on menu": "bg-emerald-100 text-emerald-700",
};

function downloadCSV(report) {
  const headers = [
    "Dish",
    "Times Served",
    "Avg Satisfaction %",
    "Feedback Count",
    "Total Wastage (kg)",
    "Recommendation",
  ];

  const rows = report.map((r) => [
    r.item_name,
    r.times_served,
    r.average_satisfaction_pct,
    r.total_feedback_count,
    r.total_wastage_kg,
    r.recommendation,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `monthly-dish-report-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function MonthlyReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateReport = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/analytics/monthly-report`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        setError("Could not generate the report.");
        return;
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError("Could not reach the server. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Monthly Dish Report
          </h2>
          <p className="mt-2 text-slate-500">
            Averages across this month — spot dishes worth removing, not just a single bad day.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={generateReport}
            disabled={loading}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>

          {report && report.length > 0 && (
            <button
              onClick={() => downloadCSV(report)}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-50"
            >
              Download CSV
            </button>
          )}

        </div>

      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {report && report.length === 0 && (
        <p className="mt-6 text-slate-400 text-sm">
          No feedback recorded yet this month.
        </p>
      )}

      {report && report.length > 0 && (
        <div className="mt-8 overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="py-3">Dish</th>
                <th className="py-3">Times Served</th>
                <th className="py-3">Satisfaction</th>
                <th className="py-3">Feedback</th>
                <th className="py-3">Wastage</th>
                <th className="py-3">Recommendation</th>
              </tr>
            </thead>

            <tbody>
              {report.map((r) => (
                <tr key={r.item_name} className="border-b border-slate-100">
                  <td className="py-4 font-medium">{r.item_name}</td>
                  <td className="py-4">{r.times_served}</td>
                  <td className="py-4">{r.average_satisfaction_pct}%</td>
                  <td className="py-4">{r.total_feedback_count}</td>
                  <td className="py-4">{r.total_wastage_kg} kg</td>
                  <td className="py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${RECOMMENDATION_STYLE[r.recommendation]}`}
                    >
                      {r.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}
