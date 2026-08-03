"use client";

import { useMemo, useState } from "react";
import { Layers } from "lucide-react";
import { flashcardsData } from "@/lib/flashcards-data";
import FlashcardItem from "@/components/FlashcardItem";

export default function FlashcardsPage() {
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(flashcardsData.map((c) => c.category)))],
    []
  );
  const [category, setCategory] = useState("Todos");

  const filtered =
    category === "Todos" ? flashcardsData : flashcardsData.filter((c) => c.category === category);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-sky-400 to-mint-400 text-white">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-800 dark:text-white">
            Flashcards
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Toque no cartão para ver a tradução e ouvir a pronúncia.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              category === c
                ? "bg-sky-500 text-white"
                : "border border-sky-200 dark:border-ink-600 text-ink-500 dark:text-ink-300 hover:bg-sky-50 dark:hover:bg-ink-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((card) => (
          <FlashcardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
