import { useState, useMemo } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function AoiDataTab({
  aoiData = [],
  onSelectAoiItem,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Filter mode: 'all' | 'step'
  const [filterMode, setFilterMode] = useState('all');
  const [selectedStepFilter, setSelectedStepFilter] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Danh sách các Step độc nhất để lọc
  const uniqueSteps = useMemo(() => {
    return Array.from(new Set(aoiData.map((d) => d.step)));
  }, [aoiData]);

  const filteredData = useMemo(() => {
    if (filterMode === 'step' && selectedStepFilter) {
      return aoiData.filter((d) => d.step === selectedStepFilter);
    }
    return aoiData;
  }, [aoiData, filterMode, selectedStepFilter]);

  const handleDownloadAll = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col h-full space-y-2.5">
      {/* Toolbar: 2 nút lọc */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          {/* Nút 1: Lọc theo Step & Sequence */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => {
                if (filterMode === 'step') {
                  setFilterMode('all');
                  setSelectedStepFilter('');
                } else {
                  setFilterMode('step');
                  if (uniqueSteps.length > 0 && !selectedStepFilter) {
                    setSelectedStepFilter(uniqueSteps[0]);
                  }
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                filterMode === 'step'
                  ? isFoxconn
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-[#76B900] text-black border-[#76B900] font-black shadow-sm'
                  : isFoxconn
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Lọc theo Step & Sequence</span>
            </button>

            {filterMode === 'step' && uniqueSteps.length > 0 && (
              <select
                value={selectedStepFilter}
                onChange={(e) => setSelectedStepFilter(e.target.value)}
                className={`ml-2 px-2.5 py-1.5 text-xs rounded-xl border focus:outline-hidden ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-900 border-zinc-700 text-white'
                }`}
              >
                {uniqueSteps.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Nút 2: Xem tất cả */}
          <button
            type="button"
            onClick={() => {
              setFilterMode('all');
              setSelectedStepFilter('');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              filterMode === 'all'
                ? isFoxconn
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-[#76B900] text-black border-[#76B900] font-black shadow-sm'
                : isFoxconn
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
            }`}
          >
            <span>Xem tất cả ({aoiData.length})</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 italic">
          💡 Nhấp vào bất kỳ dòng nào để xem ảnh chụp quang học độ nét cao
        </div>
      </div>

      {/* Bảng hiển thị 6 trường: #, type, step, camera, pov, result */}
      <div
        className="flex-1 overflow-y-auto max-h-55 xl:max-h-62.5 rounded-xl border border-slate-200/70 dark:border-zinc-800"
        style={{ scrollbarWidth: 'thin' }}
      >
        <table className="w-full text-xs text-left border-collapse">
          <thead
            className={`sticky top-0 z-10 text-[10px] font-black uppercase tracking-wider ${
              isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-950 text-zinc-400'
            }`}
          >
            <tr>
              <th className="py-2.5 px-3 text-center w-12">#</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Step</th>
              <th className="py-2.5 px-3 font-bold">Camera</th>
              <th className="py-2.5 px-3">POV</th>
              <th className="py-2.5 px-3 text-center">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-white text-[11px]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400 dark:text-zinc-500 font-sans">
                  Không tìm thấy điểm kiểm tra AOI phù hợp
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => {
                const isFail = item.result === 'FAIL' || item.result === 'NG';

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectAoiItem && onSelectAoiItem(item)}
                    className={`transition-colors cursor-pointer select-none group ${
                      isFoxconn
                        ? 'hover:bg-blue-50/60 text-slate-700'
                        : 'hover:bg-zinc-800/70 text-zinc-200'
                    }`}
                  >
                    <td className={`py-2 px-3 text-center font-bold ${
                      isFoxconn ? 'text-slate-400 dark:text-zinc-500' : 'text-white'
                    }`}>
                      {idx + 1}
                    </td>
                    <td className={`py-2 px-3 font-bold ${
                      isFoxconn ? 'text-slate-900' : 'text-white'
                    }`}>
                      {item.type}
                    </td>
                    <td className={`py-2 px-3 font-semibold ${
                      isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-white'
                    }`}>
                      {item.step}
                    </td>
                    <td className={`py-2 px-3 text-slate-600 dark:text-zinc-300 font-sans ${
                      isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-white'
                    }`}>
                      {item.camera}
                    </td>
                    <td className={`py-2 px-3 text-[10px] text-slate-500 dark:text-zinc-400 ${
                      isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-white'
                    }`}>
                      {item.pov}
                    </td>
                    <td className={`py-2 px-3 text-slate-700 dark:text-zinc-200 font-sans ${
                      isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-white'
                    }`}>
                      {item.pov}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-black ${
                          isFail
                            ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                        }`}
                      >
                        {item.result}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Ở góc dưới có nút Download all images */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-slate-400">
          Tổng số ảnh quang học: <strong className={isFoxconn ? 'text-slate-800' : 'text-white'}>{filteredData.length} ảnh</strong>
        </span>

        <button
          type="button"
          onClick={handleDownloadAll}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
            downloadSuccess
              ? 'bg-emerald-600 text-white'
              : isFoxconn
                ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{downloadSuccess ? '✓ Đã tải xuống thành công' : 'Download all images'}</span>
        </button>
      </div>
    </div>
  );
}
