import useTheme from '../../../../../hooks/useTheme';

export default function MachineMetricsBlock({ input = 0, output = 0, ngCount = 0, yieldRate }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className="space-y-1.5">
      {/* 1. Phần Input vs Output xếp theo hàng dọc */}
      <div className="space-y-1">
        {/* INPUT */}
        <div
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all ${
            isFoxconn
              ? 'bg-blue-50/70 border-blue-100 text-slate-800'
              : 'bg-zinc-800/90 border-zinc-700 text-white'
          }`}
        >
          <span className={`text-[9px] font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
            INPUT
          </span>
          <span className={`text-xs font-bold ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
            {input.toLocaleString()}
          </span>
        </div>

        {/* OUTPUT */}
        <div
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all ${
            isFoxconn
              ? 'bg-emerald-50/70 border-emerald-100 text-slate-800'
              : 'bg-emerald-950/40 border-emerald-500/40 text-white'
          }`}
        >
          <span className={`text-[9px] font-black uppercase tracking-wider ${isFoxconn ? 'text-emerald-600' : 'text-emerald-400'}`}>
            OUTPUT
          </span>
          <span className={`text-xs font-bold ${isFoxconn ? 'text-emerald-700' : 'text-white font-black'}`}>
            {output.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 2. Phần NG vs Yield cũng xếp theo hàng dọc */}
      <div
        className={`space-y-0.5 p-1.5 rounded-lg border transition-all ${
          isFoxconn
            ? 'bg-slate-50/80 border-slate-200 text-slate-700'
            : 'bg-zinc-900/70 border-zinc-800 text-white'
        }`}
      >
        {/* NG */}
        <div className={`flex items-center justify-between text-[10px] px-1 font-semibold ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
          <span>NG:</span>
          <strong className={`font-bold ${ngCount > 0 ? 'text-rose-400' : isFoxconn ? 'text-slate-700' : 'text-white'}`}>
            {ngCount} pcs
          </strong>
        </div>

        {/* YIELD */}
        {yieldRate !== undefined && (
          <div className={`flex items-center justify-between text-[10px] px-1 font-semibold ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
            <span>Yield:</span>
            <strong className={`font-bold ${isFoxconn ? 'text-emerald-600' : 'text-[#76B900]'}`}>
              {yieldRate}%
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}
