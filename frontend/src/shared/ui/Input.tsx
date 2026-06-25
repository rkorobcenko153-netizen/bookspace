import { type InputHTMLAttributes } from "react";
import { cn } from "./cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...rest }: Props) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>}
    <input
      className={cn(
        "bg-surface-hover border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none",
        "focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all",
        error && "border-red-500/50",
        className
      )}
      {...rest}
    />
    {error && <span className="text-xs text-red-400">{error}</span>}
  </div>
);
