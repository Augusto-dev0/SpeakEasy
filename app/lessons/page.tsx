"use client";

import { useEffect, useState } from "react";
import { lessons } from "@/lib/lessons";
import LessonCard from "@/components/LessonCard";
import { getProgress } from "@/lib/storage";
import { UserProgress } from "@/lib/types";
import { BookOpen } from "lucide-react";

export default function LessonsPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-sky-400 to-mint-400 text-white">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-800 dark:text-white">Lições</h1>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            {progress?.completedLessons.length ?? 0} de {lessons.length} lições concluídas
          </p>
        </div>
      </div>

      <div className="mb-8 h-2.5 w-full overflow-hidden rounded-full bg-sky-100 dark:bg-ink-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-mint-500 transition-all duration-500"
          style={{
            width: `${((progress?.completedLessons.length ?? 0) / lessons.length) * 100}%`,
          }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            completed={progress?.completedLessons.includes(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}
