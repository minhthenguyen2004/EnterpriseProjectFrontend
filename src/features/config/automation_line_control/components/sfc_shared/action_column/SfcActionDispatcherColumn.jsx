import useTheme from '../../../../../../hooks/useTheme';
import ActionButton from './ActionButton';
import SfcTestResultFrame from './SfcTestResultFrame';
import SfcTransactionConsole from './SfcTransactionConsole';

/**
 * Mục 1 (Tỉ lệ 1/3 bề ngang): Mục tác vụ gửi SFC Switch hoặc SFC Adapter (Universal Reusable)
 * - Khi mode === 'switch':
 *   - 3 nút xếp dọc: SWITCH_InsertSerialNumberSFC, SWITCH_CheckSerialNumberSFC, SWITCH_CheckKeyPartsSFC(0)
 *   - Khung kiểm thử: Pass / Fail, nút Switch_InsertTestResultSFC(PASS)
 *   - Nút hoàn tác: SWITCH_UndoLinkSFC
 * - Khi mode === 'adapter':
 *   - 4 nút xếp dọc (Thêm nút mới ADAPTER_GetAccessTokenSFC):
 *     1. ADAPTER_GetAccessTokenSFC
 *     2. ADAPTER_InsertSerialNumberSFC
 *     3. ADAPTER_CheckSerialNumberSFC
 *     4. ADAPTER_CheckKeyPartsSFC(0)
 *   - Khung kiểm thử: Pass / Fail, nút Adapter_InsertTestResultSFC(PASS)
 *   - Nút hoàn tác: ADAPTER_UndoLinkSFC
 * - Khung hiển thị kết quả giao dịch gần nhất (Dùng chung)
 */
export default function SfcActionDispatcherColumn({
  mode = 'switch',
  accessToken,
  onExecuteGetAccessToken,
  onExecuteInsertSN,
  onExecuteCheckSN,
  onExecuteCheckKeyparts,
  testResultStatus,
  onSelectResultStatus,
  onExecuteInsertTestResult,
  onOpenUndoModal,
  latestTransaction,
  onClearConsole,
  isExecutingAction,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isAdapter = mode === 'adapter';
  const undoButtonLabel = isAdapter ? 'ADAPTER_UndoLinkSFC' : 'SWITCH_UndoLinkSFC';

  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-4 transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-sm'
          : 'bg-zinc-900/90 border-zinc-800 text-zinc-100'
      }`}
    >
      {/* Column Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
              isFoxconn ? 'bg-blue-600 text-white' : 'bg-[#76B900] text-black font-extrabold'
            }`}
          >
            1
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">
              {isAdapter ? 'Tác Vụ Gửi SFC Adapter' : 'Tác Vụ Gửi SFC Switch'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              {isAdapter
                ? 'Điều phối bản tin SFC Adapter Gateway'
                : 'Điều phối lệnh giao dịch và kiểm thử'}
            </div>
          </div>
        </div>

        {isAdapter && (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
              accessToken
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
            }`}
          >
            {accessToken ? 'TOKEN ACTIVE' : 'NO TOKEN'}
          </span>
        )}
      </div>

      {/* Danh sách các nút tác vụ xếp theo hàng dọc */}
      <ActionButton
        isExecutingAction={isExecutingAction}
        onExecuteGetAccessToken={onExecuteGetAccessToken}
        isFoxconn={isFoxconn}
        accessToken={accessToken}
        onExecuteInsertSN={onExecuteInsertSN}
        onExecuteCheckKeyparts={onExecuteCheckKeyparts}
      />

      {/* 2. Khung kết quả kiểm thử (Pass / Fail và nút InsertTestResult động theo mode) */}
      <SfcTestResultFrame
        mode={mode}
        testResultStatus={testResultStatus}
        onSelectResultStatus={onSelectResultStatus}
        onExecuteInsertTestResult={onExecuteInsertTestResult}
        isExecuting={Boolean(isExecutingAction)}
      />

      {/* 3. Nút hoàn tác: SWITCH_UndoLinkSFC hoặc ADAPTER_UndoLinkSFC */}
      <button
        type="button"
        disabled={Boolean(isExecutingAction)}
        onClick={onOpenUndoModal}
        className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-all duration-200 cursor-pointer select-none active:scale-98 disabled:opacity-50"
      >
        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
        <span className="font-mono">{undoButtonLabel}</span>
      </button>

      {/* 4. Chỗ hiển thị kết quả giao dịch gần nhất */}
      <SfcTransactionConsole
        latestTransaction={latestTransaction}
        onClearConsole={onClearConsole}
      />
    </div>
  );
}
