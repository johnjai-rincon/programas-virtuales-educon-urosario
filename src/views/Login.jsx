import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, LogIn, Mail, User } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

/**
 * Vista de autenticación: tarjeta centrada sobre fondo institucional.
 * Modo demo — cualquier correo y contraseña (6+ caracteres) inician sesión.
 * Al migrar a Supabase: reemplazar handleSubmit por supabase.auth.signInWithPassword.
 */
export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Ingresa un correo electrónico válido.';
    }
    if (password.length < 6) {
      next.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    const profile = login({ email, fullName });
    toast({
      title: `¡Hola, ${profile.fullName.split(' ')[0]}!`,
      message: 'Bienvenido(a) al Campus Virtual EDUCON.',
    });
    navigate(location.state?.from ?? '/', { replace: true });
  };

  const inputClass = (hasError) =>
    `w-full rounded-ur-sm border bg-white py-2.5 pl-10 pr-10 text-sm text-ur-text placeholder:text-ur-gray-3 transition focus:border-ur-navy ${
      hasError ? 'border-ur-red' : 'border-ur-gray-2'
    }`;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ur-navy px-4 py-10">
      {/* Decoración geométrica institucional */}
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-ur-navy-light/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-ur-red/20 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-ur-lg bg-white p-8 shadow-ur-lg sm:p-10">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <Logo />
            <div>
              <h1 className="text-2xl font-extrabold text-ur-navy">Campus Virtual</h1>
              <p className="mt-1 text-sm text-ur-gray-4">
                Diplomados y cursos 100% virtuales de Educación Continua
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div>
              <label htmlFor="login-name" className="mb-1.5 block text-sm font-semibold text-ur-text">
                Nombre completo <span className="font-normal text-ur-gray-3">(opcional)</span>
              </label>
              <div className="relative">
                <User size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ur-gray-3" />
                <input
                  id="login-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Ana María Rodríguez"
                  className={inputClass(false)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-ur-text">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ur-gray-3" />
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@urosario.edu.co"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                  className={inputClass(errors.email)}
                />
              </div>
              {errors.email && (
                <p id="login-email-error" role="alert" className="mt-1.5 text-xs font-medium text-ur-red-dark">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-ur-text">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ur-gray-3" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                  className={inputClass(errors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-ur-gray-3 hover:text-ur-gray-4"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p id="login-password-error" role="alert" className="mt-1.5 text-xs font-medium text-ur-red-dark">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-ur-sm bg-ur-red px-4 py-3 text-sm font-bold text-white transition hover:bg-ur-red-dark"
            >
              <LogIn size={18} aria-hidden="true" />
              Ingresar al campus
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-ur-gray-3">
            Modo demostración: ingresa con cualquier correo y una contraseña de mínimo 6
            caracteres. La autenticación definitiva se conecta con Supabase Auth.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Universidad del Rosario — Educación Continua y Consultoría
        </p>
      </div>
    </main>
  );
}
