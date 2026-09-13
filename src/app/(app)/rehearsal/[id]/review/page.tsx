import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { RehevoMetric } from "@/components/rehevo/rehevo-metric";
import { RehevoObservation } from "@/components/rehevo/rehevo-observation";
import { RehevoTimeline } from "@/components/rehevo/rehevo-timeline";

export const metadata: Metadata = {
  title: "Review — REHEVO",
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
    .single();

  if (!session) {
    redirect("/dashboard");
  }

  const { data: turns } = await supabase
    .from("rehearsal_turns")
    .select("*")
    .eq("session_id", id)
    .order("turn_number", { ascending: true });

  const userTurns = turns?.filter((t) => t.role === "user") || [];
  const lastUserTurn = userTurns[userTurns.length - 1];

  const timelineEvents = turns?.slice(0, 6).map((turn, i) => ({
    time: `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`,
    label: turn.role === "user" ? "Your response" : "AI question",
    active: i === turns.length - 1,
  })) || [];

  return (
    <main className="min-h-screen bg-surface-light text-ink-950 antialiased">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <StageCue type={2} />
            <SectionLabel>Reflect</SectionLabel>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-ink-950 tracking-tight leading-[1.08]">
            What happened.
          </h1>
          <p className="text-base text-ink-800/70 leading-relaxed max-w-md">
            Review the moments that mattered. Pick one to drill.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <SectionLabel>Performance dimensions</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { label: "Composure", value: 78 },
                { label: "Clarity", value: 72 },
                { label: "Specificity", value: 65 },
                { label: "Reasoning", value: 80 },
                { label: "Delivery", value: 74 },
              ].map((metric) => (
                <RehevoMetric key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>Timeline</SectionLabel>
            <RehevoTimeline events={timelineEvents} />
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>Important moments</SectionLabel>
            <div className="flex flex-col gap-3">
              {lastUserTurn && (
                <RehevoObservation
                  title="Your last response"
                  body="This was a key moment in the rehearsal. Consider drilling this to improve."
                  actionLabel="Drill this moment"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>Transcript</SectionLabel>
            <div className="flex flex-col gap-3">
              {turns?.slice(-4).map((turn) => (
                <div
                  key={turn.id}
                  className="px-4 py-3 border border-ink-800/10 rounded-[6px] bg-white"
                >
                  <p className="text-[10px] font-medium tracking-wide text-ink-800/40 uppercase mb-1">
                    {turn.role === "user" ? "You" : "AI"}
                  </p>
                  <p className="text-sm text-ink-800/70 leading-relaxed">{turn.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-8">
            <RehevoButton variant="default" size="lg" className="flex-1 sm:flex-none" href={`/rehearsal/${id}/drill`}>
              Drill this moment
            </RehevoButton>
            <RehevoButton variant="outline" size="lg" className="flex-1 sm:flex-none" href="/dashboard">
              Back to desk
            </RehevoButton>
          </div>
        </div>
      </div>
    </main>
  );
}
