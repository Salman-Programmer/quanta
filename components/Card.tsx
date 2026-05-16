import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface-card p-6 transition-all duration-200 ${
        hover
          ? "hover:border-border-hover hover:bg-surface-elevated hover:shadow-lg hover:shadow-black/20"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}