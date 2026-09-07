export default function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-serif">Report</h1>
      <p className="mt-4 text-lg">Rehearsal: {params.id}</p>
    </main>
  );
}
