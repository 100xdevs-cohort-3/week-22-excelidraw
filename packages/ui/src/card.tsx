import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
  title?: string;
  children: ReactNode;
}

export function   Card({ className, title, children }: CardProps): JSX.Element {
  return (
    <div
      className={clsx(
        "block rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <h2 className="text-xl font-semibold text-primary mb-3">{title}</h2>
      <p className="text-base text-muted mt-2 ">{children}</p>
    </div>
  );
}
