import { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ScenarioBrowser } from "@/components/product/scenario-browser";
import { SCENARIOS } from "@/lib/constants/scenarios";

export const metadata: Metadata = {
  title: "Scenarios — REHEVO",
};

export default async function ScenariosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-rehevo-amber/80" />
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-surface-light/60">
                Scenarios
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Choose the moment
              <br />
              before it matters.
            </h1>
            <p className="mt-5 text-sm md:text-base text-surface-light/60 leading-relaxed max-w-md">
              Explore our range of scenarios and find the one that matches your
              next big moment.
            </p>
          </div>
        </div>
      </section>

      {/* ── Browser ──────────────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-20 -mt-6 relative z-10">
        <ScenarioBrowser scenarios={SCENARIOS} />
      </section>
    </main>
  );
}
