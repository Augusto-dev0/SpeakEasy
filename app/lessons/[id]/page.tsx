"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Mic } from "lucide-react";
import { getLessonById } from "@/lib/lessons";
import AudioPhraseRow from "@/components/AudioPhraseRow";
import VocabularyCard from "@/components/VocabularyCard";
import LessonIcon from "@/components/LessonIcon";
import FillBlankExercise from "@/components/FillBlankExercise";
import { getProgress, markLessonCompleted } from "@/lib/storage";
import { UserProgress } from "@/lib/types";

export default function LessonDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(params.id);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-ink-500">Lição não encontrada.</p>
        <Link href="/lessons" className="mt-4 inline-block text-sky-600 font-semibold hover:underline">
          Voltar para lições
        </Link>
      </div>
    );
  }

  const completed = progress?.completedLessons.includes(lesson.id) ?? false;

  const handleComplete = () => {
    const updated = markLessonCompleted(lesson.id);
    setProgress(updated);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/lessons"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 dark:text-ink-300 hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar para lições
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-sky-50 dark:bg-ink-800 text-sky-600 dark:text-mint-400">
          <LessonIcon lessonId={lesson.id} className="h-7 w-7" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-mint-600 dark:text-mint-400">
            Dia {lesson.day} · {lesson.theme}
          </span>
          <h1 className="font-display text-3xl font-bold text-ink-800 dark:text-white">
            {lesson.title}
          </h1>
        </div>
      </div>

      {/* Vocabulário */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-bold text-ink-800 dark:text-white">
          Vocabulário
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {lesson.vocabulary.map((v) => (
            <VocabularyCard key={v.en} en={v.en} pt={v.pt} icon={v.icon} />
          ))}
        </div>
      </section>

      {/* Frases úteis */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-bold text-ink-800 dark:text-white">
          Frases Úteis
        </h2>
        <div className="grid gap-3">
          {lesson.phrases.map((p) => (
            <AudioPhraseRow key={p.id} en={p.en} pt={p.pt} rate={0.9} />
          ))}
        </div>
      </section>

      {/* Complete a frase */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-bold text-ink-800 dark:text-white">
          Complete a Frase
        </h2>
        <FillBlankExercise exercises={lesson.fillBlanks} />
      </section>

      {/* Exercício */}
      <section className="mb-10 rounded-xl2 border border-mint-200 dark:border-mint-700/40 bg-mint-50/60 dark:bg-ink-800 p-6">
        <h2 className="mb-2 font-display text-xl font-bold text-ink-800 dark:text-white">
          Exercício de Fala
        </h2>
        <p className="mb-4 text-ink-600 dark:text-ink-300">{lesson.exercisePrompt}</p>
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 font-semibold text-white shadow-soft hover:bg-sky-600"
        >
          <Mic className="h-4 w-4" /> Praticar essa lição
        </Link>
      </section>

      <button
        onClick={handleComplete}
        disabled={completed}
        className={`flex w-full items-center justify-center gap-2 rounded-xl2 py-3.5 font-display font-bold shadow-soft transition-colors ${
          completed
            ? "bg-mint-100 text-mint-700 dark:bg-ink-800 dark:text-mint-400 cursor-default"
            : "bg-gradient-to-r from-sky-500 to-mint-500 text-white hover:opacity-90"
        }`}
      >
        <CheckCircle2 className="h-5 w-5" />
        {completed ? "Lição concluída!" : "Marcar lição como concluída"}
      </button>
    </div>
  );
}
