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
    blue: "bg-blue-50/90 text-blue-700 border-blue-200/60 shadow-sm shadow-blue-500/5",
    cyan: "bg-cyan-50/90 text-cyan-700 border-cyan-200/60 shadow-sm shadow-cyan-500/5",
    slate: "bg-slate-50/90 text-slate-700 border-slate-200/60 shadow-sm shadow-slate-500/5",
    emerald: "bg-emerald-50/90 text-emerald-700 border-emerald-200/60 shadow-sm shadow-emerald-500/5",
    indigo: "bg-indigo-50/90 text-indigo-700 border-indigo-200/60 shadow-sm shadow-indigo-500/5",
    purple: "bg-purple-50/90 text-purple-700 border-purple-200/60 shadow-sm shadow-purple-500/5",
    outline: "bg-transparent text-slate-600 border-slate-300 shadow-sm",
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
