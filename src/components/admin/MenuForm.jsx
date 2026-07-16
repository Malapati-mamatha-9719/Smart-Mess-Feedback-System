import { useState } from "react";

export default function MenuForm() {
  const [mealType, setMealType] = useState("Lunch");
  const [dish, setDish] = useState("");
  const [dishes, setDishes] = useState([
    "Rice",
    "Dal",
    "Paneer Curry",
  ]);

  const addDish = () => {
    if (!dish.trim()) return;

    setDishes([...dishes, dish]);
    setDish("");
  };

  const removeDish = (index) => {
    setDishes(
      dishes.filter((_, i) => i !== index)
    );
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
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
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
          className="rounded-xl bg-emerald-600 px-6 text-white font-medium hover:bg-emerald-700"
        >
          Add
        </button>

      </div>

      {/* Dish List */}

      <div className="mt-6 flex flex-wrap gap-3">

        {dishes.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2"
          >
            <span className="text-emerald-700">
              {item}
            </span>

            <button
              onClick={() =>
                removeDish(index)
              }
              className="text-red-500 font-bold"
            >
              ×
            </button>

          </div>

        ))}

      </div>

      <button
        className="mt-8 w-full rounded-xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700"
      >
        Save Menu
      </button>

    </div>
  );
}