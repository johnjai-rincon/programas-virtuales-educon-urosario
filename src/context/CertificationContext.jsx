import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { useProgress } from './ProgressContext.jsx';
import { gradeExam } from '../data/exams.js';

/**
 * Certificación (espejo de `exam_attempts` + `certificates` de schema.sql).
 * Reglas — las mismas que valida el RPC issue_certificate() en Supabase:
 *   1. 100% de lecciones completadas  →  habilita el examen final
 *   2. Examen aprobado (score >= PASS_SCORE)  →  emite el certificado
 * Persistencia en localStorage por usuario (modo demo).
 */
const CertificationContext = createContext(null);

const storageKey = (userId) => `educon_certs_${userId}`;

function readState(userId) {
  if (!userId) return { attempts: {}, certificates: {} };
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? JSON.parse(raw) : { attempts: {}, certificates: {} };
  } catch {
    return { attempts: {}, certificates: {} };
  }
}

function makeCertCode(courseCode) {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `UR-${courseCode}-${rand}`;
}

export function CertificationProvider({ children }) {
  const { user } = useAuth();
  const { courseStats } = useProgress();
  const [state, setState] = useState(() => readState(user?.id));

  useEffect(() => {
    setState(readState(user?.id));
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(storageKey(user.id), JSON.stringify(state));
    }
  }, [state, user?.id]);

  const value = useMemo(
    () => ({
      /** El examen se habilita solo con el 100% de lecciones completadas. */
      isExamUnlocked(course) {
        return courseStats(course).percent === 100;
      },

      getCertificate(slug) {
        return state.certificates[slug] ?? null;
      },

      getAttempts(slug) {
        return state.attempts[slug] ?? [];
      },

      bestScore(slug) {
        const attempts = state.attempts[slug] ?? [];
        return attempts.length ? Math.max(...attempts.map((a) => a.score)) : null;
      },

      /**
       * Califica, registra el intento y, si aprueba (y no existe aún),
       * emite el certificado. Devuelve { result, certificate }.
       */
      submitExam(course, answers) {
        const result = gradeExam(course.slug, answers);
        if (!result) return { result: null, certificate: null };

        let certificate = state.certificates[course.slug] ?? null;
        const attempt = {
          score: result.score,
          passed: result.passed,
          createdAt: new Date().toISOString(),
        };

        if (result.passed && !certificate) {
          certificate = {
            code: makeCertCode(course.code),
            courseSlug: course.slug,
            score: result.score,
            issuedAt: new Date().toISOString(),
            studentName: user?.fullName ?? '',
          };
        }

        setState((prev) => ({
          attempts: {
            ...prev.attempts,
            [course.slug]: [...(prev.attempts[course.slug] ?? []), attempt],
          },
          certificates: certificate
            ? { ...prev.certificates, [course.slug]: certificate }
            : prev.certificates,
        }));

        return { result, certificate };
      },

      certificatesCount() {
        return Object.keys(state.certificates).length;
      },
    }),
    [state, user?.fullName, courseStats]
  );

  return (
    <CertificationContext.Provider value={value}>{children}</CertificationContext.Provider>
  );
}

export function useCertification() {
  const ctx = useContext(CertificationContext);
  if (!ctx) throw new Error('useCertification debe usarse dentro de <CertificationProvider>');
  return ctx;
}
