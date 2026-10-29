import PageHeaderBar from '../../../../../components/common/PageHeaderBar';

export default function AutolineHeaderBar({
  lastUpdated,
  isRefreshing,
  onRefresh,
  isAutoRefresh,
  setIsAutoRefresh,
  refreshInterval,
  setRefreshInterval,
}) {
  return (
    <PageHeaderBar
      breadcrumbs={[
        { label: 'QUẢN LÝ TỰ ĐỘNG HÓA', isCurrent: false },
        { label: 'AUTOLINE MANAGEMENT', isCurrent: true }
      ]}
      title="CHUYỀN SẢN XUẤT TỰ ĐỘNG HÓA"
      badge="LIVE LINE"
      badgeType="live"
      description="Bảng điều hành thời gian thực: Giám sát 6 KPI dây chuyền, chuỗi trạm máy nối tiếp và phân tích lỗi, sản lượng."
      lastUpdated={lastUpdated}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      isAutoRefresh={isAutoRefresh}
      onToggleAutoRefresh={() => setIsAutoRefresh(!isAutoRefresh)}
      refreshInterval={refreshInterval}
      onRefreshIntervalChange={setRefreshInterval}
      showFullscreen={true}
    />
  );
}
