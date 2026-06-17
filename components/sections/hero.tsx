"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroHeadline } from "@/components/motion/hero-headline";

const HeroBackground = dynamic(
  () =>
    import("@/components/sections/hero-background").then(
      (m) => m.HeroBackground
    ),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <HeroBackground />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <motion.p
            className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ArchStack Software
          </motion.p>

          <HeroHeadline text="Arquitectura digital para empresas que escalan" />

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
          >
            Diseñamos y construimos sistemas digitales — no solo apps. Desde
            arquitectura hasta producción, con criterio técnico y visión de
            producto.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <Button asChild size="lg">
              <Link href="#contact">Iniciar proyecto</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#builder">Explorar arquitectura</Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
