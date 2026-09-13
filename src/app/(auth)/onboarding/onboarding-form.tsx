"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { id: "interview", label: "Interview", title: "Product Designer — Final Interview", question: "Walk me through a decision you made that didn't work out." },
  { id: "presentation", label: "Presentation", title: "Q3 All-Hands — Executive Deck", question: "What's the one metric that tells you if this quarter worked?" },
  { id: "pitch", label: "Pitch", title: "Series A — Investor Pitch", question: "Why is now the right time for this, and why are you the team?" },
  { id: "defense", label: "Defense", title: "PhD Thesis Defense", question: "How would your findings change if your core assumption is wrong?" },
  { id: "difficult", label: "Difficult Conversation", title: "Performance Review — Direct Report", question: "How do you think things are going, from your perspective?" },
];

export default function OnboardingForm() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        primary_category: selected,
        updated_at: new Date().toISOString(),
      });
    }

    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-ink-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/onboarding/onboarding-desktop.png"
          alt=""
          fill
          priority
          className="hidden md:block object-cover object-center"
          style={{ opacity: 0.35 }}
          sizes="(max-width: 767px) 100vw"
        />
        <Image
          src="/images/onboarding/onboarding-mobile.png"
          alt=""
          fill
          priority
          className="block md:hidden object-cover object-center"
          style={{ opacity: 0.25 }}
          sizes="(max-width: 767px) 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/30 via-transparent to-ink-950/20" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 flex flex-col gap-8 flex-1">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              <StageCue type={2} />
              <SectionLabel>Prepare</SectionLabel>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.08] tracking-tight">
              What are you preparing for?
            </h1>
            <p className="text-sm text-foreground/55 leading-relaxed max-w-md">
              Choose the situation that matters most right now.
            </p>
          </motion.div>

          <motion.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = selected === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelected(cat.id)}
                      className={`
                        text-left px-4 py-3 border transition-all duration-200
                        ${isSelected
                          ? "border-rehevo-amber/40 bg-ink-900/40"
                          : "border-foreground/10 hover:border-foreground/20 hover:bg-ink-900/20"
                        }
                      `}
                      style={{ borderRadius: "6px" }}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-rehevo-amber">
                            {cat.label}
                          </p>
                          {isSelected && (
                            <span className="text-[9px] text-rehevo-amber/80 tracking-wide font-medium">
                              Selected
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-sm md:text-base text-foreground tracking-tight leading-snug">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-foreground/40 leading-relaxed line-clamp-2">
                          {cat.question}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2">
                <RehevoButton
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={!selected || loading}
                >
                  {loading ? "Entering the room..." : "Enter the room"}
                  <ArrowRight className="h-4 w-4" />
                </RehevoButton>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="h-px bg-rehevo-amber/25"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
