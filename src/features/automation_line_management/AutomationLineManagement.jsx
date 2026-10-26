import useTheme from '../../hooks/useTheme';
import useAutolineData from './hooks/useAutolineData';
import AutolineHeaderBar from './components/header/AutolineHeaderBar';
import LeftFilterTabHandle from './components/filter/LeftFilterTabHandle';
import AutolineFilterDrawer from './components/filter/AutolineFilterDrawer';
import ActiveFilterChipsBar from './components/filter/ActiveFilterChipsBar';
import TopKpiRow from './components/top_kpi/TopKpiRow';
import MachineFlowRow from './components/machine_flow/MachineFlowRow';
import MachineDetailModal from './components/machine_flow/MachineDetailModal';
import BottomAnalyticsRow from './components/bottom_analytics/BottomAnalyticsRow';

export default function AutomationLineManagement() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
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
  } = useAutolineData();

  return (
    <div
      className={`relative min-h-screen p-5 lg:p-7 space-y-6 transition-colors duration-300 ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-white'
      }`}
    >
      {/* 1. NÚT DÀI HẸP MÉP TRÁI MÀN HÌNH */}
      <LeftFilterTabHandle
        isOpen={isFilterDrawerOpen}
        onToggle={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
        activeCount={activeFilterCount}
      />

      {/* 2. DRAWER BỘ LỌC ĐA TIÊU CHÍ (SLIDE-OVER TỪ MÉP TRÁI) */}
      <AutolineFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filter={filter}
        onApplyFilter={(newFilter) => setFilter(newFilter)}
        onResetFilter={resetFilter}
      />

      {/* 3. MODAL CHI TIẾT CẢM BIẾN TRẠM MÁY (KHI CLICK VÀO MÁY) */}
      <MachineDetailModal
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
      />

      {/* 4. HEADER BAR: TIÊU ĐỀ & ĐIỀU KHIỂN VẬN HÀNH */}
      <AutolineHeaderBar
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
        onRefresh={refreshData}
        isAutoRefresh={isAutoRefresh}
        setIsAutoRefresh={setIsAutoRefresh}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
      />

      {/* 5. ACTIVE FILTER CHIPS (DẢI THẺ ĐANG LỌC) */}
      <ActiveFilterChipsBar
        chips={activeChips}
        onRemoveChip={removeFilterKey}
        onResetAll={resetFilter}
      />

      {/* 6. PHẦN TOP: 6 THẺ CHỈ SỐ VẬN HÀNH HÀNG NGANG */}
      <TopKpiRow kpi={data.kpi} />

      {/* 7. PHẦN GIỮA: CHUỖI CÁC MÁY XẾP HÀNG NGANG (MACHINE FLOW ROW) */}
      <MachineFlowRow
        machines={data.machines}
        onSelectMachine={(machine) => setSelectedMachine(machine)}
      />

      {/* 8. PHẦN BOTTOM: 3 KHỐI THÔNG TIN DÀN HÀNG NGANG */}
      <BottomAnalyticsRow
        topErrors={data.topErrors}
        hourlyTrend={data.hourlyTrend}
        runtimeOverview={data.runtimeOverview}
      />
    </div>
  );
}