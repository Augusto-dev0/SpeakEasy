"use client";

import { useState } from "react";
import { Volume2, CheckCircle2, XCircle, ArrowRight, PencilLine } from "lucide-react";
import { FillBlank } from "@/lib/types";
import { speak, isSpeechSynthesisSupported } from "@/lib/speech";

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/[.,!?]/g, "");
}

export default function FillBlankExercise({ exercises }: { exercises: FillBlank[] }) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<boolean | null>(null);
  const synthSupported = isSpeechSynthesisSupported();

  const current = exercises[index];
  const [before, after] = current.sentence.split("{blank}");
  const isLast = index === exercises.length - 1;

  const handleCheck = () => {
    if (!value.trim()) return;
    setChecked(normalize(value) === normalize(current.answer));
  };

  const handleNext = () => {
    setValue("");
    setChecked(null);
    setIndex((i) => (i + 1) % exercises.length);
  };

  const handlePlay = () => {
    if (!synthSupported) return;
    speak(current.sentence.replace("{blank}", current.answer));
  };

  return (
    <div className="rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-soft dark:shadow-softDark sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-mint-600 dark:text-mint-400">
          <PencilLine className="h-3.5 w-3.5" /> Complete a frase
        </span>
        <span className="text-xs font-medium text-ink-400">
          {index + 1} / {exercises.length}
        </span>
      </div>

      <p className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-2 text-lg font-semibold leading-relaxed text-ink-800 dark:text-white sm:text-xl">
        <span>{before}</span>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setChecked(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          disabled={checked === true}
          placeholder="..."
          aria-label="Complete a lacuna"
          className={`w-28 min-w-0 rounded-lg border-2 bg-sky-50 dark:bg-ink-700 px-2 py-1 text-center text-base font-semibold text-ink-800 dark:text-white outline-none transition-colors sm:w-32 ${
            checked === null
              ? "border-sky-200 dark:border-ink-600 focus:border-sky-400"
              : checked
              ? "border-mint-500"
              : "border-red-400"
          }`}
        />
        <span>{after}</span>
      </p>
      <p className="mb-4 text-sm text-ink-500 dark:text-ink-300">{current.pt}</p>

      {checked !== null && (
        <p
          className={`mb-4 flex items-center gap-1.5 text-sm font-semibold ${
            checked ? "text-mint-600 dark:text-mint-400" : "text-red-500"
          }`}
        >
          {checked ? (
            <>
              <CheckCircle2 className="h-4 w-4 shrink-0" /> Correto! Muito bem.
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 shrink-0" /> Quase! A resposta certa é "{current.answer}".
            </>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handlePlay}
          disabled={!synthSupported}
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-sky-600 disabled:opacity-40"
        >
          <Volume2 className="h-4 w-4" /> Ouvir frase completa
        </button>

        {checked === null ? (
          <button
            onClick={handleCheck}
            disabled={!value.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-mint-500 px-5 py-2 text-sm font-bold text-white shadow-soft hover:opacity-90 disabled:opacity-40"
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-ink-600 px-4 py-2 text-sm font-semibold text-ink-600 dark:text-ink-200 hover:bg-sky-50 dark:hover:bg-ink-700"
          >
            {isLast ? "Recomeçar" : "Próxima"} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
