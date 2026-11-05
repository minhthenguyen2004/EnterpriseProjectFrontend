export default function ModelTopLimitSelect({
  isFoxconn,
  currentModel,
  handleModelChange,
  DB_ACTIVE_MODELS,
  currentTopLimit,
  handleTopLimitChange,
}) {
  const limitOptions = [
    { value: 50, label: '50 bản ghi (Truy vấn nhanh)' },
    { value: 100, label: '100 bản ghi (Khuyến nghị mặc định)' },
    { value: 200, label: '200 bản ghi' },
    { value: 500, label: '500 bản ghi' },
    { value: 1000, label: '1000 bản ghi (Tối đa lịch sử)' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      {/* Cột 1: Dòng sản phẩm (Dropdown menu - Tùy chọn) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={`font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            Dòng Sản Phẩm (Model - Tùy chọn)
          </label>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
            OPTIONAL
          </span>
        </div>
        <select
          value={currentModel}
          onChange={(e) => handleModelChange(e.target.value)}
          className={`w-full px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            isFoxconn
              ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
              : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
          }`}
        >
          <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-bold">
            -- Tất Cả Dòng Sản Phẩm (Mặc Định) --
          </option>
          {DB_ACTIVE_MODELS.map((m) => (
            <option
              key={m.id}
              value={m.id}
              className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
            >
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cột 2: Giới hạn bản ghi (Top Limit Dropdown) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={`font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'} flex items-center gap-1`}>
            <span>Giới Hạn Bản Ghi (Top Limit)</span>
            <span className="text-red-500 font-black">*</span>
          </label>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 font-mono">
            LIMIT: {currentTopLimit}
          </span>
        </div>
        <select
          value={currentTopLimit}
          onChange={(e) => handleTopLimitChange(Number(e.target.value))}
          className={`w-full px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            isFoxconn
              ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
              : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
          }`}
        >
          {limitOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
