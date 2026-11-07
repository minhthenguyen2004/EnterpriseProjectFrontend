import { useState, useMemo, useCallback } from 'react';
import { initialRackMockData } from '../mock/rackConfigMockData';

export default function useRackConfigData() {
  const [rackList, setRackList] = useState(initialRackMockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formModalMode, setFormModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedRack, setSelectedRack] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteRack, setSelectedDeleteRack] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Set filter for a specific column
  const setColumnFilter = useCallback((columnId, values) => {
    setColumnFilters((prev) => {
      const next = { ...prev };
      if (!values || values.length === 0) {
        delete next[columnId];
      } else {
        next[columnId] = values;
      }
      return next;
    });
    setCurrentPage(1);
  }, []);

  // Clear filter for a specific column
  const clearColumnFilter = useCallback((columnId) => {
    setColumnFilters((prev) => {
      const next = { ...prev };
      delete next[columnId];
      return next;
    });
    setCurrentPage(1);
  }, []);

  // Reset all filters (search text + column filters + sort)
  const resetAllFilters = useCallback(() => {
    setSearchTerm('');
    setColumnFilters({});
    setSortConfig({ field: null, direction: 'asc' });
    setCurrentPage(1);
    showToast('Đã đặt lại toàn bộ bộ lọc và sắp xếp về mặc định', 'info');
  }, [showToast]);

  // Sort handler
  const handleSort = useCallback((columnId, direction) => {
    setSortConfig((prev) => {
      if (direction) {
        return { field: columnId, direction };
      }
      if (prev.field === columnId) {
        return {
          field: columnId,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { field: columnId, direction: 'asc' };
    });
  }, []);

  // Extract unique values and counts for each column
  const getUniqueValuesForColumn = useCallback(
    (columnId) => {
      const countsMap = new Map();

      // Calculate counts based on rackList filtered by everything EXCEPT this column
      const term = searchTerm.trim().toLowerCase();
      const otherFilters = { ...columnFilters };
      delete otherFilters[columnId];

      const baseList = rackList.filter((item) => {
        // Search term check
        if (term) {
          const matchGlobal =
            item.factory?.toLowerCase().includes(term) ||
            item.floor?.toLowerCase().includes(term) ||
            item.room?.toLowerCase().includes(term) ||
            item.product?.toLowerCase().includes(term) ||
            item.group?.toLowerCase().includes(term) ||
            item.rack?.toLowerCase().includes(term) ||
            String(item.slot_number).toLowerCase().includes(term) ||
            item.slot_name?.toLowerCase().includes(term) ||
            item.ip_address?.toLowerCase().includes(term);
          if (!matchGlobal) return false;
        }

        // Other column filters check
        for (const [col, selectedVals] of Object.entries(otherFilters)) {
          if (selectedVals && selectedVals.length > 0) {
            const itemVal = String(item[col] ?? '');
            if (!selectedVals.includes(itemVal)) {
              return false;
            }
          }
        }
        return true;
      });

      baseList.forEach((item) => {
        const val = String(item[columnId] ?? '');
        if (val) {
          countsMap.set(val, (countsMap.get(val) || 0) + 1);
        }
      });

      return Array.from(countsMap.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => a.value.localeCompare(b.value));
    },
    [rackList, searchTerm, columnFilters]
  );

  // Active filter counter (total columns filtered + search if any)
  const activeFilterCount = useMemo(() => {
    let count = Object.keys(columnFilters).filter(
      (k) => columnFilters[k] && columnFilters[k].length > 0
    ).length;
    if (searchTerm.trim()) count += 1;
    return count;
  }, [columnFilters, searchTerm]);

  // Combined Filtering and Sorting
  const filteredList = useMemo(() => {
    let list = [...rackList];

    // 1. Global Search
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter((item) => {
        return (
          item.factory?.toLowerCase().includes(term) ||
          item.floor?.toLowerCase().includes(term) ||
          item.room?.toLowerCase().includes(term) ||
          item.product?.toLowerCase().includes(term) ||
          item.group?.toLowerCase().includes(term) ||
          item.rack?.toLowerCase().includes(term) ||
          String(item.slot_number).toLowerCase().includes(term) ||
          item.slot_name?.toLowerCase().includes(term) ||
          item.ip_address?.toLowerCase().includes(term)
        );
      });
    }

    // 2. Column Filters
    for (const [colId, selectedVals] of Object.entries(columnFilters)) {
      if (selectedVals && selectedVals.length > 0) {
        list = list.filter((item) => {
          const itemVal = String(item[colId] ?? '');
          return selectedVals.includes(itemVal);
        });
      }
    }

    // 3. Sorting
    if (sortConfig.field) {
      list.sort((a, b) => {
        const valA = a[sortConfig.field] ?? '';
        const valB = b[sortConfig.field] ?? '';

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        return sortConfig.direction === 'asc'
          ? strA.localeCompare(strB, undefined, { numeric: true })
          : strB.localeCompare(strA, undefined, { numeric: true });
      });
    }

    return list;
  }, [rackList, searchTerm, columnFilters, sortConfig]);

  // Pagination calculation
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = useMemo(() => {
    return filteredList.slice(startIndex, endIndex);
  }, [filteredList, startIndex, endIndex]);

  // Search input handler
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(Number(newSize));
    setCurrentPage(1);
  }, []);

  // CRUD Operations
  const handleOpenCreateModal = useCallback(() => {
    setSelectedRack(null);
    setFormModalMode('create');
    setIsFormModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((item) => {
    setSelectedRack(item);
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  }, []);

  const handleOpenDeleteModal = useCallback((item) => {
    setSelectedDeleteRack(item);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCreateRack = useCallback((newItem) => {
    const createdItem = {
      ...newItem,
      id: `RCK-SLOT-${Date.now().toString().slice(-4)}`,
      slot_number: Number(newItem.slot_number),
      status: 'ACTIVE',
      updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };

    setRackList((prev) => [createdItem, ...prev]);
    setIsFormModalOpen(false);
    showToast(`Đã thêm mới cấu hình tủ rack ${createdItem.rack} (${createdItem.slot_name})!`, 'success');
  }, [showToast]);

  const handleUpdateRack = useCallback((updatedItem) => {
    setRackList((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id
          ? {
              ...item,
              ...updatedItem,
              slot_number: Number(updatedItem.slot_number),
              updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
            }
          : item
      )
    );
    setIsFormModalOpen(false);
    showToast(`Đã cập nhật cấu hình ${updatedItem.rack} (${updatedItem.slot_name}) thành công!`, 'success');
  }, [showToast]);

  const handleDeleteRack = useCallback(() => {
    if (!selectedDeleteRack) return;

    setRackList((prev) => prev.filter((item) => item.id !== selectedDeleteRack.id));
    setIsDeleteModalOpen(false);
    showToast(`Đã xóa cấu hình ${selectedDeleteRack.rack} - ${selectedDeleteRack.slot_name}!`, 'success');
    setSelectedDeleteRack(null);
  }, [selectedDeleteRack, showToast]);

  // Quick stats
  const totalRacksCount = useMemo(() => {
    const uniqueRacks = new Set(rackList.map((r) => r.rack));
    return uniqueRacks.size;
  }, [rackList]);

  const totalSlotsCount = rackList.length;

  return {
    // Data & Counts
    rackList,
    filteredList,
    paginatedData,
    totalItems,
    totalPages,
    safeCurrentPage,
    pageSize,
    startIndex,
    endIndex,
    totalRacksCount,
    totalSlotsCount,

    // Search & Filter
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

    // Form Modal (Create/Edit)
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
    toast,
    setToast
  };
}
