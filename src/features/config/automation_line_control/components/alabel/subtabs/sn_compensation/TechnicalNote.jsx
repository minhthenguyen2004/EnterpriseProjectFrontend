import { useTranslation } from 'react-i18next';

export default function TechnicalNote({isFoxconn}) {
    const { t } = useTranslation('autoline');

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
            <strong>{t('control.alabel.forms.techNoteTitle')}</strong>
          </p>
          <p className="text-[10px] sm:text-[11px] opacity-85">
            {t('control.alabel.forms.techNoteDesc')}
          </p>
        </div>
      </div>
    )
}