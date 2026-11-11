import React from 'react';
import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import { useProductNvidiaData } from './hooks/useProductNvidiaData';
import ProductToolbar from './components/ProductToolbar';
import ProductTable from './components/ProductTable';
import Pagination from '../../../components/common/Pagination';
import AddEditProductModal from './components/modals/AddEditProductModal';
import ImportProductFileModal from './components/modals/ImportProductFileModal';
import SearchSerialNumberModal from './components/modals/SearchSerialNumberModal';
import DeleteProductConfirmModal from './components/modals/DeleteProductConfirmModal';

export default function ProductNvidiaPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    paginatedProducts,
    totalCount,
    rawTotalCount,
    columnFilters,
    sortConfig,
    currentPage,
    pageSize,
    totalPages,
    filterOptions,
    addEditModal,
    importModal,
    searchSNModal,
    serialSearchInput,
    deleteModal,
    toast,
    setCurrentPage,
    setPageSize,
    setSerialSearchInput,
    handleSearchBySerialNumber,
    handleClearSerialSearch,
    handleToggleColumnFilter,
    handleSelectAllColumnFilter,
    handleClearColumnFilter,
    handleResetAllFilters,
    handleSort,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseAddEditModal,
    handleSaveProduct,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    handleOpenImportModal,
    handleCloseImportModal,
    handleBatchImport,
    handleOpenSearchSNModal,
    handleCloseSearchSNModal,
    handleFilterByModelFromSN,
  } = useProductNvidiaData();

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 transition-colors duration-200 ${
        isFoxconn
          ? 'bg-slate-50 text-slate-800'
          : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl animate-in slide-in-from-top-4 duration-200 text-xs font-semibold ${
            toast.type === 'success'
              ? isFoxconn
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-emerald-950/90 text-emerald-300 border-emerald-700'
              : toast.type === 'info'
              ? isFoxconn
                ? 'bg-blue-50 text-blue-900 border-blue-300'
                : 'bg-blue-950/90 text-blue-300 border-blue-700'
              : 'bg-red-50 text-red-900 border-red-300'
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <PageHeaderBar
        title="PRODUCT / NVIDIA MODEL CONFIGURATION"
        subtitle="Quản lý danh mục Model & Dòng sản phẩm NVIDIA, tra cứu theo Serial Number và import hàng loạt"
        breadcrumbs={[
          { label: 'CẤU HÌNH HỆ THỐNG', path: '/config' },
          { label: 'PRODUCT', path: '/config/product' },
          { label: 'NVIDIA' },
        ]}
      />

      {/* Top Toolbar: 2 nút bên trái, ô text nhập SN và nút Tìm bằng serial number bên phải */}
      <ProductToolbar
        onOpenAddModel={handleOpenAddModal}
        onOpenImportFile={handleOpenImportModal}
        serialSearchInput={serialSearchInput}
        onSerialInputChange={setSerialSearchInput}
        onSearchBySN={handleSearchBySerialNumber}
        onClearSerialSearch={handleClearSerialSearch}
        columnFilters={columnFilters}
        onResetFilters={handleResetAllFilters}
        totalCount={totalCount}
        rawTotalCount={rawTotalCount}
      />

      {/* Master Data Table: 5 columns with filterable headers */}
      <ProductTable
        products={paginatedProducts}
        filterOptions={filterOptions}
        columnFilters={columnFilters}
        onToggleColumnFilter={handleToggleColumnFilter}
        onSelectAllColumnFilter={handleSelectAllColumnFilter}
        onClearColumnFilter={handleClearColumnFilter}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEditItem={handleOpenEditModal}
        onDeleteItem={handleOpenDeleteModal}
      />

      {/* Pagination Footer */}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      {/* Modals */}
      <AddEditProductModal
        isOpen={addEditModal.isOpen}
        mode={addEditModal.mode}
        item={addEditModal.item}
        onClose={handleCloseAddEditModal}
        onSave={handleSaveProduct}
      />

      <ImportProductFileModal
        isOpen={importModal.isOpen}
        onClose={handleCloseImportModal}
        onImportBatch={handleBatchImport}
      />

      <SearchSerialNumberModal
        isOpen={searchSNModal.isOpen}
        onClose={handleCloseSearchSNModal}
        onFilterByModel={handleFilterByModelFromSN}
      />

      <DeleteProductConfirmModal
        isOpen={deleteModal.isOpen}
        item={deleteModal.item}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

