import useTheme from '../../../../../hooks/useTheme';

export default function SingleCarrierScannerTab({
  carrierCode,
  onChangeCode,
  onScan,
  onClear,
  scannedCarrier,
  scanError,
  onOpenCamModal
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onScan(carrierCode);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Khung Quét mã khay (carrier code) */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200/90 shadow-xs'
            : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <h3 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800 dark:text-zinc-100' : 'text-gray-200'}`}>
            Quét mã khay (carrier code)
          </h3>
        </div>

        {/* Input + Ô hình Camera cạnh nhau */}
        <div className="flex items-center gap-2.5">
          {/* Ô text input nhập mã khay */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>

            <input
              type="text"
              autoFocus
              value={carrierCode}
              onChange={(e) => onChangeCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập hoặc quét mã khay (ví dụ: CRR-A089, CRR-B012)..."
              className={`w-full pl-10 pr-9 py-3 text-sm font-mono font-bold rounded-xl border transition-all outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50/80 border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                  : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
              }`}
            />

            {/* Quick Clear */}
            {carrierCode && (
              <button
                type="button"
                onClick={onClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
                title="Xóa mã"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Ô hình Camera bên cạnh */}
          <button
            type="button"
            onClick={onOpenCamModal}
            className={`px-4 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isFoxconn
                ? 'bg-blue-50 hover:bg-blue-100 text-[#002766] border-blue-200 hover:border-blue-300'
                : 'bg-[#76B900]/15 hover:bg-[#76B900]/25 text-[#76B900] border-[#76B900]/40 hover:border-[#76B900]'
            }`}
            title="Mở Camera quét mã khay"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="hidden sm:inline font-black">Camera</span>
          </button>
        </div>

        {/* Ghi chú: Nhấn enter hoặc dùng Camera/Súng quét để gửi tự động */}
        <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-medium">
          <div className="flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
            <span>↵</span>
            <span>Enter</span>
          </div>
          <span>hoặc dùng</span>
          <span className={`font-bold ${isFoxconn ? 'text-slate-700 dark:text-zinc-300' : 'text-gray-200'}`}>Camera / Súng quét</span>
          <span>để gửi tự động.</span>
        </div>

        {/* Scan Error Display */}
        {scanError && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{scanError}</span>
          </div>
        )}
      </div>

      {/* 2. Khung xem trước thông tin khay trực tiếp (Live Preview Card) */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200/90 shadow-xs'
            : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
        }`}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/70 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h4 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800 dark:text-zinc-100' : 'text-gray-200'}`}>
              Thông tin khay đã quét (Live Preview)
            </h4>
          </div>

          {scannedCarrier && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/15 text-red-500 border border-red-500/30">
              ● {scannedCarrier.status || 'LOCKED'}
            </span>
          )}
        </div>

        {scannedCarrier ? (
          <div className="space-y-4">
            {/* Main Header of Scanned Carrier */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50/80 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-black text-slate-900 dark:text-white">
                    {scannedCarrier.carrierCode}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                    {scannedCarrier.carrierType || 'Tray'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  RFID: <span className="font-mono font-medium">{scannedCarrier.rfidTag || 'N/A'}</span>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 block uppercase font-bold">
                  Vị trí chuyền & Trạm
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {scannedCarrier.lineName} • {scannedCarrier.stationName || 'SMT'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">
                  {scannedCarrier.productName || 'GB200 NVL72'}
                </span>
              </div>
            </div>

            {/* Cycles and Deviation Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Cycles bar */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                  <span className="text-slate-600 dark:text-zinc-400">Chu kỳ sử dụng:</span>
                  <span className="font-mono text-red-500">
                    {scannedCarrier.currentCycles} / {scannedCarrier.maxCycles} (
                    {scannedCarrier.usagePercentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      scannedCarrier.usagePercentage >= 100
                        ? 'bg-red-500'
                        : scannedCarrier.usagePercentage >= 80
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, scannedCarrier.usagePercentage || 95)}%` }}
                  />
                </div>
              </div>

              {/* Coplanarity */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-zinc-400">Dung sai độ phẳng:</span>
                  <span
                    className={`font-mono ${
                      (scannedCarrier.coplanarityDeviation || 0) > 0.08
                        ? 'text-red-500'
                        : 'text-emerald-500'
                    }`}
                  >
                    {scannedCarrier.coplanarityDeviation || 0.05} mm
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1.5 block">
                  Ngưỡng tiêu chuẩn cho phép: &le; 0.08 mm
                </span>
              </div>
            </div>

            {/* Lock Reason Box */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs">
              <span className="font-bold block mb-1">⚠️ Lý do khóa hiện tại:</span>
              <p>{scannedCarrier.lockReason || 'Khay bị khóa bởi hệ thống kiểm soát chất lượng tự động.'}</p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-slate-100 dark:bg-zinc-800/80 text-slate-400 dark:text-zinc-500 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <h5 className={`text-xs font-bold ${isFoxconn ? 'text-slate-700 dark:text-zinc-300' : 'text-gray-200'}`}>
              Chưa có mã khay nào được quét
            </h5>
            <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1 max-w-sm mx-auto">
              Vui lòng nhập mã khay vào ô phía trên rồi nhấn Enter hoặc nhấn nút Camera để quét mã vạch tự động.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

