import { useState, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';

/**
 * Modal Ghi Nhận Kiểm Định Dung Sai & Reset Chu Kỳ Khay Chứa
 */
export default function CarrierInspectionModal({ carrier, isOpen, onClose, onConfirm }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [inspector, setInspector] = useState('V109281 - Nguyễn Văn An (QC)');
  const [coplanarity, setCoplanarity] = useState('0.02');
  const [result, setResult] = useState('PASS');
  const [resetCycles, setResetCycles] = useState(true);
  const [notes, setNotes] = useState('Kiểm tra định kỳ độ phẳng 4 góc và độ dơ cơ học chốt định vị P1-P4. Đạt tiêu chuẩn.');

  useEffect(() => {
    if (carrier) {
      setResetCycles(carrier.usagePercentage >= 80);
      setCoplanarity(carrier.coplanarityDeviation ? String(carrier.coplanarityDeviation) : '0.02');
      setResult('PASS');
    }
  }, [carrier]);

  if (!isOpen || !carrier) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(carrier.id, {
      inspector,
      coplanarity: Number(coplanarity),
      result,
      resetCycles,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isFoxconn ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-900 border-zinc-800 text-zinc-100'
        }`}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div
            className={`p-4 border-b flex items-center justify-between ${
              isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                🛠️
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  NGHIỆM THU KIỂM ĐỊNH & BẢO TRÌ KHAY
                </h3>
                <p className="text-[11px] text-slate-400 font-bold">
                  Mã khay: <span className="font-bold text-slate-700 dark:text-zinc-200">{carrier.carrierCode}</span> ({carrier.carrierType})
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

          {/* Form Body */}
          <div className="p-5 space-y-4 text-xs">
            {/* Chu kỳ hiện tại */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
            }`}>
              <div>
                <span className="text-slate-500 dark:text-zinc-400">Chu kỳ hiện tại: </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {carrier.currentCycles} / {carrier.maxCycles} ({carrier.usagePercentage}%)
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-zinc-400">Giờ từ lần KT cuối: </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {carrier.hoursSinceLastInspection}h
                </span>
              </div>
            </div>

            {/* Chuyên viên kiểm định */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
                Kỹ thuật viên / Chuyên viên QC phụ trách (*)
              </label>
              <input
                type="text"
                required
                value={inspector}
                onChange={(e) => setInspector(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border font-semibold focus:outline-none ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                }`}
              />
            </div>

            {/* Độ lệch dung sai phẳng */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
                  Độ phẳng đo thực tế (mm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={coplanarity}
                  onChange={(e) => setCoplanarity(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border font-bold focus:outline-none ${
                    isFoxconn
                      ? 'bg-white border-slate-300 text-slate-800'
                      : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
                  Kết luận nghiệm thu
                </label>
                <select
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border font-bold focus:outline-none cursor-pointer ${
                    result === 'PASS'
                      ? 'text-emerald-500'
                      : 'text-rose-500'
                  } ${
                    isFoxconn
                      ? 'bg-white border-slate-300'
                      : 'bg-zinc-950 border-zinc-700'
                  }`}
                >
                  <option value="PASS">🟢 ĐẠT (PASS)</option>
                  <option value="FAIL">🔴 KHÔNG ĐẠT (FAIL)</option>
                </select>
              </div>
            </div>

            {/* Tùy chọn Reset chu kỳ */}
            <div
              onClick={() => setResetCycles(!resetCycles)}
              className={`p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                resetCycles
                  ? isFoxconn
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-[#76B900]/10 border-[#76B900]/30'
                  : isFoxconn
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-zinc-950 border-zinc-800'
              }`}
            >
              <input
                type="checkbox"
                checked={resetCycles}
                onChange={() => {}}
                className="mt-0.5 w-4 h-4 cursor-pointer"
              />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  Đặt lại (Reset) chu kỳ vận hành về 0 lượt
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Tích chọn khi khay đã được thay mới linh kiện hao mòn, chốt định vị hoặc bảo trì đại tu.
                </div>
              </div>
            </div>

            {/* Ghi chú */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
                Ghi chú bảo dưỡng / Số phiếu kiểm định
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
              Hủy bỏ
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Xác Nhận Nghiệm Thu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
