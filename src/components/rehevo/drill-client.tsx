"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { RehevoMetric } from "@/components/rehevo/rehevo-metric";
import { RehevoObservation } from "@/components/rehevo/rehevo-observation";
import { createClient } from "@/lib/supabase/client";
import { RehearsalTurn } from "@/types/rehearsal";
import { evaluateResponse } from "@/lib/ai/mock-engine";

interface DrillClientProps {
  sessionId: string;
}

export default function DrillClient({ sessionId }: DrillClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [originalTurn, setOriginalTurn] = useState<RehearsalTurn | null>(null);
  const [prompt, setPrompt] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [observation, setObservation] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const loadDrillContext = async () => {
      const { data } = await supabase
        .from("rehearsal_turns")
        .select("*")
        .eq("session_id", sessionId)
        .order("turn_number", { ascending: true });

      if (data && data.length > 0) {
        const lastUserTurn = data.filter((t) => t.role === "user").pop();
        if (lastUserTurn) {
          setOriginalTurn(lastUserTurn);
        }
        const lastAiTurn = data.filter((t) => t.role === "ai").pop();
        if (lastAiTurn) {
          setPrompt(lastAiTurn.content);
        }
      }
    };

    loadDrillContext();
  }, [sessionId, supabase]);

  const submitDrill = async () => {
    if (!userResponse.trim()) return;

    const evaluation = evaluateResponse(userResponse);
    setScore(evaluation.score);
    setObservation(evaluation.observation);
    setIsRunning(false);
    setCompleted(true);

    await supabase.from("rehearsal_turns").insert({
      session_id: sessionId,
      turn_number: 999,
      role: "user",
      content: `[DRILL] ${userResponse}`,
    });
  };

  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased flex flex-col">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16 flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <StageCue type={2} />
            <SectionLabel>Drill</SectionLabel>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-foreground tracking-tight leading-[1.08]">
            Let&apos;s try that again.
          </h1>
          <p className="text-sm text-foreground/50">
            This is a focused repetition. Answer the same prompt with what you&apos;ve learned.
          </p>
        </div>

        {!completed ? (
          <div className="flex flex-col gap-10 flex-1">
            {originalTurn && (
              <div className="flex flex-col gap-4">
                <SectionLabel>Original response</SectionLabel>
                <div className="px-4 py-3 border border-foreground/10 rounded-[6px] bg-ink-900/20">
                  <p className="text-sm text-foreground/60 leading-relaxed italic">
                    &ldquo;{originalTurn.content}&rdquo;
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <SectionLabel>AI prompt</SectionLabel>
              <div className="px-4 py-3 border border-rehevo-amber/20 rounded-[6px] bg-ink-900/30">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {prompt || "Loading prompt..."}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Your response</SectionLabel>
              <textarea
                placeholder="Type your response here..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                rows={4}
                disabled={isRunning}
                className="
                  w-full px-4 py-3
                  bg-ink-900/30 border border-foreground/10
                  text-sm text-foreground placeholder:text-foreground/25
                  outline-none
                  focus:border-rehevo-amber/40 focus:ring-1 focus:ring-rehevo-amber/15
                  transition-all duration-200 disabled:opacity-50
                "
                style={{ borderRadius: "6px" }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-8">
              <RehevoButton
                variant="default"
                size="lg"
                className="flex-1 sm:flex-none"
                onClick={submitDrill}
                disabled={!userResponse.trim()}
              >
                Submit drill
              </RehevoButton>
              <RehevoButton variant="outline" size="lg" className="flex-1 sm:flex-none" onClick={() => router.push(`/rehearsal/${sessionId}/review`)}>
                Cancel
              </RehevoButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <SectionLabel>Drill result</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { label: "Composure", value: score ? score + 8 : 85 },
                  { label: "Clarity", value: score ? score + 5 : 78 },
                  { label: "Specificity", value: score ? score + 10 : 75 },
                  { label: "Reasoning", value: score ? score + 6 : 82 },
                  { label: "Delivery", value: score ? score + 4 : 80 },
                ].map((metric) => (
                  <RehevoMetric key={metric.label} label={metric.label} value={metric.value} />
                ))}
              </div>
            </div>

            {observation && (
              <div className="flex flex-col gap-4">
                <SectionLabel>Observation</SectionLabel>
                <RehevoObservation title="How you improved" body={observation} />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-8">
              <RehevoButton variant="default" size="lg" className="flex-1 sm:flex-none" onClick={() => router.push(`/rehearsal/${sessionId}/review`)}>
                Review full rehearsal
              </RehevoButton>
              <RehevoButton variant="outline" size="lg" className="flex-1 sm:flex-none" href="/dashboard">
                Back to desk
              </RehevoButton>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
