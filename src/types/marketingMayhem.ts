export type Archetype =
  | "zoomie_founder"
  | "sunbeam_strategist"
  | "mirror_cat"
  | "midnight_coder"
  | "treadmill_tabby";

export type AnswerOption = {
  label: string;
  archetype: Archetype;
};

export type Question = {
  id: string;
  question: string;
  answers: AnswerOption[];
};

export type ResultContent = {
  emoji: string;
  image: string;
  imageAlt: string;
  name: string;
  bottleneck: string;
  coreIssue: string;
  description: string;
  whatThisLooksLike: string[];
  whatsSlowingYouDown: string;
  whatToFixFirst: string;
  nextBestStep: string;
  ctaLabel: string;
};

export type LeadSubmission = {
  firstName: string;
  email: string;
  websiteUrl?: string;
  businessName?: string;
  newsletterOptIn: boolean;
  result: Archetype;
  resultName: string;
  answers: Archetype[];
  answerDetails: {
    questionId: string;
    question: string;
    answer: string;
    archetype: Archetype;
  }[];
  createdAt: string;
};
