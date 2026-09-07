"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RehearsalPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <h1 className="text-4xl font-serif mb-4">Rehearsal Room</h1>
      <p className="text-lg mb-8">Scenario: {params.id}</p>
      <div className="flex gap-4">
        <Button onClick={() => router.push(`complete`)}>
          End Rehearsal
        </Button>
      </div>
    </main>
  );
}
