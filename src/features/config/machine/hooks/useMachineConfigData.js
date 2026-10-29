import { useState, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { initialMachineConfigData } from '../data/machineConfigMockData';

export default function useMachineConfigData() {
  const [machines, setMachines] = useState(initialMachineConfigData);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [columnFilters, setColumnFilters] = useState({}); // { [colId]: string[] }
  const [actionFilter, setActionFilter] = useState('all');

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formModalMode, setFormModalMode] = useState('create'); // 'create' | 'edit'
  const [formInitialData, setFormInitialData] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailMachine, setSelectedDetailMachine] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteMachine, setSelectedDeleteMachine] = useState(null);

  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  // 1. Column Filter Helpers
  const setColumnFilter = useCallback((colId, selectedValues) => {
    setColumnFilters(prev => {
      const next = { ...prev };
      if (!selectedValues || selectedValues.length === 0) {
        delete next[colId];
      } else {
        next[colId] = selectedValues;
      }
      return next;
    });
    setCurrentPage(1);
  }, []);

  const clearColumnFilter = useCallback((colId) => {
    setColumnFilters(prev => {
      const next = { ...prev };
      delete next[colId];
      return next;
    });
    setCurrentPage(1);
  }, []);

  const resetAllFilters = useCallback(() => {
    setSearchQuery('');
    setColumnFilters({});
    setActionFilter('all');
    setSortConfig({ field: 'id', direction: 'asc' });
    setCurrentPage(1);
    toast.success('Đã đặt lại toàn bộ bộ lọc về mặc định');
  }, []);

  // Đếm số lượng bộ lọc đang kích hoạt
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count += 1;
    if (actionFilter !== 'all') count += 1;
    count += Object.keys(columnFilters).length;
    return count;
  }, [searchQuery, actionFilter, columnFilters]);

  // Trích xuất các giá trị độc nhất của một cột để đưa vào bộ lọc popover
  const getUniqueValuesForColumn = useCallback((colId) => {
    const valueMap = new Map();
    machines.forEach(item => {
      const val = item[colId];
      if (val !== undefined && val !== null && val !== '') {
        const strVal = String(val);
        valueMap.set(strVal, (valueMap.get(strVal) || 0) + 1);
      }
    });

    return Array.from(valueMap.entries()).map(([value, count]) => ({
      value,
      count
    })).sort((a, b) => a.value.localeCompare(b.value));
  }, [machines]);

  // 2. Lọc và Sắp Xếp Dữ Liệu
  const filteredMachines = useMemo(() => {
    return machines.filter(item => {
      // 1. Instant Global Search
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matches =
          (item.machineName && item.machineName.toLowerCase().includes(query)) ||
          (item.stationIp && item.stationIp.toLowerCase().includes(query)) ||
          (item.hostName && item.hostName.toLowerCase().includes(query)) ||
          (item.productName && item.productName.toLowerCase().includes(query)) ||
          (item.lineName && item.lineName.toLowerCase().includes(query)) ||
          (item.customer && item.customer.toLowerCase().includes(query)) ||
          (item.factory && item.factory.toLowerCase().includes(query)) ||
          (item.step && item.step.toLowerCase().includes(query)) ||
          (item.keys && item.keys.toLowerCase().includes(query)) ||
          (item.groupName && item.groupName.toLowerCase().includes(query));

        if (!matches) return false;
      }

      // 2. Column Filters
      for (const [colId, values] of Object.entries(columnFilters)) {
        if (values && values.length > 0) {
          const itemVal = item[colId];
          if (!values.includes(String(itemVal))) {
            return false;
          }
        }
      }

      // 3. Action Filter
      if (actionFilter === 'has_details') {
        if (!item.description || !item.isActive) return false;
      } else if (actionFilter === 'can_edit') {
        // Tất cả các máy có thể sửa, ưu tiên máy đang hoạt động
        if (!item.isActive) return false;
      } else if (actionFilter === 'can_delete') {
        // Chỉ các máy ngừng hoạt động hoặc standby
        if (item.isActive) return false;
      }

      return true;
    });
  }, [machines, searchQuery, columnFilters, actionFilter]);

  // Sắp xếp
  const sortedMachines = useMemo(() => {
    const list = [...filteredMachines];
    const { field, direction } = sortConfig;
    if (!field) return list;

    list.sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];

      if (aVal === undefined || aVal === null) aVal = '';
      if (bVal === undefined || bVal === null) bVal = '';

      if (typeof aVal === 'string') {
        const comp = aVal.localeCompare(String(bVal));
        return direction === 'asc' ? comp : -comp;
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [filteredMachines, sortConfig]);

  // Phân trang
  const totalItems = sortedMachines.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedMachines = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return sortedMachines.slice(start, start + pageSize);
  }, [sortedMachines, safeCurrentPage, pageSize]);

  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(safeCurrentPage * pageSize, totalItems);

  // Điều khiển sắp xếp
  const handleSort = useCallback((field, direction) => {
    setSortConfig(prev => {
      if (direction) {
        return { field, direction };
      }
      if (prev.field === field) {
        return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { field, direction: 'asc' };
    });
  }, []);

  // Thay đổi trang
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(Number(size));
    setCurrentPage(1);
  }, []);

  // CRUD Actions
  const handleOpenCreateModal = useCallback(() => {
    setFormModalMode('create');
    setFormInitialData(null);
    setIsFormModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((machine) => {
    setFormModalMode('edit');
    setFormInitialData(machine);
    setIsFormModalOpen(true);
  }, []);

  const handleOpenDetailModal = useCallback((machine) => {
    setSelectedDetailMachine(machine);
    setIsDetailModalOpen(true);
  }, []);

  const handleOpenDeleteModal = useCallback((machine) => {
    setSelectedDeleteMachine(machine);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCreateMachine = useCallback((formData) => {
    const newId = machines.length > 0 ? Math.max(...machines.map(m => m.id)) + 1 : 1;
    const now = new Date().toISOString();
    const newMachine = {
      ...formData,
      id: newId,
      sequenceOrder: Number(formData.sequenceOrder) || (machines.length + 1),
      targetUph: Number(formData.targetUph) || 100,
      targetCycleTime: Number(formData.targetCycleTime) || 36.0,
      targetUpd: (Number(formData.targetUph) || 100) * 20,
      isActive: formData.isActive ?? true,
      createdAt: now,
      updatedAt: now
    };

    setMachines(prev => [newMachine, ...prev]);
    setIsFormModalOpen(false);
    toast.success(`Đã thêm máy mới: ${newMachine.machineName}`);
  }, [machines]);

  const handleUpdateMachine = useCallback((formData) => {
    const now = new Date().toISOString();
    setMachines(prev => prev.map(m => {
      if (m.id === formData.id) {
        return {
          ...m,
          ...formData,
          sequenceOrder: Number(formData.sequenceOrder) || m.sequenceOrder,
          targetUph: Number(formData.targetUph) || m.targetUph,
          targetCycleTime: Number(formData.targetCycleTime) || m.targetCycleTime,
          updatedAt: now
        };
      }
      return m;
    }));

    setIsFormModalOpen(false);
    toast.success(`Đã cập nhật máy: ${formData.machineName}`);
  }, []);

  const handleDeleteMachine = useCallback(() => {
    if (!selectedDeleteMachine) return;
    const deletedName = selectedDeleteMachine.machineName;
    setMachines(prev => prev.filter(m => m.id !== selectedDeleteMachine.id));
    setIsDeleteModalOpen(false);
    setSelectedDeleteMachine(null);
    toast.success(`Đã xóa máy: ${deletedName}`);
  }, [selectedDeleteMachine]);

  const handleBulkImport = useCallback((newItems) => {
    if (!newItems || newItems.length === 0) return;
    let maxId = machines.length > 0 ? Math.max(...machines.map(m => m.id)) : 0;
    const now = new Date().toISOString();

    const formatted = newItems.map(item => {
      maxId += 1;
      return {
        ...item,
        id: maxId,
        sequenceOrder: Number(item.sequenceOrder) || maxId,
        targetUph: Number(item.targetUph) || 100,
        targetCycleTime: Number(item.targetCycleTime) || 36.0,
        targetUpd: (Number(item.targetUph) || 100) * 20,
        isActive: item.isActive !== false,
        createdAt: now,
        updatedAt: now
      };
    });

    setMachines(prev => [...formatted, ...prev]);
    setIsExcelModalOpen(false);
    toast.success(`Đã import thành công ${formatted.length} cấu hình máy`);
  }, [machines]);

  // Export to CSV
  const handleExportCsv = useCallback(() => {
    try {
      const headers = [
        'ID',
        'Customer',
        'Factory',
        'Floor',
        'Product Name',
        'Product Type',
        'Line Name',
        'Step',
        'Keys',
        'Group Name',
        'Machine Name',
        'IP Address',
        'Host Name',
        'Station Code',
        'Sequence Order',
        'Target UPH',
        'Target Cycle Time (s)',
        'Status',
        'Description'
      ];

      const rows = sortedMachines.map(m => [
        m.id,
        `"${m.customer || ''}"`,
        `"${m.factory || ''}"`,
        `"${m.floor || ''}"`,
        `"${m.productName || ''}"`,
        `"${m.productType || ''}"`,
        `"${m.lineName || ''}"`,
        `"${m.step || ''}"`,
        `"${m.keys || ''}"`,
        `"${m.groupName || ''}"`,
        `"${m.machineName || ''}"`,
        `"${m.stationIp || ''}"`,
        `"${m.hostName || ''}"`,
        `"${m.stationCode || ''}"`,
        m.sequenceOrder || '',
        m.targetUph || '',
        m.targetCycleTime || '',
        m.isActive ? 'Active' : 'Standby',
        `"${(m.description || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const nowStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      link.setAttribute('href', url);
      link.setAttribute('download', `Machine_Config_Export_${nowStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Đã xuất ${sortedMachines.length} bản ghi ra file CSV`);
    } catch (err) {
      console.error('Export CSV error:', err);
      toast.error('Lỗi khi xuất file CSV');
    }
  }, [sortedMachines]);

  return {
    // Data & counts
    machines,
    filteredMachines,
    paginatedMachines,
    totalItems,
    totalPages,
    safeCurrentPage,
    pageSize,
    startIndex,
    endIndex,
    allCount: machines.length,
    activeCount: machines.filter(m => m.isActive).length,
    standbyCount: machines.filter(m => !m.isActive).length,

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
  };
}
