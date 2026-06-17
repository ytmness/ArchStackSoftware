import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, status, updated_at, blog_post_translations(title, locale)")
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <Button asChild>
          <Link href="/dashboard/blog/new">Nuevo artículo</Link>
        </Button>
      </div>
      <div className="space-y-3">
        {(posts ?? []).length === 0 ? (
          <p className="text-muted-foreground">No hay artículos todavía.</p>
        ) : (
          posts?.map((post) => {
            const translation = Array.isArray(post.blog_post_translations)
              ? post.blog_post_translations[0]
              : post.blog_post_translations;
            return (
              <Card key={post.id} className="bg-surface p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{translation?.title ?? "Sin título"}</p>
                    <p className="text-sm text-muted-foreground">
                      Actualizado {new Date(post.updated_at).toLocaleDateString("es")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{post.status}</Badge>
                    <Link href={`/dashboard/blog/${post.id}`} className="text-sm text-primary">
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
