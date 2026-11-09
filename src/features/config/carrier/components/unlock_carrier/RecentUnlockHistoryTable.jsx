import useTheme from '../../../../../hooks/useTheme';

export default function RecentUnlockHistoryTable({ historyList = [] }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const formatInspectionType = (type) => {
    switch (type) {
      case 'shift_start':
        return 'Đầu ca (Shift start)';
      case 'periodic':
        return 'Định kỳ (Periodic)';
      case 'manual':
        return 'Đột xuất (Manual)';
      default:
        return type;
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h4 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800 dark:text-zinc-100' : 'text-gray-200'}`}>
            Nhật ký mở khóa gần đây (Audit Activity Log)
          </h4>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-zinc-500">
          Hiển thị {historyList.length} bản ghi gần nhất
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead
            className={`text-[10px] uppercase font-bold tracking-wider ${
              isFoxconn ? 'bg-slate-50 text-slate-500' : 'bg-zinc-950 text-zinc-400'
            }`}
          >
            <tr>
              <th className="px-3 py-2.5 rounded-l-lg">Thời gian</th>
              <th className="px-3 py-2.5">Mã khay</th>
              <th className="px-3 py-2.5">Nhân viên</th>
              <th className="px-3 py-2.5">Loại kiểm định</th>
              <th className="px-3 py-2.5 text-center">Reset chu kỳ</th>
              <th className="px-3 py-2.5 text-center">Kết quả</th>
              <th className="px-3 py-2.5 rounded-r-lg">Ghi chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
            {historyList.map((item) => (
              <tr
                key={item.id}
                className={`transition-colors ${
                  isFoxconn ? 'hover:bg-slate-50/80' : 'hover:bg-zinc-800/40'
                }`}
              >
                <td className={`px-3 py-2.5 font-mono text-[11px] ${isFoxconn ? 'text-slate-400 dark:text-zinc-500' : 'text-gray-200'} whitespace-nowrap`}>
                  {item.timestamp}
                </td>
                <td className={`px-3 py-2.5 font-mono font-bold ${isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-gray-200'}`}>
                  {item.carrierCode}
                </td>
                <td className={`px-3 py-2.5 font-medium ${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-gray-200'}`}>
                  {item.employeeId}
                </td>
                <td className={`px-3 py-2.5 ${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-gray-200'}`}>
                  {formatInspectionType(item.inspectionType)}
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.resetCycleCount
                        ? isFoxconn
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-[#76B900]/20 text-[#76B900]'
                        : isFoxconn
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {item.resetCycleCount ? 'CÓ' : 'KHÔNG'}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      item.result === 'PASS'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700'
                    }`}
                  >
                    {item.result === 'PASS' ? 'ĐẠT' : 'LỖI'}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-slate-500 dark:text-zinc-400 max-w-xs truncate">
                  {item.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

