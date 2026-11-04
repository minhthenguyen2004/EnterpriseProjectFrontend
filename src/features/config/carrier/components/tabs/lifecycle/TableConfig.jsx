function TableConfig({ thCls, dividerCls, isFoxconn, trHoverCls, tdCls, handleOpenEdit, setDeleteTargetId, filtered}) {
    return(
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className={`text-[10px] font-bold uppercase tracking-wider border-b select-none ${thCls}`}>
              <tr>
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3 min-w-24">Chuyền</th>
                <th className="py-3 px-3 min-w-32">Sản phẩm</th>
                <th className="py-3 px-3 min-w-28">Product Type</th>
                <th className="py-3 px-3 min-w-36">Loại khay</th>
                <th className="py-3 px-3 min-w-44">Mã khay chỉ định</th>
                <th className="py-3 px-3 min-w-24">End Step</th>
                <th className="py-3 px-3 text-right min-w-28">Chu kỳ tối đa</th>
                <th className="py-3 px-3 text-right min-w-28">Chu kỳ cảnh báo</th>
                <th className="py-3 px-3 text-right min-w-28">Giờ KT tối đa</th>
                <th className="py-3 px-3 text-right min-w-28">Giờ KT cố định</th>
                <th className="py-3 px-3 text-center min-w-28">Trạng thái</th>
                <th className="py-3 px-3 text-center min-w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${dividerCls}`}>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={13} className={`py-14 text-center text-xs ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>
                    Không tìm thấy cấu hình vòng đời nào phù hợp.
                  </td>
                </tr>
              ) : filtered.map((cfg, idx) => (
                <tr key={cfg.id} className={`transition-colors ${trHoverCls}`}>
                  <td className={`py-3 px-3 text-center font-mono font-bold text-[11px] ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>{idx + 1}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${isFoxconn ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-blue-500/15 text-blue-400 border-blue-500/30"}`}>
                      {cfg.lineName}
                    </span>
                  </td>
                  <td className={`py-3 px-3 font-semibold ${isFoxconn ? "text-slate-800" : "text-zinc-100"}`}>{cfg.productName}</td>
                  <td className={`py-3 px-3 ${tdCls}`}>
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] border ${isFoxconn ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-zinc-800 text-white border-zinc-700"}`}>
                      {cfg.productType}
                    </span>
                  </td>
                  <td className={`py-3 px-3 ${tdCls} font-semibold`}>
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] border ${isFoxconn ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-indigo-500/15 text-indigo-400 border-indigo-500/30"}`}>
                      {cfg.carrierType}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border tracking-wide ${isFoxconn ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                      {cfg.assignedCarrierCode}
                    </span>
                  </td>
                  <td className={`py-3 px-3 ${tdCls}`}>
                    <span className={` text-[10px] px-1.5 py-0.5 rounded border ${isFoxconn ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-zinc-800 text-white border-zinc-700"}`}>
                      {cfg.endStep}
                    </span>
                  </td>
                  <td className={`py-3 px-3 text-right font-bold tabular-nums ${isFoxconn ? "text-slate-900" : "text-white"}`}>
                    {cfg.maxCycles.toLocaleString("vi-VN")} <span className={`text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>lượt</span>
                  </td>
                  <td className="py-3 px-3 text-right font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                    {cfg.warningCycles.toLocaleString("vi-VN")} <span className={`text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>lượt</span>
                  </td>
                  <td className={`py-3 px-3 text-right font-bold tabular-nums ${isFoxconn ? "text-slate-700" : "text-zinc-300"}`}>
                    {cfg.maxInspectionHours}<span className={`ml-0.5 text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>h</span>
                  </td>
                  <td className={`py-3 px-3 text-right font-bold tabular-nums ${isFoxconn ? "text-slate-700" : "text-zinc-300"}`}>
                    {cfg.fixedInspectionHours}<span className={`ml-0.5 text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>h</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.isActive
                      ? isFoxconn ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : isFoxconn ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-zinc-800 text-zinc-500 border-zinc-700"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                      {cfg.isActive ? "ACTIVE" : "DISABLED"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button id={`lifecycle-edit-${cfg.id}`} type="button" onClick={() => handleOpenEdit(cfg)} title="Sua cau hinh"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${isFoxconn ? "bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 border-slate-200 hover:border-blue-300" : "bg-zinc-800 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 border-zinc-700 hover:border-blue-500/30"}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button id={`lifecycle-delete-${cfg.id}`} type="button" onClick={() => setDeleteTargetId(cfg.id)} title="Xoa cau hinh"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${isFoxconn ? "bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border-slate-200 hover:border-rose-300" : "bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border-zinc-700 hover:border-rose-500/30"}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}

export default TableConfig