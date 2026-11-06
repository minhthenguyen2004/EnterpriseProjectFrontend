import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import useApiRequestHistoryData from './hooks/useApiRequestHistoryData';
import {
  ApiRequestFilterBar,
  ApiRequestLogsTable,
  ApiRequestInitialGuideState,
  ApiRequestJsonModal,
} from './components';

/**
 * Trang Nhật Ký Yêu Cầu API (API Request History Dashboard - /api/request-log)
 *
 * Kiến trúc module hóa cao cấp:
 * 1. Khung 6 trường lọc hàng ngang (Date & Time, Area, Controller, Action, Client IP, Select Top) + Nút Query Data
 * 2. Bảng dữ liệu có điều kiện (Conditional Table): CHỈ hiển thị khi người dùng thực hiện bấm "Query Data"
 * 3. Màn hình hướng dẫn ban đầu (Initial Guide State) thân thiện khi chưa thực hiện truy vấn
 * 4. Modal đối soát toàn văn Request Payload & Response Body hỗ trợ JSON Pretty Print & 1-click copy
 * 5. Tương thích 100% hai giao diện thương hiệu Foxconn (Light) và NVIDIA (Dark)
 */
export default function ApiRequestHistoryPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    filters,
    handleFilterChange,
    handleResetFilters,
    hasQueried,
    isQuerying,
    handleExecuteQuery,
    logs,
    statsSummary,
    toast,
    jsonModal,
    handleOpenJsonModal,
    handleCloseJsonModal,
    handleExportCsv,
  } = useApiRequestHistoryData();

  return (
    <div
      className={`p-6 lg:p-8 space-y-6 min-h-full transition-colors duration-200 ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* 1. Header Trang Chuẩn Hóa Toàn Hệ Thống */}
      <PageHeaderBar
        breadcrumbs={[
          { label: 'API MANAGEMENT', isCurrent: false },
          { label: 'API REQUEST HISTORY', isCurrent: true },
        ]}
        title="API REQUEST HISTORY"
        badge="TRAFFIC AUDIT"
        badgeType="brand"
        description="Bảng điều khiển giám sát & đối soát nhật ký yêu cầu API thời gian thực: Phương thức HTTP, mã trạng thái, độ trễ xử lý và toàn văn dữ liệu bản tin."
        showFullscreen={true}
      />

      {/* Toast Thông Báo Nổi (Tự động ẩn) */}
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

      {/* 2. Khung Các Trường Lọc Hàng Ngang */}
      <ApiRequestFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onExecuteQuery={handleExecuteQuery}
        isQuerying={isQuerying}
        onExportCsv={handleExportCsv}
        totalRecords={logs.length}
      />

      {/* 3. Vùng Hiển Thị Có Điều Kiện:
          - Nếu chưa bấm "Query Data" (hasQueried === false): Hiện InitialGuideState
          - Nếu đã bấm "Query Data" (hasQueried === true): Hiện Bảng dữ liệu 8 cột
      */}
      {!hasQueried ? (
        <ApiRequestInitialGuideState onExecuteQuery={handleExecuteQuery} />
      ) : (
        <ApiRequestLogsTable
          logs={logs}
          onOpenJsonModal={handleOpenJsonModal}
          statsSummary={statsSummary}
        />
      )}

      {/* 4. Hộp Thoại Xem Toàn Văn JSON Payload & Response Body */}
      <ApiRequestJsonModal
        isOpen={jsonModal.isOpen}
        onClose={handleCloseJsonModal}
        log={jsonModal.log}
        type={jsonModal.type}
      />
    </div>
  );
}
