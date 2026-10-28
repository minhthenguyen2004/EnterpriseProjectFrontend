import KpiMetricCard from './KpiMetricCard';

export default function TopKpiRow({ kpi }) {
  if (!kpi) return null;

  const { input, output, yieldRate, uph, cycleTime, performance } = kpi;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-3.5">
      {/* 1. INPUT */}
      <KpiMetricCard
        title="Input (Đầu Vào)"
        value={input.value}
        unit={input.unit}
        status="neutral"
        diff={input.diff}
        icon={
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        }
      />

      {/* 2. OUTPUT */}
      <KpiMetricCard
        title="Output (Đạt Chuẩn)"
        value={output.value}
        unit={output.unit}
        status={output.ngCount > 80 ? 'warning' : 'neutral'}
        icon={
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        }
      />

      {/* 3. YIELD RATE */}
      <KpiMetricCard
        title="Yield Rate (FPY)"
        value={`${yieldRate.value}%`}
        status={yieldRate.value >= 98.5 ? 'success' : yieldRate.value >= 97.0 ? 'warning' : 'danger'}
        icon={
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      {/* 4. UPH */}
      <KpiMetricCard
        title="UPH (Sản Lượng/Giờ)"
        value={uph.value}
        unit={uph.unit}
        diff={uph.diff}
        status={uph.value >= uph.target ? 'success' : 'neutral'}
        icon={
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />

      {/* 5. CYCLE TIME */}
      <KpiMetricCard
        title="Cycle Time (Nhịp Chuyền)"
        value={`${cycleTime.value}s`}
        diff={cycleTime.diff}
        status={cycleTime.value <= cycleTime.standard ? 'success' : 'warning'}
        icon={
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      {/* 6. PERFORMANCE */}
      <KpiMetricCard
        title="Performance (OEE)"
        value={`${performance.value}%`}
        status={performance.value >= performance.target ? 'success' : 'warning'}
        icon={
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
    </div>
  );
}
