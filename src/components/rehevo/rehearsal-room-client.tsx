"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { RehevoWaveform } from "@/components/rehevo/rehevo-waveform";
import { RehevoMetric } from "@/components/rehevo/rehevo-metric";
import { RehevoObservation } from "@/components/rehevo/rehevo-observation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { RehearsalSession, RehearsalTurn, SessionStatus } from "@/types/rehearsal";
import { getNextAIResponse, evaluateResponse } from "@/lib/ai/mock-engine";

type RehearsalState = SessionStatus;

const STATES: { state: RehearsalState; label: string }[] = [
  { state: "ready", label: "Ready" },
  { state: "listening", label: "Listening" },
  { state: "speaking", label: "You are speaking" },
  { state: "processing", label: "Processing" },
  { state: "responding", label: "AI is responding" },
  { state: "paused", label: "Paused" },
  { state: "completed", label: "Rehearsal complete" },
];

interface RehearsalRoomClientProps {
  sessionId: string;
  initialSession: RehearsalSession;
  initialTurns: RehearsalTurn[];
}

export default function RehearsalRoomClient({ sessionId, initialSession, initialTurns }: RehearsalRoomClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [session, setSession] = useState<RehearsalSession>(initialSession);
  const [turns, setTurns] = useState<RehearsalTurn[]>(initialTurns);
  const [activeState, setActiveState] = useState<RehearsalState>(initialSession.status as RehearsalState);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [userResponse, setUserResponse] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [turnCount, setTurnCount] = useState(initialTurns.length);
  const [observation, setObservation] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const startRehearsal = async () => {
    if (!session) return;

    await supabase
      .from("rehearsal_sessions")
      .update({ status: "listening", started_at: new Date().toISOString() })
      .eq("id", sessionId);

    setSession({ ...session, status: "listening" });
    setActiveState("listening");
    setIsRunning(true);

    const firstPrompt = getNextAIResponse(session.scenario_id, 0);
    setCurrentPrompt(firstPrompt);

    await supabase.from("rehearsal_turns").insert({
      session_id: sessionId,
      turn_number: 0,
      role: "ai",
      content: firstPrompt,
    });

    setTurns((prev) => [...prev, {
      id: crypto.randomUUID(),
      session_id: sessionId,
      turn_number: 0,
      role: "ai",
      content: firstPrompt,
      created_at: new Date().toISOString(),
    }]);
  };

  const submitResponse = async () => {
    if (!userResponse.trim() || !session) return;

    setActiveState("processing");
    setIsRunning(false);

    const newTurnNumber = turnCount;
    await supabase.from("rehearsal_turns").insert({
      session_id: sessionId,
      turn_number: newTurnNumber,
      role: "user",
      content: userResponse,
    });

    setTurns((prev) => [...prev, {
      id: crypto.randomUUID(),
      session_id: sessionId,
      turn_number: newTurnNumber,
      role: "user",
      content: userResponse,
      created_at: new Date().toISOString(),
    }]);

    const evaluation = evaluateResponse(userResponse);
    setScore(evaluation.score);
    setObservation(evaluation.observation);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const nextPrompt = getNextAIResponse(session.scenario_id, newTurnNumber);
    setCurrentPrompt(nextPrompt);
    setActiveState("responding");

    await supabase.from("rehearsal_turns").insert({
      session_id: sessionId,
      turn_number: newTurnNumber + 1,
      role: "ai",
      content: nextPrompt,
    });

    setTurns((prev) => [...prev, {
      id: crypto.randomUUID(),
      session_id: sessionId,
      turn_number: newTurnNumber + 1,
      role: "ai",
      content: nextPrompt,
      created_at: new Date().toISOString(),
    }]);

    setTurnCount((prev) => prev + 2);
    setUserResponse("");
    setActiveState("listening");
    setIsRunning(true);
  };

  const endRehearsal = async () => {
    if (!session) return;

    await supabase
      .from("rehearsal_sessions")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", sessionId);

    setSession({ ...session, status: "completed" });
    setActiveState("completed");
    setIsRunning(false);
    setCompleted(true);
  };

  const handleDrill = () => {
    router.push(`/rehearsal/${sessionId}/drill`);
  };

  if (!session) {
    return (
      <main className="min-h-screen bg-ink-950 text-foreground antialiased flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-rehevo-amber animate-pulse" />
          <span className="text-sm text-foreground/55">Loading rehearsal...</span>
        </div>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="min-h-screen bg-ink-950 text-foreground antialiased flex flex-col">
        <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16 flex-1">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <StageCue type={2} />
              <SectionLabel>Reflect</SectionLabel>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight leading-[1.08]">
              That&apos;s the rep.
            </h1>
            <p className="text-base text-foreground/60 leading-relaxed max-w-md">
              You completed {turns.filter((t) => t.role === "user").length} turns. Here&apos;s what stood out.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <SectionLabel>Performance</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { label: "Composure", value: score ? score + 5 : 75 },
                  { label: "Clarity", value: score ? score + 2 : 70 },
                  { label: "Specificity", value: score ? score - 5 : 65 },
                  { label: "Reasoning", value: score ? score + 8 : 80 },
                  { label: "Delivery", value: score ? score + 3 : 72 },
                ].map((metric) => (
                  <RehevoMetric key={metric.label} label={metric.label} value={metric.value} />
                ))}
              </div>
            </div>

            {observation && (
              <div className="flex flex-col gap-4">
                <SectionLabel>Observation</SectionLabel>
                <RehevoObservation
                  title="Your last response"
                  body={observation}
                  actionLabel="Drill this moment"
                  onAction={handleDrill}
                />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <SectionLabel>Timeline</SectionLabel>
              <div className="flex flex-col gap-3">
                {turns.slice(-6).map((turn, i) => (
                  <div
                    key={turn.id}
                    className={cn(
                      "flex items-start gap-4 px-4 py-3 border rounded-[6px]",
                      turn.role === "user"
                        ? "border-rehevo-amber/20 bg-ink-900/20"
                        : "border-foreground/[0.07] bg-ink-900/10"
                    )}
                  >
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono text-foreground/30">
                        {String(Math.floor(i / 2)).padStart(2, "0")}:{i % 2 === 0 ? "00" : "30"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium tracking-wide text-foreground/40 uppercase">
                        {turn.role === "user" ? "You" : "AI"}
                      </span>
                      <p className="text-sm text-foreground/70 leading-relaxed">{turn.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-8">
              <RehevoButton variant="default" size="lg" className="flex-1 sm:flex-none" onClick={handleDrill}>
                Drill this moment
              </RehevoButton>
              <RehevoButton variant="outline" size="lg" className="flex-1 sm:flex-none" onClick={() => router.push("/dashboard")}>
                Back to desk
              </RehevoButton>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased flex flex-col">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16 flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <StageCue type={2} />
            <SectionLabel>Rehearse</SectionLabel>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-foreground/40">
              {session.scenario_id}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl text-foreground tracking-tight leading-[1.08]">
              {currentPrompt || "Ready to begin"}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-10 flex-1">
          <div className="flex flex-col gap-4">
            <SectionLabel>Rehearsal state</SectionLabel>
            <div className="flex flex-col gap-3">
              {STATES.map((s) => {
                const isActive = activeState === s.state;
                return (
                  <div
                    key={s.state}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 border rounded-[6px] transition-all duration-500",
                      isActive
                        ? "border-rehevo-amber/30 bg-ink-900/30"
                        : "border-foreground/[0.07] bg-ink-900/10 opacity-40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                          isActive ? "bg-rehevo-amber" : "bg-foreground/20"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm tracking-wide transition-colors duration-500",
                          isActive ? "text-foreground/80" : "text-foreground/40"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    {isActive && (
                      <span className="text-xs font-mono text-rehevo-amber/70">Active</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {activeState === "listening" && (
            <div className="flex flex-col gap-4">
              <SectionLabel>Voice signal</SectionLabel>
              <div className="flex items-center gap-6">
                <RehevoWaveform active={isRunning} />
                <span className={cn("text-xs tracking-wide transition-colors duration-300", isRunning ? "text-rehevo-amber" : "text-foreground/40")}>
                  {isRunning ? "Listening" : "Idle"}
                </span>
              </div>
            </div>
          )}

          {activeState === "ready" && (
            <div className="flex flex-col gap-4">
              <SectionLabel>Ready</SectionLabel>
              <p className="text-sm text-foreground/50">
                When you&apos;re ready, begin the rehearsal. The AI will ask you questions based on your scenario.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <SectionLabel>Your response</SectionLabel>
            <textarea
              placeholder="Type your response here..."
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              rows={4}
              disabled={!isRunning}
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

          <div className="flex flex-col gap-4 mt-auto pt-8">
            <div className="flex flex-col sm:flex-row gap-3">
              {!isRunning && activeState === "ready" && (
                <RehevoButton variant="default" size="lg" className="flex-1 sm:flex-none" onClick={startRehearsal}>
                  Begin rehearsal
                </RehevoButton>
              )}
              {isRunning && (
                <RehevoButton variant="default" size="lg" className="flex-1 sm:flex-none" onClick={submitResponse} disabled={!userResponse.trim()}>
                  Send response
                </RehevoButton>
              )}
              <RehevoButton variant="outline" size="lg" className="flex-1 sm:flex-none" onClick={endRehearsal}>
                End rehearsal
              </RehevoButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
