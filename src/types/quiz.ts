export interface QuizOption {
  id: string;
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  step: number;
  question: string;
  hint?: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
  unit?: string;
  figure?: 'terrasse' | 'none';
}

export type QuizPhase =
  | 'idle'
  | 'intro'
  | 'quiz'
  | 'reviewing'
  | 'results';

export interface QuizState {
  phase: QuizPhase;
  currentIndex: number;
  answers: Record<string, string>; // questionId → selectedOptionId
  hintsUsed: string[];             // questionIds where hint was shown
  score: number;
  showHint: boolean;
}

export type QuizAction =
  | { type: 'START' }
  | { type: 'ANSWER'; optionId: string }
  | { type: 'NEXT' }
  | { type: 'HINT' }
  | { type: 'RESTART' };
