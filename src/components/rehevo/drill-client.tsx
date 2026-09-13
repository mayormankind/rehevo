"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Mic,
  ArrowLeft,
  ArrowRight,
  LogOut,
  Lock,
  Sun,
} from "lucide-react";
import { evaluateMoment } from "@/lib/ai/mock-engine";

interface OtherMoment {
  turnNumber: number;
  score: number;
}

interface DrillClientProps {
  sessionId: string;
  scenarioId: string;
  originalPrompt: string;
  retryPrompt: string;
  originalResponse: string;
  originalScore: number;
  originalObservation: string;
  dimension: string;
  timestamp: string;
  otherMoments: OtherMoment[];
}

/* Small static signal strip for the input card */
function MiniSignal() {
  const bars = [2, 4, 7, 5, 9, 12, 8, 14, 10, 6, 11, 7, 4, 9, 5, 3];
  return (
    <div className="flex items-center gap-[2px]" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-rehevo-amber/70"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

function Card({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-surface-light/10 bg-ink-900/50 backdrop-blur-sm p-5 md:p-6 flex flex-col">
      <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-surface-light/40 mb-4">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function DrillClient({
  sessionId,
  scenarioId,
  originalPrompt,
  retryPrompt,
  originalResponse,
  originalScore,
  originalObservation,
  dimension,
  timestamp,
  otherMoments,
}: DrillClientProps) {
  const router = useRouter();
  const [attempt, setAttempt] = useState("");
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    observation: string;
    dimension: string;
  } | null>(null);

  const submit = () => {
    const response = attempt.trim();
    if (!response || done) return;
    setResult(evaluateMoment(response));
    setDone(true);

    // TODO(M5+): persist drill attempts via a dedicated `drill_attempts`
    // table (session_id, moment_turn_number, attempt_index, response,
    // score, created_at) — NEVER write attempts into `rehearsal_turns`,
    // which must remain the immutable transcript of the original rep.
    // The UI here already treats the attempt as local state, so wiring
    // persistence later should only touch this function.
  };

  const secondaryDim = dimension === "Clarity" ? "Delivery" : "Clarity";
  const delta = result ? result.score - originalScore : 0;
  const secondaryBefore = Math.max(0, originalScore - 4);
  const secondaryAfter = Math.min(
    100,
    secondaryBefore + Math.max(2, Math.round(delta * 0.5))
  );

  const nextMoment = otherMoments[0];

  return (
    <main className="relative min-h-screen bg-ink-950 text-surface-light antialiased overflow-hidden flex flex-col">
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/images/editorial/drill-desktop.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/images/editorial/drill-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-ink-950/55" />

      {/* ── Top bar ── */}
      <header className="relative z-10 w-full border-b border-surface-light/[0.07]">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            <span className="h-3.5 w-px bg-surface-light/20" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-surface-light/50">
              Drill
            </span>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-xs text-surface-light/50 hover:text-surface-light/85 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit drill
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 w-full max-w-[1100px] mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-6 bg-rehevo-amber/80" />
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-rehevo-amber">
            Drill this moment
          </p>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight mb-3">
          Let&apos;s try that again.
        </h1>
        <p className="text-sm text-surface-light/55 leading-relaxed mb-8 md:mb-10">
          Same moment. One deliberate change. Take another shot.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ORIGINAL */}
          <Card label="Original">
            <p className="text-[11px] font-mono text-surface-light/35 tabular-nums mb-2">
              {timestamp}
            </p>
            <p className="font-serif italic text-lg leading-snug text-surface-light/85 mb-5">
              &ldquo;{originalPrompt}&rdquo;
            </p>
            <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-surface-light/40 mb-2">
              Your original response
            </p>
            <p className="text-sm text-surface-light/65 leading-relaxed mb-6">
              {originalResponse}
            </p>
            <div className="mt-auto pt-4 border-t border-surface-light/[0.07] flex items-start gap-2.5">
              <Sun className="w-3.5 h-3.5 text-rehevo-amber flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-surface-light/40 mb-1">
                  Rehevo observation
                </p>
                <p className="text-[13px] text-surface-light/70 leading-relaxed">
                  {originalObservation}{" "}
                  <span className="text-rehevo-amber">
                    {dimension.toLowerCase()}
                  </span>{" "}
                  is where this slipped.
                </p>
              </div>
            </div>
          </Card>

          {/* SECOND ATTEMPT */}
          <Card label="Second attempt">
            <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-surface-light/40 mb-2">
              AI Interviewer
            </p>
            <p className="font-serif text-xl leading-snug text-surface-light mb-5">
              {retryPrompt}
            </p>

            {!done ? (
              <div className="rounded-md border border-surface-light/15 bg-ink-950/60 p-3.5 flex flex-col gap-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <Mic className="w-3.5 h-3.5 text-surface-light/35 flex-shrink-0 mt-2" />
                  <textarea
                    value={attempt}
                    onChange={(e) => setAttempt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        submit();
                      }
                    }}
                    placeholder="Speak your answer..."
                    rows={3}
                    aria-label="Your second attempt"
                    className="flex-1 bg-transparent text-sm text-surface-light placeholder:text-surface-light/30 outline-none resize-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <MiniSignal />
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!attempt.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rehevo-amber text-ink-950 text-xs font-medium hover:bg-rehevo-amber/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Start response
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-rehevo-amber/25 bg-rehevo-amber/[0.06] p-3.5 mb-5">
                <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-rehevo-amber/80 mb-2">
                  Your second attempt
                </p>
                <p className="text-sm text-surface-light/80 leading-relaxed italic">
                  &ldquo;{attempt}&rdquo;
                </p>
              </div>
            )}

            {/* Attempt progress */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-surface-light/40">
                  Attempt {done ? 2 : 1} of 2
                </p>
              </div>
              <div className="relative h-px bg-surface-light/15">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-rehevo-amber transition-all duration-700"
                  style={{ width: done ? "100%" : "50%" }}
                />
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-[10px] text-surface-light/35">
                <Lock className="w-3 h-3" />
                This drill stays inside this rehearsal.
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
          <Link
            href={`/rehearsal/${sessionId}/review`}
            className="flex items-center gap-2 text-xs text-surface-light/50 hover:text-surface-light/80 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to reflection
          </Link>

          {!done ? (
            <div className="flex items-center gap-5">
              <Link
                href={`/rehearsal/${sessionId}/review`}
                className="text-xs text-surface-light/50 hover:text-surface-light/80 transition-colors"
              >
                Skip drill
              </Link>
              <button
                type="button"
                onClick={submit}
                disabled={!attempt.trim()}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-rehevo-amber text-ink-950 text-sm font-medium hover:bg-rehevo-amber/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                Try again
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {nextMoment && (
                <Link
                  href={`/rehearsal/${sessionId}/drill?moment=${nextMoment.turnNumber}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-surface-light/20 text-surface-light/70 text-xs font-medium hover:border-surface-light/40 hover:text-surface-light transition-colors"
                >
                  Try another moment
                </Link>
              )}
              <Link
                href={`/scenarios/${scenarioId}/setup`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-surface-light/20 text-surface-light/70 text-xs font-medium hover:border-surface-light/40 hover:text-surface-light transition-colors"
              >
                Rehearse again
              </Link>
              <Link
                href={`/rehearsal/${sessionId}/review`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-rehevo-amber text-ink-950 text-xs font-medium hover:bg-rehevo-amber/90 transition-colors"
              >
                Back to review
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* What changed */}
        <AnimatePresence>
          {done && result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-lg border border-surface-light/10 bg-ink-900/50 backdrop-blur-sm p-5 md:p-6"
            >
              <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-surface-light/40 mb-5">
                What changed?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  {[
                    {
                      label: dimension,
                      before: originalScore,
                      after: result.score,
                    },
                    {
                      label: secondaryDim,
                      before: secondaryBefore,
                      after: secondaryAfter,
                    },
                  ].map(({ label, before, after }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-surface-light/[0.07] pb-3"
                    >
                      <span className="text-sm text-surface-light/70">
                        {label}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-sm tabular-nums">
                        <span className="text-surface-light/40">{before}</span>
                        <ArrowRight className="w-3 h-3 text-surface-light/30" />
                        <span className="text-rehevo-amber">{after}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2.5">
                  <Sun className="w-3.5 h-3.5 text-rehevo-amber flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-surface-light/70 leading-relaxed">
                    {result.observation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
