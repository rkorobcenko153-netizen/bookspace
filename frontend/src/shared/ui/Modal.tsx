import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen:   boolean;
  onClose:  () => void;
  title:    string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: Props) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center p-4"
         onClick={onClose}>
      <div className="bg-surface-card border border-white/10 rounded-3xl w-full max-w-lg max-h-[88vh] overflow-y-auto"
           onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 pb-0">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-hover border border-white/10 text-gray-400 hover:text-white transition-colors">×</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
};
