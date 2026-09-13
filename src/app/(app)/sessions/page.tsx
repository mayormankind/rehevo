import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RehevoButton } from "@/components/rehevo/rehevo-button";
import { StageCue } from "@/components/rehevo/stage-cue";
import { SectionLabel } from "@/components/rehevo/section-label";
import { EditorialHeading } from "@/components/rehevo/editorial-heading";

export const metadata: Metadata = {
  title: "Sessions — REHEVO",
};

export default async function SessionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: sessions } = await supabase
    .from("rehearsal_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-surface-light text-ink-950 antialiased">
      <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <StageCue type={2} />
            <SectionLabel>Sessions</SectionLabel>
          </div>
          <EditorialHeading level={1}>
            Your rehearsal history.
          </EditorialHeading>
        </div>

        {!sessions || sessions.length === 0 ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-ink-800/70">
              No rehearsals yet. Start your first rehearsal from the Prepare page.
            </p>
            <RehevoButton variant="default" href="/dashboard">
              Start rehearsing
            </RehevoButton>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="px-5 py-4 border border-ink-800/10 rounded-[6px] hover:border-ink-800/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-rehevo-amber">
                      {session.scenario_id}
                    </p>
                    <p className="text-sm text-ink-800/70">
                      {session.context || "No context provided"}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-ink-800/40 flex-shrink-0">
                    {new Date(session.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
