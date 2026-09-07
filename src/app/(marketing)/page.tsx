"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Play, Lock, Clock, EyeOff, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCornerPin } from "@/hooks/useCornerPin";

function StageCue({ type = 1 }: { type?: 1 | 2 }) {
  return (
    <span className="inline-flex items-center gap-3">
      {type === 1 && <span className="h-2 w-2 rounded-full bg-rehevo-amber" />}
      {type === 2 && <span className="hidden sm:inline-block h-px w-8 bg-rehevo-amber/80" />}
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
                        className={`text-sm transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/55"
                          }`}
                      >
                        {question}
                      </span>
                    </div>
                    {/* Arrow */}
                    <ChevronRight
                      className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${isActive ? "text-foreground/60" : "text-foreground/25"
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

// ─── Enter The Room ─────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: "interview",
    label: "Interview",
    rehearsalLabel: "/ 01",
    rehearsalTitle: "Product Designer — Final Interview",
    question: "Walk me through a decision you made that didn't work out.",
    time: "00:42",
  },
  {
    id: "presentation",
    label: "Presentation",
    rehearsalLabel: "/ 02",
    rehearsalTitle: "Q3 All-Hands — Executive Deck",
    question: "What's the one metric that tells you if this quarter worked?",
    time: "01:18",
  },
  {
    id: "pitch",
    label: "Pitch",
    rehearsalLabel: "/ 03",
    rehearsalTitle: "Series A — Investor Pitch",
    question: "Why is now the right time for this, and why are you the team?",
    time: "00:55",
  },
  {
    id: "defense",
    label: "Defense",
    rehearsalLabel: "/ 04",
    rehearsalTitle: "PhD Thesis Defense",
    question: "How would your findings change if your core assumption is wrong?",
    time: "02:04",
  },
  {
    id: "difficult",
    label: "Difficult Conversation",
    rehearsalLabel: "/ 05",
    rehearsalTitle: "Performance Review — Direct Report",
    question: "How do you think things are going, from your perspective?",
    time: "00:31",
  },
];

const QUAD_DESKTOP = {
  topLeft: { x: 55.43, y: 27.15 },
  topRight: { x: 96.35, y: 13.04 },
  bottomRight: { x: 94.85, y: 65.18 },
  bottomLeft: { x: 55.53, y: 63.75 },
};

const QUAD_MOBILE = {
  topLeft: { x: 42.19, y: 29.65 },
  topRight: { x: 99.98, y: 17.5 },
  bottomRight: { x: 99.54, y: 61.25 },
  bottomLeft: { x: 41.97, y: 60.36 },
};

function RehearsalSignal() {
  const bars = [3, 6, 10, 14, 9, 12, 7, 11, 5, 8];
  return (
    <div className="flex items-center gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="block w-[2px] rounded-full bg-rehevo-amber"
          style={{ height: `${h}px` }}
          animate={{ scaleY: [1, 1.6, 0.8, 1.4, 1] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function EnterTheRoomSection() {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = SCENARIOS[activeScenario];

  // ── Corner-pin setup ──────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeQuad = isDesktop ? QUAD_DESKTOP : QUAD_MOBILE;
  const { transform, refWidth, refHeight } = useCornerPin(sectionRef, activeQuad);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-ink-950"
    >
      {/* ── Background image — desktop ── */}
      <div className="absolute inset-0 z-0">
        {/* Desktop image */}
        <Image
          src="/images/hero/enter-the-room.png"
          alt=""
          fill
          className="hidden md:block object-cover object-center opacity-85"
          sizes="100vw"
        />
        {/* Mobile image */}
        <Image
          src="/images/hero/enter-the-room-mobile.png"
          alt=""
          fill
          className="block md:hidden object-cover object-center opacity-85"
          sizes="100vw"
        />
        {/* Left gradient — keeps left copy legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent" />
        {/* Top + bottom blends */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950/80" />
      </div>

      {/* ── Corner-pinned rehearsal overlay (mapped onto TV screen) ── */}
      {transform && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
        >
          {/* Fixed-size content box — projected onto the quad */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: refWidth,
              height: refHeight,
              transformOrigin: "0 0",
              transform,
              willChange: "transform",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%", height: "100%" }}
                className="flex flex-col overflow-hidden"
              >
                {/* Panel header */}
                <div className="flex items-start justify-between px-6 pb-2 border-b border-foreground/[0.07]">
                  <div>
                    <p className="text-[8px] font-medium tracking-[0.2em] uppercase text-foreground/40 mb-1">
                      REHEARSAL <span className="text-white">{scenario.rehearsalLabel}</span>
                    </p>
                    <p className="text-sm text-foreground/80">{scenario.rehearsalTitle}</p>
                  </div>
                  <p className="text-[8px] uppercase text-foreground/50 mt-1">
                    {scenario.label.toUpperCase()}
                  </p>
                </div>

                {/* AI question area */}
                <div className="flex-1 px-6 pt-6 pb-4 flex flex-col items-center text-center gap-5">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/35">
                    AI Interviewer
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={scenario.question}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="font-serif text-xl leading-[1.2] tracking-tight text-foreground"
                    >
                      {scenario.question}
                    </motion.p>
                  </AnimatePresence>

                  {/* Waveform + timer */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <span className="h-1 w-1 rounded-full bg-rehevo-amber flex-shrink-0" />
                      <RehearsalSignal />
                    </div>
                    <p className="text-xs font-medium tracking-[0.16em] text-foreground/45">
                      {scenario.time}
                    </p>
                  </div>
                </div>

                {/* Panel footer */}
                <div className="flex items-center justify-between px-6 pb-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber" />
                    <p className="text-xs text-foreground/50 tracking-wide">Listening.</p>
                  </div>
                  <button
                    className="
                      flex items-center gap-2 px-4 py-2
                      border border-foreground/25 hover:border-foreground/50 rounded-full
                      text-[7px] tracking-[0.1em] text-foreground/80 hover:text-foreground
                      transition-all duration-200 cursor-pointer pointer-events-auto
                    "
                  >
                    Begin rehearsal
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-28">
        <div className="max-w-lg">
          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-rehevo-amber flex-shrink-0" />
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-foreground/60">
                Enter the Room
              </p>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              You're in the room now.
            </h2>

            {/* Body copy */}
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-12 max-w-sm">
              Choose the moment you&apos;re preparing for.
              <br />
              Rehevo will take it from there.
            </p>

            {/* ── Scenario tabs ── */}
            <div className="flex flex-col gap-0">
              {/* Tab row */}
              <div className="flex flex-col gap-0 border-b border-foreground/15 mb-0">
                {SCENARIOS.map((s, i) => {
                  const isActive = i === activeScenario;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveScenario(i)}
                      className={`
                        relative px-0 mr-6 pb-3 text-xs font-medium tracking-[0.12em] uppercase
                        transition-colors duration-200 cursor-pointer whitespace-nowrap
                        ${isActive ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"}
                      `}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1 flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber" />
                        </span>
                      )}
                      <span className={isActive ? "pl-4 flex gap-2" : "flex gap-2"}>{s.label} <span><ArrowRight className="w-4" /></span></span>
                      {isActive && (
                        <motion.span
                          layoutId="tab-underline"
                          className="absolute left-0 w-32 h-[2px] bg-rehevo-amber"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top blend with previous section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-ink-950 to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}


// ─── The Reflection ─────────────────────────────────────────────────────────

const SCORE_DIMENSIONS = [
  { label: "COMPOSURE", value: 82 },
  { label: "CLARITY", value: 76 },
  { label: "SPECIFICITY", value: 68 },
  { label: "REASONING", value: 84 },
  { label: "DELIVERY", value: 79 },
];

const TIMELINE_EVENTS = [
  { time: "00:00", label: "Rehearsal begins", active: false },
  { time: "01:12", label: "Your response", active: true },
  { time: "02:41", label: "Follow-up question", active: false },
  { time: "04:18", label: "Rehearsal ends", active: false },
];

const TRANSCRIPT_LINES = [
  { speaker: "AI", time: "02:41", text: "How do you think things are going, from your perspective?" },
  { speaker: "You", time: "03:01", text: "I think we're making good progress, though there are a few areas where we could improve..." },
  { speaker: "AI", time: "03:48", text: "What would you say is the biggest challenge right now?" },
];

function ScoreBar({ value }: { value: number }) {
  return (
    <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ backgroundColor: "rgba(15,19,24,0.12)" }}>
      <motion.div
        className="h-full rounded-full bg-rehevo-amber"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  );
}

function TheReflectionSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background: the-reflection image (light/warm tones) ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/the-reflection-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Top blend from previous dark section */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-ink-950 to-transparent z-10 pointer-events-none" />
        {/* Bottom blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 xl:gap-20 items-center">

          {/* ── Left column — editorial copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-rehevo-amber flex-shrink-0" />
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-ink-800/70">
                After the Rehearsal
              </p>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.05] tracking-tight text-ink-950 mb-6">
              The useful part<br />comes after.
            </h2>

            {/* Body copy */}
            <p className="text-base md:text-lg text-ink-800/75 leading-relaxed max-w-sm mb-3">
              Rehevo shows you what happened while you were thinking on your feet.
            </p>
            <p className="text-sm text-ink-800/55 leading-relaxed max-w-xs mb-14">
              Not a score. A clearer picture of how you communicated.
            </p>

            {/* Session indicator */}
            <div className="flex items-center gap-4">
              {/* Amber dot + timeline dots */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rehevo-amber flex-shrink-0" />
                <span className="h-px w-4 bg-ink-800/25" />
                <span className="h-1.5 w-1.5 rounded-full border border-ink-800/35" />
                <span className="h-px w-4 bg-ink-800/25" />
                <span className="h-1.5 w-1.5 rounded-full border border-ink-800/35" />
                <span className="h-px w-4 bg-ink-800/25" />
                <span className="h-1.5 w-1.5 rounded-full border border-ink-800/35" />
              </div>
              <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-ink-800/50">
                Session 05 / Difficult Conversation
              </p>
            </div>
          </motion.div>

          {/* ── Right column — Performance Report card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="w-full"
          >
            {/* The report card — light surface */}
            <div
              className="w-full rounded-[6px] overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.14)]"
              style={{ backgroundColor: "#F7F4F1", border: "1px solid rgba(15,19,24,0.10)" }}
            >
              {/* ── Card Header ── */}
              <div
                className="px-5 pt-5 pb-4"
                style={{ borderBottom: "1px solid rgba(15,19,24,0.08)" }}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-ink-800/50">
                    Rehearsal 05 / Difficult Conversation
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 text-ink-800/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                      </svg>
                      <span className="text-[10px] font-medium tracking-wide text-ink-800/60">02:17</span>
                    </div>
                    <span className="text-ink-800/35">···</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-ink-950 tracking-tight">
                  Performance Review — Direct Report
                </h3>
              </div>

              {/* ── Score dimensions ── */}
              <div
                className="px-5 py-4 grid grid-cols-5 gap-3"
                style={{ borderBottom: "1px solid rgba(15,19,24,0.08)" }}
              >
                {SCORE_DIMENSIONS.map((dim) => (
                  <div key={dim.label} className="flex flex-col gap-2">
                    <p className="text-[8px] font-medium tracking-[0.15em] uppercase text-ink-800/50 whitespace-nowrap">
                      {dim.label}
                    </p>
                    <p className="font-serif text-2xl text-ink-950 leading-none">{dim.value}</p>
                    <ScoreBar value={dim.value} />
                  </div>
                ))}
              </div>

              {/* ── Timeline ── */}
              <div
                className="px-5 py-4"
                style={{ borderBottom: "1px solid rgba(15,19,24,0.08)" }}
              >
                <p className="text-[8px] font-medium tracking-[0.2em] uppercase text-ink-800/50 mb-3">Timeline</p>
                <div className="relative">
                  {/* Track line */}
                  <div className="absolute top-[7px] left-0 right-0 h-px bg-ink-800/15" />
                  <div className="flex justify-between relative">
                    {TIMELINE_EVENTS.map((ev) => (
                      <div key={ev.time} className="flex flex-col items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full border-2 z-10 ${ev.active
                            ? "bg-rehevo-amber border-rehevo-amber"
                            : "bg-[#F7F4F1] border-ink-800/30"
                            }`}
                        />
                        <span
                          className={`text-[8px] font-medium tracking-wide leading-none ${ev.active ? "text-ink-950 font-semibold" : "text-ink-800/50"
                            }`}
                        >
                          {ev.time}
                        </span>
                        <span
                          className={`text-[8px] leading-none text-center max-w-[60px] ${ev.active ? "text-ink-800/80" : "text-ink-800/45"
                            }`}
                        >
                          {ev.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Transcript + Observation ── */}
              <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
                {/* Transcript */}
                <div className="flex flex-col gap-0.5">
                  <p className="text-[8px] font-medium tracking-[0.2em] uppercase text-ink-800/50 mb-2">Transcript</p>
                  <div className="flex flex-col gap-2.5">
                    {TRANSCRIPT_LINES.map((line, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        {/* Avatar */}
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-semibold leading-none mt-0.5 ${line.speaker === "You"
                            ? "bg-rehevo-amber text-ink-950"
                            : "bg-ink-800/12 text-ink-800/60"
                            }`}
                        >
                          {line.speaker === "You" ? "Y" : "AI"}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[8px] font-semibold ${line.speaker === "You" ? "text-rehevo-amber" : "text-ink-800/60"}`}>
                              {line.speaker}
                            </span>
                            <span className="text-[8px] text-ink-800/40">{line.time}</span>
                          </div>
                          <p className="text-[9px] text-ink-800/75 leading-[1.4] line-clamp-3">
                            {line.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observation callout */}
                <div
                  className="rounded-[4px] p-3.5 flex flex-col gap-2.5"
                  style={{ backgroundColor: "#EEEAE6", border: "1px solid rgba(15,19,24,0.08)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full border border-rehevo-amber flex items-center justify-center flex-shrink-0">
                      <span className="text-[6px] text-rehevo-amber font-bold">⊙</span>
                    </div>
                    <p className="text-[8px] font-medium tracking-[0.18em] uppercase text-ink-800/55">
                      Observation
                    </p>
                  </div>
                  <p className="font-serif text-sm text-ink-950 leading-snug">
                    Your reasoning was strong, but your answer became less specific when challenged on ownership.
                  </p>
                  <p className="text-[9px] text-ink-800/60 leading-[1.4]">
                    You provided a solid perspective, but the follow-up revealed a gap in detail around accountability and next steps.
                  </p>
                  {/* CTA */}
                  <button className="mt-1 self-start flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-rehevo-amber text-rehevo-amber text-[9px] font-medium tracking-wide hover:bg-rehevo-amber/10 transition-colors duration-200 cursor-pointer">
                    Drill this moment
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default function MarketingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight);
  }, []);

  useEffect(() => {
    handleScroll();
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
            ? "bg-ink-950/65 backdrop-blur-[12px] border-b border-foreground/12 shadow-[0_1px_0_rgba(255,255,255,0.05)]"
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
              className="text-rehevo-amber hover:text-rehevo-amber rounded-full py-4 border border-rehevo-amber hover:bg-rehevo-amber/10"
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
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/60 mb-6 flex items-center gap-2">
              <StageCue type={2} /> High-stakes communication rehearsal
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
                  className="border border-white/20 text-white hover:bg-rehevo-amber/90 font-medium px-8 h-12 rounded-full"
                >
                  <StageCue type={1} />
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

      {/* Enter the Room */}
      <EnterTheRoomSection />

      {/* The Reflection */}
      <TheReflectionSection />
    </main>
  );
}
