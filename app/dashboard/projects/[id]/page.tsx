import { Card } from "@/components/ui/card";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  return (
    <Card className="bg-surface p-6">
      <h1 className="text-xl font-semibold">Editar proyecto</h1>
      <p className="mt-2 text-sm text-muted-foreground">ID: {id}</p>
    </Card>
  );
}
