import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Autenticación en modo demo sobre localStorage.
 * Replica el contrato de la tabla `profiles` de schema.sql para que la
 * migración a Supabase Auth sea un cambio de implementación, no de API.
 */
const AuthContext = createContext(null);

const STORAGE_KEY = 'educon_user';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login({ email, fullName }) {
        const cleanEmail = email.trim().toLowerCase();
        const profile = {
          id: cleanEmail, // En Supabase será el uuid de auth.users
          email: cleanEmail,
          fullName:
            fullName?.trim() ||
            cleanEmail
              .split('@')[0]
              .replace(/[._-]+/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
          role: 'student',
          currentCourseId: null,
        };
        setUser(profile);
        return profile;
      },
      logout() {
        setUser(null);
      },
      setCurrentCourse(courseId) {
        setUser((u) => (u ? { ...u, currentCourseId: courseId } : u));
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
