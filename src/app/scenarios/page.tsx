import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Mic, BarChart2 } from "lucide-react";

const SCENARIOS = [
  {
    id: "interview",
    label: "Interview",
    title: "Product Designer — Final Interview",
    description: "Practice answering unexpected questions about your design decisions, past failures, and how you handle feedback under pressure.",
    question: "Walk me through a decision you made that didn't work out.",
    time: "00:42",
    icon: Mic,
  },
  {
    id: "presentation",
    label: "Presentation",
    title: "Q3 All-Hands — Executive Deck",
    description: "Rehearse explaining metrics, defending choices, and handling executive-level pushback in a high-stakes presentation setting.",
    question: "What's the one metric that tells you if this quarter worked?",
    time: "01:18",
    icon: BarChart2,
  },
  {
    id: "pitch",
    label: "Pitch",
    title: "Series A — Investor Pitch",
    description: "Practice articulating your vision, defending your market position, and answering tough questions about traction and timing.",
    question: "Why is now the right time for this, and why are you the team?",
    time: "00:55",
    icon: Mic,
  },
  {
    id: "defense",
    label: "Defense",
    title: "PhD Thesis Defense",
    description: "Practice responding to critical questions about your methodology, findings, and the limitations of your research.",
    question: "How would your findings change if your core assumption is wrong?",
    time: "02:04",
    icon: Clock,
  },
  {
    id: "difficult",
    label: "Difficult Conversation",
    title: "Performance Review — Direct Report",
    description: "Practice giving constructive feedback, addressing underperformance, and handling emotional reactions with composure.",
    question: "How do you think things are going, from your perspective?",
    time: "00:31",
    icon: Mic,
  },
];

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/the-reflection-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950/90" />
      </div>

      <div className="relative z-10 w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-foreground/55 hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Rehevo
        </Link>

        <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-rehevo-amber mb-4">
          Scenarios
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-foreground mb-6">
          Choose your moment.
        </h1>
        <p className="text-sm md:text-base text-foreground/55 leading-relaxed mb-16 max-w-md">
          Each scenario is designed to test a different dimension of your communication. Pick the one that matters most right now.
        </p>

        <div className="flex flex-col gap-6">
          {SCENARIOS.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <Link
                key={scenario.id}
                href={`/rehearsal/${scenario.id}`}
                className="group block border border-foreground/10 hover:border-foreground/20 bg-ink-900/20 hover:bg-ink-900/30 transition-all duration-200"
                style={{ borderRadius: "4px" }}
              >
                <div className="p-6 md:p-8 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center border border-rehevo-amber/30 bg-ink-900/40" style={{ borderRadius: "50%" }}>
                        <Icon className="h-4 w-4 text-rehevo-amber" />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-rehevo-amber mb-1">
                          {scenario.label}
                        </p>
                        <h2 className="font-serif text-lg md:text-xl text-foreground tracking-tight">
                          {scenario.title}
                        </h2>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-foreground/35 flex-shrink-0 mt-1">
                      {scenario.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/50 leading-relaxed max-w-lg">
                    {scenario.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-foreground/35 group-hover:text-foreground/55 transition-colors">
                    <span className="font-serif italic">"{scenario.question}"</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/[0.07]">
          <p className="text-xs text-foreground/40">
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
