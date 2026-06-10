import { Download, FileSpreadsheet, FileText, FolderDown } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

const TYPE_ICON = {
  pdf: FileText,
  xlsx: FileSpreadsheet,
};

/**
 * Caja de descargas de alto contraste (fondo azul institucional).
 * En modo demo genera un archivo de texto simulado vía Blob y
 * dispara una notificación toast.
 */
export default function ResourceList({ lesson, courseTitle }) {
  const { toast } = useToast();

  const downloadResource = (resource) => {
    // Demo: archivo simulado. En producción: URL firmada de Supabase Storage.
    const body = [
      'UNIVERSIDAD DEL ROSARIO — EDUCACIÓN CONTINUA',
      `Programa: ${courseTitle}`,
      `Lección: ${lesson.title}`,
      `Recurso: ${resource.name}`,
      '',
      'Este es un archivo de demostración generado por el Campus Virtual.',
    ].join('\n');

    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resource.name.replace(/\.(pdf|xlsx)$/i, '.txt');
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast({
      variant: 'download',
      title: 'Descarga iniciada',
      message: resource.name,
    });
  };

  if (!lesson.resources?.length) return null;

  return (
    <section
      aria-label="Recursos descargables"
      className="overflow-hidden rounded-ur-md bg-ur-navy text-white shadow-ur-md"
    >
      <header className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="grid h-10 w-10 place-items-center rounded-ur-sm bg-ur-red">
          <FolderDown size={20} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide">Material de la lección</h3>
          <p className="text-xs text-white/60">
            Descarga los recursos para trabajar sin conexión
          </p>
        </div>
      </header>

      <ul className="divide-y divide-white/10">
        {lesson.resources.map((resource) => {
          const Icon = TYPE_ICON[resource.type] ?? FileText;
          return (
            <li key={resource.name}>
              <button
                type="button"
                onClick={() => downloadResource(resource)}
                className="group flex w-full items-center gap-4 px-5 py-3.5 text-left transition hover:bg-white/5"
              >
                <Icon size={20} aria-hidden="true" className="shrink-0 text-white/70" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{resource.name}</span>
                  <span className="text-xs uppercase text-white/50">
                    {resource.type} · {resource.size}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 rounded-ur-sm bg-white/10 px-3 py-1.5 text-xs font-semibold transition group-hover:bg-ur-red">
                  <Download size={14} aria-hidden="true" />
                  Descargar
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
