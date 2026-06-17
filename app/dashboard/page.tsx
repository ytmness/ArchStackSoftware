import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: projects }, { count: posts }, { count: leads }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
    ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Resumen</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-surface">
          <CardHeader>
            <CardTitle className="text-base">Proyectos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{projects ?? 0}</CardContent>
        </Card>
        <Card className="bg-surface">
          <CardHeader>
            <CardTitle className="text-base">Artículos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{posts ?? 0}</CardContent>
        </Card>
        <Card className="bg-surface">
          <CardHeader>
            <CardTitle className="text-base">Leads</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{leads ?? 0}</CardContent>
        </Card>
      </div>
    </div>
  );
}
