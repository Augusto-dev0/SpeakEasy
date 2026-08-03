"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { Flashcard } from "@/lib/types";
import { speak, isSpeechSynthesisSupported } from "@/lib/speech";

export default function FlashcardItem({ card }: { card: Flashcard }) {
  const [flipped, setFlipped] = useState(false);
  const supported = isSpeechSynthesisSupported();

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (supported) speak(card.front);
  };

  return (
    <div className="[perspective:1200px]" style={{ height: 190 }}>
      <motion.button
        onClick={() => setFlipped((f) => !f)}
        className="relative h-full w-full text-left [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45 }}
        aria-label={`Cartão: ${card.front}`}
      >
        {/* Frente */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-soft dark:shadow-softDark [backface-visibility:hidden]"
        >
          <span className="text-xs font-bold uppercase tracking-wide text-mint-600 dark:text-mint-400">
            {card.category}
          </span>
          <p className="font-display text-xl font-bold text-ink-800 dark:text-white">{card.front}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink-400">Toque para virar</span>
            <span
              onClick={handleAudio}
              role="button"
              aria-label="Ouvir palavra"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600"
            >
              <Volume2 className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Verso */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-xl2 border border-mint-200 dark:border-mint-700/40 bg-mint-50 dark:bg-ink-700 p-5 shadow-soft dark:shadow-softDark [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <span className="text-xs font-bold uppercase tracking-wide text-sky-600 dark:text-sky-400">
            Tradução
          </span>
          <p className="font-display text-xl font-bold text-ink-800 dark:text-white">{card.back}</p>
          <span className="text-xs text-ink-400">Toque para voltar</span>
        </div>
      </motion.button>
    </div>
  );
}
