import { useState } from 'react';
import NewScrewPositionConfigCard from './NewScrewPositionConfigCard';
import ScrewPositionsTable from './ScrewPositionsTable';
import ScrewValidationExplanation from './ScrewValidationExplanation';
import { DEFAULT_MACHINE_SCREW_CONFIGS } from '../../constants/formModalConstants';

/**
 * Tab 5: Screw Config (Cấu hình Tiêu chuẩn & Dung sai Vị trí Vít)
 * Quản lý state CRUD, validation và đồng bộ dữ liệu vị trí ốc của máy
 */
export default function MachineScrewConfigTab({
  formData = {},
  onChange,
  isFoxconn = false
}) {
  // Lấy danh sách cấu hình vít từ formData hoặc fallback mặc định
  const screwConfigs = Array.isArray(formData.screwConfigs) && formData.screwConfigs.length > 0
    ? formData.screwConfigs
    : DEFAULT_MACHINE_SCREW_CONFIGS;

  const initialFormState = {
    position: '',
    isRequired: true,
    isActive: true,
    torque: { standard: '1.20', limit: '0.15', unit: 'kgf.cm' },
    angle: { standard: '720.0', limit: '45.0', unit: 'deg' },
    volume: { standard: '2.50', limit: '0.20', unit: 'mm³' },
    height: { standard: '5.00', limit: '0.30', unit: 'mm' }
  };

  const [screwForm, setScrewForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Hiển thị toast thông báo phản hồi nhanh
  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3000);
  };

  // Cập nhật trường top-level (position, isRequired, isActive)
  const handleFieldChange = (field, value) => {
    setScrewForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Cập nhật trường con của 4 thông số (torque, angle, volume, height)
  const handleParamChange = (paramKey, subField, value) => {
    setScrewForm((prev) => ({
      ...prev,
      [paramKey]: {
        ...(prev[paramKey] || {}),
        [subField]: value
      }
    }));

    const errorKey = `${paramKey}_${subField}`;
    if (formErrors[errorKey]) {
      setFormErrors((prev) => ({ ...prev, [errorKey]: undefined }));
    }
  };

  // Hủy chế độ chỉnh sửa / reset form
  const handleCancel = () => {
    setScrewForm(initialFormState);
    setEditingId(null);
    setFormErrors({});
  };

  // Kiểm tra tính hợp lệ của dữ liệu trước khi lưu
  const validateForm = () => {
    const errors = {};
    const trimmedPosition = (screwForm.position || '').trim().toUpperCase();

    if (!trimmedPosition) {
      errors.position = 'Vị trí ốc (Position) không được để trống';
    } else {
      // Kiểm tra trùng lặp mã vị trí trong danh sách
      const isDuplicate = screwConfigs.some(
        (item) => item.id !== editingId && (item.position || '').toUpperCase() === trimmedPosition
      );
      if (isDuplicate) {
        errors.position = `Vị trí ốc "${trimmedPosition}" đã tồn tại trong danh sách`;
      }
    }

    // Kiểm tra 4 cặp thông số kỹ thuật (Standard & Limit phải là số hợp lệ)
    const params = ['torque', 'angle', 'volume', 'height'];
    params.forEach((param) => {
      const data = screwForm[param] || {};
      if (data.standard === '' || isNaN(Number(data.standard))) {
        errors[`${param}_standard`] = 'Nhập số hợp lệ';
      }
      if (data.limit === '' || isNaN(Number(data.limit)) || Number(data.limit) < 0) {
        errors[`${param}_limit`] = 'Nhập số >= 0';
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Lưu cấu hình (Thêm mới hoặc Cập nhật)
  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!validateForm()) return;

    const formattedItem = {
      ...screwForm,
      position: (screwForm.position || '').trim().toUpperCase(),
      torque: {
        standard: Number(screwForm.torque.standard),
        limit: Number(screwForm.torque.limit),
        unit: screwForm.torque.unit || 'kgf.cm'
      },
      angle: {
        standard: Number(screwForm.angle.standard),
        limit: Number(screwForm.angle.limit),
        unit: screwForm.angle.unit || 'deg'
      },
      volume: {
        standard: Number(screwForm.volume.standard),
        limit: Number(screwForm.volume.limit),
        unit: screwForm.volume.unit || 'mm³'
      },
      height: {
        standard: Number(screwForm.height.standard),
        limit: Number(screwForm.height.limit),
        unit: screwForm.height.unit || 'mm'
      }
    };

    let updatedList;
    if (editingId) {
      // Cập nhật vị trí đang sửa
      updatedList = screwConfigs.map((item) =>
        item.id === editingId ? { ...item, ...formattedItem } : item
      );
      showToast(`Đã cập nhật vị trí ốc "${formattedItem.position}" thành công!`);
    } else {
      // Thêm mới
      const newItem = {
        id: Date.now(),
        ...formattedItem
      };
      updatedList = [...screwConfigs, newItem];
      showToast(`Đã thêm vị trí ốc "${formattedItem.position}" vào danh sách!`);
    }

    if (onChange) {
      onChange('screwConfigs', updatedList);
    }

    handleCancel();
  };

  // Nạp dữ liệu vào form khi bấm Sửa từ bảng
  const handleEdit = (item) => {
    setEditingId(item.id);
    setScrewForm({
      position: item.position || '',
      isRequired: item.isRequired ?? true,
      isActive: item.isActive ?? true,
      torque: {
        standard: item.torque?.standard ?? '',
        limit: item.torque?.limit ?? '',
        unit: item.torque?.unit || 'kgf.cm'
      },
      angle: {
        standard: item.angle?.standard ?? '',
        limit: item.angle?.limit ?? '',
        unit: item.angle?.unit || 'deg'
      },
      volume: {
        standard: item.volume?.standard ?? '',
        limit: item.volume?.limit ?? '',
        unit: item.volume?.unit || 'mm³'
      },
      height: {
        standard: item.height?.standard ?? '',
        limit: item.height?.limit ?? '',
        unit: item.height?.unit || 'mm'
      }
    });
    setFormErrors({});
  };

  // Xóa vị trí ốc khỏi danh sách
  const handleDelete = (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa cấu hình vị trí ốc "${item.position}" không?`)) {
      const updatedList = screwConfigs.filter((s) => s.id !== item.id);
      if (onChange) {
        onChange('screwConfigs', updatedList);
      }
      if (editingId === item.id) {
        handleCancel();
      }
      showToast(`Đã xóa vị trí ốc "${item.position}"!`, 'info');
    }
  };

  // Chuyển đổi trạng thái Active / Bypass trực tiếp trên bảng
  const handleToggleActive = (id) => {
    const updatedList = screwConfigs.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    if (onChange) {
      onChange('screwConfigs', updatedList);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-y-auto custom-scrollbar my-2 space-y-3 pr-1 pb-10">
      {/* Toast thông báo phản hồi thao tác */}
      {feedbackToast && (
        <div
          role="status"
          aria-live="polite"
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 shadow-lg transition-all ${
            feedbackToast.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/80 dark:border-rose-800 dark:text-rose-200'
              : feedbackToast.type === 'info'
              ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/80 dark:border-amber-800 dark:text-amber-200'
              : isFoxconn
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-zinc-900 border-[#76B900] text-[#76B900]'
          }`}
        >
          <span className="flex items-center gap-2">
            <span>{feedbackToast.type === 'error' ? '⚠️' : '✓'}</span>
            <span>{feedbackToast.message}</span>
          </span>
          <button
            type="button"
            onClick={() => setFeedbackToast(null)}
            className="text-xs opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Khung 1: New Screw Position Config Workspace */}
      <NewScrewPositionConfigCard
        screwForm={screwForm}
        formErrors={formErrors}
        editingId={editingId}
        isFoxconn={isFoxconn}
        onFieldChange={handleFieldChange}
        onParamChange={handleParamChange}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      {/* Khung 2: Bảng danh sách cấu hình vị trí ốc */}
      <ScrewPositionsTable
        screwConfigs={screwConfigs}
        editingId={editingId}
        isFoxconn={isFoxconn}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />

      {/* Khung 3: Khung giải nghĩa trực quan quy chuẩn thẩm định */}
      <ScrewValidationExplanation isFoxconn={isFoxconn} />
    </div>
  );
}
