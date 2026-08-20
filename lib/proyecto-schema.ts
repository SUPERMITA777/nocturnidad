import { z } from "zod";

export const capituloSchema = z.object({
  numero: z.string(),
  titulo: z.string(),
  articulos: z.array(
    z.object({
      numero: z.number(),
      titulo: z.string(),
      contenido: z.string(),
    })
  ),
});

export const proyectoLeySchema = z.object({
  titulo: z.string(),
  normasModificadas: z.array(z.string()),
  visto: z.string(),
  considerandos: z.array(z.string()),
  capitulos: z.array(capituloSchema),
  pdfUrl: z.string().optional().default("/proyecto-ordenanza.pdf"),
  ultimaActualizacion: z.any().optional(),
});

export type Capitulo = z.infer<typeof capituloSchema>;
export type ProyectoLey = z.infer<typeof proyectoLeySchema>;

// Contenido oficial por defecto en caso de no haber sido modificado aún en Firestore
export const DEFAULT_PROYECTO_LEY: ProyectoLey = {
  titulo:
    "Régimen Integral de Funcionamiento, Convivencia, Seguridad Preventiva, Control Territorial y Fomento de la Actividad Nocturna",
  normasModificadas: [
    "Ordenanza Municipal N.º 10.329/23",
    "Decreto N.º 1.111/23",
    "Ordenanza Municipal N.º 442/77 (Art. 37)",
    "Ley Provincial N.º 14.050",
    "Ley Provincial N.º 11.748",
  ],
  visto:
    "El expediente relativo a la necesidad de actualizar y ordenar el marco normativo municipal que regula las actividades nocturnas, espectáculos públicos, esparcimiento y gastronomía en el Partido de Florencio Varela, comprendiendo la Ordenanza Municipal N.º 10.329/23, su Decreto Reglamentario N.º 1.111/23, el Código de Faltas Municipal (Ordenanza 442/77) y las Leyes Provinciales 14.050 y 11.748; y",
  considerandos: [
    "Que la actual rigidez y superposición de las normas municipales (Ord. 10.329/23, Dec. 1.111/23 y Ord. 442/77) ha generado una migración de la nocturnidad hacia fiestas clandestinas en quintas, galpones y predios sin habilitación ni control estatal.",
    "Que la figura de 'desvirtuación de rubro' del Art. 37 Inc. B de la Ordenanza 442/77 sanciona injustificadamente a locales gastronómicos y culturales habilitados que ofrecen música o espectáculos acústicos controlados.",
    "Que los eventos clandestinos carecen de medidas mínimas de seguridad siniestral, salidas de emergencia, socorrismo y control de expendio de alcohol a personas menores de edad (Ley Prov. 11.748).",
    "Que es deber del Honorable Concejo Deliberante proteger la vida e integridad física de los jóvenes, garantizar el descanso y la convivencia vecinal pacífica, y a su vez recuperar y formalizar el empleo local (artistas, técnicos, mozos, cocineros y trabajadores afines).",
    "Que resulta indispensable crear un Régimen Integral de Espacios Seguros, simplificar trámites de habilitación con permisos precarios y dotar al Municipio de herramientas eficaces de control territorial y fiscalización preventiva.",
  ],
  capitulos: [
    {
      numero: "Capítulo I",
      titulo: "Disposiciones Generales y Ámbito de Aplicación",
      articulos: [
        {
          numero: 1,
          titulo: "Objeto y Alcance",
          contenido:
            "La presente Ordenanza establece el marco regulatorio integral para la habilitación, funcionamiento, fiscalización, seguridad preventiva y fomento de todas las actividades comerciales, culturales, recreativas y de esparcimiento nocturno en el Partido de Florencio Varela.",
        },
        {
          numero: 2,
          titulo: "Principios Rectores",
          contenido:
            "Son principios de la presente norma: la preservación de la vida e integridad psicofísica de los concurrentes, la erradicación de eventos clandestinos, la protección integral de niños, niñas y adolescentes, la convivencia armónica con los vecinos linderos, y la promoción del empleo y la inversión cultural y gastronómica local.",
        },
      ],
    },
    {
      numero: "Capítulo II",
      titulo: "Régimen de Espacios Seguros y Habilitaciones Dinámicas",
      articulos: [
        {
          numero: 3,
          titulo: "Creación del Régimen de Espacios Seguros (RESAN)",
          contenido:
            "Créase el Régimen de Espacios Seguros para Actividades Nocturnas (RESAN). Los establecimientos que acrediten condiciones edilicias seguras, salidas de emergencia homologadas, seguro de responsabilidad civil y personal de control debidamente registrado gozarán de estabilidad operativa y extensión de horarios según su categoría.",
        },
        {
          numero: 4,
          titulo: "Permisos Precarios para Gastronomía con Música (Modificación Dec. 1.111/23)",
          contenido:
            "Los locales con rubro gastronómico habilitado podrán solicitar el Permiso Precario de Música y Espectáculo Acústico Controlado, sin que ello constituya desvirtuación de rubro bajo la Ordenanza 442/77, siempre que se respeten los límites de decibeles y normas de insonorización fijadas por la autoridad municipal.",
        },
      ],
    },
    {
      numero: "Capítulo III",
      titulo: "Reforma del Código de Faltas (Ord. 442/77)",
      articulos: [
        {
          numero: 5,
          titulo: "Modificación del Artículo 37 Inciso B",
          contenido:
            "Modifícase el Artículo 37 Inciso B de la Ordenanza N.º 442/77, exceptuando de la sanción por 'desvirtuación de rubro' a aquellos locales gastronómicos, peñas, cafés y centros culturales que incorporen música en vivo o grabada dentro de los parámetros del RESAN y con permiso municipal vigente.",
        },
      ],
    },
    {
      numero: "Capítulo IV",
      titulo: "Control Territorial, Menores y Prevención",
      articulos: [
        {
          numero: 6,
          titulo: "Control de Acceso y Protección de Menores (Leyes 14.050 y 11.748)",
          contenido:
            "Los establecimientos nocturnos deberán implementar sistemas de verificación digital fehaciente de identidad (DNI) en los accesos para garantizar el estricto cumplimiento de la prohibición de permanencia y expendio de alcohol a menores en horarios no permitidos.",
        },
        {
          numero: 7,
          titulo: "Sanciones Agravadas para Eventos Clandestinos",
          contenido:
            "Se considerará falta grave y pasible de clausura inmediata, secuestro de equipamiento y multas acumulativas a los propietarios de inmuebles, predios o quintas que organicen o cedan sus instalaciones para fiestas masivas con cobro de entrada o expendio de bebidas sin habilitación municipal.",
        },
      ],
    },
    {
      numero: "Capítulo V",
      titulo: "Cláusulas Transitorias y Reglamentación",
      articulos: [
        {
          numero: 8,
          titulo: "Plazo de Reglamentación y Adecuación",
          contenido:
            "El Departamento Ejecutivo Municipal reglamentará la presente Ordenanza en un plazo no mayor a sesenta (60) días corridos a partir de su promulgación. Los locales actualmente en funcionamiento contarán con un período de gracia de noventa (90) días para adecuarse al RESAN.",
        },
      ],
    },
  ],
  pdfUrl: "/proyecto-ordenanza.pdf",
};
