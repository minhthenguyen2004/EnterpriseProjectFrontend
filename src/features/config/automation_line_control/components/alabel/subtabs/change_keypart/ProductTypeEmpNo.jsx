export default function ProductTypeEmpNo({
  isFoxconn,
  isManualModel,
  currentModel,
  DB_ACTIVE_MODELS,
  operatorId,
  handleModelSelect,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      {/* Cột 1: Dòng sản phẩm (Dropdown menu) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={`font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
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
              ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
              : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
          }`}
        >
          {DB_ACTIVE_MODELS.map((m) => (
            <option
              key={m.id}
              value={m.id}
              className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
            >
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cột 2: Mã nhân viên (Tự truy xuất khi đăng nhập - Read-only / Disabled) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            className={`font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'} flex items-center gap-1`}
          >
            <span>Mã Nhân Viên</span>
            <span className="text-[11px]">🔒</span>
          </label>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700">
            READ-ONLY
          </span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={operatorId}
            readOnly
            disabled
            className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-mono font-bold cursor-not-allowed select-none transition-all ${
              isFoxconn
                ? 'bg-slate-100 border-slate-200 text-slate-600'
                : 'bg-zinc-900/90 border-zinc-800 text-zinc-400'
            }`}
            title="Tự truy xuất từ tài khoản đăng nhập hiện tại. Không thể sửa đổi nhằm bảo đảm tính toàn vẹn kiểm toán (Audit Trail)."
          />
        </div>
      </div>
    </div>
  );
}
