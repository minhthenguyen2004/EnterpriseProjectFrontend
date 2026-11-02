import { useState } from 'react';
import NewPressfitPositionConfigCard from './NewPressfitPositionConfigCard';
import PressfitPositionsTable from './PressfitPositionsTable';
import PressfitValidationExplanation from './PressfitValidationExplanation';
import { DEFAULT_MACHINE_PRESSFIT_CONFIGS } from '../../constants/formModalConstants';

/**
 * Tab 6: Pressfit Config (Cấu hình Tiêu chuẩn & Dung sai Vị trí Ép Lực Nhấn)
 * Quản lý state CRUD, validation và đồng bộ dữ liệu vị trí ép của máy
 */
export default function MachinePressfitConfigTab({
  formData = {},
  onChange,
  isFoxconn = false
}) {
  // Lấy danh sách cấu hình ép lực nhấn từ formData hoặc fallback mặc định
  const pressfitConfigs = Array.isArray(formData.pressfitConfigs) && formData.pressfitConfigs.length > 0
    ? formData.pressfitConfigs
    : DEFAULT_MACHINE_PRESSFIT_CONFIGS;

  const initialFormState = {
    position: '',
    isRequired: true,
    isActive: true,
    force: { standard: '1500.0', limit: '50.0', unit: 'N' },
    time: { standard: '3.0', limit: '0.2', unit: 's' },
    distance: { standard: '12.5', limit: '0.15', unit: 'mm' }
  };

  const [pressfitForm, setPressfitForm] = useState(initialFormState);
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
    setPressfitForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Cập nhật trường con của 3 thông số (force, time, distance)
  const handleParamChange = (paramKey, subField, value) => {
    setPressfitForm((prev) => ({
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
    setPressfitForm(initialFormState);
    setEditingId(null);
    setFormErrors({});
  };

  // Kiểm tra tính hợp lệ của dữ liệu trước khi lưu
  const validateForm = () => {
    const errors = {};
    const trimmedPosition = (pressfitForm.position || '').trim().toUpperCase();

    if (!trimmedPosition) {
      errors.position = 'Vị trí ép (Position) không được để trống';
    } else {
      // Kiểm tra trùng lặp mã vị trí trong danh sách
      const isDuplicate = pressfitConfigs.some(
        (item) => item.id !== editingId && (item.position || '').toUpperCase() === trimmedPosition
      );
      if (isDuplicate) {
        errors.position = `Vị trí ép "${trimmedPosition}" đã tồn tại trong danh sách`;
      }
    }

    // Kiểm tra 3 bộ thông số kỹ thuật (Standard & Limit phải là số hợp lệ)
    const params = ['force', 'time', 'distance'];
    params.forEach((param) => {
      const data = pressfitForm[param] || {};
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
      ...pressfitForm,
      position: (pressfitForm.position || '').trim().toUpperCase(),
      force: {
        standard: Number(pressfitForm.force.standard),
        limit: Number(pressfitForm.force.limit),
        unit: pressfitForm.force.unit || 'N'
      },
      time: {
        standard: Number(pressfitForm.time.standard),
        limit: Number(pressfitForm.time.limit),
        unit: pressfitForm.time.unit || 's'
      },
      distance: {
        standard: Number(pressfitForm.distance.standard),
        limit: Number(pressfitForm.distance.limit),
        unit: pressfitForm.distance.unit || 'mm'
      }
    };

    let updatedList;
    if (editingId) {
      // Cập nhật vị trí đang sửa
      updatedList = pressfitConfigs.map((item) =>
        item.id === editingId ? { ...item, ...formattedItem } : item
      );
      showToast(`Đã cập nhật vị trí ép "${formattedItem.position}" thành công!`);
    } else {
      // Thêm mới
      const newItem = {
        id: Date.now(),
        ...formattedItem
      };
      updatedList = [...pressfitConfigs, newItem];
      showToast(`Đã thêm vị trí ép "${formattedItem.position}" vào danh sách!`);
    }

    if (onChange) {
      onChange('pressfitConfigs', updatedList);
    }

    handleCancel();
  };

  // Nạp dữ liệu vào form khi bấm Sửa từ bảng
  const handleEdit = (item) => {
    setEditingId(item.id);
    setPressfitForm({
      position: item.position || '',
      isRequired: item.isRequired ?? true,
      isActive: item.isActive ?? true,
      force: {
        standard: item.force?.standard ?? '',
        limit: item.force?.limit ?? '',
        unit: item.force?.unit || 'N'
      },
      time: {
        standard: item.time?.standard ?? '',
        limit: item.time?.limit ?? '',
        unit: item.time?.unit || 's'
      },
      distance: {
        standard: item.distance?.standard ?? '',
        limit: item.distance?.limit ?? '',
        unit: item.distance?.unit || 'mm'
      }
    });
    setFormErrors({});
  };

  // Xóa vị trí ép khỏi danh sách
  const handleDelete = (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa cấu hình vị trí ép "${item.position}" không?`)) {
      const updatedList = pressfitConfigs.filter((s) => s.id !== item.id);
      if (onChange) {
        onChange('pressfitConfigs', updatedList);
      }
      if (editingId === item.id) {
        handleCancel();
      }
      showToast(`Đã xóa vị trí ép "${item.position}"!`, 'info');
    }
  };

  // Chuyển đổi trạng thái Active / Bypass trực tiếp trên bảng
  const handleToggleActive = (id) => {
    const updatedList = pressfitConfigs.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    if (onChange) {
      onChange('pressfitConfigs', updatedList);
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

      {/* Khung 1: New Pressfit Position Config Workspace */}
      <NewPressfitPositionConfigCard
        pressfitForm={pressfitForm}
        formErrors={formErrors}
        editingId={editingId}
        isFoxconn={isFoxconn}
        onFieldChange={handleFieldChange}
        onParamChange={handleParamChange}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      {/* Khung 2: Bảng danh sách cấu hình vị trí ép */}
      <PressfitPositionsTable
        pressfitConfigs={pressfitConfigs}
        editingId={editingId}
        isFoxconn={isFoxconn}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />

      {/* Khung 3: Khung giải nghĩa trực quan quy chuẩn thẩm định */}
      <PressfitValidationExplanation isFoxconn={isFoxconn} />
    </div>
  );
}
