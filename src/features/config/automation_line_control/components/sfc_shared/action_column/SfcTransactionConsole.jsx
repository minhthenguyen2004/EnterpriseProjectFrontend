import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

/**
 * Khung hiển thị kết quả giao dịch gần nhất (Latest Transaction Result Monitor)
 * Thiết kế phong cách Terminal Console công nghiệp.
 */
export default function SfcTransactionConsole({
  latestTransaction,
  onClearConsole,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  if (!latestTransaction) {
    return (
      <div
        className={`p-4 rounded-xl border text-center transition-all ${
          isFoxconn
            ? 'bg-slate-50 border-slate-200 text-slate-400'
            : 'bg-zinc-950 border-zinc-800 text-zinc-500'
        }`}
      >
        <div className="text-xs font-semibold">Chưa có giao dịch SFC nào được kích hoạt.</div>
      </div>
    );
  }

  const isSuccess = latestTransaction.status === 'SUCCESS';

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(latestTransaction, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all text-xs font-semibold ${
        isFoxconn
          ? 'bg-slate-950 border-slate-800 text-slate-200 shadow-md'
          : 'bg-black border-zinc-800 text-zinc-200 shadow-lg'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="px-3.5 py-2 bg-slate-900/90 dark:bg-zinc-950 border-b border-slate-800 dark:border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className={`text-[11px] font-bold ${ isFoxconn ? "text-slate-400" : "text-white"} ml-1`}>
            KẾT QUẢ GIAO DỊCH GẦN NHẤT
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyJson}
            title="Sao chép toàn bộ JSON"
            className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            {copied ? '✓ Đã chép' : 'Sao chép'}
          </button>
          <button
            type="button"
            onClick={onClearConsole}
            title="Xóa console"
            className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-3 space-y-2">
        {/* Row 1: Status & Latency */}
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isSuccess ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            ></span>
            <span
              className={`font-black uppercase ${
                isSuccess ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {latestTransaction.status} ({latestTransaction.httpCode})
            </span>
            <span className="text-slate-400 text-[10px]">
              ID: {latestTransaction.transactionId}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-2">
            <span>⚡ {latestTransaction.latencyMs}ms</span>
            <span>{latestTransaction.timestamp}</span>
          </div>
        </div>

        {/* Row 2: Action Name */}
        <div className="text-[11px]">
          <span className="text-slate-400">Action: </span>
          <span className="font-bold text-cyan-300 dark:text-[#76B900]">
            {latestTransaction.actionName}
          </span>
        </div>

        {/* Row 3: Server Message */}
        <div
          className={`p-2 rounded-lg text-[11px] leading-relaxed border ${
            isSuccess
              ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
              : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
          }`}
        >
          {latestTransaction.message}
        </div>

        {/* Row 4: Raw JSON Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowRaw(!showRaw)}
            className="text-[10px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
          >
            {showRaw ? '▼ Thu gọn dữ liệu chi tiết' : '▶ Xem chi tiết Payload & Response JSON'}
          </button>

          {showRaw && (
            <div className="mt-2 p-2 rounded bg-black/60 border border-slate-800 text-[10px] text-slate-300 max-h-44 overflow-y-auto overflow-x-auto">
              <pre className="font-semibold">
                {JSON.stringify(
                  {
                    requestPayload: latestTransaction.requestPayload,
                    responseData: latestTransaction.responseData,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
