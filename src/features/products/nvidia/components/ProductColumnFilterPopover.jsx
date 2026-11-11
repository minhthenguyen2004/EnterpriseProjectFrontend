import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useTheme from '../../../../hooks/useTheme';

export default function ProductColumnFilterPopover({
  title,
  field,
  options = [],
  selectedValues = [],
  onToggleValue,
  onSelectAll,
  onClearFilter,
  sortConfig,
  onSort,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  // Calculate coordinates relative to viewport
  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const popoverWidth = 288; // w-72 = 18rem = 288px
    const popoverEstimatedHeight = 360;

    // Horizontal positioning: align with button left, but keep inside viewport
    let left = rect.left;
    if (left + popoverWidth > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - popoverWidth - 12);
    }
    if (left < 12) {
      left = 12;
    }

    // Vertical positioning: show below button if fits, otherwise flip above
    let top = rect.bottom + 6;
    if (top + popoverEstimatedHeight > window.innerHeight - 12) {
      // If flipping above has enough space, place above
      if (rect.top - popoverEstimatedHeight - 6 > 12) {
        top = rect.top - popoverEstimatedHeight - 6;
      } else {
        // Otherwise clamp inside viewport
        top = Math.max(12, window.innerHeight - popoverEstimatedHeight - 12);
      }
    }

    setCoords({ top, left });
  }, []);

  const handleToggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        // Update position right when opening
        requestAnimationFrame(updatePosition);
      }
      return next;
    });
  };

  // Recalculate on window scroll or resize
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen, updatePosition]);

  // Close on click outside (checks both button and portal popover)
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Filtered options based on internal search
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase();
    return options.filter((opt) => opt.value.toLowerCase().includes(term));
  }, [options, searchTerm]);

  const isFiltered = selectedValues && selectedValues.length > 0;
  const isSorted = sortConfig && sortConfig.field === field;

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button inside Table Header */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggleOpen}
        className={`group inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none ${
          isFiltered || isSorted
            ? isFoxconn
              ? 'bg-blue-100/90 text-blue-900 border border-blue-300'
              : 'bg-[#76B900]/25 text-[#76B900] border border-[#76B900]/50'
            : isFoxconn
            ? 'hover:bg-slate-200/70 text-slate-700'
            : 'hover:bg-zinc-800 text-zinc-300'
        }`}
      >
        <span>{title}</span>

        {/* Filter Indicator / Badge */}
        {isFiltered ? (
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              isFoxconn
                ? 'bg-blue-600 text-white'
                : 'bg-[#76B900] text-black font-black'
            }`}
          >
            {selectedValues.length}
          </span>
        ) : (
          <svg
            className={`w-3.5 h-3.5 transition-colors ${
              isFoxconn
                ? 'text-slate-400 group-hover:text-slate-700'
                : 'text-zinc-500 group-hover:text-zinc-300'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        )}

        {/* Sort indicator icon */}
        {isSorted && (
          <span className="font-mono text-[11px] font-bold">
            {sortConfig.direction === 'asc' ? '▲' : '▼'}
          </span>
        )}
      </button>

      {/* Popover Dropdown Panel Rendered via Portal to Document Body */}
      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              zIndex: 9999,
              width: '288px',
            }}
            className={`rounded-2xl shadow-2xl border p-3.5 animate-in fade-in zoom-in-95 duration-100 ${
              isFoxconn
                ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/80'
                : 'bg-zinc-900 border-zinc-700 text-zinc-100 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl'
            }`}
          >
            {/* Header Popover with Quick Sort Buttons */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-inherit">
              <span className="text-xs font-bold uppercase tracking-wider">
                Lọc theo {title}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Sắp xếp tăng dần A-Z"
                  onClick={() => onSort(field, 'asc')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-all border cursor-pointer ${
                    isSorted && sortConfig.direction === 'asc'
                      ? isFoxconn
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-[#76B900] text-black border-[#76B900]'
                      : isFoxconn
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  A → Z
                </button>
                <button
                  type="button"
                  title="Sắp xếp giảm dần Z-A"
                  onClick={() => onSort(field, 'desc')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-all border cursor-pointer ${
                    isSorted && sortConfig.direction === 'desc'
                      ? isFoxconn
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-[#76B900] text-black border-[#76B900]'
                      : isFoxconn
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  Z → A
                </button>
              </div>
            </div>

            {/* Quick Search inside popover */}
            <div className="relative mb-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Tìm nhanh ${title.toLowerCase()}...`}
                className={`w-full pl-7 pr-2 py-1.5 text-xs rounded-lg border transition-colors outline-hidden ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500 focus:bg-white'
                    : 'bg-zinc-800/80 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                }`}
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400"
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
            </div>

            {/* Select all / Deselect all quick links */}
            <div className="flex items-center justify-between text-[11px] mb-2 px-1 text-slate-500">
              <button
                type="button"
                onClick={() => onSelectAll(field, options.map((o) => o.value))}
                className={`hover:underline cursor-pointer font-medium ${
                  isFoxconn ? 'text-blue-600' : 'text-[#76B900]'
                }`}
              >
                Chọn tất cả ({options.length})
              </button>
              <button
                type="button"
                onClick={() => onClearFilter(field)}
                className="hover:underline cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                Bỏ chọn tất cả
              </button>
            </div>

            {/* Checkboxes scroll list */}
            <div
              className={`max-h-48 overflow-y-auto space-y-1 p-1 rounded-lg border text-xs ${
                isFoxconn
                  ? 'bg-slate-50/50 border-slate-200 divide-y divide-slate-100'
                  : 'bg-zinc-950/40 border-zinc-800 divide-y divide-zinc-800/60'
              }`}
            >
              {filteredOptions.length === 0 ? (
                <div className="text-center py-4 text-xs opacity-60">
                  Không tìm thấy dữ liệu
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const checked = selectedValues.includes(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                        checked
                          ? isFoxconn
                            ? 'bg-blue-50/80 font-semibold text-blue-900'
                            : 'bg-[#76B900]/15 font-semibold text-[#76B900]'
                          : isFoxconn
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggleValue(field, opt.value)}
                          className={`rounded cursor-pointer ${
                            isFoxconn ? 'text-blue-600' : 'accent-[#76B900]'
                          }`}
                        />
                        <span className="truncate">{opt.value}</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono shrink-0 ${
                          isFoxconn
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {opt.count}
                      </span>
                    </label>
                  );
                })
              )}
            </div>

            {/* Footer Popover Actions */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-inherit">
              <button
                type="button"
                onClick={() => {
                  onClearFilter(field);
                  setSearchTerm('');
                }}
                disabled={!isFiltered}
                className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  !isFiltered
                    ? 'opacity-40 cursor-not-allowed text-slate-400'
                    : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 font-medium'
                }`}
              >
                Xóa lọc
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-xs cursor-pointer ${
                  isFoxconn
                    ? 'bg-[#002766] hover:bg-[#003893] text-white'
                    : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
                }`}
              >
                Đóng
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
