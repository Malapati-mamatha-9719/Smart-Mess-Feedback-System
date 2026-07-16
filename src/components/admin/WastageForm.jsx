import { useState } from "react";

export default function WastageForm() {
  const [items, setItems] = useState([
    {
      dish: "Rice",
      cooked: 80,
      remaining: 12,
    },
    {
      dish: "Dal",
      cooked: 40,
      remaining: 3,
    },
    {
      dish: "Paneer Curry",
      cooked: 50,
      remaining: 5,
    },
  ]);

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...items];

    updated[index][field] =
      Number(value) || 0;

    setItems(updated);
  };

  const totalWastage = items.reduce(
    (sum, item) =>
      sum + item.remaining,
    0
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-2xl font-bold text-slate-900">
        Food Wastage Entry
      </h2>

      <p className="mt-2 text-slate-500">
        Record cooked and remaining food quantities.
      </p>

      <div className="mt-8 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200">

              <th className="py-3 text-left">
                Dish
              </th>

              <th className="py-3 text-left">
                Cooked (kg)
              </th>

              <th className="py-3 text-left">
                Remaining (kg)
              </th>

              <th className="py-3 text-left">
                Wastage (kg)
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => {

              const wastage =
                item.remaining;

              return (
                <tr
                  key={item.dish}
                  className="border-b border-slate-100"
                >

                  <td className="py-4">
                    {item.dish}
                  </td>

                  <td>

                    <input
                      type="number"
                      value={item.cooked}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "cooked",
                          e.target.value
                        )
                      }
                      className="w-24 rounded-lg border border-slate-300 p-2"
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      value={item.remaining}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "remaining",
                          e.target.value
                        )
                      }
                      className="w-24 rounded-lg border border-slate-300 p-2"
                    />

                  </td>

                  <td className="font-semibold text-red-500">
                    {wastage}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      <div className="mt-8 rounded-2xl bg-red-50 p-5 border border-red-200">

        <div className="flex items-center justify-between">

          <span className="font-medium">
            Total Wastage
          </span>

          <span className="text-2xl font-bold text-red-600">
            {totalWastage} kg
          </span>

        </div>

      </div>

      <button
        className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700"
      >
        Submit Wastage Data
      </button>

    </div>
  );
}