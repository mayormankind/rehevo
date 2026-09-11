import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCornerPin } from "@/hooks/useCornerPin";

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

// Desktop corner-pin quad — UNCHANGED from your working version.
const QUAD_DESKTOP = {
  topLeft: { x: 55.43, y: 27.15 },
  topRight: { x: 96.35, y: 13.04 },
  bottomRight: { x: 94.85, y: 65.18 },
  bottomLeft: { x: 55.53, y: 63.75 },
};

// Mobile flat rect — measured on the new full-page mobile background
// (enter-the-room-mobile.png, 1122x1402). No corner-pin needed,
// this board is near-flat.
const SCREEN_RECT = {
  leftPct: 14.53,
  topPct: 31.97,
  widthPct: 69.84,
  heightPct: 27.68,
};

// ─── Waveform animation ────────────────────────────────────────────────────

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

// ─── Shared board content ──────────────────────────────────────────────────
// Renders the four-row panel (header / question / waveform / footer).
type Scenario = (typeof SCENARIOS)[number];

function RehearsalPanelContent({ scenario }: { scenario: Scenario }) {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Header row */}
      <div className="flex items-start justify-between px-3 md:px-6 pb-1 md:pb-2 border-b border-foreground/[0.07]">
        <div>
          <p className="text-[6px] md:text-[8px] font-medium tracking-[0.2em] uppercase text-foreground/40 mb-0.5 md:mb-1">
            REHEARSAL <span className="text-white">{scenario.rehearsalLabel}</span>
          </p>
          <p className="text-[8px] md:text-sm text-foreground/80 leading-tight">
            {scenario.rehearsalTitle}
          </p>
        </div>
        <p className="text-[6px] md:text-[8px] uppercase text-foreground/50 mt-0.5 md:mt-1 shrink-0 ml-2">
          {scenario.label.toUpperCase()}
        </p>
      </div>

      {/* AI Interviewer + question + waveform */}
      <div className="flex-1 px-3 md:px-6 pt-3 md:pt-6 pb-2 md:pb-4 flex flex-col items-center text-center gap-2 md:gap-5">
        <p className="text-[6px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/35">
          AI Interviewer
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={scenario.question}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[10px] md:text-xl leading-[1.2] tracking-tight text-foreground"
          >
            {scenario.question}
          </motion.p>
        </AnimatePresence>

        <div className="flex flex-col items-center gap-1 md:gap-2">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="h-1 w-1 rounded-full bg-rehevo-amber flex-shrink-0" />
            <RehearsalSignal />
          </div>
          <p className="text-[6px] md:text-xs font-medium tracking-[0.16em] text-foreground/45">
            {scenario.time}
          </p>
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between px-3 md:px-6 pb-2 md:pb-4 pt-0.5 md:pt-1">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber" />
          <p className="text-[7px] md:text-xs text-foreground/50 tracking-wide">Listening.</p>
        </div>
        <button
          className="
            flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2
            border border-foreground/25 hover:border-foreground/50 rounded-full
            text-[5px] md:text-[7px] tracking-[0.1em] text-foreground/80 hover:text-foreground
            transition-all duration-200 cursor-pointer pointer-events-auto
          "
        >
          Begin rehearsal
          <ArrowRight className="h-2 w-2 md:h-3 md:w-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Shared scenario tab list ───────────────────────────────────────────────
function ScenarioTabs({
  activeScenario,
  setActiveScenario,
  layoutId,
}: {
  activeScenario: number;
  setActiveScenario: (i: number) => void;
  layoutId: string;
}) {
  return (
    <div className="flex flex-col gap-0">
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
              <span className={isActive ? "pl-4 flex gap-2" : "flex gap-2"}>
                {s.label} <span><ArrowRight className="w-4" /></span>
              </span>
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute left-0 w-32 h-[2px] bg-rehevo-amber"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────

function EnterTheRoomSection() {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = SCENARIOS[activeScenario];

  // Corner-pin is desktop-only. sectionRef/useCornerPin logic is UNCHANGED
  // from your working desktop version.
  const sectionRef = useRef<HTMLElement>(null);
  const { transform, refWidth, refHeight } = useCornerPin(sectionRef, QUAD_DESKTOP);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-ink-950"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP — untouched: full-bleed background, corner-pinned overlay,
          left-column copy + tabs, edge fades.
      ═══════════════════════════════════════════════════════════════════ */}

      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="/images/hero/enter-the-room.png"
          alt=""
          fill
          className="object-cover object-center opacity-85"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950/80" />
      </div>

      {transform && (
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 z-20 pointer-events-none overflow-hidden"
        >
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
                <RehearsalPanelContent scenario={scenario} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      <div className="hidden md:block relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-28">
        <div className="max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-rehevo-amber flex-shrink-0" />
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-foreground/60">
                Enter the Room
              </p>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              You&apos;re in the room now.
            </h2>

            <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-12 max-w-sm">
              Choose the moment you&apos;re preparing for.
              <br />
              Rehevo will take it from there.
            </p>

            <ScenarioTabs
              activeScenario={activeScenario}
              setActiveScenario={setActiveScenario}
              layoutId="tab-underline-desktop"
            />
          </motion.div>
        </div>
      </div>

      <div className="hidden md:block absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-ink-950 to-transparent z-10 pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent z-10 pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE — single continuous background image (room + board)
      ═══════════════════════════════════════════════════════════════════ */}

      <div
        className="block md:hidden relative w-full"
        style={{ aspectRatio: "1122 / 1402" }}
      >
        <Image
          src="/images/hero/enter-the-room-mobile.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />

        {/* Legibility gradient — top for headline, bottom for tabs */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-transparent to-ink-950/85 pointer-events-none" />

        {/* Board overlay — flat rect over the TV in the image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${SCREEN_RECT.leftPct}%`,
            top: `${SCREEN_RECT.topPct}%`,
            width: `${SCREEN_RECT.widthPct}%`,
            height: `${SCREEN_RECT.heightPct}%`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex flex-col overflow-hidden"
            >
              <RehearsalPanelContent scenario={scenario} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text content flows on top of the image, top to bottom */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-rehevo-amber flex-shrink-0" />
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-foreground/60">
                Enter the Room
              </p>
            </div>

            <h2 className="font-serif text-4xl text-foreground mb-4">
              You&apos;re in the room now.
            </h2>

            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              Choose the moment you&apos;re preparing for.
              <br />
              Rehevo will take it from there.
            </p>
          </motion.div>

          <div className="md:hidden mt-42">
            <ScenarioTabs
              activeScenario={activeScenario}
              setActiveScenario={setActiveScenario}
              layoutId="tab-underline-mobile"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { EnterTheRoomSection };