const priority = ["treadmill_tabby", "sunbeam_strategist", "zoomie_founder", "midnight_coder", "mirror_cat"];

function calculateResult(answers) {
  if (!answers.length) return "treadmill_tabby";
  const scores = {
    zoomie_founder: 0,
    sunbeam_strategist: 0,
    mirror_cat: 0,
    midnight_coder: 0,
    treadmill_tabby: 0
  };
  answers.forEach((answer) => {
    scores[answer] += 1;
  });
  const highest = Math.max(...Object.values(scores));
  const tied = Object.entries(scores).filter(([, score]) => score === highest).map(([key]) => key);
  if (tied.length === 1) return tied[0];
  if (tied.includes(answers[0])) return answers[0];
  if (tied.includes(answers[6])) return answers[6];
  return priority.find((key) => tied.includes(key)) || "treadmill_tabby";
}

const cases = [
  {
    name: "highest score wins",
    answers: ["mirror_cat", "mirror_cat", "zoomie_founder", "mirror_cat", "midnight_coder", "treadmill_tabby", "sunbeam_strategist"],
    expected: "mirror_cat"
  },
  {
    name: "question one breaks tie",
    answers: ["sunbeam_strategist", "zoomie_founder", "zoomie_founder", "sunbeam_strategist", "mirror_cat", "midnight_coder", "treadmill_tabby"],
    expected: "sunbeam_strategist"
  },
  {
    name: "question seven breaks tie when question one does not",
    answers: ["mirror_cat", "zoomie_founder", "sunbeam_strategist", "zoomie_founder", "sunbeam_strategist", "midnight_coder", "sunbeam_strategist"],
    expected: "sunbeam_strategist"
  },
  {
    name: "priority breaks remaining tie",
    answers: ["zoomie_founder", "treadmill_tabby", "midnight_coder", "treadmill_tabby", "midnight_coder", "mirror_cat", "sunbeam_strategist"],
    expected: "treadmill_tabby"
  },
  {
    name: "empty answers use fallback",
    answers: [],
    expected: "treadmill_tabby"
  }
];

for (const testCase of cases) {
  const actual = calculateResult(testCase.answers);
  if (actual !== testCase.expected) {
    throw new Error(`${testCase.name}: expected ${testCase.expected}, received ${actual}`);
  }
}

console.log(`Scoring tests passed: ${cases.length}`);
