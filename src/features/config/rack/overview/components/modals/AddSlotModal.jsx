import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function AddSlotModal({
  isOpen,
  onClose,
  onSubmit
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [slotNumber, setSlotNumber] = useState('');
  const [slotName, setSlotName] = useState('');
  const [status, setStatus] = useState('approved'); // 'approved' | 'rejected'
  const [ipAddress, setIpAddress] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slotNumber.trim()) {
      setError('Vui lòng nhập số định danh cho Slot');
      return;
    }

    onSubmit({
      slot_number: slotNumber.trim(),
      slot_name: slotName.trim() || `SLOT-${slotNumber.trim().padStart(2, '0')}`,
      status,
      ip_address: ipAddress.trim()
    });

    // Reset
    setSlotNumber('');
    setSlotName('');
    setStatus('approved');
    setIpAddress('');
    setError('');
  };

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
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isFoxconn ? 'bg-slate-50/80 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm border ${
                isFoxconn
                  ? 'bg-blue-50 border-blue-200 text-[#002766]'
                  : 'bg-[#76B900]/10 border-[#76B900]/30 text-[#76B900]'
              }`}
            >
              🔌
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Thêm Mới Khe Cắm (Slot)</h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Nhập số định danh và chọn trạng thái phê duyệt
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 1. Số định danh cho Slot */}
          <div>
            <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-zinc-300">
              Số định danh cho Slot <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              placeholder="VD: 01, 02, 12..."
              value={slotNumber}
              onChange={(e) => {
                setSlotNumber(e.target.value);
                if (error) setError('');
              }}
              className={`w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border outline-hidden transition-colors ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              } ${error ? 'border-rose-500' : ''}`}
            />
            {error && <p className="text-[10px] text-rose-500 mt-1">{error}</p>}
          </div>

          {/* 2. Tên hiển thị Slot (Tùy chọn) */}
          <div>
            <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-zinc-300">
              Tên hiển thị Slot (Slot Name)
            </label>
            <input
              type="text"
              placeholder={`Mặc định: SLOT-${slotNumber ? slotNumber.padStart(2, '0') : '01'}`}
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              className={`w-full px-3 py-2 text-xs font-medium rounded-xl border outline-hidden transition-colors ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>

          {/* 3. Trạng thái: approved or rejected */}
          <div>
            <label className="block text-xs font-bold mb-2 text-slate-700 dark:text-zinc-300">
              Trạng thái phê duyệt <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Option Approved */}
              <label
                onClick={() => setStatus('approved')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  status === 'approved'
                    ? isFoxconn
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900'
                      : 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-300'
                    : isFoxconn
                    ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    status === 'approved' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                  }`}
                >
                  {status === 'approved' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>✅</span> Approved
                  </div>
                  <div className="text-[10px] opacity-75">Đã duyệt sẵn sàng</div>
                </div>
              </label>

              {/* Option Rejected */}
              <label
                onClick={() => setStatus('rejected')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  status === 'rejected'
                    ? isFoxconn
                      ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 text-rose-900'
                      : 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/30 text-rose-300'
                    : isFoxconn
                    ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    status === 'rejected' ? 'border-rose-500 bg-rose-500' : 'border-slate-300'
                  }`}
                >
                  {status === 'rejected' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>⛔</span> Rejected
                  </div>
                  <div className="text-[10px] opacity-75">Từ chối / Khóa</div>
                </div>
              </label>
            </div>
          </div>

          {/* 4. IP Address (Tùy chọn) */}
          <div>
            <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-zinc-300">
              Địa chỉ IP (IP Address)
            </label>
            <input
              type="text"
              placeholder="VD: 192.168.1.101"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className={`w-full px-3 py-2 text-xs font-mono font-semibold rounded-xl border outline-hidden transition-colors ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>

          {/* Actions */}
          <div
            className={`pt-4 border-t flex items-center justify-end gap-2.5 ${
              isFoxconn ? 'border-slate-200' : 'border-zinc-800'
            }`}
          >
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
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
              }`}
            >
              <span>Xác nhận Thêm Slot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

