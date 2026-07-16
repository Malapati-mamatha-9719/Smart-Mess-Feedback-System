export default function SectionTitle({
  badge,
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`max-w-3xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
          {badge}
        </span>
      )}

      <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg text-slate-600 leading-8">
          {description}
        </p>
      )}
    </div>
  );
}