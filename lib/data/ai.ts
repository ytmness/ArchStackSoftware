export type AICapability = {
  id: string;
  title: string;
  description: string;
  example: string;
};

export const aiCapabilities: AICapability[] = [
  {
    id: "copilots",
    title: "Copilotos contextuales",
    description:
      "Asistentes integrados que entienden el dominio de tu producto y aceleran tareas repetitivas.",
    example: "Sugerencias de respuesta basadas en historial y políticas del negocio.",
  },
  {
    id: "classification",
    title: "Clasificación inteligente",
    description:
      "Routing automático de tickets, documentos y solicitudes con alta precisión.",
    example: "Clasificación de soporte con 94% de accuracy en producción.",
  },
  {
    id: "extraction",
    title: "Extracción estructurada",
    description:
      "Conversión de documentos no estructurados en datos accionables para tu sistema.",
    example: "Extracción de campos de contratos PDF a registros de base de datos.",
  },
  {
    id: "workflows",
    title: "Workflows automatizados",
    description:
      "Cadenas de acciones con IA que se integran a tus procesos existentes.",
    example: "Pipeline de onboarding con validación, enriquecimiento y notificación.",
  },
];
