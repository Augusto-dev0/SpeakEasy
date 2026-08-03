"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speak, isSpeechSynthesisSupported } from "@/lib/speech";

export default function AudioPhraseRow({
  en,
  pt,
  rate = 0.95,
}: {
  en: string;
  pt: string;
  rate?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const supported = isSpeechSynthesisSupported();

  const handlePlay = () => {
    if (!supported) return;
    setPlaying(true);
    speak(en, { rate, onEnd: () => setPlaying(false) });
  };

  return (
    <div className="flex items-center gap-3 rounded-xl2 border border-sky-200 dark:border-ink-700 bg-sky-50/50 dark:bg-ink-800 p-3">
      <button
        onClick={handlePlay}
        disabled={!supported}
        aria-label={`Ouvir: ${en}`}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
          playing
            ? "bg-mint-500 text-white animate-pulse"
            : "bg-sky-500 text-white hover:bg-sky-600"
        } disabled:opacity-40`}
      >
        <Volume2 className="h-5 w-5" />
      </button>
      <div className="min-w-0">
        <p className="font-semibold text-ink-800 dark:text-white">{en}</p>
        <p className="text-sm text-ink-500 dark:text-ink-300">{pt}</p>
      </div>
    </div>
  );
}
