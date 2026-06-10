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
- **Descargas simuladas** — los recursos generan un archivo de demostración vía
  Blob y muestran una notificación toast.

## 🗂 Estructura

```
schema.sql                  # Esquema PostgreSQL para Supabase (tablas, RLS, triggers, vista)
src/
  data/courses.js           # Catálogo real de los 16 programas (módulos y lecciones)
  context/                  # Auth, Progress y Toast (estado global)
  components/               # Navbar, CourseCard, FilterBar, ModuleAccordion, VideoPlayer…
  views/                    # Login, Dashboard, CourseViewer
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
