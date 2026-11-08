import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function AnalyticsStats() {
  const [satisfactionPct, setSatisfactionPct] = useState(null);
  const [totalWastageKg, setTotalWastageKg] = useState(null);
  const [participation, setParticipation] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const [satisfactionRes, wastageRes, participationRes] = await Promise.all([
          fetch(`${API_BASE_URL}/analytics/satisfaction`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/analytics/wastage`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/analytics/participation`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!satisfactionRes.ok || !wastageRes.ok || !participationRes.ok) {
          setError("Could not load analytics.");
          return;
        }

        const satisfactionData = await satisfactionRes.json();
        const wastageData = await wastageRes.json();
        const participationData = await participationRes.json();

        const totalFeedback = satisfactionData.reduce(
          (sum, item) => sum + item.total_feedback_count,
          0
        );
        const weightedRatingSum = satisfactionData.reduce(
          (sum, item) => sum + item.average_rating * item.total_feedback_count,
          0
        );
        const overallAvgRating = totalFeedback > 0 ? weightedRatingSum / totalFeedback : 0;

        setSatisfactionPct(Math.round((overallAvgRating / 5) * 100));
        setParticipation(participationData);
        setTotalWastageKg(
          wastageData.reduce((sum, item) => sum + item.total_weight_kg, 0)
        );
      } catch (err) {
        setError("Could not reach the server. Please make sure the backend is running.");
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Average Satisfaction",
      value: satisfactionPct === null ? "—" : `${satisfactionPct}%`,
    },
    {
      title: "Total Wastage",
      value: totalWastageKg === null ? "—" : `${totalWastageKg} kg`,
    },
  ];

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-6"
          >
            <p className="text-slate-500">
              {stat.title}
            </p>

            <h3 className="mt-3 text-4xl font-bold text-emerald-600">
              {stat.value}
            </h3>
          </div>
        ))}

        {/* Unique students per meal — not raw feedback rows, since one student
            rating multiple dishes in the same meal shouldn't count more than once */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">
            Feedback Responses
          </p>

          {participation.length === 0 ? (
            <h3 className="mt-3 text-2xl font-bold text-emerald-600">—</h3>
          ) : (
            <div className="mt-3 space-y-1">
              {participation.map((p) => (
                <div key={p.meal_type} className="flex justify-between text-sm">
                  <span className="capitalize text-slate-600">{p.meal_type}</span>
                  <span className="font-bold text-emerald-600">{p.unique_students}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
