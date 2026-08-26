import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "whatsapp" | "outline" | "ghost" | "glowing";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      icon,
      iconPosition = "right",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/15 hover:shadow-md hover:shadow-blue-600/25",
      secondary:
        "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm hover:border-slate-300",
      whatsapp:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/15 hover:shadow-md hover:shadow-emerald-600/25",
      outline:
        "border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50",
      ghost:
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800",
      glowing:
        "relative overflow-hidden bg-blue-600 text-white shadow-sm hover:scale-105 border border-blue-500 hover:border-blue-400 group",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const content = (
      <>
        {variant === "glowing" && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-blue-400/20 animate-pulse pointer-events-none"></div>
        )}
        {icon && iconPosition === "left" && <span className="shrink-0 relative z-10">{icon}</span>}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === "right" && <span className="shrink-0 relative z-10">{icon}</span>}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
