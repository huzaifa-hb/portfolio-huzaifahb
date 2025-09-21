import React, { useEffect, useRef, useState } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ asChild = false, children, ...props }) {
  // Turn the child into a toggle target
  return React.cloneElement(children, { "data-dropdown-trigger": "true", ...props });
}

export function DropdownMenuContent({ align = "start", children }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current?.closest("[data-dropdown-root]") || rootRef.current?.parentElement;
    const trigger = root?.querySelector("[data-dropdown-trigger]");
    const onToggle = () => setOpen((s) => !s);
    trigger?.addEventListener("click", onToggle);
    return () => trigger?.removeEventListener("click", onToggle);
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const alignClass = align === "end" ? "right-0" : "left-0";

  return (
    <div ref={rootRef} data-dropdown-root className="relative inline-block">
      {open && (
        <div
          className={
            "absolute " +
            alignClass +
            " mt-2 min-w-[12rem] rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-1 z-50"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  );
}
