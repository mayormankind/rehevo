import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = {
  PRODUCT: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Scenarios", href: "/scenarios" },
  ],
  COMPANY: [
    { label: "Why Rehevo", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ],
  SUPPORT: [
    { label: "Help", href: "/help" },
    { label: "Contact", href: "/contact" },
  ],
  LEGAL: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookie-settings" },
  ],
};

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.56 5.34H1.11v8.32h2.45V5.34zm-1.23-3.9A1.42 1.42 0 1 0 2.34 4.6a1.42 1.42 0 0 0 0-3.17zm10.95 3.66c-1.3 0-2.17.71-2.53 1.39h-.04V5.34H8.3v8.32h2.44V9.5c0-1.03.19-2.02 1.47-2.02 1.26 0 1.28 1.18 1.28 2.09v4.09h2.44V9.1c0-2.12-.46-3.75-2.93-3.75v-.25z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
      <path d="M11.48 0h2.23L8.8 5.79 14.5 15h-4.55l-3.5-4.64L2.48 15H.25l5.23-6.14L0 0h4.67L7.8 4.23 11.48 0zm-.78 13.48h1.24L4.35 1.24H3.02l7.68 12.24z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-foreground/[0.07]">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <Image
              src="/rehevo-logo.png"
              alt="REHEVO"
              width={140}
              height={32}
              className="h-6"
            />
            <p className="text-sm text-foreground/65 leading-relaxed">
              Practice the moment before it matters.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
              {(Object.entries(FOOTER_LINKS) as [string, { label: string; href: string }[]][]).map(([col, links]) => (
                <div key={col} className="flex flex-col gap-3">
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-foreground/40 mb-1">{col}</p>
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-foreground/65 hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 md:justify-end">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 flex items-center justify-center rounded border border-foreground/15 text-foreground/45 hover:text-foreground hover:border-foreground/35 transition-all duration-200"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-7 h-7 flex items-center justify-center rounded border border-foreground/15 text-foreground/45 hover:text-foreground hover:border-foreground/35 transition-all duration-200"
              >
                <XIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/[0.06]">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-foreground/35">
            © 2026 Rehevo
          </p>
          <div className="flex items-center gap-0 text-[11px] text-foreground/35">
            <Link href="/privacy" className="hover:text-foreground/65 transition-colors duration-200">Privacy</Link>
            <span className="mx-2 text-foreground/20">/</span>
            <Link href="/terms" className="hover:text-foreground/65 transition-colors duration-200">Terms</Link>
            <span className="mx-2 text-foreground/20">/</span>
            <Link href="/cookie-settings" className="hover:text-foreground/65 transition-colors duration-200">Cookie settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
