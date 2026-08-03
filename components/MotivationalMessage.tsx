"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const messages = [
  "Cada frase que você fala é um passo a mais para a fluência.",
  "Errar faz parte do aprendizado: é assim que o cérebro absorve um novo idioma.",
  "Você não precisa ser perfeito, só precisa praticar hoje.",
  "Fale sem medo: ninguém aprendeu inglês calado.",
  "Consistência vence perfeição. Um pouquinho todo dia já é vitória.",
];

export default function MotivationalMessage({ className = "" }: { className?: string }) {
  // Começa com uma frase fixa (igual no servidor e no cliente) para não gerar
  // hydration mismatch. Depois de montar no navegador, sorteia uma frase real.
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-mint-100/80 dark:bg-ink-800 px-4 py-2 text-sm font-medium text-mint-700 dark:text-mint-300 border border-mint-200 dark:border-transparent ${className}`}
    >
      <Sparkles className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
