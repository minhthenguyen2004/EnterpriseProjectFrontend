export default function ProductTypeLineInput({isManualModel, currentModel, isFoxconn, handleModelSelect, DB_ACTIVE_MODELS, currentLine, handleLineChange }) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Cột 1: Dropdown menu Dòng sản phẩm */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                <label className={`font-bold ${isFoxconn ? "text-slate-700" : "text-zinc-200"}`}>
                    Dòng Sản Phẩm (Model)
                </label>
                <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    isManualModel
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}
                >
                    {isManualModel ? 'Chọn thủ công' : '⚡ Tự động giải mã'}
                </span>
                </div>
                <select
                value={currentModel}
                onChange={(e) => handleModelSelect(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-zinc-950/70 border-zinc-700 text-zinc-100'
                }`}
                >
                {DB_ACTIVE_MODELS.map((m) => (
                    <option key={m.id} value={m.id} className={isFoxconn ? "bg-white text-slate-800" : "bg-zinc-900 text-zinc-100"}>
                    {m.name}
                    </option>
                ))}
                </select>
            </div>

            {/* Cột 2: Ô text nhập Dây chuyền sản xuất */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                <label className={`font-bold ${isFoxconn ? "text-slate-700" : "text-zinc-200"} flex items-center gap-1`}>
                    <span>Dây Chuyền Sản Xuất</span>
                    <span className="text-red-500 font-black">*</span>
                </label>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${isFoxconn ? "bg-slate-200 text-slate-600 border-slate-300" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                    LINE
                </span>
                </div>
                <input
                type="text"
                value={currentLine}
                onChange={(e) => handleLineChange(e.target.value)}
                placeholder="Nhập mã dây chuyền (ví dụ: LINE-01-SMT)..."
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-semibold transition-all ${
                    isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-zinc-950/70 border-zinc-700 text-zinc-100'
                }`}
                />
            </div>
        </div>
    )
}
