import useTheme from '../../hooks/useTheme';

export default function RackConfigPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className={`p-6 lg:p-8 space-y-6 min-h-full ${isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 border-slate-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-zinc-500 mb-1">
            <span>CONFIG</span>
            <span>/</span>
            <span>RACK</span>
            <span>/</span>
            <span className={isFoxconn ? 'text-blue-700 font-semibold' : 'text-[#76B900] font-semibold'}>RACK CONFIG</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">RACK CONFIGURATION</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Quản lý thiết lập thông số kỹ thuật, cấu hình vị trí slot, tầng chứa và sensor giám sát tủ Rack.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Xuất dữ liệu</span>
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm Tủ Rack Mới</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng số Rack', value: '48', status: 'Operational', color: 'blue' },
          { label: 'Slot Đang Sử Dụng', value: '872 / 1,152', status: '75.6% Capacity', color: 'emerald' },
          { label: 'Cần Bảo Trì', value: '3', status: 'Action Required', color: 'amber' },
          { label: 'Nhiệt Độ Trung Bình', value: '23.4 °C', status: 'Optimal', color: 'purple' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition-all ${
              isFoxconn
                ? 'bg-white border-slate-200/80 shadow-xs'
                : 'bg-zinc-900/60 border-zinc-800 shadow-lg'
            }`}
          >
            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">{stat.label}</div>
            <div className="text-2xl font-black mt-1">{stat.value}</div>
            <div className="text-[11px] font-semibold mt-2 text-emerald-600 dark:text-emerald-400">
              {stat.status}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Placeholder Area */}
      <div
        className={`p-6 rounded-2xl border ${
          isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/40 border-zinc-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="text-sm font-bold tracking-wide uppercase">Danh Sách Cấu Hình Tủ Rack</div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm mã Rack..."
              className={`px-3 py-1.5 text-xs rounded-xl border w-full sm:w-64 focus:outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 focus:border-blue-600'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b text-[11px] uppercase tracking-wider ${
              isFoxconn ? 'border-slate-200 text-slate-400 bg-slate-50/50' : 'border-zinc-800 text-zinc-500 bg-zinc-900/50'
            }`}>
              <tr>
                <th className="py-3 px-4 font-semibold">Mã Rack</th>
                <th className="py-3 px-4 font-semibold">Khu vực (Zone)</th>
                <th className="py-3 px-4 font-semibold">Tổng Slot</th>
                <th className="py-3 px-4 font-semibold">Tải trọng (Max)</th>
                <th className="py-3 px-4 font-semibold">Trạng thái</th>
                <th className="py-3 px-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-medium">
              {[
                { id: 'RCK-A1-01', zone: 'Zone A (SMT)', slots: '24 slots', load: '450 kg', status: 'Hoạt động' },
                { id: 'RCK-A1-02', zone: 'Zone A (SMT)', slots: '24 slots', load: '450 kg', status: 'Hoạt động' },
                { id: 'RCK-B2-01', zone: 'Zone B (DIP)', slots: '32 slots', load: '600 kg', status: 'Cảnh báo sensor' },
                { id: 'RCK-C3-05', zone: 'Zone C (Assembly)', slots: '16 slots', load: '300 kg', status: 'Đang bảo dưỡng' },
              ].map((row, i) => (
                <tr key={i} className={`transition-colors ${isFoxconn ? 'hover:bg-slate-50' : 'hover:bg-zinc-800/40'}`}>
                  <td className="py-3.5 px-4 font-bold">{row.id}</td>
                  <td className="py-3.5 px-4">{row.zone}</td>
                  <td className="py-3.5 px-4">{row.slots}</td>
                  <td className="py-3.5 px-4">{row.load}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      row.status === 'Hoạt động'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60'
                        : row.status === 'Cảnh báo sensor'
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60'
                        : 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      className={`text-xs font-semibold cursor-pointer ${
                        isFoxconn ? 'text-blue-600 hover:text-blue-800' : 'text-[#76B900] hover:underline'
                      }`}
                    >
                      Cấu hình
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
