export interface Phrase {
  id: string;
  en: string;
  pt: string;
}

export interface FillBlank {
  id: string;
  /** Frase em inglês com {blank} no lugar da palavra a completar */
  sentence: string;
  answer: string;
  pt: string;
}

export interface Lesson {
  id: string;
  day: number;
  title: string;
  titleEn: string;
  theme: string;
  vocabulary: { en: string; pt: string; icon: string }[];
  phrases: Phrase[];
  fillBlanks: FillBlank[];
  exercisePrompt: string;
}

export interface Flashcard {
  id: string;
  front: string; // inglês
  back: string; // português
  category: string;
}

export interface WritingIssue {
  id: string;
  message: string;
  offset: number;
  length: number;
  badText: string;
  suggestions: string[];
  category: string;
}

export interface UserProgress {
  streak: number;
  lastPracticeDate: string | null;
  completedLessons: string[];
  totalPracticeSessions: number;
  totalWordsLearned: number;
  xp: number;
}
