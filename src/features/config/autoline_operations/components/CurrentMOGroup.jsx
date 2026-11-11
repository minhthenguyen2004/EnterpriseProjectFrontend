export default function CurrentMOGroup({isFoxconn, selectedStep}) {
    return(
        <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200/90 shadow-xs'
            : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
        }`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="text-base">📍</span>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
              Công đoạn
            </h3>
          </div>
        </div>

        {selectedStep ? (
          <div className="space-y-2.5">
            {/* Bước */}
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>Bước:</span>
              <span className={`font-mono font-bold text-xs ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
                Step {String(selectedStep.stepNumber).padStart(2, '0')}
              </span>
            </div>

            {/* Tên công đoạn */}
            <div>
              <span className={`text-xs font-semibold ${isFoxconn ? 'text-slate-500' : 'text-white'} block mb-1`}>
                Tên công đoạn:
              </span>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800">
                <span className="font-black text-xs text-slate-900 dark:text-white block">
                  {selectedStep.stationName}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-zinc-400 block mt-0.5">
                  {selectedStep.groupName}
                </span>
              </div>
            </div>

            {/* Trạng thái */}
            <div className="flex items-center justify-between pt-1">
              <span className={`text-xs font-semibold ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>Trạng thái:</span>
              <div>
                {selectedStep.status === 'PASS' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    ✅ PASS
                  </span>
                )}
                {selectedStep.status === 'FAIL' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700">
                    ❌ FAIL
                  </span>
                )}
                {selectedStep.status === 'PENDING' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                    ⏳ CHƯA CHẠY
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-slate-400">Chưa chọn bước nào</div>
        )}
      </div>
    )
}