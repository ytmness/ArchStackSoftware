export type ContactQuestion = {
  key: string;
  label: string;
  placeholder: string;
};

export const contactQuestions: ContactQuestion[] = [
  {
    key: "project",
    label: "¿Qué estás construyendo?",
    placeholder: "Ej: plataforma de gestión para equipos de ventas…",
  },
  {
    key: "users",
    label: "¿Quién lo va a usar primero?",
    placeholder: "Ej: equipo interno de operaciones, clientes B2B…",
  },
  {
    key: "scope",
    label: "¿Qué debe salir en la primera versión?",
    placeholder: "Ej: dashboard, API, panel admin, integración con…",
  },
  {
    key: "timeline",
    label: "¿Qué rango de tiempo tienes?",
    placeholder: "Ej: 2 meses, Q3 2026, sin fecha fija aún…",
  },
];
