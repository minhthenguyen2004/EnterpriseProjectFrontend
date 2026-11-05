export default function Reset({ isFoxconn, handleResetForm, isExecuting, targetCode, onExecute }) {
    return(
        <div
            className={`p-3.5 rounded-xl border space-y-3 animate-in fade-in duration-100 ${
              isFoxconn ? 'bg-amber-50/50 border-amber-200' : 'bg-zinc-950/70 border-zinc-800'
            }`}
          >
            <div className="flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-400">
              <span className="text-base">⚠️</span>
              <p className="leading-relaxed">
                Chế độ <strong>Reset Chu Kỳ</strong> sẽ đưa trạng thái của đối tượng về <strong>Step 0 (Step 000 - Initial State / Cấp liệu)</strong>. Toàn bộ lịch sử WIP trạm sẽ được reset để bắt đầu một chu kỳ dán nhãn và kiểm tra hoàn toàn mới.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleResetForm}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isFoxconn ? 'hover:bg-slate-200/60 text-slate-600' : 'hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                Làm Sạch Form
              </button>
              <button
                type="button"
                disabled={isExecuting || !targetCode.trim()}
                onClick={() => onExecute('undo_reset')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFoxconn
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                    : 'bg-amber-500 hover:bg-amber-400 text-black font-extrabold shadow-amber-500/20'
                }`}
              >
                {isExecuting ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Đang Reset Chu Kỳ...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Thực Thi Reset Chu Kỳ Về Step 0</span>
                  </>
                )}
              </button>
            </div>
          </div>
    )
}