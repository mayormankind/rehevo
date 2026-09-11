export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-rehevo-amber animate-pulse" />
        <span className="text-sm text-foreground/55">Loading...</span>
      </div>
    </div>
  );
}
