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
    email: {
      intro: [
        "You are not short on ideas.",
        "That is the good news.",
        "The slightly chaotic news? Your ideas may be moving faster than your marketing system can keep up with."
      ],
      whatItLooksLike: [
        "You may be starting new offers, rewriting your messaging, testing different platforms, changing your content plan, or getting excited about a new direction before the last one had enough time to work.",
        "When every idea feels urgent, your marketing starts to scatter. Instead of building momentum, you end up with half-finished funnels, inconsistent content, unclear offers, and a lot of \"wait, what was I doing again?\" energy."
      ],
      doingWell: [
        "Your creativity is a real asset.",
        "You can spot opportunities, generate angles, see possibilities, and imagine new ways to reach people. That is not something to squash. It is something to support with a better system."
      ],
      fixFirst: [
        "Choose one core offer, one main traffic channel, and one conversion path.",
        "Then give the system enough time to gather real signal before you change it.",
        "Your next move is not more ideas.",
        "It is creating a simple structure that helps your best ideas actually work."
      ],
      nextStep: [
        "Book a Marketing Systems Audit.",
        "We will look at your offers, content, funnel, website, and lead capture to find where the chaos is happening and what needs to be simplified first.",
        "If your brain has 47 tabs open and your marketing is trying to follow all of them, this is where we clean it up."
      ]
    },
    whatsSlowingYouDown: "Your ideas are outrunning your infrastructure.",
    whatToFixFirst:
      "Choose one core offer, one main traffic channel, and one conversion path. Let the system run long enough to gather signal before you change it.",
    nextBestStep:
      "Book a Marketing Systems Audit so we can stabilize your best ideas and turn them into a system that actually compounds."
  },
  sunbeam_strategist: {
    emoji: "\u{2600}\u{FE0F}",
    name: "Sunbeam Strategist",
    bottleneck: "Strategy without enough movement",
    email: {
      intro: [
        "You can see the potential.",
        "You probably have thoughtful ideas, strong instincts, and a pretty good sense of what your marketing could become.",
        "The problem is that your strategy may be staying in the thinking, planning, mapping, researching, and \"let me just figure out one more thing\" stage for too long."
      ],
      whatItLooksLike: [
        "You may be waiting for the right plan, the right words, the right offer structure, the right funnel, the right platform, or the right moment to finally put things into motion.",
        "You do not want to waste time doing random marketing. That makes sense.",
        "But when strategy never turns into a clear system, your best ideas stay warm and cozy in planning mode instead of doing their job out in the world."
      ],
      doingWell: [
        "You are being intentional.",
        "You are not throwing spaghetti at the wall just to say you did something. You care about making smart decisions, building something sustainable, and creating marketing that actually makes sense.",
        "That instinct is valuable.",
        "It just needs a clearer bridge between strategy and implementation."
      ],
      fixFirst: [
        "Choose the smallest strategic move that would create momentum.",
        "That might be clarifying one offer, publishing one core message, setting up one lead capture path, or creating one repeatable content rhythm.",
        "Do not try to solve the whole marketing ecosystem at once.",
        "Start with the piece that would make everything else easier."
      ],
      nextStep: [
        "Book a Marketing Systems Audit.",
        "We will look at what you already have, where the strategy is getting stuck, and what needs to be prioritized first so your marketing can actually move.",
        "If your marketing has been sitting in the sun thinking about becoming a system, this is where we nudge it into action."
      ]
    },
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
    email: {
      intro: [
        "You care about getting it right.",
        "That is a strength.",
        "But when \"getting it right\" turns into constantly tweaking, second-guessing, rewriting, refining, and waiting until everything feels perfect, your marketing can get stuck before it ever reaches the people who need it."
      ],
      whatItLooksLike: [
        "You may have drafts sitting in folders, offers that are almost ready, website copy you keep reworking, or content ideas you never post because they do not feel polished enough yet.",
        "You may also spend a lot of time in revision mode, trying to make your marketing clearer, smarter, prettier, stronger, more strategic, or more \"you\" before anyone sees it.",
        "That can feel productive, but it often delays the feedback you actually need."
      ],
      doingWell: [
        "You have standards.",
        "You care about quality, clarity, and how your business is perceived. That matters.",
        "Your thoughtful eye is not the problem.",
        "The problem is when polishing becomes the place your marketing goes to nap forever."
      ],
      fixFirst: [
        "Create a minimum viable marketing rhythm.",
        "Pick one offer, one message, and one simple content cadence you can actually maintain.",
        "Then publish, learn, and refine based on real feedback instead of imagined criticism.",
        "Your marketing does not need to be flawless to work.",
        "It needs to be clear, useful, and visible."
      ],
      nextStep: [
        "Book a Marketing Systems Audit.",
        "We will look at where your marketing is getting stuck, what actually needs refinement, and what is ready to go live now.",
        "If your content is trapped in the \"almost ready\" zone, this is where we get it moving."
      ]
    },
    whatsSlowingYouDown: "Perfecting has replaced promoting.",
    whatToFixFirst:
      "Use a stopping rule. If the offer is clear, the outcome is obvious, and the next step is easy, it is ready to go live.",
    nextBestStep:
      "Book a Marketing Systems Audit so we can identify what actually needs refinement and what simply needs to be shipped."
  },
  midnight_coder: {
    emoji: "\u{1F319}",
    name: "Midnight Coder",
    bottleneck: "Building, fixing, and tweaking instead of clarifying the marketing path",
    email: {
      intro: [
        "You are not afraid to get into the weeds.",
        "You will fix the form, rebuild the page, test the tool, adjust the automation, compare platforms, rename the tags, reorganize the backend, and somehow end up troubleshooting something at 12:47 a.m. that was definitely supposed to be \"quick.\""
      ],
      whatItLooksLike: [
        "You may be spending a lot of time on tools, tech, automations, platforms, integrations, templates, plugins, or backend details.",
        "Some of that work matters.",
        "But if the offer, message, audience, and conversion path are not clear, better tech will not fix the bigger problem.",
        "That can make your marketing feel productive without actually making it more effective."
      ],
      doingWell: [
        "You are resourceful.",
        "You are willing to learn, test, build, improve, and solve problems. That is powerful, especially when your business needs tools that actually support how you work.",
        "Your ability to figure things out is not the issue.",
        "The issue is when the tools start leading the strategy instead of supporting it."
      ],
      fixFirst: [
        "Map the simplest version of your marketing path.",
        "What is the offer?",
        "Who is it for?",
        "Where are people finding you?",
        "What do they need to understand before they trust you?",
        "What action should they take next?",
        "Once that path is clear, then the tech can support it."
      ],
      nextStep: [
        "Book a Marketing Systems Audit.",
        "We will look at your marketing tools, website, lead capture, email follow-up, and conversion path to find what is helping, what is overcomplicating things, and what needs to be simplified first.",
        "If your marketing system has become a late-night tech puzzle, this is where we turn it back into a clear path to clients."
      ]
    },
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
    email: {
      intro: [
        "You are doing a lot.",
        "Possibly too much."
      ],
      whatItLooksLike: [
        "You may be showing up, posting, replying, following up, tweaking, promoting, checking in, and trying to keep everything moving by sheer force of will.",
        "When your marketing depends entirely on your daily energy, your business starts to feel like a treadmill.",
        "The second you slow down, everything slows down with you.",
        "Your marketing may technically be \"working,\" but only because you are constantly pushing it forward."
      ],
      doingWell: [
        "You are committed.",
        "You care about your business, your clients, and your follow-through. You are willing to show up and do the work, which is a strength a lot of people underestimate.",
        "The problem is not your effort.",
        "The problem is that too much depends on your effort."
      ],
      fixFirst: [
        "Identify the parts of your marketing that repeat.",
        "Then start turning them into reusable assets, automations, templates, and workflows.",
        "You do not need to remove the human part of your marketing.",
        "You need to stop making yourself the engine for every single step."
      ],
      nextStep: [
        "Book a Marketing Systems Audit.",
        "We will look at what you are currently doing manually, what can be simplified, and where systems can help you create more consistency without adding more to your plate.",
        "If your marketing only works when you are actively pushing it, this is where we build something sturdier."
      ]
    },
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
  const userText = buildUserEmailText(submission.firstName.trim(), result);

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
      html: emailHtml(buildUserEmailHtml(firstName, result))
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

function buildUserEmailText(firstName, result) {
  return [
    `Hi ${firstName},`,
    "",
    "Your Marketing Mayhem Type is:",
    "",
    `${result.emoji} ${result.name}`,
    "",
    "Your bottleneck is:",
    "",
    result.bottleneck,
    "",
    ...sectionText(result.email.intro),
    "What it looks like:",
    "",
    ...sectionText(result.email.whatItLooksLike),
    "What you are doing well:",
    "",
    ...sectionText(result.email.doingWell),
    "What to fix first:",
    "",
    ...sectionText(result.email.fixFirst),
    "Your next best step:",
    "",
    ...sectionText(result.email.nextStep),
    "Book your Marketing Systems Audit",
    AUDIT_URL,
    "",
    "Candice",
    "Clever Calicco"
  ].join("\n");
}

function buildUserEmailHtml(firstName, result) {
  return `
    <p>Hi ${firstName},</p>
    <p style="margin-bottom:6px;">Your Marketing Mayhem Type is:</p>
    <p style="font-size:24px;font-weight:800;margin-top:0;">${result.emoji} ${escapeText(result.name)}</p>
    <p style="margin-bottom:6px;">Your bottleneck is:</p>
    <p style="font-size:20px;font-weight:800;margin-top:0;">${escapeText(result.bottleneck)}</p>
    ${paragraphsHtml(result.email.intro)}
    ${sectionHtml("What it looks like:", result.email.whatItLooksLike)}
    ${sectionHtml("What you are doing well:", result.email.doingWell)}
    ${sectionHtml("What to fix first:", result.email.fixFirst)}
    ${sectionHtml("Your next best step:", result.email.nextStep)}
    <p style="margin:28px 0;">
      <a href="${AUDIT_URL}" style="display:inline-block;background:#086bb9;color:#ffffff;text-decoration:none;font-weight:800;padding:13px 18px;border-radius:8px;">
        Book your Marketing Systems Audit
      </a>
    </p>
    <p>Candice<br>Clever Calicco</p>
  `;
}

function sectionText(paragraphs) {
  return paragraphs.flatMap((paragraph) => [paragraph, ""]);
}

function paragraphsHtml(paragraphs) {
  return paragraphs.map((paragraph) => `<p>${escapeText(paragraph)}</p>`).join("");
}

function sectionHtml(title, paragraphs) {
  return `<h2>${escapeText(title)}</h2>${paragraphsHtml(paragraphs)}`;
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
  <body style="margin:0;padding:24px;background:#fff8df;color:#000;font-family:Arial,sans-serif;line-height:1.6;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #d9ecfb;border-radius:8px;padding:28px;">
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
