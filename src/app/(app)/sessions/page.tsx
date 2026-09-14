import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getScenario } from "@/lib/constants/scenarios";
import { evaluateMoment, sessionDimensions } from "@/lib/ai/mock-engine";
import { SessionsClient, SessionRow } from "@/components/product/sessions-client";

export const metadata: Metadata = {
  title: "Sessions — REHEVO",
};

type StatusGroup = "completed" | "in-progress" | "paused";

function statusGroup(status: string): StatusGroup {
  if (status === "completed") return "completed";
  if (status === "paused") return "paused";
  return "in-progress";
}

export default async function SessionsPage() {
  const supabase = await createClient();
  const {
    data,
  } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  const { data: sessions } = await supabase
    .from("rehearsal_sessions")
    .select("*")
    .eq("user_id", data.claims.sub)
    .order("created_at", { ascending: false });

  const sessionList = sessions ?? [];
  const sessionIds = sessionList.map((s) => s.id);

  const { data: turns } = sessionIds.length
    ? await supabase
        .from("rehearsal_turns")
        .select("*")
        .in("session_id", sessionIds)
        .order("turn_number", { ascending: true })
    : { data: [] };

  const turnsBySession = new Map<string, typeof turns>();
  for (const t of turns ?? []) {
    const list = turnsBySession.get(t.session_id) ?? [];
    list.push(t);
    turnsBySession.set(t.session_id, list);
  }

  const rows: SessionRow[] = sessionList.map((s) => {
    const sessionTurns = turnsBySession.get(s.id) ?? [];
    const userTurns = sessionTurns.filter((t) => t.role === "user");
    const scenario = getScenario(s.scenario_id);
    const group = statusGroup(s.status);

    const scores = userTurns.map((t) => evaluateMoment(t.content).score);
    const score = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;

    let durationMin: number | null = null;
    if (s.started_at) {
      const end = s.completed_at
        ? new Date(s.completed_at).getTime()
        : sessionTurns.length
          ? new Date(sessionTurns.at(-1)!.created_at).getTime()
          : null;
      if (end) durationMin = Math.max(1, Math.round((end - new Date(s.started_at).getTime()) / 60000));
    }

    return {
      id: s.id,
      scenarioId: s.scenario_id,
      scenarioTitle: scenario?.title ?? s.scenario_id,
      scenarioLabel: scenario?.label ?? s.scenario_id,
      scenarioImage: scenario?.image ?? "/images/hero/enter-the-room.png",
      description: s.context || scenario?.longDescription || "",
      status: s.status,
      statusGroup: group,
      date: new Date(s.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      durationMin,
      score,
      dimensions: sessionDimensions(userTurns.map((t) => t.content)),
      momentCount: userTurns.length,
    };
  });

  const completedCount = rows.filter((r) => r.statusGroup === "completed").length;
  const scoredRows = rows.filter((r) => r.score !== null);
  const avgScore = scoredRows.length
    ? Math.round(
        scoredRows.reduce((sum, r) => sum + (r.score ?? 0), 0) /
          scoredRows.length
      )
    : null;
  const totalMoments = rows.reduce((sum, r) => sum + r.momentCount, 0);

  return (
    <SessionsClient
      rows={rows}
      stats={{
        total: rows.length,
        completed: completedCount,
        moments: totalMoments,
        avgScore,
      }}
    />
  );
}
