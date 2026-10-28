import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import useTheme from '../../../../../hooks/useTheme';

export default function YieldOutputTrendWidget({ data = [] }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Màu sắc cột Bar và đường Line theo từng theme
  const barColor = isFoxconn ? '#002766' : '#0284c7';
  const barBorder = isFoxconn ? '#003893' : '#38bdf8';
  const lineColor = isFoxconn ? '#059669' : '#76B900';
  const gridColor = isFoxconn ? '#e2e8f0' : '#27272a';

  // Màu chữ cho trục tọa độ để đảm bảo hiển thị rõ nét 100% theo từng thương hiệu
  const xAxisTickColor = isFoxconn ? '#0f172a' : '#ffffff';
  const yAxisOutputTickColor = isFoxconn ? '#002766' : '#ffffff';
  const yAxisYieldTickColor = isFoxconn ? '#047857' : '#76B900';

  return (
    <div
      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-sm text-slate-900'
          : 'bg-zinc-900/95 border-zinc-800 text-white shadow-xl'
      }`}
    >
      {/* Header Widget */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isFoxconn
                ? 'bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.4)]'
                : 'bg-[#76B900] shadow-[0_0_8px_rgba(118,185,0,0.7)]'
            }`}
          />
          <h3
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-900' : 'text-white'
            }`}
          >
            2. XU HƯỚNG OUTPUT & YIELD RATE THEO GIỜ
          </h3>
        </div>

        {/* Chú giải (Legend) với chữ rõ nét theo theme */}
        <div className="flex items-center gap-3 text-[11px] font-bold">
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-2 rounded-xs inline-block"
              style={{ backgroundColor: barColor, border: `1px solid ${barBorder}` }}
            />
            <span className={isFoxconn ? 'text-[#002766] font-bold' : 'text-white font-bold'}>
              Output (Cột)
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-1 rounded-full inline-block"
              style={{ backgroundColor: lineColor }}
            />
            <span className={isFoxconn ? 'text-emerald-700 font-black' : 'text-[#76B900] font-black'}>
              Yield Rate % (Đường)
            </span>
          </span>
        </div>
      </div>

      {/* Recharts Container - Cung cấp key={brand} để Recharts tự động render lại text SVG khi đổi theme */}
      <div className="w-full h-64 mt-2">
        <ResponsiveContainer key={`trend-container-${brand}`} width="100%" height="100%">
          <ComposedChart
            key={`trend-chart-${brand}`}
            data={data}
            margin={{ top: 14, right: 14, left: 2, bottom: 2 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

            {/* Trục X: Khung Giờ (Chữ đậm nét, màu sắc tối ưu theo theme) */}
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={{ stroke: isFoxconn ? '#cbd5e1' : '#52525b' }}
              tick={{
                fontSize: 11,
                fill: xAxisTickColor,
                fontWeight: 800,
              }}
              dy={4}
            />

            {/* Trục Y trái: Output (Sản lượng) - Có width để không bị che khuất số */}
            <YAxis
              yAxisId="left"
              domain={[350, 500]}
              tickLine={false}
              axisLine={false}
              width={38}
              tick={{
                fontSize: 11,
                fill: yAxisOutputTickColor,
                fontWeight: 800,
              }}
            />

            {/* Trục Y phải: Yield % (Tỷ lệ đạt chuẩn) - Có width và % hiển thị rõ nét */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[96.0, 100.0]}
              tickLine={false}
              axisLine={false}
              unit="%"
              width={44}
              tick={{
                fontSize: 11,
                fill: yAxisYieldTickColor,
                fontWeight: 800,
              }}
            />

            {/* Tooltip hiển thị chữ rõ nét 100% phụ thuộc chính xác vào Foxconn / NVIDIA */}
            <Tooltip
              cursor={{
                fill: isFoxconn ? 'rgba(0, 39, 102, 0.04)' : 'rgba(255, 255, 255, 0.05)',
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      className={`p-3 rounded-xl border text-xs shadow-2xl backdrop-blur-md transition-all ${
                        isFoxconn
                          ? 'bg-white/95 border-slate-300 text-slate-900 shadow-slate-900/15'
                          : 'bg-zinc-950/95 border-zinc-700 text-white shadow-black/90'
                      }`}
                    >
                      {/* Tiêu đề khung giờ */}
                      <div
                        className={`font-black text-[12px] pb-1.5 mb-1.5 border-b ${
                          isFoxconn
                            ? 'border-slate-200 text-slate-900'
                            : 'border-zinc-800 text-white'
                        }`}
                      >
                        Khung giờ:{' '}
                        <span className={`font-mono font-bold ${isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}`}>
                          {label}
                        </span>
                      </div>

                      {/* Thông số Output */}
                      <div className="flex items-center justify-between gap-6 py-0.5">
                        <span className={`font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
                          Output:
                        </span>
                        <strong
                          className={`font-mono text-sm font-black ${
                            isFoxconn ? 'text-[#002766]' : 'text-white'
                          }`}
                        >
                          {payload[0]?.value} pcs
                        </strong>
                      </div>

                      {/* Thông số Yield Rate */}
                      <div className="flex items-center justify-between gap-6 py-0.5">
                        <span className={`font-bold ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
                          Yield Rate:
                        </span>
                        <strong
                          className={`font-mono text-sm font-black ${
                            isFoxconn ? 'text-emerald-700' : 'text-[#76B900]'
                          }`}
                        >
                          {payload[1]?.value}%
                        </strong>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Đường Target Yield 98.5% với chữ target rõ nét theo theme */}
            <ReferenceLine
              y={98.5}
              yAxisId="right"
              stroke={isFoxconn ? '#dc2626' : '#f43f5e'}
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Target: 98.5%',
                position: 'insideTopLeft',
                fill: isFoxconn ? '#991b1b' : '#ff85a0',
                fontSize: 10,
                fontWeight: 800,
              }}
            />

            {/* Cột Bar: Output */}
            <Bar
              yAxisId="left"
              dataKey="output"
              fill={barColor}
              stroke={barBorder}
              radius={[6, 6, 0, 0]}
              barSize={20}
            />

            {/* Đường Line: Yield % */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="yieldRate"
              stroke={lineColor}
              strokeWidth={3}
              dot={{
                r: 4,
                fill: lineColor,
                stroke: isFoxconn ? '#ffffff' : '#18181b',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: lineColor,
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer info: chữ hiển thị rõ nét tương ứng theo từng theme */}
      <div
        className={`mt-2 pt-2.5 border-t flex items-center justify-between text-[11px] ${
          isFoxconn
            ? 'border-slate-200 text-slate-800'
            : 'border-zinc-800 text-white'
        }`}
      >
        <span className={isFoxconn ? 'text-slate-700 font-semibold' : 'text-zinc-200 font-medium'}>
          Kế hoạch nhịp: <strong className={isFoxconn ? 'text-slate-900 font-bold' : 'text-white font-bold'}>450 pcs/h</strong>
        </span>
        <span
          className={`font-black px-2 py-0.5 rounded-md ${
            isFoxconn
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-[#76B900]/15 text-[#76B900] border border-[#76B900]/30'
          }`}
        >
          Đạt 96.2% mục tiêu ca
        </span>
      </div>
    </div>
  );
}
