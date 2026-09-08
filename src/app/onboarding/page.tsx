"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mic,
  Zap,
  BarChart2,
  TrendingUp,
  Check,
  Target,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ScreenName = "splash" | "signup" | "feature" | "final" | "login";

// ─── Animation Variants ───────────────────────────────────────────────────────

const SCREEN_VARIANTS = {
  initial: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 48 : -48,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -48 : 48,
  }),
};

const SCREEN_TRANSITION = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
});

// ─── Logo 
function RehevoLogo() {
  return (
    <Image src="/rehevo-logo.png" alt="Rehevo Logo" width={1000} height={1000} className="w-30 h-auto" />
  )
}
// ─── Background Image (responsive) ───────────────────────────────────────────

function FullBleedBg({
  opacity = 65,
  overlayStrength = "medium",
}: {
  opacity?: number;
  overlayStrength?: "light" | "medium" | "heavy";
}) {
  const overlays: Record<typeof overlayStrength, string> = {
    light:
      "bg-gradient-to-b from-ink-950/50 via-ink-950/20 to-ink-950/60",
    medium:
      "bg-gradient-to-b from-ink-950/65 via-ink-950/35 to-ink-950/75",
    heavy:
      "bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950/90",
  };

  return (
    <div className="absolute inset-0 z-0">
      {/* Desktop image */}
      <Image
        src="/images/onboarding/onboarding-desktop.png"
        alt=""
        fill
        priority
        className="hidden md:block object-cover object-center"
        style={{ opacity: opacity / 100 }}
        sizes="100vw"
      />
      {/* Mobile image */}
      <Image
        src="/images/onboarding/onboarding-mobile.png"
        alt=""
        fill
        priority
        className="block md:hidden object-cover object-center"
        style={{ opacity: opacity / 100 }}
        sizes="100vw"
      />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${overlays[overlayStrength]}`} />
      {/* Subtle left-to-right fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 via-transparent to-ink-950/20" />
    </div>
  );
}

// ─── Form Input ───────────────────────────────────────────────────────────────

function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPw ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-wide text-foreground/55 uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          type={resolvedType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
        {isPassword && (
          <button
            type="button"
            aria-label={showPw ? "Hide password" : "Show password"}
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/35 hover:text-foreground/65 transition-colors"
          >
            {showPw ? (
              <EyeOff className="h-[15px] w-[15px]" />
            ) : (
              <Eye className="h-[15px] w-[15px]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Social Auth Button ───────────────────────────────────────────────────────

function SocialBtn() {
  return (
    <button
      type="button"
      className="
        w-full h-[46px] flex items-center justify-center gap-3
        bg-transparent border border-foreground/12 hover:border-foreground/28
        hover:bg-foreground/[0.04] text-sm text-foreground/75
        transition-all duration-200 cursor-pointer rounded-full
      ">
      {/* Google colour logo */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
}

// ─── Dot Progress ─────────────────────────────────────────────────────────────

function DotProgress({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={current + 1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          animate={{
            width: i === current ? 22 : 6,
            backgroundColor:
              i === current
                ? "#F59E3B"
                : i < current
                  ? "rgba(245,158,59,0.4)"
                  : "rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 6, display: "block", borderRadius: 999 }}
        />
      ))}
    </div>
  );
}

// ─── Mini Progress Chart (Track Your Growth slide) ────────────────────────────

function MiniProgressChart() {
  const bars = [3, 5, 4, 7, 6, 9, 8, 11, 10, 14];
  const checkItems = ["Focus", "Consistency", "Growth"];

  return (
    <motion.div
      className="w-full mb-7 p-4 bg-ink-900/70 border border-foreground/10 backdrop-blur-sm"
      style={{ borderRadius: "6px" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-foreground/70 tracking-wide">
          Your Progress
        </p>
        <TrendingUp className="h-3.5 w-3.5 text-rehevo-amber" />
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-[3px] h-12 mb-4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-rehevo-amber/60 rounded-[1px]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              delay: 0.08 + i * 0.04,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              height: `${(h / 14) * 100}%`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>

      {/* Check items */}
      <div className="flex flex-col gap-1.5">
        {checkItems.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <Check className="h-3 w-3 text-rehevo-amber flex-shrink-0" />
            <span className="text-xs text-foreground/55">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Feature slide data ───────────────────────────────────────────────────────

const FEATURE_SLIDES = [
  {
    icon: Target,
    headline: "Practice what matters.",
    body: "Choose your scenario, set your focus, and step into a rehearsal room built for the moments that count.",
  },
  {
    icon: Mic,
    headline: "Build your rehearsal space.",
    body: "Create custom sessions, set your goals, and get the feedback you need to grow.",
  },
  {
    icon: Zap,
    headline: "Get AI-powered feedback.",
    body: "Receive detailed, constructive feedback on your performance, so you can improve faster.",
  },
  {
    icon: BarChart2,
    headline: "Track your growth.",
    body: "See your progress, revisit your sessions, and celebrate your wins.",
    showChart: true,
  },
] as const;

// ─── Screen: Splash ──────────────────────────────────────────────────────────

function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <FullBleedBg opacity={30} overlayStrength="light" />

      {/* Content — desktop: left-anchored, mobile: centered */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Nav-level logo */}
        {/* <div className="px-8 md:px-14 pt-10 md:pt-12">
          <RehevoLogo />
        </div> */}

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="px-8 md:px-14 py-16 max-w-2xl">
            <div className="py-10 md:py-12 m-auto">
              <RehevoLogo />
            </div>
            {/* Headline */}
            <motion.h1
              {...fadeUp(0.12)}
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground mb-6"
            >
              Practice. Improve. Perform.
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              {...fadeUp(0.22)}
              className="text-base md:text-lg text-foreground/55 leading-relaxed mb-12 max-w-sm"
            >
              AI-powered rehearsal feedback for creators, performers and
              professionals.
            </motion.p>

            {/* CTA */}
            <motion.div {...fadeUp(0.32)} className="flex items-center gap-4 flex-wrap">
              <motion.button
                onClick={onNext}
                className="
                  inline-flex items-center gap-3 px-8 py-3.5
                  bg-rehevo-amber text-ink-950 font-medium text-sm
                  rounded-full hover:bg-rehevo-amber/90
                  transition-all duration-200 cursor-pointer
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <Link
                href="/onboarding?view=login"
                onClick={(e) => {
                  e.preventDefault();
                  onNext(); // handled by parent as sign-up; login accessible from there
                }}
                className="text-sm text-foreground/45 hover:text-foreground/70 transition-colors"
              >
                Already have an account?{" "}
                <span className="text-rehevo-amber">Sign in</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom amber line cue */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-rehevo-amber/25 z-10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Screen: Sign Up ─────────────────────────────────────────────────────────

function SignUpScreen({
  onNext,
  onLogin,
}: {
  onNext: () => void;
  onLogin: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-ink-950">
      {/* ── Left image panel (desktop only) ── */}
      <div className="hidden md:block relative w-[42%] xl:w-[45%] flex-shrink-0 overflow-hidden">
        <Image
          src="/images/onboarding/onboarding-desktop.png"
          alt=""
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="45vw"
        />
        {/* Right-edge fade into the form panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink-950/10 to-ink-950/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-950/50" />
      </div>

      {/* ── Right form panel ── */}
      <div className="relative flex-1 flex flex-col min-h-screen">
        {/* Mobile background — top-half image bleed */}
        <div className="absolute inset-0 md:hidden pointer-events-none">
          <Image
            src="/images/onboarding/onboarding-mobile.png"
            alt=""
            fill
            className="object-cover object-top opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/85 to-ink-950" />
        </div>

        <div className="relative z-10 flex flex-col flex-1 px-7 md:px-12 xl:px-14 py-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <RehevoLogo />
          </div>

          {/* Form */}
          <motion.div
            className="flex-1 flex flex-col justify-center max-w-[360px]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-2">
              Create your account
            </h1>
            <p className="text-sm text-foreground/45 mb-8 leading-relaxed">
              Join a{" "}
              <span className="text-foreground/75 font-medium">community</span>{" "}
              of creators, performers and professionals.
            </p>

            <div className="flex flex-col gap-3.5 mb-6">
              <FormField
                label="Full name"
                placeholder="John Doe"
                value={name}
                onChange={setName}
              />
              <FormField
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
              />
              <FormField
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={setPassword}
              />
            </div>

            {/* Primary CTA */}
            <button
              onClick={onNext}
              className="
                w-full h-12 flex items-center justify-center gap-2
                bg-rehevo-amber text-ink-950 font-medium text-sm
                rounded-full hover:bg-rehevo-amber/90
                transition-all duration-200 cursor-pointer mb-5
              "
            >
              Sign up
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Or divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="text-[11px] text-foreground/30">or</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            {/* Social auth */}
            <div className="flex flex-col gap-2.5">
              <SocialBtn />
            </div>

            {/* Login link */}
            <p className="text-[11px] text-center text-foreground/35 mt-8">
              Already have an account?{" "}
              <button
                onClick={onLogin}
                className="text-rehevo-amber hover:text-rehevo-amber/75 transition-colors cursor-pointer"
              >
                Log in
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Feature Slide ────────────────────────────────────────────────────

function FeatureSlide({
  slideIndex,
  total,
  onNext,
  onSkip,
}: {
  slideIndex: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const slide = FEATURE_SLIDES[slideIndex];
  const Icon = slide.icon;
  const isLast = slideIndex === total - 1;
  const showChart = "showChart" in slide && slide.showChart;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <FullBleedBg opacity={55} overlayStrength="heavy" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-7 md:px-12 pt-8 md:pt-10">
        <span className="text-[11px] font-medium tracking-[0.14em] text-foreground/45">
          {slideIndex + 1} of {total}
        </span>
        <button
          onClick={onSkip}
          className="text-[11px] font-medium text-foreground/45 hover:text-foreground/70 transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main content — bottom-anchored */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-7 md:px-12 pb-10 md:pb-14 pt-8">
        {/* Chart (only on last slide) */}
        {showChart && <MiniProgressChart />}

        {/* Icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`icon-${slideIndex}`}
            className="mb-6"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center border border-rehevo-amber/35 bg-ink-950/35 backdrop-blur-sm"
              style={{ borderRadius: "50%" }}
            >
              <Icon className="h-6 w-6 text-rehevo-amber" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${slideIndex}`}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ delay: 0.04, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.headline}
          </motion.h1>
        </AnimatePresence>

        {/* Body */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`body-${slideIndex}`}
            className="text-sm md:text-base text-foreground/55 leading-relaxed mb-10 max-w-xs md:max-w-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.09, duration: 0.48 }}
          >
            {slide.body}
          </motion.p>
        </AnimatePresence>

        {/* Bottom row — dots + CTA */}
        <div className="flex items-center justify-between">
          <DotProgress total={total} current={slideIndex} />

          <motion.button
            onClick={onNext}
            className="
              inline-flex items-center gap-2.5 px-6 py-3
              border border-foreground/22 hover:border-foreground/45
              text-sm text-foreground/85 hover:text-foreground
              rounded-full
              transition-all duration-200 cursor-pointer hover:bg-foreground/[0.04]
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLast ? "Get started" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Final Splash ─────────────────────────────────────────────────────

function FinalSplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <FullBleedBg opacity={68} overlayStrength="medium" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div {...fadeUp(0.08)} className="mb-12">
          <RehevoLogo />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.18)}
          className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-tight tracking-tight text-foreground mb-5"
        >
          Your best rehearsal starts now.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.28)}
          className="text-sm md:text-base text-foreground/50 leading-relaxed mb-14"
        >
          Let&apos;s create something great.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onNext}
          className="
            inline-flex items-center gap-3 px-8 py-4
            bg-rehevo-amber text-ink-950 font-medium text-sm
            rounded-full hover:bg-rehevo-amber/90
            transition-all duration-200 cursor-pointer
          "
          {...fadeUp(0.38)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          Get started
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Amber bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-rehevo-amber/25 z-10"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ─── Screen: Login ───────────────────────────────────────────────────────────

function LoginScreen({ onSignUp }: { onSignUp: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-ink-950">
      {/* ── Left image panel (desktop only) ── */}
      <div className="hidden md:block relative w-[42%] xl:w-[45%] flex-shrink-0 overflow-hidden">
        <Image
          src="/images/onboarding/onboarding-desktop.png"
          alt=""
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="45vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink-950/10 to-ink-950/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-950/50" />
      </div>

      {/* ── Right form panel ── */}
      <div className="relative flex-1 flex flex-col min-h-screen">
        {/* Mobile background */}
        <div className="absolute inset-0 md:hidden pointer-events-none">
          <Image
            src="/images/onboarding/onboarding-mobile.png"
            alt=""
            fill
            className="object-cover object-top opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/85 to-ink-950" />
        </div>

        <div className="relative z-10 flex flex-col flex-1 px-7 md:px-12 xl:px-14 py-8">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <RehevoLogo />
          </div>

          {/* Form */}
          <motion.div
            className="flex-1 flex flex-col justify-center max-w-[360px]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-foreground/45 mb-8">
              Sign in to continue your journey.
            </p>

            <div className="flex flex-col gap-3.5 mb-6">
              <FormField
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
              />
              <FormField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
              />
            </div>

            {/* Primary CTA */}
            <button
              className="
                w-full h-12 flex items-center justify-center
                bg-rehevo-amber text-ink-950 font-medium text-sm
                rounded-full hover:bg-rehevo-amber/90
                transition-all duration-200 cursor-pointer mb-3
              "
            >
              Sign in
            </button>

            {/* Forgot password */}
            <div className="text-center mb-6">
              <button className="text-[11px] text-rehevo-amber hover:text-rehevo-amber/75 transition-colors cursor-pointer">
                Forgot password?
              </button>
            </div>

            {/* Or divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="text-[11px] text-foreground/30">or</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            {/* Social auth */}
            <div className="flex flex-col gap-2.5">
              <SocialBtn />
            </div>

            {/* Sign-up link */}
            <p className="text-[11px] text-center text-foreground/35 mt-8">
              Don&apos;t have an account?{" "}
              <button
                onClick={onSignUp}
                className="text-rehevo-amber hover:text-rehevo-amber/75 transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Page Orchestrator ────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [screen, setScreen] = useState<ScreenName>("splash");
  const [featureIndex, setFeatureIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const TOTAL_FEATURES = FEATURE_SLIDES.length;

  /** Navigate to a new screen with optional direction and feature index. */
  const go = (to: ScreenName, dir = 1, featIdx?: number) => {
    setDirection(dir);
    if (featIdx !== undefined) setFeatureIndex(featIdx);
    setScreen(to);
  };

  const handleNext = () => {
    if (screen === "splash") {
      go("signup");
    } else if (screen === "signup") {
      go("feature", 1, 0);
    } else if (screen === "feature") {
      if (featureIndex < TOTAL_FEATURES - 1) {
        go("feature", 1, featureIndex + 1);
      } else {
        go("final");
      }
    } else if (screen === "final") {
      // Stub — would navigate to the app shell
      window.location.href = "/app/dashboard";
    }
  };

  const handleSkip = () => go("final", 1);
  const handleLogin = () => go("login", 1);
  const handleSignUp = () => go("signup", -1);

  return (
    <main className="min-h-screen bg-ink-950 text-foreground overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        {screen === "splash" && (
          <motion.div
            key="splash"
            custom={direction}
            variants={SCREEN_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SCREEN_TRANSITION}
          >
            <SplashScreen onNext={handleNext} />
          </motion.div>
        )}

        {screen === "signup" && (
          <motion.div
            key="signup"
            custom={direction}
            variants={SCREEN_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SCREEN_TRANSITION}
          >
            <SignUpScreen onNext={handleNext} onLogin={handleLogin} />
          </motion.div>
        )}

        {screen === "feature" && (
          <motion.div
            key={`feature-${featureIndex}`}
            custom={direction}
            variants={SCREEN_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SCREEN_TRANSITION}
          >
            <FeatureSlide
              slideIndex={featureIndex}
              total={TOTAL_FEATURES}
              onNext={handleNext}
              onSkip={handleSkip}
            />
          </motion.div>
        )}

        {screen === "final" && (
          <motion.div
            key="final"
            custom={direction}
            variants={SCREEN_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SCREEN_TRANSITION}
          >
            <FinalSplashScreen onNext={handleNext} />
          </motion.div>
        )}

        {screen === "login" && (
          <motion.div
            key="login"
            custom={direction}
            variants={SCREEN_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SCREEN_TRANSITION}
          >
            <LoginScreen onSignUp={handleSignUp} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
