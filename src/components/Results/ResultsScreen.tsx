import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { bounceVariants, staggerContainerVariants, staggerItemVariants } from '../../animations/variants';

interface ResultsScreenProps {
  score: number;
  total: number;
  hintsUsed: number;
  onRestart: () => void;
}

function getMessage(ratio: number): { emoji: string; title: string; body: string } {
  if (ratio === 1)
    return {
      emoji: '🏆',
      title: 'Parfait !',
      body: 'Tu as tout réussi ! Tu es prêt(e) pour le Brevet.',
    };
  if (ratio >= 0.8)
    return {
      emoji: '🌟',
      title: 'Excellent !',
      body: 'Très belle performance ! Encore un peu de pratique et tu seras au top.',
    };
  if (ratio >= 0.6)
    return {
      emoji: '👍',
      title: 'Bien joué !',
      body: 'Tu es sur la bonne voie. Relis les explications des questions ratées.',
    };
  return {
    emoji: '💪',
    title: 'Continue !',
    body: 'Ce n\'est qu\'un début ! Relis les explications et recommence.',
  };
}

export function ResultsScreen({ score, total, hintsUsed, onRestart }: ResultsScreenProps) {
  const reduced = useReducedMotion();
  const ratio = total > 0 ? score / total : 0;
  const { emoji, title, body } = getMessage(ratio);

  const pct = Math.round(ratio * 100);

  const containerV = reduced ? {} : staggerContainerVariants;
  const itemV = reduced ? {} : staggerItemVariants;
  const bounceV = reduced ? {} : bounceVariants;

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '2rem 1.25rem',
        textAlign: 'center',
      }}
    >
      {/* Big emoji */}
      <motion.div
        variants={bounceV}
        initial="hidden"
        animate="visible"
        style={{ fontSize: '4rem', marginBottom: '1rem', display: 'block' }}
        aria-hidden="true"
      >
        {emoji}
      </motion.div>

      <motion.h1
        variants={itemV}
        initial="hidden"
        animate="visible"
        style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: 'var(--color-text)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </motion.h1>

      <motion.p
        variants={itemV}
        initial="hidden"
        animate="visible"
        style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        {body}
      </motion.p>

      {/* Score card */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="visible"
        style={{
          backgroundColor: 'var(--color-card)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
        }}
      >
        <motion.div variants={itemV} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            {score}/{total}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            Bonnes réponses
          </div>
        </motion.div>

        <motion.div variants={itemV} style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: ratio >= 0.6 ? 'var(--color-success)' : 'var(--color-error)',
            }}
          >
            {pct}%
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            Score
          </div>
        </motion.div>

        <motion.div variants={itemV} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-hint-border)' }}>
            {hintsUsed}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            Indices utilisés
          </div>
        </motion.div>
      </motion.div>

      <button
        onClick={onRestart}
        className="btn btn-primary"
        style={{ width: '100%', marginBottom: '0.75rem' }}
        aria-label="Recommencer l'exercice depuis le début"
      >
        Recommencer
      </button>

      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
        Tes progrès ont été sauvegardés localement.
      </p>
    </div>
  );
}
