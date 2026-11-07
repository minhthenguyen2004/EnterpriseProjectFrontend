import { useState, useMemo, useEffect, useRef } from 'react';
import useTheme from '../../../../hooks/useTheme';

export default function RackColumnFilterDropdown({
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

  const [tempSelected, setTempSelected] = useState(selectedValues || []);
  const [internalSearch, setInternalSearch] = useState('');
  const popoverRef = useRef(null);

  useEffect(() => {
    setTempSelected(selectedValues || []);
  }, [selectedValues]);

  // Click outside and Escape key to close
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
    return uniqueValues.filter((item) =>
      String(item.value).toLowerCase().includes(q)
    );
  }, [uniqueValues, internalSearch]);

  const isAllSelected =
    uniqueValues.length > 0 && tempSelected.length === uniqueValues.length;

  const handleToggleValue = (val) => {
    const valStr = String(val);
    if (tempSelected.includes(valStr)) {
      setTempSelected(tempSelected.filter((v) => v !== valStr));
    } else {
      setTempSelected([...tempSelected, valStr]);
    }
  };

  const handleSelectAll = () => {
    setTempSelected(uniqueValues.map((v) => String(v.value)));
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

  const isCurrentSortAsc =
    sortConfig?.field === column.id && sortConfig?.direction === 'asc';
  const isCurrentSortDesc =
    sortConfig?.field === column.id && sortConfig?.direction === 'desc';

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
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                isFoxconn ? 'bg-blue-100 text-blue-700' : 'bg-[#76B900]/20 text-[#76B900]'
              }`}
            >
              {tempSelected.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 text-xs cursor-pointer p-0.5"
        >
          ✕
        </button>
      </div>

      {/* Internal Search Input */}
      <div className="relative mb-2.5">
        <input
          type="text"
          value={internalSearch}
          onChange={(e) => setInternalSearch(e.target.value)}
          placeholder={`Tìm giá trị ${column.label}...`}
          className={`w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border outline-hidden transition-colors ${
            isFoxconn
              ? 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-[#002766]'
              : 'bg-zinc-950 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-[#76B900]'
          }`}
        />
        <svg
          className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400 dark:text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {internalSearch && (
          <button
            type="button"
            onClick={() => setInternalSearch('')}
            className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Select All / Clear All Toolbar */}
      <div className="flex items-center justify-between px-1 mb-2 text-[11px]">
        <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-600 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => (e.target.checked ? handleSelectAll() : handleClearAll())}
            className="rounded text-blue-600 focus:ring-0 cursor-pointer"
          />
          <span>Chọn tất cả</span>
        </label>
        <button
          type="button"
          onClick={handleClearAll}
          className="text-slate-400 hover:text-rose-500 text-[10px] cursor-pointer"
        >
          Bỏ chọn
        </button>
      </div>

      {/* Unique Values Checkbox List */}
      <div className="max-h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar mb-3">
        {displayedValues.length > 0 ? (
          displayedValues.map((item) => {
            const valStr = String(item.value);
            const isChecked = tempSelected.includes(valStr);

            return (
              <label
                key={valStr}
                className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? isFoxconn
                      ? 'bg-blue-50/70 text-[#002766]'
                      : 'bg-zinc-800 text-[#76B900]'
                    : isFoxconn
                    ? 'hover:bg-slate-100 text-slate-700'
                    : 'hover:bg-zinc-800/60 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleValue(valStr)}
                    className="rounded text-blue-600 focus:ring-0 cursor-pointer shrink-0"
                  />
                  <span className="truncate font-medium">{valStr}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 shrink-0">
                  ({item.count})
                </span>
              </label>
            );
          })
        ) : (
          <div className="text-center py-4 text-xs text-slate-400 dark:text-zinc-500">
            Không tìm thấy giá trị
          </div>
        )}
      </div>

      {/* Quick Sort Section */}
      <div className="pt-2 mb-3 border-t border-slate-100 dark:border-zinc-800 grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => onSort(column.id, 'asc')}
          className={`px-2 py-1.5 rounded-lg text-[11px] font-bold border transition-colors flex items-center justify-center gap-1 cursor-pointer ${
            isCurrentSortAsc
              ? isFoxconn
                ? 'bg-blue-100 text-[#002766] border-blue-300'
                : 'bg-zinc-800 text-[#76B900] border-[#76B900]/60'
              : isFoxconn
              ? 'hover:bg-slate-100 text-slate-600 border-slate-200'
              : 'hover:bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          <span>A ➔ Z</span>
          {isCurrentSortAsc && <span>✓</span>}
        </button>

        <button
          type="button"
          onClick={() => onSort(column.id, 'desc')}
          className={`px-2 py-1.5 rounded-lg text-[11px] font-bold border transition-colors flex items-center justify-center gap-1 cursor-pointer ${
            isCurrentSortDesc
              ? isFoxconn
                ? 'bg-blue-100 text-[#002766] border-blue-300'
                : 'bg-zinc-800 text-[#76B900] border-[#76B900]/60'
              : isFoxconn
              ? 'hover:bg-slate-100 text-slate-600 border-slate-200'
              : 'hover:bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}
        >
          <span>Z ➔ A</span>
          {isCurrentSortDesc && <span>✓</span>}
        </button>
      </div>

      {/* Popover Actions Footer */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={handleResetThisColumn}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 cursor-pointer"
        >
          Bỏ lọc cột
        </button>

        <button
          type="button"
          onClick={handleApply}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-[#003893] text-white'
              : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
          }`}
        >
          Áp dụng {tempSelected.length > 0 ? `(${tempSelected.length})` : ''}
        </button>
      </div>
    </div>
  );
}

