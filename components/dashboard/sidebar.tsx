import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/dashboard/projects", label: "Proyectos" },
  { href: "/dashboard/blog", label: "Blog" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/settings", label: "Configuración" },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface p-4 md:block">
      <Link href="/dashboard" className="mb-8 block text-sm font-semibold">
        Arch<span className="text-primary">Stack</span> Admin
      </Link>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/es"
        className="mt-8 block text-xs text-muted-foreground hover:text-foreground"
      >
        Ver sitio público →
      </Link>
    </aside>
  );
}
