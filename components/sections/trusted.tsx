import { Container } from "@/components/ui/container";
import { trustedItems } from "@/lib/data/trusted";

export function Trusted() {
  const track = [...trustedItems, ...trustedItems];

  return (
    <section className="border-y border-line py-12 md:py-16" aria-label="Sectores atendidos">
      <Container>
        <p className="mb-8 text-center text-sm uppercase tracking-[0.22em] text-muted">
          Dominios y superficies que construimos
        </p>

        <div
          className="group relative overflow-hidden rounded-2xl border border-line bg-white/[0.02]"
          role="region"
          aria-label="Sectores y capacidades atendidas por ArchStack"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-24" />

          <div className="animate-marquee flex w-max whitespace-nowrap py-4">
            {track.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-6 inline-flex items-center text-sm uppercase tracking-[0.22em] text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
