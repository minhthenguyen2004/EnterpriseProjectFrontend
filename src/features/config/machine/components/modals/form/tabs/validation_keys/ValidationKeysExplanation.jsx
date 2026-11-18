import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Khung giải nghĩa logic cờ Keypart (Validation Keys Explanation):
 * Hỗ trợ thu gọn/mở rộng (Collapsible) để nhường không gian tối đa cho Bảng dữ liệu.
 */
export default function ValidationKeysExplanation({ isFoxconn }) {
  const { t } = useTranslation('machine');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`rounded-2xl border transition-all shrink-0 ${
        isFoxconn
          ? 'bg-blue-50/40 border-blue-200 text-slate-800'
          : 'bg-zinc-950/80 border-zinc-800 text-zinc-200 shadow-inner'
      }`}
    >
      {/* Header bar kèm nút Thu gọn / Mở rộng */}
      <button
        type="button"
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:opacity-90 select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">ℹ️</span>
          <h5
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            {t('modals.form.validationKeys.expTitle')}
          </h5>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              isFoxconn
                ? 'bg-blue-100/70 text-blue-800 border-blue-200'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            {t('modals.form.validationKeys.expBadge')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-zinc-500">
          <span>{isExpanded ? t('modals.form.validationKeys.collapse') : t('modals.form.validationKeys.expand')}</span>
          <span className="text-[10px]">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Nội dung diễn giải dạng Grid 2x2 khi mở rộng */}
      {isExpanded && (
        <div className="px-3.5 pb-3 pt-1 border-t border-slate-200/60 dark:border-zinc-800/60 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs leading-relaxed">
            {/* 1. IsRequire */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  1.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    IsRequire ({t('modals.form.validationKeys.tickRequired')}):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    {t('modals.form.validationKeys.expIsRequire')}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. IsBypass */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  2.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    IsBypass ({t('modals.form.validationKeys.tickBypass')}):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    {t('modals.form.validationKeys.expIsBypass')}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. IsVerify */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  3.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    IsVerify ({t('modals.form.validationKeys.tickVerify')}):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    {t('modals.form.validationKeys.expIsVerify')}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Is SFC KeyPart */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  4.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    Is SFC KeyPart ({t('modals.form.validationKeys.tickSfc')}):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    {t('modals.form.validationKeys.expIsSfc')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
