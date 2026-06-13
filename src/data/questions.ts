import type { QuizQuestion } from '../types/quiz';

/**
 * Exercice Brevet -- Probleme de la Terrasse
 * Themes : aires composites, perimetre, volume
 *
 * A completer avec le contenu fourni par l'utilisateur.
 */
export const questions: QuizQuestion[] = [
  {
    id: 'q1',
    step: 1,
    question: "La terrasse rectangulaire mesure 8 m de long et 5 m de large. Quelle est son aire totale ?",
    hint: "Aire d'un rectangle = longueur x largeur",
    options: [
      { id: 'a', label: 'A', value: '35 m\u00b2' },
      { id: 'b', label: 'B', value: '40 m\u00b2' },
      { id: 'c', label: 'C', value: '26 m\u00b2' },
      { id: 'd', label: 'D', value: '45 m\u00b2' },
    ],
    correctId: 'b',
    explanation: "Aire = 8 \u00d7 5 = 40 m\u00b2. On multiplie la longueur par la largeur.",
    unit: 'm\u00b2',
    figure: 'terrasse',
  },
  {
    id: 'q2',
    step: 2,
    question: "Un carr\u00e9 de 2 m de c\u00f4t\u00e9 est d\u00e9coup\u00e9 dans un angle de la terrasse. Quelle est l'aire restante ?",
    hint: "Soustrais l'aire du carr\u00e9 de l'aire totale.",
    options: [
      { id: 'a', label: 'A', value: '36 m\u00b2' },
      { id: 'b', label: 'B', value: '38 m\u00b2' },
      { id: 'c', label: 'C', value: '34 m\u00b2' },
      { id: 'd', label: 'D', value: '32 m\u00b2' },
    ],
    correctId: 'a',
    explanation: "Aire du carr\u00e9 = 2 \u00d7 2 = 4 m\u00b2. Aire restante = 40 \u2212 4 = 36 m\u00b2.",
    unit: 'm\u00b2',
    figure: 'terrasse',
  },
  {
    id: 'q3',
    step: 3,
    question: "Quel est le p\u00e9rim\u00e8tre de la terrasse d\u00e9coup\u00e9e (sans le carr\u00e9 retir\u00e9) ?",
    hint: "Trace le contour et additionne chaque segment.",
    options: [
      { id: 'a', label: 'A', value: '28 m' },
      { id: 'b', label: 'B', value: '30 m' },
      { id: 'c', label: 'C', value: '32 m' },
      { id: 'd', label: 'D', value: '26 m' },
    ],
    correctId: 'b',
    explanation: "En retirant le carr\u00e9 on ajoute 2 segments de 2 m et on enl\u00e8ve le coin ext\u00e9rieur : p\u00e9rim\u00e8tre = 8 + 3 + 2 + 2 + 6 + 5 + 2 + 2 = 30 m.",
    unit: 'm',
    figure: 'terrasse',
  },
  {
    id: 'q4',
    step: 4,
    question: "On coule une dalle de b\u00e9ton de 12 cm d'\u00e9paisseur sur la terrasse (36 m\u00b2). Quel est le volume de b\u00e9ton ?",
    hint: "Volume = aire \u00d7 \u00e9paisseur. Convertis 12 cm en m\u00e8tres.",
    options: [
      { id: 'a', label: 'A', value: '4,32 m\u00b3' },
      { id: 'b', label: 'B', value: '43,2 m\u00b3' },
      { id: 'c', label: 'C', value: '0,432 m\u00b3' },
      { id: 'd', label: 'D', value: '3,6 m\u00b3' },
    ],
    correctId: 'a',
    explanation: "12 cm = 0,12 m. Volume = 36 \u00d7 0,12 = 4,32 m\u00b3.",
    unit: 'm\u00b3',
    figure: 'terrasse',
  },
  {
    id: 'q5',
    step: 5,
    question: "Le b\u00e9ton co\u00fbte 95 \u20ac le m\u00b3. Quel est le co\u00fbt total de la dalle ?",
    hint: "Multiplie le volume par le prix unitaire.",
    options: [
      { id: 'a', label: 'A', value: '410,40 \u20ac' },
      { id: 'b', label: 'B', value: '380,00 \u20ac' },
      { id: 'c', label: 'C', value: '425,00 \u20ac' },
      { id: 'd', label: 'D', value: '356,80 \u20ac' },
    ],
    correctId: 'a',
    explanation: "Co\u00fbt = 4,32 \u00d7 95 = 410,40 \u20ac.",
    unit: '\u20ac',
    figure: 'none',
  },
];
