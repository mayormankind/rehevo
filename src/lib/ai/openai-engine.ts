/**
 * Server-only AI engine — calls OpenAI for real prompt generation and
 * turn evaluation. Never import this from client components; use the
 * /api/ai/turn route instead for client-side needs.
 *
 * Falls back to mock-engine if OPENAI_API_KEY is missing or the call fails,
 * so the app stays functional in development without a key.
 */
import OpenAI from "openai";
import { getScenario } from "@/lib/constants/scenarios";
import { evaluateMoment, getNextAIResponse } from "./mock-engine";

// ---------------------------------------------------------------------------
// Client factory — lazy so the key is only read server-side
// ---------------------------------------------------------------------------

const getClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
  return new OpenAI({ apiKey });
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TurnMessage {
  role: "user" | "ai";
  content: string;
}

export interface TurnEvaluation {
  score: number;
  dimensions: { label: string; value: number }[];
  observation: string;
  /** Weakest performance dimension — used to target drills */
  dimension: string;
}

// ---------------------------------------------------------------------------
// Prompt generation
// ---------------------------------------------------------------------------

const DIFFICULTY_TONE: Record<number, string> = {
  1: "Be open and supportive. Ask accessible questions at a calm pace.",
  2: "Ask focused questions with moderate follow-through.",
  3: "Be challenging but fair. Probe deeper. Push back lightly on vague answers.",
  4: "Be direct and demanding. Press for specifics. Don't accept generalisations.",
  5: "Be intense and relentless. Challenge every assumption. Hard follow-ups only.",
};

const COUNTERPART: Record<string, string> = {
  interview: "interviewer",
  presentation: "senior executive",
  pitch: "skeptical investor",
  defense: "thesis committee member",
  difficult: "direct report",
};

/**
 * Generate the next AI question in the rehearsal using GPT-4o-mini.
 * Server-only — called from API routes or Server Components.
 */
export async function getAIPrompt(
  scenarioId: string,
  context: string | null,
  goal: string | null,
  difficulty: number,
  turns: TurnMessage[],
  isFirstQuestion: boolean
): Promise<string> {
  const scenario = getScenario(scenarioId);
  const tone = DIFFICULTY_TONE[difficulty] ?? DIFFICULTY_TONE[3];
  const counterpart = COUNTERPART[scenarioId] ?? "counterpart";

  const systemLines = [
    `You are a ${counterpart} in a high-stakes rehearsal.`,
    scenario?.title ? `Scenario: ${scenario.title}.` : "",
    context ? `Context: "${context}".` : "",
    goal ? `Their goal: "${goal}".` : "",
    `Difficulty ${difficulty}/5: ${tone}`,
    "",
    isFirstQuestion
      ? "Open the session with one strong, direct question."
      : "Ask one concise follow-up that builds on what was just said.",
    "",
    "Rules: one question only, no preamble, no labels, sound like a real person.",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const client = getClient();
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemLines },
        ...turns.map((t) => ({
          role: t.role === "ai" ? ("assistant" as const) : ("user" as const),
          content: t.content,
        })),
      ],
      max_tokens: 120,
      temperature: 0.85,
    });

    const text = result.choices[0]?.message?.content?.trim();
    if (text) return text;
    throw new Error("Empty OpenAI response");
  } catch {
    // Graceful fallback — mock engine keeps the room functional
    const aiTurnIndex = turns.filter((t) => t.role === "ai").length;
    return getNextAIResponse(scenarioId, aiTurnIndex);
  }
}

// ---------------------------------------------------------------------------
// Turn evaluation
// ---------------------------------------------------------------------------

const EVALUATION_PROMPT = (
  scenarioTitle: string,
  prompt: string,
  response: string
) => `Evaluate this rehearsal response. Return ONLY valid JSON — no markdown.

Scenario: ${scenarioTitle}
Question: "${prompt}"
Response: "${response}"

Score each dimension 0–100. Calibrate honestly: 55–75 is typical, 80+ is genuinely strong, 90+ is exceptional.
Return this exact shape:
{
  "score": <overall 0-100>,
  "dimensions": [
    {"label": "Composure", "value": <0-100>},
    {"label": "Clarity", "value": <0-100>},
    {"label": "Specificity", "value": <0-100>},
    {"label": "Reasoning", "value": <0-100>},
    {"label": "Delivery", "value": <0-100>}
  ],
  "observation": "<one specific sentence: the single most important thing to improve or reinforce>",
  "dimension": "<label of the weakest dimension>"
}`;

/**
 * Evaluate a user turn using GPT-4o-mini.
 * Server-only — called from Server Components or API routes.
 */
export async function evaluateTurn(
  scenarioId: string,
  prompt: string,
  response: string
): Promise<TurnEvaluation> {
  const scenario = getScenario(scenarioId);
  const scenarioTitle = scenario?.title ?? scenarioId;

  try {
    const client = getClient();
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: EVALUATION_PROMPT(scenarioTitle, prompt, response),
        },
      ],
      max_tokens: 350,
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const text = result.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(text);

    const clamp = (n: unknown) =>
      Math.min(100, Math.max(0, Math.round(Number(n) || 0)));

    const dimensions: { label: string; value: number }[] = Array.isArray(
      parsed.dimensions
    )
      ? parsed.dimensions.map((d: { label: unknown; value: unknown }) => ({
          label: String(d.label ?? ""),
          value: clamp(d.value),
        }))
      : [];

    if (!parsed.score || dimensions.length === 0 || !parsed.observation) {
      throw new Error("Incomplete evaluation response");
    }

    return {
      score: clamp(parsed.score),
      dimensions,
      observation: String(parsed.observation),
      dimension: String(parsed.dimension ?? dimensions[0]?.label ?? "Specificity"),
    };
  } catch {
    // Fallback to mock so reflection never breaks
    const mock = evaluateMoment(response);
    // Synthesise the five dimensions from the mock score
    const base = mock.score;
    const offsets: [string, number][] = [
      ["Composure", 4], ["Clarity", -2], ["Specificity", -8],
      ["Reasoning", 6], ["Delivery", -1],
    ];
    const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));
    return {
      ...mock,
      dimensions: offsets.map(([label, off]) => ({
        label,
        value: clamp(base + off),
      })),
    };
  }
}
