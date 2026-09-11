import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-sm w-full flex flex-col items-center text-center gap-6">
        <h2 className="font-serif text-2xl">Page not found</h2>
        <p className="text-sm text-foreground/55">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-rehevo-amber text-rehevo-amber rounded-full text-sm font-medium hover:bg-rehevo-amber/10 transition-colors"
        >
          Return to Rehevo
        </Link>
      </div>
    </div>
  );
}
