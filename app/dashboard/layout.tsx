import { requireAdmin } from "@/lib/auth/guards";
import { signOutAction } from "@/actions/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-bg text-foreground">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-border px-6">
            <p className="text-sm text-muted-foreground">ArchStack Dashboard</p>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cerrar sesión
              </button>
            </form>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
