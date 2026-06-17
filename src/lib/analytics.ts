import type { Archetype } from "../types/marketingMayhem";

export type MarketingMayhemEvent =
  | "marketing_mayhem_started"
  | "marketing_mayhem_question_answered"
  | "marketing_mayhem_completed"
  | "marketing_mayhem_lead_submitted"
  | "marketing_mayhem_result_viewed"
  | "marketing_mayhem_audit_cta_clicked"
  | "marketing_mayhem_consultation_cta_clicked";

export function trackEvent(
  eventName: MarketingMayhemEvent,
  payload: { result?: Archetype; questionId?: string; answerArchetype?: Archetype } = {}
) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
}
