import MachineStatusKpiCard from './MachineStatusKpiCard';

export default function MachineStatusTopKpiRow({ kpiMetrics }) {
  if (!kpiMetrics) return null;

  const {
    total,
    runningCount,
    runningPct,
    stoppedCount,
    stopCount,
    idleCount,
    errorCount,
  } = kpiMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
      {/* 1. TỔNG SỐ MÁY */}
      <MachineStatusKpiCard
        title="TỔNG SỐ MÁY"
        value={total}
        unit="máy"
        badgeType="neutral"
        accentColor="blue"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        }
      />

      {/* 2. SỐ MÁY ĐANG CHẠY */}
      <MachineStatusKpiCard
        title="ĐANG HOẠT ĐỘNG"
        value={runningCount}
        unit="máy"
        badge={`${runningPct}%`}
        badgeType={runningPct >= 85 ? 'success' : 'warning'}
        accentColor="emerald"
        icon={
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      {/* 3. SỐ MÁY DỪNG */}
      <MachineStatusKpiCard
        title="DỪNG HOẠT ĐỘNG"
        value={stoppedCount}
        unit="máy"
        badge={errorCount > 0 ? `${errorCount} LỖI` : 'BÌNH THƯỜNG'}
        badgeType={errorCount > 0 ? 'danger' : 'warning'}
        accentColor={errorCount > 0 ? 'rose' : 'amber'}
        icon={
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        
      />
    </div>
  );
}
