import { useState, useMemo, useEffect, useCallback } from 'react';
import { INITIAL_MACHINES } from '../data/machineStatusMockData';
import { DEFAULT_FILTERS, MACHINE_STATUS } from '../constants/machineStatusConstants';

export default function useMachineStatusData() {
  const [machines, setMachines] = useState(INITIAL_MACHINES);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [autoRefreshSeconds, setAutoRefreshSeconds] = useState(30); // 0 (tắt), 10, 30, 60
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  const [sortBy, setSortBy] = useState('default'); // 'default', 'name', 'ip', 'status'
  const [selectedMachine, setSelectedMachine] = useState(null);

  // Đếm số lượng bộ lọc đang được kích hoạt (khác 'all' hoặc text khác rỗng)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.factoryId && filters.factoryId !== 'all') count += 1;
    if (filters.floorId && filters.floorId !== 'all') count += 1;
    if (filters.areaId && filters.areaId !== 'all') count += 1;
    if (filters.status && filters.status !== 'all') count += 1;
    if (filters.searchQuery && filters.searchQuery.trim() !== '') count += 1;
    return count;
  }, [filters]);

  const updateFilters = useCallback((partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const handleManualRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Mô phỏng cập nhật nhẹ một số chỉ số telemetry
      setMachines((prev) =>
        prev.map((m) => {
          if (m.status === MACHINE_STATUS.RUN) {
            const randomTemp = (23 + Math.random() * 2).toFixed(1);
            return { ...m, temp: `${randomTemp}°C`, lastPing: 'Vừa xong' };
          }
          return { ...m, lastPing: 'Vừa xong' };
        })
      );
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 600);
  }, []);

  // Polling tự động làm mới thời gian thực nếu autoRefreshSeconds > 0
  useEffect(() => {
    if (!autoRefreshSeconds || autoRefreshSeconds <= 0) return;

    const interval = setInterval(() => {
      handleManualRefresh();
    }, autoRefreshSeconds * 1000);

    return () => clearInterval(interval);
  }, [autoRefreshSeconds, handleManualRefresh]);

  // Lọc dữ liệu danh sách máy theo các tiêu chí: Nhà máy, Tầng, Khu vực, Trạng thái, Tên máy hoặc IP
  const filteredMachines = useMemo(() => {
    const query = (filters.searchQuery || '').trim().toLowerCase();

    return machines.filter((item) => {
      // 1. Lọc Nhà máy
      if (filters.factoryId !== 'all' && item.factoryId !== filters.factoryId) {
        return false;
      }

      // 2. Lọc Tầng
      if (filters.floorId !== 'all' && item.floorId !== filters.floorId) {
        return false;
      }

      // 3. Lọc Khu vực
      if (filters.areaId !== 'all' && item.areaId !== filters.areaId) {
        return false;
      }

      // 4. Lọc Trạng thái
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }

      // 5. Lọc theo Tên máy hoặc Địa chỉ IP (nhập text)
      if (query) {
        const matchName = item.name.toLowerCase().includes(query);
        const matchIp = item.ip.toLowerCase().includes(query);
        const matchModel = item.model?.toLowerCase().includes(query);
        const matchProgram = item.program?.toLowerCase().includes(query);
        if (!matchName && !matchIp && !matchModel && !matchProgram) {
          return false;
        }
      }

      return true;
    });
  }, [machines, filters]);

  // Sắp xếp danh sách máy đã lọc
  const sortedMachines = useMemo(() => {
    const list = [...filteredMachines];
    switch (sortBy) {
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'ip':
        return list.sort((a, b) => a.ip.localeCompare(b.ip));
      case 'status': {
        const priority = { ERROR: 1, IDLE: 2, STOP: 3, RUN: 4 };
        return list.sort((a, b) => (priority[a.status] || 99) - (priority[b.status] || 99));
      }
      default:
        return list;
    }
  }, [filteredMachines, sortBy]);

  // Thống kê 3 chỉ số KPI ở phần Top
  const kpiMetrics = useMemo(() => {
    const total = filteredMachines.length;
    const runningCount = filteredMachines.filter((m) => m.status === MACHINE_STATUS.RUN).length;
    const stopCount = filteredMachines.filter((m) => m.status === MACHINE_STATUS.STOP).length;
    const idleCount = filteredMachines.filter((m) => m.status === MACHINE_STATUS.IDLE).length;
    const errorCount = filteredMachines.filter((m) => m.status === MACHINE_STATUS.ERROR).length;
    const stoppedCount = total - runningCount; // Tổng số máy dừng (STOP + IDLE + ERROR)

    const runningPct = total > 0 ? Number(((runningCount / total) * 100).toFixed(1)) : 0;
    const stoppedPct = total > 0 ? Number(((stoppedCount / total) * 100).toFixed(1)) : 0;

    return {
      total,
      runningCount,
      runningPct,
      stoppedCount,
      stoppedPct,
      stopCount,
      idleCount,
      errorCount,
    };
  }, [filteredMachines]);

  return {
    machines: sortedMachines,
    allMachinesCount: machines.length,
    filters,
    activeFilterCount,
    updateFilters,
    resetFilters,
    isDrawerOpen,
    setIsDrawerOpen,
    autoRefreshSeconds,
    setAutoRefreshSeconds,
    isRefreshing,
    lastUpdated,
    handleManualRefresh,
    sortBy,
    setSortBy,
    selectedMachine,
    setSelectedMachine,
    kpiMetrics,
  };
}
