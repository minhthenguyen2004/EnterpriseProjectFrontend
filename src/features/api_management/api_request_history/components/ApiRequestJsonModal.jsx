import { useState } from 'react';
import useTheme from '../../../../hooks/useTheme';
import {
  METHOD_BADGE_CONFIG,
  STATUS_CODE_CONFIG,
} from '../constants/apiRequestHistoryConstants';
import JsonCodeViewer from './JsonCodeViewer';

/**
 * ApiRequestJsonModal
 * Hộp thoại hiển thị chi tiết toàn văn Request Body hoặc Response Body
 * Hỗ trợ làm đẹp định dạng JSON (Pretty Print), cú pháp màu sắc chuẩn IDE và sao chép 1-click vào Clipboard.
 */
export default function ApiRequestJsonModal({
  isOpen,
  onClose,
  log,
  type = 'request', // 'request' | 'response'
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [copied, setCopied] = useState(false);

  if (!isOpen || !log) return null;

  const isRequest = type === 'request';
  const title = isRequest ? 'Chi Tiết Request Body (Payload Gửi Lên)' : 'Chi Tiết Response Body (Phản Hồi Máy Chủ)';
  const jsonContent = isRequest ? log.requestBody : log.responseBody;

  const methodBadge = METHOD_BADGE_CONFIG[log.method] || {
    label: log.method,
    color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  };

  const statusBadge = STATUS_CODE_CONFIG[log.statusCode] || {
    label: `${log.statusCode} ${log.statusText || ''}`,
    color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  };

  const handleCopyJson = () => {
    const textToCopy =
      typeof jsonContent === 'string'
        ? jsonContent
        : JSON.stringify(jsonContent, null, 2);

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-3xl rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b ${
            isFoxconn ? 'border-slate-200' : 'border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                isRequest
                  ? isFoxconn
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-[#76B900]/10 text-[#76B900]'
                  : isFoxconn
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-emerald-500/10 text-emerald-400'
              }`}
            >
              <span className="text-base">{isRequest ? '📤' : '📥'}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-bold uppercase tracking-wider ${
                    isFoxconn ? 'text-slate-800' : 'text-zinc-100'
                  }`}
                >
                  {title}
                </h3>
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-extrabold border ${methodBadge.color}`}>
                  {methodBadge.label}
                </span>
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${statusBadge.color}`}>
                  {statusBadge.label}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
                Client: <strong className="font-mono">{log.clientIp}</strong> | URL:{' '}
                <strong className="font-mono text-blue-600 dark:text-blue-400">{log.url}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyJson}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
              }`}
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? 'Đã Chép' : 'Sao Chép JSON'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isFoxconn
                  ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body: Hiển Thị JSON Đẹp Mắt */}
        <div className="p-6 overflow-y-auto space-y-3 text-xs">
          {/* Tóm Tắt Thông Số Kỹ Thuật */}
          <div
            className={`p-3 rounded-xl border grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
            }`}
          >
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
                Request Time
              </span>
              <span className="font-mono font-semibold text-[11px]">{log.requestTime}</span>
            </div>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
                Processing Time
              </span>
              <span className={`font-mono font-bold text-[11px] ${
                log.processingTimeMs < 50
                  ? isFoxconn ? 'text-emerald-700' : 'text-[#76B900]'
                  : log.processingTimeMs < 200
                  ? 'text-amber-500'
                  : 'text-rose-500'
              }`}>
                ⚡ {log.processingTimeMs} ms
              </span>
            </div>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
                Controller
              </span>
              <span className="font-semibold truncate block text-[11px]">{log.controller}</span>
            </div>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
                Action
              </span>
              <span className="font-semibold truncate block text-[11px]">{log.action}</span>
            </div>
          </div>

          {/* Vùng Render JSON Formatted với IDE Syntax Highlighting */}
          <div className="relative">
            <JsonCodeViewer
              data={jsonContent}
              isFoxconn={isFoxconn}
              maxHeight="max-h-[55vh]"
              className="text-xs p-4"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between ${
            isFoxconn ? 'border-slate-200 bg-slate-50/50' : 'border-zinc-800 bg-zinc-950/30'
          }`}
        >
          <span className={`text-[11px] font-mono ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
            Định dạng: JSON Pretty Print (IDE Syntax Highlighting)
          </span>

          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
            }`}
          >
            Đóng Cửa Sổ
          </button>
        </div>
      </div>
    </div>
  );
}
