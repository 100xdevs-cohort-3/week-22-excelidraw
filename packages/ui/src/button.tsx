"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "outline" | "secondary";
  size: "lg" | "sm";
  children: ReactNode;
  className?: string;
}

export const Button = ({
  size,
  variant,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 rounded-md",
        size === "lg" ? "px-4 py-2 text-lg" : "px-2 py-1 text-sm",
        variant === "primary" &&
          "bg-primary text-white rounded-md hover:bg-blue-500",

        variant === "outline" &&
          "border border-input bg-transparent text-primary hover:bg-slate-50 h-12 px-6  hover:bg-primary-foreground hover:text-primary" ,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
