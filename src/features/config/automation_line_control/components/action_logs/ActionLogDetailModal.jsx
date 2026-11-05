import { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import {
  ACTION_BADGE_CONFIG,
  STATUS_BADGE_CONFIG,
} from '../../constants/actionLogsConstants';

/**
 * ActionLogDetailModal
 * Hộp thoại hiển thị chi tiết Metadata kiểm toán, Client IP, Hostname, Session ID,
 * Stored Procedure và toàn văn Request Payload / Response Body.
 */
export default function ActionLogDetailModal({ isOpen, onClose, log }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen || !log) return null;

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const actionBadge = ACTION_BADGE_CONFIG[log.actionType] || {
    label: log.actionType.toUpperCase(),
    color: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  };
  const statusBadge = STATUS_BADGE_CONFIG[log.status] || {
    label: log.status,
    color: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-3xl rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
          isFoxconn ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isFoxconn ? 'border-slate-200' : 'border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                isFoxconn ? 'bg-blue-50 text-blue-600' : 'bg-[#76B900]/10 text-[#76B900]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-bold uppercase tracking-wider ${
                    isFoxconn ? 'text-slate-800' : 'text-zinc-100'
                  }`}
                >
                  Chi Tiết Bản Ghi Kiểm Toán
                </h3>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                    isFoxconn
                      ? 'bg-slate-100 text-slate-700 border border-slate-200'
                      : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                  }`}
                >
                  {log.id}
                </span>
              </div>
              <p className={`text-xs ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
                Lưu vết toàn bộ thông số thực thi tác vụ, hạ tầng máy trạm và thông điệp CSDL.
              </p>
            </div>
          </div>

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

        {/* Modal Body (Cuộn Dọc) */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Khối 1: Tóm Tắt Thông Tin Chính */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              className={`p-3 rounded-xl border ${
                isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
              }`}
            >
              <span
                className={`block text-[11px] font-bold mb-1 ${
                  isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                Thời Gian Thực Thi
              </span>
              <span
                className={`font-mono font-semibold ${
                  isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                }`}
              >
                {log.timestamp}
              </span>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
              }`}
            >
              <span
                className={`block text-[11px] font-bold mb-1 ${
                  isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                Người Thực Hiện
              </span>
              <span
                className={`font-mono font-bold flex items-center gap-1 ${
                  isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                }`}
              >
                <span>{log.operatorId}</span>
                <span className="text-[10px]">🔒</span>
              </span>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
              }`}
            >
              <span
                className={`block text-[11px] font-bold mb-1 ${
                  isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                Hành Động
              </span>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold border ${actionBadge.color}`}>
                {actionBadge.label}
              </span>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
              }`}
            >
              <span
                className={`block text-[11px] font-bold mb-1 ${
                  isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                Trạng Thái
              </span>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadge.color}`}>
                {statusBadge.label}
              </span>
            </div>
          </div>

          {/* Khối 2: Thông Số Hạ Tầng & CSDL */}
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              isFoxconn
                ? 'border-slate-200 bg-slate-50/70 text-slate-700'
                : 'border-zinc-800 bg-zinc-950/40 text-zinc-300'
            }`}
          >
            <h4
              className={`font-bold uppercase text-[11px] tracking-wider mb-2 ${
                isFoxconn ? 'text-slate-800' : 'text-zinc-200'
              }`}
            >
              Thông Tin Môi Trường & Stored Procedure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Bảng CSDL Đích:</span>{' '}
                <strong className={`font-mono ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>
                  {log.targetTable}
                </strong>
              </div>
              <div>
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Mục Tiêu Tác Động:</span>{' '}
                <strong className={`font-mono ${isFoxconn ? 'text-blue-600' : 'text-blue-400'}`}>
                  [{log.targetType.toUpperCase()}] {log.targetCode}
                </strong>
              </div>
              <div>
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Client IP:</span>{' '}
                <span className={`font-mono font-semibold ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>
                  {log.metadata?.clientIp || '192.168.10.45'}
                </span>
              </div>
              <div>
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Hostname:</span>{' '}
                <span className={`font-mono font-semibold ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>
                  {log.metadata?.hostname || 'ALABEL-GW-01'}
                </span>
              </div>
              <div>
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Session ID:</span>{' '}
                <span className={`font-mono text-[11px] font-semibold ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>
                  {log.metadata?.sessionId || 'N/A'}
                </span>
              </div>
              <div>
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Độ Trễ Xử Lý:</span>{' '}
                <span className={`font-mono font-bold ${isFoxconn ? 'text-emerald-600' : 'text-[#76B900]'}`}>
                  ⚡ {log.metadata?.latencyMs || 24}ms
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Stored Procedure:</span>{' '}
                <span className={`font-mono font-bold ${isFoxconn ? 'text-amber-700' : 'text-amber-400'}`}>
                  {log.metadata?.spName || '[AutoLine].[ALABEL_ExecuteAction]'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className={isFoxconn ? 'text-slate-500' : 'text-zinc-400'}>Mô Tả:</span>{' '}
                <span className={isFoxconn ? 'text-slate-800 font-medium' : 'text-zinc-200'}>
                  {log.description}
                </span>
              </div>
            </div>
          </div>

          {/* Khối 3: Request Payload (JSON) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span
                className={`font-bold ${
                  isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                }`}
              >
                📤 Request Payload (Dữ liệu gửi lên):
              </span>
              <button
                type="button"
                onClick={() => handleCopy('req', log.metadata?.requestPayload)}
                className={`text-[11px] font-bold hover:underline cursor-pointer ${
                  isFoxconn ? 'text-blue-600' : 'text-[#76B900]'
                }`}
              >
                {copiedKey === 'req' ? '✓ Đã chép' : 'Sao chép JSON'}
              </button>
            </div>
            <pre
              className={`p-3 rounded-xl font-mono text-[11px] overflow-x-auto max-h-40 border ${
                isFoxconn
                  ? 'bg-slate-950 text-slate-100 border-slate-800'
                  : 'bg-zinc-950 text-zinc-200 border-zinc-800'
              }`}
            >
              {JSON.stringify(log.metadata?.requestPayload || {}, null, 2)}
            </pre>
          </div>

          {/* Khối 4: Response Body (JSON) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span
                className={`font-bold ${
                  isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                }`}
              >
                📥 Response Body (Phản hồi từ CSDL / Dịch vụ):
              </span>
              <button
                type="button"
                onClick={() => handleCopy('res', log.metadata?.responseBody)}
                className={`text-[11px] font-bold hover:underline cursor-pointer ${
                  isFoxconn ? 'text-blue-600' : 'text-[#76B900]'
                }`}
              >
                {copiedKey === 'res' ? '✓ Đã chép' : 'Sao chép JSON'}
              </button>
            </div>
            <pre
              className={`p-3 rounded-xl font-mono text-[11px] overflow-x-auto max-h-40 border ${
                isFoxconn
                  ? 'bg-slate-950 text-slate-100 border-slate-800'
                  : 'bg-zinc-950 text-zinc-200 border-zinc-800'
              }`}
            >
              {JSON.stringify(log.metadata?.responseBody || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t flex justify-end ${
            isFoxconn ? 'border-slate-200 bg-slate-50/50' : 'border-zinc-800 bg-zinc-950/30'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
            }`}
          >
            Đóng Hộp Thoại
          </button>
        </div>
      </div>
    </div>
  );
}