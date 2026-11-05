import { useState } from 'react';

export default function SnDetailsTable({
  isFoxconn,
  detailsList = [],
  isExecuting,
}) {
  const [filterTerm, setFilterTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (key, val) => {
    navigator.clipboard?.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const filtered = detailsList.filter((d) => {
    const q = filterTerm.toLowerCase();
    return (
      (d.key || '').toLowerCase().includes(q) ||
      (d.value || '').toLowerCase().includes(q) ||
      (d.station || '').toLowerCase().includes(q) ||
      (d.status || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-2.5 pt-2">
      {/* Thanh công cụ lọc & bộ đếm */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            placeholder="Lọc nhanh thuộc tính, giá trị, trạm..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
          Hiển thị: <strong>{filtered.length}</strong> / {detailsList.length} bản ghi
        </span>
      </div>

      {/* Bảng dữ liệu đa cột */}
      <div
        className={`overflow-x-auto rounded-xl border max-h-64 ${
          isFoxconn ? 'border-slate-200 bg-white' : 'border-zinc-800 bg-zinc-950/50'
        }`}
      >
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr
              className={`border-b font-bold uppercase tracking-wider sticky top-0 z-10 ${
                isFoxconn
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              <th className="py-2.5 px-3">STT</th>
              <th className="py-2.5 px-3">Tên Thuộc Tính (Key)</th>
              <th className="py-2.5 px-3">Giá Trị Ghi Nhận (Value)</th>
              <th className="py-2.5 px-3">Công Đoạn / Trạm</th>
              <th className="py-2.5 px-3">Thời Gian Cập Nhật</th>
              <th className="py-2.5 px-3 text-center">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-mono">
            {isExecuting ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 dark:text-zinc-500 font-sans text-xs">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin text-blue-600 dark:text-[#76B900]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Đang tải dữ liệu từ bảng sndetails...</span>
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400 dark:text-zinc-500 font-sans text-xs">
                  {filterTerm ? 'Không tìm thấy bản ghi khớp với từ khóa lọc.' : 'Chưa có bản ghi nào. Nhấn "Thực thi tra cứu" để nạp dữ liệu.'}
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`transition-colors ${
                    isFoxconn ? 'hover:bg-slate-50' : 'hover:bg-zinc-800/40'
                  }`}
                >
                  <td className="py-2 px-3 text-slate-400 font-sans">{index + 1}</td>
                  <td className="py-2 px-3 font-semibold text-blue-600 dark:text-[#76B900]">
                    {item.key}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1.5 group">
                      <span className="truncate max-w-[200px]" title={item.value}>
                        {item.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.key, item.value)}
                        className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                          copiedKey === item.key
                            ? 'text-emerald-500 opacity-100'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200'
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
                  <td className="py-2 px-3 text-slate-600 dark:text-zinc-400">{item.station}</td>
                  <td className="py-2 px-3 text-[10px] text-slate-400">
                    {item.updatedAt || '2026-11-05 08:00:00'}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                        item.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : item.status === 'COMPENSATED'
                          ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          : item.status === 'UPDATED'
                          ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {item.status || 'ACTIVE'}
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
