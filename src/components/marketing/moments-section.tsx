import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

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
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/moment.png"
          alt=""
          fill
          className="object-cover object-right opacity-70"
          sizes="(max-width: 767px) 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950/60" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between min-h-[420px] lg:min-h-[520px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-rehevo-amber" />
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/60">
                  The Moment
                </p>
              </div>

              <h2 className="font-serif text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4rem] leading-[1.05] tracking-tight text-foreground mb-6">
                You know what you&apos;re going to say.
              </h2>

              <p className="font-serif text-3xl md:text-4xl lg:text-[2.25rem] leading-[1.15] tracking-tight text-foreground/55 mb-10">
                Until they ask the question you weren&apos;t ready for.
              </p>

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

            <div className="flex items-center gap-4 mt-16">
              <span className="h-2 w-2 rounded-full bg-rehevo-amber flex-shrink-0" />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/40">
                Question {String(activeQuestion + 1).padStart(2, "0")} / {String(CHALLENGE_QUESTIONS.length).padStart(2, "0")}
              </p>
              <div className="flex-1 h-px bg-foreground/15 max-w-[120px]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="flex flex-col gap-3"
          >
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
                    <ChevronRight
                      className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${isActive ? "text-foreground/60" : "text-foreground/25"
                        }`}
                    />
                  </motion.button>
                );
              })}
            </div>

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

export { MomentsSection };
