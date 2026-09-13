"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface SetupFormProps {
  scenarioId: string;
}

const INTENSITY_STOPS = [
  { value: 1, label: "Calm" },
  { value: 2, label: "Focused" },
  { value: 3, label: "Challenging" },
  { value: 4, label: "Pressured" },
  { value: 5, label: "Intense" },
];

const inputClass =
  "w-full px-4 py-3.5 rounded-md bg-ink-900/60 border border-surface-light/15 text-sm text-surface-light placeholder:text-surface-light/30 outline-none focus:border-rehevo-amber/50 transition-colors duration-200 resize-none";

export default function SetupForm({ scenarioId }: SetupFormProps) {
  const router = useRouter();
  const [context, setContext] = useState("");
  const [goal, setGoal] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: session, error } = await supabase
      .from("rehearsal_sessions")
      .insert({
        user_id: user.id,
        scenario_id: scenarioId,
        context: context || null,
        goal: goal || null,
        difficulty,
        status: "ready",
      })
      .select("id")
      .single();

    if (error || !session) {
      setLoading(false);
      return;
    }

    router.push(`/rehearsal/${session.id}`);
  };

  // Track insets by half a column so the line runs between the outer dots.
  const stopCount = INTENSITY_STOPS.length;
  const insetPct = 100 / (stopCount * 2);
  const fillPct =
    ((difficulty - 1) / (stopCount - 1)) * (100 - insetPct * 2);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 flex-1">
      {/* Context */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="context"
          className="text-[10px] font-medium tracking-[0.18em] uppercase text-surface-light/50"
        >
          What&apos;s happening?
        </label>
        <textarea
          id="context"
          placeholder="Give the room some context."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </div>

      {/* Goal */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="goal"
            className="text-[10px] font-medium tracking-[0.18em] uppercase text-surface-light/50"
          >
            What do you want to accomplish?
          </label>
          <span className="text-[10px] text-surface-light/30">(Optional)</span>
        </div>
        <textarea
          id="goal"
          placeholder="What would a good outcome look like?"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
          className={inputClass}
        />
      </div>

      {/* Intensity */}
      <div className="flex flex-col gap-3">
        <p
          id="intensity-label"
          className="text-[10px] font-medium tracking-[0.18em] uppercase text-surface-light/50"
        >
          Intensity
        </p>
        <div
          role="radiogroup"
          aria-labelledby="intensity-label"
          className="relative"
        >
          {/* Track */}
          <div
            className="absolute top-[7px] h-px bg-surface-light/15"
            style={{ left: `${insetPct}%`, right: `${insetPct}%` }}
          />
          {/* Fill */}
          <div
            className="absolute top-[7px] h-[2px] -translate-y-1/2 bg-rehevo-amber transition-all duration-200"
            style={{ left: `${insetPct}%`, width: `${fillPct}%` }}
          />
          {/* Stops */}
          <div className="relative flex">
            {INTENSITY_STOPS.map((stop) => {
              const selected = difficulty === stop.value;
              return (
                <button
                  key={stop.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={stop.label}
                  onClick={() => setDifficulty(stop.value)}
                  className="flex-1 flex flex-col items-center gap-2.5 group"
                >
                  <span className="h-4 flex items-center justify-center">
                    <span
                      className={`block rounded-full transition-all duration-200 ${
                        selected
                          ? "w-2.5 h-2.5 bg-rehevo-amber"
                          : "w-1.5 h-1.5 bg-surface-light/25 group-hover:bg-surface-light/45"
                      }`}
                    />
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] tracking-wide transition-colors duration-200 ${
                      selected
                        ? "text-surface-light"
                        : "text-surface-light/40 group-hover:text-surface-light/60"
                    }`}
                  >
                    {stop.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-2.5">
        <Settings className="w-3.5 h-3.5 text-rehevo-amber flex-shrink-0" />
        <p className="text-[11px] text-surface-light/40">
          Your context stays private to this rehearsal.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-5 border-t border-surface-light/10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-4">
        <Link
          href="/scenarios"
          className="flex items-center justify-center sm:justify-start gap-2 text-xs text-surface-light/50 hover:text-surface-light/80 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to scenarios
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rehevo-amber text-ink-950 text-sm font-medium hover:bg-rehevo-amber/90 transition-colors disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? "Entering the room..." : "Enter the room"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
