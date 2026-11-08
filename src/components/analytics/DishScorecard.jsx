import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

function getStatus(satisfactionPct) {
  if (satisfactionPct >= 75) {
    return { label: "Performing Well", color: "bg-emerald-100 text-emerald-700" };
  }
  if (satisfactionPct >= 50) {
    return { label: "Needs Monitoring", color: "bg-amber-100 text-amber-700" };
  }
  return { label: "Needs Attention", color: "bg-red-100 text-red-700" };
}

export default function DishScorecard() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_BASE_URL}/analytics/satisfaction`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          setError("Could not load dish performance.");
          return;
        }

        const data = await response.json();
        setDishes(
          data.map((item) => ({
            name: item.item_name,
            satisfaction: Math.round((item.average_rating / 5) * 100),
            feedbackCount: item.total_feedback_count,
          }))
        );
      } catch (err) {
        setError("Could not reach the server. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-2xl font-bold">
        Dish Performance
      </h2>

      {loading && (
        <p className="mt-4 text-slate-500 text-sm">Loading...</p>
      )}

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && dishes.length === 0 && (
        <p className="mt-4 text-slate-400 text-sm">
          No feedback recorded for today's dishes yet.
        </p>
      )}

      <div className="mt-6 space-y-4">

        {dishes.map((dish) => {
          const status = getStatus(dish.satisfaction);

          return (
            <div
              key={dish.name}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-slate-900">
                  {dish.name}
                </h3>

                <span className="text-emerald-600 font-bold text-lg">
                  {dish.satisfaction}%
                </span>

              </div>

              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${dish.satisfaction}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between">

                <p className="text-sm text-slate-500">
                  {dish.feedbackCount} feedback response{dish.feedbackCount === 1 ? "" : "s"}
                </p>

                <span className={`text-xs font-medium px-3 py-1 rounded-full ${status.color}`}>
                  {status.label}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
