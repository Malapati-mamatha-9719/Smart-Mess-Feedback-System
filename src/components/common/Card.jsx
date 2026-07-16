import React from "react";

export default function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        bg-white
        rounded-2xl
        shadow-md
        border
        border-slate-200
        p-6
        transition-all
        duration-300
        ${
          hover
            ? "hover:-translate-y-1 hover:shadow-xl"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}