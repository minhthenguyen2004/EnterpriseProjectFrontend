function ActionButton({isExecutingAction, onExecuteGetAccessToken, isFoxconn, accessToken, onExecuteInsertSN, isAdapter, onExecuteCheckSN, onExecuteCheckKeyparts}) {
    return(
      <div className="flex flex-col gap-2.5">
        {/* NÚT MỚI ĐẶC THÙ CHO ADAPTER: ADAPTER_GetAccessTokenSFC */}
        {isAdapter && (
          <button
            type="button"
            disabled={Boolean(isExecutingAction)}
            onClick={onExecuteGetAccessToken}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all duration-200 cursor-pointer select-none shadow-sm active:scale-98 disabled:opacity-50 ${
              accessToken
                ? isFoxconn
                  ? 'bg-violet-700 hover:bg-violet-800 text-white shadow-violet-900/20'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-amber-500/50 hover:border-amber-400'
                : isFoxconn
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/20'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
            }`}
          >
            <div className="flex items-center gap-2">
              {isExecutingAction === 'ADAPTER_GetAccessTokenSFC' ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )}
              <span className="font-mono text-xs">ADAPTER_GetAccessTokenSFC</span>
            </div>
            <span className="text-[10px] opacity-75 font-mono">AUTH</span>
          </button>
        )}

        {/* Nút 1: Insert Serial Number */}
        <button
          type="button"
          disabled={Boolean(isExecutingAction)}
          onClick={onExecuteInsertSN}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all duration-200 cursor-pointer select-none shadow-sm active:scale-98 disabled:opacity-50 ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
              : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-[#76B900]'
          }`}
        >
          <div className="flex items-center gap-2">
            {isExecutingAction?.includes('InsertSerialNumber') ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-blue-400 dark:text-[#76B900]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-mono text-xs">
              {isAdapter ? 'ADAPTER_InsertSerialNumberSFC' : 'SWITCH_InsertSerialNumberSFC'}
            </span>
          </div>
          <span className="text-[10px] opacity-75 font-mono">POST</span>
        </button>

        {/* Nút 2: Check Serial Number */}
        <button
          type="button"
          disabled={Boolean(isExecutingAction)}
          onClick={onExecuteCheckSN}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all duration-200 cursor-pointer select-none shadow-sm active:scale-98 disabled:opacity-50 ${
            isFoxconn
              ? 'bg-indigo-700 hover:bg-indigo-800 text-white shadow-indigo-900/20'
              : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-cyan-400'
          }`}
        >
          <div className="flex items-center gap-2">
            {isExecutingAction?.includes('CheckSerialNumber') ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-indigo-400 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
            <span className="font-mono text-xs">
              {isAdapter ? 'ADAPTER_CheckSerialNumberSFC' : 'SWITCH_CheckSerialNumberSFC'}
            </span>
          </div>
          <span className="text-[10px] opacity-75 font-mono">CHECK</span>
        </button>

        {/* Nút 3: Check Keyparts */}
        <button
          type="button"
          disabled={Boolean(isExecutingAction)}
          onClick={onExecuteCheckKeyparts}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all duration-200 cursor-pointer select-none shadow-sm active:scale-98 disabled:opacity-50 ${
            isFoxconn
              ? 'bg-cyan-700 hover:bg-cyan-800 text-white shadow-cyan-900/20'
              : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center gap-2">
            {isExecutingAction?.includes('CheckKeyParts') ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-cyan-300 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            )}
            <span className="font-mono text-xs">
              {isAdapter ? 'ADAPTER_CheckKeyPartsSFC(0)' : 'SWITCH_CheckKeyPartsSFC(0)'}
            </span>
          </div>
          <span className="text-[10px] opacity-75 font-mono">BOM</span>
        </button>
      </div>
    )
}

export default ActionButton