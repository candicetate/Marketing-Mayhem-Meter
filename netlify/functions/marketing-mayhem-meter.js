const AUDIT_URL =
  process.env.AUDIT_URL || "https://calendly.com/candice-tate/marketing-systems-audit";
const CONSULTATION_URL =
  process.env.CONSULTATION_URL || "https://clients.clevercalic.co/public/apply-for-a-consultation";
const INTERNAL_LEAD_EMAIL = process.env.INTERNAL_LEAD_EMAIL || "hello@clevercalic.co";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Clever Calicco <hello@clevercalic.co>";

const archetypes = [
  "zoomie_founder",
  "sunbeam_strategist",
  "mirror_cat",
  "midnight_coder",
  "treadmill_tabby"
];

const results = {
  zoomie_founder: {
    emoji: "\u{1F43E}",
    name: "Zoomie Founder",
    bottleneck: "Chaos from too many ideas",
    whatsSlowingYouDown: "Your ideas are outrunning your infrastructure.",
    whatToFixFirst:
      "Choose one core offer, one main traffic channel, and one conversion path. Let the system run long enough to gather signal before you change it.",
    nextBestStep:
      "Book a Marketing Systems Audit so we can stabilize your best ideas and turn them into a system that actually compounds."
  },
  sunbeam_strategist: {
    emoji: "\u{1F324}",
    name: "Sunbeam Strategist",
    bottleneck: "Under-visibility from hesitation",
    whatsSlowingYouDown: "Your marketing is not weak. It is under-positioned.",
    whatToFixFirst:
      "Tighten the problem you solve, sharpen the outcome, and make your next step unmistakably clear.",
    nextBestStep:
      "Book a consultation so we can clarify your positioning and help the right people understand why they should hire you."
  },
  mirror_cat: {
    emoji: "\u{1FAA9}",
    name: "Mirror Cat",
    bottleneck: "Perfecting instead of publishing",
    whatsSlowingYouDown: "Perfecting has replaced promoting.",
    whatToFixFirst:
      "Use a stopping rule. If the offer is clear, the outcome is obvious, and the next step is easy, it is ready to go live.",
    nextBestStep:
      "Book a Marketing Systems Audit so we can identify what actually needs refinement and what simply needs to be shipped."
  },
  midnight_coder: {
    emoji: "\u{1F319}",
    name: "Midnight Coder",
    bottleneck: "Overbuilding tech instead of marketing",
    whatsSlowingYouDown: "You are optimizing infrastructure before you have enough traction.",
    whatToFixFirst:
      "Choose one traffic lever, one conversion path, and one nurture sequence. Then stop rebuilding and start sending people through it.",
    nextBestStep:
      "Book a consultation so we can pressure-test your marketing stack and make sure your systems are actually supporting growth."
  },
  treadmill_tabby: {
    emoji: "\u{1F43E}",
    name: "Treadmill Tabby",
    bottleneck: "Manual hustle dependency",
    whatsSlowingYouDown: "Your marketing depends too much on daily founder energy.",
    whatToFixFirst:
      "Build one predictable lead system: one clear entry point, one automated nurture sequence, and one consistent conversion path.",
    nextBestStep:
      "Book a Marketing Systems Audit so we can reduce manual pressure and build marketing that carries more weight."
  }
};

const groupEnvByResult = {
  zoomie_founder: "MAILERLITE_GROUP_ID_ZOOMIE_FOUNDER",
  sunbeam_strategist: "MAILERLITE_GROUP_ID_SUNBEAM_STRATEGIST",
  mirror_cat: "MAILERLITE_GROUP_ID_MIRROR_CAT",
  midnight_coder: "MAILERLITE_GROUP_ID_MIDNIGHT_CODER",
  treadmill_tabby: "MAILERLITE_GROUP_ID_TREADMILL_TABBY"
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, {});
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  let submission;
  try {
    submission = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body." });
  }

  const validationError = validateSubmission(submission);
  if (validationError) {
    return jsonResponse(400, { error: validationError });
  }

  const result = results[submission.result] || results.treadmill_tabby;
  const emailPayloads = buildEmails(submission, result);

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return jsonResponse(503, { ok: false, error: "Email service is not configured." });
  }

  const delivery = await Promise.allSettled([
    sendResendEmail(emailPayloads.user),
    sendResendEmail(emailPayloads.internal)
  ]);

  const emailFailed = delivery.some((item) => item.status === "rejected");
  if (emailFailed) {
    console.error("Resend delivery failed.", delivery);
    return jsonResponse(502, { ok: false, error: "Email delivery failed." });
  }

  const mailerLiteResult = await upsertMailerLiteSubscriber(submission, result);
  if (!mailerLiteResult.ok) {
    console.error("MailerLite sync failed.", mailerLiteResult.error);
  }

  return jsonResponse(200, {
    ok: true,
    mailerLiteSynced: mailerLiteResult.ok
  });
};

