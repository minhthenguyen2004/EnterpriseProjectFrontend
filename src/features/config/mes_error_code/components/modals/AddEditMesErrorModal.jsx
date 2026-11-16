import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../../../hooks/useTheme';
import {
  OWNER_OPTIONS,
  SEVERITY_OPTIONS,
} from '../../constants/mesErrorCodeConstants';

/**
 * AddEditMesErrorModal
 * Modal dùng chung để Thêm mới (Add) hoặc Sửa (Edit) mã lỗi MES
 */
export default function AddEditMesErrorModal({
  isOpen,
  mode = 'add',
  initialData = null,
  onClose,
  onSave,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const { t } = useTranslation(['mesError', 'common']);

  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    errorCode: '',
    owner: 'PE',
    severity: 'Major',
    applicableStations: 'ALL_STATIONS',
    messageEn: '',
    messageVi: '',
    troubleshootingGuide: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        id: initialData.id,
        errorCode: initialData.errorCode || '',
        owner: initialData.owner || 'PE',
        severity: initialData.severity || 'Major',
        applicableStations: Array.isArray(initialData.applicableStations)
          ? initialData.applicableStations.join(', ')
          : initialData.applicableStations || 'ALL_STATIONS',
        messageEn: initialData.messageEn || '',
        messageVi: initialData.messageVi || '',
        troubleshootingGuide: initialData.troubleshootingGuide || '',
      });
    } else {
      setFormData({
        errorCode: '',
        owner: 'PE',
        severity: 'Major',
        applicableStations: 'ALL_STATIONS',
        messageEn: '',
        messageVi: '',
        troubleshootingGuide: '',
      });
    }
    setErrors({});
  }, [initialData, isEdit, isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.errorCode.trim()) {
      errs.errorCode = 'Vui lòng nhập mã lỗi MES';
    } else if (!formData.errorCode.toUpperCase().startsWith('ERR_')) {
      errs.errorCode = 'Mã lỗi nên bắt đầu bằng tiền tố "ERR_" (Ví dụ: ERR_SFC_...)';
    }

    if (!formData.messageEn.trim()) {
      errs.messageEn = 'Vui lòng nhập thông báo tiếng Anh chuẩn';
    }

    if (!formData.messageVi.trim()) {
      errs.messageVi = 'Vui lòng nhập thông báo tiếng Việt dịch nghĩa';
    }

    if (!formData.troubleshootingGuide.trim()) {
      errs.troubleshootingGuide = 'Vui lòng nhập hướng dẫn các bước xử lý sự cố (SOP)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedStations = formData.applicableStations
      ? formData.applicableStations
          .split(',')
          .map((s) => s.trim().toUpperCase())
          .filter(Boolean)
      : ['ALL_STATIONS'];

    onSave({
      ...formData,
      errorCode: formData.errorCode.trim().toUpperCase(),
      applicableStations: formattedStations,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all ${
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
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{isEdit ? '✏️' : '➕'}</span>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">
                {isEdit ? t('addEdit.editTitle', 'Chỉnh Sửa Mã Lỗi MES') : t('addEdit.addTitle', 'Thêm Mới Mã Lỗi MES')}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
                {isEdit
                  ? t('addEdit.editSubtitle', { code: formData.errorCode, defaultValue: `Cập nhật thông tin cho mã: ${formData.errorCode}` })
                  : t('addEdit.addSubtitle', 'Khai báo mã lỗi mới vào danh mục hệ thống')}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Hàng 1: Mã lỗi & Mức độ nghiêm trọng */}
          <div>
            <div>
              <label className={`${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-white'} block text-[11px] font-bold uppercase tracking-wider mb-1`}>
                {t('addEdit.errorCodeLabel', 'Mã Lỗi (Error Code)')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.errorCode}
                disabled={isEdit}
                onChange={(e) => handleChange('errorCode', e.target.value.toUpperCase())}
                placeholder={t('addEdit.errorCodePlaceholder', 'Ví dụ: ERR_SFC_CARRIER_LOCKED')}
                className={`w-full px-3 py-2 rounded-xl border font-mono text-xs font-bold transition-all focus:outline-hidden ${
                  isEdit
                    ? ' dark:bg-zinc-800/60 opacity-70 cursor-not-allowed border-slate-300 dark:border-zinc-700'
                    : isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                } ${errors.errorCode ? 'border-rose-500' : ''}`}
              />
              {errors.errorCode && (
                <span className="text-[10px] text-rose-500 font-bold mt-1 block">
                  {errors.errorCode}
                </span>
              )}
            </div>
          </div>

          {/* Hàng 2: Bộ phận phụ trách & Trạm áp dụng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-white'} block text-[11px] font-bold uppercase tracking-wider mb-1`}>
                {t('addEdit.ownerLabel', 'Bộ phận phụ trách (Owner)')} <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.owner}
                onChange={(e) => handleChange('owner', e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer focus:outline-hidden ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                }`}
              >
                {OWNER_OPTIONS.filter((o) => o.value !== 'ALL').map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-white'} block text-[11px] font-bold uppercase tracking-wider mb-1`}>
                {t('addEdit.stationsLabel', 'Trạm áp dụng (Phân cách bằng dấu phẩy)')}
              </label>
              <input
                type="text"
                value={formData.applicableStations}
                onChange={(e) => handleChange('applicableStations', e.target.value)}
                placeholder={t('addEdit.stationsPlaceholder', 'Ví dụ: SMT_01, AOI_02, ALL_STATIONS')}
                className={`w-full px-3 py-2 rounded-xl border font-mono text-xs transition-all focus:outline-hidden ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100'
                }`}
              />
            </div>
          </div>

          {/* Hàng 3: Thông báo tiếng Anh (Message EN) */}
          <div>
            <label className={`${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-white'} block text-[11px] font-bold uppercase tracking-wider mb-1`}>
              {t('addEdit.msgEnLabel', 'Thông báo tiếng Anh (Message EN)')} <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.messageEn}
              onChange={(e) => handleChange('messageEn', e.target.value)}
              placeholder={t('addEdit.msgEnPlaceholder', 'Nhập thông báo chuẩn tiếng Anh hiển thị trên máy và trạm...')}
              className={`w-full px-3 py-2 rounded-xl border font-mono text-xs transition-all focus:outline-hidden ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100'
              } ${errors.messageEn ? 'border-rose-500' : ''}`}
            />
            {errors.messageEn && (
              <span className="text-[10px] text-rose-500 font-bold mt-0.5 block">
                {errors.messageEn}
              </span>
            )}
          </div>

          {/* Hàng 4: Thông báo tiếng Việt (Message VI) */}
          <div>
            <label className={`${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-white'} block text-[11px] font-bold uppercase tracking-wider mb-1`}>
              {t('addEdit.msgViLabel', 'Thông báo tiếng Việt (Message VI)')} <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.messageVi}
              onChange={(e) => handleChange('messageVi', e.target.value)}
              placeholder={t('addEdit.msgViPlaceholder', 'Dịch nghĩa tiếng Việt cho kỹ sư và công nhân vận hành...')}
              className={`w-full px-3 py-2 rounded-xl border text-xs transition-all focus:outline-hidden ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100'
              } ${errors.messageVi ? 'border-rose-500' : ''}`}
            />
            {errors.messageVi && (
              <span className="text-[10px] text-rose-500 font-bold mt-0.5 block">
                {errors.messageVi}
              </span>
            )}
          </div>

          {/* Hàng 5: Hướng dẫn xử lý sự cố (Troubleshooting Guide) */}
          <div>
            <label className={`${isFoxconn ? 'text-slate-600 dark:text-zinc-400' : 'text-white'} block text-[11px] font-bold uppercase tracking-wider mb-1`}>
              {t('addEdit.sopLabel', 'Hướng dẫn xử lý sự cố (Troubleshooting Guide / SOP)')} <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.troubleshootingGuide}
              onChange={(e) => handleChange('troubleshootingGuide', e.target.value)}
              placeholder={t('addEdit.sopPlaceholder', 'Nhập các bước xử lý cụ thể: 1. Kiểm tra... 2. Thay thế... 3. Xác nhận...')}
              className={`w-full px-3 py-2 rounded-xl border font-mono text-xs transition-all focus:outline-hidden ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100'
              } ${errors.troubleshootingGuide ? 'border-rose-500' : ''}`}
            />
            {errors.troubleshootingGuide && (
              <span className="text-[10px] text-rose-500 font-bold mt-0.5 block">
                {errors.troubleshootingGuide}
              </span>
            )}
          </div>

          {/* Footer Form Buttons */}
          <div
            className={`pt-4 border-t flex items-center justify-end gap-2.5 ${
              isFoxconn ? 'border-slate-200' : 'border-zinc-800'
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
              {t('addEdit.btnCancel', 'Hủy bỏ')}
            </button>

            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isFoxconn
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                  : 'bg-[#76B900] hover:bg-[#85c90d] text-black font-extrabold shadow-[#76B900]/20'
              }`}
            >
              {isEdit ? t('addEdit.btnSaveEdit', 'Lưu cập nhật') : t('addEdit.btnSaveAdd', 'Xác nhận tạo mới')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

