import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/data/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-12 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-text">
              Arch<span className="text-accent">Stack</span> Software
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Arquitectura digital para empresas que escalan. Diseñamos y
              construimos sistemas, no solo apps.
            </p>
          </div>

          <nav aria-label="Enlaces del sitio">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ArchStack Software. Todos los derechos reservados.</p>
          <p>Arquitectura · Producto · Ingeniería</p>
        </div>
      </Container>
    </footer>
  );
}
