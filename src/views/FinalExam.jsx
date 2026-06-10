import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Lock,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { useCertification } from '../context/CertificationContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { getCourseBySlug } from '../data/courses.js';
import { getExam, PASS_SCORE } from '../data/exams.js';

/**
 * Examen final del programa.
 * Bloqueado hasta completar el 100% de las lecciones. Una pregunta a la
 * vez (stepper), envío al responder todas y pantalla de resultados con
 * emisión del certificado al aprobar (>= PASS_SCORE).
 */
export default function FinalExam() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = getCourseBySlug(slug);
  const exam = useMemo(() => getExam(slug), [slug]);
  const { courseStats } = useProgress();
  const { isExamUnlocked, submitExam, getAttempts, getCertificate } = useCertification();
  const { toast } = useToast();

  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [outcome, setOutcome] = useState(null); // { result, certificate }

  if (!course || !exam) {
    return (
      <Shell>
        <EmptyState
          title="Examen no disponible"
          body="El programa que buscas no existe o aún no tiene examen final."
        />
      </Shell>
    );
  }

  const stats = courseStats(course);
  const unlocked = isExamUnlocked(course);
  const certificate = getCertificate(slug);
  const attempts = getAttempts(slug);

  /* ── Bloqueado: faltan lecciones ─────────────────────────── */
  if (!unlocked) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl rounded-ur-lg border border-ur-gray-2 bg-white p-8 text-center shadow-ur-sm sm:p-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ur-gray-1">
            <Lock size={28} aria-hidden="true" className="text-ur-gray-3" />
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-ur-navy sm:text-2xl">
            El examen final aún está bloqueado
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ur-gray-4">
            Debes completar el <strong>100% de las lecciones</strong> de{' '}
            <strong>{course.title}</strong> para presentar el examen y obtener tu
            certificado.
          </p>
          <div className="mx-auto mt-6 max-w-xs">
            <div className="mb-1 flex justify-between text-xs text-ur-gray-4">
              <span>
                {stats.completed}/{stats.total} lecciones
              </span>
              <span className="font-bold text-ur-navy">{stats.percent}%</span>
            </div>
            <ProgressBar percent={stats.percent} />
          </div>
          <Link
            to={`/curso/${slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-ur-sm bg-ur-red px-6 py-3 text-sm font-bold text-white transition hover:bg-ur-red-dark"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Continuar las lecciones
          </Link>
        </div>
      </Shell>
    );
  }

  /* ── Resultados ──────────────────────────────────────────── */
  if (outcome) {
    const { result, certificate: issued } = outcome;
    const passed = result.passed;
    return (
      <Shell>
        <div className="mx-auto max-w-2xl">
          <div
            className={`overflow-hidden rounded-ur-lg border bg-white shadow-ur-md ${
              passed ? 'border-emerald-200' : 'border-ur-red/30'
            }`}
          >
            <div
              className={`px-8 pb-10 pt-12 text-center text-white ${
                passed
                  ? 'bg-gradient-to-br from-emerald-600 to-emerald-500'
                  : 'bg-gradient-to-br from-ur-navy to-ur-navy-light'
              }`}
            >
              {/* Anillo de puntaje */}
              <div className="relative mx-auto h-36 w-36">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(result.score / 100) * 326.7} 326.7`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div>
                    <p className="text-4xl font-extrabold tabular-nums">{result.score}%</p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                      {result.correctCount}/{result.total} correctas
                    </p>
                  </div>
                </div>
              </div>
              <h1 className="mt-6 text-2xl font-extrabold">
                {passed ? '¡Examen aprobado!' : 'Esta vez no fue suficiente'}
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/80">
                {passed
                  ? `Superaste el ${PASS_SCORE}% requerido y tu certificado ya fue emitido. ¡Felicitaciones por completar el programa!`
                  : `Necesitas al menos ${PASS_SCORE}% para aprobar. Repasa las lecciones y vuelve a intentarlo: no hay límite de intentos.`}
              </p>
            </div>

            {/* Detalle por pregunta */}
            <div className="px-6 py-6 sm:px-8">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ur-gray-4">
                Detalle de tus respuestas
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {result.detail.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-ur-sm border border-ur-gray-1 bg-ur-gray-1/50 px-4 py-2.5 text-sm"
                  >
                    {d.correct ? (
                      <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-emerald-500" />
                    ) : (
                      <XCircle size={18} aria-hidden="true" className="shrink-0 text-ur-red" />
                    )}
                    <span className="min-w-0 flex-1 truncate text-ur-gray-4">
                      {i + 1}. {exam[i].question}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {passed ? (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate(`/certificado/${slug}`)}
                      className="flex items-center justify-center gap-2 rounded-ur-sm bg-ur-red px-6 py-3 text-sm font-bold text-white transition hover:bg-ur-red-dark"
                    >
                      <Award size={18} aria-hidden="true" /> Ver mi certificado
                    </button>
                    <Link
                      to="/"
                      className="flex items-center justify-center gap-2 rounded-ur-sm border border-ur-gray-2 px-6 py-3 text-sm font-semibold text-ur-gray-4 transition hover:border-ur-navy hover:text-ur-navy"
                    >
                      Volver a mis programas
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({});
                        setCurrent(0);
                        setOutcome(null);
                      }}
                      className="flex items-center justify-center gap-2 rounded-ur-sm bg-ur-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-ur-navy-light"
                    >
                      <RotateCcw size={18} aria-hidden="true" /> Intentar de nuevo
                    </button>
                    <Link
                      to={`/curso/${slug}`}
                      className="flex items-center justify-center gap-2 rounded-ur-sm border border-ur-gray-2 px-6 py-3 text-sm font-semibold text-ur-gray-4 transition hover:border-ur-navy hover:text-ur-navy"
                    >
                      Repasar lecciones
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  /* ── Examen activo (stepper) ─────────────────────────────── */
  const question = exam[current];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === exam.length;
  const isLast = current === exam.length - 1;

  const handleSubmit = () => {
    const res = submitExam(course, answers);
    setOutcome(res);
    if (res.result.passed) {
      toast({
        title: '¡Certificado emitido! 🎓',
        message: `${course.title} — código ${res.certificate.code}`,
      });
    }
  };

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        {/* Encabezado */}
        <div className="rounded-ur-lg bg-gradient-to-br from-ur-navy to-ur-navy-light p-6 text-white shadow-ur-md sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
                <ClipboardCheck size={14} aria-hidden="true" /> Examen final
              </p>
              <h1 className="mt-1 text-lg font-extrabold leading-snug sm:text-xl">
                {course.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck size={14} aria-hidden="true" className="text-emerald-300" />
              Aprueba con {PASS_SCORE}% · {certificate ? 'Certificado ya emitido' : 'Sin límite de intentos'}
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-xs text-white/70">
              <span>
                Pregunta {current + 1} de {exam.length}
              </span>
              <span>{answeredCount} respondidas</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-2 rounded-full bg-ur-red transition-all duration-300"
                style={{ width: `${(answeredCount / exam.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pregunta */}
        <div className="mt-5 rounded-ur-lg border border-ur-gray-2 bg-white p-6 shadow-ur-sm sm:p-8">
          <fieldset>
            <legend className="text-base font-bold leading-relaxed text-ur-text sm:text-lg">
              {current + 1}. {question.question}
            </legend>
            <div className="mt-5 flex flex-col gap-3" role="radiogroup">
              {question.options.map((option, oi) => {
                const selected = answers[current] === oi;
                const letter = String.fromCharCode(65 + oi);
                return (
                  <button
                    key={oi}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAnswers((prev) => ({ ...prev, [current]: oi }))}
                    className={`flex items-center gap-4 rounded-ur-md border-2 px-4 py-3.5 text-left text-sm transition ${
                      selected
                        ? 'border-ur-navy bg-ur-navy/5 font-semibold text-ur-navy shadow-ur-sm'
                        : 'border-ur-gray-2 text-ur-gray-4 hover:border-ur-gray-3 hover:bg-ur-gray-1'
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        selected ? 'bg-ur-navy text-white' : 'bg-ur-gray-1 text-ur-gray-4'
                      }`}
                    >
                      {letter}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Navegación */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="flex items-center gap-2 rounded-ur-sm border border-ur-gray-2 px-5 py-2.5 text-sm font-semibold text-ur-gray-4 transition enabled:hover:border-ur-navy enabled:hover:text-ur-navy disabled:opacity-40"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Anterior
            </button>

            {/* Indicadores de pregunta */}
            <div className="flex gap-1.5" aria-hidden="true">
              {exam.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir a la pregunta ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === current
                      ? 'scale-125 bg-ur-red'
                      : answers[i] !== undefined
                        ? 'bg-ur-navy'
                        : 'bg-ur-gray-2'
                  }`}
                />
              ))}
            </div>

            {isLast ? (
              <button
                type="button"
                disabled={!allAnswered}
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-ur-sm bg-ur-red px-6 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-ur-red-dark disabled:opacity-40"
              >
                Enviar respuestas <CheckCircle2 size={16} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrent((c) => c + 1)}
                className="flex items-center gap-2 rounded-ur-sm bg-ur-navy px-6 py-2.5 text-sm font-bold text-white transition hover:bg-ur-navy-light"
              >
                Siguiente <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {attempts.length > 0 && (
          <p className="mt-4 text-center text-xs text-ur-gray-3">
            Intentos anteriores: {attempts.map((a) => `${a.score}%`).join(' · ')}
          </p>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-ur-cream">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

function EmptyState({ title, body }) {
  return (
    <div className="mx-auto max-w-xl rounded-ur-lg border border-ur-gray-2 bg-white p-10 text-center shadow-ur-sm">
      <h1 className="text-xl font-extrabold text-ur-navy">{title}</h1>
      <p className="mt-2 text-sm text-ur-gray-4">{body}</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-ur-sm bg-ur-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ur-red-dark"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Volver al panel
      </Link>
    </div>
  );
}
