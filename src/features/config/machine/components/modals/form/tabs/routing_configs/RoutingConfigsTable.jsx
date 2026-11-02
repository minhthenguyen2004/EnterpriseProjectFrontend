/**
 * Bảng danh sách Cấu hình Định tuyến (Routing Configs Table):
 * 8 cột: Product, Line, Step, Twin Step, Mode, Carrier Swap, Picker, Action (Sửa, Xóa).
 * Thiết kế chuẩn UI công nghiệp, tối ưu hiển thị sắc nét, không bị tràn khuất viền.
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
      className={`rounded-2xl border transition-all shadow-md overflow-hidden shrink-0 ${
        isFoxconn
          ? 'bg-white border-slate-200'
          : 'bg-zinc-900/95 border-zinc-800'
      }`}
    >
      {/* Header bar của Bảng */}
      <div
        className={`px-3.5 sm:px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 ${
          isFoxconn ? 'bg-slate-100/80 border-slate-200' : 'bg-zinc-950/80 border-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">📋</span>
          <h4
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-800' : 'text-zinc-100'
            }`}
          >
            Danh Sách Cấu Hình Định Tuyến (Routing Configs Table)
          </h4>
          <span
            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-black border ${
              isFoxconn
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
            }`}
          >
            {routingConfigs.length} cấu hình
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span
            className={`hidden sm:inline ${
              isFoxconn ? 'text-slate-500' : 'text-zinc-400'
            }`}
          >
            Tự động đồng bộ toàn tuyến sản xuất
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Nội dung bảng dữ liệu với scroll ngang và dọc custom-scrollbar */}
      <div className="overflow-x-auto overflow-y-auto max-h-41.25 sm:max-h-50 custom-scrollbar w-full">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 z-10 shadow-2xs backdrop-blur-md">
            <tr
              className={`border-b text-[11px] font-black uppercase tracking-wider select-none ${
                isFoxconn
                  ? 'bg-slate-100/95 text-slate-700 border-slate-200'
                  : 'bg-zinc-950/95 text-zinc-300 border-zinc-800'
              }`}
            >
              <th className="py-2.5 px-3 min-w-30">Product</th>
              <th className="py-2.5 px-3 min-w-27.5">Line</th>
              <th className="py-2.5 px-2.5 text-center min-w-17.5">Step</th>
              <th className="py-2.5 px-2.5 text-center min-w-22.5">Twin Step</th>
              <th className="py-2.5 px-3 min-w-28.75">Mode</th>
              <th className="py-2.5 px-2.5 text-center min-w-23.75">Carrier Swap</th>
              <th className="py-2.5 px-2.5 text-center min-w-23.75">Picker</th>
              <th className="py-2.5 px-3 text-center min-w-30">Action</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y font-medium ${
              isFoxconn
                ? 'divide-slate-200 bg-white'
                : 'divide-zinc-800/80 bg-zinc-900/60'
            }`}
          >
            {routingConfigs.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="py-10 text-center text-xs text-slate-400 dark:text-zinc-400 font-medium"
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <span className="text-2xl">📭</span>
                    <span>Chưa có cấu hình trạm song song nào.</span>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-500">
                      Hãy nhập số trạm ở khung{' '}
                      <strong className={isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}>
                        Thêm Trạm Song Song
                      </strong>{' '}
                      phía trên và nhấn <strong>Save</strong> để thêm vào bảng.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              routingConfigs.map((item, index) => {
                const isBeingEdited = editingId === item.id;
                const displayMode = item.mode !== undefined ? item.mode : currentMode;
                const isUploadFirst = Number(displayMode) === 1;

                return (
                  <tr
                    key={item.id || `twin-${item.twinStep}-${index}`}
                    className={`transition-colors ${
                      isBeingEdited
                        ? isFoxconn
                          ? 'bg-blue-50/90 font-semibold ring-1 ring-inset ring-blue-300'
                          : 'bg-zinc-800/90 font-semibold ring-1 ring-inset ring-[#76B900]/50'
                        : isFoxconn
                        ? index % 2 === 0 ? 'bg-white hover:bg-slate-50/80' : 'bg-slate-50/40 hover:bg-slate-100/70'
                        : index % 2 === 0 ? 'bg-zinc-900/40 hover:bg-zinc-800/60' : 'bg-zinc-950/30 hover:bg-zinc-800/60'
                    }`}
                  >
                    {/* 1. Product */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        title={item.product || defaultProduct}
                        className={`inline-block max-w-37.5 truncate text-xs font-bold ${
                          isFoxconn ? 'text-slate-900' : 'text-zinc-100'
                        }`}
                      >
                        {item.product || defaultProduct}
                      </span>
                    </td>

                    {/* 2. Line */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        title={item.line || defaultLine}
                        className={`inline-block max-w-32.5 truncate text-xs ${
                          isFoxconn ? 'text-slate-700' : 'text-zinc-300'
                        }`}
                      >
                        {item.line || defaultLine}
                      </span>
                    </td>

                    {/* 3. Step */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      <span className="inline-block font-mono font-bold text-[11px] px-2 py-0.5 rounded border bg-slate-100 text-slate-800 border-slate-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 shadow-2xs">
                        {item.step || defaultStepCode}
                      </span>
                    </td>

                    {/* 4. Twin Step */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-block font-mono font-black text-xs px-2.5 py-0.5 rounded-md border ${
                          isFoxconn
                            ? 'bg-blue-50 text-[#002766] border-blue-200 shadow-xs'
                            : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.25)]'
                        }`}
                      >
                        #{item.twinStep}
                      </span>
                    </td>

                    {/* 5. Mode */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {isUploadFirst ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800 shadow-2xs">
                          <span>Mode 1:</span>
                          <span className="font-semibold">Upload First</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 shadow-2xs">
                          <span>Mode 0:</span>
                          <span className="font-semibold">Standard</span>
                        </span>
                      )}
                    </td>

                    {/* 6. Carrier Swap */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      {item.allowCarrierSwap ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-md shadow-2xs">
                          <span>✓</span>
                          <span>Allow Swap</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-zinc-600 font-bold text-xs">
                          —
                        </span>
                      )}
                    </td>

                    {/* 7. Picker */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      {item.isPicker ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-700 px-2 py-0.5 rounded-md shadow-2xs">
                          <span>✓</span>
                          <span>Resolve SN</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-zinc-600 font-bold text-xs">
                          —
                        </span>
                      )}
                    </td>

                    {/* 8. Action (Sửa và Xóa) */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEditClick(item)}
                          title="Sửa cấu hình trạm song song này"
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all active:scale-95 cursor-pointer flex items-center gap-1 shadow-2xs ${
                            isFoxconn
                              ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                              : 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/60 hover:border-amber-700'
                          }`}
                        >
                          <span>✏️</span>
                          <span>Sửa</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteClick(item)}
                          title="Xóa cấu hình trạm song song này"
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all active:scale-95 cursor-pointer flex items-center gap-1 shadow-2xs ${
                            isFoxconn
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:border-rose-300'
                              : 'bg-rose-950/40 text-rose-300 border-rose-800/60 hover:bg-rose-900/60 hover:border-rose-700'
                          }`}
                        >
                          <span>🗑️</span>
                          <span>Xóa</span>
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
