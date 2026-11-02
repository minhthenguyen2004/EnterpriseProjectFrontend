/**
 * Modal đối chiếu chi tiết Trước vs Sau (Audit Log Diff Viewer Modal)
 * Hiển thị rõ ràng các trường dữ liệu thay đổi giữa 2 phiên bản: Before (Trước) vs After (Sau).
 */
export default function AuditLogDiffModal({
  logItem,
  isOpen,
  isFoxconn = false,
  onClose,
  onRollback
}) {
  if (!isOpen || !logItem) return null;

  const diffData = logItem.diff || {};
  const beforeObj = diffData.before || {};
  const afterObj = diffData.after || {};

  // Gom tất cả các keys từ cả Before và After
  const allKeys = Array.from(
    new Set([...Object.keys(beforeObj || {}), ...Object.keys(afterObj || {})])
  );

  const formatValue = (val) => {
    if (val === undefined || val === null) {
      return <span className="text-slate-400 dark:text-zinc-600 italic">null (Không có)</span>;
    }
    if (typeof val === 'object') {
      return <pre className="font-mono text-[11px] whitespace-pre-wrap">{JSON.stringify(val, null, 2)}</pre>;
    }
    if (typeof val === 'boolean') {
      return (
        <span className={val ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
          {val ? 'TRUE' : 'FALSE'}
        </span>
      );
    }
    return String(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-950 border-zinc-800 text-zinc-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Header Modal */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between gap-3 ${
            isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/80 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🔍</span>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-black uppercase tracking-wider ${
                    isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
                  }`}
                >
                  Đối Chiếu Thay Đổi Phiên Bản (Diff Viewer)
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-zinc-800 dark:text-zinc-200">
                  #{logItem.id}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                Bảng: <span className="font-mono font-bold text-slate-700 dark:text-zinc-200">{logItem.targetTable}</span> | Thao tác: <span className="font-bold">{logItem.action}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-zinc-100 hover:bg-slate-200/50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Info bar: Time & Operator */}
        <div
          className={`px-5 py-2.5 border-b text-xs flex flex-wrap items-center justify-between gap-2 ${
            isFoxconn ? 'bg-blue-50/60 border-slate-200' : 'bg-zinc-900/40 border-zinc-800/80'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-slate-400 dark:text-zinc-500">Thời gian:</span>
            <span className="font-mono font-bold">{logItem.timestamp}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 dark:text-zinc-500">Người thực hiện:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded ${
                isFoxconn ? 'bg-white text-blue-900 border border-blue-200' : 'bg-zinc-800 text-[#76B900]'
              }`}
            >
              {logItem.operatorId} - {logItem.operatorName}
            </span>
          </div>
        </div>

        {/* Description box */}
        <div className="px-5 py-2.5 border-b border-inherit bg-slate-50/30 dark:bg-zinc-900/20 text-xs">
          <p className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 mb-0.5">Mô tả biến động:</p>
          <p className="text-slate-700 dark:text-zinc-200 italic">{logItem.description}</p>
        </div>

        {/* Diff content table: Before vs After */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
          {allKeys.length === 0 ? (
            <div className="py-8 text-center text-xs opacity-60">
              Không có trường thông số chi tiết nào được ghi nhận trong bản ghi này.
            </div>
          ) : (
            <div className="border rounded-xl overflow-hidden border-inherit">
              <div
                className={`grid grid-cols-12 text-xs font-black uppercase tracking-wider py-2 px-3 border-b select-none ${
                  isFoxconn
                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                <div className="col-span-4">Trường Thông Số (Field)</div>
                <div className="col-span-4 text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <span>◀ Trước (Before)</span>
                </div>
                <div className="col-span-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>Sau (After) ▶</span>
                </div>
              </div>

              <div
                className={`divide-y text-xs font-mono ${
                  isFoxconn ? 'divide-slate-200' : 'divide-zinc-800/80'
                }`}
              >
                {allKeys.map((key) => {
                  const bVal = beforeObj ? beforeObj[key] : undefined;
                  const aVal = afterObj ? afterObj[key] : undefined;
                  const isChanged = JSON.stringify(bVal) !== JSON.stringify(aVal);

                  return (
                    <div
                      key={key}
                      className={`grid grid-cols-12 py-2 px-3 items-center transition-colors ${
                        isChanged
                          ? isFoxconn
                            ? 'bg-amber-50/50'
                            : 'bg-amber-950/20'
                          : ''
                      }`}
                    >
                      <div className="col-span-4 font-bold truncate text-slate-700 dark:text-zinc-300">
                        {key}
                      </div>

                      <div className="col-span-4 pr-2 break-all text-rose-700 dark:text-rose-300 bg-rose-50/50 dark:bg-rose-950/20 p-1.5 rounded-lg mr-1">
                        {formatValue(bVal)}
                      </div>

                      <div className="col-span-4 break-all text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-1.5 rounded-lg">
                        {formatValue(aVal)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between gap-3 ${
            isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onRollback) onRollback(logItem);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
              isFoxconn
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]'
            }`}
          >
            <span>⏪</span>
            <span>Hoàn Tác Về Phiên Bản Này (Rollback)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
