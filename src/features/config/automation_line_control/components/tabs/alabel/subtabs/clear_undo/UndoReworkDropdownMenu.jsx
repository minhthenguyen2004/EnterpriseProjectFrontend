export default function UndoReworkDropdownMenu({ isFoxconn, currentClearStep, ROUTER_STEPS_LIST, handleClearStepChange }) {
    return(
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className={`text-xs font-bold ${ isFoxconn ? "text-slate-700" : "dark:text-zinc-200"} flex items-center gap-1.5`}>
                <span>Giải Undo / Rework Đến Step</span>
                </label>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700">
                TÙY CHỌN (OPTIONAL)
                </span>
            </div>
            <select
                value={currentClearStep}
                onChange={(e) => handleClearStepChange(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-zinc-950/70 border-zinc-700 text-zinc-100'
                }`}
            >
                <option value="" className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
                -- Toàn bộ chu kỳ / Giữ nguyên step hiện tại (Mặc định) --
                </option>
                {ROUTER_STEPS_LIST.map((stepItem) => (
                <option
                    key={stepItem.step}
                    value={stepItem.step}
                    className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
                >
                    {stepItem.label}
                </option>
                ))}
            </select>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                Nếu chọn step cụ thể, đối tượng sẽ được giải cờ và chuyển tiếp tục từ công đoạn tương ứng.
            </p>
        </div>
    )
}