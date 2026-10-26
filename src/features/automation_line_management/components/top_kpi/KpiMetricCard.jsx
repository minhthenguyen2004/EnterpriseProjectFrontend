import useTheme from '../../../../hooks/useTheme';

export default function KpiMetricCard({
  title,
  value,
  unit,
  status = 'neutral',
  icon,
  diff,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;

  const statusColors = {
    success: isFoxconn
      ? 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/40'
      : 'border-emerald-500/30 bg-gradient-to-br from-zinc-900 to-emerald-950/20 text-white',
    warning: isFoxconn
      ? 'border-amber-200 bg-gradient-to-br from-white to-amber-50/40'
      : 'border-amber-500/30 bg-gradient-to-br from-zinc-900 to-amber-950/20 text-white',
    danger: isFoxconn
      ? 'border-rose-200 bg-gradient-to-br from-white to-rose-50/40'
      : 'border-rose-500/30 bg-gradient-to-br from-zinc-900 to-rose-950/20 text-white',
    neutral: isFoxconn
      ? 'border-slate-200 bg-white'
      : 'border-zinc-800 bg-zinc-900/90 text-white',
  };

  const cardStyle = statusColors[status] || statusColors.neutral;

  return (
    <div
      className={`relative p-3 rounded-xl border transition-all duration-300 hover:shadow-md flex flex-col justify-between group overflow-hidden ${cardStyle} ${
        isFoxconn
          ? 'shadow-xs hover:border-blue-300'
          : 'hover:border-[#76B900]/40 text-white'
      }`}
    >
      {/* Decorative top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-opacity ${
          status === 'success'
            ? 'bg-emerald-500'
            : status === 'warning'
              ? 'bg-amber-500'
              : status === 'danger'
                ? 'bg-rose-500'
                : isFoxconn
                  ? 'bg-blue-600'
                  : 'bg-[#76B900]'
        }`}
      />

      {/* Header card: Title & Icon */}
      <div className="flex items-center justify-between gap-1.5 mb-1">
        <span className={`text-[11px] font-black uppercase tracking-wider truncate ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
          {title}
        </span>
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
            isFoxconn
              ? 'bg-slate-100 text-[#002766]'
              : 'bg-zinc-800 text-[#76B900]'
          }`}
        >
          {icon}
        </div>
      </div>

      {/* Value & Unit & Diff */}
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <span className={`text-xl xl:text-2xl font-black font-mono tracking-tight ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
          {formattedValue}
        </span>
        {unit && (
          <span className={`text-xs font-bold ${isFoxconn ? 'text-slate-400' : 'text-white/80'}`}>
            {unit}
          </span>
        )}
        {diff && (
          <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
            {diff}
          </span>
        )}
      </div>
    </div>
  );
}
