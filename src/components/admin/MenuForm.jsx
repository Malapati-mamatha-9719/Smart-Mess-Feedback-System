import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

const MEAL_TYPES = ["Breakfast", "Lunch", "Snacks", "Dinner"];

export default function MenuForm() {
  const [mealType, setMealType] = useState("Lunch");
  const [dish, setDish] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchTodayMenu = async () => {
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
      setAllItems(data);
    } catch (err) {
      setError("Could not reach the server. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayMenu();
  }, []);

  const dishesForSelectedMeal = allItems.filter(
    (item) => item.meal_type === mealType.toLowerCase()
  );

  const addDish = async () => {
    if (!dish.trim()) return;

    setAdding(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/menu/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meal_type: mealType.toLowerCase(),
          item_name: dish.trim(),
        }),
      });

      if (!response.ok) {
        setError("Could not add dish. Please try again.");
        return;
      }

      const newItem = await response.json();
      setAllItems([...allItems, newItem]);
      setDish("");
    } catch (err) {
      setError("Could not reach the server. Please make sure the backend is running.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-2xl font-bold text-slate-900">
        Today's Menu
      </h2>

      <p className="mt-2 text-slate-500">
        Create and manage today's meal menu.
      </p>

      {/* Meal Type */}

      <div className="mt-6">
        <label className="block font-medium mb-2">
          Meal Type
        </label>

        <select
          value={mealType}
          onChange={(e) =>
            setMealType(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 p-3"
        >
          {MEAL_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Add Dish */}

      <div className="mt-6 flex gap-3">

        <input
          type="text"
          value={dish}
          onChange={(e) =>
            setDish(e.target.value)
          }
          placeholder="Enter dish name"
          className="flex-1 rounded-xl border border-slate-300 p-3"
        />

        <button
          onClick={addDish}
          disabled={adding}
          className="rounded-xl bg-emerald-600 px-6 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
        >
          {adding ? "Adding..." : "Add"}
        </button>

      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Dish List */}

      <div className="mt-6 flex flex-wrap gap-3">

        {loading && (
          <p className="text-slate-400 text-sm">Loading...</p>
        )}

        {!loading && dishesForSelectedMeal.length === 0 && (
          <p className="text-slate-400 text-sm">
            No {mealType.toLowerCase()} items added yet.
          </p>
        )}

        {dishesForSelectedMeal.map((item) => (

          <div
            key={item.id}
            className="flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2"
          >
            <span className="text-emerald-700">
              {item.item_name}
            </span>
          </div>

        ))}

      </div>

    </div>
  );
}
