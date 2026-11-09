import useTheme from '../../../../../hooks/useTheme';

export default function UnlockCarrierTabsNav({ activeTab, onTabChange }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const tabs = [
    {
      id: 'single',
      label: 'Một khay',
      enLabel: 'Single Carrier',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      badge: 'Phổ biến'
    },
    {
      id: 'line',
      label: 'Toàn line',
      enLabel: 'Whole Line',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
      badge: 'Theo chuyền'
    },
    {
      id: 'batch',
      label: 'Nhiều khay',
      enLabel: 'Multiple Carriers',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      badge: 'Theo lô'
    }
  ];

  return (
    <div
      className={`p-1.5 rounded-2xl border flex items-center gap-1.5 transition-all ${
        isFoxconn
          ? 'bg-slate-100/90 border-slate-200 shadow-inner'
          : 'bg-zinc-900/80 border-zinc-800 shadow-inner'
      }`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer relative ${
              isActive
                ? isFoxconn
                  ? 'bg-white text-[#002766] shadow-md border border-slate-200/80 font-black'
                  : 'bg-zinc-800 text-[#76B900] shadow-[0_0_15px_rgba(118,185,0,0.2)] border border-[#76B900]/40 font-black'
                : isFoxconn
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
            }`}
          >
            <span
              className={
                isActive
                  ? isFoxconn
                    ? 'text-[#002766]'
                    : 'text-[#76B900]'
                  : 'text-slate-400 dark:text-zinc-500'
              }
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            <span className="hidden sm:inline text-[10px] opacity-60">({tab.enLabel})</span>

            {/* Sub badge */}
            <span
              className={`hidden md:inline text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                isActive
                  ? isFoxconn
                    ? 'bg-blue-100 text-[#002766]'
                    : 'bg-[#76B900]/20 text-[#76B900]'
                  : isFoxconn
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              {tab.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}

