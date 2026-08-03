import { Languages } from "lucide-react";
import Translator from "@/components/Translator";

export default function TranslatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-sky-400 to-mint-400 text-white">
          <Languages className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-800 dark:text-white">
            Tradutor
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Traduza palavras, frases ou textos entre português e inglês.
          </p>
        </div>
      </div>

      <Translator />
    </div>
  );
}
