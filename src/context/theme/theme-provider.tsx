"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Colors } from "./theme-colors";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: ThemeType;
  effectiveTheme: "light" | "dark";
  isDark: boolean;
  colors: typeof Colors.light;
  toggleTheme: (t: ThemeType) => void;
  resetTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

// FIX #1 → use unknown instead of any
function isTheme(value: unknown): value is ThemeType {
  return value === "light" || value === "dark" || value === "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light");

  // FIX #2 → cast stored to ThemeType safely
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (isTheme(stored)) {
      setTheme(stored as ThemeType);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // FIX #3 → explicitly type this as "light" | "dark"
    const system: "light" | "dark" =
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    setEffectiveTheme(theme === "system" ? system : theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);
  }, [effectiveTheme]);

  const toggleTheme = useCallback((t: ThemeType) => {
    setTheme(t);
    localStorage.setItem("theme", t);
  }, []);

  const resetTheme = useCallback(() => {
    setTheme("system");
    localStorage.setItem("theme", "system");
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        effectiveTheme,
        isDark: effectiveTheme === "dark",
        colors: Colors[effectiveTheme],
        toggleTheme,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
