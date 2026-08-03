"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Mic } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

const navItems = [
  { href: "/", key: "nav_home" as const },
  { href: "/lessons", key: "nav_lessons" as const },
  { href: "/practice", key: "nav_practice" as const },
  { href: "/writing", key: "nav_writing" as const },
  { href: "/translator", key: "nav_translator" as const },
  { href: "/flashcards", key: "nav_flashcards" as const },
  { href: "/profile", key: "nav_profile" as const },
];

export default function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100/70 dark:border-ink-700/70 bg-white/80 dark:bg-ink-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-ink-800 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl2 bg-gradient-to-br from-sky-400 to-mint-400 text-white shadow-soft">
            <Mic className="h-5 w-5" />
          </span>
          Speak<span className="text-mint-500">Easy</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-sky-500 text-white shadow-soft"
                    : "text-ink-600 dark:text-ink-200 hover:bg-sky-50 dark:hover:bg-ink-800"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-ink-700 dark:text-ink-100 hover:bg-sky-50 dark:hover:bg-ink-800"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-900 lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    active
                      ? "bg-sky-500 text-white"
                      : "text-ink-600 dark:text-ink-200 hover:bg-sky-50 dark:hover:bg-ink-800"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-ink-400">Idioma da interface</span>
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
