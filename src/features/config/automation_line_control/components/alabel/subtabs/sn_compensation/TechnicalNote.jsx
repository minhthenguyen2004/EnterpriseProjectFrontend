export default function TechnicalNote({isFoxconn}) {
    return(
        <div
        className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
          isFoxconn
            ? 'bg-amber-50/80 border-amber-300 text-amber-900 shadow-xs'
            : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
        }`}
      >
        <span className="text-base shrink-0 mt-0.5 select-none">⚠️</span>
        <div className="space-y-0.5 leading-relaxed">
          <p className="font-semibold text-[11px] sm:text-xs">
            <strong>Lưu ý:</strong> Nạp bù dữ liệu SNDetails từ Step 1 đến TargetStep qua Stored Procedure{' '}
            <code className="px-1.5 py-0.5 rounded font-mono font-bold bg-amber-200/60 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200">
              [AutoLine].[Shared_ManualInsertSn]
            </code>.
          </p>
          <p className="text-[10px] sm:text-[11px] opacity-85">
            Thao tác này sẽ tự động khởi tạo dữ liệu cho Serial Number và khay đồ gá mang bản mạch, đồng thời chèn liên hoàn các bản ghi từ công đoạn đầu tiên đến TargetStep tương ứng.
          </p>
        </div>
      </div>
    )
}