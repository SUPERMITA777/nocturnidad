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
  metaFirmas: z.number().optional().default(5000),
  pdfUrl: z.string().optional().default("/proyecto-ordenanza.html"),
  ultimaActualizacion: z.any().optional(),
});

export type Articulo = z.infer<typeof articuloSchema>;
export type Capitulo = z.infer<typeof capituloSchema>;
export type ProyectoLey = z.infer<typeof proyectoLeySchema>;

// Texto literal exacto con Usos Mixtos y fomento cultural/gastronómico - Modificación Ord. 10.339/23
export const DEFAULT_PROYECTO_LEY: ProyectoLey = {
  titulo: "MODIFICACIÓN DE LA ORDENANZA N.º 10.339/23 – ESTABLECIMIENTOS DE USOS MIXTOS Y ESPACIOS CULTURALES/ GASTRONÓMICOS",
  normasModificadas: [
    "Modificación Ord. N.º 10.339/23",
    "Incorporación Inciso d) y Art. 1° BIS",
    "Ley Provincial N.º 14.050 (texto actualizado)",
    "Normativa de Convivencia y Usos Mixtos",
  ],
  visto: "La Ordenanza Municipal N.º 10.339/23, mediante la cual se regula el desarrollo de las actividades bailables en el ámbito del Partido de Florencio Varela; y",
  considerandos: [
    "Que la dinámica económica, comercial, cultural y social del Partido de Florencio Varela ha generado nuevas modalidades de utilización de los establecimientos gastronómicos y comerciales, que exceden el desarrollo exclusivo de su actividad principal;",
    "Que numerosos establecimientos gastronómicos, culturales y comerciales constituyen espacios de encuentro comunitario donde se desarrollan actividades artísticas, culturales, formativas y de promoción de productos locales y regionales;",
    "Que resulta necesario adecuar la normativa vigente a estas nuevas realidades, otorgando un marco jurídico claro que permita el desarrollo de actividades compatibles con el rubro principal de los establecimientos;",
    "Que la Ordenanza N.º 10.339/23 regula específicamente las actividades bailables y establece requisitos particulares para los establecimientos en los que se desarrolla dicha actividad;",
    "Que la realización de actividades culturales, artísticas o formativas en un establecimiento gastronómico no necesariamente implica el desarrollo de una actividad bailable ni transforma al establecimiento en un local de esa modalidad;",
    "Que la ausencia de una categoría específica puede generar incertidumbre respecto de actividades tales como talleres, clases de baile, danza, canto o disciplinas escénicas, catas, degustaciones, peñas, milongas, exposiciones, presentaciones artísticas y música en vivo;",
    "Que resulta conveniente reconocer la figura de “Establecimientos de Usos Mixtos y Espacios Culturales/Gastronómicos”, permitiendo que los establecimientos debidamente habilitados puedan desarrollar actividades complementarias compatibles con su rubro principal, sin necesidad de obtener una nueva habilitación comercial autónoma;",
    "Que esta regulación permitirá promover la actividad cultural, artística, gastronómica y comunitaria, favoreciendo asimismo el desarrollo de emprendimientos locales y regionales; sin implicar la aplicación de tasas que terminan limitando la actividad y pudiendo llevar al cierre del comercio que se trata;",
    "Que la propuesta no implica eliminar los controles municipales existentes, sino establecer reglas claras respecto de capacidad, seguridad, higiene, accesibilidad, condiciones acústicas y convivencia urbana;",
    "Que, en particular, deberá garantizarse que el desarrollo de estas actividades no implique superar la capacidad máxima de ocupación autorizada ni obstruir medios de evacuación, accesos o salidas de emergencia;",
    "Que corresponde establecer una diferenciación clara entre los establecimientos comprendidos en la presente regulación y aquellos cuya actividad principal sea bailable, los cuales continuarán sujetos al régimen específico establecido por la Ordenanza N.º 10.339/23;",
  ],
  capitulos: [
    {
      numero: "CAPÍTULO I",
      titulo: "INCORPORACIÓN DE CATEGORÍA Y ACTIVIDADES COMPRENDIDAS",
      articulos: [
        {
          numero: 1,
          titulo: "Modificación del Artículo 1° de la Ordenanza N.º 10.339/23 (Inciso d)",
          contenido: "Modifícase el Artículo 1° de la Ordenanza N.º 10.339/23, incorporándose como inciso d) la siguiente categoría:\n- RECONÓCESE la figura de “Establecimientos de Usos Mixtos y Espacios Culturales/Gastronómicos”, a los establecimientos comerciales debidamente habilitados a desarrollar, de manera complementaria y compatible con su rubro principal, actividades culturales, artísticas, formativas, de difusión y promoción comunitaria.",
        },
        {
          numero: 2,
          titulo: "Incorporación del Artículo 1° BIS (Actividades Comprendidas)",
          contenido: "Incorpórase a la Ordenanza N.º 10.339/23 el siguiente artículo:\n“ARTÍCULO 1° BIS.- Los establecimientos gastronómicos con espectáculos en vivo podrán desarrollar, entre otras, las siguientes actividades:\na) Música en vivo, incluyendo solistas y conjuntos musicales.\nb) Shows musicales.\nc) Presentaciones artísticas y culturales.\nd) Espectáculos de stand up y humor.\ne) Presentaciones teatrales de pequeña y mediana escala.\nf) Exposiciones y manifestaciones artísticas.\ng) Otras actividades de similares características que determine la autoridad de aplicación.\nh) Talleres y actividades formativas.\ni) Clases de baile, danza, canto y disciplinas escénicas.\nj) Catas y degustaciones de productos locales o regionales.\nk) Peñas y milongas.\nl) Actividades de difusión y promoción cultural, artística, gastronómica o comunitaria.\nll) Otras actividades de características similares que resulten compatibles con el rubro principal del establecimiento.”",
        },
      ],
    },
    {
      numero: "CAPÍTULO II",
      titulo: "CONDICIONES DE FUNCIONAMIENTO, HABILITACIÓN Y SEGURIDAD",
      articulos: [
        {
          numero: 3,
          titulo: "Horarios y Compatibilidad de Uso",
          contenido: "Las actividades comprendidas en la presente Ordenanza podrán desarrollarse en horarios diurnos o vespertinos, de manera habitual u ocasional, siempre que resulten compatibles con el rubro principal del establecimiento, las características del inmueble y la normativa de zonificación vigente.",
        },
        {
          numero: 4,
          titulo: "Continuidad de Habilitación y Requisitos Técnicos",
          contenido: "El desarrollo de las actividades previstas en la presente Ordenanza no requerirá una nueva habilitación comercial autónoma, siempre que se realicen dentro del establecimiento debidamente habilitado y resulten compatibles con su actividad principal.\n\nLa autoridad municipal competente podrá requerir la presentación de documentación técnica o administrativa y de seguridad, cuando resulte necesaria verificar el cumplimiento de las condiciones de seguridad, capacidad, higiene, accesibilidad, aislamiento acústico y otras normativas aplicables.",
        },
        {
          numero: 5,
          titulo: "Capacidad Máxima de Ocupación y Medios de Evacuación",
          contenido: "Los establecimientos comprendidos en la presente figura deberán respetar en todo momento la capacidad máxima de ocupación previamente autorizada, con independencia de la modalidad de la actividad o de que los concurrentes, permanezcan sentados o de pie. Permitiendo adecuar el espacio a la modalidad de la actividad a desarrollar.\n\nLa permanencia de personas de pie no podrá obstruir accesos, salidas de emergencia, medios de evacuación, circulaciones ni cualquier otro sector que deba permanecer libre por razones de seguridad.",
        },
        {
          numero: 6,
          titulo: "Normas de Seguridad, Higiene, Acústica y Convivencia",
          contenido: "Las actividades deberán desarrollarse respetando las normas vigentes en materia de:\na) Seguridad y prevención contra incendios.\nb) Capacidad máxima de ocupación.\nc) Medios y salidas de evacuación.\nd) Instalaciones eléctricas y de gas.\ne) Higiene y seguridad.\nf) Accesibilidad.\ng) Aislamiento y control acústico.\nh) Ruidos molestos y convivencia urbana.\ni) Toda otra normativa nacional, provincial o municipal aplicable.",
        },
      ],
    },
    {
      numero: "CAPÍTULO III",
      titulo: "DELIMITACIÓN RESPECTO DE LA ACTIVIDAD BAILABLE Y FOMENTO LOCAL",
      articulos: [
        {
          numero: 8,
          titulo: "Exclusión de Actividad Bailable Principal",
          contenido: "La presente figura no comprenderá el desarrollo de actividad bailable como actividad principal, ni aquellas actividades que por sus características, modalidad de funcionamiento, configuración o concurrencia resulten alcanzadas por el régimen específico de los Locales Bailables establecido en la Ordenanza N.º 10.339/23 y sus modificatorias.",
        },
        {
          numero: 9,
          titulo: "Desestimación de Actividad Bailable Automática",
          contenido: "La realización de actividades culturales, artísticas, formativas o gastronómicas complementarias en los establecimientos comprendidos en la presente Ordenanza no será considerada, por sí misma, actividad bailable, aun cuando comprenda música en vivo, presentaciones artísticas, clases de baile, danza, peñas, milongas u otras expresiones culturales, siempre que no se configure la actividad bailable en los términos establecidos por la normativa vigente.",
        },
        {
          numero: 10,
          titulo: "Difusión y Promoción de Productos Locales y Regionales",
          contenido: "Los establecimientos comprendidos en la presente Ordenanza podrán realizar actividades de difusión y promoción de productos gastronómicos, artesanales, culturales y regionales, incluyendo catas, degustaciones y presentaciones de productos locales, conforme la normativa sanitaria y comercial vigente.",
        },
        {
          numero: 11,
          titulo: "Preservación del Rubro Principal y Uso del Suelo",
          contenido: "La incorporación de las actividades previstas en la presente Ordenanza no modificará la actividad principal declarada en la habilitación comercial, siempre que las actividades complementarias sean compatibles con aquella y con la normativa de uso del suelo aplicable.",
        },
      ],
    },
    {
      numero: "CAPÍTULO IV",
      titulo: "REGLAMENTACIÓN, MARCO NORMATIVO Y RÉGIMEN HORARIO",
      articulos: [
        {
          numero: 12,
          titulo: "Facultades de Reglamentación del Departamento Ejecutivo",
          contenido: "Facúltase al Departamento Ejecutivo a reglamentar la presente Ordenanza, estableciendo los requisitos técnicos y administrativos necesarios para su aplicación, procurando criterios de razonabilidad y proporcionalidad según la naturaleza, escala y modalidad de cada actividad.",
        },
        {
          numero: 13,
          titulo: "Cumplimiento de Normativa Provincial y Nacional",
          contenido: "La presente Ordenanza no exime a los establecimientos del cumplimiento de las normas provinciales y nacionales que resulten aplicables a las actividades desarrolladas, incluyendo aquellas relativas a seguridad, alimentos, bebidas, derechos de autor, condiciones laborales y demás legislación vigente.",
        },
        {
          numero: 14,
          titulo: "Régimen Horario General",
          contenido: "Régimen Horario General: Los establecimientos desarrollarán sus actividades respetando los límites de la legislación provincial (Ley N.º 14.050, texto actualizado) bajo las siguientes franjas de funcionamiento, que resultan más restrictivas en los días indicados:\na) Jueves, Domingos y Vísperas de feriados no laborables: Hasta las 02:00 horas del día siguiente.\nb) Viernes, Sábados y Vísperas de feriados: Hasta las 04:30 horas del día siguiente, cesando la venta y suministro de bebidas alcohólicas a las 03:30 horas.\nc) Lunes a Miércoles: Límite de sonido amplificado hasta las 00:00 horas, permitiéndose únicamente ambientaciones acústicas de bajo impacto que no trasciendan los límites de la propiedad (entendiendo por tales aquellas que no superen los niveles de inmisión permitidos en la normativa de ruidos molestos vigente).\n\nEl Departamento Ejecutivo podrá autorizar, por razones estacionales o regionales debidamente fundadas, la extensión del horario de cierre hasta el máximo provincial permitido, debiendo comunicarlo al Honorable Concejo Deliberante.",
        },
      ],
    },
    {
      numero: "CAPÍTULO V",
      titulo: "DISPOSICIONES FINALES",
      articulos: [
        {
          numero: 15,
          titulo: "Derogación de Disposiciones Contrarias",
          contenido: "Derógase toda disposición municipal que se oponga a la presente.",
        },
        {
          numero: 16,
          titulo: "De forma",
          contenido: "Comuníquese al Departamento Ejecutivo, regístrese y archívese.",
        },
      ],
    },
  ],
  metaFirmas: 5000,
  pdfUrl: "/proyecto-ordenanza.html",
};
