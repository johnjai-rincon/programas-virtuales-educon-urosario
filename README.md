# Campus Virtual EDUCON — Universidad del Rosario

LMS para los **16 programas 100% virtuales** (5 cursos y 11 diplomados) de Educación
Continua y Consultoría de la Universidad del Rosario.

> Stack compatible con **Lovable.dev**: Vite + React + Tailwind CSS + Lucide Icons,
> con **Supabase (Lovable Cloud)** como backend.

## 🚀 Inicio rápido

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en /dist
```

La aplicación arranca en **modo demo**: la sesión y el progreso de lecciones se
persisten en `localStorage` por usuario, sin necesidad de backend. Ingresa con
cualquier correo y una contraseña de 6+ caracteres.

## 🧭 Funcionalidades

- **Login** — tarjeta centrada con validación, identidad de marca UR/EDUCON.
- **Dashboard del estudiante** — banner de bienvenida con estadísticas (en progreso,
  completados, lecciones vistas), buscador sin acentos, filtros por área y por tipo
  (curso/diplomado) y grilla responsiva de tarjetas con barra de avance dinámica.
- **Visor de curso (estilo Moodle/Udemy)** — sidebar fijo de 320 px (drawer en móvil)
  con acordeón de módulos y chulos verdes por lección completada; panel derecho con
  video responsivo, contenido HTML, navegación anterior/siguiente y caja de
  descargas de alto contraste.
- **Progreso en vivo** — "Completar lección" recalcula al instante el porcentaje
  global del curso; al llegar al 100% se notifica la finalización.
- **Examen final** — se desbloquea al completar el 100% de las lecciones. Banco de
  5 preguntas reales por programa (stepper de una pregunta a la vez, indicadores de
  avance, sin límite de intentos). Se aprueba con **80%** o más.
- **Certificado** — al aprobar el examen se emite automáticamente un certificado
  con código verificable (`UR-<código>-XXXXXX`), vista tipo diploma con marca
  institucional y descarga a PDF (impresión en horizontal). El ciclo completo se
  refleja en el dashboard: insignia "Certificado", nota de aprobación y contador.
- **Descargas simuladas** — los recursos generan un archivo de demostración vía
  Blob y muestran una notificación toast.
- **Centro de ayuda (`/ayuda`)** — ruta **pública** (un estudiante que no puede
  iniciar sesión también debe poder reportarlo): FAQ con buscador, canales de
  contacto y formulario para crear casos de soporte con número de seguimiento
  (`CASO-XXXXXX`), categoría y estado (abierto / en proceso / resuelto). Accesible
  desde el Navbar, el ícono de ayuda en móvil y un enlace en el Login.

## 🗂 Estructura

```
schema.sql                  # Esquema PostgreSQL para Supabase: tablas base + exámenes,
                            # intentos y certificados (RLS, triggers, RPC issue_certificate)
src/
  data/courses.js           # Catálogo real de los 16 programas (módulos y lecciones)
  data/exams.js             # Exámenes finales (5 preguntas por programa) y calificación
  data/faqs.js              # Preguntas frecuentes y categorías de soporte
  context/                  # Auth, Progress, Certification, Support y Toast
  components/               # Navbar, CourseCard, FilterBar, ModuleAccordion, VideoPlayer…
  views/                    # Login, Dashboard, CourseViewer, FinalExam, Certificate, HelpCenter
  lib/supabase.js           # Cliente Supabase (se activa con variables de entorno)
```

## 🔌 Conexión a Supabase (Lovable Cloud)

1. Ejecuta `schema.sql` en el SQL Editor del proyecto Supabase.
2. Define las variables de entorno:
   ```
   VITE_SUPABASE_URL=…
   VITE_SUPABASE_ANON_KEY=…
   ```
3. Migra `AuthContext` a `supabase.auth` y `ProgressContext` a la tabla
   `user_progress` (los contratos de datos ya son espejo del esquema).
4. Carga el catálogo de `src/data/courses.js` en las tablas `courses`,
   `modules` y `lessons` (mismos campos).

## 🎨 Marca

Tokens tomados del Kit de Marca EDUCON: azul institucional `#002c4d`, rojo
`#d33847`/`#da0921`, grises corporativos y tipografía **Inter**. Logo oficial del
sitio de Educación Continua.
