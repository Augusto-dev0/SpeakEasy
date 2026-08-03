"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-sky-200 dark:border-ink-600 p-0.5 text-xs font-semibold">
      <button
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "pt"
            ? "bg-sky-500 text-white"
            : "text-ink-500 dark:text-ink-300 hover:text-sky-600"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en"
            ? "bg-sky-500 text-white"
            : "text-ink-500 dark:text-ink-300 hover:text-sky-600"
        }`}
      >
        EN
      </button>
    </div>
  );
}
