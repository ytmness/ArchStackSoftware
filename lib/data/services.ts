export type Service = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: "product",
    title: "Product Engineering",
    summary: "Sistemas digitales diseñados para escalar desde el día uno.",
    detail:
      "Definimos arquitectura, modelos de datos y superficies de producto con criterio técnico y visión comercial.",
    tags: ["Discovery", "MVP", "Roadmap"],
  },
  {
    id: "platform",
    title: "Platform & APIs",
    summary: "Backends robustos, APIs claras y contratos que no se rompen.",
    detail:
      "Construimos capas de servicio, integraciones y observabilidad para equipos que necesitan velocidad sin deuda.",
    tags: ["Node", "Postgres", "Event-driven"],
  },
  {
    id: "frontend",
    title: "Frontend Systems",
    summary: "Interfaces premium con performance y accesibilidad reales.",
    detail:
      "Design systems, apps web complejas y experiencias móviles con motion funcional y carga optimizada.",
    tags: ["Next.js", "React", "Motion"],
  },
  {
    id: "ai",
    title: "AI Integration",
    summary: "IA como capa del sistema, no como feature decorativa.",
    detail:
      "Copilotos, clasificación, extracción y workflows automatizados integrados a tu stack existente.",
    tags: ["RAG", "Agents", "Automation"],
  },
  {
    id: "infra",
    title: "Cloud & Infra",
    summary: "Despliegue, CI/CD y observabilidad listos para producción.",
    detail:
      "Infraestructura como código, pipelines y monitoreo para operar con confianza.",
    tags: ["Vercel", "AWS", "Monitoring"],
  },
  {
    id: "advisory",
    title: "Technical Advisory",
    summary: "Decisiones de arquitectura con impacto medible.",
    detail:
      "Auditorías, revisiones de stack y acompañamiento para equipos que escalan producto y equipo.",
    tags: ["Architecture", "Reviews", "Scaling"],
  },
];
