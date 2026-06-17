export type ArchitectureModule = {
  id: string;
  label: string;
};

export const architectureModules: ArchitectureModule[] = [
  { id: "web", label: "Web App" },
  { id: "mobile", label: "Mobile App" },
  { id: "admin", label: "Admin Panel" },
  { id: "ai", label: "AI Layer" },
  { id: "payments", label: "Payments" },
  { id: "analytics", label: "Analytics" },
];

export function buildLayers(active: string[]): string[] {
  return [
    "Frontend",
    active.includes("mobile") ? "Mobile Client" : null,
    "API Gateway",
    active.includes("ai") ? "AI Orchestration" : null,
    active.includes("payments") ? "Payments Service" : null,
    "Database",
    active.includes("analytics") ? "Analytics Pipeline" : null,
    active.includes("admin") ? "Admin Console" : null,
  ].filter(Boolean) as string[];
}
