import { useState } from "react";
import { reasonTags } from "../../mockData/feedback";

export default function FeedbackCard() {
  const [rating, setRating] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const handleSubmit = () => {
    console.log({
      rating,
      reason: selectedReason,
    });

    alert("Feedback submitted successfully!");
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
          Paneer Curry
        </h3>

        <div className="mt-4 flex gap-4">

          <button
            onClick={() => setRating("Satisfied")}
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

      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 w-full rounded-xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700 transition"
      >
        Submit Feedback
      </button>

    </div>
  );
}