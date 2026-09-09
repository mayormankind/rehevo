import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

const FAQS = [
  {
    category: "Getting started",
    questions: [
      {
        q: "What is Rehevo?",
        a: "Rehevo is a private AI rehearsal room for high-stakes communication. It helps you practice important conversations, difficult questions, and high-pressure presentations before the real moment arrives.",
      },
      {
        q: "Who is Rehevo for?",
        a: "Rehevo is built for academics, professionals, business leaders, and anyone facing a high-stakes communication moment. If the conversation matters, you should rehearse it.",
      },
      {
        q: "How do I start rehearsing?",
        a: "Create an account, choose a scenario that matches your moment, and step into the rehearsal room. The AI will respond in real time and challenge you like a real conversation would.",
      },
    ],
  },
  {
    category: "Rehearsal experience",
    questions: [
      {
        q: "What happens during a rehearsal?",
        a: "You speak aloud in a private room. The AI listens, responds, asks follow-up questions, and tests your composure. After the rehearsal, you review moments worth revisiting.",
      },
      {
        q: "Can I practice the same scenario multiple times?",
        a: "Yes. Progress comes from repetition, not a single perfect run. You can revisit specific moments, try different approaches, and watch yourself improve across attempts.",
      },
      {
        q: "Is my rehearsal private?",
        a: "Absolutely. Rehevo is private by design. Your sessions are not shared, not published, and not used for anything other than improving your experience.",
      },
    ],
  },
  {
    category: "Account and billing",
    questions: [
      {
        q: "Do I need to create an account?",
        a: "Yes, an account is required to save your progress and access personalized rehearsal sessions. You can sign up with your email or continue with Google.",
      },
      {
        q: "How do I delete my account and data?",
        a: "You can delete your account and all associated data at any time from the settings page. This action is irreversible.",
      },
    ],
  },
];

export default function HelpPage() {
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
          Support
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-foreground mb-6">
          How can we help?
        </h1>
        <p className="text-sm md:text-base text-foreground/55 leading-relaxed mb-12 max-w-md">
          Find answers to common questions about Rehevo, rehearsals, and your account.
        </p>

        <div className="flex flex-col gap-12">
          {FAQS.map((category) => (
            <div key={category.category} className="flex flex-col gap-6">
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/40 flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-rehevo-amber" />
                {category.category}
              </p>
              <div className="flex flex-col gap-0">
                {category.questions.map((item, i) => (
                  <div
                    key={item.q}
                    className="py-6 border-b border-foreground/[0.07] last:border-b-0"
                  >
                    <h3 className="font-serif text-base md:text-lg text-foreground tracking-tight mb-2">
                      {item.q}
                    </h3>
                    <p className="text-sm text-foreground/55 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/[0.07]">
          <p className="text-sm text-foreground/60 mb-2">
            Still need help?
          </p>
          <Link href="/contact">
            <button
              className="
                inline-flex items-center gap-2.5 px-6 py-3
                border border-rehevo-amber text-rehevo-amber text-sm font-medium
                rounded-full hover:bg-rehevo-amber/10
                transition-all duration-200 cursor-pointer
              "
            >
              Contact us
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
