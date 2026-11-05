import { useState, useRef, useEffect, useMemo } from 'react';
import useTheme from '../../../../../hooks/useTheme';

/**
 * Component: AlabelExecutionLogs
 * Phân hệ Nhật Ký Thực Thi Thao Tác ALABEL (Console Terminal Thời Gian Thực)
 * Tối ưu hóa giao diện đa độ phân giải (Mobile, Tablet, Desktop)
 */
export default function AlabelExecutionLogs({
  logs,
  rawLogsCount,
  filterLevel,
  setFilterLevel,
  keyword,
  setKeyword,
  autoScroll,
  setAutoScroll,
  onClearLogs,
  onExportLogs,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const logContainerRef = useRef(null);

  // Tự động cuộn xuống dòng mới nhất khi có log mới
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs, autoScroll]);

  const toggleExpandLog = (id) => {
    setExpandedLogId((prev) => (prev === id ? null : id));
  };

  const handleCopyJson = (key, data, e) => {
    e.stopPropagation();
    try {
      const text = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // ignore
    }
  };

  // Thống kê nhanh các mức log
  const stats = useMemo(() => {
    let success = 0;
    let error = 0;
    let warning = 0;
    let info = 0;
    logs.forEach((item) => {
      if (item.level === 'SUCCESS') success++;
      else if (item.level === 'ERROR') error++;
      else if (item.level === 'WARNING') warning++;
      else if (item.level === 'INFO') info++;
    });
    return { success, error, warning, info };
  }, [logs]);

  // Màu sắc và style cho từng mức log
  const getLevelBadge = (level) => {
    switch (level) {
      case 'SUCCESS':
        return {
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          border: 'border-l-emerald-500',
          bgHighlight: 'bg-emerald-500/[0.03]',
          dot: 'bg-emerald-400',
        };
      case 'ERROR':
        return {
          badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          border: 'border-l-rose-500',
          bgHighlight: 'bg-rose-500/[0.03]',
          dot: 'bg-rose-400',
        };
      case 'WARNING':
        return {
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          border: 'border-l-amber-500',
          bgHighlight: 'bg-amber-500/[0.03]',
          dot: 'bg-amber-400',
        };
      default:
        return {
          badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
          border: 'border-l-cyan-500',
          bgHighlight: 'bg-cyan-500/[0.03]',
          dot: 'bg-cyan-400',
        };
    }
  };

  return (
    <div
      className={`p-3.5 sm:p-5 rounded-2xl border transition-all ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800 text-white'
      }`}
    >
      {/* 1. Header & Live Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3.5 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl shrink-0 ${
              isFoxconn ? 'bg-slate-100 text-slate-700' : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            <svg className="w-5 h-5 font-mono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                Nhật Ký Thực Thi ALABEL
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 shrink-0">
                {logs.length}/{rawLogsCount} Events
              </span>
              <div className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Realtime</span>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 sm:line-clamp-none">
              Console giám sát thời gian thực toàn bộ tác vụ SFC & ALABEL Dispatcher
            </p>
          </div>
        </div>
      </div>

      {/* 2. Responsive Toolbar: Bộ lọc, Tìm kiếm và Nút chức năng */}
      <div className="mt-3.5 space-y-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          {/* Nhóm lọc Level: Hỗ trợ cuộn ngang mượt mà trên mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
              Lọc:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-950 p-1 rounded-xl border border-slate-200 dark:border-zinc-800 shrink-0">
              {[
                { id: 'ALL', label: 'TẤT CẢ' },
                { id: 'SUCCESS', label: 'SUCCESS' },
                { id: 'ERROR', label: 'ERROR' },
                { id: 'WARNING', label: 'WARN' },
                { id: 'INFO', label: 'INFO' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setFilterLevel(lvl.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                    filterLevel === lvl.id
                      ? isFoxconn
                        ? 'bg-[#002766] text-white shadow-xs'
                        : 'bg-[#76B900] text-black font-extrabold shadow-xs'
                      : isFoxconn
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nhóm Tìm kiếm & Hành động (Responsive wrap) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            {/* Input tìm kiếm mở rộng linh hoạt */}
            <div className="relative flex-1 sm:w-56 md:w-64 min-w-37.5">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm Action, SN, từ khóa..."
                className={`w-full pl-7 pr-7 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-200'
                }`}
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 text-xs px-1"
                  title="Xóa tìm kiếm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Các nút công cụ bổ trợ */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Toggle Auto-scroll */}
              <button
                type="button"
                onClick={() => setAutoScroll(!autoScroll)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                  autoScroll
                    ? isFoxconn
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-[#76B900]/10 border-[#76B900]/30 text-[#76B900]'
                    : isFoxconn
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                }`}
                title="Tự động cuộn xuống dòng mới nhất"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    autoScroll
                      ? isFoxconn
                        ? 'bg-blue-600 animate-pulse'
                        : 'bg-[#76B900] animate-pulse'
                      : 'bg-slate-400'
                  }`}
                />
                <span className="text-[10px] sm:text-[11px] whitespace-nowrap">Auto-scroll</span>
              </button>

              {/* Xóa Terminal */}
              <button
                type="button"
                onClick={onClearLogs}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                  isFoxconn
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    : 'bg-zinc-950 hover:bg-zinc-800 border-zinc-800 text-zinc-400'
                }`}
                title="Làm sạch danh sách nhật ký"
              >
                <span>🧹</span>
                <span className="text-[10px] sm:text-[11px] hidden xs:inline whitespace-nowrap">
                  Xóa
                </span>
              </button>

              {/* Xuất Báo Cáo Log */}
              <button
                type="button"
                onClick={onExportLogs}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                  isFoxconn
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    : 'bg-zinc-950 hover:bg-zinc-800 border-zinc-800 text-zinc-400'
                }`}
                title="Tải về file nhật ký định dạng JSON"
              >
                <span>📥</span>
                <span className="text-[10px] sm:text-[11px] hidden xs:inline whitespace-nowrap">
                  Xuất Log
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Terminal View: Tối ưu hiển thị cho Responsive */}
      <div
        ref={logContainerRef}
        className={`mt-3 rounded-xl border p-2 sm:p-3 font-mono text-xs max-h-80 sm:max-h-96 overflow-y-auto space-y-2 select-text transition-all ${
          isFoxconn ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-black/95 text-zinc-200 border-zinc-800'
        }`}
      >
        {logs.length === 0 ? (
          <div className="py-10 text-center space-y-2 font-sans">
            <div className="text-2xl">📋</div>
            <p className="text-slate-400 text-xs font-medium">
              Không có sự kiện ALABEL nào phù hợp với bộ lọc hiện tại.
            </p>
            {(filterLevel !== 'ALL' || keyword) && (
              <button
                type="button"
                onClick={() => {
                  setFilterLevel('ALL');
                  setKeyword('');
                }}
                className={`text-[11px] font-bold underline cursor-pointer ${
                  isFoxconn ? 'text-blue-400 hover:text-blue-300' : 'text-[#76B900] hover:underline'
                }`}
              >
                Đặt lại bộ lọc để xem toàn bộ log
              </button>
            )}
          </div>
        ) : (
          logs.map((log) => {
            const isExpanded = expandedLogId === log.id;
            const style = getLevelBadge(log.level);

            return (
              <div
                key={log.id}
                className={`rounded-lg border border-white/5 transition-all border-l-4 ${style.border} ${style.bgHighlight} hover:bg-white/10`}
              >
                {/* 3.1. Phiên Bản DESKTOP & TABLET NGANG (>= md): Layout hàng ngang 1 dòng chuẩn chỉnh */}
                <div
                  onClick={() => toggleExpandLog(log.id)}
                  className="hidden md:flex items-center justify-between gap-3 p-2.5 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Timestamp */}
                    <span className="text-slate-400 text-[11px] font-mono shrink-0 w-24">
                      [{log.timestamp}]
                    </span>

                    {/* Level Badge */}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 text-center w-18 border ${style.badge}`}
                    >
                      {log.level}
                    </span>

                    {/* Action Tag */}
                    <span className="font-bold text-cyan-400 text-xs font-mono shrink-0">
                      [{log.action}]
                    </span>

                    {/* Target Pill */}
                    <span className="text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 border border-amber-400/20">
                      {log.target}
                    </span>

                    {/* Message */}
                    <span className="text-slate-300 text-xs truncate flex-1 min-w-0">
                      {log.message}
                    </span>
                  </div>

                  {/* Latency & Chi tiết button */}
                  <div className="flex items-center gap-3 shrink-0 text-[11px]">
                    {log.latencyMs && (
                      <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        ⚡ {log.latencyMs}ms
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${
                        isExpanded
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isExpanded ? '▲ Thu gọn' : '▼ JSON'}
                    </span>
                  </div>
                </div>

                {/* 3.2. Phiên Bản MOBILE (< md): Card phân tầng rõ ràng, không bị ngắt dòng lung tung */}
                <div
                  onClick={() => toggleExpandLog(log.id)}
                  className="md:hidden p-2.5 space-y-1.5 cursor-pointer select-none"
                >
                  {/* Hàng 1: Level + Action + Latency + Toggle Button */}
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border shrink-0 ${style.badge}`}
                      >
                        {log.level}
                      </span>
                      <span className="font-bold text-cyan-400 text-xs font-mono truncate">
                        [{log.action}]
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                      {log.latencyMs && (
                        <span className="text-emerald-400 font-mono text-[9px]">
                          ⚡ {log.latencyMs}ms
                        </span>
                      )}
                      <span className="text-slate-400 text-[10px] font-mono">
                        {log.timestamp.split(' ')[1] || log.timestamp}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded transition-all ${
                          isExpanded
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {isExpanded ? '▲' : '▼ JSON'}
                      </span>
                    </div>
                  </div>

                  {/* Hàng 2: Target Badge */}
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="text-slate-400">Target:</span>
                    <span className="text-amber-300 font-mono font-bold bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20 truncate max-w-full">
                      {log.target}
                    </span>
                  </div>

                  {/* Hàng 3: Toàn bộ nội dung Message (Không bị truncate khó nhìn) */}
                  <div className="text-[11px] text-slate-200 leading-snug wrap-break-word pt-0.5">
                    {log.message}
                  </div>
                </div>

                {/* 3.3. Khung chi tiết Payload & Response (JSON Inspector) */}
                {isExpanded && (
                  <div className="p-2.5 sm:p-3 border-t border-white/10 bg-black/60 space-y-2.5 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                      {/* Request Payload Box */}
                      <div className="rounded-lg bg-black/80 border border-white/10 p-2.5">
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Request Payload
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyJson(`${log.id}-req`, log.payload, e)}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition-all cursor-pointer"
                          >
                            {copiedKey === `${log.id}-req` ? '✓ Đã chép' : 'Sao chép'}
                          </button>
                        </div>
                        <pre className="text-emerald-300 text-[10px] font-mono overflow-x-auto max-h-48 p-1 leading-relaxed selection:bg-emerald-800">
                          {JSON.stringify(log.payload, null, 2)}
                        </pre>
                      </div>

                      {/* Response Body Box */}
                      {log.response && (
                        <div className="rounded-lg bg-black/80 border border-white/10 p-2.5">
                          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              Response Body
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleCopyJson(`${log.id}-res`, log.response, e)}
                              className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition-all cursor-pointer"
                            >
                              {copiedKey === `${log.id}-res` ? '✓ Đã chép' : 'Sao chép'}
                            </button>
                          </div>
                          <pre className="text-cyan-300 text-[10px] font-mono overflow-x-auto max-h-48 p-1 leading-relaxed selection:bg-cyan-800">
                            {JSON.stringify(log.response, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
