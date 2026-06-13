import { useReducer, useEffect, useCallback } from 'react';
import type { QuizState, QuizAction } from '../types/quiz';
import { questions } from '../data/questions';

const STORAGE_KEY = 'math3_quiz_state';

const initialState: QuizState = {
  phase: 'idle',
  currentIndex: 0,
  answers: {},
  hintsUsed: [],
  score: 0,
  showHint: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return { ...initialState, phase: 'quiz' };

    case 'ANSWER': {
      const question = questions[state.currentIndex];
      if (!question || state.phase !== 'quiz') return state;

      const isCorrect = action.optionId === question.correctId;
      return {
        ...state,
        phase: 'reviewing',
        answers: { ...state.answers, [question.id]: action.optionId },
        score: isCorrect ? state.score + 1 : state.score,
        showHint: false,
      };
    }

    case 'NEXT': {
      if (state.phase !== 'reviewing') return state;
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= questions.length) {
        return { ...state, phase: 'results' };
      }
      return { ...state, phase: 'quiz', currentIndex: nextIndex, showHint: false };
    }

    case 'HINT': {
      if (state.phase !== 'quiz') return state;
      const question = questions[state.currentIndex];
      if (!question) return state;
      return {
        ...state,
        showHint: true,
        hintsUsed: state.hintsUsed.includes(question.id)
          ? state.hintsUsed
          : [...state.hintsUsed, question.id],
      };
    }

    case 'RESTART':
      return { ...initialState, phase: 'idle' };

    default:
      return state;
  }
}

function loadFromStorage(): QuizState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizState;
    // Only restore if in progress
    if (parsed.phase === 'quiz' || parsed.phase === 'reviewing') return parsed;
    return null;
  } catch {
    return null;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState, () => {
    const saved = loadFromStorage();
    return saved ?? initialState;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (state.phase === 'idle' || state.phase === 'results') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Ignore storage errors
      }
    }
  }, [state]);

  const currentQuestion = questions[state.currentIndex] ?? null;
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0
    ? ((state.currentIndex + (state.phase === 'results' ? 1 : 0)) / totalQuestions) * 100
    : 0;

  const selectedOptionId = currentQuestion
    ? (state.answers[currentQuestion.id] ?? null)
    : null;

  const isCorrect = currentQuestion && selectedOptionId
    ? selectedOptionId === currentQuestion.correctId
    : null;

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const answer = useCallback((optionId: string) => dispatch({ type: 'ANSWER', optionId }), []);
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const hint = useCallback(() => dispatch({ type: 'HINT' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  return {
    state,
    currentQuestion,
    totalQuestions,
    progress,
    selectedOptionId,
    isCorrect,
    start,
    answer,
    next,
    hint,
    restart,
  };
}
