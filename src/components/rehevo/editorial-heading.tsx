import { cn } from "@/lib/utils";
import type { ElementType } from "react";

function EditorialHeading({
  children,
  level = 1,
  className,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const Tag = `h${level}` as ElementType;
  const sizes = {
    1: "text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight",
    2: "text-3xl md:text-4xl leading-[1.1] tracking-tight",
    3: "text-2xl md:text-3xl leading-[1.15] tracking-tight",
  };

  return (
    <Tag className={cn("font-serif text-foreground", sizes[level], className)}>
      {children}
    </Tag>
  );
}

export { EditorialHeading };
