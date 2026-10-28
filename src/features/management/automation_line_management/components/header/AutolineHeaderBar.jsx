import useTheme from '../../../../../hooks/useTheme';

export default function AutolineHeaderBar({
  lastUpdated,
  isRefreshing,
  onRefresh,
  isAutoRefresh,
  setIsAutoRefresh,
  refreshInterval,
  setRefreshInterval,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formattedTime = lastUpdated
    ? lastUpdated.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800">
      {/* Tiêu đề & Breadcrumb */}
      <div>
        <div className={`flex items-center gap-2 text-xs font-semibold mb-1 ${isFoxconn ? 'text-slate-400' : 'text-zinc-400'}`}>
          <span>QUẢN LÝ TỰ ĐỘNG HÓA</span>
          <span>/</span>
          <span className={isFoxconn ? 'text-[#002766] font-bold' : 'text-[#76B900] font-bold'}>
            AUTOLINE MANAGEMENT
          </span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className={`text-2xl font-black tracking-tight ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
            CHUYỀN SẢN XUẤT TỰ ĐỘNG HÓA
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>LIVE LINE</span>
          </span>
        </div>
        <p className={`text-xs mt-1 ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
          Bảng điều hành thời gian thực: Giám sát 6 KPI dây chuyền, chuỗi trạm máy nối tiếp và phân tích lỗi, sản lượng.
        </p>
      </div>

      {/* Nhóm nút điều khiển nhanh */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        {/* Thời gian cập nhật */}
        <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
          isFoxconn ? 'bg-white border-slate-200 text-slate-600' : 'bg-zinc-900/90 border-zinc-800 text-white'
        }`}>
          <span className={isFoxconn ? 'text-slate-400' : 'text-white/80'}>Cập nhật:</span>
          <span className={`font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>{formattedTime}</span>
        </div>

        {/* Nút bật/tắt Auto Refresh */}
        <div className={`flex items-center rounded-xl border overflow-hidden p-0.5 ${
          isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900/90 border-zinc-800'
        }`}>
          <button
            type="button"
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isAutoRefresh
                ? isFoxconn
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'bg-[#76B900]/20 text-[#76B900] font-bold'
                : 'text-slate-400 hover:text-slate-600 dark:text-zinc-300'
            }`}
          >
            {isAutoRefresh ? 'Auto ⟳' : 'Auto Tắt'}
          </button>
          {isAutoRefresh && (
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              aria-label="Chọn chu kỳ làm mới"
              className={`bg-transparent text-[11px] font-bold px-1.5 py-1 focus:outline-none cursor-pointer ${
                isFoxconn ? 'text-slate-700' : 'text-white'
              }`}
            >
              <option value={10} className="text-black">10s</option>
              <option value={30} className="text-black">30s</option>
              <option value={60} className="text-black">60s</option>
            </select>
          )}
        </div>

        {/* Nút Manual Refresh */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
            isFoxconn
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
          }`}
          title="Làm mới dữ liệu ngay lập tức"
        >
          <svg
            className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600 dark:text-[#76B900]' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Làm Mới</span>
        </button>

        {/* Nút Fullscreen */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            isFoxconn
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
          }`}
          title="Bật/Tắt Toàn Màn Hình"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
