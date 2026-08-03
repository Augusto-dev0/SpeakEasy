import { Mic, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-ink-800 dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-mint-400 text-white">
            <Mic className="h-4 w-4" />
          </span>
          Speak<span className="text-mint-500">Easy</span>
        </div>

        <p className="max-w-md text-sm text-ink-500 dark:text-ink-300">
          Praticar todos os dias, mesmo pouquinho, é o segredo para falar inglês com confiança.
        </p>

        <div className="my-1 h-px w-full max-w-xs bg-sky-100 dark:bg-ink-700" />

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Desenvolvido por{" "}
            <span className="font-semibold text-ink-700 dark:text-white">Luiz Augusto</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/luiz.augusto7x/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Luiz Augusto"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 dark:border-ink-600 text-ink-500 dark:text-ink-300 transition-colors hover:border-sky-400 hover:text-sky-600 dark:hover:text-mint-400"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Augusto-dev0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Luiz Augusto"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 dark:border-ink-600 text-ink-500 dark:text-ink-300 transition-colors hover:border-sky-400 hover:text-sky-600 dark:hover:text-mint-400"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="text-xs text-ink-400 dark:text-ink-500">
          © {new Date().getFullYear()} SpeakEasy. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

