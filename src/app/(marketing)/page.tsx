"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Play, Lock, Clock, EyeOff, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function StageCue() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-rehevo-amber" />
      <span className="hidden sm:inline-block h-px w-8 bg-rehevo-amber/60" />
    </span>
  );
}

function NavLinks({ inSheet = false }: { inSheet?: boolean }) {
  const baseClass = inSheet
    ? "text-foreground/80 hover:text-foreground transition-colors text-lg py-2"
    : "text-foreground/70 hover:text-foreground transition-colors text-sm";

  return (
    <>
      <Link href="/how-it-works" className={baseClass}>
        How it works
      </Link>
      <Link href="/scenarios" className={baseClass}>
        Scenarios
      </Link>
      <Link href="/how-it-works" className={baseClass}>
        Why Rehevo
      </Link>
    </>
  );
}

function Reassurance() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 text-sm text-foreground/50">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-foreground/40" />
        <span>Private by design</span>
      </div>
      <span className="hidden sm:block h-4 w-px bg-foreground/20 mx-4" />
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-foreground/40" />
        <span>Practice at your pace</span>
      </div>
      <span className="hidden sm:block h-4 w-px bg-foreground/20 mx-4" />
      <div className="flex items-center gap-2">
        <EyeOff className="h-4 w-4 text-foreground/40" />
        <span>No audience required</span>
      </div>
    </div>
  );
}

const CHALLENGE_QUESTIONS = [
  "Why did you choose this approach?",
  "What did you consider instead?",
  "What happens if that assumption is wrong?",
  "Can you give me a specific example?",
];

function MomentsSection() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-950">
      {/* Background image — bleeds in from the right */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/moment.png"
          alt=""
          fill
          className="object-cover object-right opacity-70"
          sizes="100vw"
        />
        {/* Left-to-right dark fade so left content stays legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/20" />
        {/* Top / bottom fades for smooth section blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left column — editorial copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between min-h-[420px] lg:min-h-[520px]"
          >
            {/* Top block */}
            <div>
              {/* Eyebrow with stage cue */}
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-rehevo-amber" />
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/60">
                  The Moment
                </p>
              </div>

              {/* Primary headline */}
              <h2 className="font-serif text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4rem] leading-[1.05] tracking-tight text-foreground mb-6">
                You know what you&apos;re going to say.
              </h2>

              {/* Secondary headline */}
              <p className="font-serif text-3xl md:text-4xl lg:text-[2.25rem] leading-[1.15] tracking-tight text-foreground/55 mb-10">
                Until they ask the question you weren&apos;t ready for.
              </p>

              {/* Body copy */}
              <p className="text-sm md:text-base text-foreground/50 leading-relaxed max-w-sm">
                You can prepare your answers.
                <br />
                But the real challenge comes when someone
                <br />
                pushes back, questions your reasoning,
                <br />
                or asks for more detail.
              </p>
            </div>

            {/* Bottom — question counter */}
            <div className="flex items-center gap-4 mt-16">
              <span className="h-2 w-2 rounded-full bg-rehevo-amber flex-shrink-0" />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/40">
                Question {String(activeQuestion + 1).padStart(2, "0")} / {String(CHALLENGE_QUESTIONS.length).padStart(2, "0")}
              </p>
              <div className="flex-1 h-px bg-foreground/15 max-w-[120px]" />
            </div>
          </motion.div>

          {/* ── Right column — question list + pull quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="flex flex-col gap-3"
          >
            {/* Challenge questions */}
            <div className="flex flex-col gap-2">
              {CHALLENGE_QUESTIONS.map((question, i) => {
                const isActive = i === activeQuestion;
                return (
                  <motion.button
                    key={question}
                    onClick={() => setActiveQuestion(i)}
                    whileHover={{ x: isActive ? 0 : 2 }}
                    transition={{ duration: 0.18 }}
                    className={`
                      w-full flex items-center justify-between gap-4
                      px-5 py-4 text-left
                      border transition-all duration-300 cursor-pointer
                      ${isActive
                        ? "border-foreground/20 bg-foreground/[0.04]"
                        : "border-foreground/10 bg-transparent hover:border-foreground/15 hover:bg-foreground/[0.02]"
                      }
                    `}
                    style={{ borderRadius: "2px" }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Radio indicator */}
                      <span
                        className={`
                          flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center
                          transition-all duration-300
                          ${isActive
                            ? "border-rehevo-amber bg-rehevo-amber"
                            : "border-foreground/30 bg-transparent"
                          }
                        `}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-ink-950" />
                        )}
                      </span>
                      <span
                        className={`text-sm transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-foreground/55"
                        }`}
                      >
                        {question}
                      </span>
                    </div>
                    {/* Arrow */}
                    <ChevronRight
                      className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${
                        isActive ? "text-foreground/60" : "text-foreground/25"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Pull quote */}
            <motion.div
              className="mt-4 px-5 py-6 border border-foreground/10"
              style={{ borderRadius: "2px" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-serif text-xl md:text-2xl text-foreground/80 leading-snug mb-4">
                That&apos;s the part you can&apos;t rehearse from a script.
              </p>
              <div className="flex items-center gap-3">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/40">
                  You have to experience it.
                </p>
                <span className="h-px w-6 bg-rehevo-amber" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function MarketingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/onboarding" className="text-foreground/70 hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link href="/onboarding">
            <Button
              variant="ghost"
              className="text-rehevo-amber hover:text-rehevo-amber rounded-full border border-rehevo-amber hover:bg-rehevo-amber/10"
            >
              Start rehearsing
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] md:hidden"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-ink-950 border-l border-foreground/10 shadow-xl z-[70] md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="/rehevo-logo.png"
                    alt="REHEVO"
                    width={120}
                    height={28}
                    className="h-8 w-auto brightness-0 invert"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  <NavLinks inSheet />
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-rehevo-amber rounded-full border border-rehevo-amber hover:bg-rehevo-amber/10"
                    >
                      Start rehearsing
                    </Button>
                  </Link>
                  <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-rehevo-amber text-ink-950 hover:bg-rehevo-amber/90 font-medium rounded-full">
                      Sign in
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-desktop.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/60 mb-6">
              High-stakes communication rehearsal
            </p>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
              Practice the moment before it matters.
            </h1>

            {/* Supporting copy */}
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl mb-10">
              Important interviews. Difficult questions. Big presentations. Rehevo gives you a private room to practice them before the real moment arrives.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="bg-rehevo-amber text-ink-950 hover:bg-rehevo-amber/90 font-medium px-8 h-12 rounded-full"
                >
                  <StageCue />
                  <span className="ml-1">Enter your rehearsal room</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-rehevo-amber hover:text-rehevo-amber font-medium px-8 h-12 rounded-full border border-rehevo-amber hover:bg-rehevo-amber/10"
                >
                  <Play className="mr-2 h-4 w-4" />
                  See how it works
                </Button>
              </Link>
            </div>

            {/* Reassurance */}
            <Reassurance />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent z-10" />
      </section>

      {/* The Moment */}
      <MomentsSection />
    </main>
  );
}
