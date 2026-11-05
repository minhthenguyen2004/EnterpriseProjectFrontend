export default function SnCarrierTextInput({isFoxconn, currentTargetType, handleTargetTypeChange, currentTargetCode, handleTargetCodeChange  }) {
    return(
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
            <label className={`text-xs font-bold ${ isFoxconn ? "text-slate-700" : "text-zinc-200"} flex items-center gap-1.5`}>
                <span>Mã Đối Tượng</span>
                <span className="text-red-500 font-black">*</span>
            </label>

            {/* Tab chuyển đổi SN hoặc Carrier */}
            <div
                className={`inline-flex items-center gap-1 p-0.5 rounded-lg border text-xs font-semibold ${
                isFoxconn ? 'bg-slate-100 border-slate-300' : 'bg-zinc-950 border-zinc-700'
                }`}
            >
                <button
                type="button"
                onClick={() => handleTargetTypeChange('sn')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer select-none active:scale-95 ${
                    currentTargetType === 'sn'
                    ? isFoxconn
                        ? 'bg-[#002766] text-white font-bold shadow-xs'
                        : 'bg-[#76B900] text-black font-extrabold shadow-xs'
                    : isFoxconn
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-zinc-400 hover:text-zinc-200'
                }`}
                >
                ★ Serial Number (SN)
                </button>
                <button
                type="button"
                onClick={() => handleTargetTypeChange('carrier')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer select-none active:scale-95 ${
                    currentTargetType === 'carrier'
                    ? isFoxconn
                        ? 'bg-[#002766] text-white font-bold shadow-xs'
                        : 'bg-[#76B900] text-black font-extrabold shadow-xs'
                    : isFoxconn
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-zinc-400 hover:text-zinc-200'
                }`}
                >
                Carrier RFID / Pallet
                </button>
            </div>
            </div>

            {/* Input nhập mã đối tượng */}
            <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>
                {currentTargetType === 'sn' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                )}
            </div>
            <input
                type="text"
                value={currentTargetCode}
                onChange={(e) => handleTargetCodeChange(e.target.value)}
                placeholder={
                currentTargetType === 'sn'
                    ? 'Nhập Serial Number sản phẩm (ví dụ: SN8839210492-NV)...'
                    : 'Nhập mã khay Carrier RFID (ví dụ: CARRIER-RFID-8819)...'
                }
                className={`w-full pl-9 pr-8 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-100'
                    : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/20'
                }`}
            />
            {currentTargetCode && (
                <button
                type="button"
                onClick={() => handleTargetCodeChange('')}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-all cursor-pointer ${
                    isFoxconn ? "text-slate-400 hover:text-slate-600" : "text-zinc-500 hover:text-zinc-200"
                }`}
                title="Xóa nhanh mã đối tượng"
                >
                ✕
                </button>
            )}
            </div>
        </div>
    )
}
