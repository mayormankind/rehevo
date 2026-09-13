import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SectionLabel } from "@/components/rehevo/section-label";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SettingsPageClient } from "@/components/rehevo/settings-page-client";

export const metadata: Metadata = {
  title: "Account — REHEVO",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, primary_category, created_at")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || "Your Name";
  const email = user.email || "";
  const focusArea = profile?.primary_category || "Not set";
  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className="bg-ink-950 text-surface-light antialiased">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20">
        {/* Header block */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <StageCue type={2} />
            <SectionLabel>Account</SectionLabel>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.08] tracking-tight">
            Your profile
          </h1>
          <p className="mt-3 text-sm text-surface-light/50 leading-relaxed max-w-xs">
            Manage your personal information, preferences, and practice
            settings.
          </p>
        </div>

        <SettingsPageClient
          displayName={displayName}
          email={email}
          focusArea={focusArea}
          joinedDate={joinedDate}
          initials={initials}
        />
      </div>
    </main>
  );
}
