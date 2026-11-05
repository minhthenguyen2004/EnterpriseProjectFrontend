export default function CriteriaBasedSearchInput({searchQuery, setSearchQuery, handleKeyDown, searchType, isFoxconn, isSearching, onExecuteSearch}) {
    return(
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              searchType === 'sn'
                ? 'Nhập mã SN (VD: SN8839210492-NV)...'
                : searchType === 'carrier'
                ? 'Nhập mã khay RFID (VD: CARRIER-RFID-8819)...'
                : 'Nhập barcode linh kiện (VD: MB-FOX-2026-X0192)...'
            }
            className={`w-full pl-3.5 pr-28 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:ring-1 focus:ring-blue-500 text-slate-800'
                : 'bg-zinc-950/80 border-zinc-700 focus:ring-1 focus:ring-[#76B900] text-zinc-100'
            }`}
          />
          <button
            type="button"
            disabled={isSearching || !searchQuery.trim()}
            onClick={onExecuteSearch}
            className={`absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003a8c] text-white'
                : 'bg-[#76B900] hover:bg-[#86d300] text-black font-extrabold'
            }`}
          >
            {isSearching ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            <span>Tra Cứu</span>
          </button>
        </div>
    )
}