import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OnboardingForm from "./onboarding-form";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data,
  } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect("/app/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950 text-foreground">
      <div className="w-full max-w-sm px-6">
        <h1 className="font-serif text-3xl mb-2">What are you preparing for?</h1>
        <p className="text-sm text-foreground/55 mb-8">
          Choose the type of communication you want to practice.
        </p>
        <Suspense fallback={<div className="text-sm text-foreground/45">Loading...</div>}>
          <OnboardingForm />
        </Suspense>
      </div>
    </div>
  );
}
