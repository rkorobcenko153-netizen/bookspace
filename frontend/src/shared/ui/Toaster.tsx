import { useState, useEffect } from "react";

export const Toaster = () => {
  const [toasts, setToasts] = useState<{ id: string; msg: string; type: string }[]>([]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-[100]">
      {toasts.map((t) => (
        <div key={t.id}
          className="px-5 py-3 rounded-xl bg-surface-card border border-white/10 text-sm font-medium shadow-2xl whitespace-nowrap">
          {t.msg}
        </div>
      ))}
    </div>
  );
};
