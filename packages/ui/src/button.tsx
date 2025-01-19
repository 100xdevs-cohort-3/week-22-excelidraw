import { type JSX } from "react";
import React from "react";
export function Button({
  onClick,
  children,
  className = "",
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}): JSX.Element {
  return (
    <button
      onClick={onClick}
      type={type}
      className={` inline-flex items-center  justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
