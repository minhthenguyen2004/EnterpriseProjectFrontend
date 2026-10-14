function OpenSidebarButton({handleToggle, isSidebarOpen, isFoxconn}) {
    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-label={isSidebarOpen ? 'Thu gọn thanh bên trái' : 'Mở thanh bên trái'}
            title={isSidebarOpen ? 'Thu gọn thanh bên trái' : 'Mở thanh bên trái'}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
              isFoxconn
                ? isSidebarOpen
                  ? 'bg-white/25 text-white border border-white/40 ring-2 ring-white/30 active:scale-95'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/25 active:scale-95'
                : isSidebarOpen
                  ? 'bg-black/25 text-slate-950 border border-black/40 ring-2 ring-black/30 active:scale-95'
                  : 'bg-black/10 hover:bg-black/20 text-slate-950 border border-black/20 active:scale-95'
            }`}
          >
            {/* Logo to open sidebar */}
            <svg
              className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-200 ${
                isSidebarOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
    )
}

export default OpenSidebarButton;