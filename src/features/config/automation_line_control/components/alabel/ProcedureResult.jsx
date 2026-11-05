function ProcedureResult({ isFoxconn, processResult, }) {
    return(
        <div
            className={`p-3.5 rounded-xl border space-y-2.5 text-xs transition-all ${
              isFoxconn ? 'bg-slate-50/80 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-zinc-800/80">
              <span className={`font-bold ${ isFoxconn ? "text-slate-700" : "text-zinc-200"}`}>
                Kết Quả Tiến Trình Hiện Tại
              </span>
              <span className={`font-semibold text-[10px] ${isFoxconn ? "text-slate-500" : "text-zinc-400"}`}>
                Cập nhật: {processResult.lastUpdated}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block">Định danh đối tượng:</span>
                <span className={`font-bold ${ isFoxconn ? "text-slate-800" : "text-white"} truncate block`}>
                  {processResult.identifier}
                </span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block">Trạng thái WIP:</span>
                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {processResult.wipStatus}
                </span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block">Trạm hiện tại:</span>
                <span className="font-semibold text-blue-600 dark:text-[#76B900]">
                  {processResult.currentStation} ({processResult.routerStep})
                </span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block">Khay Carrier RFID:</span>
                <span className={`font-bold ${ isFoxconn ? "text-slate-800" : "text-white"}`}>
                  {processResult.carrierId}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 dark:text-zinc-500 block">Linh kiện đã gắn:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`}
                      style={{
                        width: `${(processResult.keypartsCount.bound / processResult.keypartsCount.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className={`font-mono text-[10px] font-bold ${isFoxconn ? "text-slate-700" : "text-zinc-300"}`}>
                    {processResult.keypartsCount.bound}/{processResult.keypartsCount.total} Keyparts
                  </span>
                </div>
              </div>
            </div>
          </div>
    )
}

export default ProcedureResult
