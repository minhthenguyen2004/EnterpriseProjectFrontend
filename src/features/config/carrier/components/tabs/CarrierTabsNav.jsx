import useTheme from '../../../../../hooks/useTheme';

/**
 * Thanh chuyển đổi 2 Tab chính của phân hệ Carrier Configuration:
 * 1. Giám sát thời gian thực (Real-time Monitoring)
 * 2. Cấu hình vòng đời (Lifecycle Configuration)
 */
export default function CarrierTabsNav({ activeTab, onTabChange, kpiStats }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const tabs = [
    {
      id: 'realtime',
      label: 'Giám sát thời gian thực',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      count: kpiStats?.total || 0,
      alertCount: (kpiStats?.inspection || 0) + (kpiStats?.locked || 0),
    },
    {
      id: 'lifecycle',
      label: 'Cấu hình vòng đời',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      count: null,
      alertCount: 0,
    },
  ];

  return (
    <div
      className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800'
      }`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all cursor-pointer ${
              isActive
                ? isFoxconn
                  ? 'bg-[#002766] text-white shadow-md shadow-blue-900/20'
                  : 'bg-[#76B900] text-black shadow-lg shadow-[#76B900]/25 font-black'
                : isFoxconn
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>

            {/* Badges */}
            {tab.count !== null && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isActive
                    ? isFoxconn
                      ? 'bg-blue-800 text-white'
                      : 'bg-black text-[#76B900]'
                    : isFoxconn
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {tab.count}
              </span>
            )}

            {tab.alertCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Có khay cần chú ý an toàn" />
            )}
          </button>
        );
      })}
    </div>
  );
}
