export default function ErrorFilterDropdowns({
  isFoxconn,
  model,
  onModelChange,
  DB_ACTIVE_MODELS,
  productType,
  onProductTypeChange,
  PRODUCT_TYPES,
  line,
  onLineChange,
  PRODUCTION_LINES,
  errorSource,
  onErrorSourceChange,
  ERROR_SOURCES,
  stage,
  onStageChange,
  PROCESS_STAGES,
  station,
  onStationChange,
  STATIONS_LIST,
  topLimit,
  onTopLimitChange,
}) {
  const limitOptions = [
    { value: 50, label: '50 bản ghi (Nhanh)' },
    { value: 100, label: '100 bản ghi (Khuyến nghị)' },
    { value: 200, label: '200 bản ghi' },
    { value: 500, label: '500 bản ghi' },
    { value: 1000, label: '1000 bản ghi (Tối đa)' },
  ];

  return (
    <div className="space-y-3">
      {/* Hàng 1: Dòng SP, Loại SP, Tên chuyền, Nguồn lỗi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. Dòng sản phẩm */}
        <div>
          <label className={`block font-bold mb-1 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            Dòng Sản Phẩm (Model)
          </label>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-bold">
              -- Tất Cả Dòng SP --
            </option>
            {DB_ACTIVE_MODELS.map((m) => (
              <option key={m.id} value={m.id} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Loại sản phẩm */}
        <div>
          <label className={`block font-bold mb-1 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            Loại Sản Phẩm (Type)
          </label>
          <select
            value={productType}
            onChange={(e) => onProductTypeChange(e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-bold">
              -- Tất Cả Loại SP --
            </option>
            {PRODUCT_TYPES.map((pt) => (
              <option key={pt.id} value={pt.id} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                {pt.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Tên chuyền */}
        <div>
          <label className={`block font-bold mb-1 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            Tên Dây Chuyền (Line)
          </label>
          <select
            value={line}
            onChange={(e) => onLineChange(e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-bold">
              -- Tất Cả Dây Chuyền --
            </option>
            {PRODUCTION_LINES.map((pl) => (
              <option key={pl.id} value={pl.id} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                {pl.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Nguồn lỗi */}
        <div>
          <label className={`block font-bold mb-1 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            Nguồn Lỗi (Source)
          </label>
          <select
            value={errorSource}
            onChange={(e) => onErrorSourceChange(e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-bold">
              -- Tất Cả Nguồn Lỗi --
            </option>
            {ERROR_SOURCES.map((es) => (
              <option key={es.id} value={es.id} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                {es.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hàng 2: Giai đoạn, Trạm, Giới hạn bản ghi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* 5. Giai đoạn */}
        <div>
          <label className={`block font-bold mb-1 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            Giai Đoạn Quy Trình (Stage)
          </label>
          <select
            value={stage}
            onChange={(e) => onStageChange(e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-bold">
              -- Tất Cả Giai Đoạn --
            </option>
            {PROCESS_STAGES.map((stg) => (
              <option key={stg.id} value={stg.id} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                {stg.name}
              </option>
            ))}
          </select>
        </div>

        {/* 6. Trạm */}
        <div>
          <label className={`block font-bold mb-1 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            Trạm Công Đoạn (Station)
          </label>
          <select
            value={station}
            onChange={(e) => onStationChange(e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-bold">
              -- Tất Cả Các Trạm --
            </option>
            {STATIONS_LIST.map((stn) => (
              <option key={stn.id} value={stn.id} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                {stn.name}
              </option>
            ))}
          </select>
        </div>

        {/* 7. Giới hạn bản ghi */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className={`font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
              Giới Hạn Bản Ghi (Top Limit)
            </label>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 font-bold">
              LIMIT: {topLimit}
            </span>
          </div>
          <select
            value={topLimit}
            onChange={(e) => onTopLimitChange(Number(e.target.value))}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            {limitOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
