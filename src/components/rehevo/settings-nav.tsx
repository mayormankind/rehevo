"use client";

import { Settings2, Lock, Bell, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "preferences", icon: Settings2, label: "Preferences" },
  { id: "privacy", icon: Lock, label: "Privacy & Security" },
  { id: "notifications", icon: Bell, label: "Notifications" },
] as const;

type TabId = (typeof NAV_ITEMS)[number]["id"];

interface SettingsNavProps {
  value: TabId;
  onChange: (id: TabId) => void;
}

/**
 * Settings nav that:
 * - On mobile: horizontal scrollable pill strip
 * - On desktop (lg+): vertical sidebar list with left-border active indicator
 *
 * Controlled via `value` + `onChange` so the parent can render the correct
 * content panel.
 */
export function SettingsNav({ value, onChange }: SettingsNavProps) {
  return (
    <>
      {/* ── Mobile: horizontal scrollable tab strip ── */}
      <div className="lg:hidden -mx-6 px-6 mb-5">
        <div
          className="flex gap-1.5 overflow-x-auto pb-0.5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = value === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                aria-pressed={isActive}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap min-h-[36px] border ${
                  isActive
                    ? "text-surface-light bg-surface-light/10 border-rehevo-amber/40"
                    : "text-surface-light/50 hover:text-surface-light/80 bg-surface-light/[0.04] border-surface-light/10"
                }`}
              >
                <item.icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-rehevo-amber" : "text-surface-light/30"
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Desktop: vertical sidebar list ── */}
      <aside className="hidden lg:flex flex-col gap-6">
        <nav className="flex flex-col gap-0.5" aria-label="Account settings">
          {NAV_ITEMS.map((item) => {
            const isActive = value === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150 w-full text-left ${
                  isActive
                    ? "bg-rehevo-amber/10 text-surface-light font-medium border-l-2 border-rehevo-amber"
                    : "text-surface-light/50 hover:text-surface-light hover:bg-surface-light/[0.04] border-l-2 border-transparent"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? "text-rehevo-amber" : "text-surface-light/30"
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Tagline */}
        <div className="mt-auto pt-20">
          <div className="w-6 h-px bg-surface-light/20 mb-4" />
          <p className="font-serif text-sm leading-snug text-surface-light/40 italic">
            Better conversations build a stronger you.
          </p>
        </div>
      </aside>
    </>
  );
}
