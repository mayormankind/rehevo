"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Feather,
  History,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusGroup = "completed" | "in-progress" | "paused";

export interface SessionRow {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  scenarioLabel: string;
  scenarioImage: string;
  description: string;
  status: string;
  statusGroup: StatusGroup;
  date: string;
  durationMin: number | null;
  score: number | null;
  dimensions: { label: string; value: number }[];
  momentCount: number;
}

interface SessionsClientProps {
  rows: SessionRow[];
  stats: {
    total: number;
    completed: number;
    moments: number;
    avgScore: number | null;
  };
}

const FILTERS: { key: "all" | StatusGroup; label: string }[] = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "in-progress", label: "In Progress" },
  { key: "paused", label: "Paused" },
];

const STATUS_STYLE: Record<StatusGroup, { label: string; dot: string }> = {
  completed: { label: "Completed", dot: "bg-success" },
  "in-progress": { label: "In Progress", dot: "bg-info-blue" },
  paused: { label: "Paused", dot: "bg-rehevo-amber" },
};

function ScoreRing({ score }: { score: number | null }) {
  const R = 24;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={R}
            fill="none"
            stroke="rgba(235,230,225,0.12)"
            strokeWidth="4"
          />
          {score !== null && (
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="#F59E3B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - score / 100)}
              className="transition-all duration-700"
            />
          )}
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-serif text-xl text-surface-light">
          {score ?? "–"}
        </span>
      </div>
      <span className="text-[9px] font-medium tracking-[0.16em] uppercase text-surface-light/40">
        Overall
      </span>
    </div>
  );
}

