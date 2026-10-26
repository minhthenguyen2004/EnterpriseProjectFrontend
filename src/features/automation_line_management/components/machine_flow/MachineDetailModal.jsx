import useTheme from '../../../../hooks/useTheme';
import MachineStatusBadge from './MachineStatusBadge';

export default function MachineDetailModal({ machine, onClose }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!machine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-3xl border shadow-2xl p-6 transition-all duration-300 ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-800 text-white backdrop-blur-xl'
        }`}
      >
        {/* Header Modal */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-mono font-bold ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
                {machine.stationNo}
              </span>
              <MachineStatusBadge status={machine.status} />
            </div>
            <h2 className={`text-lg font-black ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>{machine.name}</h2>
            <p className={`text-xs mt-0.5 ${isFoxconn ? 'text-slate-500' : 'text-white/80'}`}>{machine.model}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body Thông Số Telemetry */}
        <div className="py-4 space-y-4 text-xs">
          {/* Thông số Sản lượng */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-3 rounded-2xl border ${isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-800/80 border-zinc-700'}`}>
              <div className={`text-[10px] uppercase font-bold ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>Input</div>
              <div className={`text-base font-black font-mono mt-0.5 ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>{machine.input?.toLocaleString()}</div>
            </div>
            <div className={`p-3 rounded-2xl border ${isFoxconn ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'}`}>
              <div className="text-[10px] uppercase font-bold">Output</div>
              <div className="text-base font-black font-mono mt-0.5">{machine.output?.toLocaleString()}</div>
            </div>
            <div className={`p-3 rounded-2xl border ${isFoxconn ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`}>
              <div className="text-[10px] uppercase font-bold">Phế phẩm (NG)</div>
              <div className="text-base font-black font-mono mt-0.5">{machine.ngCount} pcs</div>
            </div>
          </div>

          {/* Cảm biến telemetry */}
          <div className={`p-4 rounded-2xl border space-y-2.5 ${isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-800/60 border-zinc-800'}`}>
            <div className={`text-[11px] font-black uppercase tracking-wider mb-1 ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
              Cảm biến vận hành (Telemetry Data)
            </div>
            <div className="flex justify-between items-center">
              <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Nhiệt độ cảm biến / buồng:</span>
              <span className={`font-mono font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>{machine.temp || '24.0°C'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Áp suất khí nén:</span>
              <span className={`font-mono font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>{machine.pressure || '6.0 bar'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Takt Time trạm:</span>
              <span className={`font-mono font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>{machine.taktTime}s / pcs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Tỷ lệ khả dụng Uptime:</span>
              <span className={`font-mono font-bold ${isFoxconn ? 'text-emerald-500' : 'text-[#76B900]'}`}>{machine.uptimePct || 98.0}%</span>
            </div>
          </div>

          {/* Mạng & Kết nối */}
          <div className={`p-4 rounded-2xl border space-y-2.5 ${isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-800/60 border-zinc-800'}`}>
            <div className={`text-[11px] font-black uppercase tracking-wider mb-1 ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
              Hạ tầng kết nối mạng
            </div>
            <div className="flex justify-between items-center">
              <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Địa chỉ IP trạm:</span>
              <code className={`font-mono font-bold px-1.5 py-0.5 rounded text-[11px] ${
                isFoxconn ? 'bg-slate-200 text-slate-800' : 'bg-zinc-800 text-white border border-zinc-700'
              }`}>
                {machine.ip || '192.168.10.x'}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Giao thức công nghiệp:</span>
              <span className={`font-bold ${isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}`}>{machine.protocol || 'SECS/GEM'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isFoxconn ? 'text-slate-500' : 'text-white'}>Kỹ thuật viên ca:</span>
              <span className={`font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>{machine.operator || 'Chưa gán'}</span>
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-black'
            }`}
          >
            Đóng Hộp Thoại
          </button>
        </div>
      </div>
    </div>
  );
}
