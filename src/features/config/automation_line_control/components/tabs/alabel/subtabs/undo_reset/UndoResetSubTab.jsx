import { ROUTER_STEPS_LIST } from "../../../../../constants/alabelConstants";
import Undo from "./tab/Undo";

export default function UndoResetSubTab({isFoxconn, handleSubModeChange, subMode, handleResetForm, targetStep, isExecuting, onExecute, targetCode}) {
    return(
        <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className={`text-xs font-bold ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
            Chọn Chế Độ Can Thiệp Quy Trình:
          </label>
          <div
            className={`inline-flex items-center gap-1 p-0.5 rounded-lg border text-xs font-semibold ${
              isFoxconn ? 'bg-slate-100 border-slate-300' : 'bg-zinc-950 border-zinc-700'
            }`}
          >
            <button
              type="button"
              onClick={() => handleSubModeChange('undo')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                subMode === 'undo'
                  ? isFoxconn
                    ? 'bg-blue-700 text-white shadow-xs font-bold'
                    : 'bg-[#76B900] text-black font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              ↩️ Hoàn Tác (Undo)
            </button>
            <button
              type="button"
              onClick={() => handleSubModeChange('cycle_reset')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                subMode === 'cycle_reset'
                  ? isFoxconn
                    ? 'bg-amber-600 text-white shadow-xs font-bold'
                    : 'bg-amber-500 text-black font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              ⚡ Reset Chu Kỳ (Cycle Reset)
            </button>
          </div>
        </div>

        {/* NỘI DUNG KHI CHỌN TAB 1: HOÀN TÁC */}
        {subMode === 'undo' && (
          <Undo
            isFoxconn={isFoxconn}
            targetCode={targetCode}
            targetStep={targetStep}
            ROUTER_STEPS_LIST={ROUTER_STEPS_LIST}
            handleResetForm={handleResetForm}
            isExecuting={isExecuting}
          />
        )}

        {/* NỘI DUNG KHI CHỌN TAB 2: RESET CHU KỲ */}
        {subMode === 'cycle_reset' && (
          <Reset
            isFoxconn={isFoxconn}
            handleResetForm={handleResetForm}
            isExecuting={isExecuting}
            targetCode={targetCode}
            onExecute={onExecute}
          />
        )}
      </div>
    )
}