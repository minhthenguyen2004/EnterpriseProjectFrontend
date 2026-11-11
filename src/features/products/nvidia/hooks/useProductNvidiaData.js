import { useState, useMemo, useCallback } from 'react';
import { INITIAL_PRODUCT_MODELS, SAMPLE_SERIAL_NUMBERS } from '../mock/productNvidiaMockData';

export function useProductNvidiaData() {
  const [productsList, setProductsList] = useState(INITIAL_PRODUCT_MODELS);

  // Column Filters
  const [columnFilters, setColumnFilters] = useState({
    model: [],
    product: [],
  });

  // Sorting
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: 'asc',
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Inline Serial Number Search state
  const [serialSearchInput, setSerialSearchInput] = useState('');

  // Modals state
  const [addEditModal, setAddEditModal] = useState({
    isOpen: false,
    mode: 'create', // 'create' | 'edit'
    item: null,
  });

  const [importModal, setImportModal] = useState({
    isOpen: false,
  });

  const [searchSNModal, setSearchSNModal] = useState({
    isOpen: false,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    item: null,
  });

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Filter handlers
  const handleToggleColumnFilter = useCallback((field, value) => {
    setColumnFilters((prev) => {
      const currentValues = prev[field] || [];
      const exists = currentValues.includes(value);
      const updated = exists
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: updated,
      };
    });
    setCurrentPage(1);
  }, []);

  const handleSelectAllColumnFilter = useCallback((field, allValues) => {
    setColumnFilters((prev) => ({
      ...prev,
      [field]: allValues,
    }));
    setCurrentPage(1);
  }, []);

  const handleClearColumnFilter = useCallback((field) => {
    setColumnFilters((prev) => ({
      ...prev,
      [field]: [],
    }));
    setCurrentPage(1);
  }, []);

  const handleResetAllFilters = useCallback(() => {
    setColumnFilters({
      model: [],
      product: [],
    });
    setSortConfig({ field: null, direction: 'asc' });
    setCurrentPage(1);
  }, []);

  // Sort handler
  const handleSort = useCallback((field, direction) => {
    setSortConfig({
      field,
      direction: direction || 'asc',
    });
    setCurrentPage(1);
  }, []);

  // Filtered & Sorted Data
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Filter by model
    if (columnFilters.model.length > 0) {
      result = result.filter((item) => columnFilters.model.includes(item.model));
    }

    // Filter by product
    if (columnFilters.product.length > 0) {
      result = result.filter((item) => columnFilters.product.includes(item.product));
    }

    // Sort
    if (sortConfig.field) {
      result.sort((a, b) => {
        const valA = (a[sortConfig.field] || '').toString().toLowerCase();
        const valB = (b[sortConfig.field] || '').toString().toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [productsList, columnFilters, sortConfig]);

  // Paginated Data
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;

  // Options and counts for filters
  const filterOptions = useMemo(() => {
    const modelCounts = {};
    const productCounts = {};

    productsList.forEach((item) => {
      modelCounts[item.model] = (modelCounts[item.model] || 0) + 1;
      productCounts[item.product] = (productCounts[item.product] || 0) + 1;
    });

    const uniqueModels = Object.keys(modelCounts).sort();
    const uniqueProducts = Object.keys(productCounts).sort();

    return {
      model: uniqueModels.map((m) => ({ value: m, count: modelCounts[m] })),
      product: uniqueProducts.map((p) => ({ value: p, count: productCounts[p] })),
    };
  }, [productsList]);

  // CRUD Actions
  const handleOpenAddModal = useCallback(() => {
    setAddEditModal({
      isOpen: true,
      mode: 'create',
      item: null,
    });
  }, []);

  const handleOpenEditModal = useCallback((item) => {
    setAddEditModal({
      isOpen: true,
      mode: 'edit',
      item,
    });
  }, []);

  const handleCloseAddEditModal = useCallback(() => {
    setAddEditModal({
      isOpen: false,
      mode: 'create',
      item: null,
    });
  }, []);

  const handleSaveProduct = useCallback(
    (productData) => {
      if (addEditModal.mode === 'create') {
        const newId = productsList.length > 0 ? Math.max(...productsList.map((p) => p.id)) + 1 : 1;
        const newItem = {
          ...productData,
          id: newId,
          status: 'ACTIVE',
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        };
        setProductsList((prev) => [newItem, ...prev]);
        showToast(`Đã thêm mới model "${newItem.model}" thành công!`, 'success');
      } else {
        setProductsList((prev) =>
          prev.map((item) =>
            item.id === addEditModal.item.id
              ? {
                  ...item,
                  ...productData,
                  updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
                }
              : item
          )
        );
        showToast(`Đã cập nhật model "${productData.model}" thành công!`, 'success');
      }
      handleCloseAddEditModal();
    },
    [addEditModal, productsList, showToast, handleCloseAddEditModal]
  );

  const handleOpenDeleteModal = useCallback((item) => {
    setDeleteModal({
      isOpen: true,
      item,
    });
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModal({
      isOpen: false,
      item: null,
    });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteModal.item) return;
    const targetId = deleteModal.item.id;
    const targetModel = deleteModal.item.model;
    setProductsList((prev) => prev.filter((p) => p.id !== targetId));
    showToast(`Đã xóa model "${targetModel}" khỏi hệ thống!`, 'info');
    handleCloseDeleteModal();
  }, [deleteModal.item, showToast, handleCloseDeleteModal]);

  // Import Modal Handlers
  const handleOpenImportModal = useCallback(() => {
    setImportModal({ isOpen: true });
  }, []);

  const handleCloseImportModal = useCallback(() => {
    setImportModal({ isOpen: false });
  }, []);

  const handleBatchImport = useCallback(
    (importedItems) => {
      let maxId = productsList.length > 0 ? Math.max(...productsList.map((p) => p.id)) : 0;
      const newItems = importedItems.map((item) => ({
        ...item,
        id: ++maxId,
        status: 'ACTIVE',
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      }));
      setProductsList((prev) => [...newItems, ...prev]);
      showToast(`Đã import thành công ${newItems.length} model vào hệ thống!`, 'success');
      handleCloseImportModal();
    },
    [productsList, showToast, handleCloseImportModal]
  );

  // Search by Serial Number Handlers (both inline and modal)
  const handleSearchBySerialNumber = useCallback(
    (sn) => {
      const searchTarget = (sn !== undefined ? sn : serialSearchInput).trim();
      if (!searchTarget) {
        // If empty, reset model filter
        setColumnFilters((prev) => ({
          ...prev,
          model: [],
        }));
        return;
      }

      // Check sample list first
      const foundSample = SAMPLE_SERIAL_NUMBERS.find(
        (s) => s.sn.toLowerCase() === searchTarget.toLowerCase()
      );
      let targetModel = foundSample ? foundSample.model : null;

      // Check matching in products list by prefix or exact model
      if (!targetModel) {
        const foundInList = productsList.find((m) => {
          if (m.serialPrefix && searchTarget.toUpperCase().includes(m.serialPrefix.toUpperCase())) {
            return true;
          }
          if (searchTarget.toUpperCase().includes(m.model.toUpperCase())) {
            return true;
          }
          return false;
        });
        if (foundInList) {
          targetModel = foundInList.model;
        }
      }

      if (targetModel) {
        setColumnFilters((prev) => ({
          ...prev,
          model: [targetModel],
        }));
        setCurrentPage(1);
        showToast(`Tìm thấy Model: "${targetModel}" từ SN: ${searchTarget}`, 'success');
      } else {
        showToast(`Không tìm thấy Model nào khớp với SN: "${searchTarget}"`, 'error');
      }
    },
    [serialSearchInput, productsList, showToast]
  );

  const handleClearSerialSearch = useCallback(() => {
    setSerialSearchInput('');
    setColumnFilters((prev) => ({
      ...prev,
      model: [],
    }));
    setCurrentPage(1);
  }, []);

  const handleOpenSearchSNModal = useCallback(() => {
    setSearchSNModal({ isOpen: true });
  }, []);

  const handleCloseSearchSNModal = useCallback(() => {
    setSearchSNModal({ isOpen: false });
  }, []);

  const handleFilterByModelFromSN = useCallback(
    (foundModel) => {
      setColumnFilters((prev) => ({
        ...prev,
        model: [foundModel],
      }));
      setCurrentPage(1);
      handleCloseSearchSNModal();
      showToast(`Đang lọc bảng theo Model: ${foundModel}`, 'info');
    },
    [handleCloseSearchSNModal, showToast]
  );

  return {
    productsList,
    filteredProducts,
    paginatedProducts,
    totalCount: filteredProducts.length,
    rawTotalCount: productsList.length,
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
  };
}

