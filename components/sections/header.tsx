"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/50 bg-bg/80 backdrop-blur-xl">
      <Container as="nav" className="flex h-16 items-center justify-between md:h-18">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-text"
          aria-label="ArchStack Software — Inicio"
        >
          Arch<span className="text-accent">Stack</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="#contact">Iniciar proyecto</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5 text-text" />
          ) : (
            <Menu className="h-5 w-5 text-text" />
          )}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-line bg-bg md:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <Container className="space-y-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Button asChild size="sm" className="w-full">
              <Link href="#contact">Iniciar proyecto</Link>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
