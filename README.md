# Guide Brevet Interactif TDAH — Géométrie

Application interactive de préparation au Brevet pour élèves TDAH, centrée sur un exercice de géométrie "Terrasse" (aires, périmètres, volumes composites).

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **Framer Motion** — animations fluides avec respect de `prefers-reduced-motion`
- **Three.js** — visualisation 3D de la terrasse (lazy loaded)
- **CSS Custom Properties** — design tokens WCAG AA

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (localhost:5173)
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## Structure

```
src/
├── types/quiz.ts          # Types TypeScript
├── data/questions.ts      # Questions de l'exercice ← ÉDITER ICI
├── hooks/
│   ├── useQuiz.ts         # State machine (useReducer + localStorage)
│   └── useReducedMotion.ts
├── animations/variants.ts # Framer Motion variants
├── styles/globals.css     # Design tokens + reset
├── components/
│   ├── Layout/            # Header, ProgressBar
│   ├── Quiz/              # QuizCard, AnswerOption, Explanation, HintButton
│   ├── Scene/             # TerrasseScene (Three.js)
│   └── Results/           # ResultsScreen
└── pages/
    ├── IntroPage.tsx
    ├── QuizPage.tsx
    └── ResultsPage.tsx
```

## Ajouter/modifier des questions

Éditer `src/data/questions.ts`. Chaque question suit le type `QuizQuestion` :

```typescript
{
  id: 'q1',
  step: 1,
  question: 'Texte de la question ?',
  hint: 'Indice optionnel.',           // affiché uniquement si l'élève clique
  options: [
    { id: 'a', label: 'A', value: 'Réponse A' },
    { id: 'b', label: 'B', value: 'Réponse B' },
    // ...
  ],
  correctId: 'b',                      // id de l'option correcte
  explanation: 'Explication complète.',
  unit: 'm²',
  figure: 'terrasse',                  // affiche la scène 3D
}
```

## Déploiement Vercel

```bash
# Via CLI Vercel
npx vercel --prod

# Ou connecter le repo GitHub dans le dashboard Vercel
# Framework preset: Vite
# Build command: npm run build
# Output directory: dist
```

## Personnalisation

Les couleurs, espacements et rayons sont définis dans `src/styles/globals.css` via des custom properties CSS :

```css
--color-primary: #4B6FD4;
--color-success: #2D9A6B;
--color-error: #C94C4C;
--touch-target: 48px;
```
