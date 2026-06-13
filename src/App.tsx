import { AnimatePresence } from 'framer-motion';
import { useQuiz } from './hooks/useQuiz';
import { Header } from './components/Layout/Header';
import { IntroPage } from './pages/IntroPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';

export default function App() {
  const {
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
  } = useQuiz();

  const isQuizActive = state.phase === 'quiz' || state.phase === 'reviewing';

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--color-bg)' }}>
      <Header
        showProgress={isQuizActive}
        progress={progress}
        total={totalQuestions}
        current={state.currentIndex}
      />

      <AnimatePresence mode="wait">
        {(state.phase === 'idle' || state.phase === 'intro') && (
          <IntroPage key="intro" onStart={start} />
        )}

        {isQuizActive && currentQuestion && (
          <QuizPage
            key={`quiz-${currentQuestion.id}`}
            question={currentQuestion}
            selectedOptionId={selectedOptionId}
            isCorrect={isCorrect}
            isReviewing={state.phase === 'reviewing'}
            showHint={state.showHint}
            isLast={state.currentIndex === totalQuestions - 1}
            onAnswer={answer}
            onNext={next}
            onHint={hint}
          />
        )}

        {state.phase === 'results' && (
          <ResultsPage
            key="results"
            score={state.score}
            total={totalQuestions}
            hintsUsed={state.hintsUsed.length}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
