export default function AnalyticsStats() {
  const stats = [
    {
      title: "Average Satisfaction",
      value: "84%",
    },
    {
      title: "Average Wastage",
      value: "11%",
    },
    {
      title: "Feedback Responses",
      value: "1,254",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-3xl border border-slate-200 bg-white p-6"
        >
          <p className="text-slate-500">
            {stat.title}
          </p>

          <h3 className="mt-3 text-4xl font-bold text-emerald-600">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}