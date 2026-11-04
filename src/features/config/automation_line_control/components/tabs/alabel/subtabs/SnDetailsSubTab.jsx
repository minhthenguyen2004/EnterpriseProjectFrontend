import { useState } from 'react';
import useTheme from '../../../../../../../hooks/useTheme';

export default function SnDetailsSubTab({
  detailsList,
  isExecuting,
  onRefresh,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [filterTerm, setFilterTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (key, val) => {
    navigator.clipboard?.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const filtered = detailsList.filter(
    (d) =>
      d.key.toLowerCase().includes(filterTerm.toLowerCase()) ||
      d.value.toLowerCase().includes(filterTerm.toLowerCase()) ||
      d.station.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <div className="relative w-full">
            <input
              type="text"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              placeholder="Lọc thuộc tính hoặc giá trị..."
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 focus:bg-white text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
              }`}
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <button
          type="button"
          disabled={isExecuting}
          onClick={onRefresh}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isFoxconn
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
          }`}
        >
          <svg className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Làm Mới</span>
        </button>
      </div>

      <div className={`overflow-x-auto rounded-xl border max-h-56 ${isFoxconn ? 'border-slate-200 bg-white' : 'border-zinc-800 bg-zinc-950/50'}`}>
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className={`border-b font-bold uppercase tracking-wider ${isFoxconn ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-zinc-900/80 text-zinc-400 border-zinc-800'}`}>
              <th className="py-2 px-3">Tên Thuộc Tính</th>
              <th className="py-2 px-3">Giá Trị Ghi Nhận</th>
              <th className="py-2 px-3">Trạm</th>
              <th className="py-2 px-3">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-mono">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-slate-400 dark:text-zinc-500 font-sans text-xs">
                  Không tìm thấy bản ghi chi tiết nào.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className={`${isFoxconn ? 'hover:bg-slate-50' : 'hover:bg-zinc-800/40'}`}>
                  <td className="py-2 px-3 font-semibold text-blue-600 dark:text-[#76B900]">
                    {item.key}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1.5 group">
                      <span className="truncate max-w-[220px]">{item.value}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.key, item.value)}
                        className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                          copiedKey === item.key ? 'text-emerald-500 opacity-100' : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200'
                        }`}
                        title="Sao chép giá trị"
                      >
                        {copiedKey === item.key ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-slate-500 dark:text-zinc-400">
                    {item.station}
                  </td>
                  <td className="py-2 px-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
