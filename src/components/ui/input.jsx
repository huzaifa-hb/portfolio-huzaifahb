import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ring-slate-300 border " +
        className
      }
      {...props}
    />
  );
}
