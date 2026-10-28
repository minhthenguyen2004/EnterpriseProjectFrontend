import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import useTheme from '../../../../../../hooks/useTheme';

export default function MachineHourlyErrorCodeChart({ data = [] }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div
          className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-md min-w-50 ${
            isFoxconn
              ? 'bg-white/95 border-slate-200 text-slate-800'
              : 'bg-zinc-950/95 border-zinc-700 text-white'
          }`}
        >
          <div className="font-bold text-xs pb-1 mb-1.5 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400">
            Khung giờ: <span className={isFoxconn ? 'text-slate-900 font-black' : 'text-white font-black'}>{d.hour}</span>
          </div>

          <div className="flex justify-between items-center mb-1.5 font-bold">
            <span className="text-rose-500">Tổng số lỗi:</span>
            <span className="text-rose-500 font-mono font-black text-sm">{d.totalErrors} lỗi</span>
          </div>

          {d.errors && d.errors.length > 0 ? (
            <div className="space-y-1 pt-1.5 border-t border-slate-100 dark:border-zinc-800 font-mono text-[11px]">
              {d.errors.map((err, i) => (
                <div key={i} className="flex justify-between items-center gap-2">
                  <span className="text-slate-500 dark:text-zinc-400 truncate">
                    {err.code} ({err.name})
                  </span>
                  <span className="font-black text-rose-500 shrink-0">x{err.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[10px] text-emerald-500 font-medium">Không phát sinh mã lỗi</div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`p-3.5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-slate-50/90 border-slate-200 shadow-2xs'
          : 'bg-zinc-900/90 border-zinc-800 text-white shadow-md'
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isFoxconn ? 'bg-rose-600' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
            }`}
          />
          <h4
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-700' : 'text-white'
            }`}
          >
            Machine Error Code
          </h4>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isFoxconn ? 'bg-rose-50 text-rose-700' : 'bg-rose-500/15 text-rose-400'
          }`}
        >
          Lỗi Theo Giờ
        </span>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isFoxconn ? '#e2e8f0' : '#27272a'}
              vertical={false}
            />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={{ stroke: isFoxconn ? '#cbd5e1' : '#3f3f46' }}
              tick={{
                fill: isFoxconn ? '#64748b' : '#ffffff',
                fontSize: 9,
                fontWeight: 600,
              }}
              interval={0}
              tickFormatter={(v) => v.split(' - ')[0]}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: isFoxconn ? '#cbd5e1' : '#3f3f46' }}
              tick={{
                fill: isFoxconn ? '#64748b' : '#ffffff',
                fontSize: 9,
                fontWeight: 700,
              }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="totalErrors"
              fill={isFoxconn ? '#e11d48' : '#f43f5e'}
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
