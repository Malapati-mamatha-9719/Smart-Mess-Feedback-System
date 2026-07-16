export default function AdminStats() {
  const stats = [
    {
      title: "Student Satisfaction",
      value: "85%",
    },
    {
      title: "Food Wastage",
      value: "12%",
    },
    {
      title: "Feedback Received",
      value: "240",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-3xl border border-slate-200 bg-white p-6"
        >
          <h3 className="text-sm text-slate-500">
            {stat.title}
          </h3>

          <p className="mt-3 text-4xl font-bold text-emerald-600">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}