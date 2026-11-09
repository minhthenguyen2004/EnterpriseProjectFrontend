import useTheme from '../../../../../hooks/useTheme';
import { QUICK_NOTE_TAGS } from '../../mock/unlockCarrierMockData';

export default function UnlockGeneralInfoCard({
  generalInfo,
  onUpdateField,
  onToggleResetCycle,
  onQuickTagSelect
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200/70 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                isFoxconn
                  ? 'bg-blue-50 text-[#002766] border border-blue-200'
                  : 'bg-[#76B900]/15 text-[#76B900] border border-[#76B900]/30'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800 dark:text-zinc-100' : 'text-white'}`}>
                Thông tin chung
              </h2>
              <p className={`text-[11px] ${isFoxconn ? 'text-slate-500 dark:text-zinc-400' : 'text-gray-400'}`}>
                Khai báo thông số kiểm định & mở khóa
              </p>
            </div>
          </div>
        </div>

        {/* 5 Form Fields */}
        <div className="space-y-4">
          {/* Field 1: Mã nhân viên (Employee ID) */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isFoxconn ? 'text-slate-700 dark:text-zinc-300' : 'text-gray-300'}`}>
              Mã nhân viên <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={generalInfo.employeeId}
                onChange={(e) => onUpdateField('employeeId', e.target.value)}
                placeholder="Nhập mã NV (ví dụ: V1029384, EMP-8899)..."
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs font-semibold rounded-xl border transition-all outline-hidden ${
                  isFoxconn
                    ? 'bg-slate-50/80 border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                    : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
                }`}
              />
            </div>
          </div>

          {/* Field 2: Loại kiểm định (Inspection Type) */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isFoxconn ? 'text-slate-700 dark:text-zinc-300' : 'text-gray-300'}`}>
              Loại kiểm định <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={generalInfo.inspectionType}
                onChange={(e) => onUpdateField('inspectionType', e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border appearance-none transition-all outline-hidden cursor-pointer ${
                  isFoxconn
                    ? 'bg-slate-50/80 border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                    : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
                }`}
              >
                <option value="shift_start">Đầu ca (shift start)</option>
                <option value="periodic">Định kỳ (periodic)</option>
                <option value="manual">Đột xuất (manual)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Field 3: Reset số vòng (Cycle Count) - Switch dạng viên thuốc */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              generalInfo.resetCycleCount
                ? isFoxconn
                  ? 'bg-blue-50/60 border-blue-200/90'
                  : 'bg-[#76B900]/10 border-[#76B900]/30'
                : isFoxconn
                ? 'bg-slate-50/80 border-slate-200'
                : 'bg-zinc-950/40 border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className={`block text-xs font-bold ${isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-gray-200'}`}>
                  Reset số vòng (cycle count)
                </span>
                <span className={`text-[11px] ${isFoxconn ? 'text-slate-500 dark:text-zinc-400' : 'text-gray-400'}`}>
                  {generalInfo.resetCycleCount
                    ? 'Đưa chu kỳ khay về 0 sau bảo dưỡng'
                    : 'Giữ nguyên số chu kỳ hiện tại'}
                </span>
              </div>

              {/* Nút switch dạng viên thuốc */}
              <button
                type="button"
                role="switch"
                aria-checked={generalInfo.resetCycleCount}
                onClick={onToggleResetCycle}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  generalInfo.resetCycleCount
                    ? isFoxconn
                      ? 'bg-[#002766]'
                      : 'bg-[#76B900] shadow-[0_0_12px_rgba(118,185,0,0.5)]'
                    : isFoxconn
                    ? 'bg-slate-300'
                    : 'bg-zinc-700'
                }`}
                title="Bật/Tắt đặt lại số vòng tuần hoàn"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    generalInfo.resetCycleCount
                      ? 'translate-x-6'
                      : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold">
              <span
                className={`w-2 h-2 rounded-full ${
                  generalInfo.resetCycleCount
                    ? isFoxconn
                      ? 'bg-[#002766]'
                      : 'bg-[#76B900]'
                    : 'bg-slate-400'
                }`}
              />
              <span
                className={
                  generalInfo.resetCycleCount
                    ? isFoxconn
                      ? 'text-[#002766]'
                      : 'text-[#76B900]'
                    : 'text-slate-500 dark:text-zinc-400'
                }
              >
                Trạng thái: {generalInfo.resetCycleCount ? 'BẬT (Reset về 0)' : 'TẮT (Giữ nguyên)'}
              </span>
            </div>
          </div>

          {/* Field 4: Kết quả (Result) */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isFoxconn ? 'text-slate-700 dark:text-zinc-300' : 'text-gray-300'}`}>
              Kết quả kiểm định <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={generalInfo.result}
                onChange={(e) => onUpdateField('result', e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border appearance-none transition-all outline-hidden cursor-pointer ${
                  generalInfo.result === 'PASS'
                    ? isFoxconn
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-emerald-950/60 border-emerald-700/80 text-emerald-300'
                    : isFoxconn
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-red-950/60 border-red-700/80 text-red-300'
                }`}
              >
                <option value="PASS">✅ Đạt (Pass / Approved)</option>
                <option value="FAIL">❌ Lỗi (Fail / Rejected)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Field 5: Ghi chú (Notes / Reason) */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isFoxconn ? 'text-slate-700 dark:text-zinc-300' : 'text-gray-300'}`}>
              Ghi chú
            </label>
            <textarea
              rows={4}
              value={generalInfo.note}
              onChange={(e) => onUpdateField('note', e.target.value)}
              placeholder="Nhập lý do..."
              className={`w-full p-3 text-xs font-medium rounded-xl border transition-all outline-hidden resize-none ${
                isFoxconn
                  ? 'bg-slate-50/80 border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                  : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

