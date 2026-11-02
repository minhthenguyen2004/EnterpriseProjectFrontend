/**
 * Bảng nhật ký kiểm toán cấu hình máy (Audit Logs Master Table)
 * Các trường dữ liệu:
 * 1. id: Mã bản ghi log (#14, #13...)
 * 2. time/operator: Thời gian thực hiện kèm Mã NV - Tên nhân viên
 * 3. action: Hành động thực hiện (CREATE, UPDATE, DELETE, ROLLBACK, BYPASS)
 * 4. target table: Bảng / Phân hệ mục tiêu
 * 5. description: Mô tả chi tiết biến động
 * 6. actions: Cụm nút thao tác (Diff & Rollback)
 * 
 * Trên cùng của bảng có nút Refresh làm mới dữ liệu và ô tìm kiếm/lọc nhanh.
 */
export default function AuditLogsTable({
  logs = [],
  searchQuery = '',
  isRefreshing = false,
  isFoxconn = false,
  onSearchChange,
  onRefresh,
  onViewDiff,
  onRollback
}) {
  // Helper render badge Action với màu sắc trực quan
  const renderActionBadge = (action) => {
    const act = (action || '').toUpperCase();
    let badgeStyle = '';

    if (act === 'CREATE') {
      badgeStyle = isFoxconn
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-emerald-950/70 text-emerald-300 border-emerald-800';
    } else if (act === 'UPDATE') {
      badgeStyle = isFoxconn
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-amber-950/70 text-amber-300 border-amber-800';
    } else if (act === 'DELETE') {
      badgeStyle = isFoxconn
        ? 'bg-rose-50 text-rose-700 border-rose-200'
        : 'bg-rose-950/70 text-rose-300 border-rose-800';
    } else if (act === 'ROLLBACK') {
      badgeStyle = isFoxconn
        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
        : 'bg-indigo-950/70 text-indigo-300 border-indigo-800';
    } else {
      badgeStyle = isFoxconn
        ? 'bg-slate-100 text-slate-700 border-slate-200'
        : 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }

    return (
      <span
        className={`inline-block font-bold text-[10px] uppercase px-2 py-0.5 rounded border ${badgeStyle}`}
      >
        {act}
      </span>
    );
  };

  // Helper render badge Target Table
  const renderTableBadge = (table) => {
    return (
      <span
        className={`font-bold text-[11px] px-2 py-0.5 rounded border ${
          isFoxconn
            ? 'bg-slate-100 text-slate-800 border-slate-200'
            : 'bg-zinc-950 text-zinc-200 border-zinc-800'
        }`}
      >
        {table}
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
      {/* TRÊN CÙNG CỦA BẢNG: Toolbar Header kèm Nút Refresh và Ô Tìm Kiếm */}
      <div
        className={`px-3.5 sm:px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
          isFoxconn ? 'bg-slate-100/80 border-slate-200' : 'bg-zinc-950/80 border-zinc-800'
        }`}
      >
        {/* Tiêu đề & Đếm bản ghi */}
        <div className="flex items-center gap-2">
          <span className="text-base">📜</span>
          <h4
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-800' : 'text-zinc-100'
            }`}
          >
            Nhật Ký Kiểm Toán Cấu Hình (Audit Logs Table)
          </h4>
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              isFoxconn
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
            }`}
          >
            {logs.length} bản ghi
          </span>
        </div>

        {/* Cụm công cụ: Ô Search + NÚT REFRESH TRÊN CÙNG CỦA BẢNG */}
        <div className="flex items-center gap-2.5">
          {/* Ô Tìm kiếm nhanh */}
          <div className="relative min-w-52.5 sm:min-w-60">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="🔍 Lọc mã NV, tên, bảng, thao tác..."
              className={`w-full pl-2.5 pr-6 py-1.5 rounded-xl text-xs border outline-none transition-all ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-100'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* NÚT REFRESH TRÊN CÙNG CỦA BẢNG */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Làm mới danh sách nhật ký kiểm toán từ server"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 disabled:opacity-50 ${
              isFoxconn
                ? 'bg-white hover:bg-slate-50 text-[#002766] border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
          >
            <span className={`text-sm ${isRefreshing ? 'animate-spin' : ''}`}>⟲</span>
            <span className="font-bold">Refresh</span>
          </button>
        </div>
      </div>

      {/* NỘI DUNG BẢNG: Có khả năng cuộn dọc và ngang custom-scrollbar */}
      <div className="overflow-x-auto overflow-y-auto max-h-52.5 sm:max-h-62.5 custom-scrollbar w-full">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 z-10 shadow-2xs backdrop-blur-md">
            <tr
              className={`border-b text-[11px] font-black uppercase tracking-wider select-none ${
                isFoxconn
                  ? 'bg-slate-100/95 text-slate-700 border-slate-200'
                  : 'bg-zinc-950/95 text-zinc-300 border-zinc-800'
              }`}
            >
              <th className="py-2.5 px-3 min-w-16.25">ID</th>
              <th className="py-2.5 px-3 min-w-52.5">Time / Operator</th>
              <th className="py-2.5 px-3 text-center min-w-22.5">Action</th>
              <th className="py-2.5 px-3 min-w-32.5">Target Table</th>
              <th className="py-2.5 px-3 min-w-60">Description</th>
              <th className="py-2.5 px-3 text-center min-w-35">Actions</th>
            </tr>
          </thead>

          <tbody
            className={`divide-y ${
              isFoxconn
                ? 'divide-slate-200 text-slate-700'
                : 'divide-zinc-800/80 text-zinc-300'
            }`}
          >
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center">
                  <div className="flex flex-col items-center justify-center gap-1.5 opacity-60">
                    <span className="text-2xl">📜</span>
                    <span className="text-xs font-sans">
                      {searchQuery
                        ? `Không tìm thấy nhật ký kiểm toán phù hợp với từ khóa "${searchQuery}"`
                        : 'Chưa có bản ghi nhật ký kiểm toán nào được ghi nhận.'}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              logs.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`transition-colors select-none ${
                    isFoxconn
                      ? index % 2 === 0
                        ? 'bg-white hover:bg-slate-50'
                        : 'bg-slate-50/50 hover:bg-slate-100/70'
                      : index % 2 === 0
                      ? 'bg-zinc-900/50 hover:bg-zinc-800/60'
                      : 'bg-zinc-900/20 hover:bg-zinc-800/50'
                  }`}
                >
                  {/* Cột 1: ID */}
                  <td className="py-2 px-3 font-bold text-xs text-slate-400 dark:text-zinc-500">
                    #{item.id}
                  </td>

                  {/* Cột 2: Time / Operator (Mã nhân viên kèm tên nhân viên) */}
                  <td className="py-2 px-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-[10px] text-slate-500 dark:text-zinc-400">
                        {item.timestamp}
                      </span>
                      <span className="font-bold text-xs text-slate-800 dark:text-zinc-100 flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                          {item.operatorId}
                        </span>
                        <span className={`${isFoxconn ? 'text-blue-600' : 'text-[#76B900]'} font-bold`}>{item.operatorName}</span>
                      </span>
                    </div>
                  </td>

                  {/* Cột 3: Action */}
                  <td className="py-2 px-3 text-center">
                    {renderActionBadge(item.action)}
                  </td>

                  {/* Cột 4: Target Table */}
                  <td className="py-2 px-3">
                    {renderTableBadge(item.targetTable)}
                  </td>

                  {/* Cột 5: Description */}
                  <td className="py-2 px-3 max-w-70">
                    <p
                      title={item.description}
                      className={`text-xs leading-relaxed truncate ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'} font-sans`}
                    >
                      {item.description}
                    </p>
                  </td>

                  {/* Cột 6: Actions (Nút Diff và Nút Rollback) */}
                  <td className="py-2 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* NÚT DIFF (So sánh phiên bản) */}
                      <button
                        type="button"
                        onClick={() => onViewDiff && onViewDiff(item)}
                        title="Xem đối chiếu chi tiết Trước vs Sau (Diff Before/After)"
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                          isFoxconn
                            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-zinc-800 hover:bg-blue-950/60 text-blue-400 border-blue-800/60'
                        }`}
                      >
                        <span>🔍</span>
                        <span>Diff</span>
                      </button>

                      {/* NÚT ROLLBACK (Hoàn tác phiên bản) */}
                      <button
                        type="button"
                        onClick={() => onRollback && onRollback(item)}
                        title="Hoàn tác cấu hình về phiên bản này (Rollback)"
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                          isFoxconn
                            ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                            : 'bg-zinc-800 hover:bg-indigo-950/60 text-indigo-400 border-indigo-800/60'
                        }`}
                      >
                        <span>⏪</span>
                        <span>Rollback</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
