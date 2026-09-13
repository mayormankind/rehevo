import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const STEPS = [
  {
    label: "01",
    title: "Prepare",
    body: "Set the scene, define the stakes, and choose the scenario that matters. Walk in knowing exactly what you're practicing and why.",
  },
  {
    label: "02",
    title: "Rehearse",
    body: "Step into a private, focused room and speak aloud. Rehevo listens, responds in real time, and creates the pressure of a real conversation.",
  },
  {
    label: "03",
    title: "Challenge",
    body: "The AI doesn't just listen — it pushes back. It asks hard questions, interrupts when you hedge, and tests your composure under pressure.",
  },
  {
    label: "04",
    title: "Reflect",
    body: "Review the moments where you lost ground. See the exact timestamps, hear the follow-ups, and understand what happened — not just a generic score.",
  },
  {
    label: "05",
    title: "Improve",
    body: "Practice specific moments again. Watch yourself get better across attempts. Progress comes from repetition, not from a single perfect run.",
  },
  {
    label: "06",
    title: "Perform",
    body: "Walk into the real situation with rehearsal behind you. You've already been in the room. You know what works.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/the-reflection-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          sizes="(max-width: 767px) 100vw"
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
          How it works
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-foreground mb-6">
          Practice the moment<br />before it matters.
        </h1>
        <p className="text-sm md:text-base text-foreground/55 leading-relaxed mb-16 max-w-md">
          Rehevo follows a clear arc from preparation to performance. Each step builds on the last, so you&apos;re not just practicing — you&apos;re improving.
        </p>

        <div className="flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="flex gap-6 md:gap-8 py-8 border-b border-foreground/[0.07] last:border-b-0"
            >
              <div className="flex flex-col items-center gap-2 pt-1">
                <span className="text-[11px] font-medium tracking-[0.18em] text-rehevo-amber">
                  {step.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 w-px bg-foreground/10 mt-1" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-xl md:text-2xl text-foreground tracking-tight">
                  {step.title}
                </h2>
                <p className="text-sm md:text-base text-foreground/55 leading-relaxed max-w-md">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-xs text-foreground/40">
            Ready to start rehearsing?
          </p>
          <Link href="/signup">
            <button
              className="
                inline-flex items-center gap-2.5 px-6 py-3
                border border-rehevo-amber text-rehevo-amber text-sm font-medium
                rounded-full hover:bg-rehevo-amber/10
                transition-all duration-200 cursor-pointer
              "
            >
              Enter your rehearsal room
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
