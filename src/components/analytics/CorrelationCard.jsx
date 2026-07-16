export default function CorrelationCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-bold">
        Correlation Analysis
      </h2>

      <p className="mt-4 text-slate-600">
        Higher student satisfaction is associated with lower food wastage.
      </p>

      <div className="mt-8">
        <div className="text-5xl font-bold text-emerald-600">
          -0.78
        </div>

        <p className="mt-2 text-slate-500">
          Strong Negative Correlation
        </p>
      </div>
    </div>
  );
}