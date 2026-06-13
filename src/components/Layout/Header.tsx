import { ProgressBar } from './ProgressBar';

interface HeaderProps {
  showProgress?: boolean;
  progress?: number;
  total?: number;
  current?: number;
}

export function Header({
  showProgress = false,
  progress = 0,
  total = 0,
  current = 0,
}: HeaderProps) {
  return (
    <header
      style={{
        backgroundColor: 'var(--color-card)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: '0.875rem',
        paddingBottom: showProgress ? '1rem' : '0.875rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
        }}
      >
        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0 1.5rem',
            marginBottom: showProgress ? '0.75rem' : 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{ fontSize: '1.25rem' }}
          >
            📐
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--color-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Révisions Brevet
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontWeight: 600,
              marginLeft: '0.25rem',
            }}
          >
            Géométrie
          </span>
        </div>

        {showProgress && (
          <ProgressBar value={progress} total={total} current={current} />
        )}
      </div>
    </header>
  );
}
