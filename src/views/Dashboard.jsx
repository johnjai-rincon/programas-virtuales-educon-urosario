import { useMemo, useState } from 'react';
import { Award, BookOpenCheck, SearchX, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import CourseCard from '../components/CourseCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { COURSES } from '../data/courses.js';

/** Normaliza texto para búsqueda sin acentos (elimina diacríticos). */
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

/**
 * Panel del estudiante: banner de bienvenida con estadísticas,
 * barra de filtros y grilla responsiva de programas con su avance.
 */
export default function Dashboard() {
  const { user } = useAuth();
  const { courseStats, globalStats } = useProgress();
  const [filters, setFilters] = useState({ query: '', category: 'todas', type: 'todos' });

  const stats = globalStats();
  const firstName = user?.fullName?.split(' ')[0] ?? 'Estudiante';

  const visibleCourses = useMemo(() => {
    const q = normalize(filters.query.trim());
    return COURSES.filter((course) => {
      if (filters.type !== 'todos' && course.type !== filters.type) return false;
      if (filters.category !== 'todas' && course.category !== filters.category) return false;
      if (q && !normalize(`${course.title} ${course.description} ${course.category}`).includes(q))
        return false;
      return true;
    });
  }, [filters]);

  const summary = [
    {
      icon: TrendingUp,
      label: 'En progreso',
      value: stats.inProgress,
    },
    {
      icon: Award,
      label: 'Completados',
      value: stats.completed,
    },
    {
      icon: BookOpenCheck,
      label: 'Lecciones vistas',
      value: stats.lessonsCompleted,
    },
  ];

  return (
    <div className="min-h-screen bg-ur-cream">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* Banner de bienvenida */}
        <section
          aria-label="Resumen de tu actividad"
          className="relative mt-6 overflow-hidden rounded-ur-lg bg-gradient-to-br from-ur-navy via-ur-navy to-ur-navy-light p-6 text-white shadow-ur-md sm:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-ur-red/25 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                Campus Virtual EDUCON
              </p>
              <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                ¡Hola, {firstName}! Continúa tu formación
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
                Explora los {COURSES.length} programas 100% virtuales de Educación Continua
                de la Universidad del Rosario y retoma tus lecciones donde las dejaste.
              </p>
            </div>

            <dl className="grid shrink-0 grid-cols-3 gap-3 sm:gap-4">
              {summary.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-ur-md bg-white/10 px-4 py-3 text-center backdrop-blur-sm"
                >
                  <Icon size={20} aria-hidden="true" className="mx-auto text-white/70" />
                  <dd className="mt-1 text-2xl font-extrabold tabular-nums">{value}</dd>
                  <dt className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Filtros */}
        <div className="mt-8">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        {/* Grilla de programas */}
        <section aria-label="Catálogo de programas" className="mt-6">
          <p className="mb-4 text-sm text-ur-gray-4" aria-live="polite">
            Mostrando{' '}
            <strong className="text-ur-text">
              {visibleCourses.length} de {COURSES.length}
            </strong>{' '}
            programas
          </p>

          {visibleCourses.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-ur-md border border-dashed border-ur-gray-2 bg-white px-6 py-16 text-center">
              <SearchX size={40} aria-hidden="true" className="text-ur-gray-3" />
              <p className="font-semibold text-ur-text">No encontramos programas</p>
              <p className="max-w-sm text-sm text-ur-gray-4">
                Ajusta la búsqueda o limpia los filtros para ver todo el catálogo.
              </p>
              <button
                type="button"
                onClick={() => setFilters({ query: '', category: 'todas', type: 'todos' })}
                className="mt-2 rounded-ur-sm border border-ur-navy px-4 py-2 text-sm font-semibold text-ur-navy transition hover:bg-ur-navy hover:text-white"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleCourses.map((course) => (
                <CourseCard key={course.code} course={course} stats={courseStats(course)} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
