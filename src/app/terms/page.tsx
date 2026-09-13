import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "Agreement to terms",
    body: "By accessing or using Rehevo, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use the service.",
  },
  {
    title: "Use of the service",
    body: "Rehevo grants you a limited, non-exclusive, non-transferable license to use the platform for personal and professional rehearsal purposes. You agree not to misuse the service, attempt to gain unauthorized access, or interfere with its operation.",
  },
  {
    title: "User content",
    body: "You retain ownership of all content you create during rehearsals, including audio, transcripts, and notes. By using the service, you grant Rehevo a limited license to process this content solely to deliver and improve the rehearsal experience.",
  },
  {
    title: "Limitation of liability",
    body: "Rehevo is provided on an as-is basis. To the maximum extent permitted by law, Rehevo shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.",
  },
  {
    title: "Changes to terms",
    body: "We may update these terms from time to time. Continued use of the service after changes are posted constitutes acceptance of the revised terms. We encourage you to review this page periodically.",
  },
];

export default function TermsPage() {
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
          Terms of Service
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
            Questions about these terms? Contact us at{" "}
            <a href="mailto:legal@rehevo.com" className="text-rehevo-amber hover:text-rehevo-amber/80 transition-colors">
              legal@rehevo.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
