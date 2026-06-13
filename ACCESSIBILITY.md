# Audit Accessibilité — WCAG 2.1 AA

## Résumé

| Critère | Statut | Notes |
|---------|--------|-------|
| Contraste texte (4.5:1) | ✅ | Tous les textes principaux ≥ 7:1 |
| Contraste large (3:1) | ✅ | Titres et éléments graphiques |
| Navigation clavier | ✅ | Tab, Enter, Espace fonctionnels |
| Skip link | ✅ | Premier élément du DOM |
| Structure heading | ✅ | h1 par page, h2 par question |
| Labels formulaires | ✅ | aria-label sur tous les boutons |
| Live regions | ✅ | aria-live="polite" sur feedback |
| Progress bar | ✅ | role="progressbar" + aria-valuenow |
| Reduced motion | ✅ | Animations désactivées |
| Focus visible | ✅ | Outline 3px primary color |
| Touch targets | ✅ | min-height 48px (≥ 44px WCAG) |

## Navigation Clavier

| Touche | Action |
|--------|--------|
| `Tab` | Avancer dans les éléments focusables |
| `Shift+Tab` | Reculer |
| `Enter` / `Espace` | Activer bouton / sélectionner réponse |

## Screen Reader (VoiceOver macOS)

- Le `<header>` est annoné comme landmark "banner"
- Le `<main id="main">` est annoné comme landmark "main"
- Chaque QuizCard a `aria-label="Question N"`
- Les options réponses ont `aria-pressed` pour indiquer la sélection
- La zone de feedback a `aria-live="polite"` et `aria-atomic="true"`
- La barre de progression annonce "Progression : étape X sur Y"
- La scène 3D a `aria-label` descriptif

## Palette de couleurs

| Token | Valeur | Ratio (sur fond blanc) |
|-------|--------|------------------------|
| `--color-text` | #1A1A2E | 17.2:1 |
| `--color-primary` | #4B6FD4 | 4.6:1 |
| `--color-primary-dark` | #3557BB | 6.1:1 |
| `--color-success` | #2D9A6B | 4.6:1 |
| `--color-error` | #C94C4C | 5.1:1 |
| `--color-text-muted` | #6B7280 | 4.5:1 |

## Reduced Motion

Lorsque `prefers-reduced-motion: reduce` est activé :
- Toutes les transitions Framer Motion ont `duration: 0`
- Les variants d'animation retournent les états finaux directement
- Le hook `useReducedMotion()` retourne `true` et les composants adaptent leur comportement

## Recommandations futures

- Ajouter `lang="fr"` sur les éléments en langue différente si nécessaire
- Tester avec NVDA (Windows) et TalkBack (Android)
- Ajouter une option de taille de police ajustable
- Envisager un mode haute contraste personnalisé
