import { useSelector } from 'react-redux';
import useTheme from '../../../../../hooks/useTheme';

/**
 * ActionLogRestoreModal
 * Hộp thoại cảnh báo và xác nhận quy trình phục hồi an toàn (Safe Restore) 2 bước.
 * Tự động khóa Operator ID theo phiên đăng nhập, bắt buộc nhập lý do hoàn nguyên.
 */
export default function ActionLogRestoreModal({
  isOpen,
  onClose,
  log,
  restoreReason,
  setRestoreReason,
  confirmRisk,
  setConfirmRisk,
  isRestoring,
  onConfirmRestore,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Lấy mã nhân viên đang đăng nhập từ redux auth store
  const auth = useSelector((state) => state.auth);
  const operatorId = auth?.cardId || auth?.username || auth?.user?.empNo || 'NV-2026-08819';

  if (!isOpen || !log) return null;

  const isFormValid =
    restoreReason && restoreReason.trim().length >= 10 && confirmRisk && !isRestoring;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Header Cảnh Báo An Toàn */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isFoxconn
              ? 'border-rose-200 bg-rose-50'
              : 'border-rose-500/20 bg-rose-500/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                isFoxconn ? 'bg-rose-100 text-rose-600' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
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
              <h3
                className={`text-sm font-bold uppercase tracking-wider ${
                  isFoxconn ? 'text-rose-700' : 'text-rose-400'
                }`}
              >
                Xác Nhận Phục Hồi An Toàn (Safe State Restore)
              </h3>
              <p
                className={`text-xs ${
                  isFoxconn ? 'text-rose-800 font-medium' : 'text-rose-300'
                }`}
              >
                Thao tác cấp độ cao: Hoàn nguyên trạng thái CSDL về thời điểm trước tác vụ.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isRestoring}
            className={`p-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-50 ${
              isFoxconn
                ? 'text-slate-400 hover:text-slate-700 hover:bg-rose-100'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Cảnh Báo Nguy Hiểm */}
          <div
            className={`p-3.5 rounded-xl border space-y-1 ${
              isFoxconn
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              <span>⚠️</span>
              <span>LƯU Ý QUAN TRỌNG TRƯỚC KHI RESTORE:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Việc rollback sẽ ghi đè trực tiếp trạng thái hiện tại của đối tượng trong bảng{' '}
              <strong
                className={`font-mono ${
                  isFoxconn ? 'text-amber-950 font-extrabold' : 'text-zinc-100'
                }`}
              >
                {log.targetTable}
              </strong>{' '}
              trở về snapshot cũ. Điều này có thể làm thay đổi thứ tự bước Router hoặc hủy bỏ các linh kiện đã liên kết.
            </p>
          </div>

          {/* Tóm Tắt Mục Tiêu Phục Hồi */}
          <div
            className={`p-3.5 rounded-xl border space-y-2 ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-2 border-b ${
                isFoxconn ? 'border-slate-200' : 'border-zinc-800'
              }`}
            >
              <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Bản Ghi Gốc:</span>
              <span className={`font-mono font-bold ${isFoxconn ? 'text-slate-800' : 'text-zinc-100'}`}>
                {log.id}
              </span>
            </div>
            <div
              className={`flex items-center justify-between pb-2 border-b ${
                isFoxconn ? 'border-slate-200' : 'border-zinc-800'
              }`}
            >
              <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Đối Tượng Mục Tiêu:</span>
              <span className={`font-mono font-bold ${isFoxconn ? 'text-blue-600' : 'text-blue-400'}`}>
                [{log.targetType.toUpperCase()}] {log.targetCode}
              </span>
            </div>
            <div
              className={`flex items-center justify-between pb-2 border-b ${
                isFoxconn ? 'border-slate-200' : 'border-zinc-800'
              }`}
            >
              <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Hành Động Cần Hoàn Nguyên:</span>
              <span className={`font-bold uppercase ${isFoxconn ? 'text-purple-700' : 'text-purple-400'}`}>
                {log.actionType}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Bảng CSDL Phục Hồi:</span>
              <span className={`font-mono font-bold ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>
                {log.targetTable}
              </span>
            </div>
          </div>

          {/* Người Phục Hồi (Read-only từ phiên đăng nhập) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                className={`font-bold flex items-center gap-1 ${
                  isFoxconn ? 'text-slate-700' : 'text-zinc-200'
                }`}
              >
                <span>Người Thực Hiện Phục Hồi (Operator ID)</span>
                <span className="text-[11px]">🔒</span>
              </label>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isFoxconn
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                TỰ ĐỘNG XÁC THỰC
              </span>
            </div>
            <input
              type="text"
              value={operatorId}
              readOnly
              disabled
              className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold cursor-not-allowed select-none ${
                isFoxconn
                  ? 'bg-slate-100 border-slate-300 text-slate-700'
                  : 'bg-zinc-950/80 border-zinc-700 text-zinc-300'
              }`}
            />
          </div>

          {/* Lý Do Phục Hồi (Bắt buộc nhập) */}
          <div>
            <label
              className={`block font-bold mb-1 ${
                isFoxconn ? 'text-slate-700' : 'text-zinc-200'
              }`}
            >
              Lý Do Phục Hồi (Bắt buộc, tối thiểu 10 ký tự) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={restoreReason}
              onChange={(e) => setRestoreReason(e.target.value)}
              disabled={isRestoring}
              placeholder="Ví dụ: Kỹ sư thao tác nhầm bước Router trong ca sáng, đã kiểm tra hiện trường đủ điều kiện rollback..."
              className={`w-full px-3 py-2 rounded-xl border text-xs transition-all ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100'
              }`}
            />
            <div className={`flex justify-between items-center mt-1 text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
              <span>Ghi rõ nguyên nhân để lưu vào hồ sơ kiểm toán ISO/SFC</span>
              <span
                className={
                  restoreReason.length < 10
                    ? 'text-amber-500 font-bold'
                    : isFoxconn
                    ? 'text-emerald-600 font-bold'
                    : 'text-[#76B900] font-bold'
                }
              >
                {restoreReason.length}/10 ký tự
              </span>
            </div>
          </div>

          {/* Hộp Kiểm Xác Nhận Trách Nhiệm */}
          <div className="pt-2">
            <label
              className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                isFoxconn
                  ? 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  : 'border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60'
              }`}
            >
              <input
                type="checkbox"
                checked={confirmRisk}
                onChange={(e) => setConfirmRisk(e.target.checked)}
                disabled={isRestoring}
                className="mt-0.5 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
              <span
                className={`text-xs font-semibold leading-relaxed ${
                  isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                }`}
              >
                Tôi xác nhận đã kiểm tra đối tượng thực tế trên chuyền và chịu trách nhiệm về quyết định phục hồi trạng thái này.
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
            isFoxconn ? 'border-slate-200 bg-slate-50' : 'border-zinc-800 bg-zinc-950/30'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isRestoring}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
            }`}
          >
            Hủy Bỏ
          </button>

          <button
            type="button"
            onClick={() => onConfirmRestore(operatorId)}
            disabled={!isFormValid}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${
              isFormValid
                ? 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer active:scale-98'
                : isFoxconn
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
            }`}
          >
            {isRestoring ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Đang Phục Hồi...</span>
              </>
            ) : (
              <>
                <span>⚠️</span>
                <span>Xác Nhận Phục Hồi Trạng Thái</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}