"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, MessageCircleHeart, TrendingUp, CalendarCheck2, ArrowRight, Flame } from "lucide-react";
import { lessons } from "@/lib/lessons";
import LessonCard from "@/components/LessonCard";
import MotivationalMessage from "@/components/MotivationalMessage";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/storage";
import { UserProgress } from "@/lib/types";

const benefits = [
  {
    icon: MessageCircleHeart,
    title: "Frases do dia a dia",
    desc: "Aprenda o que realmente se fala em conversas reais, sem enrolação gramatical.",
  },
  {
    icon: Mic,
    title: "Prática de fala de verdade",
    desc: "Grave sua voz, compare com o modelo e ganhe confiança para falar sem travar.",
  },
  {
    icon: TrendingUp,
    title: "Progresso visível",
    desc: "Acompanhe sua streak e evolução: pequenas vitórias diárias que se acumulam.",
  },
];

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const todayLesson = lessons[0];

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-[rgb(var(--bg))] dark:from-ink-900 dark:to-ink-900">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {progress && progress.streak > 0 && (
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-mint-100 dark:bg-ink-800 px-3 py-1 text-xs font-bold text-mint-700 dark:text-mint-300">
                <Flame className="h-3.5 w-3.5" />
                {progress.streak} {progress.streak === 1 ? "dia" : "dias"} de sequência
              </div>
            )}
            <h1 className="font-display text-4xl font-extrabold leading-tight text-ink-900 dark:text-white sm:text-5xl">
              Aprenda a falar inglês{" "}
              <span className="bg-gradient-to-r from-sky-500 to-mint-500 bg-clip-text text-transparent">
                desde o primeiro dia
              </span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-ink-600 dark:text-ink-300">
              Pratique conversas reais, ouça e grave sua própria voz, e ganhe confiança um
              pouquinho a cada dia, direto no navegador, sem instalar nada.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-mint-500 px-7 py-3.5 font-display text-base font-bold text-white shadow-soft transition-transform hover:scale-105"
              >
                <Mic className="h-5 w-5" />
                Começar a Praticar Agora
              </Link>
              <Link
                href="/lessons"
                className="inline-flex items-center gap-1.5 font-semibold text-sky-600 dark:text-mint-400 hover:underline"
              >
                Ver lições <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-200 to-mint-200 dark:from-ink-700 dark:to-ink-800 animate-floatSlow" />
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white dark:bg-ink-900 shadow-soft sm:h-52 sm:w-52">
              <span className="absolute inline-flex h-full w-full rounded-full bg-mint-300/60 dark:bg-mint-500/30 animate-pulseRing" />
              <Mic className="h-16 w-16 text-sky-500 sm:h-20 sm:w-20" />
            </div>
            <div className="absolute -bottom-2 flex items-end gap-1">
              {[10, 20, 14, 26, 12].map((h, i) => (
                <span
                  key={i}
                  style={{ height: h, animationDelay: `${i * 0.12}s` }}
                  className="w-1.5 rounded-full bg-mint-500 animate-wave"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lição do dia */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-ink-800 dark:text-white">
            Lição do Dia
          </h2>
          <CalendarCheck2 className="h-6 w-6 text-mint-500" />
        </div>
        <LessonCard
          lesson={todayLesson}
          completed={progress?.completedLessons.includes(todayLesson.id)}
        />
      </section>

      {/* Benefícios */}
      <section className="bg-white dark:bg-ink-800/40 py-14 border-y border-sky-100 dark:border-transparent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-ink-800 dark:text-white">
            Pequenos passos, grandes conversas
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl2 bg-sky-50/70 dark:bg-ink-800 p-6 shadow-soft dark:shadow-softDark border border-sky-100 dark:border-transparent"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-sky-400 to-mint-400 text-white">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-800 dark:text-white">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-300">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <MotivationalMessage className="mx-auto mb-6 w-fit" />
        <h2 className="font-display text-3xl font-bold text-ink-800 dark:text-white">
          Pronto para soltar a voz?
        </h2>
        <Link
          href="/practice"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-mint-500 px-8 py-4 font-display text-lg font-bold text-white shadow-soft transition-transform hover:scale-105"
        >
          <Mic className="h-5 w-5" />
          Começar a Praticar Agora
        </Link>
      </section>
    </div>
  );
}
