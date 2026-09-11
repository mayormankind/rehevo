function StageCue({ type = 1 }: { type?: 1 | 2 }) {
  return (
    <span className="inline-flex items-center gap-3" aria-hidden="true">
      {type === 1 && <span className="h-2 w-2 rounded-full bg-rehevo-amber" />}
      {type === 2 && <span className="hidden sm:inline-block h-px w-8 bg-rehevo-amber/80" />}
    </span>
  );
}

export { StageCue };
