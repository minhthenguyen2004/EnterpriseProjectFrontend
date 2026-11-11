import React from 'react';
import useTheme from '../../../../hooks/useTheme';

export default function ProductToolbar({
  onOpenAddModel,
  onOpenImportFile,
  serialSearchInput = '',
  onSerialInputChange,
  onSearchBySN,
  onClearSerialSearch,
  columnFilters,
  onResetFilters,
  totalCount,
  rawTotalCount,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const hasActiveFilters =
    (columnFilters.model && columnFilters.model.length > 0) ||
    (columnFilters.product && columnFilters.product.length > 0);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSearchBySN) {
        onSearchBySN(serialSearchInput);
      }
    }
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all mb-4 ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl backdrop-blur-md'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Phía bên trái trên cùng: 2 nút Add product model & Add/update product model by file */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Nút 1: Add product model */}
          <button
            type="button"
            onClick={onOpenAddModel}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[0_0_15px_rgba(118,185,0,0.3)]'
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.4"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add product model</span>
          </button>

          {/* Nút 2: Add/update product model by file */}
          <button
            type="button"
            onClick={onOpenImportFile}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all shadow-xs active:scale-95 cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Add/update product model by file</span>
          </button>
        </div>

        {/* Phía bên phải trên cùng: Ô text nhập Serial Number và Nút Tìm bằng serial number */}
        <div className="flex flex-wrap items-center gap-2.5 justify-end">
          {/* Ô text nhập hoặc quét Serial Number */}
          <div className="relative flex items-center min-w-[240px] sm:min-w-[280px]">
            <span className="absolute left-3 text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={serialSearchInput}
              onChange={(e) => onSerialInputChange && onSerialInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Quét hoặc nhập Serial Number (SN)..."
              className={`w-full pl-9 pr-8 py-2 text-xs md:text-sm rounded-lg border font-mono transition-colors outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500 focus:bg-white placeholder:text-slate-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900] placeholder:text-zinc-500'
              }`}
            />
            {serialSearchInput && (
              <button
                type="button"
                onClick={onClearSerialSearch}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer p-0.5"
                title="Xóa serial"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Nút Tìm bằng serial number */}
          <button
            type="button"
            onClick={() => onSearchBySN && onSearchBySN(serialSearchInput)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border transition-all active:scale-95 cursor-pointer shadow-xs shrink-0 ${
              isFoxconn
                ? 'bg-blue-50/90 text-[#002766] border-blue-200 hover:bg-blue-100/90'
                : 'bg-[#76B900]/15 text-[#76B900] border-[#76B900]/40 hover:bg-[#76B900]/25'
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
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
            <span>Tìm bằng serial number</span>
          </button>
        </div>
      </div>

      {/* Thanh hiển thị các điều kiện lọc đang có hiệu lực (nếu có) */}
      {hasActiveFilters && (
        <div
          className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
            isFoxconn ? 'border-slate-100 text-slate-600' : 'border-zinc-800 text-zinc-400'
          }`}
        >
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-medium">Đang áp dụng bộ lọc:</span>
            {columnFilters.model.length > 0 && (
              <span
                className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold border ${
                  isFoxconn
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                }`}
              >
                Model ({columnFilters.model.length}): {columnFilters.model.join(', ')}
              </span>
            )}
            {columnFilters.product.length > 0 && (
              <span
                className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold border ${
                  isFoxconn
                    ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    : 'bg-purple-950/60 text-purple-400 border-purple-800'
                }`}
              >
                Product ({columnFilters.product.length}): {columnFilters.product.join(', ')}
              </span>
            )}
            <span className="text-[11px] opacity-75">
              (Hiển thị {totalCount}/{rawTotalCount} bản ghi)
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onClearSerialSearch) onClearSerialSearch();
              if (onResetFilters) onResetFilters();
            }}
            className={`font-semibold hover:underline inline-flex items-center gap-1 text-[11px] cursor-pointer ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
