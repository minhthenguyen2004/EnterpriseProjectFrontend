function LanguageSelection({ langRef, setLangDropdownOpen, setLanguage, language, isFoxconn, langDropdownOpen, currentLang, Languages }) {
    return (
        <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-md ${
                isFoxconn
                  ? 'border-white/25 bg-black/40 hover:bg-black/60 text-white'
                  : 'border-black/30 bg-black text-white hover:bg-zinc-900'
              }`}
              aria-label="Chọn ngôn ngữ"
            >
              <span className="hidden sm:inline text-xs font-black tracking-wide">
                {currentLang.short}
              </span>
              {/* Flag */}
              <span className="shrink-0">{currentLang.flag}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180' : ''
                } ${isFoxconn ? 'text-blue-200' : 'text-zinc-300'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-zinc-950 border border-zinc-700 shadow-2xl py-2 z-50 animate-fadeIn">
                {Languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left font-semibold transition-colors cursor-pointer ${
                      language === lang.code
                        ? isFoxconn
                          ? 'bg-blue-600/30 text-blue-300 font-bold'
                          : 'bg-[#76B900]/25 text-[#76B900] font-black'
                        : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {/* Flag */}
                    <span className="shrink-0 ml-2">{lang.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
    )
}

export default LanguageSelection