import { Card } from "@/components/ui/card";

export default function NewProjectPage() {
  return (
    <Card className="bg-surface p-6">
      <h1 className="text-xl font-semibold">Nuevo proyecto</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        El formulario CRUD con traducciones es/es y en se conectará a Server Actions y Supabase Storage.
      </p>
    </Card>
  );
}
