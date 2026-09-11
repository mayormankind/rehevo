import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SectionLabel } from "@/components/rehevo/section-label";
import { EditorialHeading } from "@/components/rehevo/editorial-heading";
import { Surface } from "@/components/rehevo/surface";

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

  return (
    <main className="min-h-screen bg-surface-light text-ink-950 antialiased">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <SectionLabel>Account</SectionLabel>
          <EditorialHeading level={1}>
            Your rehearsal space.
          </EditorialHeading>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionLabel>Profile</SectionLabel>
            <Surface className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-ink-800/50">
                    Name
                  </p>
                  <p className="font-serif text-lg text-ink-950">
                    {profile?.full_name || "Not set"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-ink-800/50">
                    Email
                  </p>
                  <p className="text-sm text-ink-800/70">
                    {user.email}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-ink-800/50">
                    Primary focus
                  </p>
                  <p className="text-sm text-ink-800/70">
                    {profile?.primary_category || "Not set"}
                  </p>
                </div>
              </div>
            </Surface>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>Session</SectionLabel>
            <Surface className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <p className="text-sm text-ink-800/60 leading-relaxed">
                  Your rehearsal data is private. Sessions are stored securely and are only accessible by you.
                </p>
                <p className="text-xs text-ink-800/40">
                  Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </main>
  );
}