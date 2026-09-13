"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, ArrowRight, Sprout } from "lucide-react";
import type { Scenario } from "@/lib/constants/scenarios";

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Link
      href={`/scenarios/${scenario.id}/setup`}
      className="group relative block rounded-lg overflow-hidden border border-surface-light/10 bg-ink-900/40 hover:border-surface-light/25 transition-colors duration-300 aspect-[16/11]"
    >
      <Image
        src={scenario.image}
        alt=""
        fill
        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/5" />

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="flex items-center gap-2 text-[10px] font-medium tracking-[0.18em] uppercase text-rehevo-amber mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber" />
          {scenario.label}
        </p>
        <h3 className="font-serif text-xl leading-tight tracking-tight text-surface-light mb-1.5">
          {scenario.title}
        </h3>
        <p className="text-xs text-surface-light/50 leading-relaxed max-w-[240px] mb-4">
          {scenario.description}
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-surface-light/45">
          <Clock className="w-3.5 h-3.5" />
          {scenario.duration}
        </span>
      </div>

      {/* Arrow cue */}
      <span className="absolute bottom-5 right-5 w-8 h-8 rounded-full border border-surface-light/20 flex items-center justify-center group-hover:border-rehevo-amber/60 group-hover:bg-rehevo-amber/10 transition-colors duration-300">
        <ArrowRight className="w-3.5 h-3.5 text-surface-light/50 group-hover:text-rehevo-amber transition-colors duration-300" />
      </span>
    </Link>
  );
}

function BrandTile() {
  return (
    <div className="relative rounded-lg border border-surface-light/[0.07] bg-ink-900/20 aspect-[16/11] flex flex-col items-start justify-center p-6 md:p-8">
      <Sprout
        className="w-5 h-5 text-rehevo-amber/60 mb-5"
        strokeWidth={1.25}
      />
      <p className="font-serif italic text-lg md:text-xl leading-snug text-surface-light/60 max-w-[200px]">
        Better conversations build a stronger you.
      </p>
      <span className="h-px w-6 bg-rehevo-amber/70 mt-5" />
    </div>
  );
}

export function ScenarioBrowser({ scenarios }: { scenarios: Scenario[] }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? scenarios.filter((s) =>
        [s.label, s.title, s.description].join(" ").toLowerCase().includes(q)
      )
    : scenarios;

  return (
    <div>
      {/* Section header + search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-rehevo-amber/80" />
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-surface-light/45">
            All scenarios
          </p>
        </div>

        <div className="relative sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-light/30 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scenarios..."
            aria-label="Search scenarios"
            className="w-full h-9 pl-9 pr-4 rounded-full bg-surface-light/[0.04] border border-surface-light/15 text-xs text-surface-light placeholder:text-surface-light/30 outline-none focus:border-rehevo-amber/50 transition-colors"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-surface-light/10 bg-ink-900/40 p-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-surface-light/50">
            No scenarios match &ldquo;{query}&rdquo;.
          </p>
          <button
            onClick={() => setQuery("")}
            className="text-xs text-rehevo-amber hover:text-rehevo-amber/80 transition-colors"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
          {/* Brand tile fills the last cell when showing the full grid */}
          {!q && <BrandTile />}
        </div>
      )}
    </div>
  );
}
