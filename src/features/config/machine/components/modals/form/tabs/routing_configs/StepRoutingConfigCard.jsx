import { useId } from 'react';
import { ROUTING_MODES } from '../../constants/formModalConstants';

/**
 * Khung cấu hình thông số công đoạn (Step Routing Settings):
 * Hiển thị theo hàng ngang: Main Key, Mode (Dropdown 0: Standard, 1: Upload Data First) và nút Save Step Config.
 */
export default function StepRoutingConfigCard({
  stepRoutingState = { mainKey: '', mode: 0 },
  errors = {},
  isFoxconn = false,
  suggestedKeys = [],
  onFieldChange,
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
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-base">⚙️</span>
          <span
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            Cấu Hình Bước Công Đoạn (Step Routing Settings)
          </span>
        </div>
        <span
          className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
            isFoxconn
              ? 'bg-slate-50 text-slate-600 border-slate-200'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800'
          }`}
        >
          {stepRoutingState.mode === 1 ? 'Upload Data First' : 'Standard Routing'}
        </span>
      </div>

      {/* Hàng ngang 3 phần tử: Main Key, Mode, và nút Save Step Config */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
        {/* 1. Main Key */}
        <div className="md:col-span-5">
          <label
            htmlFor={`${formUid}-mainKey`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Main Key <span className="text-rose-500 font-black">*</span>
          </label>
          <div className="relative">
            <input
              id={`${formUid}-mainKey`}
              type="text"
              list={`${formUid}-suggested-keys`}
              value={stepRoutingState.mainKey}
              onChange={(e) => onFieldChange('mainKey', e.target.value.toUpperCase())}
              placeholder="VD: BARCODE_MAIN"
              className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-wider border outline-none transition-all ${
                errors.mainKey
                  ? 'border-rose-400 bg-rose-50 text-rose-800'
                  : isFoxconn
                  ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                  : 'border-zinc-800 bg-zinc-900/90 text-zinc-100 hover:bg-zinc-900'
              }`}
            />
            {suggestedKeys.length > 0 && (
              <datalist id={`${formUid}-suggested-keys`}>
                {suggestedKeys.map((k) => (
                  <option key={k} value={k} />
                ))}
              </datalist>
            )}
          </div>
          {errors.mainKey && (
            <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.mainKey}</p>
          )}
        </div>

        {/* 2. Mode (Drop-down menu gồm 2 trường) */}
        <div className="md:col-span-4">
          <label
            htmlFor={`${formUid}-mode`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Mode (Chế độ định tuyến)
          </label>
          <select
            id={`${formUid}-mode`}
            value={stepRoutingState.mode}
            onChange={(e) => onFieldChange('mode', Number(e.target.value))}
            className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none transition-all cursor-pointer ${
              isFoxconn
                ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                : 'border-zinc-800 bg-zinc-900/90 text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            {ROUTING_MODES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Nút Save Step Config */}
        <div className="md:col-span-3 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className={`w-full md:w-auto px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-blue-900 text-white'
                : 'bg-[#76B900] hover:bg-[#86D400] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]'
            }`}
            title="Lưu cấu hình Main Key và Mode cho công đoạn này"
          >
            <span>💾</span>
            <span>Save Step Config</span>
          </button>
        </div>
      </div>
    </div>
  );
}
