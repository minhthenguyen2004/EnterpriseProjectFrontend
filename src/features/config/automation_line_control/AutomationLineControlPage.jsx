import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';
import useAutolineControlData from './hooks/useAutolineControlData';
import AutolineControlTabsNav from './components/tabs/AutolineControlTabsNav';
import SfcSwitchAdapterSenderContainer from './components/sfc_shared/SfcSwitchAdapterSenderContainer';
import AlabelHelperTab from './components/tabs/AlabelHelperTab';
import ActionLogsRestoreTab from './components/tabs/ActionLogsRestoreTab';

/**
 * Trang Điều Khiển Chuyền Tự Động (Automation Line Control - /config/automation-line)
 * 
 * Kiến trúc tái sử dụng đa năng (Universal Reusable Architecture):
 * - Cả 2 Tab "SFC Switch Helpers" và "SFC Adapter Helpers" cùng tái sử dụng 1 component khung duy nhất:
 *   `<SfcSenderContainer mode="switch" />` và `<SfcSenderContainer mode="adapter" />`.
 * - Tái sử dụng 100% thanh lọc 5 trường ngang, bảng SFC Keyparts 7 cột, khung kiểm thử Pass/Fail, modal Undo Link, và Terminal console.
 * - Tab 2 (Adapter) bổ sung thêm nút ADAPTER_GetAccessTokenSFC và đổi các nhãn action tương ứng sang ADAPTER_...
 * - Tích hợp đầy đủ các nút an toàn dây chuyền (E-STOP, Khởi động chuyền) và bảng chỉ số vận hành trạm.
 */
export default function AutomationLineControlPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Hook dữ liệu và tác vụ
  const {
    activeTab,
    setActiveTab,
    filters,
    handleFilterChange,
    handleResetFilters,
    keyparts,
    handleToggleKeypartSelect,
    handleSelectAllKeyparts,
    testResultStatus,
    setTestResultStatus,
    latestTransaction,
    handleClearConsole,
    isExecutingAction,
    accessToken,
    executeGetAccessToken,
    executeInsertSerialNumber,
    executeCheckSerialNumber,
    executeCheckKeyParts,
    executeInsertTestResult,
    executeUndoLink,
    isUndoModalOpen,
    setIsUndoModalOpen,
  } = useAutolineControlData();

  return (
    <div
      className={`p-6 lg:p-8 space-y-6 min-h-full transition-colors duration-200 ${
        isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* Unified Page Header Bar */}
      <PageHeaderBar
        breadcrumbs={[
          { label: 'CONFIG', isCurrent: false },
          { label: 'AUTOMATION LINE CONTROL', isCurrent: true },
        ]}
        title="AUTOMATION LINE CONTROL"
        badge="SFC DISPATCHER"
        badgeType="brand"
        description="Bảng điều khiển tập trung cho dây chuyền tự động hóa: Gửi bản tin SFC Switch/Adapter, thẩm tra Keyparts, kiểm thử kết quả và giám sát giao thức."
        showFullscreen={true}
      />

      {/* 1. Thanh 4 Tabs trên cùng */}
      <AutolineControlTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Nội dung chi tiết từng Tab */}
      {/* Tab 1: SFC Switch Helpers -> Dùng component chung SfcSwitchAdapterSenderContainer với mode="switch" */}
      {activeTab === 'sfc_switch' && (
        <SfcSwitchAdapterSenderContainer
          mode="switch"
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          keyparts={keyparts}
          onToggleKeypartSelect={handleToggleKeypartSelect}
          onSelectAllKeyparts={handleSelectAllKeyparts}
          testResultStatus={testResultStatus}
          onSelectResultStatus={setTestResultStatus}
          latestTransaction={latestTransaction}
          onClearConsole={handleClearConsole}
          isExecutingAction={isExecutingAction}
          accessToken={accessToken}
          executeGetAccessToken={executeGetAccessToken}
          executeInsertSerialNumber={executeInsertSerialNumber}
          executeCheckSerialNumber={executeCheckSerialNumber}
          executeCheckKeyParts={executeCheckKeyParts}
          executeInsertTestResult={executeInsertTestResult}
          executeUndoLink={executeUndoLink}
          isUndoModalOpen={isUndoModalOpen}
          setIsUndoModalOpen={setIsUndoModalOpen}
        />
      )}

      {/* Tab 2: SFC Adapter Helpers -> Dùng component chung SfcSwitchAdapterSenderContainer với mode="adapter" */}
      {activeTab === 'sfc_adapter' && (
        <SfcSwitchAdapterSenderContainer
          mode="adapter"
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          keyparts={keyparts}
          onToggleKeypartSelect={handleToggleKeypartSelect}
          onSelectAllKeyparts={handleSelectAllKeyparts}
          testResultStatus={testResultStatus}
          onSelectResultStatus={setTestResultStatus}
          latestTransaction={latestTransaction}
          onClearConsole={handleClearConsole}
          isExecutingAction={isExecutingAction}
          accessToken={accessToken}
          executeGetAccessToken={executeGetAccessToken}
          executeInsertSerialNumber={executeInsertSerialNumber}
          executeCheckSerialNumber={executeCheckSerialNumber}
          executeCheckKeyParts={executeCheckKeyParts}
          executeInsertTestResult={executeInsertTestResult}
          executeUndoLink={executeUndoLink}
          isUndoModalOpen={isUndoModalOpen}
          setIsUndoModalOpen={setIsUndoModalOpen}
        />
      )}

      {/* Tab 3: ALABEL Helper (Thay thế AIOT Helpers) */}
      {activeTab === 'a_label_helpers' && <AlabelHelperTab filters={filters} />}

      {/* Tab 4: Action Logs & Restore */}
      {activeTab === 'action_logs' && <ActionLogsRestoreTab filters={filters} />}
    </div>
  );
}
