import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/rehevo/app-shell";

export default async function AppLayout({
  children,
  hideNav = false,
}: {
  children: React.ReactNode;
  hideNav?: boolean;
}) {
  const supabase = await createClient();
  const {
    data,
  } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", data.claims.sub)
    .single();

  const displayName =
    profile?.full_name || (data.claims.email as string) || "Account";

  return (
    <AppShell hideNav={hideNav} displayName={displayName}>
      {children}
    </AppShell>
  );
}
