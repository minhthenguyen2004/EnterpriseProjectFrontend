import useTheme from '../../../../../hooks/useTheme';

export default function BatchCarrierScannerTab({
  batchInput,
  onChangeInput,
  onAddBatch,
  queue,
  onRemoveItem
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      <div className="pb-3 mb-4 border-b border-slate-200/70 dark:border-zinc-800/80">
        <h3 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-blue-600' : 'text-[#76B900]'} dark:text-zinc-100`}>
          Mở khóa nhiều khay theo lô (Batch Mode)
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          Dán danh sách mã khay (mỗi mã trên một dòng hoặc cách nhau bởi dấu phẩy) để mở khóa đồng loạt
        </p>
      </div>

      {/* Input Textarea & Add Button */}
      <div className="space-y-2.5 mb-4">
        <div>
          <label className={`block text-xs font-bold mb-1.5 ${isFoxconn ? 'text-slate-700' : 'text-zinc-300'}`}>
            Nhập danh sách mã máy ( phân cách bằng dấu phẩy hoặc json )
          </label>
          <textarea
            rows={4}
            value={batchInput}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder="Ví dụ: CARRIER_001, CARRIER_002"
            className={`w-full p-3.5 text-xs font-mono font-bold rounded-xl border transition-all outline-hidden resize-none ${
              isFoxconn
                ? 'bg-slate-50/80 border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
            }`}
          />
        </div>


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500 dark:text-zinc-400">
            💡 Hỗ trợ: Dấu phẩy (,), xuống dòng (Enter), hoặc mảng JSON (ví dụ: <code className="font-mono font-semibold">["CARRIER_001", "CARRIER_002"]</code>).
          </span>
          <button
            type="button"
            onClick={onAddBatch}
            disabled={!batchInput.trim()}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 self-end sm:self-auto cursor-pointer ${
              batchInput.trim()
                ? isFoxconn
                  ? 'bg-[#002766] text-white hover:bg-[#003893] active:scale-95 shadow-xs'
                  : 'bg-[#76B900] text-black font-extrabold hover:bg-[#86d400] active:scale-95 shadow-xs'
                : 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-zinc-800 text-slate-400'
            }`}
          >
            <span>+ Thêm vào hàng đợi</span>
          </button>
        </div>
      </div>


      {/* Queue List Table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-300'}`}>
            Hàng đợi khay chuẩn bị mở khóa ({queue.length})
          </span>
        </div>

        {queue.length > 0 ? (
          <div className="border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`text-[11px] uppercase font-bold ${
                  isFoxconn ? 'bg-slate-50 text-slate-600' : 'bg-zinc-950 text-zinc-400'
                }`}
              >
                <tr>
                  <th className="px-3.5 py-2">STT</th>
                  <th className="px-3.5 py-2">Mã khay</th>
                  <th className="px-3.5 py-2">Chuyền</th>
                  <th className="px-3.5 py-2">Chu kỳ</th>
                  <th className="px-3.5 py-2 text-right">Xóa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
                {queue.map((item, idx) => (
                  <tr
                    key={item.carrierCode}
                    className={`transition-colors ${
                      isFoxconn ? 'hover:bg-slate-50' : 'hover:bg-zinc-800/40'
                    }`}
                  >
                    <td className="px-3.5 py-2 font-mono text-slate-400">{idx + 1}</td>
                    <td className="px-3.5 py-2 font-mono font-bold text-slate-800 dark:text-zinc-200">
                      {item.carrierCode}
                    </td>
                    <td className="px-3.5 py-2">{item.lineName}</td>
                    <td className="px-3.5 py-2 font-mono text-red-500 font-bold">{item.currentCycles}</td>
                    <td className="px-3.5 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.carrierCode)}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                        title="Bỏ khay này"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400 dark:text-zinc-500 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
            Chưa có khay nào trong hàng đợi. Hãy dán mã vào ô trên để thêm vào.
          </div>
        )}
      </div>
    </div>
  );
}

