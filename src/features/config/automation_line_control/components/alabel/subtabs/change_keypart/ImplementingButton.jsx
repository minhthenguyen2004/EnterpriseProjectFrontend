export default function ImplementingButton({
  isFoxconn,
  isExecuting,
  canExecute,
  onExecute,
  onReset,
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
      {/* Nút phụ: Làm sạch form */}
      <button
        type="button"
        disabled={isExecuting}
        onClick={onReset}
        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border select-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
          isFoxconn
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
        }`}
      >
        Làm Sạch Form
      </button>

      {/* Nút hành động chính: Xác nhận thay đổi giá trị keypart (sndetaildatas) */}
      <button
        type="button"
        disabled={isExecuting || !canExecute}
        onClick={() => onExecute('change_keypart')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${
          isFoxconn
            ? 'bg-[#002766] hover:bg-blue-900 text-white shadow-blue-950/20'
            : 'bg-[#76B900] hover:bg-[#88d400] text-black font-extrabold shadow-[#76B900]/25'
        }`}
        title={
          !canExecute
            ? 'Vui lòng nhập đầy đủ mã đối tượng, chọn keypart và nhập giá trị mới hợp lệ'
            : 'Cập nhật giá trị linh kiện mới vào bảng sndetaildatas trên server ALABEL'
        }
      >
        {isExecuting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Đang cập nhật sndetaildatas...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Xác nhận thay đổi giá trị keypart (sndetaildatas)</span>
          </>
        )}
      </button>
    </div>
  );
}
