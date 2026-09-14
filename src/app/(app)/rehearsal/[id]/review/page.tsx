import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { sessionSummary } from "@/lib/ai/mock-engine";
import { evaluateTurn } from "@/lib/ai/openai-engine";
import { getScenario } from "@/lib/constants/scenarios";
import { ReflectionClient, ReflectionMoment } from "@/components/product/reflection-client";

export const metadata: Metadata = {
  title: "Reflection — REHEVO",
};

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  const scenario = getScenario(session.scenario_id);
  const allTurns = turns ?? [];
  const userTurns = allTurns.filter((t) => t.role === "user");

  const startedAt = session.started_at
    ? new Date(session.started_at).getTime()
    : null;

  const timestampFor = (turn: (typeof allTurns)[number], index: number) => {
    if (startedAt) {
      const secs = Math.max(
        0,
        Math.round((new Date(turn.created_at).getTime() - startedAt) / 1000)
      );
      return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
    }
    const secs = index * 45;
    return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  };

  // Evaluate all user turns in parallel with real AI (falls back to mock)
  const evaluated = await Promise.all(
    userTurns.map(async (turn) => {
      const promptTurn = [...allTurns]
        .reverse()
        .find((t) => t.role === "ai" && t.turn_number < turn.turn_number);
      const prompt = promptTurn?.content ?? scenario?.question ?? "";
      const evaluation = await evaluateTurn(session.scenario_id, prompt, turn.content);
      return { turn, prompt, evaluation };
    })
  );

  const moments: ReflectionMoment[] = evaluated.map(({ turn, prompt, evaluation }) => ({
    turnNumber: turn.turn_number,
    timestamp: timestampFor(turn, turn.turn_number),
    prompt,
    response: turn.content,
    score: evaluation.score,
    observation: evaluation.observation,
    dimension: evaluation.dimension,
  }));

  // The moment most worth revisiting — lowest scoring.
  const important =
    moments.length > 0
      ? moments.reduce((a, b) => (b.score < a.score ? b : a))
      : null;

  // Session-level dimensions: average each dim across all turns.
  const dimensions = (() => {
    if (evaluated.length === 0) return [];
    const acc: Record<string, number[]> = {};
    for (const { evaluation } of evaluated) {
      for (const d of evaluation.dimensions) {
        if (!acc[d.label]) acc[d.label] = [];
        acc[d.label].push(d.value);
      }
    }
    return Object.entries(acc).map(([label, values]) => ({
      label,
      value: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
    }));
  })();

  const avg =
    moments.length > 0
      ? moments.reduce((s, m) => s + m.score, 0) / moments.length
      : 0;

  // Session duration
  let duration: string | null = null;
  const endAt = session.completed_at
    ? new Date(session.completed_at).getTime()
    : allTurns.length > 0
      ? new Date(allTurns.at(-1)!.created_at).getTime()
      : null;
  if (startedAt && endAt) {
    const mins = Math.max(1, Math.round((endAt - startedAt) / 60000));
    duration = `${mins} min`;
  }

  return (
    <ReflectionClient
      sessionId={id}
      scenarioTitle={scenario?.title ?? session.scenario_id}
      duration={duration}
      status={session.status}
      summary={sessionSummary(avg)}
      dimensions={dimensions}
      moments={moments}
      importantMoment={important}
    />
  );
}
