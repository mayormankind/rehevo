import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  evaluateMoment,
  sessionDimensions,
  sessionSummary,
} from "@/lib/ai/mock-engine";
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

  // Build moments: each user turn paired with the AI prompt that preceded it.
  const moments: ReflectionMoment[] = userTurns.map((turn) => {
    const promptTurn = [...allTurns]
      .reverse()
      .find((t) => t.role === "ai" && t.turn_number < turn.turn_number);
    const evaluation = evaluateMoment(turn.content);
    return {
      turnNumber: turn.turn_number,
      timestamp: timestampFor(turn, turn.turn_number),
      prompt: promptTurn?.content ?? scenario?.question ?? "",
      response: turn.content,
      score: evaluation.score,
      observation: evaluation.observation,
      dimension: evaluation.dimension,
    };
  });

  // The moment most worth revisiting — lowest scoring user turn.
  const important =
    moments.length > 0
      ? moments.reduce((a, b) => (b.score < a.score ? b : a))
      : null;

  const dimensions = sessionDimensions(userTurns.map((t) => t.content));
  const avg =
    moments.length > 0
      ? moments.reduce((s, m) => s + m.score, 0) / moments.length
      : 0;

  // Session duration — started_at to completed_at (or last turn).
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
