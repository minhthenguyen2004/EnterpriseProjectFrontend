import { Link } from "react-router-dom"

function AvatarDropdownMenu({currentUser, isFoxconn, handleLogout, setUserDropdownOpen}) {
    return (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-950 border border-zinc-700 shadow-2xl py-2 z-50 animate-fadeIn">
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-3">
            {/* Avatar bên trái */}
            <div
                className={`w-11 h-11 rounded-full overflow-hidden shrink-0 flex items-center justify-center border-2 ${
                isFoxconn
                    ? 'border-blue-500 bg-blue-950 text-white'
                    : 'border-[#76B900] bg-black text-[#76B900]'
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

            {/* Thông tin profile bên phải */}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentUser.name || 'Người dùng'}</p>
                <p className="text-[11px] text-zinc-300 font-bold mt-0.5 truncate">
                {currentUser.cardId ? `Mã thẻ: ${currentUser.cardId}` : 'ID: N/A'}
                </p>
                {currentUser.roles?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {currentUser.roles.map((role) => (
                    <span key={role} className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                        {role}
                    </span>
                    ))}
                </div>
                )}
            </div>
            </div>

            <Link
            to="/dashboard"
            onClick={() => setUserDropdownOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
            >
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Trang Dashboard</span>
            </Link>

            <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer text-left border-t border-zinc-800/80 mt-1"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Đăng xuất tài khoản</span>
            </button>
    </div>
    )
}

export default AvatarDropdownMenu