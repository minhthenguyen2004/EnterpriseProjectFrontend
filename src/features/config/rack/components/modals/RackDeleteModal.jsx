import useTheme from '../../../../../hooks/useTheme';

export default function RackDeleteModal({
  isOpen,
  rackItem,
  onClose,
  onConfirmDelete
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!isOpen || !rackItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-800 text-white shadow-2xl backdrop-blur-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Warning Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-500 flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-black tracking-tight mb-2">
            Xác nhận xóa cấu hình Tủ Rack / Slot?
          </h3>

          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
            Bạn có chắc chắn muốn xóa cấu hình Slot{' '}
            <strong className="text-rose-600 dark:text-rose-400 font-bold">
              {rackItem.slot_name}
            </strong>{' '}
            (Slot #{rackItem.slot_number}) thuộc tủ Rack{' '}
            <strong className={`${ isFoxconn ? "text-slate-800" : "text-white"} font-bold`}>
              {rackItem.rack}
            </strong>{' '}
            tại nhà máy{' '}
            <strong className={`${ isFoxconn ? "text-slate-800" : "text-white"} font-bold`}>
              {rackItem.factory}
            </strong>{' '}
            không?
          </p>

          {/* Configuration Preview Card */}
          <div
            className={`p-3.5 rounded-xl border text-xs space-y-1.5 mb-4 ${
              isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/70 border-zinc-800'
            }`}
          >
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">IP Address:</span>
              <span className="font-mono font-bold">{rackItem.ip_address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">Vị trí:</span>
              <span className="font-medium">
                {rackItem.floor} - {rackItem.room}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">Sản phẩm & Nhóm:</span>
              <span className="font-medium">
                {rackItem.product} ({rackItem.group})
              </span>
            </div>
          </div>

          {/* Safety Notice */}
          <div
            className={`p-3 rounded-xl border text-[11px] mb-6 ${
              isFoxconn
                ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
            }`}
          >
            <span className="font-bold">⚠️ Lưu ý an toàn:</span> Thao tác này sẽ xóa bản ghi khỏi danh mục cấu hình hệ thống và không thể hoàn tác.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={onConfirmDelete}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md shadow-rose-900/20 flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Xác nhận xóa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

