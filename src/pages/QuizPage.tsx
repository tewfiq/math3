import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuizCard } from '../components/Quiz/QuizCard';
import type { QuizQuestion } from '../types/quiz';

const TerrasseScene = lazy(() =>
  import('../components/Scene/TerrasseScene').then((m) => ({ default: m.TerrasseScene }))
);

interface QuizPageProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  isReviewing: boolean;
  showHint: boolean;
  isLast: boolean;
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  onHint: () => void;
}

export function QuizPage({
  question,
  selectedOptionId,
  isCorrect,
  isReviewing,
  showHint,
  isLast,
  onAnswer,
  onNext,
  onHint,
}: QuizPageProps) {
  return (
    <main
      id="main"
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '1.5rem 1.25rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* 3D scene (only for terrasse questions) */}
      {question.figure === 'terrasse' && (
        <Suspense fallback={null}>
          <TerrasseScene highlightCut={question.step >= 2} />
        </Suspense>
      )}

      {/* Quiz card with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        <QuizCard
          key={question.id}
          question={question}
          selectedOptionId={selectedOptionId}
          isCorrect={isCorrect}
          isReviewing={isReviewing}
          showHint={showHint}
          isLast={isLast}
          onAnswer={onAnswer}
          onNext={onNext}
          onHint={onHint}
        />
      </AnimatePresence>
    </main>
  );
}
