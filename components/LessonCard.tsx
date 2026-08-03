"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Lesson } from "@/lib/types";
import LessonIcon from "./LessonIcon";

export default function LessonCard({
  lesson,
  completed = false,
}: {
  lesson: Lesson;
  completed?: boolean;
}) {
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="group flex items-center gap-4 rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 shadow-soft dark:shadow-softDark transition-transform hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-mint-500"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-sky-50 dark:bg-ink-700 text-sky-600 dark:text-mint-400">
        <LessonIcon lessonId={lesson.id} className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-mint-600 dark:text-mint-400">
            Dia {lesson.day}
          </span>
          {completed && (
            <span className="flex items-center gap-1 text-xs font-semibold text-mint-600 dark:text-mint-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Concluída
            </span>
          )}
        </div>
        <h3 className="truncate font-display text-lg font-bold text-ink-800 dark:text-white">
          {lesson.title}
        </h3>
        <p className="truncate text-sm text-ink-500 dark:text-ink-300">{lesson.titleEn}</p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-sky-500" />
    </Link>
  );
}
