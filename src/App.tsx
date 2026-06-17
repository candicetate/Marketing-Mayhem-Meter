import { useState } from "react";
import { LeadCaptureForm, type LeadFormValues } from "./components/LeadCaptureForm";
import { QuizIntro } from "./components/QuizIntro";
import { QuizQuestion } from "./components/QuizQuestion";
import { ResultPage } from "./components/ResultPage";
import { questions } from "./data/questions";
import { results } from "./data/results";
import { trackEvent } from "./lib/analytics";
import { submitLead } from "./lib/email";
import { calculateResult } from "./lib/scoring";
import type { Archetype } from "./types/marketingMayhem";

type Step = "intro" | "questions" | "lead" | "result";

export default function App() {
  const [step, setStep] = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Archetype[]>([]);
  const [result, setResult] = useState<Archetype>("treadmill_tabby");
  const [emailWarning, setEmailWarning] = useState(false);

  function start() {
    trackEvent("marketing_mayhem_started");
    setStep("questions");
  }

  function answerQuestion(archetype: Archetype) {
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = archetype;
    setAnswers(nextAnswers);
    trackEvent("marketing_mayhem_question_answered", {
      questionId: questions[questionIndex].id,
      answerArchetype: archetype
    });

    if (questionIndex === questions.length - 1) {
      const calculated = calculateResult(nextAnswers);
      setResult(calculated);
      trackEvent("marketing_mayhem_completed", { result: calculated });
      setStep("lead");
      return;
    }

    setQuestionIndex((current) => current + 1);
  }

  async function submit(values: LeadFormValues) {
    const answerDetails = answers.map((archetype, index) => {
      const question = questions[index];
      const selectedAnswer = question.answers.find((answer) => answer.archetype === archetype);

      return {
        questionId: question.id,
        question: question.question,
        answer: selectedAnswer?.label ?? archetype,
        archetype
      };
    });

    const submission = {
      ...values,
      result,
      resultName: results[result].name,
      answers,
      answerDetails,
      createdAt: new Date().toISOString()
    };

    const delivery = await submitLead(submission);
    setEmailWarning(!delivery.ok);
    trackEvent("marketing_mayhem_lead_submitted", { result });
    trackEvent("marketing_mayhem_result_viewed", { result });
    setStep("result");
  }

  return (
    <div className="app-shell">
      <main className="app-container">
        {step === "intro" && <QuizIntro onStart={start} />}
        {step === "questions" && (
          <QuizQuestion
            question={questions[questionIndex]}
            currentIndex={questionIndex}
            total={questions.length}
            selectedAnswer={answers[questionIndex]}
            onAnswer={answerQuestion}
            onBack={() => setQuestionIndex((current) => Math.max(0, current - 1))}
          />
        )}
        {step === "lead" && <LeadCaptureForm onSubmit={submit} />}
        {step === "result" && <ResultPage result={result} emailWarning={emailWarning} />}
      </main>
    </div>
  );
}
