"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { RehevoButton } from "@/components/rehevo/rehevo-button";

function RehevoLogo() {
  return (
    <Image src="/rehevo-logo.png" alt="Rehevo Logo" width={1000} height={1000} className="w-24 h-auto" />
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = (await import("@/lib/supabase/client")).createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/onboarding";
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-ink-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/onboarding/onboarding-desktop.png"
          alt=""
          fill
          priority
          className="hidden md:block object-cover object-center"
          style={{ opacity: 0.3 }}
          sizes="(max-width: 767px) 100vw"
        />
        <Image
          src="/images/onboarding/onboarding-mobile.png"
          alt=""
          fill
          priority
          className="block md:hidden object-cover object-center"
          style={{ opacity: 0.2 }}
          sizes="(max-width: 767px) 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/40 to-ink-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/30 via-transparent to-ink-950/20" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <div className="w-full max-w-[720px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col gap-12 flex-1">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <RehevoLogo />
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.08] tracking-tight">
              Create your account.
            </h1>
            <p className="text-sm md:text-base text-foreground/55 leading-relaxed max-w-md">
              Start rehearsing today.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
              {error && (
                <p className="text-sm text-error">{error}</p>
              )}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium tracking-wide text-foreground/55 uppercase">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="
                    w-full h-[46px] px-4
                    bg-ink-800/50 border border-foreground/12
                    text-sm text-foreground placeholder:text-foreground/25
                    outline-none
                    focus:border-rehevo-amber/40 focus:ring-1 focus:ring-rehevo-amber/15
                    transition-all duration-200
                  "
                  style={{ borderRadius: "3px" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium tracking-wide text-foreground/55 uppercase">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    w-full h-[46px] px-4
                    bg-ink-800/50 border border-foreground/12
                    text-sm text-foreground placeholder:text-foreground/25
                    outline-none
                    focus:border-rehevo-amber/40 focus:ring-1 focus:ring-rehevo-amber/15
                    transition-all duration-200
                  "
                  style={{ borderRadius: "3px" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium tracking-wide text-foreground/55 uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="
                      w-full h-[46px] px-4 pr-10
                      bg-ink-800/50 border border-foreground/12
                      text-sm text-foreground placeholder:text-foreground/25
                      outline-none
                      focus:border-rehevo-amber/40 focus:ring-1 focus:ring-rehevo-amber/15
                      transition-all duration-200
                    "
                    style={{ borderRadius: "3px" }}
                  />
                  <button
                    type="button"
                    aria-label={showPw ? "Hide password" : "Show password"}
                    onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/35 hover:text-foreground/65 transition-colors"
                  >
                    {showPw ? <EyeOff className="h-[15px] w-[15px]" /> : <Eye className="h-[15px] w-[15px]" />}
                  </button>
                </div>
              </div>

              <RehevoButton type="submit" variant="default" size="lg" className="w-full mt-2" disabled={loading}>
                {loading ? "Creating account..." : "Sign up"}
              </RehevoButton>
            </form>

            <p className="text-[11px] text-foreground/35">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-rehevo-amber hover:text-rehevo-amber/75 transition-colors cursor-pointer"
              >
                Log in
              </button>
            </p>
          </motion.div>

          <motion.div
            className="h-px bg-rehevo-amber/25"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
