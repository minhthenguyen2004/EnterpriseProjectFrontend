import useTheme from '../../../../../../hooks/useTheme';

export default function AoiImagePreviewModal({ item, onClose }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!item) return null;

  const isFail = item.result === 'FAIL' || item.result === 'NG';

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Dialog */}
      <div
        className={`relative z-10 w-full max-w-2xl rounded-2xl border shadow-2xl p-5 transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-950 border-zinc-800 text-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-black ${
                  isFail
                    ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                }`}
              >
                {item.result}
              </span>
              <span className="text-xs font-mono font-bold">{item.camera}</span>
              <span className="text-xs text-slate-400">({item.pov})</span>
            </div>
            <h3 className="text-base font-black tracking-tight">{item.type} Inspection</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Vision Image Canvas Simulation */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-300 dark:border-zinc-700 bg-zinc-950 flex items-center justify-center">
          {/* Simulated optical circuit inspection canvas */}
          <svg className="w-full h-full" viewBox="0 0 600 360" fill="none">
            {/* PCB Background grid */}
            <rect width="600" height="360" fill="#092015" />
            <defs>
              <pattern id="pcbGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0e3a24" strokeWidth="1" />
                <circle cx="15" cy="15" r="1.5" fill="#134e2c" />
              </pattern>
            </defs>
            <rect width="600" height="360" fill="url(#pcbGrid)" />

            {/* Traces */}
            <path d="M 50 100 L 220 100 L 280 160 L 450 160" stroke="#16a34a" strokeWidth="2.5" opacity="0.6" />
            <path d="M 80 260 L 200 260 L 250 210 L 520 210" stroke="#16a34a" strokeWidth="2.5" opacity="0.6" />
            <path d="M 120 40 L 120 320" stroke="#15803d" strokeWidth="2" opacity="0.4" />
            <path d="M 480 40 L 480 320" stroke="#15803d" strokeWidth="2" opacity="0.4" />

            {/* IC Package / BGA Area */}
            <rect x="200" y="90" width="200" height="180" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="215" cy="105" r="4" fill="#a1a1aa" />
            <text x="300" y="185" fill="#71717a" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              NVIDIA B200 DIE
            </text>

            {/* Surface mount components */}
            <rect x="130" y="90" width="40" height="20" rx="2" fill="#382bf0" opacity="0.8" />
            <rect x="130" y="130" width="40" height="20" rx="2" fill="#382bf0" opacity="0.8" />
            <rect x="130" y="170" width="40" height="20" rx="2" fill="#382bf0" opacity="0.8" />

            {/* Bounding Box Inspection Zone */}
            <g>
              <rect
                x="220"
                y="110"
                width="160"
                height="140"
                rx="4"
                fill={isFail ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)'}
                stroke={isFail ? '#ef4444' : '#22c55e'}
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              {/* Corner crosshairs */}
              <path d="M 215 110 L 230 110 M 220 105 L 220 120" stroke={isFail ? '#ef4444' : '#22c55e'} strokeWidth="2" />
              <path d="M 385 110 L 370 110 M 380 105 L 380 120" stroke={isFail ? '#ef4444' : '#22c55e'} strokeWidth="2" />
              <path d="M 215 250 L 230 250 M 220 255 L 220 240" stroke={isFail ? '#ef4444' : '#22c55e'} strokeWidth="2" />
              <path d="M 385 250 L 370 250 M 380 255 L 380 240" stroke={isFail ? '#ef4444' : '#22c55e'} strokeWidth="2" />

              {/* Tag overlay */}
              <rect
                x="220"
                y="86"
                width="120"
                height="22"
                rx="4"
                fill={isFail ? '#ef4444' : '#22c55e'}
              />
              <text x="228" y="101" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="900">
                {item.result} • {item.confidence || '99.5%'}
              </text>
            </g>

            {/* Camera OSD HUD */}
            <text x="20" y="30" fill="#22c55e" fontSize="11" fontFamily="monospace">
              ● REC [AOI-AI VISION] 60FPS
            </text>
            <text x="20" y="50" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
              CAM: {item.camera} | POV: {item.pov}
            </text>
            <text x="580" y="30" fill="#22c55e" fontSize="11" fontFamily="monospace" textAnchor="end">
              ZOOM: 10X | AUTO-FOCUS: LOCK
            </text>
          </svg>
        </div>

        {/* Info detail block */}
        <div className="mt-3.5 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase">
              Chi tiết chẩn đoán thị giác AI:
            </div>
            <div className="font-semibold text-slate-800 dark:text-zinc-200 mt-0.5">
              {item.defectDetail || 'Mối hàn và bề mặt linh kiện hoàn hảo, đạt chuẩn IPC-A-610 Class 3.'}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              isFoxconn
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-[#76B900] text-black font-extrabold hover:bg-[#86d400]'
            }`}
          >
            Đóng Xem Ảnh
          </button>
        </div>
      </div>
    </div>
  );
}
