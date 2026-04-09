import type { UserResponseSchema } from "@/schema/user.schema";
import { create } from "zustand";
import { removeCookie } from "@/lib/cookies";

interface AuthStore {
  user: UserResponseSchema | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: UserResponseSchema) => void;
  logout: () => void;
  setUser: (user: UserResponseSchema) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,

  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null });
  },
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
}));

