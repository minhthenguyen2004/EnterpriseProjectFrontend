import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../../../../locales/i18n';
import {
  MES_ERROR_CODES_STORAGE_KEY,
  PAGE_SIZE_OPTIONS,
} from '../constants/mesErrorCodeConstants';
import { INITIAL_MES_ERROR_CODES } from '../mock/mesErrorCodeMockData';

/**
 * useMesErrorCodeData
 * Custom Hook quản lý toàn diện trạng thái, tìm kiếm, lọc, phân trang,
 * thực đơn chuột phải (Context Menu), các modal và phân quyền RBAC.
 */
export default function useMesErrorCodeData() {
  // 1. Quản lý danh sách mã lỗi (Persistence với localStorage)
  const [errorCodes, setErrorCodes] = useState(() => {
    try {
      const stored = localStorage.getItem(MES_ERROR_CODES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_MES_ERROR_CODES;
  });

  // Lưu vào localStorage khi danh sách thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(MES_ERROR_CODES_STORAGE_KEY, JSON.stringify(errorCodes));
    } catch {
      // Ignore quota error
    }
  }, [errorCodes]);

  // 2. Tìm kiếm (Mã lỗi, Nội dung tiếng Anh, Tiếng Việt)
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleResetSearch = useCallback(() => {
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  // 3. Phân quyền (RBAC)
  const auth = useSelector((state) => state.auth);
  const [mockRoleOverride, setMockRoleOverride] = useState(null); // 'admin' | 'manager' | 'operator' | null

  const savedAuth = useMemo(() => {
    try {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const userRoles = useMemo(() => {
    if (mockRoleOverride) return [mockRoleOverride];
    const roles = auth?.roles || savedAuth?.roles;
    if (Array.isArray(roles) && roles.length > 0) return roles;
    if (auth?.role) return [auth.role];
    if (savedAuth?.role) return [savedAuth.role];
    return ['admin']; // Mặc định chế độ nhà máy
  }, [auth, savedAuth, mockRoleOverride]);

  const canModify = useMemo(() => {
    return userRoles.some((role) =>
      ['admin', 'manager'].includes(String(role).trim().toLowerCase())
    );
  }, [userRoles]);

  // 4. Lọc dữ liệu theo từ khóa
  const filteredErrorCodes = useMemo(() => {
    if (!searchTerm.trim()) return errorCodes;
    const term = searchTerm.toLowerCase().trim();

    return errorCodes.filter((item) => {
      const matchCode = item.errorCode?.toLowerCase().includes(term);
      const matchMsgEn = item.messageEn?.toLowerCase().includes(term);
      const matchMsgVi = item.messageVi?.toLowerCase().includes(term);
      const matchOwner = item.owner?.toLowerCase().includes(term);
      const matchGuide = item.troubleshootingGuide?.toLowerCase().includes(term);
      return matchCode || matchMsgEn || matchMsgVi || matchOwner || matchGuide;
    });
  }, [errorCodes, searchTerm]);

  // 5. Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]); // 10

  const totalRecords = filteredErrorCodes.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  // Tự động điều chỉnh trang nếu vượt quá
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedErrorCodes = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredErrorCodes.slice(startIndex, startIndex + pageSize);
  }, [filteredErrorCodes, currentPage, pageSize]);

  // 6. Quản lý thực đơn ngữ cảnh chuột phải (Custom Context Menu)
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const handleContextMenu = useCallback((e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      item,
    });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu((prev) => (prev.visible ? { ...prev, visible: false, item: null } : prev));
  }, []);

  // 7. Quản lý Toast thông báo
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // 8. Quản lý Modal Chi Tiết (Detail Modal)
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = useCallback((item) => {
    setSelectedDetailItem(item);
    setIsDetailOpen(true);
    handleCloseContextMenu();
  }, [handleCloseContextMenu]);

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedDetailItem(null);
  }, []);

  // 9. Quản lý Modal Thêm mới & Chỉnh sửa (Add / Edit Modal)
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [addEditMode, setAddEditMode] = useState('add'); // 'add' | 'edit'

  const handleOpenAdd = useCallback(() => {
    if (!canModify) {
      showToast('error', i18n.t('mesError:toast.addDenied'));
      return;
    }
    setAddEditMode('add');
    setSelectedEditItem(null);
    setIsAddEditOpen(true);
    handleCloseContextMenu();
  }, [canModify, handleCloseContextMenu, showToast]);

  const handleOpenEdit = useCallback((item) => {
    if (!canModify) {
      showToast('error', i18n.t('mesError:toast.editDenied'));
      return;
    }
    setAddEditMode('edit');
    setSelectedEditItem(item);
    setIsAddEditOpen(true);
    handleCloseContextMenu();
  }, [canModify, handleCloseContextMenu, showToast]);

  const handleCloseAddEdit = useCallback(() => {
    setIsAddEditOpen(false);
    setSelectedEditItem(null);
  }, []);

  // 10. Quản lý Modal Xác nhận xóa (Delete Modal)
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenDelete = useCallback((item) => {
    if (!canModify) {
      showToast('error', i18n.t('mesError:toast.deleteDenied'));
      return;
    }
    setSelectedDeleteItem(item);
    setIsDeleteOpen(true);
    handleCloseContextMenu();
  }, [canModify, handleCloseContextMenu, showToast]);

  const handleCloseDelete = useCallback(() => {
    setIsDeleteOpen(false);
    setSelectedDeleteItem(null);
  }, []);

  // 11. Các thao tác ghi CSDL (CRUD)
  const handleSaveErrorCode = useCallback((formData) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (addEditMode === 'add') {
      const newId = `ERR-${String(Date.now()).slice(-4)}`;
      const newItem = {
        id: newId,
        ...formData,
        updatedAt: now,
        updatedBy: auth?.username || savedAuth?.username || 'admin_user',
      };
      setErrorCodes((prev) => [newItem, ...prev]);
      showToast('success', i18n.t('mesError:toast.addSuccess', { code: newItem.errorCode }));
    } else {
      setErrorCodes((prev) =>
        prev.map((item) =>
          item.id === formData.id
            ? {
                ...item,
                ...formData,
                updatedAt: now,
                updatedBy: auth?.username || savedAuth?.username || 'admin_user',
              }
            : item
        )
      );
      showToast('success', i18n.t('mesError:toast.editSuccess', { code: formData.errorCode }));
    }

    handleCloseAddEdit();
  }, [addEditMode, auth, savedAuth, handleCloseAddEdit, showToast]);

  const handleConfirmDelete = useCallback((id) => {
    const target = errorCodes.find((item) => item.id === id);
    setErrorCodes((prev) => prev.filter((item) => item.id !== id));
    showToast('info', i18n.t('mesError:toast.deleteSuccess', { code: target?.errorCode || id }));
    handleCloseDelete();
  }, [errorCodes, handleCloseDelete, showToast]);

  // Khôi phục dữ liệu gốc
  const handleResetToDefault = useCallback(() => {
    setErrorCodes(INITIAL_MES_ERROR_CODES);
    localStorage.removeItem(MES_ERROR_CODES_STORAGE_KEY);
    showToast('info', i18n.t('mesError:toast.resetSuccess'));
  }, [showToast]);

  return {
    // Dữ liệu & Tìm kiếm
    searchTerm,
    handleSearchChange,
    handleResetSearch,
    filteredErrorCodes,
    paginatedErrorCodes,

    // Phân trang
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalRecords,
    totalPages,

    // Menu chuột phải
    contextMenu,
    handleContextMenu,
    handleCloseContextMenu,

    // Phân quyền
    canModify,
    userRoles,
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

    // Khôi phục gốc & Thông báo
    handleResetToDefault,
    toast,
  };
}

