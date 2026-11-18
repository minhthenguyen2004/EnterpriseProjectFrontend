import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Khung giải nghĩa trực quan: Cơ chế thẩm định tiêu chuẩn & dung sai dữ liệu Lực Nhấn (AutoLine Pressfit Validation)
 * Hỗ trợ thu gọn/mở rộng (Collapsible) để nhường không gian tối đa cho bảng vị trí ép.
 */
export default function PressfitValidationExplanation({ isFoxconn = false }) {
  const { t } = useTranslation('machine');
  const [isExpanded, setIsExpanded] = useState(true);

  const rules = [
    {
      num: '1',
      title: t('modals.form.pressfitConfig.rule1Title'),
      detail: t('modals.form.pressfitConfig.rule1Desc'),
      badge: t('modals.form.pressfitConfig.rule1Badge'),
      badgeColor: 'rose'
    },
    {
      num: '2',
      title: t('modals.form.pressfitConfig.rule2Title'),
      detail: t('modals.form.pressfitConfig.rule2Desc'),
      badge: t('modals.form.pressfitConfig.rule2Badge'),
      badgeColor: 'amber'
    },
    {
      num: '3',
      title: t('modals.form.pressfitConfig.rule3Title'),
      detail: t('modals.form.pressfitConfig.rule3Desc'),
      badge: t('modals.form.pressfitConfig.rule3Badge'),
      badgeColor: 'blue'
    },
    {
      num: '4',
      title: t('modals.form.pressfitConfig.rule4Title'),
      detail: t('modals.form.pressfitConfig.rule4Desc'),
      badge: t('modals.form.pressfitConfig.rule4Badge'),
      badgeColor: 'emerald'
    }
  ];

  return (
    <div
      className={`rounded-2xl border transition-all shrink-0 ${
        isFoxconn
          ? 'bg-blue-50/60 border-blue-200 text-slate-800'
          : 'bg-zinc-950/70 border-zinc-800/90 text-zinc-200'
      }`}
    >
      {/* Header bar kèm nút Thu gọn / Xem chi tiết */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:opacity-90 select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">ℹ️</span>
          <h5
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            {t('modals.form.pressfitConfig.expTitle')}
          </h5>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              isFoxconn
                ? 'bg-blue-100/70 text-blue-800 border-blue-200'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            {t('modals.form.pressfitConfig.expBadge')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-zinc-500">
          <span>{isExpanded ? t('modals.form.pressfitConfig.collapse') : t('modals.form.pressfitConfig.expand')}</span>
          <span className="text-[10px]">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Nội dung diễn giải dạng Grid 2x2 khi mở rộng */}
      {isExpanded && (
        <div className="px-3.5 pb-3 pt-1 border-t border-slate-200/60 dark:border-zinc-800/60 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
            {rules.map((rule) => {
              let badgeClass = '';
              if (rule.badgeColor === 'rose') {
                badgeClass = isFoxconn
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-rose-950/70 text-rose-300 border-rose-800';
              } else if (rule.badgeColor === 'amber') {
                badgeClass = isFoxconn
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-amber-950/70 text-amber-300 border-amber-800';
              } else if (rule.badgeColor === 'blue') {
                badgeClass = isFoxconn
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-blue-950/70 text-blue-300 border-blue-800';
              } else if (rule.badgeColor === 'emerald') {
                badgeClass = isFoxconn
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-emerald-950/70 text-emerald-300 border-emerald-800';
              }

              return (
                <div
                  key={rule.num}
                  className={`p-2.5 rounded-xl border flex flex-col justify-between gap-1.5 ${
                    isFoxconn
                      ? 'bg-white/80 border-blue-100 shadow-2xs'
                      : 'bg-zinc-900/60 border-zinc-800 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isFoxconn ? 'bg-blue-600 text-white' : 'bg-[#76B900] text-black'
                        }`}
                      >
                        {rule.num}
                      </span>
                      <span
                        className={`font-black text-xs ${
                          isFoxconn ? 'text-slate-900' : 'text-zinc-100'
                        }`}
                      >
                        {rule.title}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] leading-relaxed pl-5.5 ${
                        isFoxconn ? 'text-slate-600' : 'text-zinc-300'
                      }`}
                    >
                      {rule.detail}
                    </p>
                  </div>

                  <div className="pl-5.5 pt-0.5">
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded border font-bold ${badgeClass}`}
                    >
                      {rule.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
