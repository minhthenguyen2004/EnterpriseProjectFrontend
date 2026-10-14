function Avatar({currentUser, isFoxconn, setUserDropdownOpen}) {
    return (
        <button
                type="button"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2.5 pl-2.5 pr-1.5 py-1 rounded-full transition-colors cursor-pointer select-none ${
                  isFoxconn
                    ? 'hover:bg-white/10'
                    : 'hover:bg-black/10'
                }`}
              >
                {/* Username on the left - Easy to read on both backgrounds */}
                <div className="text-right hidden sm:flex flex-col">
                  <span
                    className={`text-xs font-black leading-tight ${
                      isFoxconn ? 'text-white' : 'text-black'
                    }`}
                  >
                    {currentUser.name || 'Người dùng'}
                  </span>
                  <span
                    className={`text-[10px] font-semibold leading-tight ${
                      isFoxconn ? 'text-blue-200' : 'text-slate-800'
                    }`}
                  >
                    {currentUser.cardId ? `Card: ${currentUser.cardId}` : (currentUser.roles?.[0] || 'Station Operator')}
                  </span>
                </div>

                {/* Avatar circle */}
                <div
                  className={`w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border-2 transition-transform duration-200 hover:scale-105 shadow-md ${
                    isFoxconn
                      ? 'border-white bg-blue-950 text-white'
                      : 'border-black bg-black text-[#76B900]'
                  }`}
                >
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-xs">
                      {(currentUser.name || currentUser.cardId || 'OP').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </button>
    )
}

export default Avatar