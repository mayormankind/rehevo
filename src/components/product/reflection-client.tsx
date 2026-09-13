"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReflectionMoment {
  turnNumber: number;
  timestamp: string;
  prompt: string;
  response: string;
  score: number;
  observation: string;
  dimension: string;
}

interface ReflectionClientProps {
  sessionId: string;
  scenarioTitle: string;
  duration: string | null;
  status: string;
  summary: string;
  dimensions: { label: string; value: number }[];
  moments: ReflectionMoment[];
  importantMoment: ReflectionMoment | null;
}

const DIMENSION_NOTES: Record<string, string> = {
  Composure: "You held steady under pressure. Keep that pace.",
  Clarity: "Your points landed — tighter phrasing would sharpen them further.",
  Specificity: "You stayed general where a concrete example would have landed harder.",
  Reasoning: "Your logic held. Make the why explicit earlier in your answer.",
  Delivery: "Steady delivery. Watch your pacing when the question turns.",
};

export function ReflectionClient({
  sessionId,
  scenarioTitle,
  duration,
  status,
  summary,
  dimensions,
  moments,
  importantMoment,
}: ReflectionClientProps) {
  const weakestDim =
    dimensions.length > 0
      ? dimensions.reduce((a, b) => (b.value < a.value ? b : a)).label
      : "Specificity";
  const [activeDim, setActiveDim] = useState(weakestDim);

  const drillHref = importantMoment
    ? `/rehearsal/${sessionId}/drill?moment=${importantMoment.turnNumber}`
    : `/rehearsal/${sessionId}/drill`;

  const activeNote =
    activeDim === importantMoment?.dimension && importantMoment
      ? importantMoment.observation
      : (DIMENSION_NOTES[activeDim] ?? "");

  return (
    <main className="relative min-h-screen text-[#241b10] antialiased overflow-hidden">
      {/* ── Warm reflection background ── */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/images/editorial/reflect-desktop.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/images/editorial/reflect-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-[#f3ece2]/40" />

      {/* ── Minimal top bar (global nav is hidden for immersion) ── */}
      <header className="relative z-10 w-full border-b border-[#3d2b1a]/10">
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
            <span className="h-3.5 w-px bg-[#3d2b1a]/20" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#3d2b1a]/50">
              Reflection
            </span>
          </div>
          <Link
            href="/dashboard"
            className="text-xs text-[#3d2b1a]/50 hover:text-[#1a120a] transition-colors"
          >
            Back to desk
          </Link>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* ── Left rail ── */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-rehevo-amber" />
              <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#8a6830]">
                Reflection
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#1a120a]">
              The useful part comes after.
            </h1>
            <p className="mt-4 text-sm text-[#3d2b1a]/65 leading-relaxed max-w-[240px]">
              This is where practice becomes progress. Look at what actually
              happened — not what you think happened.
            </p>
            <div className="mt-auto pt-10 hidden lg:block">
              <div className="w-6 h-px bg-[#3d2b1a]/25 mb-4" />
              <p className="font-serif text-sm leading-snug text-[#3d2b1a]/50 italic max-w-[200px]">
                Honest reflection is the shortest path to readiness.
              </p>
            </div>
          </div>

          {/* ── Main column ── */}
          <div className="min-w-0 flex flex-col gap-10">
            {/* Meta row */}
            <div className="flex items-baseline justify-between gap-4 border-b border-[#3d2b1a]/15 pb-3">
              <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#3d2b1a]/50">
                {moments.length} moment{moments.length === 1 ? "" : "s"}{" "}
                captured
              </p>
              <div className="flex items-baseline gap-4 flex-shrink-0">
                {duration && (
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#3d2b1a]/50">
                    {duration}
                  </p>
                )}
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#3d2b1a]/50">
                  {scenarioTitle}
                </p>
                {status !== "completed" && (
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-rehevo-amber">
                    {status}
                  </p>
                )}
              </div>
            </div>

            {/* Summary statement */}
            <h2 className="font-serif text-3xl md:text-[2.75rem] leading-[1.12] tracking-tight text-[#1a120a] max-w-[560px]">
              {summary}
            </h2>

            {/* Performance */}
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#3d2b1a]/45 mb-4">
                Your performance
              </p>
              <div
                role="tablist"
                aria-label="Performance dimensions"
                className="flex gap-6 md:gap-10 overflow-x-auto border-b border-[#3d2b1a]/15"
              >
                {dimensions.map((d) => {
                  const active = d.label === activeDim;
                  return (
                    <button
                      key={d.label}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveDim(d.label)}
                      className="flex-shrink-0 pb-3 text-left group"
                    >
                      <span
                        className={cn(
                          "block text-[10px] font-medium tracking-[0.15em] uppercase transition-colors",
                          active
                            ? "text-[#1a120a]"
                            : "text-[#3d2b1a]/45 group-hover:text-[#3d2b1a]/70"
                        )}
                      >
                        {d.label}
                      </span>
                      <span
                        className={cn(
                          "block font-serif text-2xl leading-none mt-1.5 transition-colors",
                          active ? "text-[#1a120a]" : "text-[#3d2b1a]/50"
                        )}
                      >
                        {d.value}
                      </span>
                      <span
                        className={cn(
                          "block h-[2px] w-8 mt-2 rounded-full transition-colors duration-200",
                          active ? "bg-rehevo-amber" : "bg-transparent"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-[#3d2b1a]/65 leading-relaxed max-w-[480px]">
                {activeNote}
              </p>
            </div>

            {/* Where you lost ground */}
            {importantMoment ? (
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#3d2b1a]/45 mb-4">
                  Where you lost ground
                </p>

                <div
                  className="rounded-lg p-6 md:p-7"
                  style={{
                    background: "rgba(250, 246, 240, 0.8)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(61, 43, 26, 0.12)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-rehevo-amber">
                      Most important moment
                    </p>
                    <p className="text-[11px] font-mono text-[#3d2b1a]/40 tabular-nums">
                      {importantMoment.timestamp}
                    </p>
                  </div>

                  <p className="font-serif italic text-lg md:text-xl text-[#1a120a] leading-snug mb-5">
                    &ldquo;{importantMoment.prompt}&rdquo;
                  </p>

                  <div className="border-t border-[#3d2b1a]/10 pt-4 mb-5">
                    <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#3d2b1a]/40 mb-2">
                      Your response
                    </p>
                    <p className="text-sm text-[#3d2b1a]/75 leading-relaxed line-clamp-4">
                      {importantMoment.response}
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 pt-4 border-t border-[#3d2b1a]/10">
                    <Sun className="w-3.5 h-3.5 text-rehevo-amber flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#3d2b1a]/40 mb-1">
                        Rehevo observation
                      </p>
                      <p className="text-sm text-[#3d2b1a]/75 leading-relaxed">
                        {importantMoment.observation}{" "}
                        <span className="text-rehevo-amber font-medium">
                          {importantMoment.dimension.toLowerCase()}
                        </span>{" "}
                        is the dimension to work on.
                      </p>
                      <p className="text-[11px] text-[#3d2b1a]/40 mt-2">
                        This moment shaped the direction of the rehearsal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="rounded-lg p-6"
                style={{
                  background: "rgba(250, 246, 240, 0.8)",
                  border: "1px solid rgba(61, 43, 26, 0.12)",
                }}
              >
                <p className="text-sm text-[#3d2b1a]/65">
                  No responses were recorded in this session.
                </p>
              </div>
            )}

            {/* Footer actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <div className="flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs text-[#3d2b1a]/55 hover:text-[#1a120a] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to desk
                </Link>
                <Link
                  href="/sessions"
                  className="text-xs text-[#3d2b1a]/55 hover:text-[#1a120a] transition-colors"
                >
                  Sessions
                </Link>
                <Link
                  href={`/reports/${sessionId}`}
                  className="text-xs text-[#3d2b1a]/55 hover:text-[#1a120a] transition-colors"
                >
                  Reports
                </Link>
              </div>
              <Link
                href={drillHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rehevo-amber text-ink-950 text-sm font-medium hover:bg-rehevo-amber/90 transition-colors flex-shrink-0"
              >
                Drill this moment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
