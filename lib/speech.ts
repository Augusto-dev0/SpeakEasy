// Wrapper leve em volta da Web Speech API do navegador.
// Cobre SpeechSynthesis (texto -> voz) e SpeechRecognition (voz -> texto).

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as any;
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

/** Fala um texto em inglês (en-US) usando a voz sintética do navegador. */
export function speak(
  text: string,
  opts?: { lang?: string; rate?: number; onEnd?: () => void }
) {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = opts?.lang ?? "en-US";
  utterance.rate = opts?.rate ?? 0.95;
  utterance.pitch = 1;
  if (opts?.onEnd) utterance.onend = opts.onEnd;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) window.speechSynthesis.cancel();
}

export interface RecognitionResult {
  transcript: string;
  confidence: number;
}

export interface RecognitionController {
  stop: () => void;
}

/**
 * Inicia o reconhecimento de fala (en-US) e retorna um controller para parar.
 * onResult é chamado com o texto transcrito quando o usuário termina de falar.
 */
export function startRecognition(callbacks: {
  onResult: (result: RecognitionResult) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  lang?: string;
}): RecognitionController | null {
  if (!isSpeechRecognitionSupported()) {
    callbacks.onError?.("not-supported");
    return null;
  }
  const w = window as any;
  const SpeechRecognitionCtor = w.SpeechRecognition || w.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionCtor();
  recognition.lang = callbacks.lang ?? "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onstart = () => callbacks.onStart?.();
  recognition.onend = () => callbacks.onEnd?.();
  recognition.onerror = (event: any) => callbacks.onError?.(event.error ?? "unknown-error");
  recognition.onresult = (event: any) => {
    const result = event.results[0][0];
    callbacks.onResult({ transcript: result.transcript, confidence: result.confidence ?? 0 });
  };

  recognition.start();
  return {
    stop: () => recognition.stop(),
  };
}

/**
 * Compara a frase falada com a frase-alvo e retorna uma pontuação simples (0-100)
 * baseada na similaridade de palavras. Não é um avaliador fonético real, é uma
 * heurística útil para dar feedback motivador ao iniciante.
 */
export function compareSpeech(target: string, spoken: string): {
  score: number;
  matchedWords: string[];
  missedWords: string[];
} {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[.,!?']/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const targetWords = normalize(target);
  const spokenWords = new Set(normalize(spoken));

  const matchedWords = targetWords.filter((w) => spokenWords.has(w));
  const missedWords = targetWords.filter((w) => !spokenWords.has(w));

  const score = targetWords.length
    ? Math.round((matchedWords.length / targetWords.length) * 100)
    : 0;

  return { score, matchedWords, missedWords };
}
