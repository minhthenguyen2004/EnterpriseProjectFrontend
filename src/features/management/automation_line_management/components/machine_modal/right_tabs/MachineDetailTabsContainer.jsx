import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';
import KeyPartsTab from './KeyPartsTab';
import AoiDataTab from './AoiDataTab';
import ScrewDataTab from './ScrewDataTab';

export default function MachineDetailTabsContainer({
  keyParts = [],
  aoiData = [],
  screwData = [],
  onSelectAoiItem,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [activeTab, setActiveTab] = useState('keyparts'); // 'keyparts' | 'aoi' | 'screw'

  const tabs = [
    { id: 'keyparts', label: 'Key Parts', count: keyParts.length, icon: '🧩' },
    { id: 'aoi', label: 'AOI Data', count: aoiData.length, icon: '📷' },
    { id: 'screw', label: 'Screw Data', count: screwData.length, icon: '🔩' },
  ];

  return (
    <div
      className={`p-3.5 rounded-2xl border transition-all flex flex-col flex-1 min-h-75 ${
        isFoxconn
          ? 'bg-slate-50/90 border-slate-200 shadow-2xs'
          : 'bg-zinc-900/90 border-zinc-800 text-white shadow-md'
      }`}
    >
      {/* Tab Navigation Header */}
      <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-200 dark:border-zinc-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer relative ${
                isActive
                  ? isFoxconn
                    ? 'bg-[#002766] text-white shadow-sm'
                    : 'bg-[#76B900] text-black font-black shadow-sm'
                  : isFoxconn
                    ? 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800 border border-zinc-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? isFoxconn
                      ? 'bg-blue-800/60 text-white'
                      : 'bg-black/25 text-black'
                    : isFoxconn
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="flex-1">
        {activeTab === 'keyparts' && <KeyPartsTab keyParts={keyParts} />}
        {activeTab === 'aoi' && (
          <AoiDataTab aoiData={aoiData} onSelectAoiItem={onSelectAoiItem} />
        )}
        {activeTab === 'screw' && <ScrewDataTab screwData={screwData} />}
      </div>
    </div>
  );
}
