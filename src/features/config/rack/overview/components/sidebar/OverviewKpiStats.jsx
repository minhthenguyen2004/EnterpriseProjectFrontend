import useTheme from '../../../../../../hooks/useTheme';

export default function OverviewKpiStats({
  totalFaces,
  totalGroups,
  totalRacks,
  totalSlots,
  approvedSlotsCount
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const approvalRate = totalSlots > 0 ? Math.round((approvedSlotsCount / totalSlots) * 100) : 0;

  const statsList = [
    {
      label: 'Tổng số Face',
      value: totalFaces,
      unit: 'Mặt',
      color: 'blue',
      icon: '🔲'
    },
    {
      label: 'Tổng số Group',
      value: totalGroups,
      unit: 'Nhóm',
      color: 'purple',
      icon: '👥'
    },
    {
      label: 'Tổng số Rack',
      value: totalRacks,
      unit: 'Tủ',
      color: 'amber',
      icon: '🗄️'
    },
    {
      label: 'Tổng số Slot',
      value: totalSlots,
      unit: 'Khe',
      color: 'cyan',
      icon: '🔌'
    },
    {
      label: 'Đã approved',
      value: `${approvedSlotsCount} / ${totalSlots}`,
      sub: `${approvalRate}% đã duyệt`,
      color: 'emerald',
      icon: '✅',
      isHighlight: true
    }
  ];

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800 shadow-xl'
      }`}
    >
      <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className={`text-base ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>📊</span>
          <h4 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>
            Tổng Quan
          </h4>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isFoxconn
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
          }`}
        >
          {approvalRate}% Ready
        </span>
      </div>

      <div className="space-y-2.5">
        {statsList.map((stat, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
              stat.isHighlight
                ? isFoxconn
                  ? 'bg-emerald-50/70 border-emerald-200/90'
                  : 'bg-emerald-950/30 border-emerald-800/60'
                : isFoxconn
                ? 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/60'
                : 'bg-zinc-950/60 border-zinc-800 hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{stat.icon}</span>
              <span className={`text-xs font-medium ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>
                {stat.label}
              </span>
            </div>

            <div className="text-right">
              <div
                className={`text-xs ${
                  stat.isHighlight
                    ? isFoxconn
                      ? 'text-emerald-700 font-black'
                      : 'text-emerald-400'
                    : `text-white`
                }`}
              >
                {stat.value} {stat.unit && <span className={`text-[10px] font-normal opacity-70 ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>{stat.unit}</span>}
              </div>
              {stat.sub && (
                <div className={`text-[10px] font-medium ${isFoxconn ? 'text-emerald-600' : 'text-emerald-400'}`}>
                  {stat.sub}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

