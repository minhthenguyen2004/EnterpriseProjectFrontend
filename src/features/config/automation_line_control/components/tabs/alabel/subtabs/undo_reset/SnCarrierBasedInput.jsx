export default function SnCarrierBasedInput(
    {isFoxconn, handleTargetTypeChange, targetType, targetCode}
) {
    return(
        <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className={`block text-xs font-bold ${ isFoxconn ? "text-slate-700" : "dark:text-zinc-300"}`}>
            Mã Đối Tượng Thao Tác (SN / Carrier)
          </label>

          {/* Tab chuyển đổi qua lại giữa SN và Carrier */}
          <div
            className={`inline-flex items-center gap-1 p-0.5 rounded-lg border text-[11px] font-bold ${
              isFoxconn ? 'bg-slate-100 border-slate-300' : 'bg-zinc-950 border-zinc-700'
            }`}
          >
            <button
              type="button"
              onClick={() => handleTargetTypeChange('sn')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                targetType === 'sn'
                  ? isFoxconn
                    ? 'bg-[#002766] text-white shadow-xs'
                    : 'bg-[#76B900] text-black font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              SN (Serial Number)
            </button>
            <button
              type="button"
              onClick={() => handleTargetTypeChange('carrier')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                targetType === 'carrier'
                  ? isFoxconn
                    ? 'bg-[#002766] text-white shadow-xs'
                    : 'bg-[#76B900] text-black font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Carrier RFID / Pallet
            </button>
          </div>
        </div>

        {/* Ô nhập mã đối tượng */}
        <div className="relative">
          <input
            type="text"
            value={targetCode}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                targetCode: e.target.value,
                sn: e.target.value,
              }))
            }
            className={`w-full pl-3 pr-24 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:ring-1 focus:ring-blue-500 text-slate-800'
                : 'bg-zinc-950/60 border-zinc-700 focus:ring-1 focus:ring-[#76B900] text-zinc-100'
            }`}
            placeholder={
              targetType === 'sn'
                ? 'Nhập mã Serial Number (SN)... (VD: SN8839210492-NV)'
                : 'Nhập mã khay Carrier RFID / Pallet... (VD: CARRIER-RFID-8819)'
            }
          />
          <span className="absolute right-3 top-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
            {targetType.toUpperCase()}
          </span>
        </div>
      </div>
    )
}