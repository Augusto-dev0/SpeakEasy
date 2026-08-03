"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className="relative flex h-8 w-16 items-center rounded-full bg-sky-100 dark:bg-ink-700 px-1 transition-colors duration-300 shadow-inner"
    >
      <Sun className="absolute left-1.5 h-4 w-4 text-sky-500 opacity-80" />
      <Moon className="absolute right-1.5 h-4 w-4 text-mint-300 opacity-80" />
      <span
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-ink-900 shadow-soft transition-transform duration-300 ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-mint-400" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-sky-500" />
        )}
      </span>
    </button>
  );
}
