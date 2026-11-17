import { useTranslation } from 'react-i18next';
import useTheme from '../../../../../hooks/useTheme';
import PageHeaderBar from '../../../../../components/common/PageHeaderBar';

export default function MachineStatusHeaderBar({
  onOpenDrawer,
  activeCount = 0,
  autoRefreshSeconds,
  onChangeAutoRefresh,
  onManualRefresh,
  isRefreshing,
  lastUpdated,
}) {
  const { t } = useTranslation('machine');
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isAutoRefresh = autoRefreshSeconds > 0;

  // Custom action button for Filter drawer
  const filterActionButton = (
    <button
      type="button"
      onClick={onOpenDrawer}
      className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-102 active:scale-98 select-none ${
        isFoxconn
          ? 'bg-[#002766] hover:bg-[#003893] text-white border border-blue-900/40 shadow-blue-950/20'
          : 'bg-[#76B900] hover:bg-[#86d400] text-black font-black shadow-[0_0_12px_rgba(118,185,0,0.35)]'
      }`}
      title={t('statusManagement.filterBtnTitle', 'Mở bảng lọc đa tiêu chí máy móc')}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      <span>{t('statusManagement.filterBtn', 'Bộ Lọc')}</span>
      {activeCount > 0 && (
        <span
          className={`text-[9px] font-black rounded-full px-1.5 py-0.2 ${
            isFoxconn ? 'bg-amber-400 text-slate-900' : 'bg-black text-[#76B900]'
          }`}
        >
          {activeCount}
        </span>
      )}
    </button>
  );

  return (
    <PageHeaderBar
      breadcrumbs={[
        { label: t('statusManagement.header.breadcrumbAutomation', 'QUẢN LÝ TỰ ĐỘNG HÓA'), isCurrent: false },
        { label: t('statusManagement.header.breadcrumbMachineStatus', 'MACHINE STATUS'), isCurrent: true }
      ]}
      title={t('statusManagement.header.title', 'GIÁM SÁT TRẠNG THÁI MÁY MÓC')}
      badge={t('statusManagement.header.badge', 'LIVE MONITOR')}
      badgeType="live"
      description={t('statusManagement.header.description', 'Bảng điều hành thời gian thực: Giám sát toàn bộ các trạm máy sản xuất, định danh IP, chương trình và vị trí dây chuyền.')}
      actions={filterActionButton}
      lastUpdated={lastUpdated}
      isRefreshing={isRefreshing}
      onRefresh={onManualRefresh}
      isAutoRefresh={isAutoRefresh}
      onToggleAutoRefresh={() => onChangeAutoRefresh && onChangeAutoRefresh(isAutoRefresh ? 0 : 30)}
      refreshInterval={autoRefreshSeconds || 30}
      onRefreshIntervalChange={(sec) => onChangeAutoRefresh && onChangeAutoRefresh(sec)}
      showFullscreen={true}
    />
  );
}
