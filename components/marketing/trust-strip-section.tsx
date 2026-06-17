import { StackToolsSlider } from "@/components/marketing/stack-tools-slider";

type TrustStripSectionProps = {
  stackLabel: string;
};

export function TrustStripSection({ stackLabel }: TrustStripSectionProps) {
  return (
    <section className="border-y border-border" aria-label={stackLabel}>
      <StackToolsSlider embedded label={stackLabel} />
    </section>
  );
}
