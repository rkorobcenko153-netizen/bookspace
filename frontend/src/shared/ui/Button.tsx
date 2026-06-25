import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  "primary" | "secondary" | "danger" | "ghost";
  size?:     "sm" | "md" | "lg";
  isLoading?: boolean;
  children:  ReactNode;
}

export const Button = ({
  variant = "primary", size = "md", isLoading, disabled, children, className, ...rest
}: Props) => {
  const base  = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const vars  = {
    primary:   "bg-primary text-white hover:bg-primary-dark disabled:opacity-40",
    secondary: "bg-surface-card border border-white/10 text-white hover:bg-surface-hover",
    danger:    "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20",
    ghost:     "bg-transparent border border-white/10 text-white hover:bg-surface-hover",
  };
  return (
    <button
      className={cn(base, sizes[size], vars[variant], className)}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};
