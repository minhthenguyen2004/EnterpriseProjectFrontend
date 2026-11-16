import { useTranslation } from 'react-i18next';
import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import useRackConfigData from './hooks/useRackConfigData';
import RackFilterToolbar from './components/RackFilterToolbar';
import RackTable from './components/RackTable';
import Pagination from '../../../components/common/Pagination';
import RackFormModal from './components/modals/RackFormModal';
import RackDeleteModal from './components/modals/RackDeleteModal';

export default function RackConfigPage() {
  const { t } = useTranslation('rack');
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    rackList,
    paginatedData,
    totalItems,
    totalPages,
    safeCurrentPage,
    pageSize,
    startIndex,
    endIndex,
    totalRacksCount,
    totalSlotsCount,

    // Search & Filter & Sort
    searchTerm,
    handleSearchChange,
    columnFilters,
    setColumnFilter,
    clearColumnFilter,
    resetAllFilters,
    activeFilterCount,
    sortConfig,
    handleSort,
    getUniqueValuesForColumn,

    // Pagination
    handlePageChange,
    handlePageSizeChange,

    // Form Modal (Create & Edit)
    isFormModalOpen,
    setIsFormModalOpen,
    formModalMode,
    selectedRack,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCreateRack,
    handleUpdateRack,

    // Delete Modal
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedDeleteRack,
    handleOpenDeleteModal,
    handleDeleteRack,

    // Toast
    toast
  } = useRackConfigData();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-5 transition-colors duration-200 relative ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* 1. Page Header Bar */}
      <PageHeaderBar
        breadcrumbs={[
          { label: t('config.breadcrumbConfig'), isCurrent: false },
          { label: t('config.breadcrumbRack'), isCurrent: false },
          { label: t('config.breadcrumbRackConfig'), isCurrent: true }
        ]}
        title={t('config.headerTitle')}
        badge={t('config.headerBadge')}
        badgeType="brand"
        description={t('config.headerDesc')}
        showFullscreen={true}
      />


      {/* 3. Top Filter Toolbar (Search text input, Reset filter button, Create rack button) */}
      <RackFilterToolbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onResetFilter={resetAllFilters}
        onCreateRack={handleOpenCreateModal}
        totalResults={totalItems}
        totalAllRecords={rackList.length}
        activeFilterCount={activeFilterCount}
      />

      {/* 4. Rack Configuration Master Table (9 fields + Actions column with Sửa & Xóa buttons) */}
      <RackTable
        data={paginatedData}
        startIndex={startIndex}
        columnFilters={columnFilters}
        sortConfig={sortConfig}
        activeFilterCount={activeFilterCount}
        onApplyColumnFilter={setColumnFilter}
        onClearColumnFilter={clearColumnFilter}
        onResetAllFilters={resetAllFilters}
        onSort={handleSort}
        getUniqueValuesForColumn={getUniqueValuesForColumn}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        searchTerm={searchTerm}
      />

      {/* 5. Pagination Footer */}
      <Pagination
        currentPage={safeCurrentPage}
        pageSize={pageSize}
        totalRecords={totalItems}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* 6. Create & Edit Modal Form */}
      <RackFormModal
        isOpen={isFormModalOpen}
        mode={formModalMode}
        initialData={selectedRack}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={formModalMode === 'create' ? handleCreateRack : handleUpdateRack}
      />

      {/* 7. Delete Confirmation Modal */}
      <RackDeleteModal
        isOpen={isDeleteModalOpen}
        rackItem={selectedDeleteRack}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleDeleteRack}
      />

      {/* 8. Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div
            className={`px-4 py-3 rounded-2xl border shadow-xl flex items-center gap-2.5 text-xs font-bold ${
              toast.type === 'success'
                ? isFoxconn
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-950/90 text-emerald-300 border-emerald-700/80 backdrop-blur-md'
                : isFoxconn
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-zinc-900 text-zinc-100 border-zinc-700 backdrop-blur-md'
            }`}
          >
            <span className="text-base">{toast.type === 'success' ? '✅' : 'ℹ️'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
