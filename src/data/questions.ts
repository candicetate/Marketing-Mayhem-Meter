import type { Question } from "../types/marketingMayhem";

export const questions: Question[] = [
  {
    id: "q1",
    question: "What feels most true about your marketing right now?",
    answers: [
      { label: "I have too many ideas and keep changing direction.", archetype: "zoomie_founder" },
      { label: "I know I need to be more visible, but I hesitate.", archetype: "sunbeam_strategist" },
      { label: "I keep refining things instead of putting them out there.", archetype: "mirror_cat" },
      { label: "I have tools and systems, but they are not creating enough traction.", archetype: "midnight_coder" },
      { label: "I am constantly promoting, posting, and manually pushing things along.", archetype: "treadmill_tabby" }
    ]
  },
  {
    id: "q2",
    question: "When marketing feels hard, what do you usually do?",
    answers: [
      { label: "Start a new idea, offer, campaign, or content direction.", archetype: "zoomie_founder" },
      { label: "Pull back because I do not want to sound pushy or annoying.", archetype: "sunbeam_strategist" },
      { label: "Edit, polish, rewrite, redesign, or rethink it.", archetype: "mirror_cat" },
      { label: "Fix the backend, tweak the funnel, or organize the tech.", archetype: "midnight_coder" },
      { label: "Work harder and try to manually create momentum.", archetype: "treadmill_tabby" }
    ]
  },
  {
    id: "q3",
    question: "What would make the biggest difference in your marketing right now?",
    answers: [
      { label: "Narrowing my focus.", archetype: "zoomie_founder" },
      { label: "Getting clearer and more confident in my message.", archetype: "sunbeam_strategist" },
      { label: "Publishing what I already have.", archetype: "mirror_cat" },
      { label: "Getting more traffic into the system.", archetype: "midnight_coder" },
      { label: "Automating and simplifying my follow-up.", archetype: "treadmill_tabby" }
    ]
  },
  {
    id: "q4",
    question: "What is your most common marketing pattern?",
    answers: [
      { label: "I get excited, start strong, then move on too soon.", archetype: "zoomie_founder" },
      { label: "I know what I do, but I struggle to say it clearly and consistently.", archetype: "sunbeam_strategist" },
      { label: "I get close to launching, then decide it needs more work.", archetype: "mirror_cat" },
      { label: "I keep improving the setup, but not enough people are seeing it.", archetype: "midnight_coder" },
      { label: "I can make things happen, but only if I stay actively involved.", archetype: "treadmill_tabby" }
    ]
  },
  {
    id: "q5",
    question: "What kind of advice would probably annoy you because it is too accurate?",
    answers: [
      { label: "Pick one thing and stick with it longer.", archetype: "zoomie_founder" },
      { label: "You are allowed to be clearer about why people should hire you.", archetype: "sunbeam_strategist" },
      { label: "It is good enough. Publish it.", archetype: "mirror_cat" },
      { label: "Stop tweaking the machine and send traffic into it.", archetype: "midnight_coder" },
      { label: "You need a system that does not rely on your daily energy.", archetype: "treadmill_tabby" }
    ]
  },
  {
    id: "q6",
    question: "Where do leads currently come from most often?",
    answers: [
      { label: "Random bursts when I am excited about something new.", archetype: "zoomie_founder" },
      { label: "Mostly referrals or people who already know me.", archetype: "sunbeam_strategist" },
      { label: "They do not come consistently because I am still getting things ready.", archetype: "mirror_cat" },
      { label: "I have a funnel or website, but not enough traffic going into it.", archetype: "midnight_coder" },
      { label: "From my direct effort: posting, DMing, following up, networking, launching.", archetype: "treadmill_tabby" }
    ]
  },
  {
    id: "q7",
    question: "What would feel like the biggest relief?",
    answers: [
      { label: "Having fewer active ideas and a clearer plan.", archetype: "zoomie_founder" },
      { label: "Knowing exactly what to say and how to say it.", archetype: "sunbeam_strategist" },
      { label: "Finally launching without spiralling into edits.", archetype: "mirror_cat" },
      { label: "Knowing which part of my system actually needs attention.", archetype: "midnight_coder" },
      { label: "Having marketing that works even when I am not manually pushing.", archetype: "treadmill_tabby" }
    ]
  }
];
