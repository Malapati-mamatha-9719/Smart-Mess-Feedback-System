import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function FeedbackComments() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_BASE_URL}/feedback/today`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          setError("Could not load feedback.");
          return;
        }

        const data = await response.json();
        setFeedback(data);
      } catch (err) {
        setError("Could not reach the server. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const withComments = feedback.filter((f) => f.comment);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-2xl font-bold text-slate-900">
        Today's Feedback Comments
      </h2>

      <p className="mt-2 text-slate-500">
        What students said about today's meals.
      </p>

      {loading && (
        <p className="mt-6 text-slate-500 text-sm">Loading...</p>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && withComments.length === 0 && (
        <p className="mt-6 text-slate-400 text-sm">
          No comments left with feedback yet today.
        </p>
      )}

      <div className="mt-6 space-y-4">

        {withComments.map((f) => (

          <div
            key={f.id}
            className={`rounded-2xl p-4 border ${
              f.rating >= 4
                ? "bg-emerald-50 border-emerald-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center justify-between">

              <span className="font-semibold text-slate-900">
                {f.item_name}
              </span>

              <span className="text-sm capitalize text-slate-500">
                {f.meal_type}
              </span>

            </div>

            <p className="mt-2 text-slate-700">
              "{f.comment}"
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
