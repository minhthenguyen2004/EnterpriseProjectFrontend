import { useState, useMemo } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function SerialNumberTable({
  serialNumbers = [],
  selectedSerial,
  onSelectSerial,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return serialNumbers;
    const term = searchTerm.toLowerCase().trim();
    return serialNumbers.filter(
      (item) =>
        item.serialNumber.toLowerCase().includes(term) ||
        item.sequence.toLowerCase().includes(term) ||
        item.errorCode.toLowerCase().includes(term)
    );
  }, [serialNumbers, searchTerm]);

  return (
    <div
      className={`p-3.5 rounded-2xl border transition-all flex flex-col flex-1 min-h-80 ${
        isFoxconn
          ? 'bg-slate-50/90 border-slate-200 shadow-2xs'
          : 'bg-zinc-900/90 border-zinc-800 text-white shadow-md'
      }`}
    >
      {/* Header & Search Input */}
      <div className="pb-2.5 mb-2.5 border-b border-slate-200 dark:border-zinc-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isFoxconn ? 'bg-indigo-600' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
              }`}
            />
            <h4
              className={`text-xs font-black uppercase tracking-wider ${
                isFoxconn ? 'text-slate-700' : 'text-white'
              }`}
            >
              Dữ Liệu Serial Number
            </h4>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isFoxconn ? 'bg-slate-200 text-slate-700' : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            {filteredList.length} / {serialNumbers.length}
          </span>
        </div>

        {/* Ô text input tìm kiếm serial number */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm serial number, sequence, mã lỗi..."
            className={`w-full px-3 py-1.5 pl-8 text-xs rounded-xl border transition-all focus:outline-hidden ${
              isFoxconn
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-white'
            }`}
          />
          <svg
            className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Bảng hiển thị 6 trường thông tin: #, serial number, sequence, date time, result, error code */}
      <div
        className="flex-1 overflow-y-auto max-h-65 xl:max-h-75 rounded-xl border border-slate-200/60 dark:border-zinc-800/80"
        style={{ scrollbarWidth: 'thin' }}
      >
        <table className="w-full text-[11px] text-left border-collapse">
          <thead
            className={`sticky top-0 z-10 text-[10px] font-black uppercase tracking-wider ${
              isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-950 text-zinc-400'
            }`}
          >
            <tr>
              <th className="py-2 px-2 text-center w-8">#</th>
              <th className="py-2 px-2">Serial Number</th>
              <th className="py-2 px-1 text-center">Seq</th>
              <th className="py-2 px-2">Date Time</th>
              <th className="py-2 px-2 text-center">Result</th>
              <th className="py-2 px-2 text-center">Error Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50 font-bold">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-xs text-slate-400 dark:text-zinc-500">
                  Không tìm thấy Serial Number phù hợp
                </td>
              </tr>
            ) : (
              filteredList.map((item, idx) => {
                const isSelected = selectedSerial?.serialNumber === item.serialNumber;
                const isFail = item.result === 'FAIL';

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectSerial && onSelectSerial(item)}
                    className={`transition-colors cursor-pointer select-none ${
                      isSelected
                        ? isFoxconn
                          ? 'bg-blue-100/70 font-semibold'
                          : 'bg-[#76B900]/20 text-[#76B900] font-semibold'
                        : isFoxconn
                          ? 'hover:bg-white text-slate-700'
                          : 'hover:bg-zinc-800/50 text-zinc-200'
                    }`}
                  >
                    <td className="py-1.5 px-3 text-center text-slate-400 dark:text-zinc-500 text-[10px]">
                      {idx + 1}
                    </td>
                    <td className="py-1.5 px-2.5 font-bold whitespace-nowrap text-xs">
                      {item.serialNumber}
                    </td>
                    <td className="py-1.5 px-1.5 text-center whitespace-nowrap text-[10px] text-slate-300 dark:text-zinc-400">
                      {item.sequence}
                    </td>
                    <td className="py-1.5 px-2 whitespace-nowrap text-[10px] text-slate-300 dark:text-zinc-400">
                      {item.dateTime}
                    </td>
                    <td className="py-1.5 px-1.5 text-center whitespace-nowrap">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                          isFail
                            ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                        }`}
                      >
                        {item.result}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-center whitespace-nowrap">
                      {isFail ? (
                        <span className="text-rose-500 font-bold text-[10px]">
                          {item.errorCode}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-zinc-600">-</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
