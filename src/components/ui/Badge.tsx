import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "blue" | "cyan" | "slate" | "emerald" | "indigo" | "purple" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "blue",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    blue: "bg-blue-50/90 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60 shadow-sm shadow-blue-500/5",
    cyan: "bg-cyan-50/90 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200/60 dark:border-cyan-800/60 shadow-sm shadow-cyan-500/5",
    slate: "bg-slate-50/90 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 shadow-sm shadow-slate-500/5",
    emerald: "bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60 shadow-sm shadow-emerald-500/5",
    indigo: "bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/60 shadow-sm shadow-indigo-500/5",
    purple: "bg-purple-50/90 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60 shadow-sm shadow-purple-500/5",
    outline: "bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 shadow-sm",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1 font-bold rounded-full",
    md: "text-sm px-4 py-1.5 font-bold rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 border uppercase tracking-widest font-heading transition-all",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
