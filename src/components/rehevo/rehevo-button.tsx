import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rehevoButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-rehevo-amber text-ink-950 hover:bg-rehevo-amber/90 rounded-full font-medium",
        outline:
          "border-rehevo-amber text-rehevo-amber hover:bg-rehevo-amber/10 rounded-full",
        ghost:
          "text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-full",
        secondary:
          "bg-ink-800 text-foreground hover:bg-ink-800/80 rounded-lg",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface RehevoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rehevoButtonVariants> {
  asChild?: boolean;
}

function RehevoButton({
  className,
  variant,
  size,
  ...props
}: RehevoButtonProps) {
  return (
    <Button
      className={cn(rehevoButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { RehevoButton, rehevoButtonVariants };
