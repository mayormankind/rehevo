import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  FileCheck2,
  RotateCcw,
} from "lucide-react";
import { SCENARIOS, getScenario } from "@/lib/constants/scenarios";

export const metadata: Metadata = {
  title: "Prepare — REHEVO",
};

function formatActivityDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function sessionDurationMinutes(
  startedAt: string | null,
  completedAt: string | null
) {
  if (!startedAt || !completedAt) return null;
  const mins = Math.round(
    (new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 60000
  );
  return mins > 0 ? `${mins} min` : null;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, primary_category")
    .eq("id", user.id)
    .single();

  const primaryCategory = profile?.primary_category;

  const { data: recentSessions } = await supabase
    .from("rehearsal_sessions")
    .select(
      "id, scenario_id, status, created_at, started_at, completed_at, scenarios(title, label)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const featured = getScenario(primaryCategory ?? "") ?? SCENARIOS[0];

  return (
    <main className="bg-ink-950 text-surface-light antialiased">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/enter-the-room.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-ink-950/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-24 md:pb-32">
          <div className="flex items-end justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber" />
                <p className="text-xs font-medium tracking-[0.22em] uppercase text-surface-light/60">
                  Prepare
                </p>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
                What are you
                <br />
                preparing for?
              </h1>
              <p className="mt-5 text-sm md:text-base text-surface-light/60 leading-relaxed max-w-md">
                Choose a scenario and set the context. We&apos;ll build your
                rehearsal room around it.
              </p>
            </div>

            <div className="hidden lg:block flex-shrink-0 pb-1">
              <div className="w-6 h-px bg-surface-light/30 mb-4" />
              <p className="font-serif text-sm leading-snug text-surface-light/50 italic max-w-[160px]">
                Better conversations build a stronger you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-20 -mt-8 md:-mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 xl:gap-14">
          {/* Left column */}
          <div className="flex flex-col gap-10 min-w-0">
            {/* Your next rep */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-rehevo-amber/80" />
                <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-surface-light/45">
                  Your next rep
                </p>
              </div>

              <Link
                href={`/scenarios/${featured.id}/setup`}
                className="group block rounded-lg border border-surface-light/10 bg-ink-900/40 hover:border-surface-light/20 transition-colors duration-300 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-[220px] md:w-[260px] aspect-[16/9] sm:aspect-auto sm:min-h-full flex-shrink-0 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 260px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-ink-950/20" />
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col md:flex-row min-w-0">
                    <div className="flex-1 p-5 md:p-7 min-w-0">
                      <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-rehevo-amber mb-2">
                        {featured.label}
                      </p>
                      <h2 className="font-serif text-xl md:text-2xl tracking-tight mb-2">
                        {featured.title}
                      </h2>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center gap-1.5 text-[11px] text-surface-light/50">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.duration}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide text-rehevo-amber border border-rehevo-amber/30 bg-rehevo-amber/10">
                          High Stakes
                        </span>
                      </div>
                      <p className="text-sm text-surface-light/55 leading-relaxed max-w-md mb-5">
                        {featured.longDescription}
                      </p>
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rehevo-amber text-ink-950 text-xs font-medium group-hover:bg-rehevo-amber/90 transition-colors">
                        Enter the room
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Focus column */}
                    <div className="hidden md:flex flex-col justify-center border-l border-surface-light/10 px-7 py-6 flex-shrink-0">
                      <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-surface-light/35 mb-2">
                        Your focus
                      </p>
                      <p className="text-sm text-surface-light/80 leading-snug">
                        {featured.focus.split(" & ")[0]}
                        <br />& {featured.focus.split(" & ")[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Other scenarios */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-rehevo-amber/80" />
                  <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-surface-light/45">
                    Other scenarios
                  </p>
                </div>
                <Link
                  href="/scenarios"
                  className="flex items-center gap-1.5 text-[11px] text-surface-light/50 hover:text-rehevo-amber transition-colors"
                >
                  View all scenarios
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Mobile: horizontal snap scroll · lg+: grid */}
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 xl:grid-cols-5 md:overflow-visible">
                {SCENARIOS.map((scenario) => (
                  <Link
                    key={scenario.id}
                    href={`/scenarios/${scenario.id}/setup`}
                    className="group flex-shrink-0 w-[220px] md:w-auto rounded-lg border border-surface-light/10 bg-ink-900/40 overflow-hidden hover:border-surface-light/20 transition-colors duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={scenario.image}
                        alt=""
                        fill
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 768px) 220px, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-rehevo-amber mb-1.5">
                        {scenario.label}
                      </p>
                      <h3 className="font-serif text-base leading-snug tracking-tight mb-1">
                        {scenario.title}
                      </h3>
                      <p className="text-[11px] text-surface-light/45 leading-relaxed line-clamp-2 mb-4">
                        {scenario.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[11px] text-surface-light/40">
                          <Clock className="w-3 h-3" />
                          {scenario.duration}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-surface-light/30 group-hover:text-rehevo-amber transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <aside className="flex flex-col gap-8 min-w-0">
            {/* Recent activity */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-rehevo-amber/80" />
                <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-surface-light/45">
                  Recent activity
                </p>
              </div>

              {!recentSessions || recentSessions.length === 0 ? (
                <div className="rounded-lg border border-surface-light/10 bg-ink-900/40 p-5">
                  <p className="text-sm text-surface-light/50 leading-relaxed">
                    No rehearsals yet. Your recent sessions will appear here.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-surface-light/[0.07] rounded-lg border border-surface-light/10 bg-ink-900/40 overflow-hidden">
                  {recentSessions.map((session) => {
                    const scenario = Array.isArray(session.scenarios)
                      ? session.scenarios[0]
                      : session.scenarios;
                    const title =
                      (scenario as { title?: string } | null)?.title ??
                      session.scenario_id;
                    const isComplete = session.status === "completed";
                    const meta = [
                      isComplete ? "Completed" : "In progress",
                      formatActivityDate(session.created_at),
                      sessionDurationMinutes(
                        session.started_at,
                        session.completed_at
                      ),
                    ]
                      .filter(Boolean)
                      .join(" · ");

                    return (
                      <Link
                        key={session.id}
                        href={
                          isComplete
                            ? `/reports/${session.id}`
                            : `/rehearsal/${session.id}`
                        }
                        className="group flex items-center gap-3.5 px-5 py-4 hover:bg-surface-light/[0.03] transition-colors"
                      >
                        <span className="w-8 h-8 rounded-md border border-surface-light/10 flex items-center justify-center flex-shrink-0">
                          {isComplete ? (
                            <FileCheck2 className="w-3.5 h-3.5 text-surface-light/50" />
                          ) : (
                            <RotateCcw className="w-3.5 h-3.5 text-rehevo-amber/80" />
                          )}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm text-surface-light/85 truncate">
                            {title}
                          </span>
                          <span className="block text-[11px] text-surface-light/40 mt-0.5">
                            {meta}
                          </span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-surface-light/25 group-hover:text-surface-light/60 transition-colors flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Progress card */}
            <div className="relative rounded-lg overflow-hidden border border-surface-light/10">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/hero/final-cta.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
              </div>
              <div className="relative z-10 p-6 pt-24">
                <span className="h-px w-6 bg-rehevo-amber/80 block mb-4" />
                <h3 className="font-serif text-2xl leading-snug mb-5">
                  Small steps.
                  <br />
                  Big progress.
                </h3>
                <Link
                  href="/sessions"
                  className="flex items-center gap-1.5 text-xs text-surface-light/60 hover:text-rehevo-amber transition-colors"
                >
                  View your progress
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
