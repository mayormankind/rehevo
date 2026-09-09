import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

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
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/the-reflection-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-ink-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-rehevo-amber flex-shrink-0" />
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-ink-800/70">
                After the Rehearsal
              </p>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.05] tracking-tight text-ink-950 mb-6">
              The useful part<br />comes after.
            </h2>

            <p className="text-base md:text-lg text-ink-800/75 leading-relaxed max-w-sm mb-3">
              Rehevo shows you what happened while you were thinking on your feet.
            </p>
            <p className="text-sm text-ink-800/55 leading-relaxed max-w-xs mb-14">
              Not a score. A clearer picture of how you communicated.
            </p>

            <div className="flex items-center gap-4">
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

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="w-full"
          >
            <div
              className="w-full rounded-[6px] overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.14)]"
              style={{ backgroundColor: "#F7F4F1", border: "1px solid rgba(15,19,24,0.10)" }}
            >
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

              <div
                className="px-5 py-4"
                style={{ borderBottom: "1px solid rgba(15,19,24,0.08)" }}
              >
                <p className="text-[8px] font-medium tracking-[0.2em] uppercase text-ink-800/50 mb-3">Timeline</p>
                <div className="relative">
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

              <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[8px] font-medium tracking-[0.2em] uppercase text-ink-800/50 mb-2">Transcript</p>
                  <div className="flex flex-col gap-2.5">
                    {TRANSCRIPT_LINES.map((line, i) => (
                      <div key={i} className="flex gap-2 items-start">
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

export { TheReflectionSection };
