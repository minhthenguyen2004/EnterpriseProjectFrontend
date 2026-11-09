import useTheme from '../../../../../hooks/useTheme';

export default function WholeLineScannerTab({
  selectedProductName = 'all',
  onChangeProductName,
  productNameOptions = [],
  selectedProductType = 'all',
  onChangeProductType,
  productTypeOptions = [],
  selectedLine = 'all',
  onChangeLine,
  lineNameOptions = [],
  lineCarriers = [],
  selectedCodes = [],
  onToggleCode,
  onToggleSelectAll
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isAllSelected = lineCarriers.length > 0 && selectedCodes.length === lineCarriers.length;

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      {/* 1. CẢNH BÁO TRÊN CÙNG: Chế độ này sẽ mở khóa Tất Cả các khay khớp với điều kiện bên dưới. Hãy cẩn trọng */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-3 mb-4.5 transition-all ${
          isFoxconn
            ? 'bg-amber-50/90 border-amber-300 text-amber-900 shadow-xs'
            : 'bg-amber-950/40 border-amber-700/80 text-amber-200 shadow-lg'
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 text-base font-bold">
          ⚠️
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
            CẢNH BÁO QUAN TRỌNG
          </h4>
          <p className="text-xs font-bold mt-0.5 leading-relaxed">
            Chế độ này sẽ mở khóa Tất Cả các khay khớp với điều kiện bên dưới. Hãy cẩn trọng.
          </p>
        </div>
      </div>

      {/* 2. BỘ 3 MỤC DROPDOWN MENU: Tên sản phẩm, Loại sản phẩm và Tên line */}
      <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 mb-4.5">
        <span className="text-[11px] font-bold text-black dark:text-zinc-400 uppercase tracking-wider block mb-2.5">
          Điều kiện lọc mở khóa hàng loạt:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Dropdown 1: Tên sản phẩm */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-black dark:text-zinc-300">
              Tên sản phẩm
            </label>
            <div className="relative">
              <select
                value={selectedProductName}
                onChange={(e) => onChangeProductName(e.target.value)}
                className={`w-full px-3 py-2 text-xs font-bold rounded-xl border appearance-none transition-all outline-hidden cursor-pointer ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
                }`}
              >
                <option value="all">Tất cả sản phẩm</option>
                {productNameOptions.map((prod) => (
                  <option key={prod} value={prod}>
                    {prod}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Dropdown 2: Loại sản phẩm */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-black dark:text-zinc-300">
              Loại sản phẩm
            </label>
            <div className="relative">
              <select
                value={selectedProductType}
                onChange={(e) => onChangeProductType(e.target.value)}
                className={`w-full px-3 py-2 text-xs font-bold rounded-xl border appearance-none transition-all outline-hidden cursor-pointer ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
                }`}
              >
                <option value="all">Tất cả loại sản phẩm</option>
                {productTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Dropdown 3: Tên line */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-black dark:text-zinc-300">
              Tên line
            </label>
            <div className="relative">
              <select
                value={selectedLine}
                onChange={(e) => onChangeLine(e.target.value)}
                className={`w-full px-3 py-2 text-xs font-bold rounded-xl border appearance-none transition-all outline-hidden cursor-pointer ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
                }`}
              >
                <option value="all">Tất cả line sản xuất</option>
                {lineNameOptions.map((line) => (
                  <option key={line} value={line}>
                    {line}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Thống Kê & Danh Sách Khay Khớp Điều Kiện */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>
            Khay bị khóa khớp 3 điều kiện:
          </span>
          <span className="font-mono font-bold text-red-500 text-sm">{lineCarriers.length}</span>
        </div>

        {lineCarriers.length > 0 && (
          <button
            type="button"
            onClick={onToggleSelectAll}
            className={`px-3 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
          >
            {isAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả khay'} ({selectedCodes.length}/{lineCarriers.length})
          </button>
        )}
      </div>

      {/* Carriers List */}
      {lineCarriers.length > 0 ? (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {lineCarriers.map((c) => {
            const isSelected = selectedCodes.includes(c.carrierCode);
            return (
              <div
                key={c.carrierCode}
                onClick={() => onToggleCode(c.carrierCode)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? isFoxconn
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                      : 'bg-[#76B900]/10 border-[#76B900]/40 shadow-xs'
                    : isFoxconn
                    ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    : 'bg-zinc-950/60 hover:bg-zinc-800/60 border-zinc-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleCode(c.carrierCode)}
                    className={`w-4 h-4 rounded-sm cursor-pointer ${isSelected ? 'text-primary' : 'text-primary'}`}
                  />
                  <div>
                    <span className={`font-black text-xs ${ isFoxconn ? 'text-black' : 'text-white'}`}>
                      {c.carrierCode}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 ml-2">
                      {c.lineName} • {c.productName} • {c.carrierType}
                    </span>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 truncate max-w-md">
                      Trạm: {c.stationName || 'N/A'} • {c.lockReason}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-red-500">
                    {c.currentCycles} / {c.maxCycles} ({c.usagePercentage}%)
                  </span>
                  <span className="block text-[10px] text-slate-400 dark:text-zinc-500">
                    Dung sai: {c.coplanarityDeviation}mm
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-slate-500 dark:text-zinc-400 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
          🎉 Không tìm thấy khay nào bị khóa khớp với 3 điều kiện lọc đã chọn.
        </div>
      )}
    </div>
  );
}
