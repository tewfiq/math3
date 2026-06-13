import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { QuizQuestion } from '../../types/quiz';
import { AnswerOption } from './AnswerOption';
import { HintButton } from './HintButton';
import { Explanation } from './Explanation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cardVariants } from '../../animations/variants';

interface QuizCardProps {
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

export function QuizCard({
  question,
  selectedOptionId,
  isCorrect,
  isReviewing,
  showHint,
  isLast,
  onAnswer,
  onNext,
  onHint,
}: QuizCardProps) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-focus card on mount for keyboard navigation
  useEffect(() => {
    cardRef.current?.focus();
  }, [question.id]);

  const variants = reduced
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : cardVariants;

  return (
    <motion.div
      key={question.id}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={cardRef}
      tabIndex={-1}
      aria-label={`Question ${question.step}`}
      style={{
        backgroundColor: 'var(--color-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: '1.5rem',
        outline: 'none',
      }}
    >
      {/* Step badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            fontSize: '0.8125rem',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {question.step}
        </span>
        <span
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Étape {question.step}
          {question.unit && ` — ${question.unit}`}
        </span>
      </div>

      {/* Question text */}
      <h2
        style={{
          fontSize: '1.0625rem',
          fontWeight: 600,
          lineHeight: 1.55,
          color: 'var(--color-text)',
          marginBottom: '1.25rem',
        }}
      >
        {question.question}
      </h2>

      {/* Hint */}
      {question.hint && (
        <div style={{ marginBottom: '1.25rem' }}>
          <HintButton
            hint={question.hint}
            shown={showHint}
            onShow={onHint}
          />
        </div>
      )}

      {/* Options */}
      {!isReviewing && (
        <div
          role="group"
          aria-label="Choisissez votre réponse"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
        >
          {question.options.map((option) => (
            <AnswerOption
              key={option.id}
              option={option}
              selected={selectedOptionId === option.id}
              isCorrect={isCorrect}
              correctId={question.correctId}
              disabled={false}
              onSelect={onAnswer}
            />
          ))}
        </div>
      )}

      {/* Locked options + explanation */}
      {isReviewing && (
        <>
          <div
            role="group"
            aria-label="Résultat de votre réponse"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}
          >
            {question.options.map((option) => (
              <AnswerOption
                key={option.id}
                option={option}
                selected={selectedOptionId === option.id}
                isCorrect={isCorrect}
                correctId={question.correctId}
                disabled={true}
                onSelect={() => {}}
              />
            ))}
          </div>

          <Explanation
            isCorrect={isCorrect ?? false}
            explanation={question.explanation}
            onNext={onNext}
            isLast={isLast}
          />
        </>
      )}
    </motion.div>
  );
}
