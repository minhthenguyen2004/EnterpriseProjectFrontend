import useTheme from '../../../../../hooks/useTheme';
import SfcFilterBar from './SfcFilterBar';
import SfcKeypartsTable from './keyparts_table/SfcKeypartsTable';
import SfcActionDispatcherColumn from './action_column/SfcActionDispatcherColumn';
import UndoLinkConfirmModal from './modals/UndoLinkConfirmModal';

/**
 * GIAO DIỆN DÙNG CHUNG ĐA NĂNG (Universal Reusable SFC Sender Container)
 * Dùng lại 100% cho cả 2 tab:
 * - Tab 1: SFC Switch Helpers (mode="switch")
 * - Tab 2: SFC Adapter Helpers (mode="adapter")
 * 
 * Cấu trúc:
 * - Thanh lọc thông tin 5 trường xếp hàng ngang (dùng chung)
 * - Bố cục chia theo tỉ lệ 2 : 1:
 *   - Mục 2 (2/3 bề ngang): Bảng SFC Keyparts của SN (7 cột - dùng chung)
 *   - Mục 1 (1/3 bề ngang): Mục tác vụ gửi SFC Switch/Adapter (render nút theo mode, bao gồm ADAPTER_GetAccessTokenSFC, Pass/Fail, Undo Link, Terminal)
 */
export default function SfcSwitchAdapterSenderContainer({
  mode = 'switch',
  filters,
  onFilterChange,
  onResetFilters,
  keyparts,
  onToggleKeypartSelect,
  onSelectAllKeyparts,
  testResultStatus,
  onSelectResultStatus,
  latestTransaction,
  onClearConsole,
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
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isAdapter = mode === 'adapter';
  const containerTitle = isAdapter
    ? 'SFC Adapter Keypart & Action Sender'
    : 'SFC Switch Keypart & Action Sender';

  const containerSubtitle = isAdapter
    ? 'Bảng điều khiển tương tác SFC Adapter Gateway: Quản lý Keyparts, xác thực Token và điều phối bản tin.'
    : 'Bảng điều khiển tương tác SFC Switch: Quản lý Keyparts theo SN, thẩm định BOM, và phát lệnh điều khiển quy trình.';

  return (
    <div
      className={`rounded-2xl border p-5 transition-all space-y-5 ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-sm'
          : 'bg-zinc-900/70 border-zinc-800 backdrop-blur-md text-white'
      }`}
    >
      {/* Khung Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl ${
              isFoxconn
                ? isAdapter
                  ? 'bg-violet-700 text-white shadow-md shadow-violet-900/20'
                  : 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                : isAdapter
                ? 'bg-amber-400 text-black font-extrabold shadow-lg shadow-amber-400/25'
                : 'bg-[#76B900] text-black font-extrabold shadow-lg shadow-[#76B900]/25'
            }`}
          >
            {isAdapter ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-wider">
                {containerTitle}
              </h2>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${
                  isAdapter
                    ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30'
                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isAdapter ? 'bg-violet-500' : 'bg-emerald-500'
                  }`}
                ></span>
                <span>{isAdapter ? 'ADAPTER GATEWAY' : 'SWITCH PROTOCOL'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              {containerSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Thanh lọc thông tin 5 trường xếp hàng ngang (Dùng chung 100%) */}
      <SfcFilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        onSearch={() => executeCheckSerialNumber(mode)}
      />

      {/* 2. Bố cục chia tỉ lệ 2 : 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
        {/* Mục 2: Bảng danh sách SFC Keyparts của SN (Tỉ lệ 2/3 bề ngang - Dùng chung 100%) */}
        <div className="xl:col-span-2">
          <SfcKeypartsTable
            keyparts={keyparts}
            onToggleSelect={onToggleKeypartSelect}
            onSelectAll={onSelectAllKeyparts}
            snSearchTerm={filters.searchTerm}
          />
        </div>

        {/* Mục 1: Mục tác vụ gửi SFC Switch hoặc Adapter (Tỉ lệ 1/3 bề ngang - Tham số hóa theo mode) */}
        <div className="xl:col-span-1">
          <SfcActionDispatcherColumn
            mode={mode}
            accessToken={accessToken}
            onExecuteGetAccessToken={executeGetAccessToken}
            onExecuteInsertSN={() => executeInsertSerialNumber(mode)}
            onExecuteCheckSN={() => executeCheckSerialNumber(mode)}
            onExecuteCheckKeyparts={() => executeCheckKeyParts(mode)}
            testResultStatus={testResultStatus}
            onSelectResultStatus={onSelectResultStatus}
            onExecuteInsertTestResult={() => executeInsertTestResult(mode)}
            onOpenUndoModal={() => setIsUndoModalOpen(true)}
            latestTransaction={latestTransaction}
            onClearConsole={onClearConsole}
            isExecutingAction={isExecutingAction}
          />
        </div>
      </div>

      {/* Modal xác nhận Undo Link */}
      <UndoLinkConfirmModal
        isOpen={isUndoModalOpen}
        onClose={() => setIsUndoModalOpen(false)}
        onConfirm={() => executeUndoLink(mode)}
        isExecuting={isExecutingAction?.includes('UndoLink')}
        sn={filters.searchTerm}
        mode={mode}
      />
    </div>
  );
}
