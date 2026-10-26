import useTheme from '../../hooks/useTheme';

export default function StationLayoutControlPage() {
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
            <span className={isFoxconn ? 'text-blue-700 font-semibold' : 'text-[#76B900] font-semibold'}>STATION LAYOUT CONTROL</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">STATION LAYOUT CONTROL</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Bộ công cụ trực quan thiết lập bố cục layout trạm thao tác (Station Blueprint), gán nhân sự/robot và luồng di chuyển linh kiện.
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
            <span>Nhập File CAD / JSON</span>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Lưu Cấu Trúc Trạm</span>
          </button>
        </div>
      </div>

      {/* Blueprint Visual Workspace */}
      <div
        className={`p-6 rounded-2xl border min-h-[420px] flex flex-col justify-between ${
          isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/40 border-zinc-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800">
          <div className="text-sm font-bold tracking-wide uppercase">Sơ Đồ Bố Trí Dây Chuyền Lắp Ráp Chính (Assembly Line A)</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Tỉ lệ zoom: 100%</span>
          </div>
        </div>

        {/* Station flow diagram */}
        <div className="py-8 flex flex-wrap items-center justify-center gap-4">
          {[
            { step: '01', name: 'Input & Barcode Scan', type: 'Auto', op: 'Sensor Barcode' },
            { step: '02', name: 'SMT Placement', type: 'Robotic', op: 'Pick & Place M/C' },
            { step: '03', name: 'Reflow Oven', type: 'Thermal', op: 'Furnace Chamber' },
            { step: '04', name: 'AOI Inspection', type: 'AI Vision', op: 'GPU Optical AI' },
            { step: '05', name: 'Manual Testing', type: 'Operator', op: 'Technician Station' },
            { step: '06', name: 'Packaging & AGV Out', type: 'Logistics', op: 'AGV Dock' },
          ].map((st, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-44 p-4 rounded-xl border flex flex-col gap-1 transition-all hover:scale-105 cursor-pointer ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-200 hover:border-blue-400'
                    : 'bg-zinc-900/80 border-zinc-700/80 hover:border-[#76B900]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black opacity-50">STATION {st.step}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isFoxconn ? 'bg-blue-100 text-blue-800' : 'bg-[#76B900]/20 text-[#76B900]'
                  }`}>
                    {st.type}
                  </span>
                </div>
                <div className="text-xs font-bold mt-1 truncate">{st.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-400">{st.op}</div>
              </div>

              {idx < 5 && (
                <svg className="w-5 h-5 text-slate-400 dark:text-zinc-600 hidden md:block shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-400 dark:text-zinc-500 pt-4 border-t border-slate-100 dark:border-zinc-800">
          Kéo thả các trạm để tái cấu trúc lại luồng công việc hoặc cấu hình chi tiết thông số từng trạm.
        </div>
      </div>
    </div>
  );
}
