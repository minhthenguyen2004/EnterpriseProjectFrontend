import useTheme from '../../../../hooks/useTheme';

/**
 * Thanh điều hướng 4 Tab của phân hệ Autoline Control:
 * 1. SFC Switch Helpers (Trọng tâm)
 * 2. SFC Adapter Helpers
 * 3. AIOT Helpers
 * 4. Action Logs & Restore
 */
export default function AutolineControlTabsNav({ activeTab, onTabChange }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const tabs = [
    {
      id: 'sfc_switch',
      label: 'SFC Switch Helpers',
      tag: 'CORE',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4l4 4m10 0l-4-4m4 4l-4 4"
          />
        </svg>
      ),
    },
    {
      id: 'sfc_adapter',
      label: 'SFC Adapter Helpers',
      tag: 'ADAPTER',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      id: 'a_label_helpers',
      label: 'ALABEL Helpers',
      tag: 'LABEL/RFID',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      id: 'action_logs',
      label: 'Action Logs & Restore',
      tag: 'HISTORY',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/80 shadow-sm'
          : 'bg-zinc-900/90 border-zinc-800 backdrop-blur-md'
      }`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer select-none active:scale-98 ${
              isActive
                ? isFoxconn
                  ? 'bg-[#002766] text-white shadow-md shadow-blue-900/20'
                  : 'bg-[#76B900] text-black font-extrabold shadow-lg shadow-[#76B900]/25'
                : isFoxconn
                ? 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                : 'bg-zinc-950/40 hover:bg-zinc-800 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200'
            }`}
          >
            <span className={`${isActive ? (isFoxconn ? 'text-white' : 'text-black') : 'text-slate-400 dark:text-zinc-500'}`}>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider font-semibold ${
                isActive
                  ? isFoxconn
                    ? 'bg-blue-800/50 text-blue-100'
                    : 'bg-black/20 text-black'
                  : isFoxconn
                  ? 'bg-slate-200/70 text-slate-500'
                  : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              {tab.tag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
