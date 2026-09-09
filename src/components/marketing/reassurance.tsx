import { Lock, Clock, EyeOff } from "lucide-react";

function Reassurance() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 text-sm text-foreground/50">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-foreground/40" />
        <span>Private by design</span>
      </div>
      <span className="hidden sm:block h-4 w-px bg-foreground/20 mx-4" />
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-foreground/40" />
        <span>Practice at your pace</span>
      </div>
      <span className="hidden sm:block h-4 w-px bg-foreground/20 mx-4" />
      <div className="flex items-center gap-2">
        <EyeOff className="h-4 w-4 text-foreground/40" />
        <span>No audience required</span>
      </div>
    </div>
  );
}

export { Reassurance };
