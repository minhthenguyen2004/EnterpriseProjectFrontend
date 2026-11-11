import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import useAutolineOperations from './hooks/useAutolineOperations';
import AutolineTopScannerBar from './components/AutolineTopScannerBar';
import ProductionRoutingTable from './components/ProductionRoutingTable';
import StageDetailsSidebar from './components/StageDetailsSidebar';
import StageDetailHistoryModal from './components/modals/StageDetailHistoryModal';
import ChangeCarrierModal from './components/modals/ChangeCarrierModal';

export default function AutolineOperationsPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    // Top Bar
    scanMode,
    setScanMode,
    searchTerm,
    setSearchTerm,
    handleSearch,

    // Product & Routing Data
    productData,
    selectedStepNumber,
    selectedStep,
    handleSelectStep,

    // Modals
    isDetailModalOpen,
    setIsDetailModalOpen,
    isChangeCarrierModalOpen,
    setIsChangeCarrierModalOpen,

    // Special Operations
    handleUndo,
    handleChangeCarrier,
    handleClearUndo,
    handleResetCarrier,

    // Toast
    toast
  } = useAutolineOperations();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-6 transition-colors duration-200 relative ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* 1. Page Header Bar */}
      <PageHeaderBar
        breadcrumbs={[
          { label: 'CONFIG', isCurrent: false },
          { label: 'AUTOLINE OPERATIONS', isCurrent: true }
        ]}
        title="AUTOLINE OPERATIONS"
        badge="SHOPFLOOR CONTROL"
        badgeType="brand"
        description="Vận hành dây chuyền tự động, tra cứu lộ trình sản xuất (Routing) và thực hiện các thao tác can thiệp đặc biệt."
        showFullscreen={true}
      />

      {/* 2. Top Bar: Tùy chọn quét đa phương thức + Ô input tìm kiếm + Nút Tìm kiếm */}
      <AutolineTopScannerBar
        scanMode={scanMode}
        onChangeScanMode={setScanMode}
        searchTerm={searchTerm}
        onChangeSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onOpenCamera={() => handleSearch('SN-GB200-20261110-0089')}
        onOpenImageUpload={() => handleSearch('CRR-A089')}
      />

      {/* 3. Không gian làm việc phân chia theo tỉ lệ 2:1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Phần 2: Cột Trái - Lộ trình sản xuất (Tỉ lệ 2) */}
        <div className="lg:col-span-2">
          <ProductionRoutingTable
            routingSteps={productData.routingSteps}
            completedSteps={productData.completedSteps}
            totalSteps={productData.totalSteps}
            selectedStepNumber={selectedStepNumber}
            onSelectStep={handleSelectStep}
          />
        </div>

        {/* Phần 1: Cột Phải - Chi tiết công đoạn & Thao tác đặc biệt (Tỉ lệ 1) */}
        <div className="lg:col-span-1">
          <StageDetailsSidebar
            selectedStep={selectedStep}
            productData={productData}
            onOpenStageDetails={() => setIsDetailModalOpen(true)}
            onUndo={handleUndo}
            onOpenChangeCarrier={() => setIsChangeCarrierModalOpen(true)}
            onClearUndo={handleClearUndo}
            onResetCarrier={handleResetCarrier}
          />
        </div>
      </div>

      {/* 4. Modal: Chi tiết công đoạn & Lịch sử lỗi */}
      <StageDetailHistoryModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        stepData={selectedStep}
        productData={productData}
      />

      {/* 5. Modal: Đổi Carrier (Jig) */}
      <ChangeCarrierModal
        isOpen={isChangeCarrierModalOpen}
        onClose={() => setIsChangeCarrierModalOpen(false)}
        currentCarrier={productData.carrierCode}
        onConfirmChange={handleChangeCarrier}
      />

      {/* 6. Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div
            className={`px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-2.5 text-xs font-bold ${
              toast.type === 'success'
                ? isFoxconn
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-emerald-950/90 text-emerald-300 border-emerald-700/80 backdrop-blur-md'
                : toast.type === 'warning'
                ? isFoxconn
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-amber-950/90 text-amber-300 border-amber-700/80 backdrop-blur-md'
                : isFoxconn
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-zinc-900/90 text-zinc-100 border-zinc-700/80 backdrop-blur-md'
            }`}
          >
            <span className="text-base">
              {toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

