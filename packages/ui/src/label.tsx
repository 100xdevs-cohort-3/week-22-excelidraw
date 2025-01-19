import { type JSX } from "react";
import React from "react";

export function Label({
  htmlFor,
  children,
  className = "",
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}
