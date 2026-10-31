function TickInput({ keyForm, onFieldChange, isFoxconn, onCancel, onSave, editingId }) {
  return (
    <div
        className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-3 ${
          isFoxconn ? 'border-slate-200' : 'border-zinc-800'
        }`}
      >
        {/* Cụm 5 nút tick tùy chọn ở góc bên trái */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3.5">
          {/* Required */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keyForm.isRequired}
              onChange={(e) => onFieldChange('isRequired', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                keyForm.isRequired
                  ? isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  : isFoxconn ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Required
            </span>
          </label>

          {/* Bypass */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keyForm.isBypass}
              onChange={(e) => onFieldChange('isBypass', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                keyForm.isBypass
                  ? 'text-amber-600 dark:text-amber-400'
                  : isFoxconn ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Bypass
            </span>
          </label>

          {/* Verify */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keyForm.isVerify}
              onChange={(e) => onFieldChange('isVerify', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                keyForm.isVerify
                  ? isFoxconn ? 'text-blue-700' : 'text-sky-400'
                  : isFoxconn ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Verify
            </span>
          </label>

          {/* SFC KeyPart */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keyForm.isSfcKeyPart}
              onChange={(e) => onFieldChange('isSfcKeyPart', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                keyForm.isSfcKeyPart
                  ? 'text-purple-600 dark:text-purple-400'
                  : isFoxconn ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              SFC KeyPart
            </span>
          </label>

          {/* Active */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keyForm.isActive}
              onChange={(e) => onFieldChange('isActive', e.target.checked)}
              className={`w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'accent-blue-600' : 'accent-[#76B900]'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                keyForm.isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : isFoxconn ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              Active
            </span>
          </label>
        </div>

        {/* Cụm 2 nút Cancel và Save ở góc bên phải */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-blue-900 text-white shadow-blue-900/20 active:scale-98'
                : 'bg-[#76B900] hover:bg-[#86D400] text-black font-black shadow-[0_0_15px_rgba(118,185,0,0.3)] active:scale-98'
            }`}
          >
            <span>{editingId ? '💾' : '➕'}</span>
            <span>{editingId ? 'Update Key' : 'Save'}</span>
          </button>
        </div>
      </div>
  )
}

export default TickInput