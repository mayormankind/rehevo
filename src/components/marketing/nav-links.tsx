import Link from "next/link";

function NavLinks({ inSheet = false }: { inSheet?: boolean }) {
  const baseClass = inSheet
    ? "text-foreground/80 hover:text-foreground transition-colors text-lg py-2"
    : "text-foreground/70 hover:text-foreground transition-colors text-sm";

  return (
    <>
      <Link href="/how-it-works" className={baseClass}>
        How it works
      </Link>
      <Link href="/scenarios" className={baseClass}>
        Scenarios
      </Link>
      <Link href="/how-it-works" className={baseClass}>
        Why Rehevo
      </Link>
    </>
  );
}

export { NavLinks };
