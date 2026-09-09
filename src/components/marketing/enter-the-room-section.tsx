import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/enter-the-room.png"
          alt=""
          fill
          className="hidden md:block object-cover object-center opacity-85"
          sizes="100vw"
        />
        <Image
          src="/images/hero/enter-the-room-mobile.png"
          alt=""
          fill
          className="block md:hidden object-cover object-center opacity-85"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950/80" />
      </div>

      {transform && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-28">
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

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-ink-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

export { EnterTheRoomSection };
