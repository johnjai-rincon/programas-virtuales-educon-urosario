import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquarePlus,
  Search,
  Send,
  Ticket,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Logo from '../components/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useSupport } from '../context/SupportContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { FAQS, TICKET_CATEGORIES } from '../data/faqs.js';

const STATUS_STYLE = {
  abierto: 'bg-amber-100 text-amber-700',
  en_proceso: 'bg-blue-100 text-blue-700',
  resuelto: 'bg-emerald-100 text-emerald-700',
  cerrado: 'bg-ur-gray-1 text-ur-gray-4',
};

const STATUS_LABEL = {
  abierto: 'Abierto',
  en_proceso: 'En proceso',
  resuelto: 'Resuelto',
  cerrado: 'Cerrado',
};

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

/**
 * Centro de ayuda — ruta PÚBLICA (/ayuda): un estudiante que no puede
 * iniciar sesión debe poder crear su caso de soporte sin autenticarse.
 * Incluye FAQ con buscador, canales de contacto, formulario de casos
 * y seguimiento de "Mis casos" con estado.
 */
export default function HelpCenter() {
  const { user } = useAuth();
  const { myTickets, createTicket } = useSupport();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({
    fullName: user?.fullName ?? '',
    email: user?.email ?? '',
    category: 'acceso',
    subject: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [lastTicket, setLastTicket] = useState(null);

  const tickets = myTickets(form.email || undefined);

  const visibleFaqs = useMemo(() => {
    const q = normalize(search.trim());
    if (!q) return FAQS;
    return FAQS.filter((f) => normalize(`${f.question} ${f.answer}`).includes(q));
  }, [search]);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.fullName.trim().length < 3) next.fullName = 'Ingresa tu nombre completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Ingresa un correo válido.';
    if (form.subject.trim().length < 5) next.subject = 'Describe brevemente el asunto (mínimo 5 caracteres).';
    if (form.description.trim().length < 20)
      next.description = 'Cuéntanos el detalle del problema (mínimo 20 caracteres).';
    setErrors(next);
    if (Object.keys(next).length) return;

    const ticket = createTicket(form);
    setLastTicket(ticket);
    setForm((prev) => ({ ...prev, subject: '', description: '' }));
    toast({
      title: `Caso ${ticket.ticketNo} creado`,
      message: 'Te responderemos al correo registrado en 1 día hábil.',
    });
  };

  const inputClass = (hasError) =>
    `w-full rounded-ur-sm border bg-white px-3.5 py-2.5 text-sm text-ur-text placeholder:text-ur-gray-3 transition focus:border-ur-navy ${
      hasError ? 'border-ur-red' : 'border-ur-gray-2'
    }`;

  return (
    <div className="min-h-screen bg-ur-cream">
      {/* Barra superior: completa con sesión, mínima sin ella */}
      {user ? (
        <Navbar />
      ) : (
        <header className="sticky top-0 z-40 border-b border-ur-gray-2 bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <Logo />
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-ur-sm border border-ur-gray-2 px-4 py-2 text-sm font-semibold text-ur-gray-4 transition hover:border-ur-navy hover:text-ur-navy"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Ir a iniciar sesión
            </Link>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* Hero */}
        <section className="relative mt-6 overflow-hidden rounded-ur-lg bg-gradient-to-br from-ur-navy via-ur-navy to-ur-navy-light p-6 text-white shadow-ur-md sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ur-red/20 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
              <LifeBuoy size={16} aria-hidden="true" /> Centro de ayuda
            </p>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              ¿En qué podemos ayudarte?
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
              Resuelve tus dudas en las preguntas frecuentes o crea un caso de soporte y
              nuestro equipo te contactará. Si no puedes iniciar sesión, también puedes
              crear tu caso desde aquí.
            </p>
            <label className="relative mt-5 block max-w-md">
              <span className="sr-only">Buscar en preguntas frecuentes</span>
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ur-gray-3"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busca: contraseña, video, certificado…"
                className="w-full rounded-ur-sm border-0 bg-white py-3 pl-10 pr-4 text-sm text-ur-text placeholder:text-ur-gray-3"
              />
            </label>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* ── Columna izquierda: FAQ ─────────────────────────── */}
          <section aria-label="Preguntas frecuentes" className="lg:col-span-3">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-ur-navy">
              <HelpCircle size={20} aria-hidden="true" /> Preguntas frecuentes
            </h2>

            {visibleFaqs.length === 0 ? (
              <p className="mt-4 rounded-ur-md border border-dashed border-ur-gray-2 bg-white p-6 text-center text-sm text-ur-gray-4">
                No encontramos resultados para «{search}». Crea un caso de soporte y te
                ayudaremos directamente.
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                {visibleFaqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-ur-md border border-ur-gray-2 bg-white"
                    >
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-ur-gray-1"
                        >
                          <span className="min-w-0 flex-1 text-sm font-semibold text-ur-text">
                            {faq.question}
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
                      <div
                        className={`grid transition-all duration-200 ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="border-t border-ur-gray-1 px-5 py-4 text-sm leading-relaxed text-ur-gray-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Canales de contacto */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href="mailto:marketing.educon@urosario.edu.co"
                className="flex items-start gap-4 rounded-ur-md border border-ur-gray-2 bg-white p-5 transition hover:border-ur-navy hover:shadow-ur-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-ur-sm bg-ur-navy/10 text-ur-navy">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ur-text">Escríbenos</span>
                  <span className="mt-0.5 block break-all text-xs text-ur-gray-4">
                    marketing.educon@urosario.edu.co
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-4 rounded-ur-md border border-ur-gray-2 bg-white p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-ur-sm bg-ur-red-light text-ur-red">
                  <Clock size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ur-text">Horario de atención</span>
                  <span className="mt-0.5 block text-xs text-ur-gray-4">
                    Lunes a viernes, 8:00 a. m. – 5:00 p. m. Respuesta máxima: 1 día hábil.
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* ── Columna derecha: crear caso + mis casos ────────── */}
          <section aria-label="Crear caso de soporte" className="lg:col-span-2">
            <div className="rounded-ur-lg border border-ur-gray-2 bg-white p-6 shadow-ur-sm">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-ur-navy">
                <MessageSquarePlus size={20} aria-hidden="true" /> Crear un caso de soporte
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-ur-gray-4">
                Cuéntanos qué pasó y te responderemos al correo que registres.
              </p>

              {lastTicket && (
                <div className="mt-4 flex items-start gap-3 rounded-ur-md border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-600" />
                  <p className="text-xs leading-relaxed text-emerald-800">
                    Tu caso <strong>{lastTicket.ticketNo}</strong> fue creado. Guarda este
                    número para hacer seguimiento.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
                <div>
                  <label htmlFor="hc-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ur-gray-4">
                    Nombre completo
                  </label>
                  <input
                    id="hc-name"
                    type="text"
                    value={form.fullName}
                    onChange={set('fullName')}
                    placeholder="Ej. Ana María Rodríguez"
                    aria-invalid={Boolean(errors.fullName)}
                    className={inputClass(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p role="alert" className="mt-1 text-xs font-medium text-ur-red-dark">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="hc-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ur-gray-4">
                    Correo electrónico
                  </label>
                  <input
                    id="hc-email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="nombre@correo.com"
                    aria-invalid={Boolean(errors.email)}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-xs font-medium text-ur-red-dark">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="hc-category" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ur-gray-4">
                    Categoría
                  </label>
                  <select
                    id="hc-category"
                    value={form.category}
                    onChange={set('category')}
                    className={inputClass(false)}
                  >
                    {TICKET_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="hc-subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ur-gray-4">
                    Asunto
                  </label>
                  <input
                    id="hc-subject"
                    type="text"
                    value={form.subject}
                    onChange={set('subject')}
                    placeholder="Ej. No puedo ingresar al campus"
                    aria-invalid={Boolean(errors.subject)}
                    className={inputClass(errors.subject)}
                  />
                  {errors.subject && (
                    <p role="alert" className="mt-1 text-xs font-medium text-ur-red-dark">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="hc-description" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ur-gray-4">
                    Describe el problema
                  </label>
                  <textarea
                    id="hc-description"
                    rows={4}
                    value={form.description}
                    onChange={set('description')}
                    placeholder="Incluye el programa, la lección y los pasos que seguiste antes del error…"
                    aria-invalid={Boolean(errors.description)}
                    className={`${inputClass(errors.description)} resize-y`}
                  />
                  {errors.description && (
                    <p role="alert" className="mt-1 text-xs font-medium text-ur-red-dark">{errors.description}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-ur-sm bg-ur-red px-5 py-3 text-sm font-bold text-white transition hover:bg-ur-red-dark"
                >
                  <Send size={16} aria-hidden="true" /> Enviar caso
                </button>
              </form>
            </div>

            {/* Mis casos */}
            {tickets.length > 0 && (
              <div className="mt-6 rounded-ur-lg border border-ur-gray-2 bg-white p-6 shadow-ur-sm">
                <h2 className="flex items-center gap-2 text-base font-extrabold text-ur-navy">
                  <Ticket size={18} aria-hidden="true" /> Mis casos
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {tickets.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-ur-md border border-ur-gray-1 bg-ur-gray-1/40 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold tracking-wide text-ur-navy">
                          {t.ticketNo}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_STYLE[t.status]}`}
                        >
                          {STATUS_LABEL[t.status]}
                        </span>
                      </div>
                      <p className="mt-1.5 truncate text-sm font-semibold text-ur-text">
                        {t.subject}
                      </p>
                      <p className="mt-0.5 text-xs text-ur-gray-3">
                        {TICKET_CATEGORIES.find((c) => c.value === t.category)?.label} ·{' '}
                        {new Date(t.createdAt).toLocaleDateString('es-CO', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
