/**
 * Bảng danh sách cấu hình vị trí vít (Screw Positions Master Table)
 * Gồm các trường:
 * 1. position
 * 2. torque (Standard ± Limit Unit)
 * 3. angle (Standard ± Limit Unit)
 * 4. volume (Standard ± Limit Unit)
 * 5. height (Standard ± Limit Unit)
 * 6. req (Required Position)
 * 7. active (Active / Bypass)
 * 8. action (Sửa & Xóa)
 * Hỗ trợ cuộn dọc & ngang mượt mà với custom-scrollbar và sticky thead.
 */
export default function ScrewPositionsTable({
  screwConfigs = [],
  editingId,
  isFoxconn = false,
  onEdit,
  onDelete,
  onToggleActive
}) {
  // Format hiển thị 1 thông số dạng: "1.20 ± 0.15 kgf.cm"
  const formatSpec = (paramObj, defaultUnit) => {
    if (!paramObj || paramObj.standard === undefined || paramObj.standard === '') {
      return <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>;
    }
    const std = Number(paramObj.standard).toFixed(2).replace(/\.00$/, '');
    const lim = Number(paramObj.limit || 0).toFixed(2).replace(/\.00$/, '');
    const unit = paramObj.unit || defaultUnit;

    return (
      <span className="font-semibold text-xs whitespace-nowrap">
        <span className={isFoxconn ? 'text-slate-800' : 'text-zinc-100 font-bold'}>{std}</span>
        <span className="text-slate-400 dark:text-zinc-500 mx-1">±</span>
        <span className={isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}>{lim}</span>
        <span className="text-[10px] text-slate-400 dark:text-zinc-400 ml-1 font-normal">{unit}</span>
      </span>
    );
  };

  return (
    <div
      className={`rounded-2xl border transition-all shadow-md overflow-hidden shrink-0 ${
        isFoxconn
          ? 'bg-white border-slate-200'
          : 'bg-zinc-900/95 border-zinc-800'
      }`}
    >
      {/* Header bar của bảng */}
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
            Bảng Cấu Hình Vị Trí Vít (Screw Positions Table)
          </h4>
          <span
            className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
              isFoxconn
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
            }`}
          >
            {screwConfigs.length} vị trí
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span
            className={`hidden sm:inline ${
              isFoxconn ? 'text-slate-500' : 'text-zinc-400'
            }`}
          >
            Áp dụng cho trạm bắt vít tự động AutoLine
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Nội dung bảng có khả năng cuộn dọc và cuộn ngang custom-scrollbar */}
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
              <th className="py-2.5 px-3 min-w-27.5">Position</th>
              <th className="py-2.5 px-3 min-w-32.5">Torque (Lực)</th>
              <th className="py-2.5 px-3 min-w-30">Angle (Góc)</th>
              <th className="py-2.5 px-3 min-w-31.25">Volume (Thể tích)</th>
              <th className="py-2.5 px-3 min-w-30">Height (Cao)</th>
              <th className="py-2.5 px-2.5 text-center min-w-17.5">Req</th>
              <th className="py-2.5 px-3 text-center min-w-23.75">Active</th>
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
            {screwConfigs.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="py-10 text-center text-xs text-slate-400 dark:text-zinc-400 font-medium"
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <span className="text-2xl">📭</span>
                    <span>Chưa có vị trí ốc nào.</span>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-500">
                      Hãy nhập thông tin ở khung{' '}
                      <strong className={isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}>
                        New Screw Position Config
                      </strong>{' '}
                      phía trên và nhấn <strong>Save</strong> để thêm vào bảng.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              screwConfigs.map((item, index) => {
                const isBeingEdited = editingId === item.id;

                return (
                  <tr
                    key={item.id || item.position || `screw-${index}`}
                    className={`transition-colors ${
                      isBeingEdited
                        ? isFoxconn
                          ? 'bg-amber-50/90 font-semibold ring-1 ring-inset ring-amber-300'
                          : 'bg-amber-950/30 font-semibold ring-1 ring-inset ring-amber-600/50'
                        : isFoxconn
                        ? index % 2 === 0 ? 'bg-white hover:bg-slate-50/80' : 'bg-slate-50/40 hover:bg-slate-100/70'
                        : index % 2 === 0 ? 'bg-zinc-900/40 hover:bg-zinc-800/60' : 'bg-zinc-950/30 hover:bg-zinc-800/60'
                    }`}
                  >
                    {/* Position */}
                    <td className="py-2.5 px-3 font-bold whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md border text-xs font-black ${
                          isFoxconn
                            ? 'bg-slate-100 text-[#002766] border-slate-300'
                            : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
                        }`}
                      >
                        {item.position}
                      </span>
                    </td>

                    {/* Torque */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {formatSpec(item.torque, 'kgf.cm')}
                    </td>

                    {/* Angle */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {formatSpec(item.angle, 'deg')}
                    </td>

                    {/* Volume */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {formatSpec(item.volume, 'mm³')}
                    </td>

                    {/* Height */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {formatSpec(item.height, 'mm')}
                    </td>

                    {/* Req (Required Position) */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      {item.isRequired ? (
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-md border ${
                            isFoxconn
                              ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs'
                              : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_6px_rgba(118,185,0,0.2)]'
                          }`}
                        >
                          <span>✓</span>
                          <span>Yes</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-zinc-600 font-bold text-xs">—</span>
                      )}
                    </td>

                    {/* Active Tolerance Check / Bypass */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onToggleActive && onToggleActive(item.id)}
                        title="Bấm để chuyển đổi Active / Bypass"
                        className="cursor-pointer transition-transform active:scale-95"
                      >
                        {item.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Bypass
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Action: Sửa & Xóa */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit && onEdit(item)}
                          title="Sửa vị trí ốc này"
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
                          onClick={() => onDelete && onDelete(item)}
                          title="Xóa vị trí ốc này"
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
