import { useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import useCarrierData from './hooks/useCarrierData';
import CarrierTabsNav from './components/tabs/CarrierTabsNav';
import CarrierRealtimeTab from './components/tabs/realtime/CarrierRealtimeTab';
import CarrierLifecycleTab from './components/tabs/lifecycle/CarrierLifecycleTab';
import CarrierInspectionModal from './components/modals/CarrierInspectionModal';
import CarrierLockActionModal from './components/modals/CarrierLockActionModal';

/**
 * Trang Quản Lý & Giám Sát Cấu Hình Khay Chứa (Carrier Configuration - /config/carrier)
 * Bố cục chuẩn mực bao gồm:
 * - PageHeaderBar với nút Refresh trên đầu trang
 * - 2 Tabs: Giám sát thời gian thực & Cấu hình vòng đời
 * - Tab 1: 5 Thẻ KPI, Thanh công cụ lọc 5 trường, Bảng dữ liệu 9 cột, Phân trang
 * - Tab 2: Cấu hình định mức loại khay, Chính sách cưỡng chế khóa tự động
 * - Modals: Chi tiết khay, Nghiệm thu kiểm định dung sai, Khóa/Mở khóa khay
 */
export default function CarrierConfigPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Active Tab state: 'realtime' | 'lifecycle'
  const [activeTab, setActiveTab] = useState('realtime');

  // Modal states
  const [detailModalCarrier, setDetailModalCarrier] = useState(null);
  const [inspectModalCarrier, setInspectModalCarrier] = useState(null);
  const [lockModalCarrier, setLockModalCarrier] = useState(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Custom hook chứa toàn bộ logic dữ liệu, lọc, phân trang và thao tác
  const {
    carriers,
    filteredCarriers,
    paginatedCarriers,
    carrierTypeLimits,
    autoLockPolicy,
    kpiStats,

    // Bộ lọc
    searchCarrierCode,
    setSearchCarrierCode,
    searchLineName,
    setSearchLineName,
    searchProductName,
    setSearchProductName,
    selectedStatus,
    setSelectedStatus,
    resetFilters,

    // Phân trang
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalPages,
    totalFiltered,

    // Làm mới
    isRefreshing,
    lastUpdated,
    refreshData,

    // Thao tác
    lockCarrier,
    unlockCarrier,
    inspectCarrier,
    updateCarrierTypeLimits,
    updateAutoLockPolicy,

    // Lifecycle Configs CRUD
    lifecycleConfigs,
    addLifecycleConfig,
    updateLifecycleConfig,
    deleteLifecycleConfig,
    toggleLifecycleConfigActive,
    refreshLifecycleConfigs,
  } = useCarrierData();

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Làm mới dữ liệu kèm thông báo toast
  const handleRefresh = () => {
    refreshData();
    showToast('Dữ liệu trạng thái khay chứa đã được làm mới tức thời');
  };

  // Thao tác Khóa
  const handleConfirmLock = (carrierId, reason) => {
    lockCarrier(carrierId, reason);
    showToast(`Đã cưỡng bức khóa khay [${carrierId}] và cách ly khỏi chuyền`);
  };

  // Thao tác Mở khóa
  const handleConfirmUnlock = (carrierId) => {
    unlockCarrier(carrierId);
    showToast(`Đã mở khóa khay [${carrierId}] thành công. Khay sẵn sàng hoạt động`);
  };

  // Thao tác Kiểm định
  const handleConfirmInspect = (carrierId, inspectionData) => {
    inspectCarrier(carrierId, inspectionData);
    showToast(`Đã ghi nhận kiểm định thành công cho khay [${carrierId}]`);
  };

  return (
    <div
      className={`p-6 lg:p-8 space-y-6 min-h-full transition-colors duration-200 ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded-2xl border shadow-xl flex items-center gap-2.5 text-xs font-bold ${
              isFoxconn
                ? 'bg-[#002766] text-white border-blue-800 shadow-blue-900/30'
                : 'bg-zinc-900 text-white border-[#76B900] shadow-[#76B900]/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Bar Chuẩn Mực của Hệ Thống - Tích hợp Nút Refresh trên đầu trang */}
      <PageHeaderBar
        breadcrumbs={[
          { label: 'CONFIG', isCurrent: false },
          { label: 'CARRIER CONFIG', isCurrent: true },
        ]}
        title="CARRIER CONFIGURATION"
        badge="MASTER CARRIER"
        badgeType="brand"
        description="Giám sát thời gian thực tuổi thọ, hao mòn cơ học, hạn kiểm định và cấu hình định mức cho toàn bộ khay chứa hệ thống AutoLine Foxconn / NVIDIA."
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        showFullscreen={true}
      />

      {/* Thanh 2 Tabs Điều Hướng: Giám Sát Thời Gian Thực & Cấu Hình Vòng Đời */}
      <CarrierTabsNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        kpiStats={kpiStats}
      />

      {/* Tab 1: Giám Sát Thời Gian Thực (Active theo mặc định) */}
      {activeTab === 'realtime' && (
        <CarrierRealtimeTab
          carriers={carriers}
          paginatedCarriers={paginatedCarriers}
          kpiStats={kpiStats}
          searchCarrierCode={searchCarrierCode}
          onCarrierCodeChange={setSearchCarrierCode}
          searchLineName={searchLineName}
          onLineNameChange={setSearchLineName}
          searchProductName={searchProductName}
          onProductNameChange={setSearchProductName}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          onResetFilters={resetFilters}
          totalFiltered={totalFiltered}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onViewDetail={(carrier) => setDetailModalCarrier(carrier)}
          onOpenInspect={(carrier) => setInspectModalCarrier(carrier)}
          onToggleLock={(carrier) => setLockModalCarrier(carrier)}
        />
      )}

      {/* Tab 2: Cấu Hình Vòng Đời */}
      {activeTab === 'lifecycle' && (
        <CarrierLifecycleTab
          carrierTypeLimits={carrierTypeLimits}
          onUpdateCarrierTypeLimits={updateCarrierTypeLimits}
          autoLockPolicy={autoLockPolicy}
          onUpdateAutoLockPolicy={updateAutoLockPolicy}
          lifecycleConfigs={lifecycleConfigs}
          onAddLifecycleConfig={addLifecycleConfig}
          onUpdateLifecycleConfig={updateLifecycleConfig}
          onDeleteLifecycleConfig={deleteLifecycleConfig}
          onRefreshLifecycleConfigs={refreshLifecycleConfigs}
          onNotify={showToast}
        />
      )}

      {/* Modal 2: Nghiệm thu kiểm định dung sai & Reset chu kỳ */}
      <CarrierInspectionModal
        carrier={inspectModalCarrier}
        isOpen={Boolean(inspectModalCarrier)}
        onClose={() => setInspectModalCarrier(null)}
        onConfirm={handleConfirmInspect}
      />

      {/* Modal 3: Xác nhận Khóa / Mở khóa khay */}
      <CarrierLockActionModal
        carrier={lockModalCarrier}
        isOpen={Boolean(lockModalCarrier)}
        onClose={() => setLockModalCarrier(null)}
        onConfirmLock={handleConfirmLock}
        onConfirmUnlock={handleConfirmUnlock}
      />
    </div>
  );
}
