import { cn } from "./cn";

const VARIANTS = {
  CONFIRMED:  "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  PENDING:    "bg-amber-500/10  border-amber-500/30  text-amber-400",
  CANCELLED:  "bg-red-500/10   border-red-500/30   text-red-400",
  COMPLETED:  "bg-cyan-500/10  border-cyan-500/30  text-cyan-400",
};

const LABELS: Record<string, string> = {
  CONFIRMED: "Подтверждено", PENDING: "Ожидает",
  CANCELLED: "Отменено",     COMPLETED: "Завершено",
};

export const Badge = ({ status }: { status: string }) => (
  <span className={cn("text-xs font-bold px-2 py-1 rounded-full border font-mono uppercase",
    VARIANTS[status as keyof typeof VARIANTS] ?? "bg-gray-500/10 border-gray-500/30 text-gray-400"
  )}>
    {LABELS[status] ?? status}
  </span>
);
