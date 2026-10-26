import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAutolineData, LINES, PRODUCT_TYPES } from '../data/autolineMockData';

const DEFAULT_FILTER = {
  enableDateTime: true,
  startDate: '2026-10-24T08:00',
  endDate: '2026-10-24T16:00',
  lineId: 'line_01',
  productTypeId: 'all',
  productName: '',
};

export function useAutolineData() {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // Giây
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  const [selectedMachine, setSelectedMachine] = useState(null);

  // Lấy dữ liệu theo filter hiện tại
  const [data, setData] = useState(() => getAutolineData(DEFAULT_FILTER));

  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(getAutolineData(filter));
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 300);
  }, [filter]);

  // Cập nhật khi filter thay đổi
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh timer
  useEffect(() => {
    if (!isAutoRefresh || refreshInterval <= 0) return;

    const timer = setInterval(() => {
      setData(getAutolineData(filter));
      setLastUpdated(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(timer);
  }, [isAutoRefresh, refreshInterval, filter]);

  // Đếm số lượng tiêu chí lọc đang được áp dụng khác mặc định
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filter.lineId !== 'line_01') count++;
    if (filter.productTypeId !== 'all') count++;
    if (filter.productName && filter.productName.trim() !== '') count++;
    if (filter.enableDateTime) count++;
    return count;
  }, [filter]);

  // Danh sách tags đang lọc để hiển thị thanh ActiveFilterChipsBar
  const activeChips = useMemo(() => {
    const chips = [];
    const currentLine = LINES.find((l) => l.id === filter.lineId);
    if (currentLine) {
      chips.push({ key: 'lineId', label: `Chuyền: ${currentLine.name.split(' - ')[0]}` });
    }

    if (filter.productTypeId !== 'all') {
      const currentType = PRODUCT_TYPES.find((t) => t.id === filter.productTypeId);
      if (currentType) {
        chips.push({ key: 'productTypeId', label: `Loại: ${currentType.name}` });
      }
    }

    if (filter.productName && filter.productName.trim() !== '') {
      chips.push({ key: 'productName', label: `SP: ${filter.productName.trim()}` });
    }

    if (filter.enableDateTime) {
      const start = filter.startDate?.replace('T', ' ') || '';
      const end = filter.endDate?.replace('T', ' ') || '';
      chips.push({ key: 'dateTime', label: `Thời gian: ${start} → ${end}` });
    }

    return chips;
  }, [filter]);

  const removeFilterKey = useCallback((key) => {
    setFilter((prev) => {
      const next = { ...prev };
      if (key === 'lineId') next.lineId = 'line_01';
      if (key === 'productTypeId') next.productTypeId = 'all';
      if (key === 'productName') next.productName = '';
      if (key === 'dateTime') next.enableDateTime = false;
      return next;
    });
  }, []);

  const resetFilter = useCallback(() => {
    setFilter(DEFAULT_FILTER);
  }, []);

  return {
    filter,
    setFilter,
    data,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    isAutoRefresh,
    setIsAutoRefresh,
    refreshInterval,
    setRefreshInterval,
    isRefreshing,
    lastUpdated,
    selectedMachine,
    setSelectedMachine,
    activeFilterCount,
    activeChips,
    refreshData,
    removeFilterKey,
    resetFilter,
  };
}

export default useAutolineData;
