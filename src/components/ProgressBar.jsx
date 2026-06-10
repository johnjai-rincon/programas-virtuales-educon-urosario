/**
 * Barra de progreso accesible. `tone="auto"` cambia a verde al 100%.
 */
export default function ProgressBar({ percent, size = 'md', tone = 'auto', showLabel = false }) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';
  const isDone = percent >= 100;
  const fill =
    tone === 'auto' && isDone
      ? 'bg-emerald-500'
      : tone === 'red'
        ? 'bg-ur-red'
        : 'bg-gradient-to-r from-ur-navy to-ur-navy-light';

  return (
    <div className="flex items-center gap-2">
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Avance del curso: ${percent}%`}
        className={`w-full overflow-hidden rounded-full bg-ur-gray-2 ${height}`}
      >
        <div
          className={`${height} ${fill} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span
          className={`shrink-0 text-xs font-semibold tabular-nums ${
            isDone ? 'text-emerald-600' : 'text-ur-gray-4'
          }`}
        >
          {percent}%
        </span>
      )}
    </div>
  );
}
