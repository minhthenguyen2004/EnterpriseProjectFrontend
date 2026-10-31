/**
 * Khung giải nghĩa & cơ chế giám sát UPH & Takt Time (Card 2 của Tab 4)
 * Giải thích chi tiết 3 nguyên lý:
 * 1. Target UPH (Sản lượng mục tiêu/giờ)
 * 2. Target Cycle Time (Takt Time nhịp chuyền)
 * 3. Warning Tolerance (% Dung sai cảnh báo)
 */
export default function UphExplanation({
  isFoxconn = false,
  targetUph = 120,
  targetCycleTime = 30.0,
  warningTolerance = 5.0
}) {
  const numUph = parseFloat(targetUph) || 120;
  const numTol = parseFloat(warningTolerance) || 5.0;
  const minUph = Math.round(numUph * (1 - numTol / 100));
  const maxUph = Math.round(numUph * (1 + numTol / 100));

  return (
    <div
      className={`rounded-2xl border p-4.5 sm:p-5 transition-colors ${
        isFoxconn
          ? 'bg-slate-50/70 border-slate-200'
          : 'bg-zinc-950/60 border-zinc-800'
      }`}
    >
      {/* Tiêu đề Khung Giải Nghĩa */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base text-blue-500">ℹ️</span>
        <h4
          className={`text-xs font-black uppercase tracking-wider ${
            isFoxconn ? 'text-slate-800' : 'text-zinc-200'
          }`}
        >
          Ý nghĩa & cơ chế giám sát UPH & Takt Time:
        </h4>
      </div>

      {/* Danh sách 3 nguyên lý kỹ thuật */}
      <div className="space-y-3 text-xs leading-relaxed">
        {/* Mục 1 */}
        <div className="flex items-start gap-2.5">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 ${
              isFoxconn
                ? 'bg-blue-100 text-[#002766]'
                : 'bg-zinc-800 text-[#76B900]'
            }`}
          >
            1
          </span>
          <div>
            <strong className={isFoxconn ? 'text-slate-900 font-bold' : 'text-zinc-100 font-bold'}>
              Target UPH (Sản lượng mục tiêu/giờ):
            </strong>{' '}
            <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
              Số lượng sản phẩm yêu cầu chuyền/trạm đạt được trong 1 giờ (Units Per Hour).
            </span>
          </div>
        </div>

        {/* Mục 2 */}
        <div className="flex items-start gap-2.5">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 ${
              isFoxconn
                ? 'bg-blue-100 text-[#002766]'
                : 'bg-zinc-800 text-[#76B900]'
            }`}
          >
            2
          </span>
          <div>
            <strong className={isFoxconn ? 'text-slate-900 font-bold' : 'text-zinc-100 font-bold'}>
              Target Cycle Time (Takt Time nhịp chuyền):
            </strong>{' '}
            <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
              Thời gian chu kỳ mục tiêu trên mỗi sản phẩm (giây). Tự động tính toán theo công thức{' '}
              <code
                className={`px-1.5 py-0.5 rounded font-mono font-bold text-[11px] ${
                  isFoxconn
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-zinc-900 text-[#76B900] border border-zinc-700'
                }`}
              >
                3600 / Target UPH
              </code>
              .
            </span>
          </div>
        </div>

        {/* Mục 3 */}
        <div className="flex items-start gap-2.5">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 ${
              isFoxconn
                ? 'bg-blue-100 text-[#002766]'
                : 'bg-zinc-800 text-[#76B900]'
            }`}
          >
            3
          </span>
          <div>
            <strong className={isFoxconn ? 'text-slate-900 font-bold' : 'text-zinc-100 font-bold'}>
              Warning Tolerance (% Dung sai cảnh báo):
            </strong>{' '}
            <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
              Ngưỡng % dung sai dao động cho phép trước khi kích hoạt cảnh báo suy giảm hiệu suất chuyền trên Dashboard OEE.
            </span>
          </div>
        </div>
      </div>

      {/* Thanh trực quan dải thông số giám sát hiện tại */}
      <div
        className={`mt-4 pt-3.5 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] ${
          isFoxconn ? 'border-slate-200 text-slate-600' : 'border-zinc-800 text-zinc-400'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">Dải kiểm soát OEE:</span>
          <span
            className={`px-2 py-0.5 rounded-md font-mono font-bold ${
              isFoxconn
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
            }`}
          >
            {minUph} ~ {maxUph} p/h
          </span>
          <span className="opacity-75">
            (±{numTol}%)
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <span>
            Nhịp chuẩn: <strong className={isFoxconn ? 'text-slate-800' : 'text-zinc-200'}>{targetCycleTime}s/cái</strong>
          </span>
          <span>
            Định mức: <strong className={isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}>{targetUph} cái/h</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
