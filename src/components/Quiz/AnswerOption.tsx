import { motion } from 'framer-motion';
import type { QuizOption } from '../../types/quiz';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnswerOptionProps {
  option: QuizOption;
  selected: boolean;
  isCorrect: boolean | null; // null = not yet answered
  correctId: string;
  disabled: boolean;
  onSelect: (id: string) => void;
}

export function AnswerOption({
  option,
  selected,
  isCorrect,
  correctId,
  disabled,
  onSelect,
}: AnswerOptionProps) {
  const reduced = useReducedMotion();

  const isThisCorrect = option.id === correctId;
  const showResult = disabled; // answers locked = reviewing phase

  let bgColor = 'var(--color-card)';
  let borderColor = 'var(--color-border)';
  let textColor = 'var(--color-text)';
  let icon = null;

  if (showResult) {
    if (isThisCorrect) {
      bgColor = 'var(--color-success-light)';
      borderColor = 'var(--color-success)';
      textColor = '#1A5940';
      icon = '✓';
    } else if (selected && !isCorrect) {
      bgColor = 'var(--color-error-light)';
      borderColor = 'var(--color-error)';
      textColor = '#7A1E1E';
      icon = '✗';
    }
  } else if (selected) {
    borderColor = 'var(--color-primary)';
    bgColor = 'var(--color-primary-light)';
    textColor = 'var(--color-primary-dark)';
  }

  return (
    <motion.button
      whileHover={!disabled && !reduced ? { scale: 1.015, y: -1 } : {}}
      whileTap={!disabled && !reduced ? { scale: 0.99 } : {}}
      transition={{ duration: reduced ? 0 : 0.15 }}
      onClick={() => !disabled && onSelect(option.id)}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Réponse ${option.label} : ${option.value}`}
      style={{
        width: '100%',
        minHeight: 'var(--touch-target)',
        padding: '0.75rem 1rem',
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '12px',
        cursor: disabled ? 'default' : 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        transition: 'border-color 0.2s, background-color 0.2s',
        fontFamily: 'var(--font-body)',
        color: textColor,
        boxShadow: selected && !showResult ? '0 0 0 3px rgba(75,111,212,0.2)' : 'none',
      }}
    >
      {/* Letter badge */}
      <span
        aria-hidden="true"
        style={{
          width: '32px',
          height: '32px',
          flexShrink: 0,
          borderRadius: '8px',
          backgroundColor: showResult
            ? isThisCorrect
              ? 'var(--color-success)'
              : selected
              ? 'var(--color-error)'
              : 'var(--color-border)'
            : selected
            ? 'var(--color-primary)'
            : 'var(--color-bg)',
          border: `1.5px solid ${
            showResult
              ? isThisCorrect
                ? 'var(--color-success)'
                : selected
                ? 'var(--color-error)'
                : 'var(--color-border)'
              : selected
              ? 'var(--color-primary)'
              : 'var(--color-border)'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: showResult
            ? isThisCorrect || selected
              ? 'white'
              : 'var(--color-text-muted)'
            : selected
            ? 'white'
            : 'var(--color-text-muted)',
          transition: 'background-color 0.2s, color 0.2s',
        }}
      >
        {icon ?? option.label}
      </span>

      <span style={{ fontSize: '1rem', fontWeight: selected ? 600 : 400, flex: 1 }}>
        {option.value}
      </span>
    </motion.button>
  );
}
