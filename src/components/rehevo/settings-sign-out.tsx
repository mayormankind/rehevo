"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SettingsSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 text-error/80 hover:text-error hover:bg-error/10 border border-error/20"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>Sign out</span>
    </button>
  );
}
