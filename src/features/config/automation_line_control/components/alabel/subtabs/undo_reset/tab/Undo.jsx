export default function Undo({ isFoxconn, targetStep, ROUTER_STEPS_LIST, handleResetForm, isExecuting, targetCode, handleTargetStepChange, onExecute }) {
    return(
        <div
            className={`p-3.5 rounded-xl border space-y-3 animate-in fade-in duration-100 ${
              isFoxconn ? 'bg-blue-50/40 border-blue-200' : 'bg-zinc-950/70 border-zinc-800'
            }`}
          >
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-zinc-200"}`}>
                Hoàn Tác Về Step Mục Tiêu Nào?
              </label>
              <select
                value={targetStep}
                onChange={(e) => handleTargetStepChange?.(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border font-mono font-semibold text-xs transition-all cursor-pointer ${
                  isFoxconn
                    ? 'bg-white focus:border-blue-500 text-slate-800 border-slate-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-100'
                }`}
              >
                {ROUTER_STEPS_LIST.map((stepItem) => (
                  <option key={stepItem.step} value={stepItem.step} className={isFoxconn ? "bg-white text-slate-800" : "bg-zinc-900 text-zinc-100"}>
                    {stepItem.label}
                  </option>
                ))}
              </select>
              <p className={`mt-1 text-[11px] ${isFoxconn ? "text-slate-500" : "text-zinc-400"}`}>
                Sản phẩm sẽ được rollback router về bước đã chọn. Dữ liệu các bước sau sẽ được đánh dấu làm lại.
              </p>
            </div>

            <div className={`flex items-center justify-end gap-2.5 pt-2 border-t ${isFoxconn ? "border-slate-200" : "border-zinc-800"}`}>
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
                disabled={isExecuting || !targetCode?.trim()}
                onClick={() => onExecute?.('undo_reset')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                  isFoxconn
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                    : 'bg-[#76B900] hover:bg-[#68a400] text-black font-extrabold shadow-[#76B900]/20'
                }`}
              >
                {isExecuting ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Đang Hoàn Tác Router...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>Thực Thi Hoàn Tác Về Step {targetStep}</span>
                  </>
                )}
              </button>
            </div>
          </div>
    )
}
