const AI_RESPONSES: Record<string, string[]> = {
  interview: [
    "Can you give me a specific example of that decision and what the outcome was?",
    "How did you communicate that decision to your team?",
    "What would you do differently if you had the chance?",
    "That's interesting. Walk me through your thought process at the time.",
    "How did you measure whether it was the right call?",
  ],
  presentation: [
    "What's the one number that proves this is working?",
    "How are you prioritizing this against everything else on the roadmap?",
    "What happens if we don't hit this target?",
    "Can you walk me through the assumptions behind this projection?",
    "What's the biggest risk to this plan, and how are you mitigating it?",
  ],
  pitch: [
    "Why are you uniquely positioned to solve this problem?",
    "What's your go-to-market strategy?",
    "How do you plan to compete with established players?",
    "What's your current traction, and how does that inform your plan?",
    "Why now? Why wasn't this solvable two years ago?",
  ],
  defense: [
    "How would your conclusions change if your core assumption is incorrect?",
    "What are the limitations of your methodology?",
    "How does your work compare to the existing literature?",
    "What practical implications do your findings have?",
    "If you had unlimited resources, what would you investigate next?",
  ],
  difficult: [
    "How do you think things are going from your perspective?",
    "What's one thing you wish I understood better about your situation?",
    "What would make it easier for you to talk about this?",
    "Is there something I'm not seeing that I should be?",
    "What's the hardest part of this that you haven't said out loud yet?",
  ],
};

export function getNextAIResponse(scenarioId: string, turnNumber: number): string {
  const responses = AI_RESPONSES[scenarioId] || AI_RESPONSES["interview"];
  const index = Math.min(turnNumber, responses.length - 1);
  return responses[index];
}

export interface MomentEvaluation {
  score: number;
  observation: string;
  /** The weakest performance dimension — used to carry focus into drills */
  dimension: string;
}

const DIMENSION_OFFSETS: { label: string; offset: number }[] = [
  { label: "Composure", offset: 4 },
  { label: "Clarity", offset: -2 },
  { label: "Specificity", offset: -8 },
  { label: "Reasoning", offset: 6 },
  { label: "Delivery", offset: -1 },
];

const clampScore = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

/**
 * Evaluate a single user turn into score + observation + weakest dimension.
 * Deterministic mock — stands in for the real engine until M5.
 */
export function evaluateMoment(content: string): MomentEvaluation {
  const { score, observation } = evaluateResponse(content);
  const length = content.trim().split(/\s+/).length;
  const hasExample =
    /\b(for example|for instance|specifically|in particular|like when)\b/i.test(
      content
    );
  const hasStructure =
    /\b(first|second|third|1\.|2\.|3\.|-|•)\b/i.test(content) ||
    /\n/i.test(content);

  let dimension = "Delivery";
  if (!hasExample) dimension = "Specificity";
  else if (length <= 20) dimension = "Clarity";
  else if (!hasStructure) dimension = "Reasoning";

  return { score, observation, dimension };
}

/**
 * Five performance dimensions derived from all user turns in a session.
 * Each dimension varies deterministically around the average turn score.
 */
export function sessionDimensions(
  userTurns: string[]
): { label: string; value: number }[] {
  if (userTurns.length === 0) {
    return DIMENSION_OFFSETS.map((d) => ({ label: d.label, value: 0 }));
  }
  const avg =
    userTurns.reduce((sum, t) => sum + evaluateResponse(t).score, 0) /
    userTurns.length;
  return DIMENSION_OFFSETS.map((d) => ({
    label: d.label,
    value: clampScore(avg + d.offset),
  }));
}

/** One-line editorial summary of how the session went. */
export function sessionSummary(avgScore: number): string {
  if (avgScore >= 80) return "You stayed composed even when pressed.";
  if (avgScore >= 65)
    return "You found your footing as the questions got harder.";
  if (avgScore >= 50)
    return "You had moments of clarity, but the pressure showed.";
  return "This rep was about survival. The next one builds.";
}

export function evaluateResponse(userResponse: string): { score: number; observation: string } {
  const length = userResponse.trim().split(/\s+/).length;
  const hasExample = /\b(for example|for instance|specifically|in particular|like when)\b/i.test(userResponse);
  const hasStructure = /\b(first|second|third|1\.|2\.|3\.|-|•)\b/i.test(userResponse) || /\n/i.test(userResponse);

  let score = 50;
  if (length > 20) score += 15;
  if (length > 50) score += 10;
  if (hasExample) score += 15;
  if (hasStructure) score += 10;

  score = Math.min(100, Math.max(0, score));

  let observation: string;
  if (score >= 80) {
    observation = "Strong, specific response with clear examples.";
  } else if (score >= 60) {
    observation = "Good direction, but could benefit from more concrete examples.";
  } else if (score >= 40) {
    observation = "You're on the right track. Try being more specific about what you did and why.";
  } else {
    observation = "This response is too general. Focus on a specific moment and walk through it step by step.";
  }

  return { score, observation };
}
