import { useId } from 'react';
import { PRESSFIT_UNITS } from '../../constants/formModalConstants';

/**
 * Khung Cấu hình vị trí ép mới / chỉnh sửa (New Pressfit Position Config Card)
 * - Dòng đầu tiên: 1 trường nhập text Position / Vị trí ép và 2 nút tick: Required Position và Active Tolerance Check
 * - Dòng thứ 2: 3 khung nhỏ xếp theo hàng ngang gom:
 *   1. Force (Lực nhấn): Standard, Limit, Unit
 *   2. Time (Thời gian giữ): Standard, Limit, Unit
 *   3. Distance (Hành trình): Standard, Limit, Unit
 * - Hàng nút Save Pressfit Config & Hủy thao tác
 */
export default function NewPressfitPositionConfigCard({
  pressfitForm,
  formErrors = {},
  editingId,
  isFoxconn = false,
  onFieldChange,
  onParamChange,
  onCancel,
  onSave
}) {
  const formUid = useId();

  // Helper render 1 khung nhỏ xếp theo hàng ngang (Force, Time, Distance)
  const renderParamBox = (paramKey, title, icon, unitOptions) => {
    const paramData = pressfitForm[paramKey] || { standard: '', limit: '', unit: unitOptions[0] };
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
          <h4
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            {editingId ? 'Cập Nhật Vị Trí Ép Lực Nhấn' : 'New Pressfit Position Config (Thêm Vị Trí Ép Mới)'}
          </h4>
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
          Chuẩn thẩm định AutoLine Pressfit [Std ± Limit]
        </span>
      </div>

      {/* DÒNG ĐẦU TIÊN: Position input + 2 nút tick (Required Position & Active Tolerance Check) */}
      <div
        className={`p-3 rounded-xl border mb-3 flex flex-wrap items-center justify-between gap-3 ${
          isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/60 border-zinc-800'
        }`}
      >
        {/* Trường Text Position */}
        <div className="flex-1 min-w-55">
          <label
            htmlFor={`${formUid}-pressfit-position`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Position / Vị trí ép <span className="text-rose-500 font-black">*</span>
          </label>
          <input
            id={`${formUid}-pressfit-position`}
            type="text"
            value={pressfitForm.position || ''}
            onChange={(e) => onFieldChange('position', e.target.value.toUpperCase())}
            placeholder="VD: PRESS-POS-01 hoặc POS_01"
            className={`w-full px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider border outline-none transition-all ${
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
              checked={Boolean(pressfitForm.isRequired)}
              onChange={(e) => onFieldChange('isRequired', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                pressfitForm.isRequired
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
              checked={Boolean(pressfitForm.isActive)}
              onChange={(e) => onFieldChange('isActive', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                pressfitForm.isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {pressfitForm.isActive ? 'Active Tolerance Check' : 'Active (Bypass)'}
            </span>
          </label>
        </div>
      </div>

      {/* DÒNG THỨ 2: 3 KHUNG NHỎ XẾP THEO HÀNG NGANG (Force, Time, Distance) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3">
        {/* Khung 1: Force (Lực nhấn) */}
        {renderParamBox('force', 'Force (Lực nhấn)', '💪', PRESSFIT_UNITS.force)}
        {/* Khung 2: Time (Thời gian giữ) */}
        {renderParamBox('time', 'Time (Thời gian giữ)', '⏱️', PRESSFIT_UNITS.time)}
        {/* Khung 3: Distance (Hành trình) */}
        {renderParamBox('distance', 'Distance (Hành trình)', '📏', PRESSFIT_UNITS.distance)}
      </div>

      {/* BÊN DƯỚI: Nút Save Pressfit Config (+ Nút Hủy nếu đang sửa) */}
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
          <span>{editingId ? 'Update Pressfit Config' : 'Save Pressfit Config'}</span>
        </button>
      </div>
    </div>
  );
}
