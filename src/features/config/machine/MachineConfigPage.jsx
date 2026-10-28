import useTheme from '../../../hooks/useTheme';

export default function MachineConfigPage() {
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
            <span className={isFoxconn ? 'text-blue-700 font-semibold' : 'text-[#76B900] font-semibold'}>MACHINE CONFIG</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">MACHINE CONFIGURATION</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Cấu hình giao thức kết nối (SECS/GEM, OPC-UA, MQTT), tham số vận hành và chu kỳ bảo trì máy trạm tự động.
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
            <span>Thêm Cấu Hình Máy Mới</span>
          </button>
        </div>
      </div>

      {/* Machine Protocols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'SMT Pick & Place #01', ip: '192.168.10.101', protocol: 'SECS/GEM', ping: '1.2ms', status: 'Online' },
          { name: 'Reflow Oven Furnace A', ip: '192.168.10.102', protocol: 'OPC-UA', ping: '2.5ms', status: 'Online' },
          { name: 'Automated Optical Inspection (AOI)', ip: '192.168.10.103', protocol: 'REST / WebSocket', ping: '0.8ms', status: 'Online' },
          { name: 'Laser Marking Station #02', ip: '192.168.10.104', protocol: 'Modbus TCP', ping: '3.1ms', status: 'Online' },
          { name: 'Selective Soldering Machine', ip: '192.168.10.105', protocol: 'MQTT', ping: '4.0ms', status: 'Standby' },
          { name: 'ICT / Function Tester B', ip: '192.168.10.106', protocol: 'SECS/GEM', ping: '1.5ms', status: 'Online' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition-all ${
              isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/50 border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isFoxconn ? 'bg-slate-100 text-slate-700' : 'bg-zinc-800 text-zinc-300'
              }`}>
                {item.protocol}
              </span>
              <span className="text-xs text-emerald-500 font-semibold">{item.status}</span>
            </div>
            <div className="font-bold text-sm truncate">{item.name}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-2 flex justify-between items-center">
              <span>IP: <code className="font-mono text-[11px]">{item.ip}</code></span>
              <span>Ping: {item.ping}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
