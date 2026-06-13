import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProgressBarProps {
  value: number;      // 0–100
  total: number;
  current: number;
}

export function ProgressBar({ value, total, current }: ProgressBarProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className="progress-bar-container"
      style={{
        width: '100%',
        padding: '0 1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          fontWeight: 500,
        }}
        aria-hidden="true"
      >
        <span>Étape {Math.min(current + 1, total)} / {total}</span>
        <span>{Math.round(value)}%</span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progression : étape ${Math.min(current + 1, total)} sur ${total}`}
        style={{
          height: '8px',
          backgroundColor: 'var(--color-border)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={false}
          animate={{ width: `${value}%` }}
          transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
          style={{
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '9999px',
          }}
        />
      </div>
    </div>
  );
}
