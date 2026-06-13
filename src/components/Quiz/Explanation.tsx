import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ExplanationProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
  isLast: boolean;
}

export function Explanation({ isCorrect, explanation, onNext, isLast }: ExplanationProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.1 }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Result banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.875rem 1rem',
          borderRadius: '12px',
          backgroundColor: isCorrect ? 'var(--color-success-light)' : 'var(--color-error-light)',
          border: `1.5px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-error)'}`,
          marginBottom: '1rem',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>
          {isCorrect ? '🎉' : '💪'}
        </span>
        <strong
          style={{
            color: isCorrect ? '#1A5940' : '#7A1E1E',
            fontSize: '1rem',
          }}
        >
          {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait…'}
        </strong>
      </div>

      {/* Explanation */}
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#F0F4FF',
          borderRadius: '12px',
          marginBottom: '1.25rem',
          border: '1px solid #C7D3F5',
        }}
      >
        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            color: 'var(--color-text)',
            margin: 0,
          }}
        >
          <strong style={{ color: 'var(--color-primary)' }}>Explication : </strong>
          {explanation}
        </p>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        autoFocus
        className="btn btn-primary"
        style={{ width: '100%' }}
        aria-label={isLast ? 'Voir les résultats' : 'Question suivante'}
      >
        {isLast ? 'Voir mes résultats' : 'Question suivante →'}
      </button>
    </motion.div>
  );
}
