"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Play, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StageCue } from "@/components/marketing/stage-cue";
import { NavLinks } from "@/components/marketing/nav-links";
import { Reassurance } from "@/components/marketing/reassurance";
import { MomentsSection } from "@/components/marketing/moments-section";
import { EnterTheRoomSection } from "@/components/marketing/enter-the-room-section";
import { TheReflectionSection } from "@/components/marketing/the-reflection-section";
import { FinalCTASection } from "@/components/marketing/final-cta-section";
import { Footer } from "@/components/marketing/footer";

export default function MarketingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    // Initial scroll check omitted to avoid setState-in-effect.
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased">
      {/* Navigation */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-6 py-5 md:px-12 lg:px-16
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${scrolled
            ? "bg-ink-950/85 backdrop-blur-md border-b border-foreground/12 shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "bg-transparent"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/rehevo-logo.png"
            alt="REHEVO"
            width={160}
            height={36}
            className="h-6 w-auto"
            priority
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/login" className="text-foreground/70 hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link href="/signup">
            <Button
              variant="ghost"
              className="text-rehevo-amber hover:text-rehevo-amber rounded-full py-4 border border-rehevo-amber hover:bg-rehevo-amber/10"
            >
              Start rehearsing
            </Button>
          </Link>
        </div>

        <div className="flex md:hidden items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden bg-ink-950 flex flex-col"
          >
            {/* Top row */}
            <div className="flex items-center justify-between px-6 py-5">
              <Image
                src="/rehevo-logo.png"
                alt="REHEVO"
                width={120}
                height={28}
                className="h-6 w-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-foreground rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Links — large editorial, staggered entrance */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {[
                { label: "How it works", href: "/how-it-works" },
                { label: "Scenarios", href: "/scenarios" },
                { label: "Why Rehevo", href: "/how-it-works" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center gap-4 py-4 border-b border-foreground/[0.07]"
                  >
                    <span className="h-px w-0 bg-rehevo-amber transition-all duration-300 group-hover:w-6" />
                    <span className="font-serif text-3xl text-foreground/85 group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTAs — full width, centered, room to breathe */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="px-8 pb-10 flex flex-col gap-3"
            >
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button className="w-full h-13 bg-rehevo-amber text-ink-950 hover:bg-rehevo-amber/90 font-medium rounded-full text-sm">
                  Start rehearsing
                </Button>
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button
                  variant="ghost"
                  className="w-full h-13 text-foreground/70 hover:text-foreground rounded-full border border-foreground/20 hover:border-foreground/40 hover:bg-transparent text-sm"
                >
                  Sign in
                </Button>
              </Link>
              <p className="text-center text-[10px] tracking-[0.16em] uppercase text-foreground/25 pt-2">
                Private by design
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-desktop.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-60"
            sizes="(max-width: 767px) 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/60 mb-6 flex items-center gap-2">
              <StageCue type={2} /> High-stakes communication rehearsal
            </p>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
              Practice the moment before it matters.
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl mb-10">
              Important interviews. Difficult questions. Big presentations. Rehevo gives you a private room to practice them before the real moment arrives.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="border border-white/20 text-white hover:bg-rehevo-amber/90 font-medium px-8 h-12 rounded-full" variant={"outline"}
                >
                  <StageCue type={1} />
                  <span className="ml-1">Enter your rehearsal room</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg" variant={"outline"}
                  className="text-rehevo-amber hover:text-rehevo-amber font-medium px-8 h-12 rounded-full hover:bg-rehevo-amber/10"
                >
                  <Play className="mr-2 h-4 w-4" />
                  See how it works
                </Button>
              </Link>
            </div>

            <Reassurance />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent z-10" />
      </section>

      <MomentsSection />
      <EnterTheRoomSection />
      <TheReflectionSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
