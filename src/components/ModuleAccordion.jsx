import { CheckCircle2, ChevronDown, Circle, PlayCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

/**
 * Índice del curso estilo Moodle: acordeón de módulos con sus lecciones,
 * chulos verdes en lo completado y resaltado de la lección activa.
 */
export default function ModuleAccordion({
  modules,
  activeLessonId,
  openModules,
  onToggleModule,
  onSelectLesson,
}) {
  const { isLessonCompleted } = useProgress();

  return (
    <nav aria-label="Contenido del programa" className="flex flex-col gap-2">
      {modules.map((mod, index) => {
        const isOpen = openModules.includes(mod.id);
        const completedCount = mod.lessons.filter((l) => isLessonCompleted(l.id)).length;
        const allDone = completedCount === mod.lessons.length;

        return (
          <section key={mod.id} className="overflow-hidden rounded-ur-sm border border-ur-gray-2 bg-white">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => onToggleModule(mod.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-ur-gray-1"
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    allDone ? 'bg-emerald-100 text-emerald-700' : 'bg-ur-navy/10 text-ur-navy'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ur-text">
                    {mod.title}
                  </span>
                  <span className="text-xs text-ur-gray-3">
                    {completedCount}/{mod.lessons.length} lecciones
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-ur-gray-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>

            <div className={`grid transition-all duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <ul className="min-h-0 overflow-hidden">
                {mod.lessons.map((lesson) => {
                  const done = isLessonCompleted(lesson.id);
                  const active = lesson.id === activeLessonId;
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        aria-current={active ? 'true' : undefined}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={`flex w-full items-center gap-3 border-t border-ur-gray-1 px-4 py-3 text-left text-sm transition ${
                          active
                            ? 'border-l-4 border-l-ur-red bg-ur-red-light/60 font-semibold text-ur-navy'
                            : 'text-ur-gray-4 hover:bg-ur-gray-1'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2
                            size={18}
                            aria-hidden="true"
                            className="shrink-0 text-emerald-500"
                          />
                        ) : active ? (
                          <PlayCircle size={18} aria-hidden="true" className="shrink-0 text-ur-red" />
                        ) : (
                          <Circle size={18} aria-hidden="true" className="shrink-0 text-ur-gray-2" />
                        )}
                        <span className="min-w-0 flex-1 truncate">{lesson.title}</span>
                        <span className="shrink-0 text-xs tabular-nums text-ur-gray-3">
                          {lesson.durationMinutes} min
                        </span>
                        {done && <span className="sr-only">(completada)</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}
    </nav>
  );
}
