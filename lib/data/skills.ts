import type { Locale } from "@/lib/i18n/config";

export type SkillCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

const skillCardsEs: SkillCard[] = [
  {
    id: "web",
    title: "Plataformas web premium",
    description:
      "Dashboards, portales B2B y productos SaaS con Next.js, motion funcional y performance real.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Dashboard analítico web",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    id: "mobile",
    title: "Experiencias móviles",
    description:
      "Apps y superficies mobile-first con interacciones táctiles, offline-ready y despliegue en stores.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Aplicación móvil en dispositivo",
    tags: ["React Native", "Expo", "PWA"],
  },
  {
    id: "ai",
    title: "Capas de IA aplicada",
    description:
      "Copilotos, clasificación, extracción y workflows que se integran a tu stack, no como add-on.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Visualización de red de IA",
    tags: ["LLM", "RAG", "Automation"],
  },
  {
    id: "infra",
    title: "Cloud e infraestructura",
    description:
      "CI/CD, observabilidad, escalado y arquitectura lista para producción desde el día uno.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Infraestructura cloud global",
    tags: ["AWS", "Vercel", "Postgres"],
  },
];

const skillCardsEn: SkillCard[] = [
  {
    id: "web",
    title: "Premium web platforms",
    description:
      "Dashboards, B2B portals, and SaaS products with Next.js, functional motion, and real performance.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Web analytics dashboard",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    id: "mobile",
    title: "Mobile experiences",
    description:
      "Mobile-first apps and surfaces with touch interactions, offline-ready flows, and store deployment.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Mobile application on device",
    tags: ["React Native", "Expo", "PWA"],
  },
  {
    id: "ai",
    title: "Applied AI layers",
    description:
      "Copilots, classification, extraction, and workflows integrated into your stack—not as an add-on.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "AI network visualization",
    tags: ["LLM", "RAG", "Automation"],
  },
  {
    id: "infra",
    title: "Cloud & infrastructure",
    description:
      "CI/CD, observability, scaling, and architecture production-ready from day one.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Global cloud infrastructure",
    tags: ["AWS", "Vercel", "Postgres"],
  },
];

export function getSkillCards(locale: Locale): SkillCard[] {
  return locale === "en" ? skillCardsEn : skillCardsEs;
}
