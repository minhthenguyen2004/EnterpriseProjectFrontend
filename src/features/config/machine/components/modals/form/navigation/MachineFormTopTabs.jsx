import { FORM_TABS } from '../constants/formModalConstants';

export default function MachineFormTopTabs({
  activeTab,
  onTabChange,
  isFoxconn
}) {
  return (
    <div className={`border-b ${isFoxconn ? 'border-slate-200' : 'border-zinc-800'} pb-2`}>
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {FORM_TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? isFoxconn
                    ? 'bg-blue-50 text-[#002766] border border-blue-200 shadow-xs'
                    : 'bg-zinc-800 text-[#76B900] border border-[#76B900]/40 shadow-[0_0_12px_rgba(118,185,0,0.2)]'
                  : isFoxconn
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md ${
                  isActive
                    ? isFoxconn
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#76B900] text-black font-black'
                    : isFoxconn
                    ? 'bg-slate-100 text-slate-600 border border-slate-200'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
