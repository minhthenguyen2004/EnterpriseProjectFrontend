import useTheme from '../../../../../hooks/useTheme';
import useActionLogsRestoreData from '../../hooks/useActionLogsRestoreData';
import {
  ActionLogsFilterBar,
  ActionLogsTable,
  ActionLogDetailModal,
  ActionLogDiffModal,
  ActionLogRestoreModal,
} from '.';

/**
 * Tab 4: Action Logs & State Restore Center
 * Trung tâm kiểm soát nhật ký tác vụ, đối soát Diff Old/New và an toàn hoàn nguyên CSDL.
 *
 * @param {Object} props
 * @param {Object} props.filters - Bộ lọc toàn cục từ trang chính (snCarrier, model, stationGroup...)
 */
export default function ActionLogsRestoreTab({ filters: globalFilters }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    filters,
    handleFilterChange,
    handleResetFilters,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalPages,
    totalRecords,
    paginatedLogs,
    // Modals
    selectedDetailLog,
    isDetailOpen,
    handleOpenDetail,
    handleCloseDetail,
    selectedDiffLog,
    isDiffOpen,
    diffViewMode,
    setDiffViewMode,
    handleOpenDiff,
    handleCloseDiff,
    selectedRestoreLog,
    isRestoreOpen,
    restoreReason,
    setRestoreReason,
    confirmRisk,
    setConfirmRisk,
    isRestoring,
    handleOpenRestore,
    handleCloseRestore,
    handleConfirmRestore,
    handleExportReport,
    toast,
  } = useActionLogsRestoreData(globalFilters);

  return (
    <div className="space-y-4">
      {/* Toast Thông Báo Nổi (Nếu Có) */}
      {toast && (
        <div
          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-lg transition-all border ${
            toast.type === 'error'
              ? isFoxconn
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
              : toast.type === 'info'
              ? isFoxconn
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-blue-500/15 border-blue-500/30 text-blue-400'
              : isFoxconn
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-emerald-500/15 border-emerald-500/30 text-[#76B900]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✅'}</span>
            <span>{toast.message}</span>
          </div>
          <span className={`text-[10px] font-mono ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
            Tự động ẩn
          </span>
        </div>
      )}

      {/* 1. Khung Chứa Các Trường Thông Tin Lọc (Từ ngày, đến ngày, hành động, phân hệ, tìm kiếm) */}
      <ActionLogsFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onExportReport={handleExportReport}
        totalRecords={totalRecords}
      />

      {/* 2. Bảng Dữ Liệu Action Logs & Bộ Điều Khiển Phân Trang / Lọc Số Dòng */}
      <ActionLogsTable
        logs={paginatedLogs}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={setCurrentPage}
        onViewDetail={handleOpenDetail}
        onViewDiff={handleOpenDiff}
        onOpenRestore={handleOpenRestore}
      />

      {/* 3. Modal Xem Chi Tiết Toàn Văn (Metadata, IP, SQL SP, Payload JSON) */}
      <ActionLogDetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        log={selectedDetailLog}
      />

      {/* 4. Modal Đối Soát Diff Old/New Song Song Trực Quan */}
      <ActionLogDiffModal
        isOpen={isDiffOpen}
        onClose={handleCloseDiff}
        log={selectedDiffLog}
        diffViewMode={diffViewMode}
        setDiffViewMode={setDiffViewMode}
      />

      {/* 5. Modal Xác Nhận Phục Hồi An Toàn (Safe Restore) */}
      <ActionLogRestoreModal
        isOpen={isRestoreOpen}
        onClose={handleCloseRestore}
        log={selectedRestoreLog}
        restoreReason={restoreReason}
        setRestoreReason={setRestoreReason}
        confirmRisk={confirmRisk}
        setConfirmRisk={setConfirmRisk}
        isRestoring={isRestoring}
        onConfirmRestore={handleConfirmRestore}
      />
    </div>
  );
}
