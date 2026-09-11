import { cn } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { EditorialHeading } from "@/components/rehevo/editorial-heading";
import { Surface } from "@/components/rehevo/surface";

export const metadata: Metadata = {
  title: "Prepare — REHEVO",
};

const SCENARIOS = [
  {
    id: "interview",
    label: "Interview",
    title: "Product Designer — Final Interview",
    description: "Practice answering unexpected questions about your design decisions, past failures, and how you handle feedback under pressure.",
    question: "Walk me through a decision you made that didn't work out.",
    time: "00:42",
  },
  {
    id: "presentation",
    label: "Presentation",
    title: "Q3 All-Hands — Executive Deck",
    description: "Rehearse explaining metrics, defending choices, and handling executive-level pushback in a high-stakes presentation setting.",
    question: "What's the one metric that tells you if this quarter worked?",
    time: "01:18",
  },
  {
    id: "pitch",
    label: "Pitch",
    title: "Series A — Investor Pitch",
    description: "Practice articulating your vision, defending your market position, and answering tough questions about traction and timing.",
    question: "Why is now the right time for this, and why are you the team?",
    time: "00:55",
  },
  {
    id: "defense",
    label: "Defense",
    title: "PhD Thesis Defense",
    description: "Practice responding to critical questions about your methodology, findings, and the limitations of your research.",
    question: "How would your findings change if your core assumption is wrong?",
    time: "02:04",
  },
  {
    id: "difficult",
    label: "Difficult Conversation",
    title: "Performance Review — Direct Report",
    description: "Practice giving constructive feedback, addressing underperformance, and handling emotional reactions with composure.",
    question: "How do you think things are going, from your perspective?",
    time: "00:31",
  },
];

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

  return (
    <main className="min-h-screen bg-surface-light text-ink-950 antialiased">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <StageCue type={2} />
            <SectionLabel>Prepare</SectionLabel>
          </div>
          <EditorialHeading level={1}>
            What are you preparing for?
          </EditorialHeading>
          <p className="text-base text-ink-800/70 leading-relaxed max-w-md">
            Choose the situation that matters most right now. Each scenario is designed to test a different dimension of your communication.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {SCENARIOS.map((scenario) => {
            const isSelected = primaryCategory === scenario.id;
            return (
              <Link
                key={scenario.id}
                href={`/app/rehearsal/${scenario.id}`}
                className="group block"
              >
                <Surface
                  className={cn(
                    "p-6 md:p-8 transition-all duration-300",
                    isSelected
                      ? "border-rehevo-amber/30 bg-white"
                      : "hover:border-foreground/20 hover:bg-white"
                  )}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-rehevo-amber">
                          {scenario.label}
                        </p>
                        <h2 className="font-serif text-lg md:text-xl text-ink-950 tracking-tight">
                          {scenario.title}
                        </h2>
                      </div>
                      <span className="text-[11px] font-mono text-ink-800/40 flex-shrink-0 mt-1">
                        {scenario.time}
                      </span>
                    </div>
                    <p className="text-sm text-ink-800/60 leading-relaxed max-w-lg">
                      {scenario.description}
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-[11px] text-ink-800/50 group-hover:text-rehevo-amber transition-colors duration-200">
                        Enter the room
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-rehevo-amber tracking-wide font-medium">
                          — Continue
                        </span>
                      )}
                    </div>
                  </div>
                </Surface>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-ink-800/15 pt-8">
          <p className="text-xs text-ink-800/45">
            Don&apos;t see what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-rehevo-amber hover:text-rehevo-amber/80 transition-colors">
              Get in touch
            </Link>{" "}
            and we&apos;ll help you build the right scenario.
          </p>
        </div>
      </div>
    </main>
  );
}