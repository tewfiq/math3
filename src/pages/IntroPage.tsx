import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { slideUpVariants, staggerContainerVariants, staggerItemVariants } from '../animations/variants';

const TerrasseScene = lazy(() =>
  import('../components/Scene/TerrasseScene').then((m) => ({ default: m.TerrasseScene }))
);

interface IntroPageProps {
  onStart: () => void;
}

export function IntroPage({ onStart }: IntroPageProps) {
  const reduced = useReducedMotion();

  const containerV = reduced ? {} : staggerContainerVariants;
  const itemV = reduced ? {} : staggerItemVariants;
  const slideV = reduced ? {} : slideUpVariants;

  return (
    <main
      id="main"
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '2rem 1.25rem',
      }}
    >
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        {/* Hero */}
        <motion.div variants={itemV} style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <span aria-hidden="true" style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1rem' }}>
            🏗️
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: '0.75rem',
              lineHeight: 1.25,
            }}
          >
            La Terrasse
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Exercice de géométrie Brevet — Calcule des <strong>aires</strong>,{' '}
            <strong>périmètres</strong> et <strong>volumes</strong> composites pas à pas.
          </p>

          {/* Source PDF */}
          <div
            style={{
              marginTop: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--color-primary-light)',
              borderRadius: '8px',
              padding: '0.45rem 0.9rem',
              fontSize: '0.8125rem',
            }}
          >
            <span aria-hidden="true">📄</span>
            <span style={{ color: 'var(--color-text-muted)' }}>
              Source&nbsp;: <strong style={{ color: 'var(--color-text)' }}>Brevet Amériques du Nord — Mai 2024</strong>, exercice&nbsp;4
            </span>
            <a
              href="/Brevet_Ameri_Nord_mai_2024_FK.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{
                marginLeft: '0.25rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
              }}
              aria-label="Télécharger le sujet PDF (ouvre dans un nouvel onglet)"
            >
              ↓ PDF
            </a>
          </div>
        </motion.div>

        {/* 3D Preview */}
        <motion.div variants={slideV} initial="hidden" animate="visible">
          <Suspense
            fallback={
              <div
                style={{
                  height: '280px',
                  borderRadius: '12px',
                  backgroundColor: '#F0F4FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.875rem',
                }}
                aria-live="polite"
              >
                Chargement…
              </div>
            }
          >
            <TerrasseScene />
          </Suspense>
        </motion.div>

        {/* Info chips */}
        <motion.div
          variants={containerV}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          {[
            { icon: '📋', label: '5 questions' },
            { icon: '💡', label: 'Indices disponibles' },
            { icon: '✅', label: 'Corrections détaillées' },
            { icon: '💾', label: 'Progression sauvegardée' },
          ].map(({ icon, label }) => (
            <motion.span
              key={label}
              variants={itemV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.3rem 0.75rem',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-dark)',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 500,
              }}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemV} style={{ paddingBottom: '2rem' }}>
          <button
            onClick={onStart}
            className="btn btn-primary"
            style={{ width: '100%', fontSize: '1.125rem', minHeight: '56px' }}
            autoFocus
          >
            Commencer l'exercice →
          </button>
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              marginTop: '0.75rem',
            }}
          >
            Aucun compte requis · 100% gratuit
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
