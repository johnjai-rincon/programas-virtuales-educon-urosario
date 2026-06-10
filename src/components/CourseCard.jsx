import { Link } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, RotateCcw, Award } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';
import { countLessons } from '../data/courses.js';

const TYPE_LABEL = { curso: 'Curso virtual', diplomado: 'Diplomado virtual' };

/** Tarjeta de programa para la grilla del dashboard (estilo marketplace). */
export default function CourseCard({ course, stats }) {
  const { percent, completed, total } = stats;
  const started = percent > 0;
  const done = percent === 100;

  const cta = done ? 'Repasar programa' : started ? 'Continuar' : 'Comenzar';
  const CtaIcon = done ? RotateCcw : PlayCircle;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-ur-md border border-ur-gray-2 bg-white shadow-ur-sm transition duration-300 hover:-translate-y-1 hover:shadow-ur-md">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-ur-navy to-ur-navy-light">
        <img
          src={course.coverImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <span className="absolute left-3 top-3 rounded-full bg-ur-navy/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {TYPE_LABEL[course.type]}
        </span>
        {done && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white">
            <Award size={12} aria-hidden="true" /> Completado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-ur-red">
          {course.category}
        </p>
        <h3 className="line-clamp-2 min-h-[2.6rem] text-base font-bold leading-snug text-ur-text">
          <Link
            to={`/curso/${course.slug}`}
            className="rounded outline-none transition hover:text-ur-navy"
          >
            {course.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ur-gray-4">
          {course.description}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <div className="flex items-center gap-4 text-xs text-ur-gray-4">
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" /> {course.durationHours} h
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} aria-hidden="true" /> {countLessons(course)} lecciones
            </span>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-ur-gray-4">
                {started ? `${completed} de ${total} lecciones` : 'Sin iniciar'}
              </span>
              <span
                className={`font-bold tabular-nums ${done ? 'text-emerald-600' : 'text-ur-navy'}`}
              >
                {percent}%
              </span>
            </div>
            <ProgressBar percent={percent} size="sm" />
          </div>

          <Link
            to={`/curso/${course.slug}`}
            className={`flex items-center justify-center gap-2 rounded-ur-sm px-4 py-2.5 text-sm font-semibold transition ${
              done
                ? 'border border-ur-navy text-ur-navy hover:bg-ur-navy hover:text-white'
                : 'bg-ur-red text-white hover:bg-ur-red-dark'
            }`}
          >
            <CtaIcon size={18} aria-hidden="true" />
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
