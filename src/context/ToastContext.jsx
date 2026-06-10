import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, Download, Info, X } from 'lucide-react';

/** Notificaciones tipo toast, apiladas en la esquina inferior derecha. */
const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  download: Download,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message, variant = 'success', duration = 4000 }) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, title, message, variant }]);
      window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Región viva para lectores de pantalla */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
      >
        {toasts.map(({ id, title, message, variant }) => {
          const Icon = ICONS[variant] ?? Info;
          return (
            <div
              key={id}
              role="status"
              className="pointer-events-auto flex items-start gap-3 rounded-ur-md border border-ur-gray-2 bg-white p-4 shadow-ur-md animate-[toast-in_.25s_ease-out]"
            >
              <span
                className={`mt-0.5 shrink-0 rounded-full p-1.5 ${
                  variant === 'download'
                    ? 'bg-ur-navy/10 text-ur-navy'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ur-text">{title}</p>
                {message && (
                  <p className="mt-0.5 truncate text-xs text-ur-gray-4">{message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(id)}
                aria-label="Cerrar notificación"
                className="shrink-0 rounded p-1 text-ur-gray-3 transition hover:bg-ur-gray-1 hover:text-ur-gray-4"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
}
