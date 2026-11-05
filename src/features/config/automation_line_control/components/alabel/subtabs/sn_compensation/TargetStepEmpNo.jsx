export default function TargetStepEmpNo({ currentTargetStep, handleTargetStepChange, operatorId, isFoxconn }) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Cột 1: Target Step */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`font-bold ${isFoxconn ? "text-slate-700" : "text-zinc-200"} flex items-center gap-1`}>
              <span>Target Step (Bước Router Mục Tiêu)</span>
              <span className="text-red-500 font-black">*</span>
            </label>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              DESTINATION
            </span>
          </div>
          <input
            type="text"
            value={currentTargetStep}
            onChange={(e) => handleTargetStepChange(e.target.value)}
            placeholder="Nhập Target Step đích (ví dụ: 030, 040, ST03-SMT-A)..."
            className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100'
            }`}
          />
        </div>

        {/* Cột 2: Mã nhân viên (Read-only / Disabled) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`font-bold ${isFoxconn ? "text-slate-700" : "text-zinc-200"} flex items-center gap-1`}>
              <span>Mã Nhân Viên Thực Thi</span>
              <span className="text-[11px]">🔒</span>
            </label>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${isFoxconn ? "bg-slate-200 text-slate-700 border-slate-300" : "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
              READ-ONLY
            </span>
          </div>
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
              title="Tự truy xuất từ tài khoản đăng nhập thành công. Không thể sửa đổi nhằm bảo đảm tính toàn vẹn kiểm toán."
            />
          </div>
        </div>
      </div>
    )
}
