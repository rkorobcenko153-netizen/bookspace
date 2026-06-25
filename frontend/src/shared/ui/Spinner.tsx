import { cn } from "./cn";
const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" };

export const Spinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => (
  <span className={cn("inline-block rounded-full border-2 border-primary/20 border-t-primary animate-spin", sizes[size])} />
);
