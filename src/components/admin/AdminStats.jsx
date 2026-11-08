import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function AdminStats({ refreshKey }) {
  const [satisfactionPct, setSatisfactionPct] = useState(null);
  const [totalWastageKg, setTotalWastageKg] = useState(null);
  const [participation, setParticipation] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const [satisfactionRes, wastageRes, attendanceRes, participationRes] = await Promise.all([
          fetch(`${API_BASE_URL}/analytics/satisfaction`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/analytics/wastage`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/attendance/today`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/analytics/participation`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!satisfactionRes.ok || !wastageRes.ok || !attendanceRes.ok || !participationRes.ok) {
          setError("Could not load today's stats.");
          return;
        }

        const satisfactionData = await satisfactionRes.json();
        const wastageData = await wastageRes.json();
        const attendanceData = await attendanceRes.json();
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
        setTotalAttendance(
          attendanceData.reduce((sum, item) => sum + item.count, 0)
        );
      } catch (err) {
        setError("Could not reach the server. Please make sure the backend is running.");
      }
    };

    fetchStats();
  }, [refreshKey]);

  const stats = [
    {
      title: "Student Satisfaction",
      value: satisfactionPct === null ? "—" : `${satisfactionPct}%`,
    },
    {
      title: "Food Wastage Today",
      value: totalWastageKg === null ? "—" : `${totalWastageKg} kg`,
    },
    {
      title: "No. of Students Who Ate Meal",
      value: totalAttendance === null ? "—" : totalAttendance,
    },
  ];

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-6"
          >
            <h3 className="text-sm text-slate-500">
              {stat.title}
            </h3>

            <p className="mt-3 text-4xl font-bold text-emerald-600">
              {stat.value}
            </p>
          </div>
        ))}

        {/* Feedback Received — unique students per meal, not raw row count,
            since one student rating 2 dishes at lunch shouldn't count as 2 */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h3 className="text-sm text-slate-500">
            Feedback Received
          </h3>

          {participation.length === 0 ? (
            <p className="mt-3 text-2xl font-bold text-emerald-600">—</p>
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
