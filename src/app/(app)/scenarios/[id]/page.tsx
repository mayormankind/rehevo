export default async function ScenarioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-serif">Scenario {id}</h1>
      <p className="mt-4 text-lg">Coming soon.</p>
    </main>
  );
}
