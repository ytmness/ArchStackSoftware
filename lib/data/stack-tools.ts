import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Cloud,
  Database,
  FileCode2,
  Layers,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";

export type StackTool = {
  id: string;
  name: string;
  Icon: LucideIcon;
};

export const stackTools: StackTool[] = [
  { id: "nextjs", name: "Next.js", Icon: Layers },
  { id: "react", name: "React", Icon: Blocks },
  { id: "typescript", name: "TypeScript", Icon: FileCode2 },
  { id: "tailwind", name: "Tailwind", Icon: Sparkles },
  { id: "supabase", name: "Supabase", Icon: Database },
  { id: "postgres", name: "Postgres", Icon: Database },
  { id: "motion", name: "Motion", Icon: Workflow },
  { id: "vercel", name: "Vercel", Icon: Cloud },
  { id: "rls", name: "RLS", Icon: Shield },
];
