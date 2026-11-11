import CarrierKpiCards from './CarrierKpiCards';
import CarrierFilterToolbar from './CarrierFilterToolbar';
import CarrierRealtimeTable from './CarrierRealtimeTable';
import Pagination from '../../../../../../components/common/Pagination';

/**
 * Container Nội Dung Tab 1: Giám Sát Thời Gian Thực (Real-time Monitoring)
 */
export default function CarrierRealtimeTab({
  carriers,
  paginatedCarriers,
  kpiStats,
  searchCarrierCode,
  onCarrierCodeChange,
  searchLineName,
  onLineNameChange,
  searchProductName,
  onProductNameChange,
  selectedStatus,
  onStatusChange,
  pageSize,
  onPageSizeChange,
  onResetFilters,
  totalFiltered,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetail,
  onOpenInspect,
  onToggleLock,
}) {
  return (
    <div className="space-y-4">
      {/* Dòng 1: 5 Thẻ Chỉ Số KPI */}
      <CarrierKpiCards
        kpiStats={kpiStats}
        selectedStatus={selectedStatus}
        onSelectStatus={onStatusChange}
      />

      {/* Dòng 2: Thanh Công Cụ Tìm Kiếm & Bộ Lọc */}
      <CarrierFilterToolbar
        searchCarrierCode={searchCarrierCode}
        onCarrierCodeChange={onCarrierCodeChange}
        searchLineName={searchLineName}
        onLineNameChange={onLineNameChange}
        searchProductName={searchProductName}
        onProductNameChange={onProductNameChange}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        onResetFilters={onResetFilters}
        totalFiltered={totalFiltered}
        totalAll={carriers.length}
      />

      {/* Dòng 3: Bảng Dữ Liệu Giám Sát Thời Gian Thực (9 Cột) */}
      <CarrierRealtimeTable
        carriers={paginatedCarriers}
        onViewDetail={onViewDetail}
        onOpenInspect={onOpenInspect}
        onToggleLock={onToggleLock}
      />

      {/* Dòng 4: Phân Trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalFiltered={totalFiltered}
        pageSize={pageSize}
      />
    </div>
  );
}
