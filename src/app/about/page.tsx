import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const VALUES = [
  {
    title: "Private by design",
    body: "Rehevo is a room of your own. No audience, no judgment, no recordings shared. Practice badly here — that's the point.",
  },
  {
    title: "Realistic pressure",
    body: "The AI doesn't just listen. It challenges, interrupts, and pushes back. Because the real moment won't go easy on you.",
  },
  {
    title: "Repeatable progress",
    body: "The first attempt doesn't have to be good. That's why you get another one. Improvement comes from practicing again.",
  },
];

export default function AboutPage() {
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
          About
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-foreground mb-6">
          Built for the moments<br />that matter.
        </h1>
        <p className="text-sm md:text-base text-foreground/55 leading-relaxed mb-16 max-w-md">
          Rehevo was created because most people know what they want to say — until someone asks the question they weren&apos;t ready for. We exist to close that gap.
        </p>

        <div className="flex flex-col gap-10 mb-16">
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
            We serve people preparing for moments where communication matters: academics defending research, professionals navigating interviews, business leaders facing investors, and anyone who wants to walk into a high-stakes conversation knowing they&apos;ve already been there.
          </p>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
            Rehevo is not a feedback dashboard. It&apos;s a rehearsal room — private, realistic, and repeatable. You practice, the AI challenges you, and you improve before the real moment arrives.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/40">
            What we believe
          </p>
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-2 pb-8 border-b border-foreground/[0.07] last:border-b-0"
            >
              <h2 className="font-serif text-xl text-foreground tracking-tight">
                {value.title}
              </h2>
              <p className="text-sm text-foreground/55 leading-relaxed max-w-md">
                {value.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/[0.07]">
          <p className="text-xs text-foreground/40">
            Want to join the team or partner with us?{" "}
            <Link href="/contact" className="text-rehevo-amber hover:text-rehevo-amber/80 transition-colors">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
