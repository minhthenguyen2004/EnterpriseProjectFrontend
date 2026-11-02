import useTheme from '../../../../../../hooks/useTheme';

/**
 * Thanh công cụ tìm kiếm và lọc dữ liệu khay chứa (Dòng 2 Tab Giám Sát Thời Gian Thực)
 * 1. Text search: Mã khay (Carrier code / RFID)
 * 2. Text search: Tên chuyền (Line name / Station)
 * 3. Text search: Tên sản phẩm (Product name)
 * 4. Dropdown menu: Trạng thái (ALL, ACTIVE, WARNING, INSPECTION_REQUIRED, LOCKED)
 * 5. Dropdown/Nút chọn: Số lượng bản ghi trên trang (Pagination size: 10, 20, 50, 100)
 * 6. Nút Đặt lại bộ lọc (Reset filters)
 */
export default function CarrierFilterToolbar({
  searchCarrierCode,
  onCarrierCodeChange,
  searchLineName,
  onLineNameChange,
  searchProductName,
  onProductNameChange,
  selectedStatus,
  onStatusChange,
  pageSize,
  onPageSizeChange,
  onResetFilters,
  totalFiltered,
  totalAll,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isFiltered =
    Boolean(searchCarrierCode.trim()) ||
    Boolean(searchLineName.trim()) ||
    Boolean(searchProductName.trim()) ||
    selectedStatus !== 'ALL';

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800'
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Ô 1: Tìm kiếm theo mã khay (Carrier Code) */}
        <div className="lg:col-span-3 relative">
          <label className={`block text-[10px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'} font-bold uppercase tracking-wider mb-1`}>
            Mã khay / RFID
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchCarrierCode}
              onChange={(e) => onCarrierCodeChange(e.target.value)}
              placeholder="VD: CRR-A089, TRAY-01..."
              className={`w-full pl-9 pr-7 py-2 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:ring-1 focus:ring-[#76B900]'
              }`}
            />
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchCarrierCode && (
              <button
                type="button"
                onClick={() => onCarrierCodeChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Ô 2: Tìm kiếm theo tên chuyền (Line Name) */}
        <div className="lg:col-span-2 relative">
          <label className={`block text-[10px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'} font-bold uppercase tracking-wider mb-1`}>
            Tên chuyền
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchLineName}
              onChange={(e) => onLineNameChange(e.target.value)}
              placeholder="VD: Line01, Line02..."
              className={`w-full pl-8 pr-7 py-2 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:ring-1 focus:ring-[#76B900]'
              }`}
            />
            <svg
              className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {searchLineName && (
              <button
                type="button"
                onClick={() => onLineNameChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Ô 3: Tìm kiếm theo tên sản phẩm (Product Name) */}
        <div className="lg:col-span-2 relative">
          <label className={`block text-[10px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'} font-bold uppercase tracking-wider mb-1`}>
            Tên sản phẩm
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchProductName}
              onChange={(e) => onProductNameChange(e.target.value)}
              placeholder="VD: GB200, B200, H100..."
              className={`w-full pl-8 pr-7 py-2 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                isFoxconn
                  ? 'bg-slate-50 text-slate-800 focus:border-blue-600'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:ring-1 focus:ring-[#76B900]'
              }`}
            />
            <svg
              className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {searchProductName && (
              <button
                type="button"
                onClick={() => onProductNameChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Ô 4: Dropdown lọc theo trạng thái */}
        <div className="lg:col-span-2 relative">
          <label className={`block text-[10px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'} font-bold uppercase tracking-wider mb-1`}>
            Trạng thái khay
          </label>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 rounded-xl text-xs font-semibold border appearance-none focus:outline-none transition-all cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100'
              }`}
            >
              <option value="ALL">Tất cả trạng thái (ALL)</option>
              <option value="ACTIVE">🟢 ACTIVE (Bình thường)</option>
              <option value="WARNING">🟡 WARNING (Sắp đến hạn)</option>
              <option value="INSPECTION_REQUIRED">🟠 INSPECTION (Cần K.định)</option>
              <option value="LOCKED">🔴 LOCKED (Đang bị khóa)</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Ô 5: Nút lọc theo số lượng trang (Page Size Selector) */}
        <div className="lg:col-span-2 relative">
          <label className={`block text-[10px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'} font-bold uppercase tracking-wider mb-1`}>
            Hiển thị / trang
          </label>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={`w-full pl-3 pr-8 py-2 rounded-xl text-xs font-semibold border appearance-none focus:outline-none transition-all cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100'
              }`}
            >
              <option value={10}>10 khay / trang</option>
              <option value={20}>20 khay / trang</option>
              <option value={50}>50 khay / trang</option>
              <option value={100}>100 khay / trang</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Nút Đặt lại bộ lọc (Reset) */}
        <div className="lg:col-span-1 pt-4">
          <button
            type="button"
            onClick={onResetFilters}
            disabled={!isFiltered}
            title="Khôi phục toàn bộ bộ lọc về mặc định"
            className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-all ${
              isFiltered
                ? isFoxconn
                  ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200 cursor-pointer'
                  : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 cursor-pointer'
                : 'opacity-40 cursor-not-allowed border-slate-200 dark:border-zinc-800 text-slate-400'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Dòng tóm tắt trạng thái lọc */}
      {isFiltered && (
        <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-[#76B900] animate-pulse" />
            <span className="text-slate-600 dark:text-zinc-300">
              Đang lọc: Tìm thấy <span className="font-bold text-slate-900 dark:text-white">{totalFiltered}</span> / {totalAll} khay
            </span>
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-blue-600 dark:text-[#76B900] hover:underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
