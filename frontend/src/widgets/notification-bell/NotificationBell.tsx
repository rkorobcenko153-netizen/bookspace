import { useNotifStore } from "@app/store/notifStore";

export const NotificationBell = () => {
  const { unreadCount, markAllAsRead } = useNotifStore();
  return (
    <button onClick={markAllAsRead}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-surface-hover border border-white/10 text-gray-400 hover:text-white transition-colors">
      🔔
      {unreadCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
          {unreadCount}
        </span>
      )}
    </button>
  );
};
