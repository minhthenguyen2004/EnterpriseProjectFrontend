import useTheme from '../../../hooks/useTheme';
import PageHeaderBar from '../../../components/common/PageHeaderBar';

export default function AutomationLineControlPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const controlActions = (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        className="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 cursor-pointer shadow-rose-900/20 active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <span>Dừng Khẩn Cấp (E-STOP)</span>
      </button>

      <button
        type="button"
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 ${
          isFoxconn
            ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
            : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Khởi Động Dây Chuyền</span>
      </button>
    </div>
  );

  return (
    <div className={`p-6 lg:p-8 space-y-6 min-h-full ${isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'}`}>
      {/* Unified Page Header Bar */}
      <PageHeaderBar
        breadcrumbs={[
          { label: 'CONFIG', isCurrent: false },
          { label: 'AUTOMATION LINE CONTROL', isCurrent: true }
        ]}
        title="AUTOMATION LINE CONTROL"
        badge="LINE CONTROL"
        badgeType="brand"
        description="Bảng điều khiển tập trung cho dây chuyền tự động hóa: Khởi động (Start), Dừng (Stop), Pause, điều tiết tốc độ nhịp chuyền (Takt Time)."
        actions={controlActions}
        showFullscreen={true}
      />

      {/* Control Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border ${isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900/50 border-zinc-800'}`}>
          <div className="text-xs uppercase font-bold text-slate-400 mb-2">Trạng thái Line 01</div>
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-lg font-black text-emerald-500">ĐANG VẬN HÀNH (RUNNING)</span>
          </div>
          <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-zinc-400">
            <div className="flex justify-between"><span>Takt Time mục tiêu:</span> <span className="font-bold text-slate-800 dark:text-zinc-200">12.5s / sản phẩm</span></div>
            <div className="flex justify-between"><span>Takt Time thực tế:</span> <span className="font-bold text-emerald-600 dark:text-emerald-400">12.1s</span></div>
            <div className="flex justify-between"><span>Hiệu suất OEE:</span> <span className="font-bold text-[#76B900]">92.8%</span></div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900/50 border-zinc-800'}`}>
          <div className="text-xs uppercase font-bold text-slate-400 mb-2">Sản Lượng Ca Hiện Tại</div>
          <div className="text-3xl font-black">2,418 <span className="text-xs font-semibold text-slate-400">/ 2,800 pcs</span></div>
          <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '86.3%' }}></div>
          </div>
          <div className="mt-2 text-xs text-right font-semibold text-emerald-500">86.3% Kế hoạch ca</div>
        </div>

        <div className={`p-6 rounded-2xl border ${isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900/50 border-zinc-800'}`}>
          <div className="text-xs uppercase font-bold text-slate-400 mb-2">An Toàn & Interlock</div>
          <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Tất cả rào chắn an toàn đã khóa</span>
          </div>
          <div className="mt-4 text-xs text-slate-500 dark:text-zinc-400">
            Cảm biến rèm quang, cửa an toàn và nút dừng khẩn cấp đang sẵn sàng 100%.
          </div>
        </div>
      </div>
    </div>
  );
}
