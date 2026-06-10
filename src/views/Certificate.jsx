import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Award, BadgeCheck, Printer, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCertification } from '../context/CertificationContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { getCourseBySlug, countLessons } from '../data/courses.js';

const LOGO_URL =
  'https://educacioncontinua.urosario.edu.co/sites/default/files/2026-04/logo-educon-urosario.webp';

const TYPE_LABEL = { curso: 'el Curso Virtual', diplomado: 'el Diplomado Virtual' };

/**
 * Certificado de finalización con estética de diploma:
 * doble marco institucional, sello, código verificable y
 * descarga a PDF mediante impresión del navegador (@media print).
 */
export default function Certificate() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  const { user } = useAuth();
  const { getCertificate } = useCertification();
  const { toast } = useToast();

  const certificate = course ? getCertificate(slug) : null;

  if (!course || !certificate) {
    return (
      <div className="min-h-screen bg-ur-cream">
        <Navbar />
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="text-2xl font-extrabold text-ur-navy">Certificado no disponible</h1>
          <p className="mt-2 text-sm text-ur-gray-4">
            Para obtener el certificado debes completar el 100% de las lecciones y aprobar
            el examen final del programa.
          </p>
          <Link
            to={course ? `/curso/${slug}` : '/'}
            className="mt-6 inline-flex items-center gap-2 rounded-ur-sm bg-ur-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ur-red-dark"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {course ? 'Ir al programa' : 'Volver al panel'}
          </Link>
        </main>
      </div>
    );
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const studentName = certificate.studentName || user?.fullName || 'Estudiante';

  const copyVerification = async () => {
    try {
      await navigator.clipboard.writeText(
        `Certificado ${certificate.code} — ${studentName} completó "${course.title}" (${course.durationHours} h) en el Campus Virtual EDUCON, Universidad del Rosario.`
      );
      toast({ title: 'Copiado al portapapeles', message: certificate.code, variant: 'info' });
    } catch {
      toast({ title: 'Código del certificado', message: certificate.code, variant: 'info' });
    }
  };

  return (
    <div className="min-h-screen bg-ur-cream">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Barra de acciones (oculta al imprimir) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-ur-gray-4 transition hover:text-ur-navy"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Volver a mis programas
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyVerification}
              className="flex items-center gap-2 rounded-ur-sm border border-ur-gray-2 bg-white px-4 py-2.5 text-sm font-semibold text-ur-gray-4 transition hover:border-ur-navy hover:text-ur-navy"
            >
              <Share2 size={16} aria-hidden="true" /> Copiar verificación
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-ur-sm bg-ur-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ur-red-dark"
            >
              <Printer size={16} aria-hidden="true" /> Descargar PDF
            </button>
          </div>
        </div>

        {/* ── Diploma ─────────────────────────────────────────── */}
        <div
          id="certificate-sheet"
          className="relative overflow-hidden rounded-ur-md border-[6px] border-ur-navy bg-white shadow-ur-lg"
        >
          {/* Marco interior */}
          <div className="m-2 border-2 border-ur-red/70 px-6 py-10 sm:m-3 sm:px-12 sm:py-14">
            {/* Marca de agua */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid place-items-center opacity-[0.04]"
            >
              <Award size={420} />
            </div>

            <div className="relative text-center">
              <img
                src={LOGO_URL}
                alt="Universidad del Rosario — Educación Continua"
                className="mx-auto h-14 w-auto object-contain sm:h-16"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />

              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.35em] text-ur-red sm:text-xs">
                Certificado de finalización
              </p>

              <p className="mt-6 text-sm text-ur-gray-4">
                La Universidad del Rosario — Educación Continua y Consultoría certifica que
              </p>

              <p className="mx-auto mt-4 max-w-2xl border-b-2 border-ur-gray-2 pb-3 font-serif text-3xl font-bold italic text-ur-navy sm:text-4xl">
                {studentName}
              </p>

              <p className="mt-5 text-sm text-ur-gray-4">
                completó satisfactoriamente {TYPE_LABEL[course.type]}
              </p>

              <h1 className="mx-auto mt-3 max-w-3xl text-lg font-extrabold uppercase leading-snug tracking-wide text-ur-text sm:text-xl">
                {course.title.replace(/^(Curso Virtual|Diplomado Virtual)\s*/i, '')}
              </h1>

              <p className="mt-4 text-sm text-ur-gray-4">
                con una intensidad de <strong>{course.durationHours} horas</strong> ·{' '}
                {countLessons(course)} lecciones · calificación final del examen:{' '}
                <strong>{certificate.score}%</strong>
              </p>

              {/* Firmas y sello */}
              <div className="mt-12 flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-end">
                <div className="text-center">
                  <p className="border-t-2 border-ur-gray-3 px-8 pt-2 text-xs font-semibold text-ur-text">
                    Dirección de Educación Continua
                  </p>
                  <p className="text-[10px] text-ur-gray-3">Universidad del Rosario</p>
                </div>

                <div
                  aria-hidden="true"
                  className="grid h-24 w-24 place-items-center rounded-full border-4 border-ur-red/80 bg-ur-red-light"
                >
                  <div className="text-center">
                    <BadgeCheck size={28} className="mx-auto text-ur-red" />
                    <p className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-ur-red">
                      Programa
                      <br />
                      100% virtual
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="border-t-2 border-ur-gray-3 px-8 pt-2 text-xs font-semibold text-ur-text">
                    Bogotá D.C., {issuedDate}
                  </p>
                  <p className="text-[10px] text-ur-gray-3">Fecha de emisión</p>
                </div>
              </div>

              <p className="mt-10 text-[10px] tracking-wide text-ur-gray-3">
                Código de verificación: <strong className="text-ur-gray-4">{certificate.code}</strong>{' '}
                · educacioncontinua.urosario.edu.co
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ur-gray-3 print:hidden">
          Usa «Descargar PDF» y elige orientación <strong>horizontal</strong> para un
          resultado óptimo. Certificado de demostración — la emisión oficial se realiza
          desde Supabase con el código verificable.
        </p>
      </main>

      {/* Impresión: solo el diploma, en horizontal */}
      <style>{`
        @media print {
          @page { size: letter landscape; margin: 0; }
          body { background: #fff !important; }
          body * { visibility: hidden; }
          #certificate-sheet, #certificate-sheet * { visibility: visible; }
          #certificate-sheet {
            position: fixed; inset: 0; margin: 0;
            border-radius: 0; box-shadow: none;
            display: flex; flex-direction: column; justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
