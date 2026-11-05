export default function KeypartValueInput({
  isFoxconn,
  selectedKeypart,
  handleKeypartSelect,
  KEYPART_CATEGORIES,
  newKeypartValue,
  handleNewValueChange,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      {/* Cột 1: Chọn Keypart (Dropdown menu) */}
      <div>
        <label
          className={`block font-bold mb-1.5 ${
            isFoxconn ? 'text-slate-700' : 'text-zinc-200'
          } flex items-center gap-1.5`}
        >
          <span>Chọn Keypart (Linh Kiện Cần Thay Thế)</span>
          <span className="text-red-500 font-black">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
              />
            </svg>
          </div>
          <select
            value={selectedKeypart}
            onChange={(e) => handleKeypartSelect(e.target.value)}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
            }`}
          >
            {KEYPART_CATEGORIES.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
              >
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cột 2: Nhập Giá Trị Mới (New Value Input) */}
      <div>
        <label
          className={`block font-bold mb-1.5 ${
            isFoxconn ? 'text-slate-700' : 'text-zinc-200'
          } flex items-center gap-1.5`}
        >
          <span>Giá Trị Mới (New Barcode / Serial Value)</span>
          <span className="text-red-500 font-black">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <input
            type="text"
            value={newKeypartValue}
            onChange={(e) => handleNewValueChange(e.target.value)}
            placeholder="Quét hoặc nhập barcode linh kiện mới (ví dụ: NV-B200-GPU-9920-REV2)..."
            className={`w-full pl-9 pr-8 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                : 'bg-zinc-950/70 border-zinc-700 text-zinc-100 focus:border-[#76B900] focus:ring-2 focus:ring-[#76B900]/20'
            }`}
          />
          {newKeypartValue && (
            <button
              type="button"
              onClick={() => handleNewValueChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
              title="Xóa nhanh giá trị mới"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
