export default async function MomentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-serif">Moment</h1>
      <p className="mt-4 text-lg">Moment: {id}</p>
    </main>
  );
}
