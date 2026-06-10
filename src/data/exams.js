/* =============================================================
   EXÁMENES FINALES — CAMPUS VIRTUAL EDUCON
   Un examen por programa (clave = slug del curso).
   Estructura espejo de la tabla `exam_questions` de schema.sql.
   Aprobación: score >= passScore (porcentaje).
   ============================================================= */

export const PASS_SCORE = 80;

export const EXAMS = {
  'atencion-integral-victimas-violencias-sexuales': [
    {
      question:
        '¿Dentro de qué ventana de tiempo es prioritario iniciar la profilaxis post-exposición (VIH e ITS) en una víctima de violencia sexual?',
      options: [
        'Las primeras 72 horas',
        'La primera semana',
        'Los primeros 30 días',
        'Solo durante las primeras 6 horas',
      ],
      correctIndex: 0,
    },
    {
      question:
        'La atención en salud a víctimas de violencias sexuales debe prestarse como:',
      options: [
        'Una cita prioritaria programable en 48 horas',
        'Una urgencia médica, sin requisitos administrativos previos',
        'Un servicio sujeto a autorización de la EPS',
        'Una consulta externa con remisión de Fiscalía',
      ],
      correctIndex: 1,
    },
    {
      question:
        '¿Cuál es el objetivo principal de la cadena de custodia en la atención clínica forense?',
      options: [
        'Acelerar el alta hospitalaria de la víctima',
        'Documentar el diagnóstico para la historia clínica',
        'Garantizar la integridad y validez probatoria de las evidencias',
        'Cumplir un requisito exclusivamente administrativo',
      ],
      correctIndex: 2,
    },
    {
      question: 'Los primeros auxilios psicológicos buscan principalmente:',
      options: [
        'Realizar una psicoterapia breve estructurada',
        'Diagnosticar trastorno de estrés postraumático',
        'Obtener el relato detallado de los hechos para la denuncia',
        'Contener emocionalmente, estabilizar y conectar con redes de apoyo',
      ],
      correctIndex: 3,
    },
    {
      question:
        'Evitar que la víctima repita su relato innecesariamente ante múltiples profesionales es una medida de:',
      options: [
        'Prevención de la revictimización',
        'Economía procesal',
        'Triage hospitalario',
        'Consentimiento informado',
      ],
      correctIndex: 0,
    },
  ],

  'gestion-estrategica-reincorporacion-ocupacional': [
    {
      question:
        'En el Sistema General de Riesgos Laborales colombiano, la rehabilitación integral del trabajador con accidente laboral es responsabilidad principal de:',
      options: [
        'La caja de compensación familiar',
        'La ARL en articulación con el empleador y la EPS',
        'Exclusivamente el Ministerio de Trabajo',
        'El fondo de pensiones',
      ],
      correctIndex: 1,
    },
    {
      question: 'El análisis de puesto de trabajo (APT) permite:',
      options: [
        'Definir el salario del trabajador reincorporado',
        'Sancionar al empleador por incumplimiento',
        'Comparar las demandas del cargo con la capacidad funcional del trabajador',
        'Reemplazar la valoración médico-ocupacional',
      ],
      correctIndex: 2,
    },
    {
      question: 'Un plan de reintegro laboral gradual consiste en:',
      options: [
        'Reincorporar al trabajador solo cuando esté 100% recuperado',
        'Trasladar al trabajador a otra empresa',
        'Pensionar anticipadamente al trabajador',
        'Retorno progresivo con ajustes de tareas, horarios o cargas',
      ],
      correctIndex: 3,
    },
    {
      question: 'Los "ajustes razonables" en el contexto de la reincorporación son:',
      options: [
        'Adaptaciones del puesto que no imponen una carga desproporcionada al empleador',
        'Descuentos salariales proporcionales a la limitación',
        'Modificaciones obligatorias de la planta física completa',
        'Beneficios extralegales pactados en convención colectiva',
      ],
      correctIndex: 0,
    },
    {
      question:
        '¿Cuál de los siguientes es un indicador pertinente para evaluar un programa de reincorporación ocupacional?',
      options: [
        'Número de incapacidades emitidas por la EPS',
        'Tasa de retorno exitoso y sostenido al trabajo',
        'Cantidad de exámenes de ingreso realizados',
        'Rotación general de personal de la empresa',
      ],
      correctIndex: 1,
    },
  ],

  'extincion-dominio-administracion-bienes': [
    {
      question: 'La acción de extinción de dominio en Colombia se caracteriza por ser:',
      options: [
        'Una pena accesoria del proceso penal',
        'Una sanción administrativa de la DIAN',
        'Una acción constitucional, autónoma e independiente de la acción penal',
        'Un incidente dentro del proceso de responsabilidad fiscal',
      ],
      correctIndex: 2,
    },
    {
      question:
        'En Colombia, la administración de los bienes con extinción de dominio y afectados con medidas cautelares está a cargo de:',
      options: [
        'La Fiscalía General de la Nación',
        'El Consejo Superior de la Judicatura',
        'La Contraloría General de la República',
        'La Sociedad de Activos Especiales (SAE) a través del FRISCO',
      ],
      correctIndex: 3,
    },
    {
      question: 'La enajenación temprana de bienes incautados procede, entre otros casos, cuando:',
      options: [
        'El bien corre riesgo de deterioro o su administración resulta antieconómica',
        'El afectado lo solicita para pagar honorarios de abogado',
        'Han pasado 10 años desde la incautación',
        'El bien se encuentra fuera del país',
      ],
      correctIndex: 0,
    },
    {
      question:
        'Las medidas cautelares en el proceso de extinción de dominio tienen como finalidad:',
      options: [
        'Sancionar anticipadamente al investigado',
        'Asegurar los bienes para evitar su ocultamiento, transferencia o deterioro',
        'Garantizar la comparecencia del procesado penal',
        'Sustituir la sentencia de extinción',
      ],
      correctIndex: 1,
    },
    {
      question:
        'Frente a la criminalidad transnacional, la recuperación de activos en el exterior se apoya principalmente en:',
      options: [
        'La extradición de los condenados',
        'El embargo unilateral por parte del juez colombiano',
        'Los mecanismos de cooperación judicial internacional y asistencia mutua',
        'Las notas diplomáticas de protesta',
      ],
      correctIndex: 2,
    },
  ],

  'redaccion-profesional-inteligencia-artificial': [
    {
      question: 'Un texto profesional claro se caracteriza principalmente por:',
      options: [
        'El uso abundante de tecnicismos para demostrar dominio',
        'Párrafos extensos que desarrollen varias ideas a la vez',
        'Oraciones directas, una idea por párrafo y lenguaje preciso',
        'El uso de voz pasiva para mantener formalidad',
      ],
      correctIndex: 2,
    },
    {
      question: 'En ingeniería de prompts, un buen prompt debe incluir:',
      options: [
        'Solo la pregunta, lo más corta posible',
        'Contexto, rol, tarea específica y formato esperado de la respuesta',
        'Instrucciones en inglés exclusivamente',
        'Múltiples tareas simultáneas para ahorrar tiempo',
      ],
      correctIndex: 1,
    },
    {
      question:
        'Cuando una IA generativa produce información falsa pero verosímil, este fenómeno se denomina:',
      options: ['Alucinación', 'Sobreajuste', 'Latencia', 'Tokenización'],
      correctIndex: 0,
    },
    {
      question:
        '¿Cuál es la práctica correcta al usar IA para redactar documentos corporativos?',
      options: [
        'Publicar el primer borrador generado para aprovechar la velocidad',
        'Incluir datos confidenciales para obtener mejores resultados',
        'Evitar revisar el texto porque la IA no comete errores',
        'Verificar hechos y cifras, y editar el texto con criterio humano',
      ],
      correctIndex: 3,
    },
    {
      question: 'Adaptar un mismo contenido a diferentes audiencias y canales implica:',
      options: [
        'Cambiar tono, extensión y vocabulario según el lector y el medio',
        'Copiar el texto idéntico en todos los canales',
        'Usar siempre el formato más formal disponible',
        'Eliminar los llamados a la acción',
      ],
      correctIndex: 0,
    },
  ],

  'presentaciones-alto-impacto': [
    {
      question: 'Antes de diseñar cualquier diapositiva, el primer paso es:',
      options: [
        'Elegir la plantilla y la paleta de colores',
        'Definir el objetivo de la presentación y conocer a la audiencia',
        'Escribir el guion completo de cada lámina',
        'Seleccionar las animaciones de transición',
      ],
      correctIndex: 1,
    },
    {
      question: 'El storytelling en presentaciones sirve para:',
      options: [
        'Alargar la duración de la charla',
        'Reemplazar los datos por anécdotas',
        'Conectar emocionalmente y hacer memorable el mensaje',
        'Evitar preparar la estructura',
      ],
      correctIndex: 2,
    },
    {
      question: 'Según los principios de diseño visual, una buena diapositiva:',
      options: [
        'Contiene todo el texto que el presentador va a decir',
        'Usa tantos colores como sea posible para llamar la atención',
        'Combina al menos cuatro tipografías distintas',
        'Tiene jerarquía clara, espacio en blanco y una idea principal',
      ],
      correctIndex: 3,
    },
    {
      question: 'Al visualizar datos en una presentación, lo recomendable es:',
      options: [
        'Elegir el gráfico que mejor responda a la pregunta y simplificarlo',
        'Mostrar la tabla completa de Excel para dar transparencia',
        'Usar gráficos 3D porque se ven más profesionales',
        'Incluir todos los datos disponibles en un solo gráfico',
      ],
      correctIndex: 0,
    },
    {
      question: 'En una presentación virtual, una buena práctica de puesta en escena es:',
      options: [
        'Leer las diapositivas para no olvidar nada',
        'Mirar a la cámara, cuidar la iluminación y hacer pausas para interactuar',
        'Apagar la cámara para que se concentren en las láminas',
        'Hablar más rápido para mantener la atención',
      ],
      correctIndex: 1,
    },
  ],

  'calificacion-perdida-capacidad-laboral': [
    {
      question:
        'El manual único vigente para calificar la pérdida de capacidad laboral y ocupacional en Colombia está contenido en:',
      options: [
        'El Decreto 1507 de 2014',
        'La Ley 100 de 1993',
        'El Decreto 1072 de 2015',
        'La Resolución 2346 de 2007',
      ],
      correctIndex: 0,
    },
    {
      question:
        'En primera oportunidad, la pérdida de capacidad laboral puede ser calificada por:',
      options: [
        'Únicamente la Junta Nacional de Calificación',
        'El empleador con apoyo del COPASST',
        'La EPS, la ARL o la AFP, según el caso',
        'El juez laboral',
      ],
      correctIndex: 2,
    },
    {
      question:
        'En Colombia se considera inválida la persona que ha perdido una capacidad laboral igual o superior a:',
      options: ['25%', '33%', '40%', '50%'],
      correctIndex: 3,
    },
    {
      question:
        'Si hay desacuerdo con el dictamen de la junta regional de calificación, procede:',
      options: [
        'Recurso de apelación ante la Junta Nacional de Calificación de Invalidez',
        'Acción de tutela como única vía',
        'Una nueva calificación por la misma junta a los 5 años',
        'Demanda directa ante el Consejo de Estado',
      ],
      correctIndex: 0,
    },
    {
      question:
        'El modelo de calificación del Decreto 1507 de 2014 valora, además de las deficiencias, :',
      options: [
        'El estrato socioeconómico del trabajador',
        'El rol laboral, ocupacional y otras áreas de desempeño',
        'La antigüedad en la empresa',
        'El concepto del empleador sobre el desempeño',
      ],
      correctIndex: 1,
    },
  ],

  'actualizacion-medicos-generales': [
    {
      question:
        'Según las guías actuales, la meta general de presión arterial en la mayoría de adultos hipertensos es:',
      options: ['< 160/100 mmHg', '< 150/95 mmHg', '< 130/80 mmHg', '< 110/60 mmHg'],
      correctIndex: 2,
    },
    {
      question:
        'El medicamento de primera línea en la mayoría de pacientes con diabetes mellitus tipo 2, salvo contraindicación, es:',
      options: ['Glibenclamida', 'Metformina', 'Insulina glargina', 'Sitagliptina'],
      correctIndex: 1,
    },
    {
      question:
        'En el enfoque inicial del dolor torácico en urgencias, la conducta prioritaria es:',
      options: [
        'Solicitar una radiografía de tórax y esperar el resultado',
        'Administrar analgesia y observar evolución',
        'Remitir a consulta externa de cardiología',
        'Realizar electrocardiograma en los primeros 10 minutos y estratificar el riesgo',
      ],
      correctIndex: 3,
    },
    {
      question:
        'Para el tamizaje y seguimiento de la depresión en atención primaria, un instrumento validado y ampliamente utilizado es:',
      options: ['El PHQ-9', 'La escala de Glasgow', 'El índice de Barthel', 'El APGAR familiar'],
      correctIndex: 0,
    },
    {
      question: 'La prescripción racional de antibióticos implica:',
      options: [
        'Usar siempre antibióticos de amplio espectro para asegurar cobertura',
        'Prescribir según diagnóstico probable, epidemiología local y guías, evitando uso innecesario',
        'Formular antibiótico en toda infección respiratoria aguda',
        'Dejar que el paciente decida la duración del tratamiento',
      ],
      correctIndex: 1,
    },
  ],

  'contratacion-estatal': [
    {
      question:
        '¿Cuáles son principios rectores de la contratación estatal según la Ley 80 de 1993?',
      options: [
        'Transparencia, economía y responsabilidad',
        'Oralidad, inmediación y concentración',
        'Solidaridad, universalidad y eficiencia',
        'Celeridad, gratuidad y doble instancia',
      ],
      correctIndex: 0,
    },
    {
      question:
        'La modalidad de selección que constituye la regla general para la escogencia del contratista es:',
      options: [
        'La contratación directa',
        'La mínima cuantía',
        'La licitación pública',
        'El concurso de méritos',
      ],
      correctIndex: 2,
    },
    {
      question: 'La diferencia esencial entre supervisión e interventoría es que:',
      options: [
        'La supervisión solo aplica a contratos de obra',
        'La interventoría la ejerce un juez administrativo',
        'La supervisión es posterior a la liquidación del contrato',
        'La supervisión la ejerce la propia entidad y la interventoría un tercero contratado',
      ],
      correctIndex: 3,
    },
    {
      question: 'La caducidad del contrato estatal es:',
      options: [
        'La terminación del plazo de ejecución pactado',
        'Una sanción por incumplimiento grave que amenaza la ejecución del contrato',
        'La pérdida de competencia de la entidad para liquidar',
        'Un acuerdo bilateral de terminación anticipada',
      ],
      correctIndex: 1,
    },
    {
      question: 'El SECOP II es:',
      options: [
        'La plataforma transaccional de contratación pública en Colombia',
        'Un órgano de control fiscal',
        'El sistema de información tributaria de la DIAN',
        'Un registro exclusivo de proponentes de obra pública',
      ],
      correctIndex: 0,
    },
  ],

  'medicina-dolor-cuidado-paliativo': [
    {
      question: 'La escalera analgésica de la OMS propone:',
      options: [
        'Iniciar siempre con opioides potentes para control rápido',
        'Un manejo escalonado según la intensidad del dolor, con coadyuvantes en todos los niveles',
        'Usar solo analgesia no farmacológica en el primer nivel',
        'Reservar los opioides para pacientes hospitalizados',
      ],
      correctIndex: 1,
    },
    {
      question: 'En la titulación de opioides, la práctica correcta es:',
      options: [
        'Iniciar con dosis altas y reducir según sedación',
        'Usar dosis fijas iguales para todos los pacientes',
        'Suspender ante el primer efecto adverso sin alternativa',
        'Iniciar con dosis bajas y aumentar gradualmente según respuesta y efectos adversos',
      ],
      correctIndex: 3,
    },
    {
      question: 'El objetivo central del cuidado paliativo es:',
      options: [
        'Mejorar la calidad de vida del paciente y su familia frente a enfermedades que amenazan la vida',
        'Prolongar la vida a cualquier costo',
        'Acelerar el final de la vida',
        'Sustituir el tratamiento oncológico activo',
      ],
      correctIndex: 0,
    },
    {
      question:
        'Para el dolor neuropático, además de los analgésicos convencionales, son útiles como coadyuvantes:',
      options: [
        'Antibióticos macrólidos',
        'Antidepresivos duales y anticonvulsivantes como pregabalina/gabapentina',
        'Corticoides inhalados',
        'Inhibidores de bomba de protones',
      ],
      correctIndex: 1,
    },
    {
      question:
        'El documento mediante el cual una persona expresa anticipadamente su voluntad sobre tratamientos médicos futuros se denomina:',
      options: [
        'Consentimiento delegado',
        'Acta de conciliación prejudicial',
        'Documento de voluntades anticipadas',
        'Poder notarial en salud',
      ],
      correctIndex: 2,
    },
  ],

  'sostenibilidad-supply-chain': [
    {
      question:
        'El enfoque de "triple resultado" (triple bottom line) en sostenibilidad integra las dimensiones:',
      options: [
        'Económica, ambiental y social',
        'Operativa, táctica y estratégica',
        'Local, nacional e internacional',
        'Calidad, costo y tiempo',
      ],
      correctIndex: 0,
    },
    {
      question: 'El abastecimiento responsable implica principalmente:',
      options: [
        'Comprar siempre al proveedor más barato',
        'Centralizar todas las compras en un único proveedor',
        'Evaluar y seleccionar proveedores con criterios ambientales, sociales y éticos',
        'Eliminar a los proveedores pequeños de la cadena',
      ],
      correctIndex: 2,
    },
    {
      question: 'La logística inversa se refiere a:',
      options: [
        'El transporte nocturno de mercancías',
        'La gestión del retorno de productos, envases y residuos para su recuperación o disposición',
        'La importación de productos terminados',
        'El rediseño de rutas de distribución urbana',
      ],
      correctIndex: 1,
    },
    {
      question:
        'En la medición de huella de carbono corporativa, las emisiones de la cadena de valor (proveedores, transporte tercerizado, uso del producto) corresponden a:',
      options: ['Alcance 1', 'Alcance 2', 'Emisiones directas', 'Alcance 3'],
      correctIndex: 3,
    },
    {
      question: 'El estándar GRI se utiliza para:',
      options: [
        'Elaborar reportes de sostenibilidad comparables y verificables',
        'Certificar la calidad de los productos terminados',
        'Calcular aranceles de importación',
        'Auditar estados financieros',
      ],
      correctIndex: 0,
    },
  ],

  'estrategia-negocios-digitales': [
    {
      question: 'El Business Model Canvas sirve para:',
      options: [
        'Calcular la nómina de la empresa',
        'Visualizar y diseñar de forma integral los componentes del modelo de negocio',
        'Registrar la marca ante la Superintendencia',
        'Definir el organigrama de la compañía',
      ],
      correctIndex: 1,
    },
    {
      question: 'Un Producto Mínimo Viable (MVP) es:',
      options: [
        'El producto final con todas las funcionalidades',
        'Un prototipo interno que nunca se muestra a clientes',
        'La versión más simple que permite validar hipótesis con clientes reales',
        'Una maqueta visual sin ninguna funcionalidad',
      ],
      correctIndex: 2,
    },
    {
      question: 'En un embudo de conversión, la etapa de "activación" se refiere a:',
      options: [
        'El primer momento en que el usuario experimenta el valor del producto',
        'La inversión en publicidad pagada',
        'El registro de la empresa en redes sociales',
        'La renovación anual del contrato',
      ],
      correctIndex: 0,
    },
    {
      question:
        'Para que un negocio digital sea sostenible, la relación entre el valor de vida del cliente (LTV) y el costo de adquisición (CAC) debe ser:',
      options: [
        'LTV menor que CAC',
        'LTV igual a CAC',
        'Irrelevante si hay inversionistas',
        'LTV significativamente mayor que CAC (≈ 3:1 o más)',
      ],
      correctIndex: 3,
    },
    {
      question: 'Escalar un negocio digital significa:',
      options: [
        'Aumentar proporcionalmente costos e ingresos',
        'Crecer ingresos y usuarios sin que los costos crezcan en la misma proporción',
        'Abrir oficinas físicas en más ciudades',
        'Contratar más personal comercial',
      ],
      correctIndex: 1,
    },
  ],

  'evaluacion-tecnologias-salud': [
    {
      question: 'La evaluación de tecnologías en salud (ETES) es:',
      options: [
        'Un proceso multidisciplinario que sintetiza evidencia clínica, económica y social para informar decisiones',
        'Una auditoría financiera de los hospitales',
        'Un trámite de registro sanitario ante el INVIMA',
        'La capacitación del personal en nuevos equipos',
      ],
      correctIndex: 0,
    },
    {
      question: 'En Colombia, la entidad de referencia para la evaluación de tecnologías en salud es:',
      options: [
        'La Superintendencia de Salud',
        'El IETS (Instituto de Evaluación Tecnológica en Salud)',
        'La ADRES',
        'El Ministerio de Hacienda',
      ],
      correctIndex: 1,
    },
    {
      question:
        'El indicador que expresa el costo adicional por unidad adicional de beneficio (ej. por AVAC/QALY ganado) es:',
      options: [
        'El ROI financiero',
        'El punto de equilibrio',
        'La razón de costo-efectividad incremental (ICER/RCEI)',
        'El valor presente neto',
      ],
      correctIndex: 2,
    },
    {
      question:
        'El tipo de estudio que sintetiza de forma estructurada toda la evidencia disponible sobre una pregunta es:',
      options: [
        'El reporte de caso',
        'El estudio transversal',
        'La encuesta de satisfacción',
        'La revisión sistemática (con o sin metaanálisis)',
      ],
      correctIndex: 3,
    },
    {
      question: 'El análisis de impacto presupuestal responde a la pregunta:',
      options: [
        '¿Cuánto costará al sistema adoptar la tecnología en los próximos años?',
        '¿La tecnología es eficaz frente a placebo?',
        '¿Cuál es la satisfacción de los usuarios?',
        '¿La tecnología cumple estándares de bioseguridad?',
      ],
      correctIndex: 0,
    },
  ],

  'gerencia-comercial-5-0': [
    {
      question: 'La venta consultiva se diferencia de la venta tradicional porque:',
      options: [
        'Se centra en el precio como argumento principal',
        'Diagnostica las necesidades del cliente y propone soluciones de valor',
        'Evita el contacto directo con el cliente',
        'Solo aplica a productos tecnológicos',
      ],
      correctIndex: 1,
    },
    {
      question: 'Un CRM aporta a la gestión comercial principalmente:',
      options: [
        'El reemplazo total del equipo de ventas',
        'La contabilidad tributaria de la empresa',
        'Trazabilidad del relacionamiento y datos para decidir sobre el pipeline',
        'El diseño gráfico de las campañas',
      ],
      correctIndex: 2,
    },
    {
      question: 'El "lead scoring" consiste en:',
      options: [
        'Asignar puntajes a los prospectos según su perfil y comportamiento para priorizarlos',
        'Calificar el desempeño de los vendedores',
        'Medir la satisfacción postventa',
        'Definir los precios de lista',
      ],
      correctIndex: 0,
    },
    {
      question: 'Un forecast (pronóstico) de ventas confiable se construye a partir de:',
      options: [
        'La meta que imponga la gerencia general',
        'La intuición del vendedor más antiguo',
        'El resultado del año anterior sin ajustes',
        'El pipeline ponderado por etapa, históricos y estacionalidad',
      ],
      correctIndex: 3,
    },
    {
      question: 'El coaching comercial efectivo se caracteriza por:',
      options: [
        'Acompañamiento individual basado en datos y desarrollo de habilidades',
        'Reuniones grupales de presión por resultados',
        'Sanciones por incumplimiento de cuota',
        'Delegar la formación exclusivamente en RRHH',
      ],
      correctIndex: 0,
    },
  ],

  'innovacion-sector-salud': [
    {
      question: 'La telemedicina se define como:',
      options: [
        'La provisión de servicios de salud a distancia mediante TIC',
        'La digitalización de la historia clínica',
        'La venta de medicamentos por internet',
        'El agendamiento de citas en línea',
      ],
      correctIndex: 0,
    },
    {
      question: 'El design thinking aplicado a salud parte de:',
      options: [
        'Los indicadores financieros del hospital',
        'La empatía con pacientes y usuarios para entender sus necesidades reales',
        'La disponibilidad de tecnología de punta',
        'Los requerimientos de los entes de control',
      ],
      correctIndex: 1,
    },
    {
      question: 'Lean healthcare busca principalmente:',
      options: [
        'Reducir personal asistencial',
        'Aumentar la facturación por evento',
        'Eliminar desperdicios y actividades sin valor en los procesos de atención',
        'Externalizar todos los servicios de apoyo',
      ],
      correctIndex: 2,
    },
    {
      question: 'En el uso de IA para diagnóstico clínico, una condición ética esencial es:',
      options: [
        'Que el algoritmo permanezca secreto',
        'Que reemplace por completo el juicio del médico',
        'Que se use solo en pacientes privados',
        'Supervisión humana, validación clínica y gestión de sesgos del algoritmo',
      ],
      correctIndex: 3,
    },
    {
      question: 'Para escalar un piloto de innovación en salud se requiere, ante todo:',
      options: [
        'Evidencia de impacto, modelo de sostenibilidad y plan de gestión del cambio',
        'Comprar más equipos del mismo proveedor',
        'Duplicar el presupuesto de mercadeo',
        'Esperar a que la competencia lo adopte primero',
      ],
      correctIndex: 0,
    },
  ],

  'neuropsicologia-lenguaje-aprendizaje': [
    {
      question: 'La plasticidad cerebral se refiere a:',
      options: [
        'La capacidad del cerebro de reorganizarse y formar nuevas conexiones con la experiencia',
        'La rigidez de las funciones cognitivas tras la infancia',
        'El crecimiento del cráneo durante el desarrollo',
        'La lateralización exclusiva del lenguaje en el hemisferio derecho',
      ],
      correctIndex: 0,
    },
    {
      question: 'El trastorno del desarrollo del lenguaje (TDL) se caracteriza por:',
      options: [
        'Dificultades persistentes del lenguaje no explicadas por déficit sensorial, motor o intelectual',
        'Pérdida del lenguaje adquirido tras un trauma',
        'Retraso del habla que siempre se resuelve solo',
        'Dificultades exclusivamente en la escritura',
      ],
      correctIndex: 0,
    },
    {
      question: 'La dislexia es un trastorno específico del aprendizaje que afecta principalmente:',
      options: [
        'La coordinación motora gruesa',
        'La precisión y fluidez en el reconocimiento de palabras y la decodificación lectora',
        'La memoria episódica autobiográfica',
        'La percepción musical',
      ],
      correctIndex: 1,
    },
    {
      question: 'Las funciones ejecutivas incluyen procesos como:',
      options: [
        'Visión, audición y tacto',
        'Digestión y respiración',
        'Inhibición, memoria de trabajo y flexibilidad cognitiva',
        'Reflejos osteotendinosos',
      ],
      correctIndex: 2,
    },
    {
      question: 'Una evaluación neuropsicológica infantil rigurosa debe:',
      options: [
        'Basarse en una única prueba de inteligencia',
        'Excluir la información de padres y docentes',
        'Realizarse solo después de los 12 años',
        'Integrar pruebas estandarizadas, observación e información de múltiples contextos',
      ],
      correctIndex: 3,
    },
  ],

  'terapias-complementarias-salud': [
    {
      question: 'La medicina integrativa se define como:',
      options: [
        'El reemplazo de la medicina convencional por terapias alternativas',
        'La combinación informada de medicina convencional y terapias complementarias con evidencia',
        'El uso exclusivo de productos naturales',
        'Una especialidad quirúrgica',
      ],
      correctIndex: 1,
    },
    {
      question:
        'Antes de recomendar una terapia complementaria, el profesional debe verificar principalmente:',
      options: [
        'Su popularidad en redes sociales',
        'El costo del tratamiento',
        'La evidencia de eficacia y seguridad, y las posibles interacciones',
        'La disponibilidad en el barrio del paciente',
      ],
      correctIndex: 2,
    },
    {
      question: 'La acupuntura cuenta con mejor evidencia de utilidad en:',
      options: [
        'El manejo de algunos tipos de dolor crónico y náuseas',
        'La curación de enfermedades oncológicas',
        'El reemplazo de antibióticos en infecciones',
        'La corrección de defectos refractivos oculares',
      ],
      correctIndex: 0,
    },
    {
      question: 'Un riesgo relevante de la fitoterapia es:',
      options: [
        'Que carece completamente de efectos biológicos',
        'Su costo siempre superior al de los medicamentos',
        'Que requiere prescripción quirúrgica',
        'Las interacciones con medicamentos convencionales (ej. anticoagulantes)',
      ],
      correctIndex: 3,
    },
    {
      question:
        'Para integrar terapias complementarias en un servicio de salud se requiere:',
      options: [
        'Talento humano certificado, protocolos basados en evidencia y cumplimiento normativo',
        'Eliminar los servicios de medicina convencional',
        'Autorización exclusiva del paciente, sin más requisitos',
        'Que el servicio sea gratuito',
      ],
      correctIndex: 0,
    },
  ],
};

/** Devuelve el examen de un curso (o null si no existe). */
export function getExam(slug) {
  return EXAMS[slug] ?? null;
}

/** Califica un examen: answers = { indexPregunta: indexOpción }. */
export function gradeExam(slug, answers) {
  const exam = getExam(slug);
  if (!exam) return null;
  const detail = exam.map((q, i) => ({
    questionIndex: i,
    chosen: answers[i],
    correct: answers[i] === q.correctIndex,
  }));
  const correctCount = detail.filter((d) => d.correct).length;
  const score = Math.round((correctCount / exam.length) * 100);
  return { score, correctCount, total: exam.length, passed: score >= PASS_SCORE, detail };
}
