-- =============================================================
-- CAMPUS VIRTUAL EDUCON — Universidad del Rosario
-- Esquema PostgreSQL para Supabase (Lovable Cloud)
-- Ejecutar en el SQL Editor de Supabase.
-- =============================================================

-- ── Extensiones ───────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── PROFILES ─────────────────────────────────────────────────
-- Se vincula 1:1 con auth.users (Supabase Auth).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'instructor', 'admin')),
  current_course_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── COURSES ──────────────────────────────────────────────────
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  code text unique,                -- Código interno (ej. 0HD0)
  order_no text,                   -- No. de orden (ej. B-AVVBZ486)
  title text not null,
  description text,
  cover_image text,
  category text not null default 'General',
  type text not null default 'diplomado' check (type in ('curso', 'diplomado')),
  duration_hours integer not null default 0,
  slug text not null unique,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- FK diferida de profiles.current_course_id → courses
alter table public.profiles
  add constraint profiles_current_course_fk
  foreign key (current_course_id) references public.courses (id) on delete set null;

-- ── MODULES ──────────────────────────────────────────────────
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  title text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_modules_course on public.modules (course_id, order_index);

-- ── LESSONS ──────────────────────────────────────────────────
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules (id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  content_html text,
  resources jsonb not null default '[]'::jsonb,  -- [{ "name": "...", "url": "...", "type": "pdf" }]
  duration_minutes integer not null default 0,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_lessons_module on public.lessons (module_id, order_index);

-- ── USER PROGRESS ────────────────────────────────────────────
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists idx_progress_user on public.user_progress (user_id);
create index if not exists idx_progress_lesson on public.user_progress (lesson_id);

-- ── Trigger: crear perfil automáticamente al registrarse ─────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Trigger: mantener updated_at en user_progress ────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_progress_touch on public.user_progress;
create trigger trg_progress_touch
  before update on public.user_progress
  for each row execute function public.touch_updated_at();

-- ── Vista: porcentaje de avance por curso y usuario ──────────
create or replace view public.course_progress as
select
  up.user_id,
  c.id as course_id,
  c.slug,
  count(l.id) filter (where up.completed) as lessons_completed,
  count(distinct l2.id) as lessons_total,
  round(
    100.0 * count(l.id) filter (where up.completed)
    / nullif(count(distinct l2.id), 0)
  ) as percent
from public.courses c
join public.modules m on m.course_id = c.id
join public.lessons l2 on l2.module_id = m.id
left join public.user_progress up on up.lesson_id = l2.id
left join public.lessons l on l.id = up.lesson_id
group by up.user_id, c.id, c.slug;

-- ── Row Level Security ───────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;

-- Perfiles: cada usuario ve y edita el suyo
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Catálogo: lectura para usuarios autenticados
create policy "courses_read" on public.courses
  for select using (auth.role() = 'authenticated' and is_published);
create policy "modules_read" on public.modules
  for select using (auth.role() = 'authenticated');
create policy "lessons_read" on public.lessons
  for select using (auth.role() = 'authenticated');

-- Progreso: el usuario gestiona únicamente el propio
create policy "progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id);
create policy "progress_delete_own" on public.user_progress
  for delete using (auth.uid() = user_id);

-- =============================================================
-- CERTIFICACIÓN: EXAMEN FINAL + CERTIFICADOS
-- Flujo: 100% de lecciones → examen final aprobado (≥ pass_score)
--        → emisión automática del certificado (RPC issue_certificate)
-- =============================================================

-- ── EXAM QUESTIONS ───────────────────────────────────────────
-- Banco de preguntas del examen final de cada programa.
create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  question text not null,
  options jsonb not null,            -- ["Opción A", "Opción B", ...]
  correct_index integer not null,    -- índice (0-based) de la respuesta correcta
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_exam_questions_course
  on public.exam_questions (course_id, order_index);

-- ── EXAM ATTEMPTS ────────────────────────────────────────────
create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,  -- { "question_id": índice_elegido }
  score numeric(5,2) not null,                 -- porcentaje 0-100
  passed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_exam_attempts_user_course
  on public.exam_attempts (user_id, course_id, created_at desc);

-- ── CERTIFICATES ─────────────────────────────────────────────
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  code text not null unique,         -- código verificable (ej. UR-0GP0-7F3A2B)
  score numeric(5,2) not null,       -- nota del examen con el que se emitió
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)        -- un certificado por usuario y programa
);

create index if not exists idx_certificates_user on public.certificates (user_id);

-- ── RPC: emitir certificado con validación en servidor ───────
-- Verifica (1) 100% de lecciones completadas y (2) examen aprobado,
-- y emite el certificado de forma atómica. Llamar tras aprobar:
--   select issue_certificate('<course_id>');
create or replace function public.issue_certificate(p_course_id uuid)
returns public.certificates
language plpgsql
security definer set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_total integer;
  v_done integer;
  v_best record;
  v_cert public.certificates;
  v_code text;
begin
  if v_user is null then
    raise exception 'No autenticado';
  end if;

  -- ¿Ya existe? Devolverlo (idempotente).
  select * into v_cert from certificates
   where user_id = v_user and course_id = p_course_id;
  if found then
    return v_cert;
  end if;

  -- 1) Todas las lecciones completadas
  select count(l.id),
         count(l.id) filter (
           where exists (
             select 1 from user_progress up
              where up.lesson_id = l.id and up.user_id = v_user and up.completed
           )
         )
    into v_total, v_done
    from lessons l
    join modules m on m.id = l.module_id
   where m.course_id = p_course_id;

  if v_total = 0 or v_done < v_total then
    raise exception 'El programa aún no está completado al 100%% (% de %)', v_done, v_total;
  end if;

  -- 2) Mejor intento aprobado del examen final
  select * into v_best from exam_attempts
   where user_id = v_user and course_id = p_course_id and passed
   order by score desc, created_at asc
   limit 1;

  if not found then
    raise exception 'El examen final no ha sido aprobado';
  end if;

  -- 3) Emitir con código verificable
  select 'UR-' || coalesce(c.code, 'EDU') || '-' ||
         upper(substr(md5(v_user::text || p_course_id::text || now()::text), 1, 6))
    into v_code
    from courses c where c.id = p_course_id;

  insert into certificates (user_id, course_id, code, score)
  values (v_user, p_course_id, v_code, v_best.score)
  returning * into v_cert;

  return v_cert;
end;
$$;

-- ── RLS de certificación ─────────────────────────────────────
alter table public.exam_questions enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.certificates enable row level security;

-- Preguntas: lectura autenticada (la respuesta correcta debería servirse
-- vía RPC de calificación en producción; aquí se permite para el demo).
create policy "exam_questions_read" on public.exam_questions
  for select using (auth.role() = 'authenticated');

-- Intentos: cada usuario gestiona los propios
create policy "attempts_select_own" on public.exam_attempts
  for select using (auth.uid() = user_id);
create policy "attempts_insert_own" on public.exam_attempts
  for insert with check (auth.uid() = user_id);

-- Certificados: lectura propia; la emisión solo vía issue_certificate()
create policy "certificates_select_own" on public.certificates
  for select using (auth.uid() = user_id);
