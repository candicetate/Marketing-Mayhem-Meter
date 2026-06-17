import { AUDIT_URL, CONSULTATION_URL } from "../data/config";
import { results } from "../data/results";
import { trackEvent } from "../lib/analytics";
import type { Archetype } from "../types/marketingMayhem";
import { CTASection } from "./CTASection";

type ResultPageProps = {
  result: Archetype;
  emailWarning: boolean;
};

export function ResultPage({ result, emailWarning }: ResultPageProps) {
  const content = results[result];
  const primaryUrl = content.ctaLabel.includes("Audit") ? AUDIT_URL : CONSULTATION_URL;

  return (
    <main className="result-layout">
      {emailWarning && (
        <p className="notice" role="status">
          Your result is ready. We had trouble sending the email copy, but you can view everything here.
        </p>
      )}
      <section className="result-hero">
        <div className="result-copy">
          <span className="result-emoji" aria-hidden="true">{content.emoji}</span>
          <p className="eyebrow">Your Marketing Mayhem Type</p>
          <h1>{content.name}</h1>
          <p className="subtitle">{content.bottleneck}</p>
          <p className="core-issue">{content.coreIssue}</p>
          <a
            className="button primary"
            href={primaryUrl}
            onClick={() =>
              trackEvent(content.ctaLabel.includes("Audit") ? "marketing_mayhem_audit_cta_clicked" : "marketing_mayhem_consultation_cta_clicked", { result })
            }
          >
            {content.ctaLabel}
          </a>
        </div>
        <img className="result-graphic" src={content.image} alt={content.imageAlt} />
      </section>
      <section className="result-grid">
        <article>
          <h2>What this means</h2>
          <p>{content.description}</p>
        </article>
        <article>
          <h2>What this looks like</h2>
          <ul>
            {content.whatThisLooksLike.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
        <article>
          <h2>What's actually slowing you down</h2>
          <p>{content.whatsSlowingYouDown}</p>
        </article>
        <article>
          <h2>What to fix first</h2>
          <p>{content.whatToFixFirst}</p>
        </article>
        <article className="wide">
          <h2>Your next best step</h2>
          <p>{content.nextBestStep}</p>
        </article>
      </section>
      <CTASection result={result} />
    </main>
  );
}
