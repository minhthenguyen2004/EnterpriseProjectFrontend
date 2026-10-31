import useTheme from '../../../../../hooks/useTheme';
import { PAGE_SIZE_OPTIONS } from '../../constants/machineConfigConstants';

export default function MachineConfigPagination({
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  totalItems = 0,
  startIndex = 0,
  endIndex = 0,
  onPageChange,
  onPageSizeChange
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Generate pagination numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
      isFoxconn
        ? 'bg-white border-slate-200/80 shadow-xs'
        : 'bg-zinc-900/80 border-zinc-800 shadow-md backdrop-blur-md'
    }`}>
      {/* Left: Records summary & Page size selector */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className={`text-xs font-semibold ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>
          {totalItems === 0 ? (
            <span>Không có bản ghi nào</span>
          ) : (
            <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-400'}>
              Hiển thị <strong className={`font-bold ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>{startIndex}</strong> - <strong className={`font-bold ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>{endIndex}</strong> trong tổng số <strong className={`font-bold ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>{totalItems}</strong> bản ghi
            </span>
          )}
        </div>

        {/* Page size dropdown */}
        <div className="flex items-center gap-2">
          <label className={`text-xs font-medium ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>
            Số dòng/trang:
          </label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(e.target.value)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold outline-none border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            {PAGE_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>
                {size} / trang
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Pagination Navigation Controls */}
      <div className="flex items-center gap-1 self-center sm:self-auto">
        {/* First Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || totalItems === 0}
          title="Về trang đầu tiên"
          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-30 ${
            isFoxconn
              ? 'hover:bg-slate-100 text-slate-700 border-slate-200'
              : 'hover:bg-zinc-800 text-zinc-300 border-zinc-800'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Previous Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalItems === 0}
          title="Trang trước"
          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-30 ${
            isFoxconn
              ? 'hover:bg-slate-100 text-slate-700 border-slate-200'
              : 'hover:bg-zinc-800 text-zinc-300 border-zinc-800'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1 mx-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-xs text-slate-400 dark:text-zinc-600 font-bold select-none"
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
                className={`min-w-8.5 h-8.5 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? isFoxconn
                      ? 'bg-[#002766] text-white shadow-xs'
                      : 'bg-[#76B900] text-black font-black shadow-[0_0_10px_rgba(118,185,0,0.3)]'
                    : isFoxconn
                      ? 'hover:bg-slate-100 text-slate-700'
                      : 'hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || totalItems === 0}
          title="Trang sau"
          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-30 ${
            isFoxconn
              ? 'hover:bg-slate-100 text-slate-700 border-slate-200'
              : 'hover:bg-zinc-800 text-zinc-300 border-zinc-800'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Last Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages || totalItems === 0}
          title="Về trang cuối cùng"
          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-30 ${
            isFoxconn
              ? 'hover:bg-slate-100 text-slate-700 border-slate-200'
              : 'hover:bg-zinc-800 text-zinc-300 border-zinc-800'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
