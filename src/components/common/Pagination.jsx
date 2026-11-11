import React, { useMemo } from 'react';
import useTheme from '../../hooks/useTheme';

/**
 * Common Reusable Pagination Component (Thành phần phân trang dùng chung cho toàn dự án)
 * Hỗ trợ Dual-theme (Foxconn Navy vs NVIDIA Neon), Responsive, Page Size Selector, và Ellipsis thông minh.
 */
export default function Pagination({
  currentPage = 1,
  totalPages,
  pageSize = 10,
  totalRecords,
  totalItems,
  totalCount,
  totalFiltered,
  startIndex,
  endIndex,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
  showPageSize = true,
  showJumpToFirstLast = true,
  className = '',
  recordLabel = 'bản ghi',
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Normalize total records count from various supported alias prop names
  const total = useMemo(() => {
    if (typeof totalRecords === 'number') return totalRecords;
    if (typeof totalCount === 'number') return totalCount;
    if (typeof totalItems === 'number') return totalItems;
    if (typeof totalFiltered === 'number') return totalFiltered;
    return 0;
  }, [totalRecords, totalCount, totalItems, totalFiltered]);

  // Normalize calculated total pages
  const calculatedTotalPages = useMemo(() => {
    if (typeof totalPages === 'number' && totalPages > 0) return totalPages;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [totalPages, total, pageSize]);

  // Calculate start & end record display numbers
  const displayStart = useMemo(() => {
    if (total === 0) return 0;
    if (typeof startIndex === 'number') return startIndex + 1;
    return (currentPage - 1) * pageSize + 1;
  }, [total, startIndex, currentPage, pageSize]);

  const displayEnd = useMemo(() => {
    if (total === 0) return 0;
    if (typeof endIndex === 'number') return endIndex;
    return Math.min(currentPage * pageSize, total);
  }, [total, endIndex, currentPage, pageSize]);

  // If there are no records, do not render pagination
  if (total === 0) return null;

  // Generate page numbers array with intelligent ellipsis
  const pageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (calculatedTotalPages <= maxVisible + 2) {
      for (let i = 1; i <= calculatedTotalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(calculatedTotalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= calculatedTotalPages - 2) {
        start = calculatedTotalPages - 3;
        end = calculatedTotalPages - 1;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < calculatedTotalPages - 1) {
        pages.push('...');
      }

      pages.push(calculatedTotalPages);
    }

    return pages;
  };

  const pages = pageNumbers();

  const handlePageClick = (page) => {
    if (typeof page !== 'number') return;
    if (page < 1 || page > calculatedTotalPages || page === currentPage) return;
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
    if (onPageChange) {
      onPageChange(1);
    }
  };

  return (
    <div
      className={`p-3.5 sm:px-5 rounded-xl border mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 text-slate-700 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 shadow-xl backdrop-blur-md'
      } ${className}`}
    >
      {/* Khối bên trái: Thống kê số lượng bản ghi & chọn số dòng/trang */}
      <div className="flex flex-wrap items-center gap-3 font-medium">
        <div>
          Hiển thị{' '}
          <strong
            className={`font-mono font-bold ${
              isFoxconn ? 'text-slate-900' : 'text-zinc-100'
            }`}
          >
            {displayStart} - {displayEnd}
          </strong>{' '}
          trong tổng số{' '}
          <strong
            className={`font-mono font-bold ${
              isFoxconn ? 'text-blue-900' : 'text-[#76B900]'
            }`}
          >
            {total}
          </strong>{' '}
          {recordLabel}
        </div>

        {/* Dropdown chọn Page Size (nếu bật và có callback) */}
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200 dark:border-zinc-700">
            <span className="text-[11px] text-slate-400 dark:text-zinc-500">
              Số dòng:
            </span>
            <select
              value={pageSize}
              onChange={handleSizeChange}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border outline-hidden cursor-pointer transition-colors ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / trang
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Khối bên phải: Các nút điều hướng phân trang */}
      <div className="flex items-center gap-1 sm:gap-1.5 select-none">
        {/* Nút về trang đầu tiên */}
        {showJumpToFirstLast && (
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => handlePageClick(1)}
            title="Trang đầu tiên"
            className={`p-1.5 px-2 rounded-lg font-bold border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isFoxconn
                ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Nút Trang trước */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => handlePageClick(currentPage - 1)}
          title="Trang trước"
          className={`px-2.5 py-1 rounded-lg font-semibold border transition-all cursor-pointer flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed ${
            isFoxconn
              ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Trước</span>
        </button>

        {/* Danh sách các số trang kèm dấu ... thông minh */}
        <div className="flex items-center gap-1 mx-0.5">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-6 text-center text-slate-400 font-bold select-none"
                >
                  ...
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => handlePageClick(p)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? isFoxconn
                      ? 'bg-[#002766] text-white shadow-xs'
                      : 'bg-[#76B900] text-black font-extrabold shadow-[0_0_10px_rgba(118,185,0,0.3)]'
                    : isFoxconn
                    ? 'hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-700'
                    : 'hover:bg-zinc-800 border border-transparent hover:border-zinc-700 text-zinc-300'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Nút Trang sau */}
        <button
          type="button"
          disabled={currentPage >= calculatedTotalPages}
          onClick={() => handlePageClick(currentPage + 1)}
          title="Trang sau"
          className={`px-2.5 py-1 rounded-lg font-semibold border transition-all cursor-pointer flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed ${
            isFoxconn
              ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
          }`}
        >
          <span className="hidden sm:inline">Sau</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Nút đến trang cuối cùng */}
        {showJumpToFirstLast && (
          <button
            type="button"
            disabled={currentPage >= calculatedTotalPages}
            onClick={() => handlePageClick(calculatedTotalPages)}
            title="Trang cuối cùng"
            className={`p-1.5 px-2 rounded-lg font-bold border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isFoxconn
                ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

