"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-sm w-full flex flex-col items-center text-center gap-6">
        <h2 className="font-serif text-2xl">Something went wrong</h2>
        <p className="text-sm text-foreground/55">
          We couldn&apos;t load this page. Please try again.
        </p>
        <Button onClick={reset} variant="outline" className="rounded-full">
          Try again
        </Button>
      </div>
    </div>
  );
}
