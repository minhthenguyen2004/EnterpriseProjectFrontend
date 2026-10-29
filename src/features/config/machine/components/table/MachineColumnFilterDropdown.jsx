import { useState, useMemo, useEffect, useRef } from 'react';
import useTheme from '../../../../../hooks/useTheme';

export default function MachineColumnFilterDropdown({
  column,
  uniqueValues = [],
  selectedValues = [],
  sortConfig,
  onApplyFilter,
  onClearFilter,
  onSort,
  onClose
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Local state for checkboxes in popover
  const [tempSelected, setTempSelected] = useState(selectedValues || []);
  const [internalSearch, setInternalSearch] = useState('');
  const popoverRef = useRef(null);

  // Sync tempSelected with selectedValues when opened
  useEffect(() => {
    setTempSelected(selectedValues || []);
  }, [selectedValues]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Filter unique values list by internal search
  const displayedValues = useMemo(() => {
    if (!internalSearch.trim()) return uniqueValues;
    const q = internalSearch.toLowerCase();
    return uniqueValues.filter(item => item.value.toLowerCase().includes(q));
  }, [uniqueValues, internalSearch]);

  const isAllSelected = uniqueValues.length > 0 && tempSelected.length === uniqueValues.length;

  const handleToggleValue = (val) => {
    if (tempSelected.includes(val)) {
      setTempSelected(tempSelected.filter(v => v !== val));
    } else {
      setTempSelected([...tempSelected, val]);
    }
  };

  const handleSelectAll = () => {
    setTempSelected(uniqueValues.map(v => v.value));
  };

  const handleClearAll = () => {
    setTempSelected([]);
  };

  const handleApply = () => {
    onApplyFilter(column.id, tempSelected);
    onClose();
  };

  const handleResetThisColumn = () => {
    setTempSelected([]);
    onClearFilter(column.id);
    onClose();
  };

  const isCurrentSortAsc = sortConfig?.field === column.id && sortConfig?.direction === 'asc';
  const isCurrentSortDesc = sortConfig?.field === column.id && sortConfig?.direction === 'desc';

  return (
    <div
      ref={popoverRef}
      className={`absolute top-full left-0 mt-1.5 w-72 rounded-2xl border shadow-2xl z-50 p-3.5 transition-all text-left ${
        isFoxconn
          ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/80'
          : 'bg-zinc-900 border-zinc-700 text-white shadow-2xl backdrop-blur-xl'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Popover Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-zinc-200">
            Lọc: {column.label}
          </span>
          {tempSelected.length > 0 && (
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
              isFoxconn ? 'bg-blue-100 text-blue-700' : 'bg-[#76B900]/20 text-[#76B900]'
            }`}>
              {tempSelected.length}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 p-0.5 rounded-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Quick Sort Buttons */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        <button
          type="button"
          onClick={() => onSort(column.id, 'asc')}
          className={`px-2 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
            isCurrentSortAsc
              ? isFoxconn
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-[#76B900] text-black border-[#76B900] font-black'
              : isFoxconn
                ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span>A → Z</span>
        </button>

        <button
          type="button"
          onClick={() => onSort(column.id, 'desc')}
          className={`px-2 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
            isCurrentSortDesc
              ? isFoxconn
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-[#76B900] text-black border-[#76B900] font-black'
              : isFoxconn
                ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
          <span>Z → A</span>
        </button>
      </div>

      {/* Internal Search in Values */}
      <div className="relative mb-2.5">
        <input
          type="text"
          value={internalSearch}
          onChange={(e) => setInternalSearch(e.target.value)}
          placeholder={`Tìm giá trị trong ${column.label}...`}
          className={`w-full pl-7 pr-6 py-1.5 rounded-lg text-xs outline-none border transition-all ${
            isFoxconn
              ? 'bg-slate-50 border-slate-200 text-slate-800'
              : 'bg-zinc-950 border-zinc-800 text-white'
          }`}
        />
        <svg className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400 dark:text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {internalSearch && (
          <button
            type="button"
            onClick={() => setInternalSearch('')}
            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 dark:text-zinc-500"
          >
            ✕
          </button>
        )}
      </div>

      {/* Select All / Clear All quick links */}
      <div className="flex items-center justify-between text-[11px] font-semibold pb-1.5 mb-1.5 border-b border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={handleSelectAll}
          className={`hover:underline cursor-pointer ${isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}`}
        >
          Chọn tất cả ({uniqueValues.length})
        </button>
        <button
          type="button"
          onClick={handleClearAll}
          className="text-slate-400 hover:text-rose-500 dark:text-zinc-500 hover:underline cursor-pointer"
        >
          Bỏ chọn
        </button>
      </div>

      {/* Checkbox List with Counts */}
      <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
        {displayedValues.length === 0 ? (
          <div className="text-center py-4 text-xs text-slate-400 dark:text-zinc-500">
            Không tìm thấy giá trị
          </div>
        ) : (
          displayedValues.map(item => {
            const isChecked = tempSelected.includes(item.value);
            return (
              <label
                key={item.value}
                className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? isFoxconn
                      ? 'bg-blue-50/80 text-blue-900 font-semibold'
                      : 'bg-zinc-800/80 text-[#76B900] font-semibold'
                    : isFoxconn
                      ? 'hover:bg-slate-100 text-slate-700'
                      : 'hover:bg-zinc-800/50 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleValue(item.value)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span className="truncate" title={item.value}>
                    {item.value}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isFoxconn ? 'bg-slate-100 text-slate-500' : 'bg-zinc-950 text-zinc-500'
                }`}>
                  {item.count}
                </span>
              </label>
            );
          })
        )}
      </div>

      {/* Popover Footer Buttons */}
      <div className="flex items-center justify-between gap-2 pt-3 mt-2 border-t border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={handleResetThisColumn}
          className="text-[11px] font-bold text-slate-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 cursor-pointer transition-colors"
        >
          Xóa lọc cột
        </button>

        <button
          type="button"
          onClick={handleApply}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-blue-800 text-white'
              : 'bg-[#76B900] hover:bg-[#86d400] text-black font-black'
          }`}
        >
          Áp dụng ({tempSelected.length})
        </button>
      </div>
    </div>
  );
}
