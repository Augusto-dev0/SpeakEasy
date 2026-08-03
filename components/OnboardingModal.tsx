"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, MessageCircle, Rocket, X } from "lucide-react";

const ONBOARDING_KEY = "speakeasy_onboarded_v1";

const steps = [
  {
    icon: MessageCircle,
    title: "Bem-vindo(a) ao SpeakEasy",
    text: "Aqui você pratica inglês falado de verdade, no seu ritmo, sem julgamento. Errar faz parte disso: é assim que se aprende a falar.",
  },
  {
    icon: Mic,
    title: "Vamos usar seu microfone",
    text: "Na tela de prática, o navegador vai pedir permissão de microfone. É só para transcrever sua fala e te dar um feedback. Nada é gravado ou enviado para fora do seu navegador.",
  },
  {
    icon: Rocket,
    title: "Pronto para começar",
    text: "Comece pela Lição do Dia ou vá direto para Praticar Fala. Um pouquinho todo dia já é o suficiente para evoluir.",
  },
];

export default function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = window.localStorage.getItem(ONBOARDING_KEY);
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    window.localStorage.setItem(ONBOARDING_KEY, "true");
    setOpen(false);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      close();
    }
  };

  const current = steps[step];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/50 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-sm rounded-xl2 bg-white dark:bg-ink-800 p-6 shadow-soft dark:shadow-softDark sm:max-w-md sm:p-8"
          >
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute right-4 top-4 rounded-full p-1.5 text-ink-400 hover:bg-sky-50 dark:hover:bg-ink-700 hover:text-ink-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-mint-400 shadow-soft">
              <current.icon className="h-7 w-7 text-white" />
            </div>

            <h2
              id="onboarding-title"
              className="text-center font-display text-xl font-bold text-ink-800 dark:text-white sm:text-2xl"
            >
              {current.title}
            </h2>
            <p className="mt-3 text-center text-sm text-ink-600 dark:text-ink-300 sm:text-base">
              {current.text}
            </p>

            <div className="mt-6 flex items-center justify-center gap-1.5">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? "w-6 bg-sky-500" : "w-1.5 bg-sky-200 dark:bg-ink-600"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={close}
                className="text-sm font-semibold text-ink-400 hover:text-ink-600 dark:hover:text-ink-200"
              >
                Pular
              </button>
              <button
                onClick={handleNext}
                className="rounded-full bg-gradient-to-r from-sky-500 to-mint-500 px-6 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
              >
                {step < steps.length - 1 ? "Continuar" : "Vamos lá!"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
