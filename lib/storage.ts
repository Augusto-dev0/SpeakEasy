import { UserProgress } from "./types";

const STORAGE_KEY = "speakeasy_progress_v1";

const defaultProgress: UserProgress = {
  streak: 0,
  lastPracticeDate: null,
  completedLessons: [],
  totalPracticeSessions: 0,
  totalWordsLearned: 0,
  xp: 0,
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getProgress(): UserProgress {
  if (!isBrowser()) return defaultProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function isYesterday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function isToday(dateStr: string): boolean {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

/** Chame isso sempre que o usuário concluir uma sessão de prática. Atualiza streak automaticamente. */
export function registerPracticeSession(xpGained = 10): UserProgress {
  const progress = getProgress();
  const todayStr = new Date().toISOString();

  if (!progress.lastPracticeDate || !isToday(progress.lastPracticeDate)) {
    if (progress.lastPracticeDate && isYesterday(progress.lastPracticeDate)) {
      progress.streak += 1;
    } else if (!progress.lastPracticeDate || !isYesterday(progress.lastPracticeDate)) {
      progress.streak = progress.lastPracticeDate ? 1 : 1;
    }
  }

  progress.lastPracticeDate = todayStr;
  progress.totalPracticeSessions += 1;
  progress.xp += xpGained;

  saveProgress(progress);
  return progress;
}

export function markLessonCompleted(lessonId: string): UserProgress {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.totalWordsLearned += 5;
    progress.xp += 20;
  }
  saveProgress(progress);
  return progress;
}

export function resetProgress() {
  saveProgress(defaultProgress);
}
