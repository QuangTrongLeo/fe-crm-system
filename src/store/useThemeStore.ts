import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeColor =
  | "blue"
  | "indigo"
  | "purple"
  | "rose"
  | "emerald"
  | "amber";

interface ThemeStore {
  primaryColor: ThemeColor;
  isDarkMode: boolean;
  setPrimaryColor: (color: ThemeColor) => void;
  toggleDarkMode: () => void;
  initTheme: () => void;
}

const colorMap: Record<ThemeColor, string> = {
  blue: "221.2 83.2% 53.3%",
  indigo: "243.4 75.4% 58.6%",
  purple: "270.7 91% 64.7%",
  rose: "346.8 77.2% 49.8%",
  emerald: "142.1 70.6% 45.3%",
  amber: "37.7 92.1% 50.2%",
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      primaryColor: "blue",
      isDarkMode: false,
      setPrimaryColor: (color) => {
        set({ primaryColor: color });
        document.documentElement.style.setProperty(
          "--primary",
          colorMap[color],
        );
      },
      toggleDarkMode: () => {
        const newDarkMode = !get().isDarkMode;
        set({ isDarkMode: newDarkMode });
        if (newDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
      initTheme: () => {
        const { primaryColor, isDarkMode } = get();
        document.documentElement.style.setProperty(
          "--primary",
          colorMap[primaryColor],
        );
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);
