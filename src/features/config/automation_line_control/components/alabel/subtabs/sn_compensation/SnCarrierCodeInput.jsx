export default function SnCarrierCodeInput({currentSn, isFoxconn, handleSnChange, handleCarrierCodeChange, currentCarrierCode }) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Trường 1: Serial Number */}
            <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className={`font-bold ${isFoxconn ? "text-slate-700" : "text-zinc-200"} flex items-center gap-1`}>
                <span>Mã Serial Number (SN)</span>
                <span className="text-red-500 font-black">*</span>
                </label>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                SERIAL
                </span>
            </div>
            <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                </div>
                <input
                type="text"
                value={currentSn}
                onChange={(e) => handleSnChange(e.target.value)}
                placeholder="Nhập Serial Number nạp bù (ví dụ: SN8839210492-NV)..."
                className={`w-full pl-9 pr-8 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-100'
                    : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/20'
                }`}
                />
                {currentSn && (
                <button
                    type="button"
                    onClick={() => handleSnChange('')}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-all cursor-pointer ${isFoxconn ? "text-slate-400 hover:text-slate-600" : "text-zinc-500 hover:text-zinc-200"}`}
                    title="Xóa Serial Number"
                >
                    ✕
                </button>
                )}
            </div>
            </div>

            {/* Trường 2: Carrier Code */}
            <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className={`font-bold ${isFoxconn ? "text-slate-700" : "text-zinc-200"} flex items-center gap-1`}>
                <span>Mã Carrier Code</span>
                <span className="text-red-500 font-black">*</span>
                </label>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                CARRIER
                </span>
            </div>
            <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                </div>
                <input
                type="text"
                value={currentCarrierCode}
                onChange={(e) => handleCarrierCodeChange(e.target.value)}
                placeholder="Nhập mã khay Carrier Code (ví dụ: CARRIER-RFID-8819)..."
                className={`w-full pl-9 pr-8 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-100'
                    : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/20'
                }`}
                />
                {currentCarrierCode && (
                <button
                    type="button"
                    onClick={() => handleCarrierCodeChange('')}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-all cursor-pointer ${isFoxconn ? "text-slate-400 hover:text-slate-600" : "text-zinc-500 hover:text-zinc-200"}`}
                    title="Xóa Carrier Code"
                >
                    ✕
                </button>
                )}
            </div>
            </div>
        </div>
    )
}
