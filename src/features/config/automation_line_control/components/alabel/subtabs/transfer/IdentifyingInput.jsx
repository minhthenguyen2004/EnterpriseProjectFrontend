import { useTranslation } from 'react-i18next';

export default function IdentifyingInput({ isFoxconn, currentSn, currentOldCarrier, currentNewCarrier, handleSnChange, setForm }) {
    const { t } = useTranslation('autoline');

    return(
        <div className="space-y-3">
        {/* Trường Text: Mã Serial Number */}
        <div>
          <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
            {t('control.alabel.forms.snCode')}
          </label>
          <div className="relative">
            <input
              type="text"
              value={currentSn}
              onChange={(e) => handleSnChange?.(e.target.value)}
              className={`w-full pl-3 pr-20 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 focus:ring-1 focus:ring-blue-500 text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 focus:ring-1 focus:ring-[#76B900] text-zinc-100'
              }`}
              placeholder={t('control.alabel.forms.placeholderSnTarget')}
            />
            <span className="absolute right-3 top-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
              SERIAL
            </span>
          </div>
        </div>

        {/* Lưới 2 cột: Mã khay cũ và Mã khay mới */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Trường Text: Mã khay cũ */}
          <div>
            <label className={`block font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
              {t('control.alabel.forms.oldCarrier')}
            </label>
            <input
              type="text"
              value={currentOldCarrier}
              onChange={(e) => setForm?.((prev) => ({ ...prev, oldCarrier: e.target.value }))}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 text-zinc-100'
              }`}
              placeholder={t('control.alabel.forms.placeholderOldCarrier')}
            />
          </div>

          {/* Trường Text: Mã khay mới */}
          <div>
            <label className={`block font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
              {t('control.alabel.forms.newCarrier')}
            </label>
            <input
              type="text"
              value={currentNewCarrier}
              onChange={(e) => setForm?.((prev) => ({ ...prev, newCarrier: e.target.value }))}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 text-zinc-100'
              }`}
              placeholder={t('control.alabel.forms.placeholderNewCarrier')}
            />
          </div>
        </div>
      </div>
    )
}