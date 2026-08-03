"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Volume2, PenLine } from "lucide-react";
import { checkWriting } from "@/lib/api";
import { WritingIssue } from "@/lib/types";
import { speak, isSpeechSynthesisSupported } from "@/lib/speech";

const MAX_LENGTH = 2000;

export default function WritingChecker() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<WritingIssue[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const synthSupported = isSpeechSynthesisSupported();

  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setMatches(null);

    const result = await checkWriting(text);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }
    setMatches(result.matches);
  };

  const applySuggestion = (issue: WritingIssue, suggestion: string) => {
    const before = text.slice(0, issue.offset);
    const after = text.slice(issue.offset + issue.length);
    setText(before + suggestion + after);
    setMatches(null);
  };

  const handlePlay = () => {
    if (!synthSupported || !text.trim()) return;
    speak(text);
  };

  return (
    <div className="rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-5 shadow-soft dark:shadow-softDark sm:p-6">
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value.slice(0, MAX_LENGTH));
          setMatches(null);
          setError(null);
        }}
        placeholder="Escreva uma palavra, frase ou texto em inglês para verificar..."
        rows={6}
        className="w-full resize-y rounded-xl2 border-2 border-sky-200 dark:border-ink-600 bg-sky-50 dark:bg-ink-700 p-4 text-base text-ink-800 dark:text-white outline-none transition-colors focus:border-sky-400"
      />
      <div className="mt-1 text-right text-xs text-ink-400">
        {text.length}/{MAX_LENGTH}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={handleCheck}
          disabled={!text.trim() || loading}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-mint-500 px-6 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenLine className="h-4 w-4" />}
          {loading ? "Analisando..." : "Verificar Escrita"}
        </button>
        <button
          onClick={handlePlay}
          disabled={!synthSupported || !text.trim()}
          className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-ink-600 px-4 py-2.5 text-sm font-semibold text-ink-600 dark:text-ink-200 hover:bg-sky-50 dark:hover:bg-ink-700 disabled:opacity-40"
        >
          <Volume2 className="h-4 w-4" /> Ouvir
        </button>
      </div>

      {error && (
        <div className="mt-5 flex items-start gap-2 rounded-xl2 border border-amber-300 bg-amber-50 dark:bg-ink-700 p-4 text-sm text-amber-800 dark:text-amber-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {error === "text-too-long"
              ? "Seu texto passou do limite de caracteres. Tente com um trecho menor."
              : "Não foi possível verificar agora. O serviço pode estar sobrecarregado, tente novamente em instantes."}
          </p>
        </div>
      )}

      {matches && matches.length === 0 && (
        <div className="mt-5 flex items-center gap-2 rounded-xl2 border border-mint-200 dark:border-mint-700/40 bg-mint-50 dark:bg-ink-700 p-4 text-sm font-semibold text-mint-700 dark:text-mint-300">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Muito bem! Não encontramos nenhum erro na sua escrita.
        </div>
      )}

      {matches && matches.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="text-sm font-semibold text-ink-600 dark:text-ink-300">
            Encontramos {matches.length} {matches.length === 1 ? "ponto" : "pontos"} de atenção:
          </p>
          {matches.map((issue) => (
            <div
              key={issue.id}
              className="rounded-xl2 border border-amber-200 dark:border-amber-700/40 bg-amber-50/60 dark:bg-ink-700 p-4"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-full bg-amber-200 dark:bg-amber-800/50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
                  {issue.category}
                </span>
                {issue.badText && (
                  <span className="rounded bg-white dark:bg-ink-800 px-2 py-0.5 font-mono text-xs text-red-500 line-through">
                    {issue.badText}
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-700 dark:text-ink-200">{issue.message}</p>
              {issue.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {issue.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => applySuggestion(issue, s)}
                      className="rounded-full bg-mint-100 dark:bg-ink-800 px-3 py-1 text-xs font-semibold text-mint-700 dark:text-mint-300 hover:bg-mint-200 dark:hover:bg-ink-600"
                    >
                      Usar "{s}"
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
