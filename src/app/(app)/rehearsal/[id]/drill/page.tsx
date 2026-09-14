import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DrillClient from "@/components/rehevo/drill-client";
import { getNextAIResponse } from "@/lib/ai/mock-engine";
import { evaluateTurn } from "@/lib/ai/openai-engine";
import { getScenario } from "@/lib/constants/scenarios";

export const metadata: Metadata = {
  title: "Drill — REHEVO",
};

export default async function DrillPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ moment?: string }>;
}) {
  const { id } = await params;
  const { moment } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  const { data: session } = await supabase
    .from("rehearsal_sessions")
    .select("*")
    .eq("id", id)
    .eq("user_id", data.claims.sub)
    .single();

  if (!session) {
    redirect("/dashboard");
  }

  const { data: turns } = await supabase
    .from("rehearsal_turns")
    .select("*")
    .eq("session_id", id)
    .order("turn_number", { ascending: true });

  const allTurns = turns ?? [];
  const userTurns = allTurns.filter((t) => t.role === "user");

  if (userTurns.length === 0) {
    redirect(`/rehearsal/${id}/review`);
  }

  const scenario = getScenario(session.scenario_id);

  // Evaluate all user turns in parallel to find the weakest (for fallback)
  const evaluated = await Promise.all(
    userTurns.map(async (t) => {
      const promptTurn = [...allTurns]
        .reverse()
        .find((p) => p.role === "ai" && p.turn_number < t.turn_number);
      const prompt = promptTurn?.content ?? scenario?.question ?? "";
      const evaluation = await evaluateTurn(session.scenario_id, prompt, t.content);
      return { t, prompt, evaluation };
    })
  );

  // Resolve the moment to drill — requested turn or weakest by score
  const requested = Number(moment);
  let targetEntry = Number.isFinite(requested)
    ? evaluated.find((e) => e.t.turn_number === requested)
    : undefined;
  if (!targetEntry) {
    targetEntry = evaluated.reduce((a, b) =>
      b.evaluation.score < a.evaluation.score ? b : a
    );
  }

  const { t: target, prompt, evaluation: original } = targetEntry;

  // Retry prompt: AI follow-up contextual to the original moment.
  // Uses mock engine for the follow-up question — will upgrade to real AI in M5.5.
  const questionIndex = allTurns.filter(
    (t) => t.role === "ai" && t.turn_number < target.turn_number
  ).length;
  const retryPrompt = getNextAIResponse(
    session.scenario_id,
    Math.min(questionIndex + 1, 4)
  );

  const startedAt = session.started_at
    ? new Date(session.started_at).getTime()
    : null;
  const secs = startedAt
    ? Math.max(
        0,
        Math.round((new Date(target.created_at).getTime() - startedAt) / 1000)
      )
    : target.turn_number * 45;
  const timestamp = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  // Other moments for "try another moment" — sorted weakest first
  const otherMoments = evaluated
    .filter((e) => e.t.turn_number !== target.turn_number)
    .map((e) => ({ turnNumber: e.t.turn_number, score: e.evaluation.score }))
    .sort((a, b) => a.score - b.score);

  return (
    <DrillClient
      sessionId={id}
      scenarioId={session.scenario_id}
      originalPrompt={prompt}
      retryPrompt={retryPrompt}
      originalResponse={target.content}
      originalScore={original.score}
      originalObservation={original.observation}
      dimension={original.dimension}
      timestamp={timestamp}
      otherMoments={otherMoments}
    />
  );
}
