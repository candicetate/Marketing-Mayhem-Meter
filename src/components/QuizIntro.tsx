type QuizIntroProps = {
  onStart: () => void;
};

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <section className="hero-panel">
      <p className="eyebrow">Free Marketing Diagnostic</p>
      <h1>The Marketing Mayhem Meter</h1>
      <p className="subtitle">Find out what's actually slowing your marketing down and what to fix first.</p>
      <p className="intro-copy">
        Your marketing does not have to feel like a pile of half-finished ideas, manual tasks, and "I swear I'm
        going to post this week" guilt.
      </p>
      <p className="intro-copy">
        Take this quick diagnostic to find out where your marketing is getting stuck, what type of mayhem you're
        dealing with, and what to fix first so your business can grow with more clarity and less chaos.
      </p>
      <div className="detail-row" aria-label="Diagnostic details">
        <span>2 minutes</span>
        <span>7 questions</span>
        <span>Personalized result</span>
      </div>
      <button className="button primary" type="button" onClick={onStart}>
        Start the Diagnostic
      </button>
    </section>
  );
}
