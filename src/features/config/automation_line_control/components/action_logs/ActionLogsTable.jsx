import useTheme from '../../../../../hooks/useTheme';
import {
  PAGE_SIZE_OPTIONS,
  ACTION_BADGE_CONFIG,
  STATUS_BADGE_CONFIG,
} from '../../constants/actionLogsConstants';

/**
 * ActionLogsTable
 * Bảng hiển thị danh sách nhật ký kiểm toán, lọc số dòng & điều khiển phân trang.
 * Các cột: ID, Thời gian, Người thực hiện, Hành động, Bảng đích, Mục tiêu, Mô tả chi tiết, Trạng thái, Thao tác.
 */
export default function ActionLogsTable({
  logs,
  pageSize,
  onPageSizeChange,
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
  onViewDetail,
  onViewDiff,
  onOpenRestore,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const startIndex = (currentPage - 1) * pageSize;
  const displayStart = totalRecords === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(startIndex + pageSize, totalRecords);

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-sm text-slate-800'
          : 'bg-zinc-900/80 border-zinc-800 text-zinc-100 shadow-lg'
      }`}
    >
      {/* Thanh Header của Bảng: Chọn số dòng & Tóm tắt số lượng */}
      <div
        className={`px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b ${
          isFoxconn
            ? 'bg-slate-50/80 border-slate-200 text-slate-700'
            : 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span>Hiển thị:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={`px-2 py-1 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-100'
              }`}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option
                  key={size}
                  value={size}
                  className={isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'}
                >
                  {size} dòng / trang
                </option>
              ))}
            </select>
          </div>

          <span className={isFoxconn ? 'text-slate-300' : 'text-zinc-700'}>|</span>

          <span className={`text-xs ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>
            Hiển thị <strong className={isFoxconn ? 'text-slate-800' : 'text-zinc-100'}>{displayStart} - {displayEnd}</strong>{' '}
            trong tổng số <strong className={isFoxconn ? 'text-slate-800' : 'text-zinc-100'}>{totalRecords}</strong> bản ghi
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className={`text-[11px] font-semibold ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>
            Trang {currentPage} / {totalPages}
          </span>
        </div>
      </div>

      {/* Vùng Bảng Dữ Liệu Cuộn Ngang An Toàn */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                isFoxconn
                  ? 'bg-slate-100/90 text-slate-700 border-slate-200'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800'
              }`}
            >
              <th className="py-2.5 px-3 whitespace-nowrap">ID Tác Vụ</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Thời Gian</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Người Thực Hiện</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Hành Động</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Bảng Đích</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Mục Tiêu</th>
              <th className="py-2.5 px-3 min-w-50">Mô Tả Chi Tiết</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Trạng Thái</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap">Thao Tác</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y font-mono ${
              isFoxconn ? 'divide-slate-100' : 'divide-zinc-800/80'
            }`}
          >
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className={`py-12 text-center font-sans ${
                    isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl">📋</span>
                    <span className="text-xs font-semibold">
                      Không tìm thấy bản ghi kiểm toán nào phù hợp với bộ lọc.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              logs.map((row) => {
                const actionBadge = ACTION_BADGE_CONFIG[row.actionType] || {
                  label: row.actionType.toUpperCase(),
                  color: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
                };
                const statusBadge = STATUS_BADGE_CONFIG[row.status] || {
                  label: row.status,
                  color: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
                };

                return (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      isFoxconn
                        ? 'hover:bg-blue-50/40 text-slate-800'
                        : 'hover:bg-zinc-800/50 text-zinc-200'
                    }`}
                  >
                    {/* Cột 1: ID Tác Vụ */}
                    <td
                      className={`py-2.5 px-3 font-bold whitespace-nowrap ${
                        isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                      }`}
                    >
                      {row.id}
                    </td>

                    {/* Cột 2: Thời Gian */}
                    <td
                      className={`py-2.5 px-3 whitespace-nowrap text-[11px] ${
                        isFoxconn ? 'text-slate-600' : 'text-zinc-400'
                      }`}
                    >
                      {row.timestamp}
                    </td>

                    {/* Cột 3: Người Thực Hiện */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                        }`}
                      >
                        <span>{row.operatorId}</span>
                        <span
                          className={`text-[10px] ${
                            isFoxconn ? 'text-slate-400' : 'text-zinc-500'
                          }`}
                          title="Đã xác thực phiên đăng nhập"
                        >
                          🔒
                        </span>
                      </span>
                    </td>

                    {/* Cột 4: Hành Động */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold border ${actionBadge.color}`}
                      >
                        {actionBadge.label}
                      </span>
                    </td>

                    {/* Cột 5: Bảng Đích */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold border ${
                          isFoxconn
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-zinc-800/80 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        <span className="text-[10px]">🗄️</span>
                        <span>{row.targetTable}</span>
                      </span>
                    </td>

                    {/* Cột 6: Mục Tiêu (SN / Carrier) */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-1 py-0.2 rounded text-[9px] font-extrabold ${
                            row.targetType === 'sn'
                              ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                              : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                          }`}
                        >
                          {row.targetType.toUpperCase()}
                        </span>
                        <span
                          className={`font-bold ${
                            isFoxconn ? 'text-slate-800' : 'text-zinc-100'
                          }`}
                        >
                          {row.targetCode}
                        </span>
                      </div>
                    </td>

                    {/* Cột 7: Mô Tả Chi Tiết */}
                    <td
                      className={`py-2.5 px-3 font-sans text-xs ${
                        isFoxconn ? 'text-slate-700' : 'text-zinc-300'
                      }`}
                    >
                      {row.description}
                    </td>

                    {/* Cột 8: Trạng Thái */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Cột 9: Bộ Ba Thao Tác (Xem chi tiết, Diff Old/New, Restore) */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5 font-sans">
                        {/* Nút 1: Xem chi tiết */}
                        <button
                          type="button"
                          onClick={() => onViewDetail(row)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                            isFoxconn
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                          }`}
                          title="Xem toàn văn Metadata, IP và Payload"
                        >
                          <span>👁️</span>
                          <span>Xem</span>
                        </button>

                        {/* Nút 2: Đối soát Diff */}
                        <button
                          type="button"
                          onClick={() => onViewDiff(row)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                            isFoxconn
                              ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                              : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                          }`}
                          title="So sánh trực quan trạng thái Cũ và Mới"
                        >
                          <span>⚖️</span>
                          <span>Diff</span>
                        </button>

                        {/* Nút 3: Restore */}
                        <button
                          type="button"
                          onClick={() => onOpenRestore(row)}
                          disabled={!row.canRestore || row.status === 'RESTORED'}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 border ${
                            row.canRestore && row.status !== 'RESTORED'
                              ? isFoxconn
                                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200 cursor-pointer shadow-xs'
                                : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 cursor-pointer shadow-xs'
                              : isFoxconn
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                                : 'bg-zinc-800/40 text-zinc-600 border-zinc-800 cursor-not-allowed opacity-60'
                          }`}
                          title={
                            row.status === 'RESTORED'
                              ? 'Bản ghi này đã được hoàn nguyên.'
                              : row.canRestore
                              ? 'Phục hồi trạng thái về trước khi xảy ra thay đổi'
                              : 'Hành động không hỗ trợ phục hồi'
                          }
                        >
                          <span>⏪</span>
                          <span>Restore</span>
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

      {/* Phân Trang Chân Bảng */}
      {totalPages > 1 && (
        <div
          className={`px-4 py-3 flex items-center justify-between border-t ${
            isFoxconn
              ? 'bg-slate-50/80 border-slate-200'
              : 'bg-zinc-950/60 border-zinc-800'
          }`}
        >
          <div className={`text-xs ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>
            Trang <strong className={isFoxconn ? 'text-slate-800' : 'text-zinc-100'}>{currentPage}</strong> trên tổng số <strong className={isFoxconn ? 'text-slate-800' : 'text-zinc-100'}>{totalPages}</strong>
          </div>

          <div className="flex items-center gap-1 text-xs">
            {/* Nút Trang Đầu */}
            <button
              type="button"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded-lg border text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
                isFoxconn
                  ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                  : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              ⏮ Đầu
            </button>

            {/* Nút Trước */}
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
                isFoxconn
                  ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                  : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              ◀ Trước
            </button>

            {/* Danh sách các nút số trang */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - currentPage) <= 1
              )
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;

                return (
                  <span key={p} className="flex items-center">
                    {showEllipsis && (
                      <span className={`px-1 font-bold ${isFoxconn ? 'text-slate-400' : 'text-zinc-500'}`}>
                        ...
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onPageChange(p)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        p === currentPage
                          ? isFoxconn
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-[#76B900] text-black font-extrabold shadow-xs'
                          : isFoxconn
                            ? 'border border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                            : 'border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                );
              })}

            {/* Nút Sau */}
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
                isFoxconn
                  ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                  : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              Sau ▶
            </button>

            {/* Nút Cuối */}
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded-lg border text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
                isFoxconn
                  ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                  : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              Cuối ⏭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}