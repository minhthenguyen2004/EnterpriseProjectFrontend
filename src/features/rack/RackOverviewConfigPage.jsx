import useTheme from '../../hooks/useTheme';
import PageHeaderBar from '../../components/common/PageHeaderBar';

export default function RackOverviewConfigPage() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const saveLayoutButton = (
    <button
      type="button"
      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
        isFoxconn
          ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
          : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span>Lưu Bố Cục Sơ Đồ</span>
    </button>
  );

  return (
    <div className={`p-6 lg:p-8 space-y-6 min-h-full ${isFoxconn ? 'bg-slate-50 text-slate-800' : 'bg-zinc-950 text-zinc-100'}`}>
      {/* Unified Page Header Bar */}
      <PageHeaderBar
        breadcrumbs={[
          { label: 'CONFIG', isCurrent: false },
          { label: 'RACK', isCurrent: false },
          { label: 'RACK OVERVIEW CONFIG', isCurrent: true }
        ]}
        title="RACK OVERVIEW CONFIGURATION"
        badge="LAYOUT CONFIG"
        badgeType="brand"
        description="Bản đồ trực quan hóa layout mặt bằng tủ Rack, thiết lập bản đồ nhiệt (Heatmap) và góc nhìn camera giám sát thời gian thực."
        actions={saveLayoutButton}
        showFullscreen={true}
      />

      {/* Rack Map Preview Canvas */}
      <div
        className={`p-6 rounded-2xl border ${
          isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/40 border-zinc-800'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold tracking-wide uppercase">Bản Đồ Phân Bổ Tủ Rack - Khu Vực SMT & DIP</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Bình thường</span>
            <span className="inline-flex items-center gap-1.5 ml-3"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Đầy &gt; 90%</span>
            <span className="inline-flex items-center gap-1.5 ml-3"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Quá tải / Lỗi</span>
          </div>
        </div>

        {/* Visual Simulated Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 pt-2">
          {Array.from({ length: 24 }).map((_, idx) => {
            const rackCode = `R-${String(idx + 1).padStart(2, '0')}`;
            const isFull = idx === 4 || idx === 11;
            const isError = idx === 17;
            const statusColor = isError
              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-600'
              : isFull
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-600'
              : isFoxconn
              ? 'border-blue-200 bg-blue-50/50 hover:border-blue-400 text-blue-900'
              : 'border-zinc-700 bg-zinc-800/60 hover:border-[#76B900] text-zinc-200';

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 ${statusColor}`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 4h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 9h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2z" />
                </svg>
                <div className="text-[11px] font-bold">{rackCode}</div>
                <div className="text-[9px] opacity-75">{isError ? 'Lỗi' : isFull ? '94%' : '65%'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
