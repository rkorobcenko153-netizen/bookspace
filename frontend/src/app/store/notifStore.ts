import { create } from "zustand";

interface Notification {
  id:        string;
  message:   string;
  type:      string;
  isRead:    boolean;
  createdAt: string;
}

interface NotifState {
  notifications: Notification[];
  unreadCount:   number;
  setNotifications: (data: Notification[]) => void;
  markAsRead:       (id: string) => void;
  markAllAsRead:    () => void;
}

export const useNotifStore = create<NotifState>()((set) => ({
  notifications: [],
  unreadCount:   0,
  setNotifications: (notifications) =>
    set({ notifications, unreadCount: notifications.filter((n) => !n.isRead).length }),
  markAsRead: (id) =>
    set((s) => {
      // .map() из лекции — трансформируем массив без мутации
      const notifications = s.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return { notifications, unreadCount: notifications.filter((n) => !n.isRead).length };
    }),
  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
}));
