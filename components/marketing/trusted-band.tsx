export function TrustedBand({
  label,
  items,
  embedded = false,
}: {
  label: string;
  items: string[];
  embedded?: boolean;
}) {
  const track = [...items, ...items];
  const Tag = embedded ? "div" : "section";

  return (
    <Tag
      className={embedded ? "py-10 md:py-12" : "border-y border-border py-12 md:py-16"}
      aria-label={label}
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>

        <div
          className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50"
          role="region"
          aria-label={label}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-24" />

          <div className="animate-marquee flex w-max whitespace-nowrap py-4">
            {track.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-6 inline-flex items-center text-sm uppercase tracking-[0.22em] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Tag>
  );
}
