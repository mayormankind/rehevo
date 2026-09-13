"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { createClient } from "@/lib/supabase/client";

interface SetupFormProps {
  scenarioId: string;
}

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
    const { data: { user } } = await supabase.auth.getUser();

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-wide text-ink-800/55 uppercase">
            Give the room some context.
          </label>
          <textarea
            placeholder="Who are you talking to? What's the situation?"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
            className="
              w-full px-4 py-3
              bg-white border border-ink-800/15
              text-sm text-ink-950 placeholder:text-ink-800/35
              outline-none
              focus:border-rehevo-amber/50 focus:ring-rehevo-amber/15
              transition-all duration-200
            "
            style={{ borderRadius: "6px" }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-wide text-ink-800/55 uppercase">
            What do you want to accomplish? <span className="text-ink-800/35">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Get them to approve the budget"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="
              w-full h-[46px] px-4
              bg-white border border-ink-800/15
              text-sm text-ink-950 placeholder:text-ink-800/35
              outline-none
              focus:border-rehevo-amber/50 focus:ring-rehevo-amber/15
              transition-all duration-200
            "
            style={{ borderRadius: "6px" }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-medium tracking-wide text-ink-800/55 uppercase">
            How difficult should this be?
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-ink-800/45">Calm</span>
            <input
              type="range"
              min={1}
              max={5}
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="flex-1 h-1 bg-ink-800/15 rounded-full appearance-none cursor-pointer accent-rehevo-amber"
            />
            <span className="text-xs text-ink-800/45">Intense</span>
            <span className="text-xs font-medium text-rehevo-amber w-4 text-center">{difficulty}</span>
          </div>
        </div>
      </div>

      <RehevoButton type="submit" variant="default" size="lg" className="w-full sm:w-auto" disabled={loading}>
        {loading ? "Entering the room..." : "Enter the room"}
      </RehevoButton>
    </form>
  );
}
