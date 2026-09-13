"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Settings2,
  Lock,
  Bell,
  User,
  ChevronRight,
  Shield,
  ArrowRight,
} from "lucide-react";
import { SettingsSignOut } from "@/components/rehevo/settings-sign-out";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TabId = "profile" | "preferences" | "privacy" | "notifications";

const TABS: { id: TabId; icon: typeof User; label: string }[] = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "preferences", icon: Settings2, label: "Preferences" },
  { id: "privacy", icon: Lock, label: "Privacy & Security" },
  { id: "notifications", icon: Bell, label: "Notifications" },
];

interface SettingsPageClientProps {
  displayName: string;
  email: string;
  focusArea: string;
  joinedDate: string;
  initials: string;
}

/* ------------------------------------------------------------------ */
/*  Shared visual primitives                                           */
/* ------------------------------------------------------------------ */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-surface-light/10 bg-ink-900/40 p-6 md:p-7">
      {children}
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors duration-200 ${
        on ? "bg-rehevo-amber" : "bg-surface-light/15"
      }`}
    >
      <span
        className="absolute top-1 w-4 h-4 rounded-full bg-surface-light transition-all duration-200"
        style={{ left: on ? "calc(100% - 1.25rem)" : "0.25rem" }}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab panels                                                         */
/* ------------------------------------------------------------------ */

function ProfilePanel({
  displayName,
  email,
  focusArea,
  joinedDate,
  initials,
}: SettingsPageClientProps) {
  return (
    <Panel>
      {/* Avatar + name row */}
      <div className="flex items-start sm:items-center gap-4 sm:gap-5 mb-6">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #F59E3B 0%, #B06A1A 100%)",
          }}
        >
          <span className="font-serif text-lg sm:text-xl text-ink-950 font-medium">
            {initials}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-xl text-surface-light leading-snug">
            {displayName}
          </h2>
          <p className="text-sm text-surface-light/50 mt-0.5 truncate">
            {email}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide text-rehevo-amber border border-rehevo-amber/30 bg-rehevo-amber/10">
            <span className="w-1.5 h-1.5 rounded-full bg-rehevo-amber" />
            Active member
          </span>
        </div>

        <button className="flex-shrink-0 hidden sm:flex items-center gap-1.5 text-[11px] text-surface-light/50 hover:text-surface-light transition-colors px-3 py-1.5 rounded-md border border-surface-light/15 hover:border-surface-light/30">
          Edit profile
        </button>
      </div>

      <div className="border-t border-surface-light/[0.07] mb-6" />

      {/* Personal information */}
      <div>
        <h3 className="text-sm font-medium text-surface-light mb-4">
          Personal Information
        </h3>
        <div className="flex flex-col gap-4">
          {[
            { label: "Full Name", value: displayName },
            { label: "Email Address", value: email },
            { label: "Practice Focus", value: focusArea },
            { label: "Joined", value: joinedDate },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-surface-light/35 min-w-[110px] flex-shrink-0">
                {label}
              </p>
              <p className="text-sm text-surface-light/80 text-right">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-surface-light/[0.07]">
        <Shield className="w-3.5 h-3.5 text-surface-light/25 flex-shrink-0" />
        <p className="text-[11px] text-surface-light/35">
          Your information is secure and only visible to you.
        </p>
      </div>
    </Panel>
  );
}

function PreferencesPanel() {
  const PREFERENCES = [
    { label: "Default difficulty", value: "Moderate" },
    { label: "Session length", value: "5 minutes" },
    { label: "Auto-play AI responses", value: "On" },
    { label: "Rehearsal environment", value: "Quiet room" },
    { label: "Voice feedback speed", value: "Normal" },
  ];

  return (
    <Panel>
      <h3 className="text-sm font-medium text-surface-light mb-3">
        Practice Preferences
      </h3>
      <div className="flex flex-col">
        {PREFERENCES.map(({ label, value }, i) => (
          <button
            key={label}
            className={`flex items-center justify-between py-3.5 text-left group ${
              i !== PREFERENCES.length - 1
                ? "border-b border-surface-light/[0.07]"
                : ""
            }`}
          >
            <span className="text-sm text-surface-light/70 group-hover:text-surface-light transition-colors">
              {label}
            </span>
            <span className="flex items-center gap-2 text-sm text-surface-light/45">
              {value}
              <ChevronRight className="w-4 h-4 text-surface-light/20 group-hover:text-surface-light/50 transition-colors" />
            </span>
          </button>
        ))}
      </div>
      <p className="text-[11px] text-surface-light/30 mt-4 pt-3 border-t border-surface-light/[0.07]">
        Preferences are applied to all future rehearsals.
      </p>
    </Panel>
  );
}

function PrivacyPanel() {
  const SECURITY_ITEMS = [
    { label: "Change password", value: null },
    { label: "Two-factor authentication", value: "Off" },
    { label: "Session recording", value: "Private" },
    { label: "Data retention", value: "30 days" },
  ];

  return (
    <Panel>
      <h3 className="text-sm font-medium text-surface-light mb-3">
        Account Security
      </h3>

      <div className="flex flex-col">
        {SECURITY_ITEMS.map(({ label, value }, i) => (
          <button
            key={label}
            className={`flex items-center justify-between py-3 text-left group ${
              i !== SECURITY_ITEMS.length - 1
                ? "border-b border-surface-light/[0.07]"
                : ""
            }`}
          >
            <span className="text-sm text-surface-light/70 group-hover:text-surface-light transition-colors">
              {label}
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              {value && (
                <span className="text-surface-light/40 text-[11px]">
                  {value}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-surface-light/20 group-hover:text-surface-light/50 transition-colors" />
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-light/[0.07]">
        <Shield className="w-3.5 h-3.5 text-surface-light/25 flex-shrink-0" />
        <p className="text-[11px] text-surface-light/35">
          Your rehearsal data is private and never shared.
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-surface-light/[0.07]">
        <SettingsSignOut />
      </div>
    </Panel>
  );
}

function NotificationsPanel() {
  const NOTIFICATION_ITEMS = [
    {
      key: "email",
      label: "Email notifications",
      description: "Weekly practice summaries and reminders",
    },
    {
      key: "inApp",
      label: "In-app alerts",
      description: "Coaching tips and session reminders",
    },
    {
      key: "weekly",
      label: "Weekly report",
      description: "Your progress digest every Monday",
    },
    {
      key: "streak",
      label: "Streak reminders",
      description: "Don't lose your practice streak",
    },
  ];

  const [state, setState] = useState<Record<string, boolean>>({
    email: true,
    inApp: true,
    weekly: false,
    streak: false,
  });

  return (
    <Panel>
      <h3 className="text-sm font-medium text-surface-light mb-3">
        Notification Preferences
      </h3>
      <div className="flex flex-col">
        {NOTIFICATION_ITEMS.map(({ key, label, description }, i) => (
          <div
            key={key}
            className={`flex items-center justify-between gap-4 py-4 ${
              i !== NOTIFICATION_ITEMS.length - 1
                ? "border-b border-surface-light/[0.07]"
                : ""
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-surface-light/70">{label}</p>
              <p className="text-[11px] text-surface-light/35">{description}</p>
            </div>
            <Toggle
              on={state[key]}
              onToggle={() => setState((s) => ({ ...s, [key]: !s[key] }))}
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress card (persistent right column)                            */
/* ------------------------------------------------------------------ */

function ProgressCard() {
  return (
    <div className="relative rounded-lg overflow-hidden border border-surface-light/10">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/final-cta.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
      </div>

      <div className="relative z-10 p-6">
        <span className="h-px w-6 bg-rehevo-amber/80 block mb-4" />
        <h3 className="font-serif text-2xl leading-snug mb-2">
          Small steps.
          <br />
          Big progress.
        </h3>
        <p className="text-xs text-surface-light/50 leading-relaxed mb-6">
          Every rehearsal builds a more confident you.
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { value: "8", label: "Sessions" },
            { value: "3", label: "Day streak" },
            { value: "+12%", label: "Improvement" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-xl leading-none mb-1">{value}</p>
              <p className="text-[10px] text-surface-light/40 leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>

        <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-rehevo-amber/25 bg-rehevo-amber/10 hover:bg-rehevo-amber/15 transition-colors duration-200">
          <span className="text-sm text-surface-light/80">
            View detailed progress
          </span>
          <ArrowRight className="w-4 h-4 text-rehevo-amber" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root client component                                              */
/* ------------------------------------------------------------------ */

export function SettingsPageClient(props: SettingsPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <>
      {/* ── Mobile tab strip (full-bleed, scrollable) ── */}
      <div className="lg:hidden -mx-6 px-6 mb-5">
        <div
          className="flex gap-1.5 overflow-x-auto pb-0.5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap min-h-[36px] border ${
                  isActive
                    ? "text-surface-light bg-surface-light/10 border-rehevo-amber/40"
                    : "text-surface-light/50 hover:text-surface-light/80 bg-surface-light/[0.04] border-surface-light/10"
                }`}
              >
                <tab.icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-rehevo-amber" : "text-surface-light/30"
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-8 xl:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col gap-6">
          <nav className="flex flex-col gap-0.5" aria-label="Account settings">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150 w-full text-left ${
                    isActive
                      ? "bg-rehevo-amber/10 text-surface-light font-medium border-l-2 border-rehevo-amber"
                      : "text-surface-light/50 hover:text-surface-light hover:bg-surface-light/[0.04] border-l-2 border-transparent"
                  }`}
                >
                  <tab.icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-rehevo-amber" : "text-surface-light/30"
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Tagline */}
          <div className="mt-auto pt-12 lg:pt-20">
            <div className="w-6 h-px bg-surface-light/20 mb-4" />
            <p className="font-serif text-sm leading-snug text-surface-light/40 italic">
              Better conversations build a stronger you.
            </p>
          </div>
        </aside>

        {/* Tab content */}
        <main aria-live="polite" className="min-w-0">
          {activeTab === "profile" && <ProfilePanel {...props} />}
          {activeTab === "preferences" && <PreferencesPanel />}
          {activeTab === "privacy" && <PrivacyPanel />}
          {activeTab === "notifications" && <NotificationsPanel />}
        </main>

        {/* Persistent right column */}
        <aside className="flex flex-col gap-4 min-w-0">
          <ProgressCard />
        </aside>
      </div>
    </>
  );
}
