import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DrillClient from "@/components/rehevo/drill-client";
import { evaluateMoment, getNextAIResponse } from "@/lib/ai/mock-engine";
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
  const {
    data,
  } = await supabase.auth.getClaims();

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

  // Resolve the moment to drill — the requested turn, or the weakest one.
  const requested = Number(moment);
  let target = Number.isFinite(requested)
    ? userTurns.find((t) => t.turn_number === requested)
    : undefined;
  if (!target) {
    target = userTurns
      .map((t) => ({ t, score: evaluateMoment(t.content).score }))
      .reduce((a, b) => (b.score < a.score ? b : a)).t;
  }

  const promptTurn = [...allTurns]
    .reverse()
    .find((t) => t.role === "ai" && t.turn_number < target.turn_number);
  const prompt = promptTurn?.content ?? scenario?.question ?? "";

  // The follow-up the counterpart would naturally ask next.
  const questionIndex = allTurns.filter(
    (t) => t.role === "ai" && t.turn_number < target.turn_number
  ).length;
  const retryPrompt = getNextAIResponse(
    session.scenario_id,
    Math.min(questionIndex + 1, 4)
  );

  const original = evaluateMoment(target.content);

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

  // Other moments available for "try another moment".
  const otherMoments = userTurns
    .filter((t) => t.turn_number !== target.turn_number)
    .map((t) => ({
      turnNumber: t.turn_number,
      score: evaluateMoment(t.content).score,
    }))
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
