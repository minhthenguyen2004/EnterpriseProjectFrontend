import { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';

/**
 * ActionLogDiffModal
 * Modal đối soát trực quan so sánh dữ liệu Cũ (Before) và Mới (After) theo 2 cột song song (Side-by-Side)
 * Hỗ trợ chuyển đổi giữa xem dạng bảng thuộc tính và dạng JSON Raw.
 */

export default function ActionLogDiffModal({
  isOpen,
  onClose,
  log,
  diffViewMode,
  setDiffViewMode,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [copied, setCopied] = useState(false);

  if (!isOpen || !log) return null;

  const beforeState = log.diff?.beforeState || {};
  const afterState = log.diff?.afterState || {};
  const changedFields = log.diff?.changedFields || [];

  // Gom toàn bộ key thuộc tính duy nhất từ 2 snapshot
  const allKeys = Array.from(
    new Set([...Object.keys(beforeState), ...Object.keys(afterState)])
  );

  const handleCopyDiff = () => {
    const diffPayload = {
      actionId: log.id,
      targetCode: log.targetCode,
      targetTable: log.targetTable,
      changedFields,
      beforeState,
      afterState,
    };
    navigator.clipboard.writeText(JSON.stringify(diffPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-4xl rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-zinc-900 border-zinc-700 text-white'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                isFoxconn ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-500/10 text-indigo-400'
              }`}
            >
              <span className="text-lg">⚖️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Đối Soát Diff Trạng Thái Cũ vs Mới
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold">
                  {log.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Mục tiêu: <strong className="text-blue-600 dark:text-blue-400">{log.targetCode}</strong> | Bảng CSDL:{' '}
                <strong className="font-mono text-slate-700 dark:text-zinc-200">{log.targetTable}</strong>
              </p>
            </div>
          </div>

          {/* Toggle Chế Độ Xem Bảng / JSON */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setDiffViewMode('table')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  diffViewMode === 'table'
                    ? isFoxconn
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'bg-zinc-800 text-[#76B900] shadow-xs'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                📊 Dạng Bảng
              </button>
              <button
                type="button"
                onClick={() => setDiffViewMode('json')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  diffViewMode === 'json'
                    ? isFoxconn
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'bg-zinc-800 text-[#76B900] shadow-xs'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                📝 Raw JSON Diff
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyDiff}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-700 transition-all cursor-pointer"
            >
              {copied ? '✓ Đã chép' : 'Sao chép Diff'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Tóm tắt số trường biến động */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400">
            <div className="flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>
                Phát hiện <strong>{changedFields.length}</strong> trường thuộc tính có sự biến động sau thao tác{' '}
                <strong className="uppercase">[{log.actionType}]</strong>.
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              {changedFields.map((f) => (
                <span
                  key={f}
                  className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {diffViewMode === 'table' ? (
            /* Chế Độ 1: Bảng So Sánh 2 Cột Song Song */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột 1: Trạng Thái Cũ (Before State) */}
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/20 overflow-hidden">
                <div className="px-4 py-2.5 bg-rose-500/10 border-b border-rose-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                    <span>🔴</span>
                    <span>TRẠNG THÁI CŨ (BEFORE / OLD STATE)</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-rose-500 px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    Snapshot Trước Khi Tác Vụ
                  </span>
                </div>

                <div className="divide-y divide-rose-500/10 font-mono text-xs">
                  {allKeys.map((key) => {
                    const isChanged = changedFields.includes(key);
                    const val = beforeState[key];
                    return (
                      <div
                        key={key}
                        className={`p-3 flex items-start justify-between gap-3 ${
                          isChanged ? 'bg-rose-500/10 font-bold' : ''
                        }`}
                      >
                        <span className="text-slate-500 dark:text-zinc-400 font-semibold">{key}:</span>
                        <span
                          className={`break-all text-right ${
                            isChanged
                              ? 'text-rose-700 dark:text-rose-300'
                              : 'text-slate-700 dark:text-zinc-300'
                          }`}
                        >
                          {val !== undefined ? String(val) : '<Trống / Không tồn tại>'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cột 2: Trạng Thái Mới (After State) */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 overflow-hidden">
                <div className="px-4 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <span>🟢</span>
                    <span>TRẠNG THÁI MỚI (AFTER / NEW STATE)</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Dữ Liệu Hiện Tại CSDL
                  </span>
                </div>

                <div className="divide-y divide-emerald-500/10 font-mono text-xs">
                  {allKeys.map((key) => {
                    const isChanged = changedFields.includes(key);
                    const val = afterState[key];
                    return (
                      <div
                        key={key}
                        className={`p-3 flex items-start justify-between gap-3 ${
                          isChanged ? 'bg-emerald-500/10 font-bold' : ''
                        }`}
                      >
                        <span className="text-slate-500 dark:text-zinc-400 font-semibold">{key}:</span>
                        <span
                          className={`break-all text-right ${
                            isChanged
                              ? 'text-emerald-700 dark:text-[#76B900]'
                              : 'text-slate-700 dark:text-zinc-300'
                          }`}
                        >
                          {val !== undefined ? String(val) : '<Trống / Không tồn tại>'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Chế Độ 2: Raw JSON Diff Viewer */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
              <div>
                <span className="block font-bold text-rose-600 dark:text-rose-400 mb-1.5">
                  🔴 Old State Snapshot (JSON):
                </span>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-rose-300 dark:bg-zinc-950 border border-rose-500/30 overflow-x-auto max-h-80">
                  {JSON.stringify(beforeState, null, 2)}
                </pre>
              </div>

              <div>
                <span className="block font-bold text-emerald-600 dark:text-emerald-400 mb-1.5">
                  🟢 New State Snapshot (JSON):
                </span>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-300 dark:bg-zinc-950 border border-emerald-500/30 overflow-x-auto max-h-80">
                  {JSON.stringify(afterState, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
            }`}
          >
            Đóng Hộp Thoại
          </button>
        </div>
      </div>
    </div>
  );
}
