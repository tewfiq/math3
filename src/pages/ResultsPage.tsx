import { motion } from 'framer-motion';
import { ResultsScreen } from '../components/Results/ResultsScreen';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeVariants } from '../animations/variants';

interface ResultsPageProps {
  score: number;
  total: number;
  hintsUsed: number;
  onRestart: () => void;
}

export function ResultsPage({ score, total, hintsUsed, onRestart }: ResultsPageProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? {} : fadeVariants;

  return (
    <main id="main">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <ResultsScreen
          score={score}
          total={total}
          hintsUsed={hintsUsed}
          onRestart={onRestart}
        />
      </motion.div>
    </main>
  );
}
