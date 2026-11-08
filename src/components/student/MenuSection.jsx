export default function MenuSection({
  title,
  dishes,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6">

      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <div className="mt-4 flex flex-wrap gap-3">
        {dishes.length === 0 && (
          <p className="text-slate-400 text-sm">
            No items added yet.
          </p>
        )}

        {dishes.map((dish) => (
          <span
            key={dish.id}
            className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-medium"
          >
            {dish.item_name}
          </span>
        ))}
      </div>

    </div>
  );
}
