import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function ActivityCard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_BASE_URL}/attendance/mine/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          setError("Could not load attendance stats.");
          return;
        }
        setStats(await response.json());
      } catch (err) {
        setError("Could not reach the server. Please make sure the backend is running.");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-xl font-bold text-slate-900">
        Your Attendance
      </h2>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {stats && (
        <>
          <div className="mt-6">

            <div className="text-5xl font-bold text-emerald-600">
              {stats.meals_attended} / {stats.total_meals_available}
            </div>

            <p className="mt-2 text-slate-600">
              Meals attended this month
            </p>

          </div>

          <div className="mt-6">

            <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-emerald-600"
                style={{ width: `${stats.attendance_rate_pct}%` }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {stats.attendance_rate_pct}% attendance rate
            </p>

          </div>
        </>
      )}

    </div>
  );
}
