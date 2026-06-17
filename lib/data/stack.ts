export type StackLayer = {
  id: string;
  label: string;
  description: string;
  items: string[];
};

export const stackLayers: StackLayer[] = [
  {
    id: "strategy",
    label: "Strategy",
    description: "Alineamos producto, negocio y arquitectura antes de escribir código.",
    items: ["Discovery", "Technical roadmap", "Architecture decisions"],
  },
  {
    id: "product",
    label: "Product",
    description: "Definimos superficies, flujos y criterios de éxito medibles.",
    items: ["UX flows", "Prototyping", "Feature prioritization"],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces premium con performance y accesibilidad integradas.",
    items: ["Next.js 15", "Tailwind CSS", "Motion", "Design systems"],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs claras, contratos estables y lógica de negocio bien encapsulada.",
    items: ["Node.js", "NestJS / Fastify", "Postgres", "Redis"],
  },
  {
    id: "data",
    label: "Data",
    description: "Pipelines, almacenamiento y analítica para decisiones informadas.",
    items: ["ETL pipelines", "ClickHouse", "Data modeling", "Reporting"],
  },
  {
    id: "ai",
    label: "AI",
    description: "Capa de inteligencia integrada al sistema, no como add-on.",
    items: ["LLM orchestration", "RAG", "Classification", "Automation"],
  },
  {
    id: "infra",
    label: "Infra",
    description: "Despliegue, observabilidad y operación continua.",
    items: ["Vercel", "AWS", "CI/CD", "Monitoring"],
  },
];
