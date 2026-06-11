import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  PlayCircle,
  SearchX,
  TrendingUp,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import CourseCard from '../components/CourseCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { useCertification } from '../context/CertificationContext.jsx';
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
  const { certificatesCount, getCertificate } = useCertification();
  const [filters, setFilters] = useState({ query: '', category: 'todas', type: 'todos' });

  const stats = globalStats();
  const firstName = user?.fullName?.split(' ')[0] ?? 'Estudiante';

  // Mi aprendizaje: programas iniciados y completados
  const perCourse = COURSES.map((course) => ({ course, stats: courseStats(course) }));
  const inProgressCourses = perCourse
    .filter(({ stats: s }) => s.percent > 0 && s.percent < 100)
    .sort((a, b) => b.stats.percent - a.stats.percent);
  const completedCourses = perCourse.filter(({ stats: s }) => s.percent === 100);

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
      icon: BookOpenCheck,
      label: 'Lecciones vistas',
      value: stats.lessonsCompleted,
    },
    {
      icon: Award,
      label: 'Completados',
      value: stats.completed,
    },
    {
      icon: GraduationCap,
      label: 'Certificados',
      value: certificatesCount(),
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

            <dl className="grid shrink-0 grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
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

        {/* ── Mi aprendizaje: continuar donde quedé ───────────── */}
        {inProgressCourses.length > 0 && (
          <section aria-label="Continuar aprendiendo" className="mt-8">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-ur-navy">
              <PlayCircle size={20} aria-hidden="true" /> Continuar aprendiendo
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {inProgressCourses.map(({ course, stats: s }) => (
                <Link
                  key={course.code}
                  to={`/curso/${course.slug}`}
                  className="group flex gap-4 rounded-ur-md border border-ur-gray-2 bg-white p-4 shadow-ur-sm transition hover:-translate-y-0.5 hover:border-ur-navy hover:shadow-ur-md"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-ur-sm bg-gradient-to-br from-ur-navy to-ur-navy-light">
                    <img
                      src={course.coverImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <p className="line-clamp-2 text-sm font-bold leading-snug text-ur-text transition group-hover:text-ur-navy">
                      {course.title}
                    </p>
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-ur-gray-4">
                          {s.completed}/{s.total} lecciones
                        </span>
                        <span className="font-bold tabular-nums text-ur-navy">{s.percent}%</span>
                      </div>
                      <ProgressBar percent={s.percent} size="sm" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Mi aprendizaje: completados y certificados ──────── */}
        {completedCourses.length > 0 && (
          <section aria-label="Programas completados" className="mt-8">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-ur-navy">
              <GraduationCap size={20} aria-hidden="true" /> Completados y certificados
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {completedCourses.map(({ course }) => {
                const cert = getCertificate(course.slug);
                return (
                  <div
                    key={course.code}
                    className={`flex items-center gap-4 rounded-ur-md border bg-white p-4 shadow-ur-sm ${
                      cert ? 'border-emerald-300' : 'border-ur-gray-2'
                    }`}
                  >
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
                        cert ? 'bg-emerald-100 text-emerald-600' : 'bg-ur-red-light text-ur-red'
                      }`}
                    >
                      {cert ? (
                        <Award size={22} aria-hidden="true" />
                      ) : (
                        <ClipboardCheck size={22} aria-hidden="true" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-bold leading-snug text-ur-text">
                        {course.title}
                      </p>
                      <p className="mt-0.5 text-xs text-ur-gray-4">
                        {cert
                          ? `Certificado ${cert.code} · nota ${cert.score}%`
                          : '100% de lecciones · examen final pendiente'}
                      </p>
                    </div>
                    <Link
                      to={cert ? `/certificado/${course.slug}` : `/curso/${course.slug}/examen`}
                      className={`shrink-0 rounded-ur-sm px-4 py-2 text-xs font-bold transition ${
                        cert
                          ? 'border border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white'
                          : 'bg-ur-red text-white hover:bg-ur-red-dark'
                      }`}
                    >
                      {cert ? 'Ver certificado' : 'Presentar examen'}
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Filtros */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-extrabold text-ur-navy">
            Explorar todos los programas
          </h2>
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
