"use client";

import { useEffect, useMemo, useState } from "react";
import { Mic, Volume2, RotateCcw, Users, ChevronRight, AlertTriangle, PartyPopper, ThumbsUp, Sprout } from "lucide-react";
import { lessons } from "@/lib/lessons";
import {
  speak,
  startRecognition,
  compareSpeech,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  RecognitionController,
} from "@/lib/speech";
import { registerPracticeSession } from "@/lib/storage";
import MotivationalMessage from "@/components/MotivationalMessage";

const allPhrases = lessons.flatMap((l) =>
  l.phrases.map((p) => ({ ...p, lessonTitle: l.title, theme: l.theme }))
);

// Roteiro simples de role-play: garçom <-> cliente
const rolePlayScript = [
  { speaker: "AI (Garçom)", en: "Hi! Welcome. Table for how many?", pt: "Oi! Bem-vindo(a). Mesa para quantos?" },
  { speaker: "Você (Cliente)", en: "Table for two, please.", pt: "Mesa para dois, por favor." },
  { speaker: "AI (Garçom)", en: "Sure! Here is the menu.", pt: "Claro! Aqui está o cardápio." },
  { speaker: "Você (Cliente)", en: "Thank you. I would like a coffee.", pt: "Obrigado(a). Eu gostaria de um café." },
  { speaker: "AI (Garçom)", en: "Great choice! Anything else?", pt: "Ótima escolha! Mais alguma coisa?" },
  { speaker: "Você (Cliente)", en: "No, that's all. Thank you!", pt: "Não, é só isso. Obrigado(a)!" },
];

type Mode = "free" | "roleplay";

