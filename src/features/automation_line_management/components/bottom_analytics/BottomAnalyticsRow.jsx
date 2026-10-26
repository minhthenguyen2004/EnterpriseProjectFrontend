import TopErrorCodeWidget from './TopErrorCodeWidget';
import YieldOutputTrendWidget from './YieldOutputTrendWidget';
import MachineRuntimeWidget from './MachineRuntimeWidget';

export default function BottomAnalyticsRow({
  topErrors = [],
  hourlyTrend = [],
  runtimeOverview,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-12 gap-4">
      {/* 1. TOP ERROR CODES (Chiếm 4 cột) */}
      <div className="xl:col-span-4 flex flex-col">
        <TopErrorCodeWidget errors={topErrors} />
      </div>

      {/* 2. YIELD RATE & OUTPUT THEO GIỜ (Chiếm 5 cột) */}
      <div className="xl:col-span-5 flex flex-col">
        <YieldOutputTrendWidget data={hourlyTrend} />
      </div>

      {/* 3. MACHINE RUNTIME TẤT CẢ MÁY (Chiếm 3 cột) */}
      <div className="xl:col-span-3 flex flex-col">
        <MachineRuntimeWidget runtimeOverview={runtimeOverview} />
      </div>
    </div>
  );
}
