"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { RehevoWaveform } from "@/components/rehevo/rehevo-waveform";
import { cn } from "@/lib/utils";

type RehearsalState = "ready" | "listening" | "speaking" | "processing" | "responding";

const STATES: { state: RehearsalState; label: string }[] = [
  { state: "ready", label: "Ready" },
  { state: "listening", label: "Listening" },
  { state: "speaking", label: "You are speaking" },
  { state: "processing", label: "Processing" },
  { state: "responding", label: "AI is responding" },
];

const MOCK_SEQUENCE: RehearsalState[] = ["listening", "speaking", "processing", "responding", "listening"];

function RehearsalRoomClient({
  scenarioLabel,
  scenarioTitle,
}: {
  scenarioLabel: string;
  scenarioTitle: string;
}) {
  const router = useRouter();
  const [activeState, setActiveState] = useState<RehearsalState>("ready");
  const [isRunning, setIsRunning] = useState(false);

  const handleBegin = () => {
    setIsRunning(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < MOCK_SEQUENCE.length) {
        setActiveState(MOCK_SEQUENCE[i]);
      } else {
        setActiveState("ready");
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  const handleExit = () => {
    setIsRunning(false);
    router.push("/app/dashboard");
  };

  return (
    <main className="min-h-screen bg-ink-950 text-foreground antialiased flex flex-col">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16 flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <StageCue type={2} />
            <SectionLabel>Rehearse</SectionLabel>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-foreground/40">
              {scenarioLabel}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight leading-[1.08]">
              {scenarioTitle}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-10 flex-1">
          <div className="flex flex-col gap-4">
            <SectionLabel>Rehearsal state</SectionLabel>
            <div className="flex flex-col gap-3">
              {STATES.map((s) => {
                const isActive = activeState === s.state;
                return (
                  <div
                    key={s.state}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 border rounded-[6px] transition-all duration-500",
                      isActive
                        ? "border-rehevo-amber/30 bg-ink-900/30"
                        : "border-foreground/[0.07] bg-ink-900/10 opacity-40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                          isActive ? "bg-rehevo-amber" : "bg-foreground/20"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm tracking-wide transition-colors duration-500",
                          isActive ? "text-foreground/80" : "text-foreground/40"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    {isActive && (
                      <span className="text-xs font-mono text-rehevo-amber/70">Active</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>Voice signal</SectionLabel>
            <div className="flex items-center gap-6">
              <RehevoWaveform active={isRunning} />
              <span className={cn(
                "text-xs tracking-wide transition-colors duration-300",
                isRunning ? "text-rehevo-amber" : "text-foreground/40"
              )}>
                {isRunning ? "Listening" : "Idle"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>Timer</SectionLabel>
            <div className="flex items-center gap-4">
              <span className="font-serif text-4xl text-foreground/80 tracking-tight">
                {isRunning ? "00:42" : "00:00"}
              </span>
              <span className="text-xs text-foreground/40 tracking-wide">
                {isRunning ? "Elapsed" : "Waiting"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>AI prompt</SectionLabel>
            <div className="px-4 py-3 border border-foreground/10 rounded-[6px] bg-ink-900/20">
              <p className="text-sm text-foreground/50 italic">
                Walk me through a decision you made that didn&apos;t work out.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto pt-8">
            <div className="flex flex-col sm:flex-row gap-3">
              {!isRunning ? (
                <RehevoButton
                  variant="default"
                  size="lg"
                  className="flex-1 sm:flex-none"
                  onClick={handleBegin}
                >
                  Begin rehearsal
                </RehevoButton>
              ) : (
                <RehevoButton
                  variant="default"
                  size="lg"
                  className="flex-1 sm:flex-none"
                  onClick={handleExit}
                >
                  End rehearsal
                </RehevoButton>
              )}
              <RehevoButton
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none"
                onClick={handleExit}
              >
                Exit room
              </RehevoButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { RehearsalRoomClient };
