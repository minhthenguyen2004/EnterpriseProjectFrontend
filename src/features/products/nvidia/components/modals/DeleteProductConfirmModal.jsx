import React from 'react';
import useTheme from '../../../../../hooks/useTheme';

export default function DeleteProductConfirmModal({
  isOpen,
  item = null,
  onClose,
  onConfirm,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden transform transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center gap-3 ${
            isFoxconn ? 'bg-red-50/50 border-red-100' : 'bg-red-950/20 border-red-900/50'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-950/80 text-red-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-red-600 dark:text-red-400">
              Xác Nhận Xóa Model
            </h3>
            <p className="text-xs text-slate-400">
              Hành động này không thể hoàn tác sau khi xác nhận.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3 text-sm">
          <p>
            Bạn có chắc chắn muốn xóa model sản phẩm này khỏi cơ sở dữ liệu?
          </p>
          <div
            className={`p-3 rounded-xl border text-xs font-mono ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-800/70 border-zinc-700 text-zinc-200'
            }`}
          >
            <div>
              <strong>Model:</strong> {item.model}
            </div>
            <div className="mt-1">
              <strong>Product:</strong> {item.product}
            </div>
            <div className="mt-1 font-sans text-slate-500">
              {item.modelName}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-inherit flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm cursor-pointer"
          >
            Xác nhận Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

