import type { Archetype, Question } from "../types/marketingMayhem";
import { ProgressBar } from "./ProgressBar";

type QuizQuestionProps = {
  question: Question;
  currentIndex: number;
  total: number;
  selectedAnswer?: Archetype;
  onAnswer: (archetype: Archetype) => void;
  onBack: () => void;
};

export function QuizQuestion({ question, currentIndex, total, selectedAnswer, onAnswer, onBack }: QuizQuestionProps) {
  return (
    <section className="quiz-card">
      <ProgressBar current={currentIndex + 1} total={total} />
      <div className="question-header">
        <p className="microcopy">No shame. Just signal.</p>
        <h2>{question.question}</h2>
      </div>
      <div className="answers" role="radiogroup" aria-label={question.question}>
        {question.answers.map((answer) => (
          <button
            className={`answer-button ${selectedAnswer === answer.archetype ? "selected" : ""}`}
            type="button"
            role="radio"
            aria-checked={selectedAnswer === answer.archetype}
            key={answer.label}
            onClick={() => onAnswer(answer.archetype)}
          >
            {answer.label}
          </button>
        ))}
      </div>
      <div className="nav-row">
        <button className="button ghost" type="button" onClick={onBack} disabled={currentIndex === 0}>
          Back
        </button>
      </div>
    </section>
  );
}
