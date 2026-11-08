import { useState } from "react";
import { reasonTags } from "../../mockData/feedback";

const API_BASE_URL = "http://127.0.0.1:8000";

// The UI shows simple Satisfied/Unsatisfied buttons; backend needs a 1-5 rating.
const RATING_MAP = {
  Satisfied: 5,
  Unsatisfied: 2,
};

export default function FeedbackCard({ menuItems = [] }) {
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");
  const [rating, setRating] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!selectedMenuItemId) {
      setError("Please choose which dish you're reviewing.");
      return;
    }
    if (!rating) {
      setError("Please choose Satisfied or Unsatisfied.");
      return;
    }

    setSubmitting(true);

    const combinedReason = [selectedReason, customReason.trim()]
      .filter(Boolean)
      .join(" — ");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          menu_item_id: Number(selectedMenuItemId),
          rating: RATING_MAP[rating],
          comment: combinedReason || null,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setError(errData.detail || "Could not submit feedback. Please try again.");
        return;
      }

      setSuccess("Feedback submitted successfully!");
      setSelectedMenuItemId("");
      setRating("");
      setSelectedReason("");
      setCustomReason("");
    } catch (err) {
      setError("Could not reach the server. Please make sure the backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-2xl font-bold text-slate-900">
        Give Feedback
      </h2>

      <p className="mt-2 text-slate-500">
        Share your experience for today's meal.
      </p>

      <div className="mt-8">

        <h3 className="font-semibold text-slate-800">
          Select Dish
        </h3>

        <select
          value={selectedMenuItemId}
          onChange={(e) => setSelectedMenuItemId(e.target.value)}
          className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">-- Choose a dish --</option>
          {menuItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.item_name} ({item.meal_type})
            </option>
          ))}
        </select>

      </div>

      <div className="mt-8">

        <h3 className="font-semibold text-slate-800">
          How was it?
        </h3>

        <div className="mt-4 flex gap-4">

          <button
            onClick={() => {
              setRating("Satisfied");
              setSelectedReason("");
              setCustomReason("");
            }}
            className={`rounded-xl px-5 py-3 font-medium transition
            ${
              rating === "Satisfied"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            😊 Satisfied
          </button>

          <button
            onClick={() => setRating("Unsatisfied")}
            className={`rounded-xl px-5 py-3 font-medium transition
            ${
              rating === "Unsatisfied"
                ? "bg-red-500 text-white"
                : "bg-red-50 text-red-600"
            }`}
          >
            😞 Unsatisfied
          </button>

        </div>

      </div>

      {rating === "Unsatisfied" && (
        <div className="mt-8">

          <h3 className="font-semibold text-slate-800">
            Reason (Optional)
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">

            {reasonTags.map((tag) => (

              <button
                key={tag}
                onClick={() => setSelectedReason(tag)}
                className={`rounded-full px-4 py-2 transition
                ${
                  selectedReason === tag
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {tag}
              </button>

            ))}

          </div>

          <textarea
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Anything else you'd like to add? (optional)"
            rows={3}
            className="mt-4 w-full rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-8 w-full rounded-xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Feedback"}
      </button>

    </div>
  );
}
