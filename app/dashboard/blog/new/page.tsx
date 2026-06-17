import { Card } from "@/components/ui/card";

export default function NewBlogPostPage() {
  return (
    <Card className="bg-surface p-6">
      <h1 className="text-xl font-semibold">Nuevo artículo</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        El editor Tiptap con almacenamiento JSON + HTML se integrará aquí.
      </p>
    </Card>
  );
}
