import { useState } from 'react';
import useTheme from '../../../../../../../hooks/useTheme';

export default function ErrorLogsSubTab({
  errorLogsList,
  isExecuting,
  onRefresh,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [filterLevel, setFilterLevel] = useState('ALL');

  const filtered = errorLogsList.filter((log) => {
    if (filterLevel === 'ALL') return true;
    return log.level === filterLevel;
  });

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-zinc-300">Phân Loại Mức Độ:</span>
          <div className="flex items-center gap-1">
            {['ALL', 'ERROR', 'WARNING', 'INFO'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilterLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all ${
                  filterLevel === lvl
                    ? isFoxconn
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#76B900] text-black font-extrabold'
                    : isFoxconn
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={isExecuting}
          onClick={onRefresh}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isFoxconn
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
          }`}
        >
          <svg className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Quét Lỗi Trạm</span>
        </button>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400 dark:text-zinc-500 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
            Không có cảnh báo hoặc lỗi nào được ghi nhận.
          </div>
        ) : (
          filtered.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-xl border transition-all text-xs ${
                log.level === 'ERROR'
                  ? 'border-red-500/25 bg-red-500/5'
                  : log.level === 'WARNING'
                  ? 'border-amber-500/25 bg-amber-500/5'
                  : isFoxconn
                  ? 'border-slate-200 bg-slate-50'
                  : 'border-zinc-800 bg-zinc-950/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      log.level === 'ERROR'
                        ? 'bg-red-500/20 text-red-500'
                        : log.level === 'WARNING'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-blue-500/20 text-blue-500'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">
                    {log.code}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                    Trạm: {log.station}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 dark:text-zinc-500">
                  {log.time}
                </span>
              </div>

              <p className="text-slate-600 dark:text-zinc-400 text-[11px] mb-1.5">
                {log.message}
              </p>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60 dark:border-zinc-800/60">
                <span className="font-mono text-slate-400">ID: {log.id}</span>
                <span className="text-blue-600 dark:text-[#76B900] font-semibold cursor-pointer hover:underline">
                  Tham chiếu: {log.sopLink}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
