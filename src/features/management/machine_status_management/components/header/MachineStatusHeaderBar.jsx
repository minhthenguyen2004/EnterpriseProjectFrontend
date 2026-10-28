import useTheme from '../../../../../hooks/useTheme';

export default function MachineStatusHeaderBar({
  onOpenDrawer,
  activeCount = 0,
  autoRefreshSeconds,
  onChangeAutoRefresh,
  onManualRefresh,
  isRefreshing,
  lastUpdated,
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

  const isAutoRefresh = autoRefreshSeconds > 0;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800">
      {/* 1. Tiêu đề & Breadcrumb */}
      <div>
        <div className={`flex items-center gap-2 text-xs font-semibold mb-1 ${isFoxconn ? 'text-slate-400' : 'text-zinc-400'}`}>
          <span>QUẢN LÝ TỰ ĐỘNG HÓA</span>
          <span>/</span>
          <span className={isFoxconn ? 'text-[#002766] font-bold' : 'text-[#76B900] font-bold'}>
            MACHINE STATUS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className={`text-2xl font-black tracking-tight ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
            GIÁM SÁT TRẠNG THÁI MÁY MÓC
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>LIVE MONITOR</span>
          </span>
        </div>
        <p className={`text-xs mt-1 ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
          Bảng điều hành thời gian thực: Giám sát toàn bộ các trạm máy sản xuất, định danh IP, chương trình và vị trí dây chuyền.
        </p>
      </div>

      {/* 2. Nhóm nút điều khiển nhanh */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        {/* Nút mở bộ lọc đa tiêu chí */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-blue-900 text-white'
              : 'bg-[#76B900] hover:bg-[#86d400] text-black font-black shadow-[0_0_12px_rgba(118,185,0,0.3)]'
          }`}
          title="Mở bảng lọc đa tiêu chí"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span>Bộ Lọc</span>
          {activeCount > 0 && (
            <span
              className={`text-[9px] font-black rounded-full px-1.5 py-0.2 ${
                isFoxconn ? 'bg-amber-400 text-slate-900' : 'bg-black text-[#76B900]'
              }`}
            >
              {activeCount}
            </span>
          )}
        </button>

        {/* Thời gian cập nhật */}
        <div
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
            isFoxconn ? 'bg-white border-slate-200 text-slate-600' : 'bg-zinc-900/90 border-zinc-800 text-white'
          }`}
        >
          <span className={isFoxconn ? 'text-slate-400' : 'text-zinc-400'}>Cập nhật:</span>
          <span className={`font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>{formattedTime}</span>
        </div>

        {/* Nút bật/tắt Auto Refresh */}
        <div
          className={`flex items-center rounded-xl border overflow-hidden p-0.5 ${
            isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900/90 border-zinc-800'
          }`}
        >
          <button
            type="button"
            onClick={() => onChangeAutoRefresh && onChangeAutoRefresh(isAutoRefresh ? 0 : 30)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isAutoRefresh
                ? isFoxconn
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'bg-[#76B900]/20 text-[#76B900] font-bold'
                : 'text-slate-400 hover:text-slate-600 dark:text-zinc-400'
            }`}
          >
            {isAutoRefresh ? 'Auto ⟳' : 'Auto Tắt'}
          </button>
          {isAutoRefresh && (
            <select
              value={autoRefreshSeconds}
              onChange={(e) => onChangeAutoRefresh && onChangeAutoRefresh(Number(e.target.value))}
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
          onClick={onManualRefresh}
          disabled={isRefreshing}
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
            isFoxconn
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
          }`}
          title="Làm mới dữ liệu máy ngay lập tức"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
