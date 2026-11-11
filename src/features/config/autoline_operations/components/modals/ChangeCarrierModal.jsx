import { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';

export default function ChangeCarrierModal({
  isOpen,
  onClose,
  currentCarrier,
  onConfirmChange
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [newCarrierCode, setNewCarrierCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCarrierCode.trim()) return;
    onConfirmChange(newCarrierCode);
    setNewCarrierCode('');
  };

  const sampleJigs = ['CRR-B012 (Jig Pallet B)', 'CRR-C034 (Jig Pallet C)', 'CRR-E099 (Jig Buffer)'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200 ${
          isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-700'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isFoxconn ? 'bg-blue-50 text-[#002766]' : 'bg-[#76B900]/15 text-[#76B900]'
              }`}
            >
              <span className="text-base">🔄</span>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 dark:text-zinc-100 uppercase">
                ĐỔI CARRIER (JIG)
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Gán sản phẩm sang khay mang hàng mới
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-zinc-400">
              Khay mang hàng hiện tại:
            </label>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-950 font-mono font-bold text-xs text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800">
              {currentCarrier}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
              Mã Carrier (Jig) mới <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={newCarrierCode}
              onChange={(e) => setNewCarrierCode(e.target.value)}
              placeholder="Nhập hoặc quét mã khay mới (ví dụ: CRR-B012)..."
              className={`w-full px-3.5 py-2.5 text-xs font-mono font-bold rounded-xl border transition-all outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-[#002766]'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block mb-1.5 uppercase">
              Gợi ý khay đang sẵn sàng:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleJigs.map((jig) => (
                <button
                  key={jig}
                  type="button"
                  onClick={() => setNewCarrierCode(jig)}
                  className={`px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {jig}
                </button>
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                isFoxconn
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
              }`}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!newCarrierCode.trim()}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                newCarrierCode.trim()
                  ? isFoxconn
                    ? 'bg-[#002766] text-white hover:bg-[#003893]'
                    : 'bg-[#76B900] text-black hover:bg-[#86d400]'
                  : 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-zinc-800 text-slate-400'
              }`}
            >
              Xác nhận đổi Jig
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
