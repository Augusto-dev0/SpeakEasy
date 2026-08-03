"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speak, isSpeechSynthesisSupported } from "@/lib/speech";
import VocabularyIcon from "./VocabularyIcon";

export default function VocabularyCard({
  en,
  pt,
  icon,
}: {
  en: string;
  pt: string;
  icon: string;
}) {
  const [playing, setPlaying] = useState(false);
  const supported = isSpeechSynthesisSupported();

  const handlePlay = () => {
    if (!supported) return;
    setPlaying(true);
    speak(en, { onEnd: () => setPlaying(false) });
  };

  return (
    <button
      onClick={handlePlay}
      disabled={!supported}
      aria-label={`Ouvir: ${en}`}
      className="group flex flex-col items-center gap-2 rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 text-center shadow-soft dark:shadow-softDark transition-transform hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-60"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-mint-400 text-white transition-transform ${
          playing ? "scale-110 animate-pulse" : "group-hover:scale-105"
        }`}
      >
        <VocabularyIcon iconKey={icon} className="h-7 w-7" />
      </span>
      <span className="font-display text-base font-bold leading-snug text-ink-800 dark:text-white">
        {en}
      </span>
      <span className="text-xs text-ink-500 dark:text-ink-300">{pt}</span>
      <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-sky-500 dark:text-mint-400">
        <Volume2 className="h-3 w-3" /> Ouvir
      </span>
    </button>
  );
}
