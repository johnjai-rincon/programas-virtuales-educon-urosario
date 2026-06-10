import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { COURSES, getCourseLessons } from '../data/courses.js';

/**
 * Progreso del estudiante (espejo de la tabla `user_progress`).
 * Persistencia por usuario en localStorage; el recálculo del porcentaje
 * global del curso es inmediato porque deriva del estado en memoria.
 */
const ProgressContext = createContext(null);

const storageKey = (userId) => `educon_progress_${userId}`;

function readProgress(userId) {
  if (!userId) return {};
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => readProgress(user?.id));

  // Recargar el progreso cuando cambia el usuario activo.
  useEffect(() => {
    setProgress(readProgress(user?.id));
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(storageKey(user.id), JSON.stringify(progress));
    }
  }, [progress, user?.id]);

  const value = useMemo(() => {
    const isLessonCompleted = (lessonId) => Boolean(progress[lessonId]?.completed);

    const courseStats = (course) => {
      const lessons = getCourseLessons(course);
      const completed = lessons.filter((l) => isLessonCompleted(l.id)).length;
      const total = lessons.length;
      return {
        completed,
        total,
        percent: total ? Math.round((completed / total) * 100) : 0,
      };
    };

    return {
      progress,
      isLessonCompleted,
      courseStats,
      toggleLesson(lessonId) {
        setProgress((prev) => {
          const wasCompleted = Boolean(prev[lessonId]?.completed);
          return {
            ...prev,
            [lessonId]: {
              completed: !wasCompleted,
              updatedAt: new Date().toISOString(),
            },
          };
        });
      },
      globalStats() {
        const perCourse = COURSES.map((c) => courseStats(c));
        return {
          inProgress: perCourse.filter((s) => s.percent > 0 && s.percent < 100).length,
          completed: perCourse.filter((s) => s.percent === 100).length,
          lessonsCompleted: perCourse.reduce((acc, s) => acc + s.completed, 0),
        };
      },
    };
  }, [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de <ProgressProvider>');
  return ctx;
}
