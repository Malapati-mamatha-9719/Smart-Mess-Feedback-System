export default function ActivityCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <h2 className="text-xl font-bold text-slate-900">
        Your Participation
      </h2>

      <div className="mt-6">

        <div className="text-5xl font-bold text-emerald-600">
          18 / 22
        </div>

        <p className="mt-2 text-slate-600">
          Meals reviewed this month
        </p>

      </div>

      <div className="mt-6">

        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">

          <div className="h-full w-[82%] bg-emerald-600"></div>

        </div>

        <p className="mt-2 text-sm text-slate-500">
          82% participation rate
        </p>

      </div>

    </div>
  );
}