import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Clock,
  ListChecks,
  Lock,
  X,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import ModuleAccordion from '../components/ModuleAccordion.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import ResourceList from '../components/ResourceList.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { useCertification } from '../context/CertificationContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { getCourseBySlug, getCourseLessons } from '../data/courses.js';

/**
 * Visor del curso inspirado en Moodle/Udemy:
 *  - Sidebar izquierdo fijo de 320px (drawer en móvil) con el índice
 *    de módulos en acordeón y chulos verdes de avance.
 *  - Panel derecho con video responsivo, contenido HTML de la lección,
 *    caja de descargas de alto contraste y navegación entre lecciones.
 */
export default function CourseViewer() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  const { isLessonCompleted, toggleLesson, courseStats } = useProgress();
  const { getCertificate } = useCertification();
  const { toast } = useToast();

  const lessons = useMemo(() => (course ? getCourseLessons(course) : []), [course]);

  // Lección activa: la primera no completada al entrar al curso.
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [openModules, setOpenModules] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!course) return;
    const firstPending = lessons.find((l) => !isLessonCompleted(l.id)) ?? lessons[0];
    setActiveLessonId(firstPending?.id ?? null);
    const containing = course.modules.find((m) =>
      m.lessons.some((l) => l.id === firstPending?.id)
    );
    setOpenModules(containing ? [containing.id] : [course.modules[0]?.id].filter(Boolean));
    // Solo al montar / cambiar de curso: no debe seguir el avance en vivo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.slug]);

  if (!course) {
    return (
      <div className="min-h-screen bg-ur-cream">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="text-2xl font-extrabold text-ur-navy">Programa no encontrado</h1>
          <p className="mt-2 text-ur-gray-4">
            El programa que buscas no existe o fue retirado del catálogo.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-ur-sm bg-ur-red px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ur-red-dark"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Volver al panel
          </Link>
        </main>
      </div>
    );
  }

  const stats = courseStats(course);
  const activeIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const activeLesson = lessons[activeIndex] ?? lessons[0];
  const prevLesson = lessons[activeIndex - 1];
  const nextLesson = lessons[activeIndex + 1];
  const isCompleted = isLessonCompleted(activeLesson.id);

  const moduleOfActive = course.modules.find((m) =>
    m.lessons.some((l) => l.id === activeLesson.id)
  );

  const selectLesson = (lessonId) => {
    setActiveLessonId(lessonId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModule = (moduleId) => {
    setOpenModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  /** Marca una lección como completada (sin alternar) y notifica el avance. */
  const completeLesson = (lessonId, lessonTitle) => {
    if (isLessonCompleted(lessonId)) return;
    toggleLesson(lessonId);
    const justFinishedCourse = stats.completed + 1 === stats.total;
    toast({
      title: justFinishedCourse ? '¡Felicitaciones! 🎓' : 'Lección completada',
      message: justFinishedCourse
        ? `Completaste el 100% de "${course.title}". Ya puedes presentar el examen final.`
        : lessonTitle,
    });
  };

  const handleToggleComplete = () => {
    if (isCompleted) {
      toggleLesson(activeLesson.id);
    } else {
      completeLesson(activeLesson.id, activeLesson.title);
    }
  };

  /** "Siguiente" completa la lección actual y avanza (estilo Udemy). */
  const goToNext = () => {
    if (!nextLesson) return;
    completeLesson(activeLesson.id, activeLesson.title);
    selectLesson(nextLesson.id);
  };

  const certificate = getCertificate(course.slug);

  const sidebarContent = (
    <>
      <div className="border-b border-ur-gray-2 bg-white p-4">
        <Link
          to="/"
          className="mb-3 inline-flex items-center gap-1.5 rounded text-xs font-semibold text-ur-gray-4 transition hover:text-ur-navy"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Volver a mis programas
        </Link>
        <h2 className="line-clamp-3 text-sm font-bold leading-snug text-ur-text">
          {course.title}
        </h2>
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-xs text-ur-gray-4">
            <span>
              {stats.completed}/{stats.total} lecciones
            </span>
            <span className="font-bold text-ur-navy">{stats.percent}%</span>
          </div>
          <ProgressBar percent={stats.percent} size="sm" />
        </div>
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto p-3">
        <ModuleAccordion
          modules={course.modules}
          activeLessonId={activeLesson.id}
          openModules={openModules}
          onToggleModule={toggleModule}
          onSelectLesson={selectLesson}
        />

        {/* Examen final: siempre visible en el índice, con su estado */}
        <div className="mt-2">
          {certificate ? (
            <Link
              to={`/certificado/${course.slug}`}
              className="flex items-center gap-3 rounded-ur-sm border border-emerald-300 bg-emerald-50 px-4 py-3 transition hover:bg-emerald-100"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Award size={15} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-emerald-800">
                  Examen aprobado ({certificate.score}%)
                </span>
                <span className="text-xs text-emerald-700">Ver mi certificado</span>
              </span>
            </Link>
          ) : stats.percent === 100 ? (
            <Link
              to={`/curso/${course.slug}/examen`}
              className="flex items-center gap-3 rounded-ur-sm border-2 border-ur-red bg-ur-red-light/60 px-4 py-3 transition hover:bg-ur-red-light"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ur-red text-white">
                <ClipboardCheck size={15} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ur-red-dark">
                  Examen final disponible
                </span>
                <span className="text-xs text-ur-gray-4">Preséntalo y obtén tu certificado</span>
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-3 rounded-ur-sm border border-dashed border-ur-gray-2 bg-white px-4 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ur-gray-1 text-ur-gray-3">
                <Lock size={14} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ur-gray-4">Examen final</span>
                <span className="text-xs text-ur-gray-3">
                  Se desbloquea al completar el 100% ({stats.completed}/{stats.total})
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-ur-cream">
      <Navbar />

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar fijo en escritorio (320px) */}
        <aside
          aria-label="Índice del curso"
          className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[320px] shrink-0 flex-col border-r border-ur-gray-2 bg-ur-gray-1 lg:flex"
        >
          {sidebarContent}
        </aside>

        {/* Drawer móvil */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Índice del curso">
            <button
              type="button"
              aria-label="Cerrar índice"
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-ur-navy-dark/60"
            />
            <div className="absolute inset-y-0 left-0 flex w-[320px] max-w-[85vw] flex-col bg-ur-gray-1 shadow-ur-lg">
              <div className="flex justify-end bg-white px-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Cerrar índice del curso"
                  className="rounded p-2 text-ur-gray-4 hover:bg-ur-gray-1"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Panel principal */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Botón índice en móvil */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mb-4 flex w-full items-center justify-between gap-2 rounded-ur-sm border border-ur-gray-2 bg-white px-4 py-3 text-sm font-semibold text-ur-navy shadow-ur-sm lg:hidden"
          >
            <span className="flex items-center gap-2">
              <ListChecks size={18} aria-hidden="true" />
              Contenido del programa
            </span>
            <span className="text-xs font-bold tabular-nums text-ur-gray-4">
              {stats.percent}%
            </span>
          </button>

          {/* Banner de certificación al completar el 100% */}
          {stats.percent === 100 && (
            <div className="mb-6 overflow-hidden rounded-ur-md bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 text-white shadow-ur-md sm:p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15">
                    <Award size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-base font-extrabold">
                      {getCertificate(course.slug)
                        ? '¡Programa certificado!'
                        : '¡Completaste todas las lecciones!'}
                    </p>
                    <p className="text-sm text-white/85">
                      {getCertificate(course.slug)
                        ? `Certificado ${getCertificate(course.slug).code} emitido.`
                        : 'Presenta el examen final para obtener tu certificado.'}
                    </p>
                  </div>
                </div>
                {getCertificate(course.slug) ? (
                  <Link
                    to={`/certificado/${course.slug}`}
                    className="flex shrink-0 items-center gap-2 rounded-ur-sm bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <Award size={16} aria-hidden="true" /> Ver certificado
                  </Link>
                ) : (
                  <Link
                    to={`/curso/${course.slug}/examen`}
                    className="flex shrink-0 items-center gap-2 rounded-ur-sm bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <ClipboardCheck size={16} aria-hidden="true" /> Presentar examen final
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Encabezado de la lección */}
          <header className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-ur-red">
              {moduleOfActive?.title}
            </p>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl font-extrabold leading-tight text-ur-text sm:text-2xl">
                {activeLesson.title}
              </h1>
              <span className="flex items-center gap-1.5 text-sm text-ur-gray-4">
                <Clock size={16} aria-hidden="true" />
                {activeLesson.durationMinutes} min
              </span>
            </div>
          </header>

          <VideoPlayer
            src={activeLesson.videoUrl}
            title={activeLesson.title}
            onEnded={() => completeLesson(activeLesson.id, activeLesson.title)}
          />

          {/* Acciones de la lección */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleToggleComplete}
              aria-pressed={isCompleted}
              className={`flex items-center justify-center gap-2 rounded-ur-sm px-5 py-3 text-sm font-bold transition ${
                isCompleted
                  ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-ur-red text-white shadow-ur-sm hover:bg-ur-red-dark'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 size={18} aria-hidden="true" /> Lección completada
                </>
              ) : (
                <>
                  <Circle size={18} aria-hidden="true" /> Completar lección
                </>
              )}
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={!prevLesson}
                onClick={() => prevLesson && selectLesson(prevLesson.id)}
                className="flex items-center gap-1.5 rounded-ur-sm border border-ur-gray-2 bg-white px-4 py-2.5 text-sm font-semibold text-ur-gray-4 transition enabled:hover:border-ur-navy enabled:hover:text-ur-navy disabled:opacity-40"
              >
                <ChevronLeft size={16} aria-hidden="true" /> Anterior
              </button>
              <button
                type="button"
                disabled={!nextLesson}
                onClick={goToNext}
                title="Completa esta lección y avanza a la siguiente"
                className="flex items-center gap-1.5 rounded-ur-sm bg-ur-navy px-4 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-ur-navy-light disabled:opacity-40"
              >
                Completar y seguir <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Contenido HTML de la lección */}
          <article
            className="prose-ur mt-8 max-w-none rounded-ur-md border border-ur-gray-2 bg-white p-6 sm:p-8"
            // El contenido proviene del catálogo propio (no de usuarios):
            dangerouslySetInnerHTML={{ __html: activeLesson.contentHtml }}
          />

          {/* Recursos descargables */}
          <div className="mt-6">
            <ResourceList lesson={activeLesson} courseTitle={course.title} />
          </div>

          <style>{`
            .prose-ur h2 { font-size: 1.25rem; font-weight: 800; color: #002c4d; margin-bottom: .75rem; }
            .prose-ur h3 { font-size: 1rem; font-weight: 700; color: #0d1b26; margin: 1.25rem 0 .5rem; }
            .prose-ur p  { font-size: .925rem; line-height: 1.7; color: #4a5f6e; margin-bottom: .75rem; }
            .prose-ur ul { list-style: disc; padding-left: 1.25rem; display: flex; flex-direction: column; gap: .35rem; }
            .prose-ur li { font-size: .925rem; line-height: 1.6; color: #4a5f6e; }
            .prose-ur strong { color: #0d1b26; }
          `}</style>
        </main>
      </div>
    </div>
  );
}
