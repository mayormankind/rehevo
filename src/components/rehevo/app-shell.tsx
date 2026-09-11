"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { StageCue } from "@/components/rehevo/stage-cue";

const NAV_ITEMS = [
  { href: "/app/dashboard", label: "Prepare" },
  { href: "/app/settings", label: "Account" },
];

function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-0.5">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 text-xs tracking-wide transition-colors duration-200 rounded-full min-h-[44px] flex items-center",
              isActive
                ? "text-foreground bg-foreground/5"
                : "text-foreground/45 hover:text-foreground/70"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AppShellHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-foreground/[0.07]">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-14 flex items-center justify-between">
        <Link href="/app/dashboard" className="flex items-center gap-2.5">
          <StageCue type={1} />
          <span className="text-sm font-medium tracking-wide text-foreground/80">REHEVO</span>
        </Link>
        <AppNav />
      </div>
    </header>
  );
}

function AppShellFooter() {
  return (
    <footer className="border-t border-foreground/[0.07]">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
        <p className="text-[10px] text-foreground/30 tracking-wide">Private rehearsal environment</p>
        <p className="text-[10px] text-foreground/30 tracking-wide">PREPARE → REHEARSE → REFLECT</p>
      </div>
    </footer>
  );
}

function AppShellInner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <AppShellHeader />
      <main className="flex-1">
        {children}
      </main>
      <AppShellFooter />
    </div>
  );
}

export { AppShellInner as AppShell };
