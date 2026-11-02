import { useState, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';

/**
 * Modal Xác Nhận Khóa Hoặc Mở Khóa Khay Chứa
 */
export default function CarrierLockActionModal({
  carrier,
  isOpen,
  onClose,
  onConfirmLock,
  onConfirmUnlock,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isCurrentlyLocked = carrier?.status === 'LOCKED';
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (carrier) {
      setReason(
        isCurrentlyLocked
          ? 'Đã khắc phục lỗi cơ học và kiểm tra độ phẳng đạt yêu cầu, mở khóa đưa vào vận hành.'
          : 'Khóa cách ly thủ công do phát hiện bất thường trong quá trình chuyển làn trạm AutoLine.'
      );
    }
  }, [carrier, isCurrentlyLocked]);

  if (!isOpen || !carrier) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCurrentlyLocked) {
      onConfirmUnlock(carrier.id);
    } else {
      onConfirmLock(carrier.id, reason);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isFoxconn ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-900 border-zinc-800 text-zinc-100'
        }`}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div
            className={`p-4 border-b flex items-center justify-between ${
              isCurrentlyLocked
                ? isFoxconn
                  ? 'bg-emerald-50 border-emerald-100'
                  : 'bg-emerald-950/40 border-emerald-900/50'
                : isFoxconn
                ? 'bg-rose-50 border-rose-100'
                : 'bg-rose-950/40 border-rose-900/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base ${
                  isCurrentlyLocked
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : 'bg-rose-500/20 text-rose-500'
                }`}
              >
                {isCurrentlyLocked ? '🔓' : '🔒'}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isCurrentlyLocked ? 'MỞ KHÓA KHAY CHỨA' : 'CƯỠNG CHẾ KHÓA KHAY'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-bold">
                  Mã khay: <span className="font-bold text-slate-800 dark:text-zinc-200">{carrier.carrierCode}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 text-xs">
            <p className="text-slate-600 dark:text-zinc-300">
              {isCurrentlyLocked
                ? 'Khay này đang ở trạng thái LOCKED. Khi mở khóa, trạm AutoLine và đầu đọc RFID sẽ cho phép khay tiếp tục quay trở lại chuyền sản xuất.'
                : 'CẢNH BÁO: Khi bị khóa (LOCKED), trạm AutoLine sẽ lập tức từ chối khay tại đầu vào và tự động kích hoạt PLC đẩy khay ra làn bảo dưỡng.'}
            </p>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
                Lý do thực hiện (*)
              </label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập lý do khóa hoặc mở khóa..."
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                }`}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className={`p-4 border-t flex items-center justify-end gap-2.5 ${
              isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                isCurrentlyLocked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20'
              }`}
            >
              <span>{isCurrentlyLocked ? 'Xác Nhận Mở Khóa' : 'Xác Nhận Khóa Khay'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
