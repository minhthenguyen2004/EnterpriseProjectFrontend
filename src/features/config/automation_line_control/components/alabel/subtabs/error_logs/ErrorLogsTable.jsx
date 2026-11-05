import { useState } from 'react';

export default function ErrorLogsTable({
  isFoxconn,
  errorLogsList = [],
  isExecuting,
}) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [keyword, setKeyword] = useState('');

  const filtered = errorLogsList.filter((log) => {
    if (filterLevel !== 'ALL' && log.level !== filterLevel) return false;
    if (!keyword) return true;
    const q = keyword.toLowerCase();
    return (
      (log.code || '').toLowerCase().includes(q) ||
      (log.message || '').toLowerCase().includes(q) ||
      (log.station || '').toLowerCase().includes(q) ||
      (log.source || '').toLowerCase().includes(q) ||
      (log.id || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-3 pt-2">
      {/* Thanh bộ lọc cấp độ & ô tìm kiếm nhanh */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`font-bold text-slate-700 ${ isFoxconn ? "text-black" : "text-white"} mr-1 text-[11px]`}>
            Cấp Độ:
          </span>
          {['ALL', 'CRITICAL', 'ERROR', 'WARNING', 'INFO'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setFilterLevel(lvl)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                filterLevel === lvl
                  ? isFoxconn
                    ? 'bg-[#002766] text-white'
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

        <div className="flex items-center gap-2 flex-1 sm:flex-initial sm:min-w-[200px]">
          <div className="relative w-full">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Lọc mã lỗi, trạm, nguồn..."
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 focus:bg-white text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
              }`}
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <span className="text-[11px] font-mono whitespace-nowrap text-slate-500 dark:text-zinc-400">
            {filtered.length} lỗi
          </span>
        </div>
      </div>

      {/* Danh sách bản ghi lỗi */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {isExecuting ? (
          <div className="p-8 text-center text-xs text-slate-400 dark:text-zinc-500 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin text-blue-600 dark:text-[#76B900]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Đang truy vấn bảng ErrorLogs...</span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 dark:text-zinc-500 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
            Không có cảnh báo hoặc lỗi nào được ghi nhận khớp với bộ lọc.
          </div>
        ) : (
          filtered.map((log) => (
            <div
              key={log.id}
              className={`p-3.5 rounded-xl border transition-all text-xs ${
                log.level === 'CRITICAL'
                  ? 'border-red-600/40 bg-red-600/10'
                  : log.level === 'ERROR'
                  ? 'border-red-500/25 bg-red-500/5'
                  : log.level === 'WARNING'
                  ? 'border-amber-500/25 bg-amber-500/5'
                  : isFoxconn
                  ? 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
                  : 'border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                      log.level === 'CRITICAL'
                        ? 'bg-red-600 text-white border-red-700'
                        : log.level === 'ERROR'
                        ? 'bg-red-500/20 text-red-500 border-red-500/30'
                        : log.level === 'WARNING'
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className={`font-bold ${isFoxconn ? "text-black" : "text-white"}`}>
                    {log.code}
                  </span>
                  {log.source && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                      Nguồn: {log.source}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Trạm: <strong>{log.station}</strong>
                  </span>
                  {log.line && (
                    <span className="text-[11px] text-slate-400">
                      ({log.line})
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-slate-400 dark:text-zinc-500">
                  {log.time}
                </span>
              </div>

              <p className={`text-slate-700 ${isFoxconn ? "text-black" : "text-white"} text-[11px] mb-2 leading-relaxed`}>
                {log.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] pt-1.5 border-t border-slate-200/60 dark:border-zinc-800/60">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="font-mono">ID: {log.id}</span>
                  {log.stage && <span>Giai đoạn: {log.stage}</span>}
                </div>
                {log.sopLink && (
                  <span className="text-blue-600 dark:text-[#76B900] font-semibold cursor-pointer hover:underline flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    SOP Tham Chiếu: {log.sopLink}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
