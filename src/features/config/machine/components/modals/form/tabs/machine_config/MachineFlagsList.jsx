import { MACHINE_FLAGS_CONFIG } from '../../constants/formModalConstants';

export default function MachineFlagsList({
  formData = {},
  onChange,
  isFoxconn
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-black uppercase tracking-wider ${
            isFoxconn ? 'text-slate-700' : 'text-zinc-300'
          }`}
        >
          ⚙️ Cờ Hoạt Động Trạm Máy (Machine Flags)
        </span>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
            isFoxconn
              ? 'bg-slate-100 text-slate-600 border-slate-200'
              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          }`}
        >
          5 Trạng Thái Vận Hành
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {MACHINE_FLAGS_CONFIG.map((flag) => {
          const isChecked = Boolean(formData[flag.key]);

          return (
            <label
              key={flag.key}
              className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? isFoxconn
                    ? 'bg-blue-50/70 border-blue-300 shadow-xs'
                    : 'bg-zinc-800/80 border-[#76B900]/50 shadow-[0_0_12px_rgba(118,185,0,0.15)]'
                  : isFoxconn
                  ? 'bg-white border-slate-200 hover:bg-slate-50/80'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/40'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onChange && onChange(flag.key, e.target.checked)}
                className={`mt-0.5 w-4 h-4 rounded cursor-pointer transition-colors ${
                  isFoxconn
                    ? 'accent-blue-600 border-slate-300 text-blue-600'
                    : 'accent-[#76B900] border-zinc-700 text-[#76B900]'
                }`}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-black tracking-tight ${
                      isChecked
                        ? isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
                        : isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                    }`}
                  >
                    {flag.label}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                      isChecked
                        ? isFoxconn
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#76B900] text-black font-black'
                        : isFoxconn
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isChecked ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <p
                  className={`text-[11px] mt-0.5 leading-relaxed ${
                    isFoxconn ? 'text-slate-600' : 'text-zinc-400'
                  }`}
                >
                  {flag.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