function validateSubmission(submission) {
  if (!submission.firstName || typeof submission.firstName !== "string") {
    return "First name is required.";
  }

  if (!submission.email || typeof submission.email !== "string" || !isEmail(submission.email)) {
    return "Valid email is required.";
  }

  if (!archetypes.includes(submission.result)) {
    return "Valid result is required.";
  }

  if (!Array.isArray(submission.answers) || submission.answers.length !== 7) {
    return "Seven quiz answers are required.";
  }

  if (!submission.answers.every((answer) => archetypes.includes(answer))) {
    return "Quiz answers contain an unknown result type.";
  }

  return "";
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function buildEmails(submission, result) {
  const firstName = escapeText(submission.firstName.trim());
  const userText = `Hi ${submission.firstName.trim()},

Your Marketing Mayhem Type is: ${result.emoji} ${result.name}

Your bottleneck:
${result.bottleneck}

What's actually slowing you down:
${result.whatsSlowingYouDown}

What to fix first:
${result.whatToFixFirst}

Your next best step:
${result.nextBestStep}

Want help turning this into a clear, connected marketing system?

Book a Marketing Systems Audit:
${AUDIT_URL}

Or apply for a consultation:
${CONSULTATION_URL}

Candice
Clever Calicco`;

  const internalText = `New Marketing Mayhem Meter submission

Name: ${submission.firstName}
Email: ${submission.email}
Business Name: ${submission.businessName || ""}
Website: ${submission.websiteUrl || ""}
Newsletter Opt-in: ${submission.newsletterOptIn ? "Yes" : "No"}

Result: ${result.emoji} ${result.name}
Bottleneck: ${result.bottleneck}

Answers:
${submission.answers.map((answer, index) => `Question ${index + 1}: ${answer}`).join("\n")}

Submitted at: ${submission.createdAt || new Date().toISOString()}`;

  return {
    user: {
      from: RESEND_FROM_EMAIL,
      to: [submission.email.trim()],
      subject: "Your Marketing Mayhem Meter result is here",
      text: userText,
      html: emailHtml(`
        <p>Hi ${firstName},</p>
        <p>Your Marketing Mayhem Type is: <strong>${result.emoji} ${escapeText(result.name)}</strong></p>
        <h2>Your bottleneck:</h2>
        <p>${escapeText(result.bottleneck)}</p>
        <h2>What's actually slowing you down:</h2>
        <p>${escapeText(result.whatsSlowingYouDown)}</p>
        <h2>What to fix first:</h2>
        <p>${escapeText(result.whatToFixFirst)}</p>
        <h2>Your next best step:</h2>
        <p>${escapeText(result.nextBestStep)}</p>
        <p>Want help turning this into a clear, connected marketing system?</p>
        <p><a href="${AUDIT_URL}">Book a Marketing Systems Audit</a></p>
        <p><a href="${CONSULTATION_URL}">Apply for a consultation</a></p>
        <p>Candice<br>Clever Calicco</p>
      `)
    },
    internal: {
      from: RESEND_FROM_EMAIL,
      to: [INTERNAL_LEAD_EMAIL],
      subject: `New Marketing Mayhem Meter Lead: ${result.name}`,
      text: internalText,
      html: emailHtml(`<pre>${escapeText(internalText)}</pre>`)
    }
  };
}

async function sendResendEmail(payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend returned ${response.status}: ${body}`);
  }

  return response.json();
}

async function upsertMailerLiteSubscriber(submission, result) {
  if (!process.env.MAILERLITE_API_KEY || !submission.newsletterOptIn) {
    return { ok: true, skipped: true };
  }

  const groups = getMailerLiteGroups(submission.result);
  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      email: submission.email.trim(),
      fields: {
        name: submission.firstName.trim(),
        business_name: submission.businessName || "",
        website_url: submission.websiteUrl || "",
        marketing_mayhem_result: submission.result,
        marketing_mayhem_result_name: result.name,
        marketing_mayhem_newsletter_opt_in: submission.newsletterOptIn ? "yes" : "no",
        marketing_mayhem_answers: submission.answers.join(",")
      },
      groups,
      status: submission.newsletterOptIn ? "active" : undefined
    })
  });

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  return { ok: true };
}

function getMailerLiteGroups(result) {
  return [
    process.env.MAILERLITE_GROUP_ID,
    process.env[groupEnvByResult[result]]
  ].filter(Boolean);
}

function emailHtml(content) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#fff8df;color:#000;font-family:Arial,sans-serif;line-height:1.55;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #d9ecfb;border-radius:8px;padding:24px;">
      ${content}
    </div>
  </body>
</html>`;
}

function escapeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: statusCode === 204 ? "" : JSON.stringify(body)
  };
}
