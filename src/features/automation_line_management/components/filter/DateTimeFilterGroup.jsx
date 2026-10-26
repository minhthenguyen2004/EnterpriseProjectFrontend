import useTheme from '../../../../hooks/useTheme';

export default function DateTimeFilterGroup({
  enableDateTime,
  startDate,
  endDate,
  onChange,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleToggleEnable = (e) => {
    onChange({ enableDateTime: e.target.checked });
  };

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? enableDateTime
            ? 'bg-blue-50/50 border-blue-200'
            : 'bg-slate-50 border-slate-200 opacity-80'
          : enableDateTime
            ? 'bg-zinc-900/90 border-[#76B900]/40'
            : 'bg-zinc-900/40 border-zinc-800 opacity-70'
      }`}
    >
      {/* Checkbox tích chọn lọc ngày & giờ */}
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={enableDateTime}
            onChange={handleToggleEnable}
            className={`w-4 h-4 rounded border-slate-300 cursor-pointer ${
              isFoxconn ? 'text-[#002766] focus:ring-blue-500' : 'text-[#76B900] focus:ring-[#76B900]'
            }`}
          />
          <span className={`text-xs font-bold uppercase tracking-wider ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
            Lọc Theo Ngày & Giờ
          </span>
        </label>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            enableDateTime
              ? isFoxconn
                ? 'bg-blue-100 text-blue-800'
                : 'bg-[#76B900]/20 text-[#76B900]'
              : isFoxconn
                ? 'bg-slate-200 text-slate-500'
                : 'bg-zinc-800 text-white'
          }`}
        >
          {enableDateTime ? 'Đang Bật' : 'Tắt'}
        </span>
      </div>

      {/* Nội dung chọn ngày & giờ khi checkbox được tích */}
      {enableDateTime && (
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className={`block text-[10px] font-bold uppercase mb-1 ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
                Từ Ngày & Giờ:
              </label>
              <input
                type="datetime-local"
                value={startDate || ''}
                onChange={(e) => onChange({ startDate: e.target.value })}
                className={`w-full text-xs font-mono px-2.5 py-1.5 rounded-xl border focus:outline-none ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800 focus:border-blue-600'
                    : 'bg-zinc-800 border-zinc-700 text-white focus:border-[#76B900]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase mb-1 ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
                Đến Ngày & Giờ:
              </label>
              <input
                type="datetime-local"
                value={endDate || ''}
                onChange={(e) => onChange({ endDate: e.target.value })}
                className={`w-full text-xs font-mono px-2.5 py-1.5 rounded-xl border focus:outline-none ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800 focus:border-blue-600'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
