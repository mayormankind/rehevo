export interface Scenario {
  id: string;
  label: string;
  title: string;
  /** Short card copy */
  description: string;
  /** Longer copy for featured cards / setup pages */
  longDescription: string;
  question: string;
  duration: string;
  image: string;
  focus: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "interview",
    label: "Interview",
    title: "Product Designer — Final Interview",
    description: "Think clearly when the questions stop being predictable.",
    longDescription:
      "Practice answering unexpected questions about your design decisions, past failures, and how you handle feedback under pressure.",
    question: "Walk me through a decision you made that didn't work out.",
    duration: "~ 42 min",
    image: "/images/hero/enter-the-room.png",
    focus: "Communication & Confidence",
  },
  {
    id: "presentation",
    label: "Presentation",
    title: "Executive Deck",
    description:
      "Practice explaining your ideas when every slide gets questioned.",
    longDescription:
      "Rehearse explaining metrics, defending choices, and handling executive-level pushback in a high-stakes presentation setting.",
    question: "What's the one metric that tells you if this quarter worked?",
    duration: "~ 45 min",
    image: "/images/hero/hero-desktop.png",
    focus: "Delivery & Structure",
  },
  {
    id: "pitch",
    label: "Pitch",
    title: "Investor Pitch",
    description: "Make the case. Handle skepticism. Stay composed.",
    longDescription:
      "Practice articulating your vision, defending your market position, and answering tough questions about traction and timing.",
    question: "Why is now the right time for this, and why are you the team?",
    duration: "~ 40 min",
    image: "/images/hero/final-cta.png",
    focus: "Reasoning & Specificity",
  },
  {
    id: "defense",
    label: "Defense",
    title: "Performance Review",
    description: "Defend your decisions without becoming defensive.",
    longDescription:
      "Practice responding to critical questions about your methodology, findings, and the limitations of your research.",
    question:
      "How would your findings change if your core assumption is wrong?",
    duration: "~ 50 min",
    image: "/images/hero/moment.png",
    focus: "Reasoning & Composure",
  },
  {
    id: "difficult",
    label: "Difficult Conversation",
    title: "Giving Difficult Feedback",
    description: "Stay clear when the conversation gets uncomfortable.",
    longDescription:
      "Practice giving constructive feedback, addressing underperformance, and handling emotional reactions with composure.",
    question: "How do you think things are going, from your perspective?",
    duration: "~ 30 min",
    image: "/images/hero/the-reflection-bg.png",
    focus: "Clarity & Composure",
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
