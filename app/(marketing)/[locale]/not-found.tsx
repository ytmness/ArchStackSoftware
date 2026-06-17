import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function MarketingNotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <h1 className="text-4xl font-semibold">404</h1>
        <p className="mt-4 text-muted-foreground">Página no encontrada.</p>
        <Button asChild className="mt-8">
          <Link href="/es">Volver al inicio</Link>
        </Button>
      </Container>
    </section>
  );
}
