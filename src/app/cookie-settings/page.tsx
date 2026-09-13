import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "What are cookies",
    body: "Cookies are small text files placed on your device when you visit Rehevo. They help us understand usage patterns, remember preferences, and improve your experience.",
  },
  {
    title: "How we use cookies",
    body: "Rehevo uses essential cookies for authentication and security, functional cookies for preferences, and analytics cookies to understand how the platform is used. We do not use cookies for advertising tracking.",
  },
  {
    title: "Managing cookies",
    body: "You can control cookie preferences through your browser settings. Essential cookies required for the service to function cannot be disabled. Disabling other cookies may limit certain features.",
  },
  {
    title: "Third-party cookies",
    body: "Some third-party services embedded in Rehevo may set their own cookies. These providers have their own privacy policies, and we encourage you to review them.",
  },
];

export default function CookieSettingsPage() {
  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/the-reflection-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-30"
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
          Legal
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-foreground mb-6">
          Cookie Settings
        </h1>
        <p className="text-sm text-foreground/50 leading-relaxed mb-12">
          Last updated: September 2026
        </p>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h2 className="font-serif text-xl md:text-2xl text-foreground tracking-tight">
                {section.title}
              </h2>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/[0.07]">
          <p className="text-xs text-foreground/40">
            Questions about cookies? Contact us at{" "}
            <a href="mailto:privacy@rehevo.com" className="text-rehevo-amber hover:text-rehevo-amber/80 transition-colors">
              privacy@rehevo.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
