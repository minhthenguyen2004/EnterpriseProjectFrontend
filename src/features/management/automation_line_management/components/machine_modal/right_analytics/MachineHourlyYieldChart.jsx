import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';
import useTheme from '../../../../../../hooks/useTheme';

export default function MachineHourlyYieldChart({ data = [] }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div
          className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-md ${
            isFoxconn
              ? 'bg-white/95 border-slate-200 text-slate-800'
              : 'bg-zinc-950/95 border-zinc-700 text-white'
          }`}
        >
          <div className={`font-bold text-xs pb-1 mb-1.5 border-b border-slate-200 dark:border-zinc-800 ${isFoxconn ? 'text-slate-800' : 'text-zinc-400'}`}>
            Khung giờ: <span className="text-white font-black">{d.hour}</span>
          </div>
          <div className="space-y-1 font-bold">
            <div className="flex justify-between gap-4">
              <span className="text-emerald-500 font-semibold">Pass Qty:</span>
              <span className="font-black text-emerald-500">{d.passQty} pcs</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-rose-500 font-semibold">Fail Qty:</span>
              <span className="font-black text-rose-500">{d.failQty} pcs</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-100 dark:border-zinc-800">
              <span className="font-semibold">Yield Rate:</span>
              <span className={`font-black ${isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}`}>
                {d.yieldRate}%
              </span>
            </div>
          </div>
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
              isFoxconn ? 'bg-emerald-600' : 'bg-[#76B900] shadow-[0_0_8px_#76B900]'
            }`}
          />
          <h4
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-700' : 'text-white'
            }`}
          >
            Machine Yield Rate & Output
          </h4>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isFoxconn ? 'bg-emerald-50 text-emerald-700' : 'bg-[#76B900]/15 text-[#76B900]'
          }`}
        >
          Scale: 0 - 100%
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
              domain={[0, 100]}
              tickLine={false}
              axisLine={{ stroke: isFoxconn ? '#cbd5e1' : '#3f3f46' }}
              tick={{
                fill: isFoxconn ? '#64748b' : '#ffffff',
                fontSize: 9,
                fontWeight: 700,
              }}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={98.0}
              stroke="#ef4444"
              strokeDasharray="3 3"
              label={{
                value: 'Target: 98%',
                position: 'insideTopRight',
                fill: '#ef4444',
                fontSize: 9,
                fontWeight: 700,
              }}
            />
            <Bar
              dataKey="yieldRate"
              fill={isFoxconn ? '#002766' : '#76B900'}
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
