import React from "react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendColor = "text-emerald-600",
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-500 mt-2">
              {subtitle}
            </p>
          )}

        </div>

        <div className="text-emerald-600">
          {icon}
        </div>

      </div>

      {trend && (
        <div className={`mt-4 font-medium text-sm ${trendColor}`}>
          {trend}
        </div>
      )}
    </div>
  );
}