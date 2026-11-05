export default function ImplementingButton({isFoxconn, handleResetForm, isExecuting, isFormValid, onExecute}) {
    return(
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={handleResetForm}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isFoxconn ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-zinc-800 text-zinc-400'
          }`}
        >
          Làm Sạch Form
        </button>

        <button
          type="button"
          disabled={isExecuting || !isFormValid}
          onClick={() => onExecute('transfer')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${
            isFoxconn
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              : 'bg-[#76B900] hover:bg-[#86d300] text-black font-extrabold shadow-[#76B900]/20'
          }`}
        >
          {isExecuting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Đang Chuyển Khay...</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Thực Thi Chuyển Khay</span>
            </>
          )}
        </button>
      </div>
    )
}