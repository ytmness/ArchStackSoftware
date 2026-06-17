import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Configuración</h1>
      <Card className="bg-surface">
        <CardHeader>
          <CardTitle>Sitio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Marca: {settings?.brand_name ?? "ArchStack Software"}</p>
          <p>Email: {settings?.contact_email ?? "—"}</p>
          <p>Locale por defecto: {settings?.default_locale ?? "es"}</p>
          <p className="text-xs">
            El editor de configuración completo se conectará a Server Actions en la siguiente iteración.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
