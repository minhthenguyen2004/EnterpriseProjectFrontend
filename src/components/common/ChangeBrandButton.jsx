function ChangeBrandButton({ isFoxconn, setBrand }) {
    return (
        <div
            className={`flex items-center p-0.5 rounded-xl border transition-colors shadow-md ${isFoxconn
                ? 'bg-black/50 border-white/20'
                : 'bg-black/90 border-black/50'
                }`}
        >
            {/* Button to choose foxconn and nvidia*/}
            <button
              type="button"
              onClick={() => setBrand('foxconn')}
              title="Chuyển sang giao diện Foxconn (Xanh dương & Đỏ)"
              className={`px-3 sm:px-3.5 py-1.5 min-w-19 sm:min-w-21 text-[11px] sm:text-xs font-black rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${isFoxconn
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
              <span className="inline tracking-tight">Foxconn</span>
            </button>

            {/* Button to choose NVIDIA */}
            <button
              type="button"
              onClick={() => setBrand('nvidia')}
              title="Chuyển sang giao diện NVIDIA (Xanh lá)"
              className={`px-3 sm:px-3.5 py-1.5 min-w-19 sm:min-w-21 text-[11px] sm:text-xs font-black rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                !isFoxconn
                  ? 'bg-[#76B900] text-black shadow-md font-black'
                  : 'text-slate-300 hover:text-[#76B900] hover:bg-white/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${!isFoxconn ? 'bg-black' : 'bg-[#76B900]'}`}></span>
              <span className="inline tracking-tight">NVIDIA</span>
            </button>
          </div>
    )
}

export default ChangeBrandButton;