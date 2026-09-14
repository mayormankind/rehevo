import { createClient } from "@/lib/supabase/server";
import { getAIPrompt } from "@/lib/ai/openai-engine";
import type { TurnMessage } from "@/lib/ai/openai-engine";

export async function POST(request: Request) {
  // Auth — only the session owner should be able to generate prompts
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    scenarioId?: string;
    context?: string | null;
    goal?: string | null;
    difficulty?: number;
    turns?: TurnMessage[];
    isFirstQuestion?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { scenarioId, context, goal, difficulty, turns, isFirstQuestion } =
    body;

  if (!scenarioId) {
    return Response.json({ error: "scenarioId is required" }, { status: 400 });
  }

  const prompt = await getAIPrompt(
    scenarioId,
    context ?? null,
    goal ?? null,
    difficulty ?? 3,
    turns ?? [],
    isFirstQuestion ?? false
  );

  return Response.json({ prompt });
}
