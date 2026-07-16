import React from "react";

const variants = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-300",

  secondary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  success:
    "bg-green-600 text-white hover:bg-green-700",
};

const sizes = {
  sm: "px-3 py-2 text-sm",

  md: "px-5 py-2.5 text-base",

  lg: "px-6 py-3 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        font-semibold
        transition-all
        duration-300
        shadow-md
        hover:shadow-lg
        focus:outline-none
        focus:ring-4
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}