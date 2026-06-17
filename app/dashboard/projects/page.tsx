import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, status, featured, updated_at, project_translations(title, locale)")
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Proyectos</h1>
        <Button asChild>
          <Link href="/dashboard/projects/new">Nuevo proyecto</Link>
        </Button>
      </div>
      <div className="space-y-3">
        {(projects ?? []).length === 0 ? (
          <p className="text-muted-foreground">No hay proyectos todavía.</p>
        ) : (
          projects?.map((project) => {
            const translation = Array.isArray(project.project_translations)
              ? project.project_translations[0]
              : project.project_translations;
            return (
              <Card key={project.id} className="bg-surface p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{translation?.title ?? "Sin título"}</p>
                    <p className="text-sm text-muted-foreground">
                      Actualizado {new Date(project.updated_at).toLocaleDateString("es")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{project.status}</Badge>
                    {project.featured && <Badge className="border-primary/30 text-primary">Featured</Badge>}
                    <Link href={`/dashboard/projects/${project.id}`} className="text-sm text-primary">
                      Editar
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
