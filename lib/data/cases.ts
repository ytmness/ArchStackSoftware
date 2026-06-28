export type CaseStudy = {
  id: string;
  title: string;
  problem: string;
  result: string;
  stack: string[];
  metric: string;
  gradient: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "fintech-ops",
    title: "Plataforma de operaciones fintech",
    problem:
      "Procesos manuales y múltiples herramientas desconectadas ralentizaban el onboarding de clientes.",
    result:
      "Unificamos flujos en una sola plataforma con trazabilidad completa y reducción del 60% en tiempo de procesamiento.",
    stack: ["Next.js", "NestJS", "Postgres", "Redis"],
    metric: "-60% tiempo de procesamiento",
    gradient: "from-red-500/20 via-red-600/10 to-transparent",
  },
  {
    id: "saas-analytics",
    title: "Dashboard analítico SaaS",
    problem:
      "Los clientes no podían visualizar métricas clave sin exportar datos a hojas de cálculo.",
    result:
      "Construimos un sistema de analytics en tiempo real con alertas automáticas y reportes programados.",
    stack: ["React", "Fastify", "ClickHouse", "Tailwind"],
    metric: "3x adopción de analytics",
    gradient: "from-violet-500/20 via-indigo-600/10 to-transparent",
  },
  {
    id: "ai-workflows",
    title: "Automatización con IA",
    problem:
      "Equipos de soporte saturados con tickets repetitivos y clasificación manual.",
    result:
      "Implementamos un pipeline de clasificación y respuesta asistida que liberó 40% del tiempo del equipo.",
    stack: ["Python", "OpenAI", "Postgres", "Next.js"],
    metric: "40% menos tickets manuales",
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
  },
];
