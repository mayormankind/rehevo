export default function ScenarioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-serif">Scenario {params.id}</h1>
      <p className="mt-4 text-lg">Coming soon.</p>
    </main>
  );
}
