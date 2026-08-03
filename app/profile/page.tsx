"use client";

import { useEffect, useState } from "react";
import { Flame, Trophy, BookCheck, BarChart3, RotateCcw, UserRound } from "lucide-react";
import { getProgress, resetProgress } from "@/lib/storage";
import { lessons } from "@/lib/lessons";
import { UserProgress } from "@/lib/types";
import LessonCard from "@/components/LessonCard";

const statCards = (progress: UserProgress) => [
  { icon: Flame, label: "Sequência atual", value: `${progress.streak} dias`, color: "from-orange-400 to-amber-500" },
  { icon: Trophy, label: "XP total", value: progress.xp, color: "from-sky-400 to-sky-600" },
  { icon: BookCheck, label: "Lições concluídas", value: `${progress.completedLessons.length}/${lessons.length}`, color: "from-mint-400 to-mint-600" },
  { icon: BarChart3, label: "Sessões de prática", value: progress.totalPracticeSessions, color: "from-purple-400 to-purple-600" },
];

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleReset = () => {
    if (confirm("Isso vai apagar todo o seu progresso salvo neste navegador. Continuar?")) {
      resetProgress();
      setProgress(getProgress());
    }
  };

  if (!progress) return null;

  const completedLessons = lessons.filter((l) => progress.completedLessons.includes(l.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-mint-400 text-white shadow-soft">
          <UserRound className="h-8 w-8" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-800 dark:text-white">Meu Perfil</h1>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            {progress.streak > 0
              ? `Você está em uma sequência de ${progress.streak} dias. Continue assim!`
              : "Comece a praticar hoje para iniciar sua sequência!"}
          </p>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards(progress).map((s) => (
          <div
            key={s.label}
            className="rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 shadow-soft dark:shadow-softDark"
          >
            <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white`}>
              <s.icon className="h-4 w-4" />
            </div>
            <p className="font-display text-xl font-bold text-ink-800 dark:text-white">{s.value}</p>
            <p className="text-xs text-ink-500 dark:text-ink-300">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-bold text-ink-800 dark:text-white">
          Lições concluídas
        </h2>
        {completedLessons.length === 0 ? (
          <p className="rounded-xl2 border border-dashed border-sky-200 dark:border-ink-700 p-6 text-center text-sm text-ink-500 dark:text-ink-300">
            Você ainda não concluiu nenhuma lição. Que tal começar agora?
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {completedLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} completed />
            ))}
          </div>
        )}
      </section>

      <button
        onClick={handleReset}
        className="inline-flex items-center gap-2 rounded-full border border-red-200 dark:border-red-900 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
      >
        <RotateCcw className="h-4 w-4" /> Redefinir progresso
      </button>
    </div>
  );
}
