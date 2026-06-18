import type { Dictionary } from "@/content/dictionaries/es";

export type ArchitectureModule = {
  id: string;
  label: string;
};

export function getArchitectureModules(
  dict: Dictionary,
): ArchitectureModule[] {
  return [...dict.builder.modules];
}

export function buildLayers(
  active: string[],
  layers: Dictionary["builder"]["layers"],
): string[] {
  return [
    layers.frontend,
    active.includes("mobile") ? layers.mobileClient : null,
    layers.apiGateway,
    active.includes("ai") ? layers.aiOrchestration : null,
    active.includes("payments") ? layers.paymentsService : null,
    layers.database,
    active.includes("analytics") ? layers.analyticsPipeline : null,
    active.includes("admin") ? layers.adminConsole : null,
  ].filter(Boolean) as string[];
}
