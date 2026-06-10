/* =============================================================
   CATÁLOGO DE PROGRAMAS 100% VIRTUALES — EDUCON UROSARIO
   Fuente: listado oficial "programas a implementar"
   (16 programas: 5 cursos virtuales y 11 diplomados virtuales)
   Estructura espejo de schema.sql → courses / modules / lessons
   ============================================================= */

// Videos de muestra (reemplazar por las URL reales de cada lección
// alojadas en el bucket de Supabase Storage o en Vimeo/YouTube).
const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
];

export const CATEGORIES = [
  'Salud',
  'Derecho y Gestión Pública',
  'Negocios y Estrategia',
  'Habilidades Profesionales',
];

/**
 * Construye lecciones completas a partir de los títulos,
 * generando ids, duración, video, contenido y recursos.
 */
function buildModules(slug, modules) {
  return modules.map((mod, mi) => ({
    id: `${slug}-m${mi + 1}`,
    title: mod.title,
    orderIndex: mi,
    lessons: mod.lessons.map((lessonTitle, li) => ({
      id: `${slug}-m${mi + 1}-l${li + 1}`,
      title: lessonTitle,
      orderIndex: li,
      durationMinutes: 18 + ((mi * 7 + li * 11) % 25),
      videoUrl: SAMPLE_VIDEOS[(mi + li) % SAMPLE_VIDEOS.length],
      description: `Lección ${li + 1} del módulo "${mod.title}".`,
      contentHtml: `
        <h2>${lessonTitle}</h2>
        <p>En esta lección profundizarás en <strong>${lessonTitle.toLowerCase()}</strong>,
        dentro del módulo <em>${mod.title}</em>. El contenido combina video-clases,
        lecturas guiadas y recursos descargables para que avances a tu propio ritmo.</p>
        <h3>Objetivos de aprendizaje</h3>
        <ul>
          <li>Comprender los conceptos clave de la temática y su contexto de aplicación.</li>
          <li>Aplicar las herramientas presentadas en casos reales de tu entorno profesional.</li>
          <li>Evaluar críticamente los resultados y construir tu propio plan de acción.</li>
        </ul>
        <h3>Antes de continuar</h3>
        <p>Revisa los recursos descargables de esta lección y, al finalizar,
        marca la lección como completada para registrar tu avance en el programa.</p>
      `,
      resources: [
        {
          name: `Guía de estudio — ${lessonTitle}.pdf`,
          type: 'pdf',
          size: '1.2 MB',
        },
        {
          name: `Plantilla de trabajo — Módulo ${mi + 1}.xlsx`,
          type: 'xlsx',
          size: '380 KB',
        },
      ],
    })),
  }));
}

