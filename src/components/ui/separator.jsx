import React from "react";

export function Separator({ className = "" }) {
  return <div className={"h-px w-full bg-slate-200 dark:bg-slate-800 " + className} />;
}
