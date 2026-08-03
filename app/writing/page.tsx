import { PenLine } from "lucide-react";
import WritingChecker from "@/components/WritingChecker";

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-sky-400 to-mint-400 text-white">
          <PenLine className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-800 dark:text-white">
            Verificar Escrita
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Escreva em inglês e veja na hora se está correto, com sugestões de correção.
          </p>
        </div>
      </div>

      <WritingChecker />
    </div>
  );
}
