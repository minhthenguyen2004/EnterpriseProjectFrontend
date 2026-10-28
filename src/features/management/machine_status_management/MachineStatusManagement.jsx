import useTheme from '../../../hooks/useTheme';
import useMachineStatusData from './hooks/useMachineStatusData';
import MachineStatusHeaderBar from './components/header/MachineStatusHeaderBar';
import MachineStatusTopKpiRow from './components/top_kpi/MachineStatusTopKpiRow';
import MachineCardGrid from './components/machine_grid/MachineCardGrid';
import LeftMachineFilterTabHandle from './components/filter/LeftMachineFilterTabHandle';
import MachineStatusFilterDrawer from './components/filter/MachineStatusFilterDrawer';

export default function MachineStatusManagement() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    machines,
    allMachinesCount,
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
  } = useMachineStatusData();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-5 lg:p-7 space-y-6 transition-colors duration-300 relative ${
        isFoxconn ? 'bg-slate-50 text-slate-900' : 'bg-zinc-950 text-white'
      }`}
    >
      {/* 1. Nút dài hẹp mép trái để mở bảng lọc */}
      <LeftMachineFilterTabHandle
        isOpen={isDrawerOpen}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        activeCount={activeFilterCount}
      />

      {/* 2. Drawer bảng lọc đa tiêu chí trượt ra từ mép trái */}
      <MachineStatusFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        onApplyFilters={updateFilters}
        onResetFilters={resetFilters}
        activeCount={activeFilterCount}
      />

      {/* 3. Header Bar: Tiêu đề, Breadcrumb, Live Refresh, Nút mở bộ lọc */}
      <MachineStatusHeaderBar
        onOpenDrawer={() => setIsDrawerOpen(true)}
        activeCount={activeFilterCount}
        autoRefreshSeconds={autoRefreshSeconds}
        onChangeAutoRefresh={setAutoRefreshSeconds}
        onManualRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
      />

      {/* 4. PHẦN TOP: 3 Ô Thống Kê Chỉ Số Hàng Ngang (Tổng số máy, Đang chạy, Dừng máy) */}
      <MachineStatusTopKpiRow kpiMetrics={kpiMetrics} />

      {/* 5. PHÍA CHÍNH: Lưới Các Ô Hình Chữ Nhật Sắp Xếp Theo Hàng */}
      <MachineCardGrid
        machines={machines}
        allCount={allMachinesCount}
        filters={filters}
        onResetFilters={resetFilters}
        onSelectMachine={setSelectedMachine}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
}