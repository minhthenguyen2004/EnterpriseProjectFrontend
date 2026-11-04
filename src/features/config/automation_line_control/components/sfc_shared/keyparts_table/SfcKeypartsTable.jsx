import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

/**
 * Bảng danh sách SFC Keyparts của SN (Tỉ lệ 2/3 bề ngang)
 * Gồm 7 trường:
 * 1. Chọn (Checkbox)
 * 2. Key Name
 * 3. Key Value
 * 4. Step
 * 5. Cờ SFC
 * 6. SFC Precheck
 * 7. Bắt buộc
 */
export default function SfcKeypartsTable({
  keyparts,
  onToggleSelect,
  onSelectAll,
  snSearchTerm,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [copiedId, setCopiedId] = useState(null);

  const allSelected = keyparts.length > 0 && keyparts.every((item) => item.selected);
  const someSelected = keyparts.some((item) => item.selected);

  const selectedCount = keyparts.filter((item) => item.selected).length;
  const passedCount = keyparts.filter((item) => item.sfcPrecheck === 'PASSED').length;
  const requiredMissingCount = keyparts.filter(
    (item) => item.isRequired && item.sfcPrecheck !== 'PASSED'
  ).length;

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div
      className={`rounded-xl border flex flex-col h-full overflow-hidden transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-sm'
          : 'bg-zinc-900/90 border-zinc-800 text-zinc-100'
      }`}
    >
      {/* Table Header Bar */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between ${
          isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/70 border-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
              isFoxconn ? 'bg-blue-600 text-white' : 'bg-[#76B900] text-black font-extrabold'
            }`}
          >
            2
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>Bảng Danh Sách SFC Keyparts của SN</span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-[#76B900]">
                {snSearchTerm || 'N/A'}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Kiểm tra cấu thành linh kiện, cờ trạng thái SFC và điều kiện tiền kiểm duyệt.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] px-2 py-1 rounded-md bg-slate-200/60 dark:bg-zinc-800 font-mono text-slate-600 dark:text-zinc-300">
            Đã chọn: <strong className="text-blue-600 dark:text-[#76B900]">{selectedCount}</strong>/{keyparts.length}
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr
              className={`border-b select-none ${
                isFoxconn
                  ? 'bg-slate-100/90 text-slate-700'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800'
              }`}
            >
              {/* Cột 1: Chọn */}
              <th className="py-2.5 px-3 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = !allSelected && someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  aria-label="Chọn tất cả linh kiện"
                  className="w-4 h-4 rounded cursor-pointer accent-blue-600 dark:accent-[#76B900]"
                />
              </th>

              {/* Cột 2: Key Name */}
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Key Name</th>

              {/* Cột 3: Key Value */}
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Key Value</th>

              {/* Cột 4: Step */}
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-center">Step</th>

              {/* Cột 5: Cờ SFC */}
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-center">Cờ SFC</th>

              {/* Cột 6: SFC Precheck */}
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-center">SFC Precheck</th>

              {/* Cột 7: Bắt buộc */}
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-center">Bắt buộc</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {keyparts.map((row) => {
              const isSelected = row.selected;

              return (
                <tr
                  key={row.id}
                  onClick={() => onToggleSelect(row.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? isFoxconn
                        ? 'bg-blue-50/50 hover:bg-blue-50'
                        : 'bg-zinc-800/40 hover:bg-zinc-800/60'
                      : isFoxconn
                      ? 'hover:bg-slate-50/80'
                      : 'hover:bg-zinc-800/20'
                  }`}
                >
                  {/* Cột 1: Chọn */}
                  <td
                    className="py-2.5 px-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={row.selected}
                      onChange={() => onToggleSelect(row.id)}
                      className="w-4 h-4 rounded cursor-pointer accent-blue-600 dark:accent-[#76B900]"
                    />
                  </td>

                  {/* Cột 2: Key Name */}
                  <td className="py-2.5 px-3">
                    <div className={`font-bold ${ isFoxconn ? "text-slate-800" : "dark:text-zinc-100"}`}>
                      {row.keyName}
                    </div>
                    {row.type && (
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                        [{row.type}]
                      </span>
                    )}
                  </td>

                  {/* Cột 3: Key Value */}
                  <td className="py-2.5 px-3">
                    <div className={`flex items-center gap-1.5 font-semibold ${ isFoxconn ? "text-slate-700" : "dark:text-zinc-200"}`}>
                      <span>{row.keyValue}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(row.id, row.keyValue);
                        }}
                        title="Sao chép Key Value"
                        className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors ${
                          copiedId === row.id ? 'text-emerald-500' : 'text-slate-400'
                        }`}
                      >
                        {copiedId === row.id ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Cột 4: Step */}
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                      {row.step}
                    </span>
                  </td>

                  {/* Cột 5: Cờ SFC */}
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                        row.sfcFlag === 'Y'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {row.sfcFlag}
                    </span>
                  </td>

                  {/* Cột 6: SFC Precheck */}
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                        row.sfcPrecheck === 'PASSED'
                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                          : row.sfcPrecheck === 'WARNING'
                          ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                          : row.sfcPrecheck === 'INVALID'
                          ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                          : 'bg-slate-500/15 text-slate-400 border border-slate-500/30'
                      }`}
                    >
                      {row.sfcPrecheck === 'PASSED' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      )}
                      {row.sfcPrecheck === 'WARNING' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      )}
                      {row.sfcPrecheck}
                    </span>
                  </td>

                  {/* Cột 7: Bắt buộc */}
                  <td className="py-2.5 px-3 text-center">
                    {row.isRequired ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20">
                        Bắt buộc
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-400 dark:text-zinc-500">
                        Tùy chọn
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary Bar */}
      <div
        className={`px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] ${
          isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/80 border-zinc-800'
        }`}
      >
        <div className="flex items-center gap-4 text-slate-500 dark:text-zinc-400">
          <div>
            Tổng Keyparts: <strong className={ isFoxconn ? "text-slate-800" : "text-white"}>{keyparts.length}</strong>
          </div>
          <div>
            Hợp lệ (PASS): <strong className="text-emerald-500">{passedCount}</strong>
          </div>
          {requiredMissingCount > 0 && (
            <div className="text-rose-500 font-bold flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{requiredMissingCount} linh kiện bắt buộc chưa PASS</span>
            </div>
          )}
        </div>

        <div className="text-[10px] text-slate-400 dark:text-zinc-500 italic">
          * Tích chọn checkbox để chọn linh kiện gửi vào lệnh SWITCH_CheckKeyPartsSFC(0)
        </div>
      </div>
    </div>
  );
}
