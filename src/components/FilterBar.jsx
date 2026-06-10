import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/courses.js';

const TYPE_FILTERS = [
  { value: 'todos', label: 'Todos' },
  { value: 'diplomado', label: 'Diplomados' },
  { value: 'curso', label: 'Cursos' },
];

/** Búsqueda + chips de categoría + filtro por tipo de programa. */
export default function FilterBar({ filters, onChange }) {
  const { query, category, type } = filters;
  const set = (patch) => onChange({ ...filters, ...patch });

  const chip = (active) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium transition ${
      active
        ? 'border-ur-navy bg-ur-navy text-white'
        : 'border-ur-gray-2 bg-white text-ur-gray-4 hover:border-ur-navy hover:text-ur-navy'
    }`;

  return (
    <section aria-label="Filtros del catálogo" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Buscar programa</span>
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ur-gray-3"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Buscar por nombre, tema o palabra clave…"
            className="w-full rounded-ur-sm border border-ur-gray-2 bg-white py-2.5 pl-10 pr-4 text-sm text-ur-text placeholder:text-ur-gray-3 focus:border-ur-navy"
          />
        </label>

        <div role="group" aria-label="Tipo de programa" className="flex rounded-ur-sm border border-ur-gray-2 bg-white p-1">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={type === t.value}
              onClick={() => set({ type: t.value })}
              className={`flex-1 whitespace-nowrap rounded px-4 py-1.5 text-sm font-medium transition sm:flex-none ${
                type === t.value
                  ? 'bg-ur-navy text-white'
                  : 'text-ur-gray-4 hover:text-ur-navy'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Categorías">
        <button
          type="button"
          aria-pressed={category === 'todas'}
          onClick={() => set({ category: 'todas' })}
          className={chip(category === 'todas')}
        >
          Todas las áreas
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => set({ category: cat })}
            className={chip(category === cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
