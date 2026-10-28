import useTheme from '../../../../../hooks/useTheme';

export default function TopErrorCodeWidget({ errors = [] }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
        isFoxconn ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900/90 border-zinc-800 text-white'
      }`}
    >
      <div>
        {/* Header Widget */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isFoxconn ? 'bg-rose-500' : 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`}></span>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
              1. TOP ERROR CODES (MÃ LỖI)
            </h3>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-800 text-white'
          }`}>
            {errors.length} mã lỗi ca này
          </span>
        </div>

        {/* Danh sách lỗi */}
        <div className="space-y-3">
          {errors.map((item, idx) => (
            <div key={item.code} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                      item.severity === 'danger'
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        : item.severity === 'warning'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : isFoxconn
                            ? 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                            : 'bg-zinc-800 text-white border border-zinc-700'
                    }`}
                  >
                    #{idx + 1} {item.code}
                  </span>
                  <span className={`font-bold truncate ${isFoxconn ? 'text-slate-800' : 'text-white'}`} title={item.title}>
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-bold text-[11px]">
                  <span className="font-bold text-rose-500">{item.count} lần</span>
                  <span className={`text-[10px] ${isFoxconn ? 'text-slate-400' : 'text-white/80'}`}>({item.percentage}%)</span>
                </div>
              </div>

              {/* Tên trạm phát sinh */}
              <div className={`flex items-center justify-between text-[10px] mb-1 ${isFoxconn ? 'text-slate-500' : 'text-white/80'}`}>
                <span>{item.station}</span>
              </div>

              {/* Thanh tiến độ phần trăm đóng góp */}
              <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.severity === 'danger'
                      ? 'bg-rose-500'
                      : item.severity === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-slate-400'
                  }`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer link */}
      <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] ${
        isFoxconn ? 'border-slate-100 text-slate-500' : 'border-zinc-800 text-white'
      }`}>
        <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Chiếm 87% phế phẩm ca</span>
        <button
          type="button"
          className={`font-bold transition-colors cursor-pointer ${
            isFoxconn ? 'text-blue-700 hover:underline' : 'text-[#76B900] hover:text-white hover:underline'
          }`}
        >
          Xem Nhật Ký Lỗi ↗
        </button>
      </div>
    </div>
  );
}
