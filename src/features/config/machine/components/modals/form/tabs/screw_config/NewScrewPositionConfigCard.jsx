import { useId } from 'react';
import { SCREW_UNITS } from '../../constants/formModalConstants';

/**
 * Khung Cấu hình vị trí ốc mới / chỉnh sửa (New Screw Position Config Card)
 * - Dòng 1: Trường text Position + 2 nút tick (Required Position & Active Tolerance Check)
 * - 4 khung nhỏ bên dưới (Lưới 2 dòng x 2 cột):
 *   + Dòng 1: Torque lực siết (Standard, Limit, Unit) & Angle góc quay (Standard, Limit, Unit)
 *   + Dòng 2: Volume thể tích (Standard, Limit, Unit) & Height chiều cao (Standard, Limit, Unit)
 * - Nút Save Screw Config bên dưới
 */
export default function NewScrewPositionConfigCard({
  screwForm,
  formErrors = {},
  editingId,
  isFoxconn = false,
  onFieldChange,
  onParamChange,
  onCancel,
  onSave
}) {
  const formUid = useId();

  // Helper render 1 khung thông số nhỏ (Standard, Limit, Unit)
  const renderParamBox = (paramKey, title, icon, unitOptions) => {
    const paramData = screwForm[paramKey] || { standard: '', limit: '', unit: unitOptions[0] };
    const errStandard = formErrors[`${paramKey}_standard`];
    const errLimit = formErrors[`${paramKey}_limit`];

    return (
      <div
        className={`p-2.5 rounded-xl border transition-all ${
          isFoxconn
            ? 'bg-slate-50/80 border-slate-200 hover:border-blue-300'
            : 'bg-zinc-900/80 border-zinc-800/90 hover:border-zinc-700'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-inherit">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{icon}</span>
            <span
              className={`text-[11px] font-bold uppercase tracking-wider ${
                isFoxconn ? 'text-slate-800' : 'text-zinc-200'
              }`}
            >
              {title}
            </span>
          </div>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isFoxconn ? 'bg-slate-200/70 text-slate-700' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {paramData.unit}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Standard */}
          <div>
            <label
              htmlFor={`${formUid}-${paramKey}-std`}
              className={`block text-[10px] font-bold mb-1 truncate ${
                isFoxconn ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Standard <span className="text-rose-500">*</span>
            </label>
            <input
              id={`${formUid}-${paramKey}-std`}
              type="number"
              step="any"
              value={paramData.standard ?? ''}
              onChange={(e) => onParamChange(paramKey, 'standard', e.target.value)}
              placeholder="0.00"
              className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold border outline-none transition-all ${
                errStandard
                  ? 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                  : isFoxconn
                  ? 'border-slate-300 bg-white text-slate-800'
                  : 'border-zinc-700 bg-zinc-950 text-zinc-100'
              }`}
            />
            {errStandard && (
              <p className="text-[9px] text-rose-500 font-medium mt-0.5">{errStandard}</p>
            )}
          </div>

          {/* Limit */}
          <div>
            <label
              htmlFor={`${formUid}-${paramKey}-lim`}
              className={`block text-[10px] font-bold mb-1 truncate ${
                isFoxconn ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Limit (±) <span className="text-rose-500">*</span>
            </label>
            <input
              id={`${formUid}-${paramKey}-lim`}
              type="number"
              step="any"
              value={paramData.limit ?? ''}
              onChange={(e) => onParamChange(paramKey, 'limit', e.target.value)}
              placeholder="0.00"
              className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold border outline-none transition-all ${
                errLimit
                  ? 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                  : isFoxconn
                  ? 'border-slate-300 bg-white text-slate-800'
                  : 'border-zinc-700 bg-zinc-950 text-zinc-100'
              }`}
            />
            {errLimit && (
              <p className="text-[9px] text-rose-500 font-medium mt-0.5">{errLimit}</p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label
              htmlFor={`${formUid}-${paramKey}-unit`}
              className={`block text-[10px] font-bold mb-1 truncate ${
                isFoxconn ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Unit
            </label>
            <div className="relative">
              <select
                id={`${formUid}-${paramKey}-unit`}
                value={paramData.unit || unitOptions[0]}
                onChange={(e) => onParamChange(paramKey, 'unit', e.target.value)}
                className={`w-full px-2 py-1.5 rounded-lg text-xs font-bold border outline-none appearance-none cursor-pointer pr-6 ${
                  isFoxconn
                    ? 'border-slate-300 bg-white text-slate-800'
                    : 'border-zinc-700 bg-zinc-950 text-zinc-100'
                }`}
              >
                {unitOptions.map((u) => (
                  <option
                    key={u}
                    value={u}
                    className={isFoxconn ? 'bg-white text-slate-900' : 'bg-zinc-900 text-zinc-100'}
                  >
                    {u}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-slate-400 dark:text-zinc-500">
                ▼
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-xs'
          : 'bg-zinc-950/80 border-zinc-800 shadow-inner'
      }`}
    >
      {/* Tiêu đề khung */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{editingId ? '✏️' : '➕'}</span>
          <span
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            {editingId ? 'Cập Nhật Vị Trí Vít' : 'New Screw Position Config (Thêm Vị Trí Ốc Mới)'}
          </span>
          {editingId && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold">
              Đang Sửa
            </span>
          )}
        </div>

        <span
          className={`text-[11px] ${
            isFoxconn ? 'text-slate-500' : 'text-zinc-400'
          }`}
        >
          Chuẩn thẩm định AutoLine [Std ± Limit]
        </span>
      </div>

      {/* DÒNG ĐẦU TIÊN: Position input + 2 checkboxes tick */}
      <div
        className={`p-3 rounded-xl border mb-3 flex flex-wrap items-center justify-between gap-3 ${
          isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/60 border-zinc-800'
        }`}
      >
        {/* Trường Text Position */}
        <div className="flex-1 min-w-55">
          <label
            htmlFor={`${formUid}-position`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Position / Vị trí ốc <span className="text-rose-500 font-black">*</span>
          </label>
          <input
            id={`${formUid}-position`}
            type="text"
            value={screwForm.position || ''}
            onChange={(e) => onFieldChange('position', e.target.value.toUpperCase())}
            placeholder="VD: SCR-POS-01 hoặc 1"
            className={`w-full px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider border outline-none transition-all ${
              formErrors.position
                ? 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                : isFoxconn
                ? 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                : 'border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900'
            }`}
          />
          {formErrors.position && (
            <p className="text-[10px] text-rose-500 font-medium mt-1">{formErrors.position}</p>
          )}
        </div>

        {/* 2 Nút tick: Required Position & Active Tolerance Check */}
        <div className="flex items-center gap-4 pt-4 sm:pt-2">
          {/* 1. Required Position */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={Boolean(screwForm.isRequired)}
              onChange={(e) => onFieldChange('isRequired', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                screwForm.isRequired
                  ? isFoxconn
                    ? 'text-blue-700'
                    : 'text-[#76B900]'
                  : isFoxconn
                  ? 'text-slate-600'
                  : 'text-zinc-400'
              }`}
            >
              Required Position
            </span>
          </label>

          {/* 2. Active Tolerance Check */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={Boolean(screwForm.isActive)}
              onChange={(e) => onFieldChange('isActive', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                screwForm.isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {screwForm.isActive ? 'Active Tolerance Check' : 'Active (Bypass)'}
            </span>
          </label>
        </div>
      </div>

      {/* 4 KHUNG NHỎ THÔNG SỐ (Lưới responsive: 4 cột trên xl, 2 cột trên sm/md) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 mb-3">
        {/* Khung 1: Torque */}
        {renderParamBox('torque', 'Torque (Lực)', '🔩', SCREW_UNITS.torque)}
        {/* Khung 2: Angle */}
        {renderParamBox('angle', 'Angle (Góc)', '🔄', SCREW_UNITS.angle)}
        {/* Khung 3: Volume */}
        {renderParamBox('volume', 'Volume (Thể tích)', '🧪', SCREW_UNITS.volume)}
        {/* Khung 4: Height */}
        {renderParamBox('height', 'Height (Chiều cao)', '📏', SCREW_UNITS.height)}
      </div>

      {/* BÊN DƯỚI: Nút Save Screw Config (+ Nút Hủy nếu đang sửa) */}
      <div
        className={`pt-3 border-t flex items-center justify-end gap-2.5 ${
          isFoxconn ? 'border-slate-200' : 'border-zinc-800'
        }`}
      >
        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            ✕ Hủy Thao Tác
          </button>
        )}

        <button
          type="button"
          onClick={onSave}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-blue-900 text-white shadow-blue-900/20 active:scale-98'
              : 'bg-[#76B900] hover:bg-[#86D400] text-black font-black shadow-[0_0_15px_rgba(118,185,0,0.3)] active:scale-98'
          }`}
        >
          <span>{editingId ? '💾' : '➕'}</span>
          <span>{editingId ? 'Update Screw Config' : 'Save Screw Config'}</span>
        </button>
      </div>
    </div>
  );
}
