import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { EditorialHeading } from "@/components/rehevo/editorial-heading";
import { Surface } from "@/components/rehevo/surface";
import { RehevoMetric } from "@/components/rehevo/rehevo-metric";
import { RehevoWaveform } from "@/components/rehevo/rehevo-waveform";
import { RehevoTimeline } from "@/components/rehevo/rehevo-timeline";
import { RehevoObservation } from "@/components/rehevo/rehevo-observation";
import { Input } from "@/components/ui/input";

const DIMENSIONS = [
  { label: "Composure", value: 82 },
  { label: "Clarity", value: 76 },
  { label: "Specificity", value: 68 },
  { label: "Reasoning", value: 84 },
  { label: "Delivery", value: 79 },
];

const TIMELINE_EVENTS = [
  { time: "00:00", label: "Rehearsal begins", active: false },
  { time: "01:12", label: "Your response", active: true },
  { time: "02:41", label: "Follow-up question", active: false },
  { time: "04:18", label: "Rehearsal ends", active: false },
];

export default function DesignLabPage() {
  return (
    <main className="min-h-screen antialiased">
      {/* PREPARE */}
      <section className="bg-surface-light text-ink-950 px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="w-full max-w-[720px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <SectionLabel>Prepare</SectionLabel>
            <EditorialHeading level={1}>
              The useful part comes after.
            </EditorialHeading>
            <p className="text-base text-ink-800/75 leading-relaxed max-w-md">
              REHEVO shows you what happened while you were thinking on your feet.
              Not a score. A clearer picture of how you communicated.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <SectionLabel>Typography</SectionLabel>
              <div className="flex flex-col gap-3">
                <p className="font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight">
                  Instrument Serif
                </p>
                <p className="font-serif text-2xl italic text-ink-800/70">
                  Editorial, warm, human.
                </p>
                <p className="text-base text-ink-800/60">
                  Geist for UI. Instrument Serif for headlines. The contrast creates recognition without decoration.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Buttons</SectionLabel>
              <div className="flex flex-wrap items-center gap-4">
                <RehevoButton variant="default" size="default">
                  Begin rehearsal
                </RehevoButton>
                <RehevoButton variant="outline" size="default">
                  Enter the room
                </RehevoButton>
                <RehevoButton variant="ghost" size="default">
                  Back to desk
                </RehevoButton>
                <RehevoButton variant="secondary" size="default">
                  Secondary action
                </RehevoButton>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <RehevoButton variant="default" size="sm">
                  Small primary
                </RehevoButton>
                <RehevoButton variant="default" size="lg">
                  Large primary
                </RehevoButton>
                <RehevoButton variant="default" disabled>
                  Disabled
                </RehevoButton>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Inputs</SectionLabel>
              <div className="flex flex-col gap-3 max-w-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-wide text-ink-800/55 uppercase">
                    What are you preparing for?
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Performance review with a direct report"
                    className="bg-white border-ink-800/15 text-ink-950 placeholder:text-ink-800/35 focus:border-rehevo-amber/50 focus:ring-rehevo-amber/15"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-wide text-ink-800/55 uppercase">
                    Additional context
                  </label>
                  <Input
                    type="text"
                    placeholder="Optional details..."
                    className="bg-white border-ink-800/15 text-ink-950 placeholder:text-ink-800/35 focus:border-rehevo-amber/50 focus:ring-rehevo-amber/15"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Surface</SectionLabel>
              <Surface className="p-6">
                <p className="font-serif text-lg text-ink-950 mb-2">
                  Meaningful panels, not card grids.
                </p>
                <p className="text-sm text-ink-800/60 leading-relaxed">
                  Surfaces represent content, not containers. Use them sparingly.
                  The rehearsal room should feel quiet, not cluttered.
                </p>
              </Surface>
            </div>
          </div>
        </div>
      </section>

      {/* REHEARSE */}
      <section className="bg-ink-950 text-foreground px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="w-full max-w-[720px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <StageCue type={2} />
              <SectionLabel>Rehearse</SectionLabel>
            </div>
            <EditorialHeading level={2}>
              The room is the product.
            </EditorialHeading>
            <p className="text-base text-foreground/60 leading-relaxed max-w-md">
              Deep ink. Minimal chrome. Cinematic negative space. The user should feel:
              <em className="font-serif text-foreground/80"> I am here to practice.</em>
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <SectionLabel>Stage Cue</SectionLabel>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-rehevo-amber" />
                  <span className="text-xs text-foreground/50 tracking-wide">Active state</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-rehevo-amber/80" />
                  <span className="text-xs text-foreground/50 tracking-wide">Section cue</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Waveform</SectionLabel>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <RehevoWaveform active={false} />
                  <span className="text-xs text-foreground/40 tracking-wide">Idle</span>
                </div>
                <div className="flex items-center gap-4">
                  <RehevoWaveform active={true} />
                  <span className="text-xs text-rehevo-amber tracking-wide">Listening</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Rehearsal State</SectionLabel>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-4 py-3 border border-foreground/10 rounded-[6px] bg-ink-900/30">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber" />
                    <span className="text-sm text-foreground/80 tracking-wide">Listening</span>
                  </div>
                  <span className="text-xs font-mono text-foreground/40">00:42</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border border-foreground/10 rounded-[6px] bg-ink-900/30">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber animate-pulse" />
                    <span className="text-sm text-foreground/80 tracking-wide">User speaking</span>
                  </div>
                  <RehevoWaveform active={true} />
                </div>
                <div className="flex items-center justify-between px-4 py-3 border border-foreground/10 rounded-[6px] bg-ink-900/30">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
                    <span className="text-sm text-foreground/50 tracking-wide">AI responding</span>
                  </div>
                  <span className="text-xs font-mono text-foreground/30">Processing</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Primary Action</SectionLabel>
              <RehevoButton variant="default" size="lg" className="w-full sm:w-auto">
                Begin rehearsal
              </RehevoButton>
            </div>
          </div>
        </div>
      </section>

      {/* REFLECT */}
      <section className="bg-surface-light text-ink-950 px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="w-full max-w-[720px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <SectionLabel>Reflect</SectionLabel>
            <EditorialHeading level={2}>
              What happened while you were thinking on your feet.
            </EditorialHeading>
            <p className="text-base text-ink-800/75 leading-relaxed max-w-md">
              Review the moments where you lost ground. See the exact timestamps,
              hear the follow-ups, and understand what happened.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <SectionLabel>Performance Dimensions</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {DIMENSIONS.map((dim) => (
                  <RehevoMetric key={dim.label} label={dim.label} value={dim.value} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Timeline</SectionLabel>
              <RehevoTimeline events={TIMELINE_EVENTS} />
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Observation</SectionLabel>
              <RehevoObservation
                title="Your reasoning was strong, but your answer became less specific when challenged on ownership."
                body="You provided a solid perspective, but the follow-up revealed a gap in detail around accountability and next steps."
                actionLabel="Drill this moment"
              />
            </div>

            <div className="flex flex-col gap-4">
              <SectionLabel>Attempt Comparison</SectionLabel>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-6">
                  <span className="text-xs text-ink-800/50 tracking-wide">First attempt</span>
                  <span className="font-serif text-xl text-ink-950">68</span>
                  <span className="text-xs text-ink-800/40">Specificity</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-rehevo-amber tracking-wide font-medium">Second attempt</span>
                  <span className="font-serif text-xl text-ink-950">84</span>
                  <span className="text-xs text-ink-800/40">Specificity</span>
                </div>
                <p className="text-sm text-ink-800/60 leading-relaxed max-w-md mt-2">
                  You answered with a concrete example this time instead of describing the situation generally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOKENS */}
      <section className="bg-ink-950 text-foreground px-6 md:px-12 lg:px-16 py-24 md:py-32 border-t border-foreground/[0.07]">
        <div className="w-full max-w-[720px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <SectionLabel>Tokens</SectionLabel>
            <EditorialHeading level={3}>
              REHEVO colour system
            </EditorialHeading>
            <p className="text-sm text-foreground/55 leading-relaxed max-w-md">
              90% neutral/ink/surface - 5% amber - 3% blue - 2% semantic
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Ink 950", value: "#0B0F14" },
              { name: "Ink 900", value: "#11161C" },
              { name: "Ink 800", value: "#1A1F26" },
              { name: "Ink 700", value: "#2A2F36" },
              { name: "Amber", value: "#F59E3B" },
              { name: "Surface Light", value: "#EBE6E1" },
              { name: "Info Blue", value: "#3882F6" },
              { name: "Success", value: "#10B981" },
              { name: "Error", value: "#EF4444" },
            ].map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div
                  className="h-12 rounded-[6px] border border-foreground/10"
                  style={{ backgroundColor: color.value }}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium tracking-wide text-foreground/70">
                    {color.name}
                  </span>
                  <span className="text-[9px] font-mono text-foreground/40">
                    {color.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
