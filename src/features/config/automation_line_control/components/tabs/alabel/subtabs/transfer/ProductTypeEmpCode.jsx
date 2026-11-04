export default function ProductTypeEmpCode({isFoxconn, currentModel, handleModelSelect, DB_ACTIVE_MODELS, operatorId, isManualModel }) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Dòng sản phẩm (Dropdown menu tự động giải mã) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`block font-bold ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                      Dòng Sản Phẩm (Model)
                    </label>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        isManualModel
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}
                    >
                      {isManualModel ? 'Chọn thủ công' : '⚡ Tự động giải mã'}
                    </span>
                  </div>
                  <select
                    value={currentModel}
                    onChange={(e) => handleModelSelect(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border font-semibold text-xs transition-all cursor-pointer ${
                      isFoxconn
                        ? 'bg-slate-50 border-slate-300 text-slate-800'
                        : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                    }`}
                  >
                    {DB_ACTIVE_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
        
                {/* Mã nhân viên (Tự truy xuất khi đăng nhập, Read-only / Disabled) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`block font-bold  ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                      Mã Nhân Viên (Operator ID)
                    </label>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 flex items-center gap-1 font-mono">
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