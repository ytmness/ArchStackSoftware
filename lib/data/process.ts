export type ProcessDeliverable = {
  src: string;
  label: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  deliverables: ProcessDeliverable[];
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description:
      "Entendemos el problema, el contexto técnico y los criterios de éxito antes de proponer solución.",
    deliverables: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
        label: "Analytics map",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
        label: "Stakeholder flows",
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    description:
      "Definimos arquitectura, flujos y contratos. Prototipamos lo crítico y validamos con stakeholders.",
    deliverables: [
      {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
        label: "System blueprint",
      },
      {
        src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format&fit=crop",
        label: "API contracts",
      },
    ],
  },
  {
    id: "build",
    title: "Build",
    description:
      "Implementamos en iteraciones cortas con CI/CD, pruebas y revisión continua de calidad.",
    deliverables: [
      {
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop",
        label: "Mobile surface",
      },
      {
        src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80&auto=format&fit=crop",
        label: "CI pipeline",
      },
    ],
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Desplegamos con observabilidad, documentación y plan de transición para el equipo interno.",
    deliverables: [
      {
        src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80&auto=format&fit=crop",
        label: "Observability",
      },
      {
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop",
        label: "Runbooks",
      },
    ],
  },
  {
    id: "scale",
    title: "Scale",
    description:
      "Optimizamos performance, extendemos capacidades y acompañamos el crecimiento del producto.",
    deliverables: [
      {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop",
        label: "Infra scale",
      },
      {
        src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80&auto=format&fit=crop",
        label: "Platform ops",
      },
    ],
  },
];

export function getProcessSteps(locale: "es" | "en") {
  if (locale === "en") {
    return processSteps.map((step) => ({
      ...step,
      description:
        {
          discover:
            "We understand the problem, technical context, and success criteria before proposing a solution.",
          design:
            "We define architecture, flows, and contracts. Prototype what matters and validate with stakeholders.",
          build:
            "We ship in short iterations with CI/CD, testing, and continuous quality review.",
          launch:
            "We deploy with observability, documentation, and a handoff plan for your team.",
          scale:
            "We optimize performance, extend capabilities, and support product growth.",
        }[step.id] ?? step.description,
    }));
  }
  return processSteps;
}