export default function PracticePage() {
  const [mode, setMode] = useState<Mode>("free");
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<{ score: number; missedWords: string[] } | null>(null);
  const [controller, setController] = useState<RecognitionController | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [roleStep, setRoleStep] = useState(0);
  const [sessionsThisVisit, setSessionsThisVisit] = useState(0);

  const speechSupported = useMemo(
    () => (typeof window !== "undefined" ? isSpeechRecognitionSupported() : true),
    []
  );
  const synthSupported = useMemo(
    () => (typeof window !== "undefined" ? isSpeechSynthesisSupported() : true),
    []
  );

  const currentPhrase = allPhrases[index];
  const currentRoleLine = rolePlayScript[roleStep];
  const isUserTurn = mode === "roleplay" && currentRoleLine?.speaker.startsWith("Você");

  useEffect(() => {
    setTranscript("");
    setResult(null);
  }, [index, roleStep, mode]);

  const handleListenModel = () => {
    const text = mode === "roleplay" ? currentRoleLine?.en ?? "" : currentPhrase.en;
    speak(text);
  };

  const handleRecord = () => {
    setError(null);
    if (!speechSupported) {
      setError("not-supported");
      return;
    }
    if (recording) {
      controller?.stop();
      return;
    }
    setTranscript("");
    setResult(null);
    const ctl = startRecognition({
      onStart: () => setRecording(true),
      onEnd: () => setRecording(false),
      onError: (err) => {
        setRecording(false);
        setError(err);
      },
      onResult: ({ transcript: spoken }) => {
        setTranscript(spoken);
        const target = mode === "roleplay" ? currentRoleLine?.en ?? "" : currentPhrase.en;
        const cmp = compareSpeech(target, spoken);
        setResult(cmp);
        const updated = registerPracticeSession();
        setSessionsThisVisit((s) => s + 1);
        void updated;
      },
    });
    setController(ctl);
  };

  const handleNext = () => {
    if (mode === "free") {
      setIndex((i) => (i + 1) % allPhrases.length);
    } else {
      setRoleStep((s) => (s + 1) % rolePlayScript.length);
    }
  };

  const handleReset = () => {
    setTranscript("");
    setResult(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ink-800 dark:text-white">
          Praticar Fala
        </h1>
        <p className="mt-1 text-ink-500 dark:text-ink-300">
          Ouça, fale e receba um feedback simples da sua pronúncia.
        </p>
      </div>

      {/* Seletor de modo */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-full border border-sky-200 dark:border-ink-600 p-1">
          <button
            onClick={() => setMode("free")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "free" ? "bg-sky-500 text-white" : "text-ink-500 dark:text-ink-300"
            }`}
          >
            <Mic className="h-4 w-4" /> Prática Livre
          </button>
          <button
            onClick={() => setMode("roleplay")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "roleplay" ? "bg-sky-500 text-white" : "text-ink-500 dark:text-ink-300"
            }`}
          >
            <Users className="h-4 w-4" /> Modo Role-Play
          </button>
        </div>
      </div>

      {!speechSupported && (
        <div className="mb-6 flex items-start gap-2 rounded-xl2 border border-amber-300 bg-amber-50 dark:bg-ink-800 p-4 text-sm text-amber-800 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Seu navegador não suporta reconhecimento de voz. Recomendamos usar o Google Chrome no
            computador ou Android para praticar a fala.
          </p>
        </div>
      )}

      {/* Card principal */}
      <div className="rounded-xl2 border border-sky-200 dark:border-ink-700 bg-white dark:bg-ink-800 p-6 shadow-soft dark:shadow-softDark sm:p-8">
        {mode === "free" ? (
          <>
            <span className="text-xs font-bold uppercase tracking-wide text-mint-600 dark:text-mint-400">
              {currentPhrase.theme}
            </span>
            <p className="mt-2 font-display text-2xl font-bold text-ink-800 dark:text-white sm:text-3xl">
              {currentPhrase.en}
            </p>
            <p className="mt-1 text-ink-500 dark:text-ink-300">{currentPhrase.pt}</p>
          </>
        ) : (
          <>
            <span className="text-xs font-bold uppercase tracking-wide text-mint-600 dark:text-mint-400">
              {currentRoleLine.speaker} · Passo {roleStep + 1}/{rolePlayScript.length}
            </span>
            <p className="mt-2 font-display text-2xl font-bold text-ink-800 dark:text-white sm:text-3xl">
              {currentRoleLine.en}
            </p>
            <p className="mt-1 text-ink-500 dark:text-ink-300">{currentRoleLine.pt}</p>
            {!isUserTurn && (
              <p className="mt-3 text-xs text-sky-600 dark:text-sky-400">
                Essa é a fala do garçom (IA). Ouça o modelo e depois avance.
              </p>
            )}
          </>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleListenModel}
            disabled={!synthSupported}
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 font-semibold text-white shadow-soft hover:bg-sky-600 disabled:opacity-40"
          >
            <Volume2 className="h-4 w-4" /> Ouvir Modelo
          </button>

          <button
            onClick={handleRecord}
            disabled={!speechSupported || (mode === "roleplay" && !isUserTurn)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-white shadow-soft transition-colors disabled:opacity-40 ${
              recording ? "bg-red-500 animate-pulse" : "bg-mint-500 hover:bg-mint-600"
            }`}
          >
            <Mic className="h-4 w-4" /> {recording ? "Ouvindo..." : "Gravar Minha Voz"}
          </button>

          {(transcript || result) && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-ink-600 px-4 py-2.5 text-sm font-semibold text-ink-500 dark:text-ink-300 hover:bg-sky-50 dark:hover:bg-ink-700"
            >
              <RotateCcw className="h-4 w-4" /> Tentar de novo
            </button>
          )}
        </div>

        {error === "not-allowed" && (
          <p className="mt-4 text-sm text-red-500">
            Permita o acesso ao microfone nas configurações do navegador para gravar sua voz.
          </p>
        )}
        {error === "not-supported" && (
          <p className="mt-4 text-sm text-red-500">
            Reconhecimento de voz não disponível neste navegador.
          </p>
        )}

        {/* Feedback */}
        {transcript && result && (
          <div className="mt-6 rounded-xl2 bg-sky-50 dark:bg-ink-700 p-4">
            <p className="text-sm text-ink-500 dark:text-ink-300">Você disse:</p>
            <p className="font-semibold text-ink-800 dark:text-white">"{transcript}"</p>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-sky-100 dark:bg-ink-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.score >= 70
                      ? "bg-mint-500"
                      : result.score >= 40
                      ? "bg-amber-400"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <span className="text-sm font-bold text-ink-700 dark:text-white">{result.score}%</span>
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-ink-600 dark:text-ink-300">
              {result.score >= 80 ? (
                <>
                  <PartyPopper className="h-4 w-4 shrink-0 text-mint-500" />
                  Excelente! Sua pronúncia está muito próxima do modelo.
                </>
              ) : result.score >= 50 ? (
                <>
                  <ThumbsUp className="h-4 w-4 shrink-0 text-sky-500" />
                  Bom trabalho! Continue praticando essas palavras.
                </>
              ) : (
                <>
                  <Sprout className="h-4 w-4 shrink-0 text-amber-500" />
                  Sem problemas, tente ouvir o modelo de novo e repita devagar.
                </>
              )}
            </p>

            {result.missedWords.length > 0 && (
              <p className="mt-1 text-xs text-ink-400">
                Palavras para revisar: {result.missedWords.join(", ")}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <MotivationalMessage />
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 dark:border-ink-600 px-4 py-2.5 text-sm font-semibold text-ink-600 dark:text-ink-200 hover:bg-sky-50 dark:hover:bg-ink-800"
        >
          Próxima <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
