import useTheme from '../../../hooks/useTheme';
import useMachineConfigData from './hooks/useMachineConfigData';
import MachineConfigHeaderBar from './components/header/MachineConfigHeaderBar';
import MachineConfigToolbar from './components/toolbar/MachineConfigToolbar';
import MachineConfigTable from './components/table/MachineConfigTable';
import MachineConfigPagination from './components/pagination/MachineConfigPagination';
import MachineConfigFormModal from './components/modals/MachineConfigFormModal';
import MachineConfigDetailModal from './components/modals/MachineConfigDetailModal';
import MachineDeleteConfirmModal from './components/modals/MachineDeleteConfirmModal';
import MachineExcelImportModal from './components/modals/MachineExcelImportModal';

export default function MachineConfigPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    // Data & Counts
    paginatedMachines,
    totalItems,
    totalPages,
    safeCurrentPage,
    pageSize,
    startIndex,
    endIndex,
    allCount,
    activeCount,
    standbyCount,

    // Filters & Search
    searchQuery,
    setSearchQuery,
    columnFilters,
    setColumnFilter,
    clearColumnFilter,
    resetAllFilters,
    activeFilterCount,
    actionFilter,
    setActionFilter,
    getUniqueValuesForColumn,

    // Sorting
    sortConfig,
    handleSort,

    // Pagination
    handlePageChange,
    handlePageSizeChange,

    // Modals & Handlers
    isFormModalOpen,
    setIsFormModalOpen,
    formModalMode,
    formInitialData,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCreateMachine,
    handleUpdateMachine,

    isDetailModalOpen,
    setIsDetailModalOpen,
    selectedDetailMachine,
    handleOpenDetailModal,

    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedDeleteMachine,
    handleOpenDeleteModal,
    handleDeleteMachine,

    isExcelModalOpen,
    setIsExcelModalOpen,
    handleBulkImport,
    handleExportCsv
  } = useMachineConfigData();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-5 transition-colors duration-300 relative ${
        isFoxconn ? 'bg-slate-50 text-slate-900' : 'bg-zinc-950 text-white'
      }`}
    >
      {/* 1. Top Header Bar with Breadcrumb, Titles and KPI Badges */}
      <MachineConfigHeaderBar
        allCount={allCount}
        activeCount={activeCount}
        standbyCount={standbyCount}
        filteredCount={totalItems}
        activeFilterCount={activeFilterCount}
        onResetFilters={resetAllFilters}
      />

      {/* 2. Top Toolbar with Instant Search, Excel Import/Export and Create Button */}
      <MachineConfigToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateModal={handleOpenCreateModal}
        onOpenExcelModal={() => setIsExcelModalOpen(true)}
        onExportCsv={handleExportCsv}
      />

      {/* 3. Master Configuration Table with 13 Columns & Interactive Button Headers */}
      <MachineConfigTable
        machines={paginatedMachines}
        totalItems={totalItems}
        allCount={allCount}
        columnFilters={columnFilters}
        setColumnFilter={setColumnFilter}
        clearColumnFilter={clearColumnFilter}
        resetAllFilters={resetAllFilters}
        activeFilterCount={activeFilterCount}
        actionFilter={actionFilter}
        setActionFilter={setActionFilter}
        sortConfig={sortConfig}
        onSort={handleSort}
        getUniqueValuesForColumn={getUniqueValuesForColumn}
        onOpenDetail={handleOpenDetailModal}
        onOpenEdit={handleOpenEditModal}
        onOpenDelete={handleOpenDeleteModal}
      />

      {/* 4. Footer Pagination with Record Range, Page Size Selector & Controls */}
      <MachineConfigPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* 5. Modals */}
      {/* Modal: Create & Edit Machine */}
      <MachineConfigFormModal
        isOpen={isFormModalOpen}
        mode={formModalMode}
        title={
          formModalMode === 'create'
            ? 'TẠO MỚI CẤU HÌNH TRẠM MÁY (CREATE MACHINE CONFIGURATION)'
            : `CHỈNH SỬA CẤU HÌNH MÁY: ${formInitialData?.machineName || ''}`
        }
        submitButtonText={formModalMode === 'create' ? 'Create Machine' : 'Update Machine'}
        initialData={formInitialData}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={formModalMode === 'create' ? handleCreateMachine : handleUpdateMachine}
      />

      {/* Modal: View Full Details */}
      <MachineConfigDetailModal
        isOpen={isDetailModalOpen}
        machine={selectedDetailMachine}
        onClose={() => setIsDetailModalOpen(false)}
        onSwitchToEdit={handleOpenEditModal}
      />

      {/* Modal: Confirm Delete */}
      <MachineDeleteConfirmModal
        isOpen={isDeleteModalOpen}
        machine={selectedDeleteMachine}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleDeleteMachine}
      />

      {/* Modal: Import Excel / CSV */}
      <MachineExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onBulkImport={handleBulkImport}
      />
    </div>
  );
}
