const dishes = [
  {
    name: "Paneer Curry",
    satisfaction: 92,
    served: 18,
    status: "Performing Well",
  },
  {
    name: "Veg Biryani",
    satisfaction: 65,
    served: 10,
    status: "Monitor",
  },
  {
    name: "Sambar",
    satisfaction: 48,
    served: 14,
    status: "High Priority",
  },
];

export default function DishScorecard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-2xl font-bold">
        Dish Performance
      </h2>

      <div className="mt-6 space-y-4">

        {dishes.map((dish) => (

          <div
            key={dish.name}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex justify-between">

              <h3 className="font-semibold">
                {dish.name}
              </h3>

              <span className="text-emerald-600 font-medium">
                {dish.satisfaction}%
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-500">
              Served {dish.served} times
            </p>

            <p className="mt-2 text-sm font-medium">
              {dish.status}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}