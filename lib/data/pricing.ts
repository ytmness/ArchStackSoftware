export type PricingBand = {
  id: string;
  name: string;
  range: string;
  duration: string;
  description: string;
  outputs: string[];
  highlighted?: boolean;
};

export const pricingBands: PricingBand[] = [
  {
    id: "sprint",
    name: "Sprint",
    range: "2–4 semanas",
    duration: "Discovery + prototipo",
    description:
      "Validación rápida de concepto con entregables concretos y decisión informada.",
    outputs: [
      "Arquitectura propuesta",
      "Prototipo funcional",
      "Estimación detallada",
      "Roadmap de implementación",
    ],
  },
  {
    id: "build",
    name: "Build",
    range: "6–16 semanas",
    duration: "MVP a producción",
    description:
      "Construcción completa de producto con despliegue, documentación y handoff.",
    outputs: [
      "Producto en producción",
      "CI/CD configurado",
      "Documentación técnica",
      "Capacitación del equipo",
    ],
    highlighted: true,
  },
  {
    id: "platform",
    name: "Platform",
    range: "Retainer mensual",
    duration: "Evolución continua",
    description:
      "Acompañamiento técnico continuo para equipos que escalan producto y plataforma.",
    outputs: [
      "Horas de desarrollo mensuales",
      "Revisión de arquitectura",
      "Soporte prioritario",
      "Roadmap compartido",
    ],
  },
];
