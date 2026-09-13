import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { EditorialHeading } from "@/components/rehevo/editorial-heading";
import { Surface } from "@/components/rehevo/surface";
import SetupForm from "./setup-form";

export const metadata: Metadata = {
  title: "Prepare — REHEVO",
};

const SCENARIOS: Record<string, { label: string; title: string; description: string; question: string }> = {
  interview: {
    label: "Interview",
    title: "Product Designer — Final Interview",
    description: "Practice answering unexpected questions about your design decisions, past failures, and how you handle feedback under pressure.",
    question: "Walk me through a decision you made that didn't work out.",
  },
  presentation: {
    label: "Presentation",
    title: "Q3 All-Hands — Executive Deck",
    description: "Rehearse explaining metrics, defending choices, and handling executive-level pushback in a high-stakes presentation setting.",
    question: "What's the one metric that tells you if this quarter worked?",
  },
  pitch: {
    label: "Pitch",
    title: "Series A — Investor Pitch",
    description: "Practice articulating your vision, defending your market position, and answering tough questions about traction and timing.",
    question: "Why is now the right time for this, and why are you the team?",
  },
  defense: {
    label: "Defense",
    title: "PhD Thesis Defense",
    description: "Practice responding to critical questions about your methodology, findings, and the limitations of your research.",
    question: "How would your findings change if your core assumption is wrong?",
  },
  difficult: {
    label: "Difficult Conversation",
    title: "Performance Review — Direct Report",
    description: "Practice giving constructive feedback, addressing underperformance, and handling emotional reactions with composure.",
    question: "How do you think things are going, from your perspective?",
  },
};

export default async function ScenarioSetupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data,
  } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  const scenario = SCENARIOS[id];

  if (!scenario) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-surface-light text-ink-950 antialiased">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <StageCue type={2} />
            <SectionLabel>Prepare</SectionLabel>
          </div>
          <EditorialHeading level={1}>
            {scenario.title}
          </EditorialHeading>
          <p className="text-base text-ink-800/70 leading-relaxed max-w-md">
            {scenario.description}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionLabel>Setup</SectionLabel>
            <Surface className="p-6 md:p-8">
              <SetupForm scenarioId={id} />
            </Surface>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>What to expect</SectionLabel>
            <div className="flex flex-col gap-3 text-sm text-ink-800/60">
              <p>The AI will ask you a series of realistic questions based on this scenario.</p>
              <p>Answer as if you were in the actual situation. The more specific you are, the more useful the rehearsal will be.</p>
              <p className="font-serif italic text-ink-800/80">
                &ldquo;{scenario.question}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
