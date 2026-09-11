import { cn } from "@/lib/utils";

interface TimelineEvent {
  time: string;
  label: string;
  active?: boolean;
}

interface RehevoTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

function RehevoTimeline({ events, className }: RehevoTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute top-[7px] left-0 right-0 h-px bg-foreground/15" />
      <div className="flex justify-between relative">
        {events.map((ev) => (
          <div key={ev.time} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full border-2 z-10 transition-colors duration-300",
                ev.active
                  ? "bg-rehevo-amber border-rehevo-amber"
                  : "bg-background border-foreground/30"
              )}
            />
            <span
              className={cn(
                "text-[8px] font-medium tracking-wide leading-none transition-colors duration-300",
                ev.active ? "text-foreground font-semibold" : "text-foreground/50"
              )}
            >
              {ev.time}
            </span>
            <span
              className={cn(
                "text-[8px] leading-none text-center max-w-[60px] transition-colors duration-300",
                ev.active ? "text-foreground/80" : "text-foreground/45"
              )}
            >
              {ev.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { RehevoTimeline };
