export default function ProductTypeDropdownMenu({ isFoxconn, setIsModelDropdownExpanded, isModelDropdownExpanded, manualModel, detectedModel, setManualModel, DB_ACTIVE_MODELS  }) {
    return(
        <div className="pt-1 space-y-1.5">
            <div className="flex items-center justify-between">
            <label className={`text-xs font-bold ${ isFoxconn ? "text-slate-700" : "text-white"} flex items-center gap-1.5`}>
                <span>Dòng Sản Phẩm (Model)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                AUTO-DETECT
                </span>
            </label>
            <button
                type="button"
                onClick={() => setIsModelDropdownExpanded(!isModelDropdownExpanded)}
                className="text-[11px] font-semibold text-blue-600 dark:text-[#76B900] hover:underline flex items-center gap-1"
            >
                <span>{isModelDropdownExpanded ? '▲ Thu gọn danh mục CSDL' : '▼ Chọn thủ công từ CSDL'}</span>
            </button>
            </div>

            {/* Ô hiển thị Model */}
            <div className="relative">
            <input
                type="text"
                readOnly={!isModelDropdownExpanded}
                value={manualModel || detectedModel}
                onChange={(e) => setManualModel(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                manualModel
                    ? isFoxconn ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-bold'
                    : isFoxconn ? 'bg-slate-100/80 border-slate-200 text-slate-700' : 'bg-zinc-950/40 border-zinc-800 text-zinc-300'
                }`}
            />
            {manualModel && (
                <button
                type="button"
                onClick={() => setManualModel('')}
                className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 hover:text-red-500 font-bold"
                title="Bỏ chọn thủ công để tự động nhận diện"
                >
                ✕ Hủy Override
                </button>
            )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="italic">
                Chú thích: <strong>Tự động nhận diện nếu để trống</strong> (Hệ thống tự đối chiếu từ CSDL).
            </span>
            </div>

            {/* Dropdown Menu từ CSDL (Ẩn mặc định, chỉ mở khi bấm nút) */}
            {isModelDropdownExpanded && (
            <div
                className={`p-2 rounded-xl border mt-2 space-y-1 text-xs animate-in fade-in duration-150 ${
                isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
                }`}
            >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-1 mb-1">
                Danh mục Model đang kích hoạt trong CSDL:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-36 overflow-y-auto pr-1">
                {DB_ACTIVE_MODELS.map((model) => (
                    <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                        setManualModel(model.name);
                        setIsModelDropdownExpanded(false);
                    }}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] truncate font-medium transition-all ${
                        (manualModel || detectedModel) === model.name
                        ? isFoxconn ? 'bg-blue-600 text-white font-bold' : 'bg-[#76B900] text-black font-extrabold'
                        : isFoxconn ? 'hover:bg-slate-200/60 text-slate-700' : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                    >
                    {model.name}
                    </button>
                ))}
                </div>
            </div>
            )}
        </div>
    )
}