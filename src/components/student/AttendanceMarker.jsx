import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function AttendanceMarker({ menuItems = [] }) {
  const [markedMeals, setMarkedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState("");

  const availableMealTypes = [...new Set(menuItems.map((item) => item.meal_type))];

  const fetchMarked = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/mine/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMarkedMeals(data.map((a) => a.meal_type));
      }
    } catch (err) {
      // silently ignore — attendance marking still works even if this pre-check fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarked();
  }, [menuItems]);

  const markPresent = async (mealType) => {
    setMarking(mealType);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/attendance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ meal_type: mealType }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setError(errData.detail || "Could not mark attendance.");
        return;
      }

      setMarkedMeals([...markedMeals, mealType]);
    } catch (err) {
      setError("Could not reach the server. Please make sure the backend is running.");
    } finally {
      setMarking("");
    }
  };

  if (loading || availableMealTypes.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">

      <h3 className="text-lg font-semibold text-slate-900">
        Mark Attendance
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Let the mess know you ate today.
      </p>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">

        {availableMealTypes.map((meal) => {
          const isMarked = markedMeals.includes(meal);

          return (
            <button
              key={meal}
              onClick={() => !isMarked && markPresent(meal)}
              disabled={isMarked || marking === meal}
              className={`rounded-full px-5 py-2 font-medium capitalize transition
              ${
                isMarked
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isMarked ? `✓ ${meal}` : marking === meal ? "Marking..." : meal}
            </button>
          );
        })}

      </div>

    </div>
  );
}
