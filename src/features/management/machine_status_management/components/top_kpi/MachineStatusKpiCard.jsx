import useTheme from '../../../../../hooks/useTheme';

export default function MachineStatusKpiCard({
  title,
  value,
  unit = 'máy',
  badge,
  badgeType = 'neutral',
  subText,
  icon,
  accentColor = 'blue',
  details,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const accentStyles = {
    blue: isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  const badgeStyles = {
    success: isFoxconn
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40',
    warning: isFoxconn
      ? 'bg-amber-100 text-amber-800 border-amber-200'
      : 'bg-amber-950/70 text-amber-400 border-amber-500/40',
    danger: isFoxconn
      ? 'bg-rose-100 text-rose-800 border-rose-200'
      : 'bg-rose-950/70 text-rose-400 border-rose-500/40',
    neutral: isFoxconn
      ? 'bg-slate-100 text-slate-700 border-slate-200'
      : 'bg-zinc-800 text-zinc-200 border-zinc-700',
  };

  return (
    <div
      className={`relative p-3.5 rounded-2xl border transition-all duration-300 hover:shadow-md flex flex-col justify-between overflow-hidden ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-xs hover:border-blue-300 text-slate-900'
          : 'bg-zinc-900/90 border-zinc-800 text-white shadow-lg hover:border-[#76B900]/50'
      }`}
    >
      {/* Thanh viền accent trên đầu thẻ */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentStyles[accentColor] || accentStyles.blue}`} />

      {/* Header thẻ: Tiêu đề & Icon */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span
          className={`text-[11px] font-black uppercase tracking-wider truncate ${
            isFoxconn ? 'text-slate-500' : 'text-zinc-200'
          }`}
        >
          {title}
        </span>
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isFoxconn ? 'bg-slate-100 text-slate-700' : 'bg-zinc-800 text-white'
          }`}
        >
          {icon}
        </div>
      </div>

      {/* Con số chỉ số chính & Đơn vị */}
      <div className="flex items-baseline justify-between gap-2 my-1">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-2xl font-bold tracking-tight ${
              isFoxconn ? 'text-slate-900' : 'text-white'
            }`}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          <span className={`text-xs font-semibold ${isFoxconn ? 'text-slate-500' : 'text-white/80'}`}>
            {unit}
          </span>
        </div>

        {badge && (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-md border font-bold ${
              badgeStyles[badgeType] || badgeStyles.neutral
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Chi tiết phụ hoặc phân rã con số */}
      {details ? (
        <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[10px] font-bold">
          {details}
        </div>
      ) : subText ? (
        <div
          className={`mt-1 pt-1.5 border-t border-slate-100 dark:border-zinc-800 text-[10px] font-medium truncate ${
            isFoxconn ? 'text-slate-500' : 'text-white/80'
          }`}
        >
          {subText}
        </div>
      ) : null}
    </div>
  );
}