function SessionCard({ row }: { row: SessionRow }) {
  const status = STATUS_STYLE[row.statusGroup];
  const cta =
    row.statusGroup === "completed"
      ? { label: "View reflection", href: `/rehearsal/${row.id}/review` }
      : { label: "Continue", href: `/rehearsal/${row.id}` };

  return (
    <div className="rounded-lg border border-surface-light/[0.08] bg-ink-900/45 backdrop-blur-sm p-4 md:p-5 grid items-center gap-x-4 gap-y-4 grid-cols-[64px_minmax(0,1fr)_auto] lg:grid-cols-[88px_minmax(0,1.35fr)_auto_auto_minmax(190px,0.85fr)_auto] lg:gap-x-6">
      {/* Thumbnail — scenario art inferred from scenario type */}
      <div className="relative w-16 h-16 lg:w-[88px] lg:h-[88px] rounded-md overflow-hidden flex-shrink-0 col-start-1 row-start-1">
        <Image
          src={row.scenarioImage}
          alt={row.scenarioTitle}
          fill
          className="object-cover"
          sizes="88px"
        />
      </div>

      {/* Title + meta + description */}
      <div className="min-w-0 col-start-2 row-start-1">
        <h3 className="font-serif text-lg md:text-xl text-surface-light leading-snug truncate">
          {row.scenarioTitle}
        </h3>
        <p className="text-[10px] text-surface-light/40 mt-1 tracking-wide">
          {row.scenarioLabel} · {row.date}
          {row.durationMin !== null && ` · ${row.durationMin} min`}
        </p>
        <p className="text-xs text-surface-light/55 leading-relaxed mt-2 line-clamp-2 hidden sm:block">
          {row.description}
        </p>
      </div>

      {/* Status pill */}
      <div className="col-start-3 row-start-1 self-start lg:self-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-surface-light/[0.08] bg-ink-950/60 text-[9px] font-medium tracking-[0.14em] uppercase text-surface-light/70">
          <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
          {status.label}
        </span>
      </div>

      {/* Score ring */}
      <div className="col-start-1 row-start-2 lg:col-start-4 lg:row-start-1">
        <ScoreRing score={row.score} />
      </div>

      {/* Dimensions */}
      <div className="col-start-2 col-span-2 row-start-2 lg:col-start-5 lg:col-span-1 lg:row-start-1 flex flex-col gap-2 min-w-0">
        {row.dimensions.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-[70px] flex-shrink-0 text-[9px] font-medium tracking-[0.12em] uppercase text-surface-light/45 truncate">
              {d.label}
            </span>
            <div className="flex-1 h-[3px] rounded-full bg-surface-light/[0.08] overflow-hidden">
              <div
                className="h-full rounded-full bg-rehevo-amber/80"
                style={{ width: `${d.value}%` }}
              />
            </div>
            <span className="w-6 text-right text-[10px] font-mono tabular-nums text-surface-light/55">
              {d.value}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="col-start-1 col-span-3 row-start-3 lg:col-start-6 lg:col-span-1 lg:row-start-1 flex lg:justify-end">
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-rehevo-amber hover:text-rehevo-amber/80 transition-colors"
        >
          {cta.label}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function SessionsClient({ rows, stats }: SessionsClientProps) {
  const [filter, setFilter] = useState<"all" | StatusGroup>("all");
  const visible =
    filter === "all" ? rows : rows.filter((r) => r.statusGroup === filter);

  return (
    <main className="relative min-h-screen bg-ink-950 text-surface-light antialiased overflow-x-clip">
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/images/editorial/sessions-desktop.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/images/editorial/sessions-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-ink-950/55" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink-950/40 via-ink-950/55 to-ink-950" />

      <div className="relative z-10">
        {/* ── Hero ── */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-10 md:pb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-rehevo-amber" />
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-rehevo-amber">
              Sessions
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Your practice, over time.
          </h1>
          <p className="mt-4 text-sm md:text-base text-surface-light/60 leading-relaxed max-w-[460px]">
            Every rehearsal is a record of what you practiced, where you
            improved and what still deserves another rep.
          </p>
        </div>

        {/* ── Panel ── */}
        <div className="border-t border-surface-light/[0.07] bg-ink-950/85 backdrop-blur-md">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 xl:gap-10">
              {/* Sessions list */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-surface-light/40">
                    Recent sessions
                  </p>
                  <div className="flex items-center gap-2" role="tablist" aria-label="Filter sessions">
                    {FILTERS.map((f) => (
                      <button
                        key={f.key}
                        role="tab"
                        aria-selected={filter === f.key}
                        onClick={() => setFilter(f.key)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-[0.12em] uppercase transition-colors border",
                          filter === f.key
                            ? "bg-ink-800 text-surface-light border-surface-light/25"
                            : "text-surface-light/45 border-transparent hover:text-surface-light/75"
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {visible.length === 0 ? (
                  <div className="rounded-lg border border-surface-light/[0.08] bg-ink-900/45 p-8 text-center">
                    <p className="font-serif text-xl text-surface-light/80 mb-2">
                      {rows.length === 0
                        ? "No rehearsals yet."
                        : "Nothing in this view."}
                    </p>
                    <p className="text-sm text-surface-light/50 mb-6">
                      {rows.length === 0
                        ? "Your first rep starts on the Prepare page."
                        : "Try a different filter to see more sessions."}
                    </p>
                    {rows.length === 0 && (
                      <Link
                        href="/scenarios"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rehevo-amber text-ink-950 text-sm font-medium hover:bg-rehevo-amber/90 transition-colors"
                      >
                        Start rehearsing
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {visible.map((row) => (
                      <SessionCard key={row.id} row={row} />
                    ))}
                  </div>
                )}
              </div>

              {/* Practice card */}
              <aside className="xl:sticky xl:top-24 self-start w-full">
                <div className="rounded-lg border border-surface-light/[0.08] bg-ink-900/50 backdrop-blur-sm p-6 md:p-7">
                  <Feather className="w-4 h-4 text-rehevo-amber mb-4" />
                  <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-surface-light/40 mb-3">
                    Your practice
                  </p>
                  <h2 className="font-serif text-2xl leading-[1.15] tracking-tight mb-3">
                    Small steps.
                    <br />
                    Real progress.
                  </h2>
                  <p className="text-[13px] text-surface-light/55 leading-relaxed">
                    You&apos;ve completed {stats.completed} rehearsal
                    {stats.completed === 1 ? "" : "s"} so far. Each one builds
                    your confidence, clarity and presence.
                  </p>

                  <div className="border-t border-surface-light/[0.07] mt-6 pt-5">
                    <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-surface-light/40 mb-4">
                      Quick stats
                    </p>
                    <div className="flex flex-col gap-3.5">
                      {[
                        {
                          icon: History,
                          value: String(stats.total),
                          label: "Total rehearsals",
                        },
                        {
                          icon: Target,
                          value: String(stats.moments),
                          label: "Moments practiced",
                        },
                        {
                          icon: TrendingUp,
                          value: stats.avgScore !== null ? `${stats.avgScore}` : "–",
                          label: "Avg score",
                        },
                      ].map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex items-center gap-3">
                          <Icon className="w-3.5 h-3.5 text-surface-light/35 flex-shrink-0" />
                          <span className="font-mono text-sm text-surface-light/85 tabular-nums w-8">
                            {value}
                          </span>
                          <span className="text-[11px] text-surface-light/50">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/scenarios"
                    className="mt-7 flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-rehevo-amber text-ink-950 text-sm font-medium hover:bg-rehevo-amber/90 transition-colors"
                  >
                    Start a new rehearsal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
