import useTheme from '../../../../../../hooks/useTheme';

/**
 * Khung Kết Quả Kiểm Thử (Test Result Container):
 * - Dòng 1: Hai nút xếp theo hàng ngang là Pass và Fail
 * - Dòng 2: Nút Switch_InsertTestResultSFC(PASS) hoặc Adapter_InsertTestResultSFC(PASS) tùy theo mode
 */
export default function SfcTestResultFrame({
  mode = 'switch',
  testResultStatus,
  onSelectResultStatus,
  onExecuteInsertTestResult,
  isExecuting,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isPass = testResultStatus === 'PASS';
  const isFail = testResultStatus === 'FAIL';
  const isAdapter = mode === 'adapter';

  const buttonLabel = isAdapter
    ? `Adapter_InsertTestResultSFC(${testResultStatus})`
    : `Switch_InsertTestResultSFC(${testResultStatus})`;

  return (
    <div
      className={`p-3.5 rounded-xl border border-dashed transition-all ${
        isFoxconn
          ? 'bg-slate-50/90 border-slate-300'
          : 'bg-zinc-950/70 border-zinc-700/80'
      }`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className={`text-[11px] font-bold uppercase tracking-wider ${ isFoxconn ? "text-slate-600" : "dark:text-zinc-400"}`}>
            Khung Kết Quả Kiểm Thử ({isAdapter ? 'ADAPTER' : 'SWITCH'})
          </span>
        </div>
        <span
          className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
            isPass
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-rose-500/10 text-rose-500'
          }`}
        >
          Selected: {testResultStatus}
        </span>
      </div>

      {/* Dòng 1: Hai nút xếp theo hàng ngang: Pass và Fail */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        <button
          type="button"
          onClick={() => onSelectResultStatus('PASS')}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none active:scale-95 ${
            isPass
              ? isFoxconn
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/25 ring-2 ring-emerald-500'
                : 'bg-[#76B900] text-black font-extrabold shadow-lg shadow-[#76B900]/30 ring-2 ring-[#76B900]'
              : isFoxconn
              ? 'bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>Pass</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectResultStatus('FAIL')}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none active:scale-95 ${
            isFail
              ? 'bg-rose-600 text-white shadow-md shadow-rose-700/25 ring-2 ring-rose-500 font-extrabold'
              : isFoxconn
              ? 'bg-white hover:bg-rose-50 text-rose-700 border border-slate-200'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Fail</span>
        </button>
      </div>

      {/* Dòng 2: Nút Switch_InsertTestResultSFC hoặc Adapter_InsertTestResultSFC */}
      <button
        type="button"
        disabled={isExecuting}
        onClick={onExecuteInsertTestResult}
        className={`w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none shadow-md active:scale-98 disabled:opacity-50 ${
          isPass
            ? isFoxconn
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
              : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
            : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20'
        }`}
      >
        {isExecuting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Đang gửi kết quả...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{buttonLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}
