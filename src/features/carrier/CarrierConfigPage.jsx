import useTheme from '../../hooks/useTheme';

export default function CarrierConfigPage() {
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
            <span className={isFoxconn ? 'text-blue-700 font-semibold' : 'text-[#76B900] font-semibold'}>CARRIER CONFIG</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">CARRIER CONFIGURATION</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Thiết lập danh mục khay chứa (Tray), giá đỡ linh kiện (Carrier/Pallet), RFID Tag và định mức tải trọng cho hệ thống AGV & Băng chuyền.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
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
            <span>Đăng Ký Carrier Mới</span>
          </button>
        </div>
      </div>

      {/* Grid of Carrier types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { type: 'Standard PCB Tray', code: 'TRAY-STD-01', total: '240 chiếc', active: '198 đang luân chuyển', size: '350 x 250 x 40 mm' },
          { type: 'Heavy Component Carrier', code: 'CRR-HVY-X2', total: '85 chiếc', active: '62 đang luân chuyển', size: '600 x 450 x 120 mm' },
          { type: 'High-Density IC Pallet', code: 'PLT-IC-HD', total: '150 chiếc', active: '144 đang luân chuyển', size: '200 x 200 x 15 mm' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition-all ${
              isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/50 border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isFoxconn ? 'bg-blue-100 text-blue-800' : 'bg-[#76B900]/20 text-[#76B900]'
              }`}>
                {item.code}
              </span>
              <span className="text-xs text-emerald-500 font-semibold">Sẵn sàng</span>
            </div>
            <div className="font-bold text-base">{item.type}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-2 space-y-1">
              <div>Kích thước: <span className="font-semibold text-slate-700 dark:text-zinc-200">{item.size}</span></div>
              <div>Tổng số lượng: <span className="font-semibold text-slate-700 dark:text-zinc-200">{item.total}</span></div>
              <div>Hiện trạng: <span className="font-semibold text-slate-700 dark:text-zinc-200">{item.active}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
