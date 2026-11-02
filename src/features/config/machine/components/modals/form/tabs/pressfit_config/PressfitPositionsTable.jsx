/**
 * Bảng danh sách cấu hình vị trí ép lực nhấn (Pressfit Positions Master Table)
 * Gồm các trường dữ liệu:
 * 1. position: Vị trí ép
 * 2. force: Lực nhấn (Standard ± Limit Unit)
 * 3. time: Thời gian giữ (Standard ± Limit Unit)
 * 4. distance: Hành trình ép (Standard ± Limit Unit)
 * 5. req: Vị trí ép bắt buộc (Required Position)
 * 6. active: Chốt an toàn kiểm soát dung sai (Active / Bypass)
 * 7. action: Cụm nút thao tác (Sửa & Xóa)
 * Hỗ trợ cuộn dọc & ngang mượt mà với custom-scrollbar và sticky thead.
 */
export default function PressfitPositionsTable({
  pressfitConfigs = [],
  editingId,
  isFoxconn = false,
  onEdit,
  onDelete,
  onToggleActive
}) {
  // Format hiển thị 1 thông số dạng: "1500.00 ± 50.00 N"
  const formatSpec = (paramObj, defaultUnit) => {
    if (!paramObj || paramObj.standard === undefined || paramObj.standard === '') {
      return <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>;
    }
    const std = Number(paramObj.standard).toFixed(2).replace(/\.00$/, '');
    const lim = Number(paramObj.limit || 0).toFixed(2).replace(/\.00$/, '');
    const unit = paramObj.unit || defaultUnit;

    return (
      <span className="text-xs font-semibold whitespace-nowrap">
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
            Bảng Cấu Hình Vị Trí Ép (Pressfit Positions Table)
          </h4>
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              isFoxconn
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
            }`}
          >
            {pressfitConfigs.length} vị trí
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span
            className={`hidden sm:inline ${
              isFoxconn ? 'text-slate-500' : 'text-zinc-400'
            }`}
          >
            Áp dụng cho trạm ép tự động AutoLine (ST05)
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
              <th className="py-2.5 px-3 min-w-32.5">Force (Lực)</th>
              <th className="py-2.5 px-3 min-w-30">Time (Thời gian)</th>
              <th className="py-2.5 px-3 min-w-30">Distance (Hành trình)</th>
              <th className="py-2.5 px-2.5 text-center min-w-16.25">Req</th>
              <th className="py-2.5 px-3 text-center min-w-22.5">Active</th>
              <th className="py-2.5 px-3 text-center min-w-26.25">Action</th>
            </tr>
          </thead>

          <tbody
            className={`divide-y font-bold ${
              isFoxconn
                ? 'divide-slate-200 text-slate-700'
                : 'divide-zinc-800/80 text-zinc-300'
            }`}
          >
            {pressfitConfigs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-1.5 opacity-60">
                    <span className="text-2xl">🗜️</span>
                    <span className="text-xs font-sans">
                      Chưa có cấu hình vị trí ép nào. Nhập thông số ở khung phía trên để thêm mới!
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              pressfitConfigs.map((item, index) => {
                const isSelected = item.id === editingId;

                return (
                  <tr
                    key={item.id || index}
                    className={`transition-colors select-none ${
                      isSelected
                        ? isFoxconn
                          ? 'bg-blue-50/90 font-bold'
                          : 'bg-amber-950/30 border-l-2 border-[#76B900]'
                        : isFoxconn
                        ? index % 2 === 0
                          ? 'bg-white hover:bg-slate-50'
                          : 'bg-slate-50/50 hover:bg-slate-100/70'
                        : index % 2 === 0
                        ? 'bg-zinc-900/50 hover:bg-zinc-800/60'
                        : 'bg-zinc-900/20 hover:bg-zinc-800/50'
                    }`}
                  >
                    {/* Cột 1: Position */}
                    <td className="py-2 px-3 font-bold text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 dark:text-zinc-500 text-[10px]">#{index + 1}</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded border ${
                            isFoxconn
                              ? 'bg-slate-100 text-slate-900 border-slate-300'
                              : 'bg-zinc-950 text-zinc-100 border-zinc-700'
                          }`}
                        >
                          {item.position}
                        </span>
                      </div>
                    </td>

                    {/* Cột 2: Force */}
                    <td className="py-2 px-3">{formatSpec(item.force, 'N')}</td>

                    {/* Cột 3: Time */}
                    <td className="py-2 px-3">{formatSpec(item.time, 's')}</td>

                    {/* Cột 4: Distance */}
                    <td className="py-2 px-3">{formatSpec(item.distance, 'mm')}</td>

                    {/* Cột 5: Req (Required Position) */}
                    <td className="py-2 px-2.5 text-center">
                      {item.isRequired ? (
                        <span
                          title="Vị trí ép bắt buộc (Required)"
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isFoxconn
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                          }`}
                        >
                          ✓ Yes
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>
                      )}
                    </td>

                    {/* Cột 6: Active (Active / Bypass) */}
                    <td className="py-2 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleActive && onToggleActive(item.id)}
                        title={
                          item.isActive
                            ? 'Đang kiểm soát dung sai. Bấm để chuyển sang Bypass.'
                            : 'Đang Bypass bỏ qua dung sai. Bấm để kích hoạt Active.'
                        }
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border cursor-pointer transition-all hover:scale-105 ${
                          item.isActive
                            ? isFoxconn
                              ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                              : 'bg-emerald-950/70 text-emerald-300 border-emerald-700 hover:bg-emerald-900/60'
                            : isFoxconn
                            ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                            : 'bg-amber-950/70 text-amber-300 border-amber-700 hover:bg-amber-900/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isActive ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        <span>{item.isActive ? 'Active' : 'Bypass'}</span>
                      </button>
                    </td>

                    {/* Cột 7: Action (Sửa & Xóa) */}
                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Nút Sửa */}
                        <button
                          type="button"
                          onClick={() => onEdit && onEdit(item)}
                          title="Chỉnh sửa vị trí ép này"
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                            isSelected
                              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                              : isFoxconn
                              ? 'bg-white hover:bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-zinc-800 hover:bg-amber-950/50 text-amber-400 border-amber-800/60'
                          }`}
                        >
                          <span>✏️</span>
                          <span className="hidden sm:inline">Sửa</span>
                        </button>

                        {/* Nút Xóa */}
                        <button
                          type="button"
                          onClick={() => onDelete && onDelete(item)}
                          title="Xóa cấu hình vị trí ép này"
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                            isFoxconn
                              ? 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-zinc-800 hover:bg-rose-950/50 text-rose-400 border-rose-800/60'
                          }`}
                        >
                          <span>🗑️</span>
                          <span className="hidden sm:inline">Xóa</span>
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
