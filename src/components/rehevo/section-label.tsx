import { cn } from "@/lib/utils";

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium tracking-[0.2em] uppercase text-rehevo-amber",
        className
      )}
    >
      {children}
    </p>
  );
}

export { SectionLabel };
