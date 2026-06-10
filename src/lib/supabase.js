import { createClient } from '@supabase/supabase-js';

/**
 * Cliente de Supabase (Lovable Cloud).
 * Mientras no existan las variables de entorno, la app funciona en
 * modo demo con localStorage (ver AuthContext y ProgressContext).
 *
 * Al importar en Lovable.dev: definir VITE_SUPABASE_URL y
 * VITE_SUPABASE_ANON_KEY, ejecutar schema.sql y migrar los
 * contextos a consultas reales.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseEnabled = Boolean(supabase);
