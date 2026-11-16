import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../../../hooks/useTheme';

/**
 * DeleteMesErrorConfirmModal
 * Modal xác nhận trước khi xóa mã lỗi MES khỏi cơ sở dữ liệu
 */
export default function DeleteMesErrorConfirmModal({
  isOpen,
  errorItem,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation('mesError');
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !errorItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center text-xl shrink-0">
              ⚠️
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                {t('delete.title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                {t('delete.warningDesc')}
              </p>
            </div>
          </div>

          {/* Khung tóm tắt mã lỗi */}
          <div
            className={`p-3.5 rounded-xl border text-xs font-mono space-y-1 ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300'
            }`}
          >
            <div>
              <span className="text-slate-400 dark:text-zinc-500">{t('delete.codeLabel')}</span>
              <strong className="text-rose-600 dark:text-rose-400">{errorItem.errorCode}</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-zinc-500">{t('delete.ownerLabel')}</span>
              <strong>{errorItem.owner}</strong>
            </div>
            <div className="text-[11px] font-sans truncate text-slate-500 dark:text-zinc-400">
              {errorItem.messageEn}
            </div>
          </div>

          <p className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 text-center">
            {t('delete.confirmQuestion')}
          </p>
        </div>

        {/* Footer buttons */}
        <div
          className={`px-6 py-3.5 flex items-center justify-end gap-2.5 border-t ${
            isFoxconn
              ? 'bg-slate-50 border-slate-200'
              : 'bg-zinc-950 border-zinc-800'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            {t('delete.btnCancel')}
          </button>

          <button
            type="button"
            onClick={() => onConfirm(errorItem.id)}
            className="px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-rose-600 hover:bg-rose-700 text-white shadow-xs shadow-rose-500/20 active:scale-98"
          >
            {t('delete.btnConfirmDelete')}
          </button>
        </div>
      </div>
    </div>
  );
}

