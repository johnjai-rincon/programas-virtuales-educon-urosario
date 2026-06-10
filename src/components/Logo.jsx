/**
 * Logotipo institucional EDUCON — Universidad del Rosario.
 * Usa el asset oficial del sitio de Educación Continua con un
 * fallback de texto si la imagen no carga (entornos sin red).
 */
const LOGO_URL =
  'https://educacioncontinua.urosario.edu.co/sites/default/files/2026-04/logo-educon-urosario.webp';

export default function Logo({ variant = 'light', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={LOGO_URL}
        alt="Universidad del Rosario — Educación Continua"
        className="h-10 w-auto object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <span
        className={`hidden flex-col leading-tight ${
          variant === 'dark' ? 'text-white' : 'text-ur-navy'
        }`}
      >
        <span className="text-sm font-bold">Universidad del Rosario</span>
        <span className={`text-xs ${variant === 'dark' ? 'text-white/70' : 'text-ur-gray-4'}`}>
          Educación Continua
        </span>
      </span>
    </span>
  );
}
