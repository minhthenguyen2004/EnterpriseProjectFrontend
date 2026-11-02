import useTheme from '../../../../../../hooks/useTheme';

/**
 * Bảng Dữ Liệu Giám Sát Thời Gian Thực (Carrier Master Table - Dòng 3 Tab Giám Sát Thời Gian Thực)
 * 9 Cột thông tin chuẩn nghiệp vụ + 1 Cột Thao tác:
 * 1. Mức độ (Severity)
 * 2. Mã khay (Carrier Code)
 * 3. Chuyền / Sản phẩm (Line / Product)
 * 4. Loại khay (Carrier Type)
 * 5. Tiến độ chu kỳ (Cycle Progress)
 * 6. % sử dụng (% Life Used)
 * 7. Giờ từ lần kiểm tra cuối (Hours Since Last Inspection)
 * 8. Lần kiểm định gần nhất (Last Inspection Date & Inspector)
 * 9. Trạng thái (Status: ACTIVE, WARNING, INSPECTION_REQUIRED, LOCKED)
 * 10. Thao tác (Actions: Detail 👁️, Inspect 🛠️, Lock/Unlock 🔒/🔓)
 */
export default function CarrierRealtimeTable({
  carriers,
  onViewDetail,
  onOpenInspect,
  onToggleLock,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Render Mức độ (Severity Badge & Pulsing Dot)
  const renderSeverity = (severity, status) => {
    let dotColor = 'bg-emerald-500';
    let ringColor = 'ring-emerald-400/30';
    let label = 'An toàn';

    if (status === 'LOCKED' || severity === 'critical') {
      dotColor = 'bg-rose-500';
      ringColor = 'ring-rose-400/40 animate-ping';
      label = 'Nguy cấp';
    } else if (status === 'INSPECTION_REQUIRED' || severity === 'urgent') {
      dotColor = 'bg-orange-500';
      ringColor = 'ring-orange-400/30 animate-pulse';
      label = 'Cần KT';
    } else if (status === 'WARNING' || severity === 'warning') {
      dotColor = 'bg-amber-500';
      ringColor = 'ring-amber-400/30';
      label = 'Cảnh báo';
    }

    return (
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
          <span className={`absolute w-4 h-4 rounded-full ring-2 ${ringColor}`} />
        </div>
        <span
          className={`text-[11px] font-bold hidden xl:inline ${
            isFoxconn ? 'text-slate-900' : 'text-zinc-100'
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  // Render Badge Trạng Thái với độ tương phản cao
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
              isFoxconn
                ? 'bg-emerald-100 text-emerald-950 border-emerald-300 shadow-sm'
                : 'bg-emerald-500/25 text-emerald-300 border-emerald-400/50 shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            ACTIVE
          </span>
        );
      case 'WARNING':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
              isFoxconn
                ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-sm'
                : 'bg-amber-500/25 text-amber-300 border-amber-400/50 shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            WARNING
          </span>
        );
      case 'INSPECTION_REQUIRED':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
              isFoxconn
                ? 'bg-orange-100 text-orange-950 border-orange-400 shadow-sm'
                : 'bg-orange-500/25 text-orange-300 border-orange-400/50 shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            INSPECTION
          </span>
        );
      case 'LOCKED':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
              isFoxconn
                ? 'bg-rose-100 text-rose-950 border-rose-400 shadow-sm'
                : 'bg-rose-500/30 text-rose-200 border-rose-400/60 shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            LOCKED
          </span>
        );
      default:
        return (
          <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
            {status}
          </span>
        );
    }
  };

  // Render Thanh Tiến Độ Chu Kỳ
  const renderCycleProgressBar = (carrier) => {
    const { currentCycles, maxCycles, usagePercentage } = carrier;
    let barColor = 'from-emerald-500 to-teal-400';
    if (usagePercentage >= 100) {
      barColor = 'from-rose-600 to-red-500';
    } else if (usagePercentage >= 95) {
      barColor = 'from-orange-500 to-amber-500';
    } else if (usagePercentage >= 80) {
      barColor = 'from-amber-500 to-yellow-400';
    } else if (!isFoxconn) {
      barColor = 'from-[#76B900] to-emerald-400';
    } else {
      barColor = 'from-blue-600 to-indigo-600';
    }

    const cappedPct = Math.min(100, Math.max(0, usagePercentage));

    return (
      <div className="w-full max-w-37.5 space-y-1">
        <div className="flex items-center justify-between text-[11px] font-extrabold">
          <span className={isFoxconn ? 'text-slate-950' : 'text-white'}>
            {currentCycles.toLocaleString('vi-VN')}
          </span>
          <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
            / {maxCycles.toLocaleString('vi-VN')}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-300 dark:bg-zinc-700 overflow-hidden">
          <div
            className={`h-full rounded-full bg-linear-to-r ${barColor} transition-all duration-300`}
            style={{ width: `${cappedPct}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        isFoxconn ? 'bg-white border-slate-300 shadow-sm' : 'bg-zinc-900 border-zinc-800'
      }`}
    >
      <div className="overflow-x-auto overflow-y-auto max-h-155 custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          {/* Header Bảng (Sticky Header) với chữ tương phản cao */}
          <thead
            className={`sticky top-0 z-10 text-[11px] font-extrabold uppercase tracking-wider border-b select-none ${
              isFoxconn
                ? 'bg-slate-100 text-slate-900 border-slate-300 shadow-sm backdrop-blur-md'
                : 'bg-zinc-950 text-white border-zinc-700 shadow-sm backdrop-blur-md'
            }`}
          >
            <tr>
              <th scope="col" className="py-3 px-3.5 text-center w-16">
                Mức độ
              </th>
              <th scope="col" className="py-3 px-4 min-w-35">
                Mã khay
              </th>
              <th scope="col" className="py-3 px-4 min-w-40">
                Chuyền / Sản phẩm
              </th>
              <th scope="col" className="py-3 px-4 min-w-37.5">
                Loại khay
              </th>
              <th scope="col" className="py-3 px-4 min-w-40">
                Tiến độ chu kỳ
              </th>
              <th scope="col" className="py-3 px-3.5 text-right min-w-22.5">
                % sử dụng
              </th>
              <th scope="col" className="py-3 px-4 min-w-32.5">
                Giờ từ lần KT cuối
              </th>
              <th scope="col" className="py-3 px-4 min-w-42.5">
                Lần kiểm định gần nhất
              </th>
              <th scope="col" className="py-3 px-4 text-center min-w-30">
                Trạng thái
              </th>
              <th scope="col" className="py-3 px-4 text-center min-w-30">
                Thao tác
              </th>
            </tr>
          </thead>

          {/* Thân Bảng Dữ Liệu */}
          <tbody
            className={`divide-y ${
              isFoxconn ? 'divide-slate-200' : 'divide-zinc-800'
            }`}
          >
            {carriers.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-500 dark:text-zinc-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-8 h-8 text-slate-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold text-xs text-slate-700 dark:text-zinc-300">
                      Không tìm thấy khay chứa nào phù hợp với bộ lọc hiện tại
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              carriers.map((carrier) => {
                const isLocked = carrier.status === 'LOCKED';
                return (
                  <tr
                    key={carrier.id}
                    className={`transition-colors duration-150 ${
                      isLocked
                        ? isFoxconn
                          ? 'bg-rose-50/70 hover:bg-rose-100/80'
                          : 'bg-rose-950/25 hover:bg-rose-950/45'
                        : isFoxconn
                        ? 'hover:bg-slate-100/90'
                        : 'hover:bg-zinc-800/70'
                    }`}
                  >
                    {/* Cột 1: Mức độ */}
                    <td className="py-3.5 px-3.5 text-center">
                      {renderSeverity(carrier.severity, carrier.status)}
                    </td>

                    {/* Cột 2: Mã khay */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-xs flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewDetail(carrier)}
                          className={`hover:underline cursor-pointer text-left transition-colors ${
                            isFoxconn
                              ? 'text-blue-900 hover:text-blue-700'
                              : 'text-white hover:text-[#76B900]'
                          }`}
                          title="Bấm để xem chi tiết thông số khay"
                        >
                          {carrier.carrierCode}
                        </button>
                      </div>
                      <div
                        className={`text-[10px] font-bold truncate max-w-30 ${
                          isFoxconn ? 'text-slate-600' : 'text-zinc-300'
                        }`}
                        title={carrier.rfidTag}
                      >
                        RFID: {carrier.rfidTag.slice(-9)}
                      </div>
                    </td>

                    {/* Cột 3: Chuyền / Sản phẩm */}
                    <td className="py-3.5 px-4">
                      <div className={`font-extrabold text-xs ${isFoxconn ? 'text-slate-950' : 'text-white'}`}>
                        {carrier.lineName}
                        <span className={`text-[10px] font-bold ml-1 ${isFoxconn ? 'text-slate-600' : 'text-zinc-300'}`}>
                          ({carrier.stationName})
                        </span>
                      </div>
                      <div
                        className={`text-[11px] font-bold truncate max-w-37.5 mt-0.5 ${
                          isFoxconn ? 'text-slate-700' : 'text-zinc-200'
                        }`}
                        title={carrier.productName}
                      >
                        🏷️ {carrier.productName}
                      </div>
                    </td>

                    {/* Cột 4: Loại khay */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          isFoxconn
                            ? 'bg-slate-100 text-slate-900 border border-slate-300'
                            : 'bg-zinc-800 text-white border border-zinc-600'
                        }`}
                      >
                        {carrier.carrierType}
                      </span>
                    </td>

                    {/* Cột 5: Tiến độ chu kỳ */}
                    <td className="py-3.5 px-4">
                      {renderCycleProgressBar(carrier)}
                    </td>

                    {/* Cột 6: % sử dụng */}
                    <td className="py-3.5 px-3.5 text-right font-extrabold">
                      <span
                        className={`text-xs ${
                          carrier.usagePercentage >= 100
                            ? 'text-rose-600 dark:text-rose-400 font-black'
                            : carrier.usagePercentage >= 95
                            ? 'text-orange-600 dark:text-orange-300 font-black'
                            : carrier.usagePercentage >= 80
                            ? 'text-amber-700 dark:text-amber-300 font-black'
                            : isFoxconn
                            ? 'text-slate-950 font-black'
                            : 'text-white font-black'
                        }`}
                      >
                        {carrier.usagePercentage.toFixed(1)}%
                      </span>
                    </td>

                    {/* Cột 7: Giờ từ lần kiểm tra cuối */}
                    <td className="py-3.5 px-4">
                      <div
                        className={`text-xs font-black ${
                          carrier.hoursSinceLastInspection >= 720
                            ? 'text-rose-600 dark:text-rose-400 flex items-center gap-1'
                            : isFoxconn
                            ? 'text-slate-950'
                            : 'text-white'
                        }`}
                      >
                        {carrier.hoursSinceLastInspection}h
                        {carrier.hoursSinceLastInspection >= 720 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-extrabold bg-rose-500/20 text-rose-500 dark:text-rose-300 border border-rose-500/30">
                            Quá hạn
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] font-bold ${isFoxconn ? 'text-slate-600' : 'text-zinc-300'}`}>
                        (~{(carrier.hoursSinceLastInspection / 24).toFixed(1)} ngày)
                      </div>
                    </td>

                    {/* Cột 8: Lần kiểm định gần nhất */}
                    <td className="py-3.5 px-4">
                      <div className={`text-[11px] font-bold ${isFoxconn ? 'text-slate-950' : 'text-white'}`}>
                        {carrier.lastInspectionDate}
                      </div>
                      <div
                        className={`text-[10px] font-bold truncate max-w-40 mt-0.5 ${
                          isFoxconn ? 'text-slate-700' : 'text-zinc-200'
                        }`}
                        title={carrier.lastInspector}
                      >
                        👤 {carrier.lastInspector}
                      </div>
                    </td>

                    {/* Cột 9: Trạng thái */}
                    <td className="py-3.5 px-4 text-center">
                      {renderStatusBadge(carrier.status)}
                    </td>

                    {/* Cột 10: Thao tác */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* 👁️ Nút Xem Chi Tiết */}
                        <button
                          type="button"
                          onClick={() => onViewDetail(carrier)}
                          title="Xem chi tiết khay chứa"
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isFoxconn
                              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 hover:text-blue-700'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-600 hover:text-[#76B900]'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        {/* 🛠️ Nút Kiểm Định & Reset Chu Kỳ */}
                        <button
                          type="button"
                          onClick={() => onOpenInspect(carrier)}
                          title="Kiểm định dung sai & Reset chu kỳ"
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isFoxconn
                              ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-300'
                              : 'bg-[#76B900]/20 hover:bg-[#76B900]/30 text-[#76B900] border-[#76B900]/40'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>

                        {/* 🔒/🔓 Nút Khóa / Mở Khóa */}
                        <button
                          type="button"
                          onClick={() => onToggleLock(carrier)}
                          title={isLocked ? 'Mở khóa khay này' : 'Khóa khay này (cách ly)'}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isLocked
                              ? isFoxconn
                                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300'
                                : 'bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-300 border-emerald-400/50'
                              : isFoxconn
                              ? 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-300'
                              : 'bg-rose-500/25 hover:bg-rose-500/35 text-rose-300 border-rose-400/50'
                          }`}
                        >
                          {isLocked ? (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
