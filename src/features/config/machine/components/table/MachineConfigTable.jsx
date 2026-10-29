import { useState, useRef, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import { MACHINE_TABLE_COLUMNS, ACTION_FILTER_OPTIONS } from '../../constants/machineConfigConstants';
import MachineColumnFilterDropdown from './MachineColumnFilterDropdown';
import MachineConfigTableRow from './MachineConfigTableRow';

export default function MachineConfigTable({
  machines = [],
  totalItems = 0,
  allCount = 0,
  columnFilters = {},
  setColumnFilter,
  clearColumnFilter,
  resetAllFilters,
  activeFilterCount = 0,
  actionFilter = 'all',
  setActionFilter,
  sortConfig,
  onSort,
  getUniqueValuesForColumn,
  onOpenDetail,
  onOpenEdit,
  onOpenDelete
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Popover state for column filter
  const [activePopoverColId, setActivePopoverColId] = useState(null);

  // Dropdown state for action filter menu in 13th column
  const [isActionFilterOpen, setIsActionFilterOpen] = useState(false);
  const actionMenuRef = useRef(null);

  // Close action menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setIsActionFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleColumnFilter = (colId) => {
    setActivePopoverColId(prev => (prev === colId ? null : colId));
  };

  const getActiveFilterLabel = () => {
    const opt = ACTION_FILTER_OPTIONS.find(o => o.value === actionFilter);
    return opt ? opt.label : 'Tất cả';
  };

  return (
    <div className={`relative z-10 rounded-2xl border overflow-hidden shadow-lg transition-all ${
      isFoxconn
        ? 'bg-white border-slate-200/90 shadow-slate-200/60'
        : 'bg-zinc-900/90 border-zinc-800 shadow-2xl backdrop-blur-md'
    }`}>
      {/* Scrollable Table Container */}
      <div className="overflow-x-auto relative min-h-95 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          {/* Sticky Header with 100% Interactive Button Headers */}
          <thead className={`sticky top-0 z-20 text-[11px] font-black tracking-wider uppercase select-none border-b ${
            isFoxconn
              ? 'bg-slate-100/95 text-slate-700 border-slate-200 backdrop-blur-md'
              : 'bg-zinc-950/95 text-zinc-300 border-zinc-800 backdrop-blur-md'
          }`}>
            <tr>
              {MACHINE_TABLE_COLUMNS.map(col => {
                // Column 13: Actions with Reset Filter and Action Menu
                if (col.isAction) {
                  const isActionFiltered = actionFilter !== 'all';
                  return (
                    <th
                      key={col.id}
                      className={`px-3 py-2.5 text-center whitespace-nowrap ${col.width}`}
                    >
                      <div className="flex items-center justify-center gap-1.5" ref={actionMenuRef}>
                        {/* 1. Main Reset Filter Button */}
                        <button
                          type="button"
                          onClick={resetAllFilters}
                          title="Đặt lại toàn bộ các bộ lọc trên mọi cột và ô tìm kiếm"
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                            activeFilterCount > 0
                              ? isFoxconn
                                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-400 shadow-xs ring-1 ring-amber-300 animate-pulse'
                                : 'bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/50'
                              : isFoxconn
                                ? 'bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300'
                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>⟲ Reset</span>
                          {activeFilterCount > 0 && (
                            <span className={`px-1 py-0.2 rounded-full text-[10px] font-black ${
                              isFoxconn ? 'bg-amber-600 text-white' : 'bg-amber-400 text-black'
                            }`}>
                              {activeFilterCount}
                            </span>
                          )}
                        </button>

                        {/* 2. Action Filter Dropdown Button */}
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={() => setIsActionFilterOpen(!isActionFilterOpen)}
                            title="Lọc dòng theo trạng thái thao tác (Chi tiết / Sửa / Xóa)"
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isActionFiltered
                                ? isFoxconn
                                  ? 'bg-blue-100 text-blue-800 border-blue-400'
                                  : 'bg-zinc-800 text-[#76B900] border-[#76B900]'
                                : isFoxconn
                                  ? 'hover:bg-slate-200 text-slate-600 border-slate-300'
                                  : 'hover:bg-zinc-800 text-zinc-400 border-zinc-700'
                            }`}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                          </button>

                          {/* Action Filter Menu */}
                          {isActionFilterOpen && (
                            <div className={`absolute right-0 mt-2 w-64 rounded-xl border shadow-xl z-50 p-2 text-left ${
                              isFoxconn
                                ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300'
                                : 'bg-zinc-900 border-zinc-700 text-white shadow-2xl'
                            }`}>
                              <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400 dark:text-zinc-500 border-b border-slate-100 dark:border-zinc-800 mb-1">
                                Lọc Thao Tác Cột
                              </div>
                              {ACTION_FILTER_OPTIONS.map(opt => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setActionFilter(opt.value);
                                    setIsActionFilterOpen(false);
                                  }}
                                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors flex items-center justify-between cursor-pointer ${
                                    actionFilter === opt.value
                                      ? isFoxconn
                                        ? 'bg-blue-50 text-blue-700 font-bold'
                                        : 'bg-zinc-800 text-[#76B900] font-bold'
                                      : isFoxconn
                                        ? 'hover:bg-slate-100 text-slate-700'
                                        : 'hover:bg-zinc-800/60 text-zinc-300'
                                  }`}
                                >
                                  <span>{opt.label}</span>
                                  {actionFilter === opt.value && <span>✓</span>}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  );
                }

                // Columns 1 to 12: Interactive Button Headers with Filter Popover
                const isFiltered = columnFilters[col.id] && columnFilters[col.id].length > 0;
                const filterCount = isFiltered ? columnFilters[col.id].length : 0;
                const isSorted = sortConfig?.field === col.id;
                const sortDir = isSorted ? sortConfig.direction : null;
                const isPopoverOpen = activePopoverColId === col.id;

                return (
                  <th
                    key={col.id}
                    className={`px-2.5 py-2 whitespace-nowrap relative ${col.width}`}
                  >
                    <div className="relative inline-block">
                      {/* Interactive Header Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleColumnFilter(col.id)}
                        className={`group px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer outline-none ${
                          isFiltered
                            ? isFoxconn
                              ? 'bg-blue-100 text-[#002766] border border-blue-400 font-black shadow-xs'
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
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                            isFoxconn ? 'bg-blue-700 text-white' : 'bg-[#76B900] text-black'
                          }`}>
                            {filterCount}
                          </span>
                        )}

                        {/* Filter Funnel Icon */}
                        <svg
                          className={`w-3 h-3 transition-colors ${
                            isFiltered
                              ? isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                              : 'text-slate-400 group-hover:text-slate-600 dark:text-zinc-500 dark:group-hover:text-zinc-300'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>

                        {/* Sort Indicator Icon */}
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
                        <MachineColumnFilterDropdown
                          column={col}
                          uniqueValues={getUniqueValuesForColumn(col.id)}
                          selectedValues={columnFilters[col.id] || []}
                          sortConfig={sortConfig}
                          onApplyFilter={setColumnFilter}
                          onClearFilter={clearColumnFilter}
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
          <tbody className={`divide-y text-xs ${
            isFoxconn ? 'divide-slate-200/80' : 'divide-zinc-800/80'
          }`}>
            {machines.length === 0 ? (
              <tr>
                <td colSpan={MACHINE_TABLE_COLUMNS.length} className="text-center py-16">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className={`p-4 rounded-full ${isFoxconn ? 'bg-slate-100 text-slate-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-base font-bold text-slate-700 dark:text-zinc-200">
                      Không tìm thấy cấu hình máy nào phù hợp
                    </div>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-md">
                      Thử xóa bớt bộ lọc hoặc nhấn nút Đặt lại bộ lọc bên dưới để tải lại toàn bộ danh mục máy.
                    </p>
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className={`mt-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                        isFoxconn
                          ? 'bg-[#002766] text-white hover:bg-blue-900'
                          : 'bg-[#76B900] text-black font-black hover:bg-[#86d400]'
                      }`}
                    >
                      Đặt lại toàn bộ bộ lọc
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              machines.map(machine => (
                <MachineConfigTableRow
                  key={machine.id}
                  machine={machine}
                  onOpenDetail={onOpenDetail}
                  onOpenEdit={onOpenEdit}
                  onOpenDelete={onOpenDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
