import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@shared/api/axiosInstance";

interface User {
  id:    string;
  email: string;
  name:  string;
  role:  "USER" | "OWNER" | "ADMIN";
}

interface AuthState {
  user:            User | null;
  accessToken:     string | null;
  isAuthenticated: boolean;
  login:  (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      accessToken:     null,
      isAuthenticated: false,
      login: (user, accessToken) => {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        set({ user, accessToken, isAuthenticated: true });
      },
      logout: () => {
        delete axiosInstance.defaults.headers.common["Authorization"];
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage" }
  )
);
