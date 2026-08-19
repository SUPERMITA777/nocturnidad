import { z } from "zod";

export const BARRIOS_FLORENCIO_VARELA = [
  "Centro",
  "Bosques",
  "Zeballos",
  "Villa Vatteone",
  "Gobernador Costa",
  "Ingeniero Allan",
  "La Capilla",
  "Villa Brown",
  "Santa Rosa",
  "Ing. Budge",
  "Villa Jardín",
  "San Martín",
  "La Fermina",
  "El Progreso",
  "Otro",
] as const;

export const ROLES = [
  "Vecino/a",
  "Gastronómico/a",
  "Técnico / Artista",
  "Asistente",
  "Otro",
] as const;

export const PROBLEMAS_IDENTIFICADOS = [
  "Fiestas clandestinas en quintas y galpones sin habilitación",
  "Falta de control de acceso a menores de edad",
  "Ausencia de condiciones mínimas de seguridad (salidas de emergencia, extintores)",
  "Pérdida de empleos locales (mozos, barmans, técnicos de sonido y luz)",
  "Cierre de locales gastronómicos y culturales habilitados",
  "Inseguridad y falta de iluminación en zonas clandestinas",
  "Consumo de sustancias sin entorno controlado ni contención",
  "Falta de transporte público nocturno adecuado",
  "Ruidos molestos sin marco regulatorio",
  "Exceso de burocracia que impide la habilitación formal",
] as const;

export const firmaSchema = z.object({
  nombreCompleto: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres.")
    .max(120, "El nombre es demasiado largo."),
  dni: z
    .string()
    .regex(/^\d{7,8}$/, "El DNI debe contener entre 7 y 8 dígitos numéricos."),
  barrio: z.enum(BARRIOS_FLORENCIO_VARELA, {
    errorMap: () => ({ message: "Seleccioná un barrio válido de Florencio Varela." }),
  }),
  email: z
    .string()
    .email("Ingresá un correo electrónico válido."),
  telefono: z
    .string()
    .regex(/^\d{8,15}$/, "El teléfono debe tener entre 8 y 15 dígitos.")
    .optional()
    .or(z.literal("")),
  rol: z.enum(ROLES, {
    errorMap: () => ({ message: "Seleccioná un rol válido." }),
  }),
  problemasIdentificados: z
    .array(z.enum(PROBLEMAS_IDENTIFICADOS))
    .min(1, "Seleccioná al menos un problema identificado."),
  propuestaMejora: z
    .string()
    .max(1500, "La propuesta no puede superar los 1500 caracteres.")
    .optional()
    .or(z.literal("")),
  sugerenciaArticulado: z
    .string()
    .max(1500, "La sugerencia no puede superar los 1500 caracteres.")
    .optional()
    .or(z.literal("")),
  consentimientoLegal: z.literal(true, {
    errorMap: () => ({
      message:
        "Debés aceptar la cláusula de consentimiento para adhesionarte.",
    }),
  }),
  deseaNovedades: z.boolean(),
});

export type FirmaInput = z.infer<typeof firmaSchema>;

export type FirmaDocument = FirmaInput & {
  ipAddress?: string;
  userAgent?: string;
  createdAt: FirebaseFirestore.FieldValue;
};
