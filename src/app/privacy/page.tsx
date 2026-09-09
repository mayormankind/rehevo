import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "Information we collect",
    body: "Rehevo collects only the information necessary to provide and improve the rehearsal experience. This includes account details (name, email), rehearsal session data (audio, transcripts, performance signals), and usage information. We do not sell your data.",
  },
  {
    title: "How we use your information",
    body: "Your data is used to power rehearsal sessions, generate performance reports, and improve the underlying AI models. All processing happens with your privacy as the default. You can delete your account and all associated data at any time.",
  },
  {
    title: "Data storage and security",
    body: "All data is encrypted in transit and at rest. Sessions are stored in secure, access-controlled environments. We retain rehearsal data only as long as your account is active unless you choose to delete it sooner.",
  },
  {
    title: "Your rights",
    body: "You have the right to access, correct, export, and delete your personal data. You may also object to certain processing activities. To exercise these rights, contact us through the settings page or at privacy@rehevo.com.",
  },
  {
    title: "Third-party services",
    body: "Rehevo uses trusted third-party providers for hosting, analytics, and AI processing. These providers are contractually bound to protect your data and may only process it in accordance with our instructions.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/the-reflection-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-30"
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
          Legal
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-foreground mb-6">
          Privacy Policy
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
            Questions about your privacy? Contact us at{" "}
            <a href="mailto:privacy@rehevo.com" className="text-rehevo-amber hover:text-rehevo-amber/80 transition-colors">
              privacy@rehevo.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
