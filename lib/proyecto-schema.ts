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

// Texto literal exacto y revisado del Proyecto de Ordenanza oficial
export const DEFAULT_PROYECTO_LEY: ProyectoLey = {
  titulo: "RÉGIMEN INTEGRAL DE FUNCIONAMIENTO, CONVIVENCIA, SEGURIDAD PREVENTIVA, CONTROL TERRITORIAL Y FOMENTO DE LA ACTIVIDAD NOCTURNA DEL PARTIDO DE FLORENCIO VARELA",
  normasModificadas: [
    "Reforma Ord. 10.329/23",
    "Modificación Código de Faltas 442/77 (Art. 37)",
    "Adecuación Dec. 1.111/23",
    "Ley Provincial 14.050 (mod. Ley 15.401)",
    "Ley Provincial 11.748",
    "Dec-Ley Prov. 6.769/58",
  ],
  visto: "La Ordenanza Municipal N.º 10.329/23, el Decreto Reglamentario N.º 1.111/23, la Ordenanza Municipal N.º 442/77 (Código de Faltas Municipal), el Decreto-Ley Provincial N.º 6.769/58 (Ley Orgánica de las Municipalidades), la Ley Provincial N.º 14.050 (texto actualizado por Ley N.º 15.401 y modificatorias) reguladora de las actividades nocturnas, la Ley Provincial N.º 11.748 de Protección Integral de los Derechos del Niño y del Adolescente, y demás normativas complementarias aplicables; y",
  considerandos: [
    "Que el crecimiento demográfico, urbano, comercial y cultural del Partido de Florencio Varela exige una regulación moderna, integral y eficaz de las actividades de esparcimiento nocturno, gastronomía y espectáculos públicos;",
    "Que la actividad desarrollada por bares, salones de eventos, locales bailables, centros culturales y establecimientos gastronómicos con actividad nocturna constituye un motor fundamental de la economía local, generando empleo directo e indirecto para trabajadores gastronómicos, técnicos de sonido e iluminación, artistas, personal de logística y seguridad;",
    "Que la experiencia de aplicación de la Ordenanza N.º 10.329/23 ha demostrado que los esquemas excesivamente rígidos o punitivos no suprimen la demanda de esparcimiento de la población, sino que provocan el desplazamiento de los asistentes hacia eventos y fiestas clandestinas en quintas y galpones periféricos no habilitados;",
    "Que las actividades clandestinas configuran un riesgo crítico para la seguridad y la salud comunitaria, al desarrollarse sin salidas de emergencia, sin seguros de responsabilidad civil, sin cobertura de emergencias médicas, sin controles bromatológicos, sin fiscalización del expendio de sustancias prohibidas y sin control del ingreso de personas menores de edad;",
    "Que resulta imperativo conciliar el derecho al trabajo, al esparcimiento y a la inversión local con el legítimo derecho de los vecinos linderos al descanso, la tranquilidad pública, la seguridad vial y el uso pacífico del espacio público;",
    "Que una política pública moderna debe priorizar la prevención territorial previa por sobre la clausura automática ante faltas de carácter administrativo o subsanable, estableciendo reglas claras, objetividad técnica en las mediciones acústicas, gradualidad en las sanciones y un marco de responsabilidad activa y razonable en el espacio público exterior inmediato;",
    "Que es conveniente prever mecanismos de financiamiento para el control nocturno en territorio mediante servicios especiales de inspección y presencia preventiva, garantizando al mismo tiempo que las actividades artísticas o musicales complementarias en locales gastronómicos habilitados no sean tipificadas indebidamente como desvirtuación de rubro;",
    "Que la normativa municipal puede establecer límites o modalidades más restrictivas que las provinciales, conforme lo autoriza expresamente el artículo 17 de la Ley N.º 14.050;",
  ],
  capitulos: [
    {
      numero: "CAPÍTULO I",
      titulo: "OBJETO Y PRINCIPIOS GENERALES",
      articulos: [
        {
          numero: 1,
          titulo: "Objeto",
          contenido: "La presente Ordenanza tiene por objeto establecer un régimen integral para el funcionamiento, habilitación, seguridad preventiva, control en territorio y convivencia de los establecimientos que desarrollen actividades nocturnas en el Partido de Florencio Varela, compatibilizando:\na) El derecho al trabajo formal y al desarrollo de actividades comerciales, culturales y recreativas lícitas.\nb) La seguridad física e integral de trabajadores, concurrentes, frentistas y terceros.\nc) El derecho de los vecinos al descanso, la tranquilidad y el uso adecuado del espacio público.\nd) La prevención activa de hechos de violencia, siniestros y situaciones de riesgo antes, durante y después de cada actividad.\ne) El cumplimiento estricto y coordinado de las normativas municipales, provinciales y nacionales aplicables.\nf) La promoción prioritaria de la mano de obra, proveedores y artistas locales, mediante incentivos.",
        },
        {
          numero: 2,
          titulo: "Principios rectores",
          contenido: "La aplicación de la presente Ordenanza se regirá por los principios de:\na) Prevención previa y territorial.\nb) Razonabilidad y proporcionalidad sancionatoria.\nc) Gradualidad y subsanabilidad de faltas administrativas.\nd) Debido proceso y derecho de defensa.\ne) Responsabilidad objetiva del titular en el perímetro inmediato de funcionamiento.\nf) Objetividad técnica en las constataciones de infracciones.\ng) Convivencia armónica entre la actividad comercial y la comunidad vecinal.\nh) Legalidad y no discriminación.",
        },
      ],
    },
    {
      numero: "CAPÍTULO II",
      titulo: "ÁMBITO DE APLICACIÓN Y PERMISOS",
      articulos: [
        {
          numero: 3,
          titulo: "Establecimientos comprendidos",
          contenido: "Quedan comprendidos en el presente régimen todos los establecimientos y predios habilitados para desarrollar actividades nocturnas en el Partido de Florencio Varela, tales como bares, restaurantes con actividad nocturna, cervecerías, locales bailables, salones de eventos y fiestas, centros culturales, clubes sociales y demás emprendimientos afines.\nLa autoridad de aplicación determinará las exigencias técnicas específicas según la categoría, aforo, zonificación urbana y modalidad de funcionamiento, debiendo graduar los requisitos de manera proporcional.",
        },
        {
          numero: 4,
          titulo: "Permiso Especial de Actividad Cultural y Recreativa Accesoria",
          contenido: "Los establecimientos gastronómicos o culturales debidamente habilitados que deseen incorporar de forma habitual o periódica presentaciones artísticas, DJ o pistas complementarias de baile, podrán solicitar un “Permiso Especial y Precario de Actividad Cultural y Recreativa”.\nEl otorgamiento de dicho permiso impedirá que la actividad sea considerada como desvirtuación de rubro comercial en los términos del régimen de faltas municipal, siempre que se respeten los límites de aforo asignados y los niveles de insonorización reglamentarios.",
        },
      ],
    },
    {
      numero: "CAPÍTULO III",
      titulo: "CONDICIONES TÉCNICAS Y SEGURIDAD PREVENTIVA",
      articulos: [
        {
          numero: 5,
          titulo: "Requisitos de seguridad previa",
          contenido: "Todo establecimiento alcanzado deberá mantener vigentes, acreditadas y operativas las siguientes condiciones técnicas con anterioridad a la apertura al público, en la medida que corresponda según su categoría y aforo:\na) Certificación de instalaciones eléctricas visada por profesional matriculado con encomienda vigente.\nb) Certificación antisiniestral e informe técnico de operatividad de medios de escape y extintores al día.\nc) Póliza de Seguro de Responsabilidad Civil comprensiva de asistentes y terceros.\nd) Servicio de emergencias médicas de área protegida (o su equivalente proporcional según aforo).\ne) Puntos de hidratación gratuitos, señalizados y accesibles con suministro continuo de agua potable.\nf) Mecanismos verificables de control de aforo y factor ocupacional.\ng) Personal de seguridad y vigilancia debidamente habilitado conforme a la Ley Provincial N.º 12.297 y normas complementarias, cuando el aforo o la modalidad lo exijan.",
        },
      ],
    },
    {
      numero: "CAPÍTULO IV",
      titulo: "DISPOSITIVO EXTERIOR, VÍA PÚBLICA Y CONVIVENCIA",
      articulos: [
        {
          numero: 6,
          titulo: "Plan de Seguridad y Ordenamiento en el Frente y Vereda Inmediata",
          contenido: "Los establecimientos deberán presentar ante la autoridad municipal, como requisito de funcionamiento, un “Plan de Seguridad y Ordenamiento Exterior”, que contemplará:\na) Dispositivo de orden y prevención en los accesos y vereda inmediata al local, pudiendo coordinar personal de seguridad privada habilitado y/o la contratación voluntaria de servicios de Policía Adicional (PolAd) para la prevención de desmanes y facilitación del egreso ordenado.\nb) Esquema de circulación peatonal y vehicular que impida la obstrucción de garajes, rampas de accesibilidad y accesos a viviendas de frentistas linderos.\nc) Operativo de limpieza y acondicionamiento del frente y vereda inmediata dentro de las dos (2) horas posteriores al cese de la actividad.\nLa responsabilidad del titular se limita al frente del establecimiento y a la vereda inmediata, sin perjuicio de las facultades de control municipal sobre el resto del espacio público.",
        },
        {
          numero: 7,
          titulo: "Responsable de Convivencia y Canal de Enlace Vecinal",
          contenido: "Los establecimientos deberán designar un Responsable de Convivencia y Seguridad en cada jornada de actividad, quien deberá:\na) Poner a disposición de los vecinos frentistas y linderos una línea de comunicación directa y de respuesta inmediata (telefónica o mensajería instantánea) para atender incidencias en tiempo real durante el horario de actividad.\nb) Coordinar las medidas operativas para disipar ruidos o concentraciones indebidas en la vereda inmediata vinculadas al local.\nc) Articular la respuesta inmediata con los inspectores municipales y las fuerzas de seguridad pública.\nLa existencia de un reclamo vecinal no configurará infracción automática por sí misma, requiriendo constatación objetiva por parte de la autoridad competente.",
        },
      ],
    },
    {
      numero: "CAPÍTULO V",
      titulo: "HORARIOS Y CONTROL TÉCNICO ACÚSTICO",
      articulos: [
        {
          numero: 8,
          titulo: "Régimen Horario General",
          contenido: "Los establecimientos desarrollarán sus actividades respetando los límites de la legislación provincial (Ley N.º 14.050, texto actualizado) bajo las siguientes franjas de funcionamiento, que resultan más restrictivas en los días indicados:\na) Jueves, Domingos y Vísperas de feriados no laborables: Hasta las 02:00 horas del día siguiente.\nb) Viernes, Sábados y Vísperas de feriados: Hasta las 05:30 horas del día siguiente, cesando la venta y suministro de bebidas alcohólicas a las 04:30 horas.\nc) Lunes a Miércoles: Límite de sonido amplificado hasta las 00:00 horas, permitiéndose únicamente ambientaciones acústicas de bajo impacto que no trasciendan los límites de la propiedad (entendiendo por tales aquellas que no superen los niveles de inmisión permitidos en la normativa de ruidos molestos vigente).\nEl Departamento Ejecutivo podrá autorizar, por razones estacionales o regionales debidamente fundadas, la extensión del horario de cierre hasta el máximo provincial permitido, debiendo comunicarlo al Honorable Concejo Deliberante.",
        },
        {
          numero: 9,
          titulo: "Constatación Objetiva de Niveles Sonoros",
          contenido: "Las presuntas infracciones por ruidos molestos o superación de límites acústicos deberán ser constatadas fehacientemente mediante instrumentos homologados (decibelímetros/sonómetros) conforme a las normas IRAM correspondientes y a la normativa municipal de ruidos vigente.\nEl acta de inspección deberá detallar obligatoriamente: fecha, hora, ubicación del punto de medición, instrumental utilizado con certificado de calibración vigente, nivel sonoro basal de fondo y valor registrado. Las apreciaciones subjetivas o denuncias sin medición técnica no constituirán causal de sanción pecuniaria ni clausura.",
        },
        {
          numero: 10,
          titulo: "Servicio Municipal de Presencia Inspectiva y Fiscalización Nocturna",
          contenido: "Facúltase al Departamento Ejecutivo a implementar el “Servicio Especial de Inspectores en Territorio”:\na) Los establecimientos que organicen eventos masivos o hagan uso de permisos de extensión abonarán un canon específico por jornada, cuyo monto, bases y destinos serán establecidos en la Ordenanza Fiscal e Impositiva.\nb) Los fondos recaudados financiarán de manera exclusiva la presencia de inspectores municipales en las zonas de mayor concentración nocturna, a fin de fiscalizar el cumplimiento de decibeles, aforo, orden en veredas inmediatas y resolver de forma presencial los requerimientos vecinales.",
        },
      ],
    },
    {
      numero: "CAPÍTULO VI",
      titulo: "RÉGIMEN DE GRADUALIDAD Y SANCIONES",
      articulos: [
        {
          numero: 11,
          titulo: "Principio de Gradualidad y Faltas Subsanables",
          contenido: "Ante la detección de infracciones meramente formales o administrativas que no configuren un riesgo inminente para la vida o la integridad física de las personas, la autoridad de aplicación deberá intimar formalmente al titular a subsanar el incumplimiento dentro de un plazo razonable no menor a cuarenta y ocho (48) horas hábiles, previo a la aplicación de penalidades económicas o clausuras.",
        },
        {
          numero: 12,
          titulo: "Escala de Sanciones",
          contenido: "Las sanciones por contravenciones a la presente norma se aplicarán respetando la siguiente escala progresiva, con pleno respeto al debido proceso y derecho de defensa:\na) Apercibimiento formal.\nb) Intimación perentoria de regularización.\nc) Multa graduada en unidades fijas/módulos según la gravedad del hecho.\nd) Suspensión temporal del Permiso Especial de Actividad Cultural y Recreativa.\ne) Clausura temporal por plazo determinado.\nf) Clausura definitiva en casos de reincidencia grave y contumaz.",
        },
        {
          numero: 13,
          titulo: "Clausura Preventiva Excepcional",
          contenido: "La clausura preventiva únicamente procederá cuando exista un riesgo concreto, actual, grave e inminente para la seguridad de las personas (tales como bloqueo total de salidas de escape, riesgo eléctrico grave, exceso crítico y manifiesto de aforo o ausencia absoluta de seguro y emergencias médicas), o cuando se constate la realización de actividades en la clandestinidad.",
        },
      ],
    },
    {
      numero: "CAPÍTULO VII",
      titulo: "FIESTAS CLANDESTINAS Y PROTECCIÓN DE MENORES",
      articulos: [
        {
          numero: 14,
          titulo: "Represión de la Clandestinidad",
          contenido: "Se tipifica como falta gravísima la organización, comercialización, difusión pública o facilitación de inmuebles, quintas o galpones para fiestas o eventos de concurrencia pública sin habilitación municipal previa.\nEn estos casos se dispondrá la inmediata clausura preventiva del predio, el secuestro y decomiso del equipamiento de sonido e iluminación utilizado, y la aplicación de multas solidarias a organizadores, promotores y titulares dominiales del inmueble, con pleno respeto al debido proceso.",
        },
        {
          numero: 15,
          titulo: "Prohibición de Alcohol a Menores y Concurrencia Simultánea",
          contenido: "Queda taxativamente prohibido el expendio, suministro y consumo de bebidas alcohólicas a personas menores de dieciocho (18) años, así como la concurrencia simultánea de menores y mayores en establecimientos en horario bailable, en estricto cumplimiento de las Leyes Provinciales N.º 11.748 y N.º 14.050.",
        },
      ],
    },
    {
      numero: "CAPÍTULO VIII",
      titulo: "FOMENTO DEL EMPLEO LOCAL Y REGISTRO DE CONVIVENCIA",
      articulos: [
        {
          numero: 16,
          titulo: "Fomento de Mano de Obra y Artistas Locales",
          contenido: "Los establecimientos alcanzados por la presente Ordenanza procurarán priorizar la contratación de personal operativo, logística, técnicos, seguridad y presentaciones artísticas con residencia acreditada en el Partido de Florencio Varela.\nEl cumplimiento de esta priorización será considerado como antecedente positivo a los fines del Registro creado en el artículo siguiente, sin constituir obligación sancionable.",
        },
        {
          numero: 17,
          titulo: "Registro de Establecimientos Comprometidos",
          contenido: "Créase el “Registro Municipal de Establecimientos Comprometidos con la Convivencia y la Nocturnidad Segura”, destinado a distinguir y otorgar celeridad administrativa en trámites y permisos, así como otros beneficios que determine la reglamentación, a aquellos locales que acrediten una conducta sostenida sin infracciones graves, cumplimiento de normas de seguridad, integración activa con los vecinos de su entorno y priorización de mano de obra y artistas locales.",
        },
      ],
    },
    {
      numero: "CAPÍTULO IX",
      titulo: "PARTICIPACIÓN CIUDADANA Y MESA DE TRABAJO",
      articulos: [
        {
          numero: 18,
          titulo: "Mesa Municipal de Nocturnidad y Convivencia",
          contenido: "Créase la Mesa Municipal de Nocturnidad y Convivencia, con carácter de órgano consultivo y participativo, integrada por representantes del Departamento Ejecutivo, del Honorable Concejo Deliberante, de las cámaras de comercio y gastronomía, de los colectivos de trabajadores/artistas y de entidades vecinales del distrito, con el fin de evaluar la aplicación del régimen, proponer ajustes operativos y analizar las dinámicas del sector.",
        },
      ],
    },
    {
      numero: "CAPÍTULO X",
      titulo: "DISPOSICIONES COMPLEMENTARIAS Y MODIFICACIONES",
      articulos: [
        {
          numero: 19,
          titulo: "Modificación del Código de Faltas Municipal (Ord. N.º 442/77)",
          contenido: "Incorpórase como segundo párrafo del Inciso B del Artículo 37 de la Ordenanza N.º 442/77 el siguiente texto:\n“No se configurará alteración ni desvirtuación de rubro pasible de clausura en aquellos establecimientos habilitados para gastronomía, salones o centros culturales que incorporen actividades musicales, artísticas o pistas accesorias de baile, siempre que cuenten con el Permiso Especial correspondiente y no vulneren los límites sonoros objetivos ni el aforo fijado por la autoridad competente.”",
        },
        {
          numero: 20,
          titulo: "Modificación de la Ordenanza N.º 10.329/23",
          contenido: "Modifícanse todos los artículos y disposiciones de la Ordenanza N.º 10.329/23 que se opongan a la presente, debiendo el Departamento Ejecutivo proceder a la confección del respectivo Texto Ordenado dentro de los noventa (90) días de la promulgación de esta Ordenanza.",
        },
        {
          numero: 21,
          titulo: "Plazo de Reglamentación y Adecuación",
          contenido: "El Departamento Ejecutivo Municipal reglamentará la presente Ordenanza dentro de un plazo de sesenta (60) días corridos desde su promulgación. Los establecimientos actualmente habilitados dispondrán de noventa (90) días a partir de la publicación de la reglamentación para completar su adecuación a las exigencias operativas y registrar a sus responsables de convivencia.",
        },
        {
          numero: 22,
          titulo: "De forma",
          contenido: "Comuníquese al Departamento Ejecutivo Municipal, publíquese en el Boletín Oficial Municipal, regístrese y archívese.",
        },
      ],
    },
  ],
  metaFirmas: 5000,
  pdfUrl: "/proyecto-ordenanza.html",
};
