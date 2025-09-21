import React from "react";

export function Button({ className = "", children, as = "button", ...props }) {
  const Comp = as;
  return (
    <Comp
      className={
        "inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition " +
        className
      }
      {...props}
    >
      {children}
    </Comp>
  );
}
