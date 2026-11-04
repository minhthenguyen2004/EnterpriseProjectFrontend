import useTheme from '../../../../../../../hooks/useTheme';

export default function ClearUndoSubTab({
  form,
  setForm,
  isExecuting,
  onExecute,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl border bg-emerald-500/5 border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-start gap-2.5">
        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          <strong>Giải Phóng Cờ Khóa (Clear Undo):</strong> Khi sản phẩm hoặc khay đồ gá Carrier bị đánh dấu khóa Undo do gián đoạn trên dây chuyền, thao tác này sẽ xóa cờ khóa trên server ALABEL để băng tải tiếp tục luân chuyển bình thường.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
            Mã Đối Tượng (SN hoặc Mã Carrier RFID)
          </label>
          <input
            type="text"
            value={form.targetId}
            onChange={(e) => setForm({ ...form, targetId: e.target.value })}
            className={`w-full px-3 py-2 rounded-xl border font-mono font-semibold transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:bg-white focus:border-blue-500 text-slate-800'
                : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
            }`}
            placeholder="Mã SN hoặc Carrier..."
          />
        </div>

        <div>
          <label className="block font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
            Xác Nhận Quyền Mở Khóa (Supervisor Auth)
          </label>
          <input
            type="text"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className={`w-full px-3 py-2 rounded-xl border transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:bg-white focus:border-blue-500 text-slate-800'
                : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
            }`}
            placeholder="Lý do xóa cờ khóa..."
          />
        </div>

        <div className="sm:col-span-2 flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="forceUnlock"
            checked={form.forceUnlock}
            onChange={(e) => setForm({ ...form, forceUnlock: e.target.checked })}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-zinc-700"
          />
          <label htmlFor="forceUnlock" className="text-xs font-semibold cursor-pointer select-none text-slate-700 dark:text-zinc-300">
            Bắt buộc cưỡng bức mở khóa (Force Unlock SFC Router State)
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
        <button
          type="button"
          disabled={isExecuting || !form.targetId}
          onClick={() => onExecute('clear_undo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${
            isFoxconn
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
          }`}
        >
          {isExecuting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Đang Xóa Cờ Khóa...</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Thực Thi Clear Undo</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
