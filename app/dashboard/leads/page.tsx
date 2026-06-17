import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Leads</h1>
      <div className="space-y-3">
        {(leads ?? []).length === 0 ? (
          <p className="text-muted-foreground">No hay leads todavía.</p>
        ) : (
          leads?.map((lead) => (
            <Card key={lead.id} className="bg-surface p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                  {lead.company && (
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  )}
                  <p className="mt-3 text-sm">{lead.message}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <Badge>{lead.status}</Badge>
                  <p className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString("es")}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
