import { z } from "zod";

export const articuloSchema = z.object({
  numero: z.number(),
  titulo: z.string(),
  contenido: z.string(),
});

export const capituloSchema = z.object({
  numero: z.string(),
  titulo: z.string(),
  articulos: z.array(articuloSchema),
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

export type Articulo = z.infer<typeof articuloSchema>;
export type Capitulo = z.infer<typeof capituloSchema>;
export type ProyectoLey = z.infer<typeof proyectoLeySchema>;

// Contenido completo con los 10 Capítulos y 22 Artículos oficiales
export const DEFAULT_PROYECTO_LEY: ProyectoLey = {
  titulo: "Régimen Integral de Funcionamiento, Convivencia, Seguridad Preventiva, Control Territorial y Fomento de la Actividad Nocturna",
  normasModificadas: [
    "Reforma Ord. 10.329/23",
    "Modificación Código de Faltas 442/77",
    "Adecuación Ley 14.050",
    "Protección de Menores Ley 11.748",
  ],
  visto: "La necesidad de una reforma integral del marco normativo municipal que regula la noche, el esparcimiento, la cultura y la gastronomía en Florencio Varela, comprendiendo las Ordenanzas N.º 10.329/23 y 442/77 (Código de Faltas), su Decreto Reglamentario N.º 1.111/23 y las Leyes Provinciales 14.050 y 11.748; y",
  considerandos: [
    "Que el marco normativo actual (Ord. 10.329/23 y Ord. 442/77) adolece de rigideces y superposiciones que han provocado el cierre de espacios formales y la masiva proliferación de fiestas clandestinas en quintas y galpones sin ningún control estatal.",
    "Que la figura de 'desvirtuación de rubro' del Art. 37 Inc. B de la Ordenanza 442/77 castiga arbitrariamente a la gastronomía y espacios culturales que ofrecen música en vivo o espectáculos acústicos controlados.",
    "Que los eventos clandestinos exponen a la juventud a graves riesgos siniestrales, carecen de salidas de emergencia, socorrismo y violan sistemáticamente la prohibición de expendio de alcohol a menores (Ley Prov. 11.748).",
    "Que la nocturnidad formal es un motor económico fundamental que genera empleo genuino para mozos, cocineros, técnicos de sonido e iluminación, músicos, artistas y personal de seguridad local.",
    "Que es imprescindible establecer un régimen objetivo de medición acústica con decibelímetros homologados para conciliar la actividad con el legítimo descanso de los vecinos linderos.",
    "Que resulta urgente dotar al Municipio de un servicio arancelado de inspectores en territorio y agravar las sanciones a los organizadores y propietarios de predios clandestinos.",
  ],
  capitulos: [
    {
      numero: "Capítulo I",
      titulo: "Objeto y Principios",
      articulos: [
        {
          numero: 1,
          titulo: "Objeto",
          contenido: "La presente Ordenanza establece el Régimen Integral de Funcionamiento, Convivencia, Seguridad Preventiva, Control Territorial y Fomento de la Actividad Nocturna en el Partido de Florencio Varela.",
        },
        {
          numero: 2,
          titulo: "Principios Rectores",
          contenido: "Son principios de la presente norma: la gradualidad en la fiscalización, la prevención activa del riesgo, la protección de la vida y de los menores de edad, el descanso vecinal armónico y la defensa irrestricta del trabajo cultural y gastronómico local.",
        },
      ],
    },
    {
      numero: "Capítulo II",
      titulo: "Permiso Especial Accesorio para Gastronomía y Cultura",
      articulos: [
        {
          numero: 3,
          titulo: "Creación del Permiso Especial Accesorio (PEA)",
          contenido: "Establécese el Permiso Especial Accesorio (PEA) para locales gastronómicos, bares, peñas, cafés y centros culturales habilitados que incorporen música en vivo, espectáculos acústicos o baile controlado.",
        },
        {
          numero: 4,
          titulo: "Exclusión de Desvirtuación de Rubro",
          contenido: "El ejercicio de actividades comprendidas en el PEA no constituirá en ningún caso 'desvirtuación de rubro' bajo el Código de Faltas (Ord. 442/77), siempre que se cumplimenten los parámetros de aforo e insonorización autorizados.",
        },
      ],
    },
    {
      numero: "Capítulo III",
      titulo: "Seguridad Preventiva Previa y Control de Aforo",
      articulos: [
        {
          numero: 5,
          titulo: "Seguridad Estructural y Siniestral",
          contenido: "Todo espacio nocturno deberá contar con informe técnico de bomberos, planos de evacuación visibles, sistemas ignífugos certificados, salidas de emergencia antipánico y seguro de responsabilidad civil vigente.",
        },
        {
          numero: 6,
          titulo: "Control Digital de Aforo y Accesos",
          contenido: "Los establecimientos con capacidad superior a 200 personas deberán implementar contadores digitales de ingreso/egreso en tiempo real visibles en el acceso y verificación fehaciente de DNI.",
        },
      ],
    },
    {
      numero: "Capítulo IV",
      titulo: "Plan de Seguridad Perimetral Exterior y Canal Directo Vecinal",
      articulos: [
        {
          numero: 7,
          titulo: "Seguridad Perimetral y Corredores Seguros",
          contenido: "Los titulares deberán disponer personal de control y prevención en el perímetro exterior del local durante el ingreso y egreso, coordinando corredores seguros hacia paradas de transporte público.",
        },
        {
          numero: 8,
          titulo: "Canal Directo de Enlace Vecinal",
          contenido: "Cada establecimiento designará un responsable de guardia y una línea telefónica directa y pública para atención inmediata de reclamos de vecinos frentistas y linderos.",
        },
      ],
    },
    {
      numero: "Capítulo V",
      titulo: "Horarios y Medición Acústica Objetiva",
      articulos: [
        {
          numero: 9,
          titulo: "Límites Acústicos Objetivos",
          contenido: "Las mediciones de ruidos molestos se efectuarán exclusivamente mediante decibelímetros homologados y calibrados, en el interior de las viviendas linderas afectadas, descartando apreciaciones subjetivas.",
        },
        {
          numero: 10,
          titulo: "Régimen Horario Diferenciado",
          contenido: "Fíjanse horarios de cierre escalonados según rubro y día de la semana, permitiendo extensión en fines de semana y vísperas de feriados conforme a la Ley Provincial 14.050.",
        },
      ],
    },
    {
      numero: "Capítulo VI",
      titulo: "Servicio Municipal de Inspectores en Territorio Arancelado",
      articulos: [
        {
          numero: 11,
          titulo: "Cuerpo de Inspectores Nocturnos",
          contenido: "Créase el Cuerpo Especializado de Inspectores de Nocturnidad con presencia territorial activa, móvil y preventiva en zonas comerciales y de esparcimiento.",
        },
        {
          numero: 12,
          titulo: "Tasa Arancelada de Fiscalización Preventiva",
          contenido: "La fiscalización preventiva se financiará mediante un arancel mensual retributivo de servicios, afectado exclusivamente al equipamiento, capacitación y movilidad del cuerpo inspectivo.",
        },
      ],
    },
    {
      numero: "Capítulo VII",
      titulo: "Escala de Sanciones y Clausura Preventiva",
      articulos: [
        {
          numero: 13,
          titulo: "Gradualidad de las Sanciones",
          contenido: "El régimen sancionatorio observará estricta gradualidad: 1) Apercibimiento con plazo de adecuación; 2) Multa económica gradual; 3) Suspensión transitoria del PEA; 4) Clausura definitiva.",
        },
        {
          numero: 14,
          titulo: "Límite a la Clausura Preventiva",
          contenido: "La clausura preventiva sólo procederá ante situaciones de peligro grave, manifiesto e inminente para la vida o la seguridad pública, debiendo fundamentarse técnicamente en el acta respectiva.",
        },
        {
          numero: 15,
          titulo: "Derecho a Subsanación Rápida",
          contenido: "Constatada una falta menor que no involucre riesgo físico, se otorgará un plazo perentorio de 72 horas hábiles para su subsanación antes de aplicar penalidades pecuniarias.",
        },
      ],
    },
    {
      numero: "Capítulo VIII",
      titulo: "Represión de Fiestas Clandestinas y Prohibición de Alcohol a Menores",
      articulos: [
        {
          numero: 16,
          titulo: "Tolerancia Cero a la Clandestinidad",
          contenido: "Considérase infracción gravísima la realización de eventos con cobro de entrada o expendio de bebidas en inmuebles sin habilitación. El Municipio procederá a la clausura inmediata, desalojo pacífico y secuestro de equipos de sonido e iluminación.",
        },
        {
          numero: 17,
          titulo: "Responsabilidad Solidaria de Propietarios",
          contenido: "Los titulares de dominio de quintas, galpones y predios responderán solidariamente por las multas y costos operativos derivados de las fiestas clandestinas realizadas en sus inmuebles.",
        },
        {
          numero: 18,
          titulo: "Protección Estricta de Menores (Ley 11.748)",
          contenido: "Queda absolutamente prohibido el expendio, suministro y consumo de bebidas alcohólicas a menores de 18 años, disponiéndose la clausura inmediata del establecimiento ante su incumplimiento.",
        },
      ],
    },
    {
      numero: "Capítulo IX",
      titulo: "Registro de Establecimientos Comprometidos y Fomento del Empleo Local",
      articulos: [
        {
          numero: 19,
          titulo: "Registro de Espacios Comprometidos (REC)",
          contenido: "Créase el Registro de Establecimientos Comprometidos con la Nocturnidad Segura, otorgando sello de calidad municipal y beneficios impositivos en tasas locales a quienes mantengan legajo limpio.",
        },
        {
          numero: 20,
          titulo: "Cupo de Empleo y Contratación Local del 60%",
          contenido: "Los locales adheridos al régimen deberán garantizar que al menos el sesenta por ciento (60%) de su personal (mozos, cocina, barra, seguridad, sonido, técnica y artistas) tenga domicilio real en Florencio Varela.",
        },
      ],
    },
    {
      numero: "Capítulo X",
      titulo: "Modificaciones Expresas a la Ord. 10.329/23 y Ord. 442/77",
      articulos: [
        {
          numero: 21,
          titulo: "Modificación de la Ordenanza N.º 10.329/23 y Decreto 1.111/23",
          contenido: "Modifícanse los artículos pertinentes de la Ordenanza Municipal N.º 10.329/23 y de su Decreto Reglamentario N.º 1.111/23, adecuándolos a las figuras del PEA, RESAN y a los principios de la presente norma.",
        },
        {
          numero: 22,
          titulo: "Modificación del Artículo 37 de la Ordenanza N.º 442/77",
          contenido: "Incorpórase como excepción al Art. 37 Inc. B de la Ord. 442/77 la actividad musical y cultural accesoria debidamente habilitada bajo el PEA, derogándose toda disposición que se oponga a la presente Ordenanza.",
        },
      ],
    },
  ],
  pdfUrl: "/proyecto-ordenanza.pdf",
};
