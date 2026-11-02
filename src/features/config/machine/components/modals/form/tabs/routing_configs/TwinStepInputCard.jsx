import { useId } from 'react';

/**
 * Khung thiết lập trạm song song (Add Twin Step Config Workspace):
 * Gồm 3 mục xếp theo hàng ngang: Twin Step (nhập số), 2 ô tick Allow Swap và Picker (Resolve SN).
 * Bên dưới có 2 nút: Cancel và Save.
 */
export default function TwinStepInputCard({
  twinStepForm = { twinStep: '', allowCarrierSwap: false, isPicker: false },
  errors = {},
  editingId = null,
  isFoxconn = false,
  onFieldChange,
  onCancel,
  onSave
}) {
  const formUid = useId();

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-xs'
          : 'bg-zinc-950/80 border-zinc-800 shadow-inner'
      }`}
    >
      {/* Tiêu đề phân khu */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{editingId ? '✏️' : '➕'}</span>
          <span
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            {editingId ? 'Chỉnh Sửa Trạm Song Song (Edit Twin Step)' : 'Thêm Trạm Song Song (Add Twin Step Config)'}
          </span>
          {editingId && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold">
              Đang Sửa
            </span>
          )}
        </div>
        <span
          className={`text-[11px] ${
            isFoxconn ? 'text-slate-500' : 'text-zinc-400'
          }`}
        >
          Trạm song song &amp; quy tắc hoán đổi khay
        </span>
      </div>

      {/* Hàng ngang gồm: Twin Step (nhập số), Allow Swap, Picker (Resolve SN), và Nút Cancel/Save */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
        {/* 1. Twin Step (nhập số) */}
        <div className="md:col-span-3">
          <label
            htmlFor={`${formUid}-twinStep`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Twin Step (Trạm) <span className="text-rose-500 font-black">*</span>
          </label>
          <input
            id={`${formUid}-twinStep`}
            type="number"
            min="1"
            step="1"
            value={twinStepForm.twinStep}
            onChange={(e) => onFieldChange('twinStep', e.target.value)}
            placeholder="VD: 11"
            className={`w-full px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider border outline-none transition-all ${
              errors.twinStep
                ? 'border-rose-400 bg-rose-50 text-rose-800'
                : isFoxconn
                ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                : 'border-zinc-800 bg-zinc-900/90 text-zinc-100 hover:bg-zinc-900'
            }`}
          />
          {errors.twinStep && (
            <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.twinStep}</p>
          )}
        </div>

        {/* 2 & 3: 2 ô tick (Allow Swap & Picker Resolve SN) */}
        <div className="md:col-span-5 flex flex-wrap items-center gap-2">
          {/* Ô tick Allow Swap */}
          <label
            htmlFor={`${formUid}-allowSwap`}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border cursor-pointer select-none transition-all text-xs font-bold ${
              twinStepForm.allowCarrierSwap
                ? isFoxconn
                  ? 'bg-blue-50 text-[#002766] border-blue-300 shadow-2xs'
                  : 'bg-zinc-900 text-[#76B900] border-[#76B900]/50 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
                : isFoxconn
                ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100/80'
                : 'bg-zinc-900/70 text-zinc-400 border-zinc-800 hover:bg-zinc-900'
            }`}
          >
            <input
              id={`${formUid}-allowSwap`}
              type="checkbox"
              checked={!!twinStepForm.allowCarrierSwap}
              onChange={(e) => onFieldChange('allowCarrierSwap', e.target.checked)}
              className="w-3.5 h-3.5 rounded text-blue-600 accent-blue-600 dark:accent-[#76B900] cursor-pointer"
            />
            <span>Allow Swap</span>
          </label>

          {/* Ô tick Picker (Resolve SN) */}
          <label
            htmlFor={`${formUid}-picker`}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border cursor-pointer select-none transition-all text-xs font-bold ${
              twinStepForm.isPicker
                ? isFoxconn
                  ? 'bg-purple-50 text-purple-900 border-purple-300 shadow-2xs'
                  : 'bg-zinc-900 text-purple-300 border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.2)]'
                : isFoxconn
                ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100/80'
                : 'bg-zinc-900/70 text-zinc-400 border-zinc-800 hover:bg-zinc-900'
            }`}
          >
            <input
              id={`${formUid}-picker`}
              type="checkbox"
              checked={!!twinStepForm.isPicker}
              onChange={(e) => onFieldChange('isPicker', e.target.checked)}
              className="w-3.5 h-3.5 rounded text-purple-600 accent-purple-600 dark:accent-[#76B900] cursor-pointer"
            />
            <span>Picker (Resolve SN)</span>
          </label>
        </div>

        {/* 4. Cụm nút Thao tác (Cancel / Save) */}
        <div className="md:col-span-4 flex items-center justify-end gap-2">
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              ✕ Hủy
            </button>
          )}

          <button
            type="button"
            onClick={onSave}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-blue-900 text-white'
                : 'bg-[#76B900] hover:bg-[#86D400] text-black shadow-[0_0_12px_rgba(118,185,0,0.3)]'
            }`}
          >
            <span>💾</span>
            <span>{editingId ? 'Cập Nhật' : 'Lưu Twin Step'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
