import useTheme from '../../../../../../hooks/useTheme';

/**
 * Modal xác nhận trước khi thực hiện hành động hoàn tác SWITCH_UndoLinkSFC hoặc ADAPTER_UndoLinkSFC
 */
export default function UndoLinkConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isExecuting,
  sn,
  mode = 'switch',
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!isOpen) return null;

  const isAdapter = mode === 'adapter';
  const actionTitle = isAdapter ? 'ADAPTER_UndoLinkSFC' : 'SWITCH_UndoLinkSFC';
  const targetSystem = isAdapter ? 'SFC Adapter' : 'SFC Switch';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl transition-all scale-100 ${
          isFoxconn ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-900 border-zinc-800 text-white'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Xác Nhận {actionTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Hoàn tác và giải phóng liên kết linh kiện {targetSystem}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 leading-relaxed mb-6">
          Bạn có chắc chắn muốn hủy liên kết toàn bộ linh kiện của Serial Number{' '}
          <strong className="font-mono text-amber-900 dark:text-amber-200">{sn}</strong> trên trạm hiện tại qua{' '}
          <strong>{targetSystem}</strong> không? Hành động này sẽ reset cờ SFC về trạng thái chưa liên kết.
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={isExecuting}
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            Hủy Bỏ
          </button>
          <button
            type="button"
            disabled={isExecuting}
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/20 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isExecuting ? 'Đang hoàn tác...' : 'Xác Nhận Hoàn Tác'}
          </button>
        </div>
      </div>
    </div>
  );
}
