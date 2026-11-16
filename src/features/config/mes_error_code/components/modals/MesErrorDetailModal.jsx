import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../../../hooks/useTheme';
import {
  OWNER_BADGE_CONFIG,
  SEVERITY_BADGE_CONFIG,
} from '../../constants/mesErrorCodeConstants';

/**
 * MesErrorDetailModal
 * Modal hiển thị toàn văn chi tiết về mã lỗi MES khi click vào mã lỗi trong bảng:
 * - Bộ phận phụ trách (Owner)
 * - Thông báo tiếng Anh (Message EN)
 * - Thông báo tiếng Việt (Message VI)
 * - Hướng dẫn xử lý & khắc phục sự cố tiêu chuẩn (Troubleshooting Guide SOP)
 * - Metadata trạm áp dụng, ngày giờ cập nhật
 */
export default function MesErrorDetailModal({
  isOpen,
  onClose,
  errorItem,
  onEdit,
  canModify,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const { t } = useTranslation(['mesError', 'common']);

  // Lắng nghe phím Escape để đóng modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !errorItem) return null;

  const ownerConfig = OWNER_BADGE_CONFIG[errorItem.owner] || {
    label: errorItem.owner,
    foxconnClass: 'bg-slate-100 text-slate-700 border-slate-200',
    nvidiaClass: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  };

  const severityConfig = SEVERITY_BADGE_CONFIG[errorItem.severity] || {
    label: errorItem.severity,
    foxconnClass: 'bg-slate-100 text-slate-700 border-slate-200',
    nvidiaClass: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Header Modal */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isFoxconn
              ? 'bg-slate-50 border-slate-200 text-slate-800'
              : 'bg-zinc-950 border-zinc-800 text-zinc-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-base font-black tracking-wide">
                  {errorItem.errorCode}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
                {t('detail.title', 'Chi tiết mã lỗi MES & Hướng dẫn khắc phục sự cố (Troubleshooting SOP)')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-colors cursor-pointer ${
              isFoxconn
                ? 'hover:bg-slate-200 text-slate-500'
                : 'hover:bg-zinc-800 text-zinc-400'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Nội Dung Modal Cuộn Dọc */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Khối 1: Bộ phận phụ trách */}
          <div>
            <div
              className={`p-3.5 rounded-xl border ${
                isFoxconn ? 'bg-slate-50/70 border-slate-200' : 'bg-zinc-950/50 border-zinc-800'
              }`}
            >
              <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 mb-1.5">
                {t('detail.ownerLabel', '🏢 Bộ phận phụ trách (Owner)')}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${
                  isFoxconn ? ownerConfig.foxconnClass : ownerConfig.nvidiaClass
                }`}
              >
                {ownerConfig.label}
              </span>
            </div>
          </div>

          {/* Khối 2: Thông báo tiếng Anh (Message EN) */}
          <div
            className={`p-4 rounded-xl border ${
              isFoxconn
                ? 'bg-blue-50/50 border-blue-200/80 text-blue-950'
                : 'bg-blue-950/20 border-blue-900/40 text-blue-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5">
              <span>{t('detail.msgEnLabel', '🌐 Thông báo tiếng Anh (Message EN)')}</span>
            </div>
            <p className="text-xs font-medium leading-relaxed">
              {errorItem.messageEn}
            </p>
          </div>

          {/* Khối 3: Thông báo tiếng Việt (Message VI) */}
          <div
            className={`p-4 rounded-xl border ${
              isFoxconn
                ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">
              <span>{t('detail.msgViLabel', '🇻🇳 Thông báo tiếng Việt (Message VI)')}</span>
            </div>
            <p className="text-xs font-semibold leading-relaxed">
              {errorItem.messageVi || 'Chưa cập nhật thông báo tiếng Việt.'}
            </p>
          </div>

          {/* Khối 4: Hướng dẫn xử lý sự cố (Troubleshooting Guide / Action SOP) */}
          <div
            className={`p-4 rounded-xl border ${
              isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/70 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-2 text-amber-600 dark:text-amber-400">
              <span>{t('detail.sopLabel', '🛠️ Hướng dẫn xử lý & Khắc phục chuẩn (Troubleshooting SOP)')}</span>
            </div>
            <div className="whitespace-pre-line text-xs font-medium leading-relaxed p-3 rounded-lg border border-slate-200/80 dark:border-zinc-800 dark:bg-zinc-900">
              {errorItem.troubleshootingGuide || 'Chưa có quy trình hướng dẫn cụ thể.'}
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div
          className={`px-6 py-3.5 flex items-center justify-between border-t ${
            isFoxconn
              ? 'bg-slate-50 border-slate-200'
              : 'bg-zinc-950 border-zinc-800'
          }`}
        >
          <div>
            {canModify && onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(errorItem);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isFoxconn
                    ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700'
                    : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                }`}
              >
                <span>✏️</span>
                <span>{t('detail.btnEditThis', 'Chỉnh sửa mã lỗi này')}</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              isFoxconn
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            {t('detail.btnClose', 'Đóng')}
          </button>
        </div>
      </div>
    </div>
  );
}

