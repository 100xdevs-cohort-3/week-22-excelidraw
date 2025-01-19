import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
  title: string;
  children: ReactNode;
  href: string;
}

export function Card({
  className,
  title,
  children,
  href,
}: CardProps): JSX.Element {
  return (
    <a
      className={clsx(
        "block rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300",
        className
      )}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Link to ${title}`}
    >
      <h2 className="text-xl font-semibold text-primary mb-2">
        {title} 
      </h2>
      <p className="text-base text-muted">{children}</p>
    </a>
  );
}
