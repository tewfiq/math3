import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HintButtonProps {
  hint: string;
  shown: boolean;
  onShow: () => void;
}

export function HintButton({ hint, shown, onShow }: HintButtonProps) {
  const reduced = useReducedMotion();

  if (shown) {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.3 }}
        role="note"
        aria-label="Indice"
        style={{
          backgroundColor: 'var(--color-hint-bg)',
          border: '1.5px solid var(--color-hint-border)',
          borderRadius: '12px',
          padding: '0.875rem 1rem',
          display: 'flex',
          gap: '0.625rem',
          alignItems: 'flex-start',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: '1.125rem', flexShrink: 0 }}>
          💡
        </span>
        <p
          style={{
            fontSize: '0.9375rem',
            color: '#92400E',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {hint}
        </p>
      </motion.div>
    );
  }

  return (
    <button
      onClick={onShow}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        minHeight: 'var(--touch-target)',
        padding: '0 1rem',
        background: 'transparent',
        border: '1.5px dashed var(--color-hint-border)',
        borderRadius: '10px',
        cursor: 'pointer',
        color: '#92400E',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'background var(--transition-fast)',
        fontFamily: 'var(--font-body)',
      }}
      aria-label="Afficher un indice"
    >
      <span aria-hidden="true">💡</span>
      Voir un indice
    </button>
  );
}
