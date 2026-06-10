/* =============================================================
   PREGUNTAS FRECUENTES — CENTRO DE AYUDA
   Enfocadas en los problemas más comunes de los estudiantes
   de programas 100% virtuales.
   ============================================================= */

export const TICKET_CATEGORIES = [
  { value: 'acceso', label: 'Problemas de acceso / inicio de sesión' },
  { value: 'contenido', label: 'Lecciones, videos o recursos' },
  { value: 'examenes', label: 'Examen final' },
  { value: 'certificados', label: 'Certificados' },
  { value: 'otro', label: 'Otro' },
];

export const FAQS = [
  {
    category: 'acceso',
    question: 'No puedo iniciar sesión en el campus, ¿qué hago?',
    answer:
      'Verifica que estés usando el correo con el que te inscribiste y que no tenga espacios al inicio o al final. Si el problema persiste, borra la caché del navegador o intenta en una ventana de incógnito. Si aun así no puedes ingresar, crea un caso de soporte en esta página seleccionando la categoría "Problemas de acceso" y te contactaremos.',
  },
  {
    category: 'acceso',
    question: 'Olvidé mi contraseña, ¿cómo la recupero?',
    answer:
      'En la pantalla de inicio de sesión podrás restablecerla con la opción de recuperación enviada a tu correo registrado. Si no recibes el mensaje, revisa la carpeta de spam o crea un caso de soporte y nuestro equipo restablecerá tu acceso manualmente.',
  },
  {
    category: 'acceso',
    question: '¿Qué navegadores y dispositivos son compatibles?',
    answer:
      'El campus funciona en las versiones recientes de Chrome, Edge, Firefox y Safari, tanto en computador como en celular o tablet. Recomendamos Chrome actualizado y una conexión estable de mínimo 5 Mbps para reproducir los videos sin interrupciones.',
  },
  {
    category: 'contenido',
    question: 'El video de una lección no carga o se ve entrecortado',
    answer:
      'Primero verifica tu conexión a internet y recarga la página (Ctrl + F5). Si el problema continúa, reduce la calidad del video desde el reproductor o intenta en otro navegador. Si una lección específica falla siempre, repórtala con un caso de soporte indicando el nombre del programa y la lección.',
  },
  {
    category: 'contenido',
    question: 'Mi progreso no se guardó, ¿lo puedo recuperar?',
    answer:
      'El avance se registra cada vez que marcas "Completar lección". Asegúrate de no navegar en modo incógnito, ya que en ese modo el progreso no se conserva al cerrar el navegador. Si perdiste avance que ya habías registrado, crea un caso con las lecciones afectadas y lo restauraremos.',
  },
  {
    category: 'examenes',
    question: '¿Por qué aparece bloqueado el examen final?',
    answer:
      'El examen final se habilita únicamente cuando has completado el 100% de las lecciones del programa. Revisa el índice del curso: las lecciones completadas se marcan con un chulo verde. Cuando todas estén marcadas, el botón "Presentar examen final" aparecerá automáticamente.',
  },
  {
    category: 'examenes',
    question: '¿Cuántos intentos tengo para aprobar el examen?',
    answer:
      'Los intentos son ilimitados y necesitas una calificación igual o superior al 80% para aprobar. Te recomendamos repasar las lecciones del programa antes de cada nuevo intento.',
  },
  {
    category: 'certificados',
    question: '¿Cómo obtengo y descargo mi certificado?',
    answer:
      'Al completar todas las lecciones y aprobar el examen final, el certificado se emite automáticamente con un código de verificación único. Puedes verlo y descargarlo en PDF desde la tarjeta del programa en tu panel (botón "Ver certificado") usando la opción "Descargar PDF" en orientación horizontal.',
  },
  {
    category: 'certificados',
    question: 'Mis datos aparecen incorrectos en el certificado',
    answer:
      'El certificado toma el nombre registrado en tu perfil. Si contiene un error, crea un caso de soporte en la categoría "Certificados" indicando el nombre correcto como debe aparecer y el código del certificado; lo corregiremos y volveremos a emitirlo.',
  },
];
