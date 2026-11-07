import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import useRackOverviewData from './overview/hooks/useRackOverviewData';
import RackOverviewTopBar from './overview/components/RackOverviewTopBar';
import OverviewQuickActions from './overview/components/sidebar/OverviewQuickActions';
import OverviewKpiStats from './overview/components/sidebar/OverviewKpiStats';
import OverviewOperationTips from './overview/components/sidebar/OverviewOperationTips';
import RackHierarchyCanvas from './overview/components/canvas/RackHierarchyCanvas';
import AddSlotModal from './overview/components/modals/AddSlotModal';
import RenameGroupModal from './overview/components/modals/RenameGroupModal';
import StructureTreeModal from './overview/components/modals/StructureTreeModal';

export default function RackOverviewConfigPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    // Filters
    location,
    setLocation,
    productLine,
    setProductLine,
    selectedGroupName,
    setSelectedGroupName,

    // Hierarchy Data
    faces,

    // KPI Counters
    totalFaces,
    totalGroups,
    totalRacks,
    totalSlots,
    approvedSlotsCount,

    // CRUD Handlers
    handleAddFace,
    handleEditFace,
    handleDeleteFace,

    handleAddGroup,
    handleEditGroup,
    handleDeleteGroup,

    handleAddRack,
    handleEditRack,
    handleDeleteRack,

    handleOpenAddSlotModal,
    handleConfirmAddSlot,
    handleEditSlot,
    handleDeleteSlot,

    // Drag & Drop
    handleSwapRacks,
    handleSwapSlots,

    // Header Actions
    handleSaveLayout,
    handleReloadDatabase,
    handleRenameSelectedGroup,

    // Modals
    isStructureModalOpen,
    setIsStructureModalOpen,
    isRenameGroupModalOpen,
    setIsRenameGroupModalOpen,
    addSlotTarget,
    setAddSlotTarget,

    // Toast
    toast
  } = useRackOverviewData();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-5 transition-colors duration-200 relative ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* 1. Page Header Bar */}
      <PageHeaderBar
        breadcrumbs={[
          { label: 'CONFIG', isCurrent: false },
          { label: 'RACK', isCurrent: false },
          { label: 'RACK OVERVIEW CONFIG', isCurrent: true }
        ]}
        title="RACK OVERVIEW CONFIGURATION"
        badge="LAYOUT CONFIG"
        badgeType="brand"
        description="Trực quan hóa bố cục sơ đồ mặt bằng tủ Rack, thiết lập cấu trúc phân cấp Face, Group, Rack và Slot."
        showFullscreen={true}
      />

      {/* 2. Top Control Bar: 3 Filter Dropdowns (Left), Structure Button, Save Layout, Add New, Reload DB (Right) */}
      <RackOverviewTopBar
        location={location}
        onLocationChange={setLocation}
        productLine={productLine}
        onProductLineChange={setProductLine}
        selectedGroupName={selectedGroupName}
        onGroupNameChange={setSelectedGroupName}
        onOpenStructureModal={() => setIsStructureModalOpen(true)}
        onSaveLayout={handleSaveLayout}
        onAddNewFace={handleAddFace}
        onReloadDatabase={handleReloadDatabase}
      />

      {/* 3. Main Workspace Divided 1 : 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
        {/* Phần 1: Sidebar Thao Tác & Tổng Quan (Tỉ lệ 1/5) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Khung 1: Thao tác nhanh (Thêm Face, Thêm Group, Thêm Rack) */}
          <OverviewQuickActions
            onAddFace={handleAddFace}
            onAddGroup={handleAddGroup}
            onAddRack={handleAddRack}
          />

          {/* Khung 2: Khung tổng quan (Tổng số Face, Group, Rack, Slot, Đã approved) */}
          <OverviewKpiStats
            totalFaces={totalFaces}
            totalGroups={totalGroups}
            totalRacks={totalRacks}
            totalSlots={totalSlots}
            approvedSlotsCount={approvedSlotsCount}
          />

          {/* Khung 3: Mẹo thao tác (Click sửa, Kéo thả đổi chỗ, Đổi thứ tự Rack, Phím tắt) */}
          <OverviewOperationTips />
        </div>

        {/* Phần 4: Trình Thiết Kế Bố Cục Canvas Phân Cấp (Tỉ lệ 4/5) */}
        <div className="lg:col-span-4">
          <RackHierarchyCanvas
            selectedGroupName={selectedGroupName}
            onOpenRenameGroup={() => setIsRenameGroupModalOpen(true)}
            faces={faces}
            onAddFace={handleAddFace}
            onEditFace={handleEditFace}
            onDeleteFace={handleDeleteFace}
            onAddGroup={handleAddGroup}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
            onAddRack={handleAddRack}
            onEditRack={handleEditRack}
            onDeleteRack={handleDeleteRack}
            onOpenAddSlot={handleOpenAddSlotModal}
            onEditSlot={handleEditSlot}
            onDeleteSlot={handleDeleteSlot}
            onSwapSlots={handleSwapSlots}
            onSwapRacks={handleSwapRacks}
          />
        </div>
      </div>

      {/* 4. Modal Thêm Slot (Nhập số định danh và chọn trạng thái approved/rejected) */}
      <AddSlotModal
        isOpen={Boolean(addSlotTarget)}
        onClose={() => setAddSlotTarget(null)}
        onSubmit={handleConfirmAddSlot}
      />

      {/* 5. Modal Đổi Tên Group Name Được Chọn */}
      <RenameGroupModal
        isOpen={isRenameGroupModalOpen}
        currentName={selectedGroupName}
        onClose={() => setIsRenameGroupModalOpen(false)}
        onSubmit={handleRenameSelectedGroup}
      />

      {/* 6. Modal Cây Cấu Trúc Tổng Thể (Nút Cấu Trúc) */}
      <StructureTreeModal
        isOpen={isStructureModalOpen}
        onClose={() => setIsStructureModalOpen(false)}
        location={location}
        productLine={productLine}
        selectedGroupName={selectedGroupName}
        faces={faces}
      />

      {/* 7. Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div
            className={`px-4 py-3 rounded-2xl border shadow-xl flex items-center gap-2.5 text-xs font-bold ${
              toast.type === 'success'
                ? isFoxconn
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-950/90 text-emerald-300 border-emerald-700/80 backdrop-blur-md'
                : toast.type === 'warning'
                ? isFoxconn
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-amber-950/90 text-amber-300 border-amber-700/80 backdrop-blur-md'
                : isFoxconn
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-zinc-900 text-zinc-100 border-zinc-700 backdrop-blur-md'
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
