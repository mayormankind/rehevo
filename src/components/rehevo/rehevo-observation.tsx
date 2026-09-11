"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface RehevoObservationProps {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

function RehevoObservation({
  title,
  body,
  actionLabel,
  onAction,
  className,
}: RehevoObservationProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 p-4 rounded-[6px] border border-foreground/10",
        className
      )}
      style={{ backgroundColor: "rgba(235,230,225,0.06)" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full border border-rehevo-amber flex items-center justify-center flex-shrink-0">
          <span className="text-[6px] text-rehevo-amber font-bold">⊙</span>
        </div>
        <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-foreground/55">
          Observation
        </p>
      </div>
      <p className="font-serif text-sm text-foreground leading-snug">
        {title}
      </p>
      <p className="text-[11px] text-foreground/60 leading-[1.4]">
        {body}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-1 self-start flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-rehevo-amber text-rehevo-amber text-[10px] font-medium tracking-wide hover:bg-rehevo-amber/10 transition-colors duration-200 cursor-pointer"
        >
          {actionLabel}
          <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export { RehevoObservation };
