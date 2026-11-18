import { useTranslation } from 'react-i18next';

export default function MachineFlagsExplanation({ isFoxconn }) {
  const { t } = useTranslation('machine');

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-blue-50/40 border-blue-200 text-slate-800'
          : 'bg-zinc-950/80 border-zinc-800 text-zinc-200 shadow-inner'
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-base">ℹ️</span>
        <h5
          className={`text-xs font-black uppercase tracking-wider ${
            isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
          }`}
        >
          {t('modals.form.flags.explanation.title')}
        </h5>
      </div>

      <ol
        className={`space-y-2 text-xs leading-relaxed ${
          isFoxconn ? 'text-slate-700' : 'text-zinc-300'
        }`}
      >
        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            1.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              {t('modals.form.flags.isAutoLine.label')}:
            </strong>{' '}
            {t('modals.form.flags.explanation.item1')}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            2.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              {t('modals.form.flags.isSfcPreCheck.label')}:
            </strong>{' '}
            {t('modals.form.flags.explanation.item2')}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            3.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              {t('modals.form.flags.isSfcStation.label')}:
            </strong>{' '}
            {t('modals.form.flags.explanation.item3')}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            4.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              {t('modals.form.flags.sendSfcOnPassOnly.label')}:
            </strong>{' '}
            {t('modals.form.flags.explanation.item4')}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            5.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              {t('modals.form.flags.allowFailPassThrough.label')}:
            </strong>{' '}
            {t('modals.form.flags.explanation.item5')}
          </span>
        </li>
      </ol>
    </div>
  );
}
