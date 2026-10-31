/**
 * Bảng danh sách Cấu hình Định tuyến (Routing Configs Table):
 * 8 cột: Product, Line, Step, Twin Step, Mode, Carrier Swap, Picker, Action (Sửa, Xóa).
 */
export default function RoutingConfigsTable({
  routingConfigs = [],
  editingId = null,
  currentMode = 0,
  defaultStepCode = 'ST01',
  defaultProduct = 'NVIDIA HGX B200',
  defaultLine = 'Line 01',
  isFoxconn = false,
  onEditClick,
  onDeleteClick
}) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-xs'
          : 'bg-zinc-900/90 border-zinc-800 shadow-xl'
      }`}
    >
      {/* Header bar của Bảng */}
      <div
        className={`px-4 py-2.5 border-b flex items-center justify-between ${
          isFoxconn ? 'bg-slate-100/70 border-slate-200' : 'bg-zinc-950/70 border-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">📋</span>
          <span
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-800' : 'text-zinc-200'
            }`}
          >
            Danh Sách Cấu Hình Định Tuyến (Routing Configs Table)
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.2 rounded-full font-bold ${
              isFoxconn ? 'bg-blue-100 text-blue-700' : 'bg-zinc-800 text-[#76B900]'
            }`}
          >
            {routingConfigs.length} cấu hình
          </span>
        </div>

        <span
          className={`text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}
        >
          Áp dụng trên toàn tuyến sản xuất
        </span>
      </div>

      {/* Nội dung bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isFoxconn
                  ? 'bg-slate-50 text-slate-600 border-slate-200'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800'
              }`}
            >
              <th className="py-2.5 px-3">Product</th>
              <th className="py-2.5 px-3">Line</th>
              <th className="py-2.5 px-3">Step</th>
              <th className="py-2.5 px-3">Twin Step</th>
              <th className="py-2.5 px-3">Mode</th>
              <th className="py-2.5 px-3 text-center">Carrier Swap</th>
              <th className="py-2.5 px-3 text-center">Picker</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isFoxconn ? 'divide-slate-200' : 'divide-zinc-800/80'
            }`}
          >
            {routingConfigs.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="py-8 text-center text-xs text-slate-400 dark:text-zinc-500 font-medium"
                >
                  Chưa có cấu hình trạm song song nào. Hãy nhập thông tin ở khung{' '}
                  <strong className={isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}>
                    Add Twin Step Config
                  </strong>{' '}
                  và nhấn <strong>Save</strong> để thêm vào bảng.
                </td>
              </tr>
            ) : (
              routingConfigs.map((item) => {
                const isBeingEdited = editingId === item.id;
                const displayMode = item.mode !== undefined ? item.mode : currentMode;
                const isUploadFirst = Number(displayMode) === 1;

                return (
                  <tr
                    key={item.id || item.twinStep}
                    className={`transition-colors ${
                      isBeingEdited
                        ? isFoxconn
                          ? 'bg-blue-50/80 font-medium'
                          : 'bg-zinc-800/90 font-medium'
                        : isFoxconn
                        ? 'hover:bg-slate-50'
                        : 'hover:bg-zinc-800/50'
                    }`}
                  >
                    {/* 1. Product */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-xs">
                        {item.product || defaultProduct}
                      </span>
                    </td>

                    {/* 2. Line */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 dark:text-zinc-300 font-medium">
                      {item.line || defaultLine}
                    </td>

                    {/* 3. Step */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        {item.step || defaultStepCode}
                      </span>
                    </td>

                    {/* 4. Twin Step */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`font-mono font-black text-xs px-2 py-0.5 rounded ${
                          isFoxconn
                            ? 'bg-blue-50 text-[#002766] border border-blue-200'
                            : 'bg-zinc-800 text-[#76B900] border border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
                        }`}
                      >
                        {item.twinStep}
                      </span>
                    </td>

                    {/* 5. Mode */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {isUploadFirst ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800">
                          <span>Mode 1:</span>
                          <span className="font-medium">Upload Data First</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
                          <span>Mode 0:</span>
                          <span className="font-medium">Standard</span>
                        </span>
                      )}
                    </td>

                    {/* 6. Carrier Swap */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      {item.allowCarrierSwap ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                          <span>✓</span>
                          <span>Allow Swap</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>
                      )}
                    </td>

                    {/* 7. Picker */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      {item.isPicker ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded">
                          <span>✓</span>
                          <span>Resolve SN</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>
                      )}
                    </td>

                    {/* 8. Action (Sửa và Xóa) */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEditClick(item)}
                          title="Sửa cấu hình định tuyến này"
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            isFoxconn
                              ? 'text-amber-600 hover:bg-amber-100'
                              : 'text-amber-400 hover:bg-zinc-800'
                          }`}
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteClick(item)}
                          title="Xóa cấu hình định tuyến này"
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            isFoxconn
                              ? 'text-rose-600 hover:bg-rose-100'
                              : 'text-rose-400 hover:bg-zinc-800'
                          }`}
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
