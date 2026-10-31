import { VALUE_TYPES } from "../../formModalConstants"

function TextInput({ formUid, formErrors, keyForm, onFieldChange, isFoxconn }) {
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Key Name */}
        <div>
          <label
            htmlFor={`${formUid}-keyName`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Key Name <span className="text-rose-500 font-black">*</span>
          </label>
          <input
            id={`${formUid}-keyName`}
            type="text"
            value={keyForm.keyName}
            onChange={(e) => onFieldChange('keyName', e.target.value.toUpperCase())}
            placeholder="VD: BARCODE_MAIN"
            className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-wider border outline-none transition-all ${
              formErrors.keyName
                ? 'border-rose-400 bg-rose-50 text-rose-800'
                : isFoxconn
                ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                : 'border-zinc-800 bg-zinc-900/90 text-zinc-100 hover:bg-zinc-900'
            }`}
          />
          {formErrors.keyName && (
            <p className="text-[10px] text-rose-500 font-medium mt-1">{formErrors.keyName}</p>
          )}
        </div>

        {/* Display Name */}
        <div>
          <label
            htmlFor={`${formUid}-displayName`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Display Name
          </label>
          <input
            id={`${formUid}-displayName`}
            type="text"
            value={keyForm.displayName}
            onChange={(e) => onFieldChange('displayName', e.target.value)}
            placeholder="VD: Mã vạch bo mạch chính"
            className={`w-full px-3 py-2 rounded-xl text-xs font-medium border outline-none transition-all ${
              isFoxconn
                ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                : 'border-zinc-800 bg-zinc-900/90 text-zinc-100 hover:bg-zinc-900'
            }`}
          />
        </div>

        {/* Value Type */}
        <div>
          <label
            htmlFor={`${formUid}-valueType`}
            className={`block text-[11px] font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Value Type (Kiểu dữ liệu)
          </label>
          <div className="relative">
            <select
              id={`${formUid}-valueType`}
              value={keyForm.valueType}
              onChange={(e) => onFieldChange('valueType', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold border outline-none appearance-none cursor-pointer transition-all pr-8 ${
                isFoxconn
                  ? 'border-slate-200 text-slate-800 hover:bg-slate-100/80 focus:bg-white'
                  : 'border-zinc-800 bg-zinc-900/90 text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              {VALUE_TYPES.map((t) => (
                <option
                  key={t.value}
                  value={t.value}
                  className={isFoxconn ? 'bg-white text-slate-900' : 'bg-zinc-900 text-zinc-100'}
                >
                  {t.label}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-slate-400 dark:text-zinc-500">
              ▼
            </span>
          </div>
        </div>
      </div>
  )
}

export default TextInput