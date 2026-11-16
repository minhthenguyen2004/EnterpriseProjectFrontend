import { useTranslation } from 'react-i18next';
import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import Pagination from '../../../components/common/Pagination';
import useMesErrorCodeData from './hooks/useMesErrorCodeData';
import MesErrorFilterBar from './components/MesErrorFilterBar';
import MesErrorCodeTable from './components/MesErrorCodeTable';
import MesErrorContextMenu from './components/MesErrorContextMenu';
import MesErrorDetailModal from './components/modals/MesErrorDetailModal';
import AddEditMesErrorModal from './components/modals/AddEditMesErrorModal';
import DeleteMesErrorConfirmModal from './components/modals/DeleteMesErrorConfirmModal';

/**
 * MesErrorCodeListPage
 * Trang Quản lý & Danh mục Mã lỗi MES (/config/mes-error-code)
 * 
 * - Top Bar: Tìm kiếm theo mã lỗi, nội dung; Nút Thêm mã lỗi (Phân quyền Admin/Manager).
 * - Bảng 4 cột: #, Error Code, Owner, Message (EN).
 * - Nhấn vào mã lỗi: Mở modal xem chi tiết song ngữ & hướng dẫn xử lý SOP.
 * - Chuột phải vào dòng: Mở menu ngữ cảnh Sửa / Xóa (Phân quyền Admin/Manager).
 * - Phân trang dùng chung (Common Pagination).
 */

export default function MesErrorCodeListPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const { t } = useTranslation(['mesError', 'common', 'menu']);

  const {
    // Dữ liệu & Tìm kiếm
    searchTerm,
    handleSearchChange,
    handleResetSearch,
    paginatedErrorCodes,

    // Phân trang
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalRecords,
    totalPages,

    // Thực đơn chuột phải
    contextMenu,
    handleContextMenu,
    handleCloseContextMenu,

    // Phân quyền RBAC
    canModify,
    mockRoleOverride,
    setMockRoleOverride,

    // Modal chi tiết
    selectedDetailItem,
    isDetailOpen,
    handleOpenDetail,
    handleCloseDetail,

    // Modal thêm / sửa
    selectedEditItem,
    isAddEditOpen,
    addEditMode,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseAddEdit,
    handleSaveErrorCode,

    // Modal xóa
    selectedDeleteItem,
    isDeleteOpen,
    handleOpenDelete,
    handleCloseDelete,
    handleConfirmDelete,

    // Toast
    toast,
  } = useMesErrorCodeData();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-6 transition-colors duration-200 relative ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* 1. Page Header Bar */}
      <PageHeaderBar
        breadcrumbs={[
          { label: t('menu:groups.mes_error', 'MES ERROR'), isCurrent: false },
          { label: t('header.title', 'MES ERROR CODE LIST'), isCurrent: true },
        ]}
        title={t('header.title', 'MES ERROR CODE LIST')}
        badge={t('header.badge', 'SHOPFLOOR DICTIONARY')}
        badgeType="brand"
        description={t('header.description', 'Quản lý từ điển mã lỗi MES, phân loại bộ phận kỹ thuật phụ trách, thông báo song ngữ quốc tế và quy trình hướng dẫn khắc phục sự cố tiêu chuẩn (SOP).')}
        showFullscreen={true}
      />

      {/* Thông báo Toast Nổi (Nếu có) */}
      {toast && (
        <div
          className={`p-3.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-lg transition-all border animate-in slide-in-from-top-2 duration-200 ${
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
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
            Tự động ẩn
          </span>
        </div>
      )}

      {/* 2. Top Bar: Tìm kiếm theo mã / nội dung + Nút Thêm mới + Giả lập quyền RBAC */}
      <MesErrorFilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onResetSearch={handleResetSearch}
        onOpenAdd={handleOpenAdd}
        canModify={canModify}
        mockRoleOverride={mockRoleOverride}
        onRoleOverrideChange={setMockRoleOverride}
        totalRecords={totalRecords}
      />

      {/* 3. Bảng dữ liệu 4 cột chuẩn hóa: #, Error Code, Owner, Message (EN) */}
      <MesErrorCodeTable
        errorCodes={paginatedErrorCodes}
        currentPage={currentPage}
        pageSize={pageSize}
        onOpenDetail={handleOpenDetail}
        onContextMenu={handleContextMenu}
        selectedRowId={contextMenu.visible ? contextMenu.item?.id : null}
        onResetSearch={handleResetSearch}
      />

      {/* 4. Thành phần phân trang dùng chung (Common Reusable Pagination) */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalRecords={totalRecords}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 20, 50, 100]}
        recordLabel={t('common:pagination.records', 'mã lỗi')}
      />

      {/* 5. Menu ngữ cảnh chuột phải nổi tại con trỏ (Custom Context Menu) */}
      <MesErrorContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        item={contextMenu.item}
        canModify={canModify}
        onClose={handleCloseContextMenu}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* 6. Modal xem chi tiết mã lỗi (Detail Modal) */}
      <MesErrorDetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        errorItem={selectedDetailItem}
        onEdit={handleOpenEdit}
        canModify={canModify}
      />

      {/* 7. Modal Thêm mới / Cập nhật mã lỗi (Add/Edit Modal) */}
      <AddEditMesErrorModal
        isOpen={isAddEditOpen}
        mode={addEditMode}
        initialData={selectedEditItem}
        onClose={handleCloseAddEdit}
        onSave={handleSaveErrorCode}
      />

      {/* 8. Modal Xác nhận xóa mã lỗi (Delete Modal) */}
      <DeleteMesErrorConfirmModal
        isOpen={isDeleteOpen}
        errorItem={selectedDeleteItem}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

