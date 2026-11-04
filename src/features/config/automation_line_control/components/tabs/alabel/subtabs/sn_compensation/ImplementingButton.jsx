export default function ImplementingButton({ isFoxconn, isExecuting, handleResetForm, isFormValid, onExecute }) {
    return(
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2.5 w-full sm:ml-auto sm:w-auto order-1 sm:order-2 justify-end">
            {/* Nút Làm sạch form */}
            <button
                type="button"
                disabled={isExecuting}
                onClick={handleResetForm}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer active:scale-95 disabled:opacity-50 ${
                isFoxconn
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                    : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
                }`}
            >
                Làm Sạch Form
            </button>

            {/* Nút Thực thi nạp bù seri thủ công */}
            <button
                type="button"
                disabled={isExecuting || !isFormValid}
                onClick={() => onExecute('compensate_detail')}
                className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isFoxconn
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                    : 'bg-[#76B900] hover:bg-[#86cf00] text-black font-extrabold shadow-[#76B900]/20'
                }`}
            >
                {isExecuting ? (
                <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Đang Nạp Bù Dữ Liệu Qua SP...</span>
                </>
                ) : (
                <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>📥 Thực Thi Nạp Bù Seri Thủ Công</span>
                </>
                )}
            </button>
            </div>
        </div>
    )
}