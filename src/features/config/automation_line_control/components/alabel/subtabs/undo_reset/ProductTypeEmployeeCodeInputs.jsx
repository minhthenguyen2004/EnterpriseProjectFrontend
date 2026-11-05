export default function ProductTypeEmployeeCodeInputs({isFoxconn, selectedModel, DB_ACTIVE_MODELS, operatorId, handleModelChange}) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Cột 1: Dòng sản phẩm (Dropdown menu) */}
            <div>
                <label className={`block font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-zinc-200"}`}>
                Dòng Sản Phẩm (Model)
                </label>
                <select
                value={selectedModel}
                onChange={(e) => handleModelChange?.(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border font-semibold text-xs transition-all cursor-pointer ${
                    isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                }`}
                >
                {DB_ACTIVE_MODELS.map((m) => (
                    <option key={m.id} value={m.id} className={isFoxconn ? "bg-white text-slate-800" : "bg-zinc-900 text-zinc-100"}>
                    {m.name}
                    </option>
                ))}
                </select>
            </div>

            {/* Cột 2: Mã nhân viên (Tự truy xuất khi đăng nhập, Read-only / Disabled) */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                <label className={`block font-bold ${ isFoxconn ? "text-slate-700" : "text-zinc-200" }`}>
                    Mã Nhân Viên (Operator ID)
                </label>
                <span className={`text-[10px] flex items-center gap-1 font-mono ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>
                    🔒 Tự truy xuất
                </span>
                </div>
                <div className="relative">
                <input
                    type="text"
                    value={operatorId}
                    readOnly
                    disabled
                    className={`w-full pl-8 pr-3 py-2 rounded-xl border text-xs font-mono font-bold cursor-not-allowed select-none ${
                    isFoxconn
                        ? 'bg-slate-100 border-slate-200 text-slate-600'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                    title="Mã nhân viên tự động trích xuất từ tài khoản đăng nhập hiện tại và không thể sửa"
                />
                <span className="absolute left-2.5 top-2 text-xs opacity-60">🔒</span>
                </div>
            </div>
        </div>
    )
}
