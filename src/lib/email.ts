import type { LeadSubmission } from "../types/marketingMayhem";

export async function submitLead(submission: LeadSubmission) {
  try {
    const response = await fetch("/api/marketing-mayhem-meter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission)
    });

    if (!response.ok) throw new Error(`Lead endpoint returned ${response.status}`);
    return { ok: true };
  } catch (error) {
    console.error("Marketing Mayhem email delivery failed.", error);
    return { ok: false };
  }
}
