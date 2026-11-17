import { useTranslation } from 'react-i18next';

export default function UndoReworkDropdownMenu({ isFoxconn, currentClearStep, ROUTER_STEPS_LIST, handleClearStepChange }) {
    const { t } = useTranslation('autoline');

    return(
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className={`text-xs font-bold ${ isFoxconn ? "text-slate-700" : "text-zinc-200"} flex items-center gap-1.5`}>
                <span>{t('control.alabel.forms.clearUndoStep')}</span>
                </label>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${isFoxconn ? "bg-slate-200/70 text-slate-600 border-slate-300" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                OPTIONAL
                </span>
            </div>
            <select
                value={currentClearStep}
                onChange={(e) => handleClearStepChange?.(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-zinc-950/70 border-zinc-700 text-zinc-100'
                }`}
            >
                <option value="" className={isFoxconn ? "bg-white text-slate-800" : "bg-zinc-900 text-zinc-100"}>
                {t('control.alabel.forms.clearUndoStepAll')}
                </option>
                {ROUTER_STEPS_LIST.map((stepItem) => (
                <option
                    key={stepItem.step}
                    value={stepItem.step}
                    className={isFoxconn ? "bg-white text-slate-800" : "bg-zinc-900 text-zinc-100"}
                >
                    {stepItem.label}
                </option>
                ))}
            </select>
            <p className={`text-[10px] ${isFoxconn ? "text-slate-500" : "text-zinc-400"}`}>
                {t('control.alabel.forms.clearUndoStepHint')}
            </p>
        </div>
    )
}
