import useTheme from '../../../../hooks/useTheme';
import { PAGE_SIZE_OPTIONS } from '../constants/rackConfigConstants';

export default function RackPagination({
  currentPage,
  pageSize,
  totalRecords,
  totalPages,
  startIndex,
  endIndex,
  onPageChange,
  onPageSizeChange
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (totalRecords === 0) return null;

  // Generate page numbers array with intelligent ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div
      className={`p-4 sm:px-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs text-slate-700'
          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 shadow-xl'
      }`}
    >
      {/* Left: Record Range Summary & Page Size Selector */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
        <div>
          Hiển thị{' '}
          <strong className={`font-mono font-bold ${ isFoxconn ? "text-black" : "text-emerald-500"}`}>
            {totalRecords > 0 ? startIndex + 1 : 0}
          </strong>{' '}
          -{' '}
          <strong className={`font-mono font-bold ${ isFoxconn ? "text-black" : "text-emerald-500"}`}>
            {endIndex}
          </strong>{' '}
          trong tổng số{' '}
          <strong className={`font-mono font-bold ${ isFoxconn ? "text-black" : "text-emerald-500"}`}>
            {totalRecords}
          </strong>{' '}
          bản ghi
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-zinc-700">
          <span className="text-[11px] text-slate-500 dark:text-zinc-400">Hiển thị:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border outline-hidden cursor-pointer transition-colors ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-zinc-200'
            }`}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} / trang
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Page Navigation Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5 select-none">
        {/* First Page */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          className={`p-1.5 sm:px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer disabled:opacity-35 ${
            isFoxconn
              ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
          }`}
          title="Trang đầu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Prev Page */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 disabled:opacity-35 ${
            isFoxconn
              ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
          }`}
          title="Trang trước"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Trước</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-xs font-mono text-slate-400 dark:text-zinc-500"
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
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? isFoxconn
                      ? 'bg-[#002766] text-white shadow-xs'
                      : 'bg-[#76B900] text-black font-black shadow-[0_0_10px_rgba(118,185,0,0.35)]'
                    : isFoxconn
                    ? 'hover:bg-slate-100 text-slate-700 border border-slate-200'
                    : 'hover:bg-zinc-800 text-zinc-300 border border-zinc-700'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 disabled:opacity-35 ${
            isFoxconn
              ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
          }`}
          title="Trang tiếp"
        >
          <span className="hidden sm:inline">Tiếp</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Last Page */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`p-1.5 sm:px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer disabled:opacity-35 ${
            isFoxconn
              ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'hover:bg-zinc-800 border-zinc-700 text-zinc-300'
          }`}
          title="Trang cuối"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

