"use client";

import { useState } from "react";
import { ArrowLeftRight, Volume2, Copy, Check, Loader2 } from "lucide-react";
import { translateText, TranslateDirection } from "@/lib/api";
import { speak, isSpeechSynthesisSupported } from "@/lib/speech";

const MAX_LENGTH = 500;

export default function Translator() {
  const [direction, setDirection] = useState<TranslateDirection>("pt-en");
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const synthSupported = isSpeechSynthesisSupported();

  const sourceLabel = direction === "pt-en" ? "Português" : "Inglês";
  const targetLabel = direction === "pt-en" ? "Inglês" : "Português";
  const targetSpeechLang = direction === "pt-en" ? "en-US" : "pt-BR";

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setError(null);

    const result = await translateText(sourceText, direction);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }
    setTargetText(result.translatedText);
  };

  const handleSwap = () => {
    setDirection((d) => (d === "pt-en" ? "en-pt" : "pt-en"));
    setSourceText(targetText);
    setTargetText(sourceText);
    setError(null);
  };

  const handleCopy = async () => {
    if (!targetText) return;
    await navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlePlayTarget = () => {
    if (!synthSupported || !targetText) return;
    speak(targetText, { lang: targetSpeechLang });
  };

  return (
    <div className="rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-soft dark:shadow-softDark sm:p-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        {/* Origem */}
        <div>
          <span className="mb-1.5 inline-block rounded-full bg-sky-100 dark:bg-ink-700 px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-300">
            {sourceLabel}
          </span>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value.slice(0, MAX_LENGTH))}
            placeholder={direction === "pt-en" ? "Digite em português..." : "Type in English..."}
            rows={5}
            className="w-full resize-y rounded-xl2 border-2 border-sky-200 dark:border-ink-600 bg-sky-50 dark:bg-ink-700 p-3 text-base text-ink-800 dark:text-white outline-none transition-colors focus:border-sky-400"
          />
          <div className="mt-1 text-right text-xs text-ink-400">
            {sourceText.length}/{MAX_LENGTH}
          </div>
        </div>

        {/* Botão inverter */}
        <button
          onClick={handleSwap}
          aria-label="Inverter idiomas"
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 dark:border-ink-600 text-sky-600 dark:text-mint-400 transition-transform hover:scale-110 hover:bg-sky-50 dark:hover:bg-ink-700 sm:rotate-0"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        {/* Destino */}
        <div>
          <span className="mb-1.5 inline-block rounded-full bg-mint-100 dark:bg-ink-700 px-3 py-1 text-xs font-bold text-mint-700 dark:text-mint-300">
            {targetLabel}
          </span>
          <div className="relative">
            <textarea
              value={targetText}
              readOnly
              placeholder={direction === "pt-en" ? "Translation appears here..." : "A tradução aparece aqui..."}
              rows={5}
              className="w-full resize-y rounded-xl2 border-2 border-mint-200 dark:border-ink-600 bg-mint-50/50 dark:bg-ink-700 p-3 text-base text-ink-800 dark:text-white outline-none"
            />
            {targetText && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={handlePlayTarget}
                  disabled={!synthSupported}
                  aria-label="Ouvir tradução"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-ink-800 text-mint-600 dark:text-mint-400 shadow-soft hover:bg-mint-50 disabled:opacity-40"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCopy}
                  aria-label="Copiar tradução"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-ink-800 text-mint-600 dark:text-mint-400 shadow-soft hover:bg-mint-50"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || loading}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-mint-500 px-7 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Traduzindo..." : "Traduzir"}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm text-red-500">
          Não foi possível traduzir agora. Tente novamente em instantes.
        </p>
      )}
    </div>
  );
}
