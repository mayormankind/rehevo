import { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Clock } from "lucide-react";
import { getScenario } from "@/lib/constants/scenarios";
import SetupForm from "./setup-form";

export const metadata: Metadata = {
  title: "Set the room — REHEVO",
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

  const scenario = getScenario(id);

  if (!scenario) {
    redirect("/scenarios");
  }

  return (
    <main className="relative bg-ink-950 text-surface-light antialiased">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/scenarios/scenario-setup-background.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950/70" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          {/* ── Left: scenario context ── */}
          <div className="lg:pr-12 xl:pr-16 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-rehevo-amber/80" />
              <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-rehevo-amber">
                {scenario.label}
              </p>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight mb-4">
              {scenario.title}
            </h1>

            <p className="flex items-center gap-2 text-xs text-surface-light/50 mb-5">
              <Clock className="w-3.5 h-3.5" />
              {scenario.duration}
            </p>

            <p className="text-sm text-surface-light/55 leading-relaxed max-w-md mb-8">
              {scenario.longDescription}
            </p>

            {/* Room image */}
            <div className="relative rounded-lg overflow-hidden border border-surface-light/10 aspect-[16/10] mt-auto">
              <Image
                src="/images/scenarios/scenario-setup.png"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
            </div>
          </div>

          {/* ── Right: setup form ── */}
          <div className="lg:border-l lg:border-surface-light/10 lg:pl-12 xl:pl-16 flex flex-col">
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight mb-3">
              Set the room.
            </h2>
            <p className="text-sm text-surface-light/50 leading-relaxed mb-10 max-w-md">
              The more context you give, the better we can shape your rehearsal.
              Add the details of your situation, your goals, and how challenging
              you want it to be.
            </p>

            <SetupForm scenarioId={id} />
          </div>
        </div>
      </div>
    </main>
  );
}
