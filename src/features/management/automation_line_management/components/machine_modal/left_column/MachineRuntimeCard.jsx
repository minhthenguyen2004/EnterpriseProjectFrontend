import useTheme from '../../../../../../hooks/useTheme';

export default function MachineRuntimeCard({ runtime }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!runtime) return null;

  return (
    <div
      className={`p-3.5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-slate-50/90 border-slate-200 shadow-2xs'
          : 'bg-zinc-900/90 border-zinc-800 text-white shadow-md'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isFoxconn ? 'bg-emerald-600' : 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
            }`}
          />
          <h4
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-700' : 'text-white'
            }`}
          >
            Thời Gian Vận Hành (Machine Runtime)
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400">Ca hiện tại:</span>
          <span
            className={`text-[11px] font-bold ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            {runtime.totalTime}
          </span>
        </div>
      </div>

      {/* Stacked Progress Bar */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between text-[10px]">
          <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Phân bổ thời gian:</span>
          <span className="font-bold text-emerald-500">
            Khả dụng: {runtime.availability}%
          </span>
        </div>

        <div className="h-2.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full flex overflow-hidden p-0.5 gap-0.5">
          <div
            className="bg-emerald-500 rounded-xs transition-all duration-500"
            style={{ width: `${runtime.runPercent}%` }}
            title={`RUN: ${runtime.runTime} (${runtime.runPercent}%)`}
          />
          <div
            className="bg-amber-400 rounded-xs transition-all duration-500"
            style={{ width: `${runtime.idlePercent}%` }}
            title={`IDLE: ${runtime.idleTime} (${runtime.idlePercent}%)`}
          />
          <div
            className="bg-slate-400 dark:bg-zinc-600 rounded-xs transition-all duration-500"
            style={{ width: `${runtime.stopPercent}%` }}
            title={`STOP: ${runtime.stopTime} (${runtime.stopPercent}%)`}
          />
          <div
            className="bg-rose-500 rounded-xs transition-all duration-500"
            style={{ width: `${runtime.errorPercent}%` }}
            title={`ERROR: ${runtime.errorTime} (${runtime.errorPercent}%)`}
          />
        </div>
      </div>

      {/* 4 Khối con số trạng thái */}
      <div className="grid grid-cols-4 gap-1.5 text-center">
        <div
          className={`p-1.5 rounded-xl border ${
            isFoxconn
              ? 'bg-emerald-50/70 border-emerald-200'
              : 'bg-emerald-950/25 border-emerald-500/30'
          }`}
        >
          <div className="text-[9px] uppercase font-bold text-emerald-500">RUN</div>
          <div
            className={`text-xs font-bold ${
              isFoxconn ? 'text-emerald-800' : 'text-emerald-300'
            }`}
          >
            {runtime.runTime}
          </div>
          <div className="text-[9px] text-emerald-500/80">{runtime.runPercent}%</div>
        </div>

        <div
          className={`p-1.5 rounded-xl border ${
            isFoxconn
              ? 'bg-amber-50/70 border-amber-200'
              : 'bg-amber-950/25 border-amber-500/30'
          }`}
        >
          <div className="text-[9px] uppercase font-bold text-amber-500">IDLE</div>
          <div
            className={`text-xs font-bold ${
              isFoxconn ? 'text-amber-800' : 'text-amber-300'
            }`}
          >
            {runtime.idleTime}
          </div>
          <div className="text-[9px] text-amber-500/80">{runtime.idlePercent}%</div>
        </div>

        <div
          className={`p-1.5 rounded-xl border ${
            isFoxconn
              ? 'bg-slate-100/70 border-slate-300'
              : 'bg-zinc-800/60 border-zinc-700'
          }`}
        >
          <div className="text-[9px] uppercase font-bold text-slate-400">STOP</div>
          <div
            className={`text-xs font-bold mt-0.5 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            {runtime.stopTime}
          </div>
          <div className="text-[9px] text-slate-400">{runtime.stopPercent}%</div>
        </div>

        <div
          className={`p-1.5 rounded-xl border ${
            isFoxconn
              ? 'bg-rose-50/70 border-rose-200'
              : 'bg-rose-950/25 border-rose-500/30'
          }`}
        >
          <div className="text-[9px] uppercase font-bold text-rose-500">ERROR</div>
          <div
            className={`text-xs font-bold mt-0.5 ${
              isFoxconn ? 'text-rose-800' : 'text-rose-300'
            }`}
          >
            {runtime.errorTime}
          </div>
          <div className="text-[9px] text-rose-500/80">{runtime.errorPercent}%</div>
        </div>
      </div>
    </div>
  );
}
