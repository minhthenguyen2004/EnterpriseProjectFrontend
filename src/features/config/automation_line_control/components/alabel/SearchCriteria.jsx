function SearchCriteria({ isFoxconn, setSearchType, searchType }) {
    return(
        <div>
          <label className={`block text-xs font-bold mb-2 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
            Tiêu Chí Tra Cứu (Chọn 1 trong 3)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'sn', label: 'Serial Number', icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' },
              { id: 'carrier', label: 'Mã Carrier RFID', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { id: 'keypart', label: 'Mã Keypart Barcode', icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M4 8h16' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSearchType(mode.id)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  searchType === mode.id
                    ? isFoxconn
                      ? 'bg-[#002766] text-white border-[#002766] shadow-sm shadow-blue-900/20'
                      : 'bg-[#76B900] text-black font-extrabold border-[#76B900] shadow-sm shadow-[#76B900]/25'
                    : isFoxconn
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    : 'bg-zinc-950/60 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mode.icon} />
                </svg>
                <span className="truncate">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
    )
}

export default SearchCriteria