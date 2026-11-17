import { useTranslation } from 'react-i18next';

export default function StepChoice({isFoxconn, currentTargetStep, ROUTER_STEPS_LIST, setForm}) {
    const { t } = useTranslation('autoline');

    return(
        <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 text-xs">
            <label className={`block font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                {t('control.alabel.forms.destinationStep')}
            </label>
            <select
                value={currentTargetStep}
                onChange={(e) => setForm?.((prev) => ({ ...prev, targetStep: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border font-mono font-semibold text-xs transition-all cursor-pointer ${
                isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                }`}
            >
                {ROUTER_STEPS_LIST.map((stepItem) => (
                <option key={stepItem.step} value={stepItem.step}>
                    {stepItem.label}
                </option>
                ))}
            </select>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-zinc-400">
                {t('control.alabel.forms.destinationStepHint')}
            </p>
        </div>
    )
}