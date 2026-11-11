import useTheme from '../../../../hooks/useTheme';

export default function ProductionRoutingTable({
  routingSteps = [],
  completedSteps = 6,
  totalSteps = 10,
  selectedStepNumber = 6,
  onSelectStep
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const percentCompleted = Math.round((completedSteps / Math.max(1, totalSteps)) * 100);

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      {/* 1. Tiêu đề bảng + Tiến độ hoàn thành (ví dụ: 6/10) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-200/70 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
              isFoxconn
                ? 'bg-blue-50 text-[#002766] border border-blue-200'
                : 'bg-[#76B900]/15 text-[#76B900] border border-[#76B900]/30'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
              Lộ trình sản xuất
            </h3>
            <p className={`text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
              Danh sách các bước công đoạn và lịch sử di chuyển qua trạm
            </p>
          </div>
        </div>

        {/* Huy hiệu hiển thị số bước hoàn thành */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">
              Tiến độ hoàn thành
            </span>
            <div className="flex items-center gap-1.5 justify-end">
              <span
                className={`text-xs font-black px-2 py-0.5 rounded-lg border ${
                  isFoxconn
                    ? 'bg-blue-50 text-[#002766] border-blue-200'
                    : 'bg-[#76B900]/20 text-[#76B900] border-[#76B900]/40 shadow-[0_0_10px_rgba(118,185,0,0.2)]'
                }`}
              >
                {completedSteps}/{totalSteps} bước ({percentCompleted}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bảng Lộ trình: Step | Công đoạn (groupname/station & ngày giờ) | Trạng thái */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className={`text-[11px] uppercase font-bold tracking-wider border-b ${
                isFoxconn
                  ? 'bg-slate-50 text-slate-600 border-slate-200'
                  : 'bg-zinc-950/80 text-zinc-400 border-zinc-800'
              }`}
            >
              <th className="py-3 px-4 w-20 text-center">Step</th>
              <th className="py-3 px-4">Công đoạn (Station / Group Name & Ngày giờ)</th>
              <th className="py-3 px-4 w-36 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
            {routingSteps.map((step) => {
              const isSelected = selectedStepNumber === step.stepNumber;
              return (
                <tr
                  key={step.stepNumber}
                  onClick={() => onSelectStep(step.stepNumber)}
                  className={`transition-all cursor-pointer ${
                    isSelected
                      ? isFoxconn
                        ? 'bg-blue-50/90 font-semibold border-l-4 border-l-[#002766]'
                        : 'bg-[#76B900]/10 font-semibold border-l-4 border-l-[#76B900]'
                      : isFoxconn
                      ? 'hover:bg-slate-50/80'
                      : 'hover:bg-zinc-800/40'
                  }`}
                >
                  {/* Cột 1: Step */}
                  <td className="py-3.5 px-4 text-center font-mono font-black text-xs text-slate-700 dark:text-zinc-300">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-bold ${
                        isSelected
                          ? isFoxconn
                            ? 'bg-[#002766] text-white'
                            : 'bg-[#76B900] text-black font-black'
                          : isFoxconn
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {String(step.stepNumber).padStart(2, '0')}
                    </span>
                  </td>

                  {/* Cột 2: Công đoạn (Group Name / Station Name & Ngày giờ qua step) */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-black text-xs ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
                        {step.stationName}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-[#002766] dark:bg-[#76B900]/20 dark:text-[#76B900]">
                          Đang chọn
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 dark:text-zinc-400">
                      {/* Ngày giờ qua step */}
                      <div className={`flex items-center gap-1 font-mono ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {step.passTimestamp ? step.passTimestamp : 'Chưa ghi nhận thời gian'}
                        </span>
                      </div>

                      {step.stationDescription && (
                        <span className="hidden md:inline truncate max-w-xs text-[10px] text-slate-400 dark:text-zinc-500">
                          • {step.stationDescription}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Cột 3: Trạng thái (pass / fail / chưa chạy) */}
                  <td className="py-3.5 px-4 text-center">
                    {step.status === 'PASS' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                        <span>✅</span>
                        <span>PASS</span>
                      </span>
                    )}

                    {step.status === 'FAIL' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700 animate-pulse">
                        <span>❌</span>
                        <span>FAIL</span>
                      </span>
                    )}

                    {step.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                        <span>⏳</span>
                        <span>CHƯA CHẠY</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

