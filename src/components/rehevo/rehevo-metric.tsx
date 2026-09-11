import { cn } from "@/lib/utils";

interface RehevoMetricProps {
  label: string;
  value: number;
  className?: string;
}

function RehevoMetric({ label, value, className }: RehevoMetricProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-foreground/50 whitespace-nowrap">
        {label}
      </p>
      <p className="font-serif text-2xl text-foreground leading-none">{value}</p>
      <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ backgroundColor: "rgba(235,230,225,0.12)" }}>
        <div
          className="h-full rounded-full bg-rehevo-amber transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export { RehevoMetric };
