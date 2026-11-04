import useTheme from '../../../../../hooks/useTheme';

export default function ActionLogsRestoreTab({ filters }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const logs = [
    { time: '09:42:15', action: 'SWITCH_InsertSerialNumberSFC', user: 'ENG_OP_04', result: 'PASS (200)', note: 'Khởi tạo SN trên trạm SMT_ASSY' },
    { time: '09:43:02', action: 'SWITCH_CheckSerialNumberSFC', user: 'ENG_OP_04', result: 'PASS (200)', note: 'Router check passed: Không bị Hold' },
    { time: '09:43:45', action: 'SWITCH_CheckKeyPartsSFC(0)', user: 'ENG_OP_04', result: 'PASS (200)', note: 'BOM validation passed: 7/7 linh kiện hợp lệ' },
    { time: '09:44:30', action: 'Switch_InsertTestResultSFC(PASS)', user: 'ENG_OP_04', result: 'PASS (200)', note: 'Ghi nhận PASS, giải phóng khay sang trạm kế' },
  ];

  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/80 border-zinc-800 text-white'
      }`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isFoxconn ? 'bg-blue-50 text-blue-600' : 'bg-[#76B900]/10 text-[#76B900]'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Action Logs & State Restore Center</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Nhật ký kiểm soát các bản tin SFC Switch đã gửi và công cụ phục hồi trạng thái trạm {filters.stationGroup}.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all cursor-pointer"
          >
            Tạo Snapshot Backup
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
            }`}
          >
            Xuất Báo Cáo Audit Log
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className={`border-b ${isFoxconn ? 'bg-slate-100 text-slate-700' : 'bg-zinc-950/80 text-zinc-300'}`}>
              <th className="py-2.5 px-3 font-bold">Thời gian</th>
              <th className="py-2.5 px-3 font-bold">Lệnh SFC đã gọi</th>
              <th className="py-2.5 px-3 font-bold">Kỹ sư vận hành</th>
              <th className="py-2.5 px-3 font-bold">Mã kết quả</th>
              <th className="py-2.5 px-3 font-bold">Chi tiết sự kiện</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {logs.map((row, idx) => (
              <tr key={idx} className={isFoxconn ? 'hover:bg-slate-50' : 'hover:bg-zinc-800/40'}>
                <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-zinc-400">{row.time}</td>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-[#76B900]">{row.action}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-zinc-300">{row.user}</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 font-mono">
                    {row.result}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-zinc-400">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
