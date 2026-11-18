import { useTranslation } from 'react-i18next';
import renderTypeBadge from './RenderTypeBadge';

export default function ValidationKeysTable({
  validationKeys = [],
  editingId,
  defaultStepCode,
  isFoxconn,
  onEditClick,
  onDeleteClick,
  onToggleStatus
}) {
  const { t } = useTranslation('machine');

  return (
    <div
      className={`rounded-2xl border transition-all shadow-md overflow-hidden shrink-0 ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-xs'
          : 'bg-zinc-900/95 border-zinc-800 shadow-xl'
      }`}
    >
      <div
        className={`px-3.5 sm:px-4 py-2.5 border-b flex items-center justify-between ${
          isFoxconn ? 'bg-slate-100/80 border-slate-200' : 'bg-zinc-950/80 border-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">📋</span>
          <span
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-800' : 'text-zinc-100'
            }`}
          >
            {t('modals.form.validationKeys.tableTitle')}
          </span>
          <span
            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-black border ${
              isFoxconn
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-zinc-800 text-[#76B900] border-[#76B900]/40 shadow-[0_0_8px_rgba(118,185,0,0.2)]'
            }`}
          >
            {t('modals.form.validationKeys.keysCount', { count: validationKeys.length })}
          </span>
        </div>

        <span
          className={`text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}
        >
          {t('modals.form.validationKeys.autoSaveNote')}
        </span>
      </div>

      {/* Nội dung bảng có khả năng cuộn dọc và ngang mượt mà */}
      <div className="overflow-x-auto overflow-y-auto max-h-41.25 sm:max-h-50 custom-scrollbar w-full">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 z-10 shadow-2xs backdrop-blur-md">
            <tr
              className={`border-b text-[11px] font-black uppercase tracking-wider select-none ${
                isFoxconn
                  ? 'bg-slate-100/95 text-slate-700 border-slate-200'
                  : 'bg-zinc-950/95 text-zinc-300 border-zinc-800'
              }`}
            >
              <th className="py-2.5 px-3">{t('modals.form.validationKeys.colStep')}</th>
              <th className="py-2.5 px-3">{t('modals.form.validationKeys.colKeyName')}</th>
              <th className="py-2.5 px-3">{t('modals.form.validationKeys.colDisplayName')}</th>
              <th className="py-2.5 px-3">{t('modals.form.validationKeys.colType')}</th>
              <th className="py-2.5 px-2.5 text-center">{t('modals.form.validationKeys.colRequired')}</th>
              <th className="py-2.5 px-2.5 text-center">{t('modals.form.validationKeys.colBypass')}</th>
              <th className="py-2.5 px-2.5 text-center">{t('modals.form.validationKeys.colVerify')}</th>
              <th className="py-2.5 px-2.5 text-center">{t('modals.form.validationKeys.colSfc')}</th>
              <th className="py-2.5 px-3 text-center">{t('modals.form.validationKeys.colStatus')}</th>
              <th className="py-2.5 px-3 text-center">{t('modals.form.validationKeys.colAction')}</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isFoxconn ? 'divide-slate-200' : 'divide-zinc-800/80'
            }`}
          >
            {validationKeys.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-8 text-center text-xs text-slate-400 dark:text-zinc-500 font-medium"
                >
                  {t('modals.form.validationKeys.emptyTable')}
                </td>
              </tr>
            ) : (
              validationKeys.map((item) => {
                const isBeingEdited = editingId === item.id;

                return (
                  <tr
                    key={item.id || item.keyName}
                    className={`transition-colors ${
                      isBeingEdited
                        ? isFoxconn
                          ? 'bg-blue-50/80 font-medium'
                          : 'bg-zinc-800/90 font-medium'
                        : isFoxconn
                        ? 'hover:bg-slate-50'
                        : 'hover:bg-zinc-800/50'
                    }`}
                  >
                    {/* Step */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        {item.step || defaultStepCode}
                      </span>
                    </td>

                    {/* Key Name */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`font-mono font-bold text-xs ${
                          isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
                        }`}
                      >
                        {item.keyName}
                      </span>
                    </td>

                    {/* Display Name */}
                    <td className={`py-2.5 px-3 font-medium ${isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-zinc-100'}`}>
                      {item.displayName || item.keyName}
                    </td>

                    {/* Value Type */}
                    <td className={`py-2.5 px-3 font-medium ${isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-zinc-100'}`}>
                      {renderTypeBadge(item.valueType)}
                    </td>

                    {/* Required */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      {item.isRequired ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.2 rounded">
                          <span>✓</span>
                          <span>Req</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>
                      )}
                    </td>

                    {/* Bypass */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      {item.isBypass ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-1.5 py-0.2 rounded">
                          <span>✓</span>
                          <span>Byp</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>
                      )}
                    </td>

                    {/* Verify */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      {item.isVerify ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-1.5 py-0.2 rounded">
                          <span>✓</span>
                          <span>Ver</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>
                      )}
                    </td>

                    {/* SFC KeyPart */}
                    <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                      {item.isSfcKeyPart ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 px-1.5 py-0.2 rounded">
                          <span>✓</span>
                          <span>SFC</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-zinc-600 font-bold">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(item.id)}
                        title={t('modals.form.validationKeys.toggleActiveTooltip')}
                        className="cursor-pointer"
                      >
                        {item.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:scale-105 transition-transform">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700 hover:scale-105 transition-transform">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Inactive
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Action (Sửa và Xóa) */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEditClick(item)}
                          title={t('modals.form.validationKeys.btnEdit')}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            isFoxconn
                              ? 'text-amber-600 hover:bg-amber-100'
                              : 'text-amber-400 hover:bg-zinc-800'
                          }`}
                        >
                          {t('modals.form.validationKeys.btnEdit')}
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteClick(item)}
                          title={t('modals.form.validationKeys.btnDelete')}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            isFoxconn
                              ? 'text-rose-600 hover:bg-rose-100'
                              : 'text-rose-400 hover:bg-zinc-800'
                          }`}
                        >
                          {t('modals.form.validationKeys.btnDelete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