const RAW_COURSES = [
  // ── CURSOS VIRTUALES ────────────────────────────────────────
  {
    code: '0HD0',
    orderNo: 'B-AVVBZ486',
    type: 'curso',
    category: 'Salud',
    title: 'Curso Virtual Atención Integral en Salud a Víctimas de Violencias Sexuales',
    slug: 'atencion-integral-victimas-violencias-sexuales',
    durationHours: 40,
    coverImage:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=60',
    description:
      'Fortalece tus competencias para la atención humanizada, integral y con enfoque de derechos a víctimas de violencias sexuales, según la normativa colombiana y los protocolos del sector salud.',
    modules: [
      {
        title: 'Marco normativo y enfoque de derechos',
        lessons: [
          'Panorama de las violencias sexuales en Colombia',
          'Normativa nacional e internacional aplicable',
          'Enfoque diferencial y de género en la atención',
        ],
      },
      {
        title: 'Atención clínica inicial',
        lessons: [
          'Valoración integral de la víctima en urgencias',
          'Profilaxis y manejo clínico según protocolo',
          'Cadena de custodia y toma de evidencias forenses',
        ],
      },
      {
        title: 'Salud mental y acompañamiento psicosocial',
        lessons: [
          'Primeros auxilios psicológicos',
          'Rutas de atención y articulación intersectorial',
          'Prevención de la revictimización',
        ],
      },
      {
        title: 'Seguimiento y restitución de derechos',
        lessons: [
          'Plan de seguimiento clínico y psicosocial',
          'Sistemas de información y notificación obligatoria',
          'Estudio de caso integrador',
        ],
      },
    ],
  },
  {
    code: '0HT7',
    orderNo: 'B-AVVBZ514',
    type: 'curso',
    category: 'Salud',
    title: 'Curso Virtual Gestión Estratégica para la Reincorporación Ocupacional',
    slug: 'gestion-estrategica-reincorporacion-ocupacional',
    durationHours: 40,
    coverImage:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=60',
    description:
      'Aprende a diseñar y gestionar programas de rehabilitación y reincorporación laboral efectivos, integrando la normativa vigente, la evaluación funcional y la gestión del riesgo ocupacional.',
    modules: [
      {
        title: 'Fundamentos de la reincorporación ocupacional',
        lessons: [
          'Conceptos clave y marco normativo colombiano',
          'Actores del Sistema General de Riesgos Laborales',
          'El rol del empleador y de la ARL',
        ],
      },
      {
        title: 'Evaluación de la capacidad funcional',
        lessons: [
          'Valoración médico-ocupacional del trabajador',
          'Análisis de puestos de trabajo',
          'Pruebas de aptitud y retorno seguro',
        ],
      },
      {
        title: 'Diseño del programa de reincorporación',
        lessons: [
          'Planes de reintegro gradual y reubicación',
          'Ajustes razonables y adaptación del puesto',
          'Indicadores de gestión del programa',
        ],
      },
      {
        title: 'Casos especiales y sostenibilidad',
        lessons: [
          'Reincorporación en enfermedades de origen común y laboral',
          'Gestión de casos complejos y mesas laborales',
          'Estudio de caso integrador',
        ],
      },
    ],
  },
  {
    code: '0HTU',
    orderNo: 'J-AVVBZ355',
    type: 'curso',
    category: 'Derecho y Gestión Pública',
    title:
      'Curso Virtual Internacional de Extinción de Dominio y Administración de Bienes Asegurados',
    slug: 'extincion-dominio-administracion-bienes',
    durationHours: 48,
    coverImage:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=60',
    description:
      'Domina el régimen jurídico de la extinción de dominio en Colombia y el derecho comparado, así como los modelos de administración de bienes incautados y asegurados.',
    modules: [
      {
        title: 'Fundamentos de la extinción de dominio',
        lessons: [
          'Naturaleza jurídica y evolución normativa',
          'La acción de extinción de dominio en el Código',
          'Estándares internacionales y derecho comparado',
        ],
      },
      {
        title: 'Procedimiento y etapas procesales',
        lessons: [
          'Fase inicial e investigación patrimonial',
          'Medidas cautelares sobre bienes',
          'Juicio, sentencia y recursos',
        ],
      },
      {
        title: 'Administración de bienes asegurados',
        lessons: [
          'Modelos de administración de activos incautados',
          'El FRISCO y la Sociedad de Activos Especiales',
          'Monetización, destinación y enajenación temprana',
        ],
      },
      {
        title: 'Retos contemporáneos',
        lessons: [
          'Lavado de activos y criminalidad transnacional',
          'Cooperación judicial internacional',
          'Taller de caso: estrategia patrimonial integral',
        ],
      },
    ],
  },
  {
    code: '0H48',
    orderNo: 'C-AVVBZ198',
    type: 'curso',
    category: 'Habilidades Profesionales',
    title: 'Curso Virtual Redacción Profesional con Inteligencia Artificial',
    slug: 'redaccion-profesional-inteligencia-artificial',
    durationHours: 32,
    coverImage:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=60',
    description:
      'Potencia tu escritura profesional con herramientas de inteligencia artificial generativa: desde la ingeniería de prompts hasta la edición de textos corporativos de alto impacto.',
    modules: [
      {
        title: 'Fundamentos de la redacción profesional',
        lessons: [
          'Principios de claridad, precisión y tono',
          'Estructura de documentos corporativos',
          'Errores frecuentes y cómo evitarlos',
        ],
      },
      {
        title: 'IA generativa para escribir mejor',
        lessons: [
          'Panorama de herramientas de IA para escritura',
          'Ingeniería de prompts aplicada a textos',
          'Ética, sesgos y verificación de información',
        ],
      },
      {
        title: 'Flujos de trabajo asistidos por IA',
        lessons: [
          'Borradores, reescritura y edición asistida',
          'Adaptación de textos a audiencias y canales',
          'Informes, correos y propuestas con IA',
        ],
      },
      {
        title: 'Proyecto final de escritura',
        lessons: [
          'Definición del documento profesional a producir',
          'Iteración con IA y control de calidad humano',
          'Entrega y retroalimentación del texto final',
        ],
      },
    ],
  },
  {
    code: '0H50',
    orderNo: 'C-AVVBZ204',
    type: 'curso',
    category: 'Habilidades Profesionales',
    title: 'Curso Virtual Técnicas Efectivas para Diseñar Presentaciones de Alto Impacto',
    slug: 'presentaciones-alto-impacto',
    durationHours: 32,
    coverImage:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=60',
    description:
      'Aprende a estructurar, diseñar y presentar ideas con impacto: storytelling, diseño visual de diapositivas y técnicas de oratoria para audiencias presenciales y virtuales.',
    modules: [
      {
        title: 'Estrategia y estructura del mensaje',
        lessons: [
          'Definir objetivo y audiencia de la presentación',
          'Storytelling: narrativas que conectan',
          'Mapas de contenido y guion visual',
        ],
      },
      {
        title: 'Diseño visual de diapositivas',
        lessons: [
          'Principios de diseño: jerarquía, contraste y espacio',
          'Tipografía, color e imágenes con propósito',
          'Visualización de datos que se entienden',
        ],
      },
      {
        title: 'Herramientas y productividad',
        lessons: [
          'PowerPoint avanzado y plantillas maestras',
          'Herramientas con IA para crear presentaciones',
          'Recursos gráficos y bancos de imágenes',
        ],
      },
      {
        title: 'Puesta en escena',
        lessons: [
          'Oratoria y manejo del lenguaje corporal',
          'Presentaciones virtuales efectivas',
          'Pitch final: presenta y recibe retroalimentación',
        ],
      },
    ],
  },

  // ── DIPLOMADOS VIRTUALES ────────────────────────────────────
  {
    code: '0HFP',
    orderNo: 'B-AVPBZ837',
    type: 'diplomado',
    category: 'Salud',
    title:
      'Diplomado Virtual Actualización en Calificación de la Pérdida de Capacidad Laboral y Ocupacional',
    slug: 'calificacion-perdida-capacidad-laboral',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=60',
    description:
      'Actualízate en el proceso de calificación de la pérdida de capacidad laboral y ocupacional en Colombia: manual único de calificación, dictámenes y controversias ante las juntas.',
    modules: [
      {
        title: 'Marco normativo de la calificación',
        lessons: [
          'Sistema de Seguridad Social y origen de la calificación',
          'Decreto 1507 de 2014 y manual único de calificación',
          'Actores: EPS, ARL, AFP y juntas de calificación',
        ],
      },
      {
        title: 'Valoración de deficiencias',
        lessons: [
          'Metodología de calificación de deficiencias',
          'Valoración por sistemas corporales',
          'Casos clínicos de calificación',
        ],
      },
      {
        title: 'Rol ocupacional y discapacidad',
        lessons: [
          'Valoración del rol laboral y ocupacional',
          'Tablas de valores y combinación de porcentajes',
          'Certificación de discapacidad y normativa vigente',
        ],
      },
      {
        title: 'Dictámenes y controversias',
        lessons: [
          'Estructura y motivación del dictamen',
          'Recursos ante juntas regionales y nacional',
          'Taller integrador de dictamen completo',
        ],
      },
    ],
  },
  {
    code: '0GRR',
    orderNo: 'B-AVVBZ465',
    type: 'diplomado',
    category: 'Salud',
    title: 'Diplomado Virtual Actualización para Médicos Generales',
    slug: 'actualizacion-medicos-generales',
    durationHours: 120,
    coverImage:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=60',
    description:
      'Programa de actualización clínica para médicos generales: abordaje basado en evidencia de las patologías más frecuentes en consulta externa, urgencias y atención primaria.',
    modules: [
      {
        title: 'Medicina interna en consulta externa',
        lessons: [
          'Hipertensión arterial: guías actuales',
          'Diabetes mellitus tipo 2: manejo integral',
          'Dislipidemias y riesgo cardiovascular',
        ],
      },
      {
        title: 'Urgencias y atención prioritaria',
        lessons: [
          'Dolor torácico: enfoque diagnóstico',
          'Infecciones respiratorias agudas',
          'Trauma leve y heridas en urgencias',
        ],
      },
      {
        title: 'Salud mental y poblaciones especiales',
        lessons: [
          'Depresión y ansiedad en atención primaria',
          'Pediatría ambulatoria esencial',
          'Adulto mayor: valoración geriátrica básica',
        ],
      },
      {
        title: 'Práctica clínica y normatividad',
        lessons: [
          'Prescripción racional de medicamentos',
          'Historia clínica y responsabilidad médico-legal',
          'Casos clínicos integradores',
        ],
      },
    ],
  },
  {
    code: '0GP0',
    orderNo: 'J-AVVBZ279',
    type: 'diplomado',
    category: 'Derecho y Gestión Pública',
    title: 'Diplomado Virtual en Contratación Estatal',
    slug: 'contratacion-estatal',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=60',
    description:
      'Conoce a profundidad el régimen de contratación pública en Colombia: principios, modalidades de selección, ejecución contractual, supervisión y régimen sancionatorio.',
    modules: [
      {
        title: 'Fundamentos de la contratación pública',
        lessons: [
          'Principios y normativa: Ley 80, Ley 1150 y decretos',
          'Capacidad, inhabilidades e incompatibilidades',
          'Planeación contractual y estudios previos',
        ],
      },
      {
        title: 'Modalidades de selección',
        lessons: [
          'Licitación pública y selección abreviada',
          'Concurso de méritos y mínima cuantía',
          'Contratación directa y régimen especial',
        ],
      },
      {
        title: 'Ejecución y supervisión del contrato',
        lessons: [
          'Perfeccionamiento, garantías y anticipos',
          'Supervisión e interventoría',
          'Modificaciones, adiciones y equilibrio económico',
        ],
      },
      {
        title: 'Controversias y régimen sancionatorio',
        lessons: [
          'Incumplimiento, multas y caducidad',
          'Liquidación del contrato estatal',
          'SECOP II: taller práctico integrador',
        ],
      },
    ],
  },
  {
    code: '0GP1',
    orderNo: 'B-AVVBZ460',
    type: 'diplomado',
    category: 'Salud',
    title: 'Diplomado Virtual en Medicina del Dolor y Cuidado Paliativo',
    slug: 'medicina-dolor-cuidado-paliativo',
    durationHours: 120,
    coverImage:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=60',
    description:
      'Desarrolla competencias para la valoración y el manejo integral del dolor y la atención paliativa del paciente con enfermedad crónica, avanzada o terminal, y su familia.',
    modules: [
      {
        title: 'Bases de la medicina del dolor',
        lessons: [
          'Fisiopatología y clasificación del dolor',
          'Valoración multidimensional del dolor',
          'Escalera analgésica y principios de manejo',
        ],
      },
      {
        title: 'Farmacología del dolor',
        lessons: [
          'AINEs y analgésicos no opioides',
          'Opioides: titulación, rotación y seguridad',
          'Coadyuvantes y manejo del dolor neuropático',
        ],
      },
      {
        title: 'Cuidado paliativo integral',
        lessons: [
          'Principios y modelos de atención paliativa',
          'Control de síntomas no dolorosos',
          'Atención al final de la vida y sedación paliativa',
        ],
      },
      {
        title: 'Dimensión psicosocial, ética y legal',
        lessons: [
          'Comunicación de malas noticias y duelo',
          'Marco legal colombiano: voluntades anticipadas',
          'Caso clínico integrador en equipo interdisciplinario',
        ],
      },
    ],
  },
  {
    code: '0H77',
    orderNo: 'F-AVVBZ180',
    type: 'diplomado',
    category: 'Negocios y Estrategia',
    title: 'Diplomado Virtual en Sostenibilidad en Supply Chain Management',
    slug: 'sostenibilidad-supply-chain',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=60',
    description:
      'Integra la sostenibilidad en la gestión de la cadena de suministro: economía circular, logística verde, abastecimiento responsable y reporte ESG.',
    modules: [
      {
        title: 'Cadena de suministro y sostenibilidad',
        lessons: [
          'Fundamentos de supply chain management',
          'Los ODS y la agenda ESG en operaciones',
          'Mapeo y diagnóstico de la cadena de valor',
        ],
      },
      {
        title: 'Abastecimiento responsable',
        lessons: [
          'Compras sostenibles y selección de proveedores',
          'Trazabilidad y debida diligencia',
          'Certificaciones y estándares internacionales',
        ],
      },
      {
        title: 'Logística verde y economía circular',
        lessons: [
          'Huella de carbono en transporte y distribución',
          'Logística inversa y gestión de residuos',
          'Modelos de economía circular en la cadena',
        ],
      },
      {
        title: 'Medición, reporte y estrategia',
        lessons: [
          'Indicadores ESG para la cadena de suministro',
          'Reportes de sostenibilidad (GRI, SASB)',
          'Proyecto final: hoja de ruta sostenible',
        ],
      },
    ],
  },
  {
    code: '0H7J',
    orderNo: 'F-AVVBZ181',
    type: 'diplomado',
    category: 'Negocios y Estrategia',
    title: 'Diplomado Virtual Estrategia, Diseño y Escalamiento de Negocios Digitales',
    slug: 'estrategia-negocios-digitales',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=60',
    description:
      'Diseña, valida y escala modelos de negocio digitales: descubrimiento de clientes, propuestas de valor, growth marketing y métricas para crecer de forma sostenible.',
    modules: [
      {
        title: 'Estrategia y modelos de negocio digital',
        lessons: [
          'Transformación digital y nuevos modelos de negocio',
          'Business Model Canvas y propuesta de valor',
          'Análisis de mercado y competencia digital',
        ],
      },
      {
        title: 'Diseño y validación',
        lessons: [
          'Design thinking y descubrimiento de clientes',
          'Prototipado y producto mínimo viable',
          'Experimentos de validación y métricas tempranas',
        ],
      },
      {
        title: 'Crecimiento y adquisición',
        lessons: [
          'Embudos de conversión y growth marketing',
          'Canales digitales: SEO, pauta y contenidos',
          'CRM y automatización del relacionamiento',
        ],
      },
      {
        title: 'Escalamiento del negocio',
        lessons: [
          'Unit economics y métricas de escala',
          'Equipos, procesos y tecnología para escalar',
          'Pitch final del negocio digital',
        ],
      },
    ],
  },
  {
    code: '0HB2',
    orderNo: 'F-AVVBZ183',
    type: 'diplomado',
    category: 'Salud',
    title: 'Diplomado Virtual Evaluación de Tecnologías en Salud',
    slug: 'evaluacion-tecnologias-salud',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=60',
    description:
      'Aprende las metodologías de evaluación de tecnologías sanitarias (ETES): evidencia clínica, evaluación económica y procesos de decisión para la incorporación de tecnologías.',
    modules: [
      {
        title: 'Fundamentos de la ETES',
        lessons: [
          'Qué es la evaluación de tecnologías en salud',
          'Ciclo de vida de las tecnologías sanitarias',
          'Institucionalidad: IETS y agencias internacionales',
        ],
      },
      {
        title: 'Evidencia clínica',
        lessons: [
          'Búsqueda y síntesis de evidencia',
          'Revisiones sistemáticas y metaanálisis',
          'Evaluación de seguridad y efectividad',
        ],
      },
      {
        title: 'Evaluación económica',
        lessons: [
          'Tipos de evaluación económica en salud',
          'Costo-efectividad y análisis de impacto presupuestal',
          'Modelos de decisión y sensibilidad',
        ],
      },
      {
        title: 'Decisión e implementación',
        lessons: [
          'Procesos de priorización y cobertura',
          'Acuerdos de riesgo compartido y precio',
          'Proyecto final: informe ETES completo',
        ],
      },
    ],
  },
  {
    code: '0I19',
    orderNo: 'F-AVPBZ238',
    type: 'diplomado',
    category: 'Negocios y Estrategia',
    title: 'Diplomado Virtual Gerencia Comercial 5.0: Estrategia, IA y Talento en la Era Digital',
    slug: 'gerencia-comercial-5-0',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=60',
    description:
      'Lidera equipos comerciales de alto desempeño en la era digital: estrategia comercial, inteligencia artificial aplicada a ventas, analítica y gestión del talento.',
    modules: [
      {
        title: 'Estrategia comercial en la era 5.0',
        lessons: [
          'Del vendedor tradicional a la venta consultiva digital',
          'Diseño de la estrategia y el plan comercial',
          'Segmentación, buyer persona y propuesta de valor',
        ],
      },
      {
        title: 'IA y tecnología para ventas',
        lessons: [
          'CRM e inteligencia comercial',
          'IA generativa aplicada al proceso de venta',
          'Automatización del pipeline y lead scoring',
        ],
      },
      {
        title: 'Analítica comercial',
        lessons: [
          'KPIs e indicadores del equipo comercial',
          'Forecasting y gestión del embudo',
          'Tableros de control para la dirección comercial',
        ],
      },
      {
        title: 'Talento y liderazgo comercial',
        lessons: [
          'Estructura y compensación del equipo de ventas',
          'Coaching comercial y gestión del desempeño',
          'Proyecto final: plan comercial 5.0',
        ],
      },
    ],
  },
  {
    code: '0HTT',
    orderNo: 'F-AVVBZ196',
    type: 'diplomado',
    category: 'Salud',
    title: 'Diplomado Virtual Innovación Aplicada al Sector Salud',
    slug: 'innovacion-sector-salud',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=60',
    description:
      'Impulsa la innovación en organizaciones de salud: salud digital, metodologías ágiles, experiencia del paciente y modelos de negocio innovadores para el sector.',
    modules: [
      {
        title: 'Ecosistema de innovación en salud',
        lessons: [
          'Tendencias globales de innovación sanitaria',
          'Salud digital: telemedicina, apps e IoT médico',
          'Regulación e interoperabilidad en Colombia',
        ],
      },
      {
        title: 'Metodologías para innovar',
        lessons: [
          'Design thinking centrado en el paciente',
          'Lean healthcare y mejora continua',
          'Gestión ágil de proyectos de innovación',
        ],
      },
      {
        title: 'Datos e inteligencia artificial',
        lessons: [
          'Analítica de datos clínicos y poblacionales',
          'IA en diagnóstico y gestión hospitalaria',
          'Ética y gobernanza de datos en salud',
        ],
      },
      {
        title: 'Del piloto al escalamiento',
        lessons: [
          'Modelos de negocio en salud digital',
          'Evaluación de impacto y sostenibilidad',
          'Proyecto final: pitch de innovación en salud',
        ],
      },
    ],
  },
  {
    code: '0GP2',
    orderNo: 'B-AVVBZ459',
    type: 'diplomado',
    category: 'Salud',
    title:
      'Diplomado Virtual Neuropsicología en los Trastornos del Lenguaje y el Aprendizaje',
    slug: 'neuropsicologia-lenguaje-aprendizaje',
    durationHours: 120,
    coverImage:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60',
    description:
      'Comprende las bases neuropsicológicas del lenguaje y el aprendizaje, y desarrolla competencias para la evaluación e intervención de sus trastornos en población infantil y escolar.',
    modules: [
      {
        title: 'Bases neuropsicológicas',
        lessons: [
          'Neurodesarrollo y plasticidad cerebral',
          'Bases neurales del lenguaje',
          'Funciones ejecutivas y aprendizaje',
        ],
      },
      {
        title: 'Trastornos del lenguaje',
        lessons: [
          'Trastorno del desarrollo del lenguaje (TDL)',
          'Trastornos del habla y la comunicación',
          'Evaluación del lenguaje infantil',
        ],
      },
      {
        title: 'Trastornos del aprendizaje',
        lessons: [
          'Dislexia y dificultades lectoras',
          'Discalculia y disgrafía',
          'TDAH y su impacto en el aprendizaje',
        ],
      },
      {
        title: 'Evaluación e intervención',
        lessons: [
          'Protocolos de evaluación neuropsicológica',
          'Diseño de planes de intervención',
          'Estudio de caso integrador escolar',
        ],
      },
    ],
  },
  {
    code: '0GR6',
    orderNo: 'B-AVVBZ463',
    type: 'diplomado',
    category: 'Salud',
    title: 'Diplomado Virtual Terapias Complementarias: Un Nuevo Abordaje en Salud',
    slug: 'terapias-complementarias-salud',
    durationHours: 100,
    coverImage:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=60',
    description:
      'Explora las medicinas y terapias complementarias con fundamento científico y normativo: su integración segura y basada en evidencia dentro de los modelos de atención en salud.',
    modules: [
      {
        title: 'Panorama de las terapias complementarias',
        lessons: [
          'Medicina integrativa: conceptos y evidencia',
          'Marco normativo colombiano e internacional',
          'Seguridad del paciente e interacciones',
        ],
      },
      {
        title: 'Principales sistemas terapéuticos',
        lessons: [
          'Medicina tradicional china y acupuntura',
          'Fitoterapia y productos naturales',
          'Homeopatía y terapias mente-cuerpo',
        ],
      },
      {
        title: 'Aplicación clínica',
        lessons: [
          'Terapias complementarias en dolor crónico',
          'Manejo complementario en oncología',
          'Bienestar, estrés y salud mental',
        ],
      },
      {
        title: 'Integración en los servicios de salud',
        lessons: [
          'Modelos de atención integrativa',
          'Investigación en terapias complementarias',
          'Proyecto final: propuesta de servicio integrativo',
        ],
      },
    ],
  },
];

/** Catálogo final con módulos y lecciones completamente resueltos. */
export const COURSES = RAW_COURSES.map((course) => ({
  ...course,
  modules: buildModules(course.slug, course.modules),
}));

/** Utilidades de consulta sobre el catálogo. */
export function getCourseBySlug(slug) {
  return COURSES.find((c) => c.slug === slug) ?? null;
}

export function getCourseLessons(course) {
  return course.modules.flatMap((m) => m.lessons);
}

export function countLessons(course) {
  return getCourseLessons(course).length;
}
