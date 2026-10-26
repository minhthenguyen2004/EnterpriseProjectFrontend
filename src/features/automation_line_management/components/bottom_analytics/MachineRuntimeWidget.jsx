import useTheme from '../../../../hooks/useTheme';

export default function MachineRuntimeWidget({ runtimeOverview }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!runtimeOverview) return null;

  const { runPct, idlePct, stopPct, errorPct, runHours, idleHours, stopHours, errorHours, machineDetails } = runtimeOverview;

  return (
    <div
      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
        isFoxconn ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900/90 border-zinc-800 text-white'
      }`}
    >
      <div>
        {/* Header Widget */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isFoxconn ? 'bg-emerald-600' : 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]'}`}></span>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
              3. MACHINE RUNTIME (TẤT CẢ MÁY)
            </h3>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-800 text-white'
          }`}>
            Tổng: {runtimeOverview.totalHours}h ca
          </span>
        </div>

        {/* Thanh phân bổ thời gian tích lũy toàn line (Stacked Bar) */}
        <div className="mb-3.5">
          <div className={`flex items-center justify-between text-[11px] font-semibold mb-1.5 ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
            <span>Phân bổ toàn chuyền:</span>
            <span className={`font-bold ${isFoxconn ? 'text-emerald-600' : 'text-[#76B900]'}`}>
              {runPct}% Hoạt động hiệu quả
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-zinc-800">
            <div
              style={{ width: `${runPct}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title={`RUN: ${runPct}% (${runHours})`}
            />
            <div
              style={{ width: `${idlePct}%` }}
              className="bg-amber-400 transition-all duration-500"
              title={`IDLE: ${idlePct}% (${idleHours})`}
            />
            <div
              style={{ width: `${stopPct}%` }}
              className="bg-slate-400 transition-all duration-500"
              title={`STOP: ${stopPct}% (${stopHours})`}
            />
            <div
              style={{ width: `${errorPct}%` }}
              className="bg-rose-500 transition-all duration-500"
              title={`ERROR: ${errorPct}% (${errorHours})`}
            />
          </div>

          {/* Chú giải 4 trạng thái */}
          <div className="grid grid-cols-4 gap-1.5 mt-2.5 text-[10px] font-bold text-center">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <div>RUN</div>
              <div className="font-mono text-[11px]">{runHours}</div>
            </div>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <div>IDLE</div>
              <div className="font-mono text-[11px]">{idleHours}</div>
            </div>
            <div className={`p-1.5 rounded-lg border ${
              isFoxconn
                ? 'bg-slate-500/10 text-slate-600 border-slate-500/20'
                : 'bg-zinc-800 text-white border-zinc-700'
            }`}>
              <div>STOP</div>
              <div className="font-mono text-[11px]">{stopHours}</div>
            </div>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <div>ERROR</div>
              <div className="font-mono text-[11px]">{errorHours}</div>
            </div>
          </div>
        </div>

        {/* Danh sách runtime chi tiết từng máy */}
        <div>
          <div className={`text-[10px] font-black uppercase mb-1.5 ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
            Chi tiết từng máy trong line:
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {machineDetails?.map((m) => (
              <div
                key={m.name}
                className={`p-1.5 rounded-xl border flex items-center justify-between text-[11px] ${
                  isFoxconn ? 'bg-slate-50/80 border-slate-200' : 'bg-zinc-800/80 border-zinc-700 text-white'
                }`}
              >
                <div className={`font-bold truncate w-28 ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
                  {m.name}
                </div>

                {/* Mini stacked bar cho từng máy */}
                <div className="w-24 h-1.5 rounded-full overflow-hidden flex bg-slate-200 dark:bg-zinc-700">
                  <div style={{ width: `${(m.run / 8) * 100}%` }} className="bg-emerald-500" />
                  <div style={{ width: `${(m.idle / 8) * 100}%` }} className="bg-amber-400" />
                  <div style={{ width: `${(m.stop / 8) * 100}%` }} className="bg-slate-400" />
                  <div style={{ width: `${(m.error / 8) * 100}%` }} className="bg-rose-500" />
                </div>

                <div className={`font-mono font-bold ${isFoxconn ? 'text-slate-600' : 'text-white'}`}>
                  {m.availability}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${
        isFoxconn ? 'border-slate-100 text-slate-500' : 'border-zinc-800 text-white'
      }`}>
        <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>OEE Availability mục tiêu: ≥ 90%</span>
        <span className={`font-bold ${isFoxconn ? 'text-emerald-600' : 'text-[#76B900]'}`}>Đạt 93.5%</span>
      </div>
    </div>
  );
}
