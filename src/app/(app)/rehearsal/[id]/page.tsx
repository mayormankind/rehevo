import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RehearsalRoomClient } from "@/components/rehevo/rehearsal-room-client";

export const metadata: Metadata = {
  title: "Rehearsal Room — REHEVO",
};

const SCENARIOS: Record<string, { label: string; title: string }> = {
  interview: {
    label: "Interview",
    title: "Product Designer — Final Interview",
  },
  presentation: {
    label: "Presentation",
    title: "Q3 All-Hands — Executive Deck",
  },
  pitch: {
    label: "Pitch",
    title: "Series A — Investor Pitch",
  },
  defense: {
    label: "Defense",
    title: "PhD Thesis Defense",
  },
  difficult: {
    label: "Difficult Conversation",
    title: "Performance Review — Direct Report",
  },
};

export default async function RehearsalPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data,
  } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  const scenario = SCENARIOS[params.id];

  if (!scenario) {
    redirect("/app/dashboard");
  }

  return <RehearsalRoomClient scenarioLabel={scenario.label} scenarioTitle={scenario.title} />;
}