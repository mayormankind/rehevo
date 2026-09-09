import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
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
          Contact
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-foreground mb-6">
          Get in touch.
        </h1>
        <p className="text-sm md:text-base text-foreground/55 leading-relaxed mb-16 max-w-md">
          Have a question, feedback, or partnership idea? We&apos;d love to hear from you.
        </p>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 pb-10 border-b border-foreground/[0.07]">
            <h2 className="font-serif text-xl text-foreground tracking-tight">General inquiries</h2>
            <p className="text-sm text-foreground/55 leading-relaxed">
              For questions about Rehevo, features, or how to get started.
            </p>
            <a
              href="mailto:hello@rehevo.com"
              className="text-sm text-rehevo-amber hover:text-rehevo-amber/80 transition-colors mt-1"
            >
              hello@rehevo.com
            </a>
          </div>

          <div className="flex flex-col gap-2 pb-10 border-b border-foreground/[0.07]">
            <h2 className="font-serif text-xl text-foreground tracking-tight">Support</h2>
            <p className="text-sm text-foreground/55 leading-relaxed">
              For technical issues, account problems, or help with a rehearsal session.
            </p>
            <a
              href="mailto:support@rehevo.com"
              className="text-sm text-rehevo-amber hover:text-rehevo-amber/80 transition-colors mt-1"
            >
              support@rehevo.com
            </a>
          </div>

          <div className="flex flex-col gap-2 pb-10 border-b border-foreground/[0.07]">
            <h2 className="font-serif text-xl text-foreground tracking-tight">Legal</h2>
            <p className="text-sm text-foreground/55 leading-relaxed">
              For privacy, data, or legal matters.
            </p>
            <a
              href="mailto:legal@rehevo.com"
              className="text-sm text-rehevo-amber hover:text-rehevo-amber/80 transition-colors mt-1"
            >
              legal@rehevo.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-xl text-foreground tracking-tight">Social</h2>
            <p className="text-sm text-foreground/55 leading-relaxed">
              Follow us for updates, tips, and stories about communication.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/55 hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/55 hover:text-foreground transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
