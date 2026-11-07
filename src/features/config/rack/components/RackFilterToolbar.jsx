import useTheme from '../../../../hooks/useTheme';

export default function RackFilterToolbar({
  searchTerm,
  onSearchChange,
  onResetFilter,
  onCreateRack,
  totalResults,
  totalAllRecords,
  activeFilterCount = 0
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const hasFilter = activeFilterCount > 0 || (searchTerm && searchTerm.trim() !== '');

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
        {/* Left Side: Search Input with Instant Filtering */}
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm theo rack, slot, ip, factory, room, product..."
            className={`w-full pl-10 pr-9 py-2.5 text-xs font-medium rounded-xl border transition-all outline-hidden ${
              isFoxconn
                ? 'bg-slate-50/80 border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
            }`}
          />

          {/* Quick Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer transition-colors"
              title="Xóa tìm kiếm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Right Side: Actions (Reset Filter + Create Rack Button) */}
        <div className="flex items-center gap-2.5 self-end md:self-auto w-full md:w-auto justify-end">

          {/* Reset Filter Button */}
          <button
            type="button"
            onClick={onResetFilter}
            disabled={!hasFilter}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              hasFilter
                ? isFoxconn
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200 cursor-pointer shadow-xs active:scale-98'
                  : 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border-amber-800/80 cursor-pointer shadow-xs active:scale-98'
                : isFoxconn
                ? 'bg-slate-100 text-slate-400 border-slate-200/80 opacity-60 cursor-not-allowed'
                : 'bg-zinc-800/40 text-zinc-500 border-zinc-700/50 opacity-50 cursor-not-allowed'
            }`}
            title={hasFilter ? 'Đặt lại toàn bộ bộ lọc và sắp xếp' : 'Không có bộ lọc nào đang áp dụng'}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Reset filter</span>
            {activeFilterCount > 0 && (
              <span
                className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isFoxconn
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-amber-500/30 text-amber-200 border border-amber-400/40'
                }`}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Create Rack Button */}
          <button
            type="button"
            onClick={onCreateRack}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20 active:scale-98'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[0_0_15px_rgba(118,185,0,0.3)] active:scale-98'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create rack</span>
          </button>
        </div>
      </div>
    </div>
  );
}

