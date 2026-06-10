import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/** Barra superior fija con identidad de marca y sesión del usuario. */
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.fullName ?? '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  return (
    <header className="sticky top-0 z-40 border-b border-ur-gray-2 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="Ir al panel principal" className="shrink-0 rounded">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-ur-gray-4 md:flex">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-ur-sm px-3 py-2 transition hover:bg-ur-gray-1 hover:text-ur-navy"
          >
            <GraduationCap size={18} aria-hidden="true" />
            Mis programas
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="max-w-[180px] truncate text-sm font-semibold text-ur-text">
              {user?.fullName}
            </p>
            <p className="text-xs text-ur-gray-3">Estudiante</p>
          </div>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ur-navy text-sm font-bold text-white"
          >
            {initials || 'UR'}
          </span>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-2 rounded-ur-sm border border-ur-gray-2 px-3 py-2 text-sm font-medium text-ur-gray-4 transition hover:border-ur-red hover:text-ur-red"
          >
            <LogOut size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
