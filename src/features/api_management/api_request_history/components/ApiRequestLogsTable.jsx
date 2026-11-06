import { useState } from 'react';
import useTheme from '../../../../hooks/useTheme';
import {
  METHOD_BADGE_CONFIG,
  STATUS_CODE_CONFIG,
} from '../constants/apiRequestHistoryConstants';
import JsonCodeViewer from './JsonCodeViewer';

/**
 * ApiRequestLogsTable
 * Bảng dữ liệu nhật ký yêu cầu API gồm 8 trường thông tin:
 * 1. Client IP
 * 2. Method
 * 3. Url
 * 4. Status Code
 * 5. Request Time
 * 6. Processing Time
 * 7. Request Body (Hiện FULL 100% không cuộn, màu cú pháp chuẩn IDE)
 * 8. Response Body (Hiện FULL 100% không cuộn, màu cú pháp chuẩn IDE, viền đỏ khi có lỗi)
 *
 * *Lưu ý nghiệp vụ: Bảng này CHỈ render khi người dùng đã nhấn nút "Query Data"*
 */
export default function ApiRequestLogsTable({
  logs,
  onOpenJsonModal,
  statsSummary,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [copiedUrlId, setCopiedUrlId] = useState(null);
  const [copiedCellKey, setCopiedCellKey] = useState(null);

  const handleCopyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 1500);
  };

  const handleCopyPayload = (key, text) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopiedCellKey(key);
    setTimeout(() => setCopiedCellKey(null), 1500);
  };

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-sm text-slate-800'
          : 'bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-lg'
      }`}
    >
      {/* Header Thống Kê Nhanh Của Bảng */}
      <div
        className={`px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b ${
          isFoxconn
            ? 'bg-slate-50/80 border-slate-200 text-slate-700'
            : 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span>📋 Kết Quả Truy Vấn</span>
          </div>
        </div>
      </div>

      {/* Vùng Bảng Dữ Liệu Cuộn Ngang An Toàn */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                isFoxconn
                  ? 'bg-slate-100/90 text-slate-700 border-slate-200'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800'
              }`}
            >
              <th className="py-2.5 px-3 whitespace-nowrap">Client IP</th>
              <th className="py-2.5 px-3 whitespace-nowrap text-center">Method</th>
              <th className="py-2.5 px-3 min-w-[180px]">Url</th>
              <th className="py-2.5 px-3 whitespace-nowrap text-center">Status Code</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Request Time</th>
              <th className="py-2.5 px-3 whitespace-nowrap text-right">Processing Time</th>
              <th className="py-2.5 px-3 min-w-[280px]">Request Body</th>
              <th className="py-2.5 px-3 min-w-[280px]">esponse Body</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y font-semibold ${
              isFoxconn ? 'divide-slate-200/80' : 'divide-zinc-800/80'
            }`}
          >
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className={`py-12 text-center font-sans ${
                    isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl">🔍</span>
                    <span className="text-xs font-bold">
                      Không tìm thấy bản ghi yêu cầu API nào phù hợp với bộ lọc hiện tại.
                    </span>
                    <span className="text-[11px] opacity-75">
                      Vui lòng thử nới rộng khoảng thời gian hoặc chọn "Tất Cả Controller / Action".
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              logs.map((row) => {
                const methodBadge = METHOD_BADGE_CONFIG[row.method] || {
                  label: row.method,
                  color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
                };

                const statusBadge = STATUS_CODE_CONFIG[row.statusCode] || {
                  label: `${row.statusCode} ${row.statusText || ''}`,
                  color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
                };

                const isFast = row.processingTimeMs < 50;
                const isModerate = row.processingTimeMs >= 50 && row.processingTimeMs < 200;

                const formattedReqBody =
                  typeof row.requestBody === 'object'
                    ? JSON.stringify(row.requestBody, null, 2)
                    : String(row.requestBody || '{}');

                const formattedResBody =
                  typeof row.responseBody === 'object'
                    ? JSON.stringify(row.responseBody, null, 2)
                    : String(row.responseBody || '{}');

                const isErrorStatus = row.statusCode >= 400;

                return (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      isFoxconn
                        ? 'hover:bg-blue-50/40 text-slate-800'
                        : 'hover:bg-zinc-800/50 text-zinc-200'
                    }`}
                  >
                    {/* Cột 1: Client IP */}
                    <td className="py-2.5 px-3 whitespace-nowrap align-top">
                      <span className="inline-flex items-center gap-1.5 font-bold">
                        <span className="text-[11px] opacity-70">🖥️</span>
                        <span>{row.clientIp}</span>
                      </span>
                    </td>

                    {/* Cột 2: Method */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-center align-top">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold border ${methodBadge.color}`}
                      >
                        {methodBadge.label}
                      </span>
                    </td>

                    {/* Cột 3: Url */}
                    <td className="py-2.5 px-3 align-top">
                      <div className="flex items-center gap-1.5 group max-w-[200px]">
                        <span
                          className="break-all font-semibold text-xs text-blue-600 dark:text-blue-400"
                          title={row.url}
                        >
                          {row.url}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(row.id, row.url)}
                          className={`opacity-0 group-hover:opacity-100 p-0.5 rounded text-[10px] transition-all cursor-pointer ${
                            isFoxconn
                              ? 'hover:bg-slate-200 text-slate-600'
                              : 'hover:bg-zinc-700 text-zinc-300'
                          }`}
                          title="Sao chép URL"
                        >
                          {copiedUrlId === row.id ? '✓' : '📋'}
                        </button>
                      </div>
                    </td>

                    {/* Cột 4: Status Code */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-center align-top">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] border ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Cột 5: Request Time */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-[11px] align-top">
                      <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-400'}>
                        {row.requestTime}
                      </span>
                    </td>

                    {/* Cột 6: Processing Time */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-right align-top">
                      <span
                        className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                          isFast
                            ? isFoxconn
                              ? 'text-emerald-700'
                              : 'text-[#76B900]'
                            : isModerate
                            ? 'text-amber-500'
                            : 'text-rose-500 font-extrabold'
                        }`}
                      >
                        <span>{row.processingTimeMs} ms</span>
                        <span>{isFast ? '⚡' : isModerate ? '⏱️' : '⚠️'}</span>
                      </span>
                    </td>

                    {/* Cột 7: Request Body (Hiện Full Không Cuộn, Màu Cú Pháp IDE) */}
                    <td className="py-2.5 px-3 align-top min-w-[280px]">
                      <div className="relative group">
                        <JsonCodeViewer
                          data={row.requestBody}
                          isFoxconn={isFoxconn}
                        />

                        {/* Nút Sao Chép Gọn Xuất Hiện Khi Rê Chuột */}
                        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleCopyPayload(`req-${row.id}`, formattedReqBody)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border transition-all cursor-pointer shadow-xs ${
                              isFoxconn
                                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                            }`}
                            title="Sao chép JSON"
                          >
                            {copiedCellKey === `req-${row.id}` ? '✓' : '📋'}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Cột 8: Response Body (Hiện Full Không Cuộn, Màu Cú Pháp IDE) */}
                    <td className="py-2.5 px-3 align-top min-w-[280px]">
                      <div className="relative group">
                        <JsonCodeViewer
                          data={row.responseBody}
                          isFoxconn={isFoxconn}
                          className={
                            isErrorStatus
                              ? isFoxconn
                                ? 'border-rose-300/80 bg-rose-50/30'
                                : 'border-rose-900/60 bg-rose-950/20'
                              : ''
                          }
                        />

                        {/* Nút Sao Chép Gọn Xuất Hiện Khi Rê Chuột */}
                        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleCopyPayload(`res-${row.id}`, formattedResBody)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border transition-all cursor-pointer shadow-xs ${
                              isFoxconn
                                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                            }`}
                            title="Sao chép JSON"
                          >
                            {copiedCellKey === `res-${row.id}` ? '✓' : '📋'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
