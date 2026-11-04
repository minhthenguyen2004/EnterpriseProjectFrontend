import useTheme from '../../../../../../hooks/useTheme';

/**
 * Thanh Phân Trang Dưới Bảng Dữ Liệu Khay Chứa (Dòng 4 Tab Giám Sát Thời Gian Thực)
 */
export default function CarrierPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalFiltered,
  pageSize,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (totalFiltered === 0) return null;

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalFiltered);

  // Tạo danh sách số trang hiển thị
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i += 1
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div
      className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800'
      }`}
    >
      {/* Thông tin số lượng bản ghi */}
      <div className={`${ isFoxconn ? "text-slate-600" : " text-white"} font-medium`}>
        Hiển thị <span className={`font-bold ${ isFoxconn ? "text-slate-900" : "text-amber-500"}`}>{startRecord}</span> -{' '}
        <span className={`font-bold ${ isFoxconn ? "text-slate-900" : "text-amber-500"}`}>{endRecord}</span> trong tổng số{' '}
        <span className={`font-bold ${ isFoxconn ? "text-slate-900" : "text-amber-500"}`}>{totalFiltered.toLocaleString('vi-VN')}</span> khay
      </div>

      {/* Điều khiển chuyển trang */}
      <div className="flex items-center gap-1">
        {/* Nút Đầu trang (First) */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-1.5 rounded-lg border transition-all ${
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-zinc-800 text-slate-400'
              : isFoxconn
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 cursor-pointer'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300 cursor-pointer'
          }`}
          title="Trang đầu"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Nút Trang trước (Prev) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-zinc-800 text-slate-400'
              : isFoxconn
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 cursor-pointer'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300 cursor-pointer'
          }`}
          title="Trang trước"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline font-medium text-xs">Trước</span>
        </button>

        {/* Danh sách trang */}
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((num, idx) => {
            if (num === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-400 dark:text-zinc-500 font-bold">
                  ...
                </span>
              );
            }

            const isActive = currentPage === num;
            return (
              <button
                key={`page-${num}`}
                type="button"
                onClick={() => onPageChange(num)}
                className={`min-w-8 h-8 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? isFoxconn
                      ? 'bg-[#002766] text-white shadow-sm'
                      : 'bg-[#76B900] text-black font-black shadow-md shadow-[#76B900]/25'
                    : isFoxconn
                    ? 'hover:bg-slate-100 text-slate-700'
                    : 'hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Nút Trang sau (Next) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1.5 rounded-lg border flex items-center gap-1 transition-all ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-zinc-800 text-slate-400'
              : isFoxconn
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 cursor-pointer'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300 cursor-pointer'
          }`}
          title="Trang sau"
        >
          <span className="hidden sm:inline font-medium text-xs">Sau</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Nút Cuối trang (Last) */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-1.5 rounded-lg border transition-all ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-zinc-800 text-slate-400'
              : isFoxconn
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 cursor-pointer'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300 cursor-pointer'
          }`}
          title="Trang cuối"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
