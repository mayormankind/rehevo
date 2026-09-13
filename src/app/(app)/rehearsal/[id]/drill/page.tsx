import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DrillClient from "@/components/rehevo/drill-client";

export const metadata: Metadata = {
  title: "Drill — REHEVO",
};

export default async function DrillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data,
  } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  const { data: session } = await supabase
    .from("rehearsal_sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (!session) {
    redirect("/dashboard");
  }

  return <DrillClient sessionId={id} />;
}
