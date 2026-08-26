import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 transition-all duration-300 shadow-sm",
        hoverEffect && "hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
