import type { Archetype } from "../types/marketingMayhem";

export const tieBreakerPriority: Archetype[] = [
  "treadmill_tabby",
  "sunbeam_strategist",
  "zoomie_founder",
  "midnight_coder",
  "mirror_cat"
];

export function calculateResult(answers: Archetype[]): Archetype {
  if (!answers.length) {
    console.error("Marketing Mayhem result could not be calculated: no answers.");
    return "treadmill_tabby";
  }

  const scores = answers.reduce<Record<Archetype, number>>(
    (acc, archetype) => {
      acc[archetype] += 1;
      return acc;
    },
    {
      zoomie_founder: 0,
      sunbeam_strategist: 0,
      mirror_cat: 0,
      midnight_coder: 0,
      treadmill_tabby: 0
    }
  );

  const highestScore = Math.max(...Object.values(scores));
  const tied = Object.entries(scores)
    .filter(([, score]) => score === highestScore)
    .map(([archetype]) => archetype as Archetype);

  if (tied.length === 1) return tied[0];

  const q1Answer = answers[0];
  if (q1Answer && tied.includes(q1Answer)) return q1Answer;

  const q7Answer = answers[6];
  if (q7Answer && tied.includes(q7Answer)) return q7Answer;

  return tieBreakerPriority.find((archetype) => tied.includes(archetype)) ?? "treadmill_tabby";
}
