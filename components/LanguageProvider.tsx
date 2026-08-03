"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "pt" | "en";

const dictionary = {
  pt: {
    nav_home: "Início",
    nav_lessons: "Lições",
    nav_practice: "Praticar Fala",
    nav_flashcards: "Flashcards",
    nav_profile: "Perfil",
    nav_writing: "Escrever",
    nav_translator: "Traduzir",
    hero_title: "Aprenda a falar inglês desde o primeiro dia",
    hero_subtitle:
      "Pratique conversas reais, ouça e grave sua própria voz, e ganhe confiança um pouquinho a cada dia.",
    hero_cta: "Começar a Praticar Agora",
    today_lesson: "Lição de Hoje",
    small_steps_title: "Pequenos passos, grandes conversas",
    view_all_lessons: "Ver todas as lições",
  },
  en: {
    nav_home: "Home",
    nav_lessons: "Lessons",
    nav_practice: "Speak Practice",
    nav_flashcards: "Flashcards",
    nav_profile: "Profile",
    nav_writing: "Writing",
    nav_translator: "Translate",
    hero_title: "Learn to speak English from day one",
    hero_subtitle:
      "Practice real conversations, listen and record your own voice, and build confidence a little every day.",
    hero_cta: "Start Practicing Now",
    today_lesson: "Today's Lesson",
    small_steps_title: "Small steps, big conversations",
    view_all_lessons: "View all lessons",
  },
} as const;

type DictKey = keyof typeof dictionary.pt;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const LANG_KEY = "speakeasy_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored) setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(LANG_KEY, l);
  };

  const t = (key: DictKey) => dictionary[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage deve ser usado dentro de LanguageProvider");
  return ctx;
}
