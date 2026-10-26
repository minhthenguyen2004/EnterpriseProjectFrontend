import useTheme from '../../../../hooks/useTheme';

export default function ActiveFilterChipsBar({
  chips = [],
  onRemoveChip,
  onResetAll,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-1">
      <span className={`text-[11px] font-bold flex items-center gap-1 ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
        <svg className={`w-3.5 h-3.5 ${isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Đang Lọc:</span>
      </span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
            isFoxconn
              ? 'bg-blue-50 text-blue-900 border-blue-200'
              : 'bg-zinc-900 text-white border-[#76B900]/50 shadow-xs'
          }`}
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemoveChip(chip.key)}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer text-slate-500 hover:text-slate-800 dark:text-zinc-300 dark:hover:text-white"
            title="Xóa điều kiện này"
          >
            ✕
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onResetAll}
        className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline ml-1 cursor-pointer"
      >
        Xóa tất cả lọc
      </button>
    </div>
  );
}
