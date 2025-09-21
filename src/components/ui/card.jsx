import React from "react";

export function Card({ className = "", children }) {
  return <div className={"rounded-xl " + className}>{children}</div>;
}
export function CardHeader({ className = "", children }) {
  return (
    <div className={"p-4 border-b border-slate-200 dark:border-slate-800 " + className}>
      {children}
    </div>
  );
}
export function CardTitle({ className = "", children }) {
  return <h3 className={"text-lg font-semibold " + className}>{children}</h3>;
}
export function CardContent({ className = "", children }) {
  return <div className={"p-4 " + className}>{children}</div>;
}
