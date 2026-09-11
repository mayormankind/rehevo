import { cn } from "@/lib/utils";

function Surface({
  children,
  className,
  asChild = false,
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  if (asChild) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        "bg-ink-900/20 border border-foreground/10",
        className
      )}
      style={{ borderRadius: "6px" }}
    >
      {children}
    </div>
  );
}

export { Surface };
