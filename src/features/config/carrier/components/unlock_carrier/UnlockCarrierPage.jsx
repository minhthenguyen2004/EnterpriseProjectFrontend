import useTheme from '../../../../../hooks/useTheme';
import PageHeaderBar from '../../../../../components/common/PageHeaderBar';
import useUnlockCarrier from '../../hooks/useUnlockCarrier';
import UnlockGeneralInfoCard from './UnlockGeneralInfoCard';
import UnlockCarrierTabsNav from './UnlockCarrierTabsNav';
import SingleCarrierScannerTab from './SingleCarrierScannerTab';
import WholeLineScannerTab from './WholeLineScannerTab';
import BatchCarrierScannerTab from './BatchCarrierScannerTab';
import RecentUnlockHistoryTable from './RecentUnlockHistoryTable';
import CameraScannerModal from './CameraScannerModal';

export default function UnlockCarrierPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    // 1. Form thông tin chung
    generalInfo,
    updateGeneralInfo,
    toggleResetCycleCount,
    handleQuickTagSelect,

    // 2. Tabs
    activeTab,
    setActiveTab,

    // 3. Tab 1: Single
    singleCarrierCode,
    setSingleCarrierCode,
    scannedCarrier,
    scanError,
    handleScanCarrier,
    handleClearSingleCarrier,

    // 4. Tab 2: Line
    selectedProductName,
    setSelectedProductName,
    selectedProductType,
    setSelectedProductType,
    selectedLine,
    setSelectedLine,
    productNameOptions,
    productTypeOptions,
    lineNameOptions,
    lineCarriers,
    selectedLineCarrierCodes,
    handleToggleLineCarrier,
    handleToggleSelectAllLineCarriers,

    // 5. Tab 3: Batch
    batchInput,
    setBatchInput,
    batchQueue,
    handleAddBatchCarriers,
    handleRemoveBatchItem,

    // 6. Camera modal
    isCameraModalOpen,
    setIsCameraModalOpen,

    // 7. Action submit
    handleConfirmUnlock,

    // 8. Lịch sử & Toast
    historyList,
    toast
  } = useUnlockCarrier();

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
          { label: 'CARRIER', isCurrent: false },
          { label: 'UNLOCK CARRIER', isCurrent: true }
        ]}
        title="UNLOCK CARRIER"
        badge="CARRIER AUDIT"
        badgeType="brand"
        description="Mở khóa và kiểm định trạng thái khay mang hàng (Carrier), cập nhật chu kỳ vòng đời và lưu trữ nhật ký kiểm tra."
        showFullscreen={true}
      />

      {/* 2. Workspace Bố cục chia tỉ lệ 1:3 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Phần 1: Cột Trái - Thông tin chung (Tỉ lệ 1) */}
        <div className="lg:col-span-1">
          <UnlockGeneralInfoCard
            generalInfo={generalInfo}
            onUpdateField={updateGeneralInfo}
            onToggleResetCycle={toggleResetCycleCount}
            onQuickTagSelect={handleQuickTagSelect}
          />
        </div>

        {/* Phần 3: Cột Phải - Chế độ mở khóa & Quét mã (Tỉ lệ 3) */}
        <div className="lg:col-span-3 space-y-5">
          {/* A. Thanh điều hướng 3 Tabs */}
          <UnlockCarrierTabsNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* B. Nội dung tương ứng của từng Tab */}
          {activeTab === 'single' && (
            <SingleCarrierScannerTab
              carrierCode={singleCarrierCode}
              onChangeCode={setSingleCarrierCode}
              onScan={handleScanCarrier}
              onClear={handleClearSingleCarrier}
              scannedCarrier={scannedCarrier}
              scanError={scanError}
              onOpenCamModal={() => setIsCameraModalOpen(true)}
            />
          )}

          {activeTab === 'line' && (
            <WholeLineScannerTab
              selectedProductName={selectedProductName}
              onChangeProductName={setSelectedProductName}
              productNameOptions={productNameOptions}
              selectedProductType={selectedProductType}
              onChangeProductType={setSelectedProductType}
              productTypeOptions={productTypeOptions}
              selectedLine={selectedLine}
              onChangeLine={setSelectedLine}
              lineNameOptions={lineNameOptions}
              lineCarriers={lineCarriers}
              selectedCodes={selectedLineCarrierCodes}
              onToggleCode={handleToggleLineCarrier}
              onToggleSelectAll={handleToggleSelectAllLineCarriers}
            />
          )}

          {activeTab === 'batch' && (
            <BatchCarrierScannerTab
              batchInput={batchInput}
              onChangeInput={setBatchInput}
              onAddBatch={handleAddBatchCarriers}
              queue={batchQueue}
              onRemoveItem={handleRemoveBatchItem}
            />
          )}

          {/* C. Nút Dài Xác Nhận Dưới Cùng (Lưu thông tin của cả hai bên) */}
          <button
            type="button"
            onClick={handleConfirmUnlock}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer select-none active:scale-[0.99] ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-950/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[0_0_25px_rgba(118,185,0,0.35)]'
            }`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span className="uppercase tracking-wider">
              XÁC NHẬN MỞ KHÓA & LƯU THÔNG TIN (CONFIRM & SAVE)
            </span>
          </button>

          {/* D. Bảng Nhật Ký Mở Khóa Gần Đây */}
          <RecentUnlockHistoryTable historyList={historyList} />
        </div>
      </div>

      {/* 3. Modal Camera Barcode Scanner */}
      <CameraScannerModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onScanSuccess={handleScanCarrier}
      />

      {/* 4. Floating Toast Notification */}
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
                ? 'bg-red-50 text-red-800 border-red-300'
                : 'bg-red-950/90 text-red-300 border-red-700/80 backdrop-blur-md'
            }`}
          >
            <span className="text-base">
              {toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : '❌'}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
