"use client";

import { motion } from "motion/react";

const BARS = [3, 6, 10, 14, 9, 12, 7, 11, 5, 8];

function RehevoWaveform({ active = false }: { active?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className="block w-[2px] rounded-full bg-rehevo-amber"
          style={{ height: `${h}px` }}
          animate={
            active
              ? { scaleY: [1, 1.6, 0.8, 1.4, 1] }
              : { scaleY: 1 }
          }
          transition={
            active
              ? {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }
              : { duration: 0 }
          }
        />
      ))}
    </div>
  );
}

export { RehevoWaveform };
