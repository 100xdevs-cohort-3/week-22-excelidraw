import { type JSX } from "react";
import React from "react";

export function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
  autoComplete = "",
  placeholder,
}: {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  placeholder?:string;
}): JSX.Element {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className={`dark:border-white/30 border-[1px] border-black/30 rounded-md p-1 px-2 dark:bg-black dark:text-white bg-white/80 text-black w-full ${className}`}
    />
  );
}
