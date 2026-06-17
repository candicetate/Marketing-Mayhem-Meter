import { AUDIT_URL, CONSULTATION_URL } from "../data/config";
import { trackEvent } from "../lib/analytics";
import type { Archetype } from "../types/marketingMayhem";

type CTASectionProps = {
  result: Archetype;
};

export function CTASection({ result }: CTASectionProps) {
  return (
    <section className="cta-band">
      <h2>Ready to turn this into a marketing system that actually works?</h2>
      <p>
        Your result is not a personality flaw. It is a systems clue. Clever Calicco can help you clarify what is
        working, fix what is missing, and build a marketing system that supports your business instead of draining your
        energy.
      </p>
      <div className="button-row">
        <a
          className="button primary"
          href={AUDIT_URL}
          onClick={() => trackEvent("marketing_mayhem_audit_cta_clicked", { result })}
        >
          Book a Marketing Systems Audit
        </a>
        <a
          className="button secondary"
          href={CONSULTATION_URL}
          onClick={() => trackEvent("marketing_mayhem_consultation_cta_clicked", { result })}
        >
          Apply for a Consultation
        </a>
      </div>
    </section>
  );
}
