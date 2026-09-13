"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Keyboard, LogOut, Lock, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getScenario } from "@/lib/constants/scenarios";
import { getNextAIResponse } from "@/lib/ai/mock-engine";
import type { RehearsalSession, RehearsalTurn } from "@/types/rehearsal";

const TOTAL_QUESTIONS = 5;

type RoomState =
  | "ready"
  | "listening"
  | "speaking"
  | "processing"
  | "responding"
  | "completed";

const STATE_LABEL: Record<RoomState, string> = {
  ready: "Ready",
  listening: "Listening",
  speaking: "Speaking",
  processing: "Thinking",
  responding: "Responding",
  completed: "Complete",
};

/* ------------------------------------------------------------------ */
/*  Rehearsal signal — tapered amber bars                             */
/* ------------------------------------------------------------------ */

const WAVE_BARS = Array.from({ length: 37 }, (_, i) => {
  const t = i / 36;
  const taper = Math.sin(t * Math.PI);
  const jitter = 0.55 + 0.45 * Math.abs(Math.sin(i * 2.7));
  return 2 + taper * 14 * jitter;
});

function RoomSignal({ level }: { level: "idle" | "low" | "high" }) {
  const amp = level === "high" ? 2.1 : level === "low" ? 1.35 : 1;
  return (
    <div
      className="flex items-center justify-center gap-[3px] h-10"
      aria-hidden="true"
    >
      {WAVE_BARS.map((h, i) => (
        <motion.span
          key={i}
          className="block w-[2px] rounded-full bg-rehevo-amber"
          style={{ height: `${h}px`, transformOrigin: "center" }}
          animate={
            level === "idle"
              ? { scaleY: 1 }
              : { scaleY: [1, amp, 0.75, amp * 0.85, 1] }
          }
          transition={
            level === "idle"
              ? { duration: 0 }
              : {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.045,
                }
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  Rehearsal room                                                     */
/* ------------------------------------------------------------------ */

interface RehearsalRoomClientProps {
  sessionId: string;
  initialSession: RehearsalSession;
  initialTurns: RehearsalTurn[];
}

export default function RehearsalRoomClient({
  sessionId,
  initialSession,
  initialTurns,
}: RehearsalRoomClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const scenario = getScenario(initialSession.scenario_id);

  const initialAiTurns = initialTurns.filter((t) => t.role === "ai");
  const resumable =
    initialSession.status !== "completed" && initialAiTurns.length > 0;

  const [state, setState] = useState<RoomState>(
    initialSession.status === "completed"
      ? "completed"
      : resumable
        ? "listening"
        : "ready"
  );
  const [questionIndex, setQuestionIndex] = useState(initialAiTurns.length);
  const [turnCount, setTurnCount] = useState(initialTurns.length);
  const [currentPrompt, setCurrentPrompt] = useState(
    initialAiTurns.at(-1)?.content ?? ""
  );
  const [speaking, setSpeaking] = useState(false);
  const [typedOpen, setTypedOpen] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [exiting, setExiting] = useState(false);
  const speakingRef = useRef(false);

  // Completed sessions go straight to review.
  useEffect(() => {
    if (initialSession.status === "completed") {
      router.replace(`/rehearsal/${sessionId}/review`);
    }
  }, [initialSession.status, router, sessionId]);

  // Elapsed timer — runs once the session has started.
  useEffect(() => {
    if (!initialSession.started_at && state === "ready") return;
    const start = initialSession.started_at
      ? new Date(initialSession.started_at).getTime()
      : Date.now();
    const tick = () =>
      setElapsed(Math.floor((Date.now() - start) / 1000));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSession.started_at]);

  const insertTurn = async (
    turnNumber: number,
    role: "user" | "ai",
    content: string
  ) => {
    await supabase.from("rehearsal_turns").insert({
      session_id: sessionId,
      turn_number: turnNumber,
      role,
      content,
    });
  };

  const startRehearsal = async () => {
    await supabase
      .from("rehearsal_sessions")
      .update({ status: "listening", started_at: new Date().toISOString() })
      .eq("id", sessionId);

    const prompt = getNextAIResponse(initialSession.scenario_id, 0);
    await insertTurn(turnCount, "ai", prompt);

    setTurnCount((n) => n + 1);
    setQuestionIndex(1);
    setCurrentPrompt(prompt);
    setState("listening");
  };

  const completeRehearsal = async () => {
    await supabase
      .from("rehearsal_sessions")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", sessionId);
    setState("completed");
    router.push(`/rehearsal/${sessionId}/review`);
  };

  const submitResponse = async () => {
    const response = userResponse.trim();
    if (!response || state !== "listening") return;

    setTypedOpen(false);
    setUserResponse("");
    setState("processing");

    await insertTurn(turnCount, "user", response);
    setTurnCount((n) => n + 1);

    // Brief thinking beat before the counterpart responds.
    await new Promise((r) => setTimeout(r, 1400));

    if (questionIndex >= TOTAL_QUESTIONS) {
      await completeRehearsal();
      return;
    }

    setState("responding");
    const next = getNextAIResponse(initialSession.scenario_id, questionIndex);
    await insertTurn(turnCount + 1, "ai", next);
    setTurnCount((n) => n + 1);
    setQuestionIndex((i) => i + 1);
    setCurrentPrompt(next);
    setState("listening");
  };

  const exitRoom = async () => {
    if (exiting) return;
    setExiting(true);
    if (state !== "ready" && state !== "completed") {
      await supabase
        .from("rehearsal_sessions")
        .update({ status: "paused" })
        .eq("id", sessionId);
    }
    router.push("/dashboard");
  };

  const startSpeaking = () => {
    if (state !== "listening" || speakingRef.current) return;
    speakingRef.current = true;
    setSpeaking(true);
  };

  const stopSpeaking = () => {
    if (!speakingRef.current) return;
    speakingRef.current = false;
    setSpeaking(false);
    // No live transcription yet (M5) — capture what was said as text.
    setTypedOpen(true);
  };

  const displayState: RoomState =
    speaking && state === "listening" ? "speaking" : state;
  const inRoom = state !== "ready" && state !== "completed";

  return (
    <main className="relative min-h-screen bg-ink-950 text-surface-light antialiased overflow-hidden flex flex-col">
      {/* ── Room background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/scenarios/scenario-setup-background.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink-950/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950/80" />
      </div>

      {/* ── Top bar ── */}
      <header className="relative z-10 w-full border-b border-surface-light/[0.07]">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-14 flex items-center justify-between">
          <Link href="/dashboard" aria-label="REHEVO — Dashboard">
            <Image
              src="/rehevo-logo.png"
              alt="REHEVO"
              width={120}
              height={28}
              className="h-5 w-auto"
              priority
            />
          </Link>
          <button
            onClick={exitRoom}
            disabled={exiting}
            className="flex items-center gap-2 text-xs text-surface-light/50 hover:text-surface-light/85 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            {exiting ? "Leaving..." : "Exit room"}
          </button>
        </div>
      </header>

      {/* ── Center stage ── */}
      <div className="relative z-10 flex-1 w-full max-w-[720px] mx-auto px-6 flex flex-col items-center justify-center text-center py-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-5 bg-rehevo-amber/80" />
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-rehevo-amber">
            Rehearse
          </p>
          <span className="h-3 w-px bg-surface-light/20" />
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-surface-light/55">
            {scenario?.label ?? initialSession.scenario_id}
          </p>
        </div>

        {/* Scenario title */}
        <h1 className="font-serif text-3xl md:text-[2.75rem] leading-[1.12] tracking-tight mb-5">
          {scenario?.title ?? initialSession.scenario_id}
        </h1>

        {/* State + timer */}
        <div className="flex items-center gap-3 mb-10">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              displayState === "ready"
                ? "bg-surface-light/40"
                : "bg-rehevo-amber animate-pulse"
            }`}
          />
          <p
            className={`text-[10px] font-medium tracking-[0.22em] uppercase ${
              displayState === "ready"
                ? "text-surface-light/40"
                : "text-rehevo-amber"
            }`}
          >
            {STATE_LABEL[displayState]}
          </p>
          <span className="h-3 w-px bg-surface-light/20" />
          <p className="text-xs font-mono text-surface-light/50 tabular-nums">
            {formatElapsed(elapsed)}
          </p>
        </div>

        {/* Question / prompt */}
        <div className="min-h-[120px] md:min-h-[140px] flex items-center">
          <AnimatePresence mode="wait">
            {state === "ready" ? (
              <motion.p
                key="ready"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="font-serif text-xl md:text-2xl leading-snug text-surface-light/80"
              >
                Your counterpart is ready.
                <br />
                Take a breath.
              </motion.p>
            ) : (
              <motion.p
                key={currentPrompt}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-2xl md:text-[2rem] leading-[1.25] tracking-tight text-surface-light max-w-[560px]"
              >
                {displayState === "processing"
                  ? "Thinking…"
                  : currentPrompt}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Signal */}
        <div className="mt-4">
          <RoomSignal
            level={
              displayState === "speaking"
                ? "high"
                : displayState === "listening" || displayState === "responding"
                  ? "low"
                  : "idle"
            }
          />
        </div>
        <p className="mt-2 text-[10px] font-medium tracking-[0.28em] uppercase text-surface-light/35">
          {displayState === "speaking"
            ? "You're speaking"
            : displayState === "listening"
              ? "Listening"
              : displayState === "processing" || displayState === "responding"
                ? "Thinking"
                : ""}
        </p>

        {/* Primary control */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {state === "ready" ? (
            <button
              onClick={startRehearsal}
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-rehevo-amber text-ink-950 text-sm font-medium hover:bg-rehevo-amber/90 transition-colors"
            >
              Begin rehearsal
            </button>
          ) : (
            <>
              <button
                type="button"
                aria-label="Hold to speak"
                onPointerDown={startSpeaking}
                onPointerUp={stopSpeaking}
                onPointerLeave={stopSpeaking}
                onPointerCancel={stopSpeaking}
                onKeyDown={(e) => {
                  if ((e.key === " " || e.key === "Enter") && !e.repeat) {
                    e.preventDefault();
                    startSpeaking();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    stopSpeaking();
                  }
                }}
                disabled={state !== "listening"}
                className={`w-16 h-16 md:w-[72px] md:h-[72px] rounded-full border flex items-center justify-center transition-all duration-200 touch-none select-none disabled:opacity-40 ${
                  speaking
                    ? "border-rehevo-amber bg-rehevo-amber/15 scale-105"
                    : "border-rehevo-amber/50 hover:border-rehevo-amber hover:bg-rehevo-amber/[0.07]"
                }`}
              >
                <Mic
                  className={`w-6 h-6 transition-colors ${
                    speaking ? "text-rehevo-amber" : "text-rehevo-amber/80"
                  }`}
                />
              </button>
              <div className="flex flex-col items-center">
                <p className="text-sm text-surface-light/80">
                  {speaking ? "Release when done" : "Your turn"}
                </p>
                <p className="text-[11px] text-surface-light/35 mt-0.5">
                  Hold to speak
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTypedOpen((o) => !o)}
                className="flex items-center gap-1.5 text-[11px] text-surface-light/40 hover:text-surface-light/70 transition-colors mt-1"
              >
                <Keyboard className="w-3.5 h-3.5" />
                {typedOpen ? "Hide keyboard" : "Type instead"}
              </button>
            </>
          )}
        </div>

        {/* Typed response panel */}
        <AnimatePresence>
          {typedOpen && inRoom && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 w-full max-w-[520px]"
            >
              <div className="flex items-end gap-2 rounded-lg border border-surface-light/15 bg-ink-900/70 backdrop-blur-sm p-3">
                <textarea
                  autoFocus
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      submitResponse();
                    }
                  }}
                  placeholder="Type what you said..."
                  rows={3}
                  aria-label="Your response"
                  className="flex-1 bg-transparent text-sm text-surface-light placeholder:text-surface-light/30 outline-none resize-none px-1"
                />
                <button
                  type="button"
                  onClick={submitResponse}
                  disabled={!userResponse.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rehevo-amber text-ink-950 text-xs font-medium hover:bg-rehevo-amber/90 transition-colors disabled:opacity-40 disabled:pointer-events-none flex-shrink-0"
                >
                  Send
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom: progress + privacy ── */}
      <footer className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-6">
        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-[340px] flex items-center gap-4">
            <div className="relative flex-1 h-px bg-surface-light/15">
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-rehevo-amber transition-all duration-500"
                style={{
                  width: `${(questionIndex / TOTAL_QUESTIONS) * 100}%`,
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rehevo-amber transition-all duration-500"
                style={{
                  left: `${(questionIndex / TOTAL_QUESTIONS) * 100}%`,
                }}
              />
            </div>
            <p className="text-[11px] font-mono text-surface-light/40 tabular-nums flex-shrink-0">
              {questionIndex} / {TOTAL_QUESTIONS}
            </p>
          </div>
        </div>
        <p className="sm:hidden mt-4 flex items-center justify-center gap-1.5 text-[10px] text-surface-light/30">
          <Lock className="w-3 h-3" />
          Your rehearsal stays private.
        </p>
      </footer>
    </main>
  );
}
