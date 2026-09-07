export default function MomentPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-serif">Moment</h1>
      <p className="mt-4 text-lg">Moment: {params.id}</p>
    </main>
  );
}
