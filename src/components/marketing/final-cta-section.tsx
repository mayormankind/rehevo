import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function FinalCTASignal() {
  const bars = [2, 4, 8, 14, 20, 16, 10, 6, 3];
  return (
    <div className="flex items-center gap-2">
      <span className="h-px w-12 bg-rehevo-amber/50" />
      <span className="h-px w-3 bg-rehevo-amber/30" />
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="block w-[2px] rounded-full bg-rehevo-amber"
          style={{ height: `${h}px` }}
          animate={{ scaleY: [1, 1.5, 0.7, 1.3, 1] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
      <span className="h-px w-3 bg-rehevo-amber/30" />
      <span className="h-px w-12 bg-rehevo-amber/50" />
    </div>
  );
}

function FinalCTASection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[80vh] md:min-h-[75vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/final-cta.png"
          alt=""
          fill
          className="object-cover object-center opacity-90"
          sizes="(max-width: 767px) 100vw"
        />
        <div className="absolute inset-0 bg-ink-950/55" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-ink-950 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-rehevo-amber" />
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-foreground/65">
            The next moment is yours.
          </p>
          <span className="h-px w-10 bg-rehevo-amber" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.08] tracking-tight text-foreground max-w-3xl mb-10"
        >
          The next conversation is real.
          <br />
          Your rehearsal doesn&apos;t have to be.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mb-14"
        >
          <Link href="/signup">
            <button
              className="
                group flex items-center gap-3 px-8 py-3.5
                border border-foreground/40 hover:border-foreground/70
                rounded-full text-sm font-medium text-foreground
                hover:bg-foreground/5
                transition-all duration-300
                cursor-pointer
              "
            >
              Start rehearsing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <FinalCTASignal />
        </motion.div>
      </div>
    </section>
  );
}

export { FinalCTASection };
