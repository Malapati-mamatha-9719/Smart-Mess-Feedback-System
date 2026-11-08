import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function WastageForm({ onWastageSubmitted }) {
  const [menuItems, setMenuItems] = useState([]);
  const [weights, setWeights] = useState({}); // { menuItemId: weightInKg }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_BASE_URL}/menu/today`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          setError("Could not load today's menu.");
          return;
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError("Could not reach the server. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleChange = (menuItemId, value) => {
    setWeights({ ...weights, [menuItemId]: Number(value) || 0 });
  };

  const totalWastage = Object.values(weights).reduce((sum, w) => sum + w, 0);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const entries = Object.entries(weights).filter(([, w]) => w > 0);
    if (entries.length === 0) {
      setError("Enter a wastage amount for at least one item.");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      for (const [menuItemId, weightKg] of entries) {
        const response = await fetch(`${API_BASE_URL}/wastage/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            menu_item_id: Number(menuItemId),
            weight_kg: weightKg,
          }),
        });

        if (!response.ok) {
          setError("Some entries could not be saved. Please check and try again.");
          return;
        }
      }

      setSuccess("Wastage data submitted successfully!");
      setWeights({});
      onWastageSubmitted?.();
    } catch (err) {
      setError("Could not reach the server. Please make sure the backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-2xl font-bold text-slate-900">
        Food Wastage Entry
      </h2>

      <p className="mt-2 text-slate-500">
        Record how much of each dish was wasted today.
      </p>

      {loading && (
        <p className="mt-6 text-slate-500 text-sm">Loading today's menu...</p>
      )}

      {!loading && menuItems.length === 0 && (
        <p className="mt-6 text-slate-400 text-sm">
          No menu items for today yet — add dishes above first.
        </p>
      )}

      {!loading && menuItems.length > 0 && (
        <div className="mt-8 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200">

                <th className="py-3 text-left">Dish</th>
                <th className="py-3 text-left">Meal</th>
                <th className="py-3 text-left">Wastage (kg)</th>

              </tr>

            </thead>

            <tbody>

              {menuItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100"
                >
                  <td className="py-4">{item.item_name}</td>
                  <td className="capitalize text-slate-500">{item.meal_type}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={weights[item.id] ?? ""}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      placeholder="0"
                      className="w-24 rounded-lg border border-slate-300 p-2"
                    />
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

      <div className="mt-8 rounded-2xl bg-red-50 p-5 border border-red-200">

        <div className="flex items-center justify-between">

          <span className="font-medium">Total Wastage</span>

          <span className="text-2xl font-bold text-red-600">
            {totalWastage} kg
          </span>

        </div>

      </div>

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
        disabled={submitting || loading || menuItems.length === 0}
        className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Wastage Data"}
      </button>

    </div>
  );
}
