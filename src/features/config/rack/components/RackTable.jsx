import { useState, useRef } from 'react';
import useTheme from '../../../../hooks/useTheme';
import { TABLE_COLUMNS } from '../constants/rackConfigConstants';
import RackColumnFilterDropdown from './RackColumnFilterDropdown';

export default function RackTable({
  data = [],
  startIndex = 0,
  columnFilters = {},
  sortConfig = { field: null, direction: 'asc' },
  activeFilterCount = 0,
  onApplyColumnFilter,
  onClearColumnFilter,
  onResetAllFilters,
  onSort,
  getUniqueValuesForColumn,
  onEdit,
  onDelete,
  searchTerm
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [activePopoverColId, setActivePopoverColId] = useState(null);
  const tableContainerRef = useRef(null);

  const handleToggleColumnFilter = (columnId) => {
    setActivePopoverColId((prev) => (prev === columnId ? null : columnId));
  };

  const hasAnyFilter = activeFilterCount > 0 || (searchTerm && searchTerm.trim() !== '');

  if (!data || data.length === 0) {
    return (
      <div
        className={`p-12 text-center rounded-2xl border transition-all ${
          isFoxconn ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900/40 border-zinc-800 shadow-xl'
        }`}
      >
        <div className="w-14 h-14 mx-auto mb-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
          Không tìm thấy cấu hình tủ Rack nào phù hợp
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
          {hasAnyFilter
            ? 'Không có bản ghi nào khớp với điều kiện lọc hiện tại. Vui lòng thử từ khóa khác hoặc đặt lại bộ lọc.'
            : 'Hiện tại chưa có dữ liệu cấu hình tủ Rack trong hệ thống.'}
        </p>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={onResetAllFilters}
            className={`mt-4 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-[#76B900]/10 hover:bg-[#76B900]/20 text-[#76B900] border border-[#76B900]/30'
            }`}
          >
            Đặt lại toàn bộ bộ lọc ({activeFilterCount})
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={tableContainerRef}
      className={`rounded-2xl border shadow-lg transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-slate-200/60'
          : 'bg-zinc-900/90 border-zinc-800 shadow-2xl backdrop-blur-md'
      }`}
    >
      <div className="overflow-x-auto min-h-96 custom-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          {/* Interactive Table Header */}
          <thead
            className={`text-[11px] uppercase tracking-wider select-none font-bold border-b ${
              isFoxconn
                ? 'bg-slate-100/95 text-slate-700 border-slate-200'
                : 'bg-zinc-950/95 text-zinc-300 border-zinc-800'
            }`}
          >
            <tr>
              {TABLE_COLUMNS.map((col) => {
                // Column 1: Row Index
                if (col.isIndex) {
                  return (
                    <th key={col.id} className="py-3 px-3 text-center w-12 whitespace-nowrap">
                      {col.label}
                    </th>
                  );
                }

                // Column 11: Actions with Reset Filter Header Button
                if (col.isAction) {
                  return (
                    <th key={col.id} className="py-2.5 px-3 text-center whitespace-nowrap w-36">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={onResetAllFilters}
                          title="Đặt lại toàn bộ các bộ lọc trên mọi cột và ô tìm kiếm"
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                            activeFilterCount > 0
                              ? isFoxconn
                                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 shadow-2xs'
                                : 'bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-500/70 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                              : isFoxconn
                              ? 'bg-slate-200/80 hover:bg-slate-300 text-slate-700 border border-slate-300/80'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          <span>⟲ Reset</span>
                          {activeFilterCount > 0 && (
                            <span
                              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                                isFoxconn ? 'bg-amber-600 text-white' : 'bg-amber-400 text-black'
                              }`}
                            >
                              {activeFilterCount}
                            </span>
                          )}
                        </button>
                      </div>
                    </th>
                  );
                }

                // Data Columns: Interactive Header Button with Filter Popover
                const isFiltered = columnFilters[col.id] && columnFilters[col.id].length > 0;
                const filterCount = isFiltered ? columnFilters[col.id].length : 0;
                const isSorted = sortConfig?.field === col.id;
                const sortDir = isSorted ? sortConfig.direction : null;
                const isPopoverOpen = activePopoverColId === col.id;

                return (
                  <th key={col.id} className={`px-2.5 py-2 whitespace-nowrap relative ${col.width || ''}`}>
                    <div className="relative inline-block">
                      {/* Interactive Column Header Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleColumnFilter(col.id)}
                        className={`group px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer outline-none ${
                          isFiltered
                            ? isFoxconn
                              ? 'bg-blue-100 text-[#002766] border border-blue-400 font-black shadow-2xs'
                              : 'bg-zinc-800 text-[#76B900] border border-[#76B900]/70 font-black shadow-[0_0_10px_rgba(118,185,0,0.25)]'
                            : isFoxconn
                            ? 'hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-transparent'
                            : 'hover:bg-zinc-800 text-zinc-300 hover:text-white border border-transparent'
                        }`}
                        title={`Bấm để mở bộ lọc cột ${col.label}`}
                      >
                        <span>{col.label}</span>

                        {/* Active filter count badge */}
                        {isFiltered && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                              isFoxconn ? 'bg-blue-700 text-white' : 'bg-[#76B900] text-black'
                            }`}
                          >
                            {filterCount}
                          </span>
                        )}

                        {/* Funnel Icon */}
                        <svg
                          className={`w-3 h-3 transition-colors ${
                            isFiltered
                              ? isFoxconn
                                ? 'text-blue-700'
                                : 'text-[#76B900]'
                              : 'text-slate-400 group-hover:text-slate-600 dark:text-zinc-500 dark:group-hover:text-zinc-300'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                          />
                        </svg>

                        {/* Sort Indicator */}
                        {isSorted ? (
                          <span className={`text-[11px] font-black ${isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}`}>
                            {sortDir === 'asc' ? '▲' : '▼'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-300 dark:text-zinc-600 opacity-60 group-hover:opacity-100">
                            ⇅
                          </span>
                        )}
                      </button>

                      {/* Dropdown Popover */}
                      {isPopoverOpen && (
                        <RackColumnFilterDropdown
                          column={col}
                          uniqueValues={getUniqueValuesForColumn(col.id)}
                          selectedValues={columnFilters[col.id] || []}
                          sortConfig={sortConfig}
                          onApplyFilter={onApplyColumnFilter}
                          onClearFilter={onClearColumnFilter}
                          onSort={onSort}
                          onClose={() => setActivePopoverColId(null)}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className={`divide-y ${isFoxconn ? 'divide-slate-100' : 'divide-zinc-800/60'}`}>
            {data.map((item, index) => {
              const rowNumber = startIndex + index + 1;

              return (
                <tr
                  key={item.id || index}
                  className={`transition-colors group ${
                    isFoxconn ? 'hover:bg-blue-50/40 text-slate-700' : 'hover:bg-zinc-800/40 text-zinc-200'
                  }`}
                >
                  {/* Row Index */}
                  <td className="py-3.5 px-3 text-center font-mono text-[11px] text-slate-400 dark:text-zinc-500 font-semibold">
                    {rowNumber}
                  </td>

                  {/* Factory */}
                  <td className="py-3.5 px-4 font-semibold whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-slate-800 dark:text-zinc-100 font-bold">{item.factory}</span>
                    </span>
                  </td>

                  {/* Floor */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-lg text-[11px] font-bold font-mono border ${
                        isFoxconn
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {item.floor}
                    </span>
                  </td>

                  {/* Room */}
                  <td className="py-3.5 px-4 font-medium whitespace-nowrap">
                    <span className="text-slate-700 dark:text-zinc-300">{item.room}</span>
                  </td>

                  {/* Product */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                        isFoxconn
                          ? 'bg-blue-50 border-blue-200/80 text-[#002766]'
                          : 'bg-[#76B900]/10 border-[#76B900]/30 text-[#76B900]'
                      }`}
                    >
                      <span>🏷️</span>
                      <span>{item.product}</span>
                    </span>
                  </td>

                  {/* Group */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-slate-600 dark:text-zinc-300 font-medium">{item.group}</span>
                  </td>

                  {/* Rack */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 font-mono font-bold text-xs px-2 py-0.5 rounded-md border ${
                        isFoxconn
                          ? 'bg-slate-100/90 border-slate-300/80 text-slate-800'
                          : 'bg-zinc-800/90 border-zinc-700 text-zinc-200'
                      }`}
                    >
                      <span>🗄️</span>
                      <span>{item.rack}</span>
                    </span>
                  </td>

                  {/* Slot Number */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="font-mono font-extrabold text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      #{String(item.slot_number).padStart(2, '0')}
                    </span>
                  </td>

                  {/* Slot Name */}
                  <td className="py-3.5 px-4 font-mono font-bold whitespace-nowrap">
                    <span className="text-slate-800 dark:text-zinc-100">{item.slot_name}</span>
                  </td>

                  {/* IP Address */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <span>{item.ip_address}</span>
                    </span>
                  </td>

                  {/* Actions Column: Sửa & Xóa */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Nút Sửa (Edit) */}
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                          isFoxconn
                            ? 'bg-blue-50/80 hover:bg-blue-100 text-blue-700 border-blue-200/80 hover:border-blue-300 shadow-2xs'
                            : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/50 shadow-2xs'
                        }`}
                        title="Chỉnh sửa cấu hình"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span className="hidden sm:inline">Sửa</span>
                      </button>

                      {/* Nút Xóa (Delete) */}
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                          isFoxconn
                            ? 'bg-rose-50/80 hover:bg-rose-100 text-rose-700 border-rose-200/80 hover:border-rose-300 shadow-2xs'
                            : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 hover:border-rose-500/50 shadow-2xs'
                        }`}
                        title="Xóa cấu hình"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
