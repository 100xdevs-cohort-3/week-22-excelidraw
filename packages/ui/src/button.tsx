"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  variant: "primary" | "outline" | "secondary";
  className?: string;
  onClick?: () => void;
  size: "lg" | "sm";
  children: ReactNode;
}

export const Button = ({
  size,
  variant,
  className,
  onClick,
  children,
}: ButtonProps) => {
  const baseStyles =
    "focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 rounded-md";

  const sizeStyles = size === "lg" ? "px-4 py-2 text-lg" : "px-2 py-1 text-sm";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-blue-400 hover:text-white", 
    secondary: "bg-secondary text-white hover:bg-secondary/80 hover:text-white",
    outline:
      "border border-input bg-transparent text-primary hover:bg-primary/10 hover:text-primary", 
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles,
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
