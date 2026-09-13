"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Prepare" },
  { href: "/sessions", label: "Sessions" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/settings", label: "Account" },
];

function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative py-1.5 text-xs tracking-wide transition-colors duration-200",
              isActive
                ? "text-surface-light"
                : "text-surface-light/45 hover:text-surface-light/75"
            )}
          >
            {item.label}
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 -bottom-[13px] h-[2px] w-6 rounded-full transition-colors duration-200",
                isActive ? "bg-rehevo-amber" : "bg-transparent"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}

function UserChip({ displayName }: { displayName: string }) {
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link
      href="/settings"
      className="hidden md:flex items-center gap-2.5 group"
      aria-label="Account settings"
    >
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #F59E3B 0%, #B06A1A 100%)",
        }}
      >
        <span className="text-[10px] font-medium text-ink-950">{initials}</span>
      </span>
      <span className="text-xs text-surface-light/80 group-hover:text-surface-light transition-colors max-w-[120px] truncate">
        {displayName}
      </span>
      <ChevronDown className="w-3.5 h-3.5 text-surface-light/40 group-hover:text-surface-light/70 transition-colors" />
    </Link>
  );
}

function MobileNav({ displayName }: { displayName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((o) => !o)}
        className="h-9 w-9 rounded-full text-surface-light/80"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-ink-950/95 backdrop-blur-sm border-b border-surface-light/[0.07] p-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm tracking-wide transition-colors duration-200 rounded-lg flex items-center gap-3",
                  isActive
                    ? "text-surface-light bg-surface-light/5"
                    : "text-surface-light/45 hover:text-surface-light/70"
                )}
              >
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-rehevo-amber" />
                )}
                {item.label}
              </Link>
            );
          })}
          <div className="px-4 pt-3 pb-1 border-t border-surface-light/[0.07] mt-2">
            <p className="text-[10px] tracking-[0.18em] uppercase text-surface-light/30">
              Signed in as
            </p>
            <p className="text-sm text-surface-light/70 mt-0.5">{displayName}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AppShellHeader({ displayName }: { displayName: string }) {
  return (
    <header className="sticky top-0 z-40 bg-ink-950/85 backdrop-blur-sm border-b border-surface-light/[0.07]">
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-14 flex items-center justify-between">
        <Link href="/dashboard" aria-label="REHEVO — Dashboard">
          <Image
            src="/rehevo-logo.png"
            alt="REHEVO"
            width={120}
            height={28}
            className="h-5 w-auto"
            priority
          />
        </Link>
        <AppNav />
        <div className="flex items-center gap-2">
          <UserChip displayName={displayName} />
          <MobileNav displayName={displayName} />
        </div>
      </div>
    </header>
  );
}

function AppShellFooter() {
  return (
    <footer className="border-t border-surface-light/[0.07]">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
        <p className="text-[10px] text-surface-light/30 tracking-wide">
          Private rehearsal environment
        </p>
        <p className="text-[10px] text-surface-light/30 tracking-wide">
          PREPARE → REHEARSE → REFLECT
        </p>
      </div>
    </footer>
  );
}

function AppShellInner({
  children,
  hideNav = false,
  displayName = "Account",
}: {
  children: React.ReactNode;
  hideNav?: boolean;
  displayName?: string;
}) {
  const pathname = usePathname();
  // Everything under /rehearsal is immersive — room, reflection, drill.
  const inRoom = /^\/rehearsal\//.test(pathname);
  const hide = hideNav || inRoom;

  return (
    <div className="min-h-screen flex flex-col bg-ink-950 text-surface-light antialiased">
      {!hide && <AppShellHeader displayName={displayName} />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!hide && <AppShellFooter />}
    </div>
  );
}

export { AppShellInner as AppShell };
