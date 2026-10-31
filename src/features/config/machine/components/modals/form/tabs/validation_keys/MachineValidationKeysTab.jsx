import { useState } from 'react';
import ValidationKeyInputCard from './ValidationKeyInputCard';
import ValidationKeysTable from './ValidationKeysTable';
import ValidationKeysExplanation from './ValidationKeysExplanation';

/**
 * Tab 2: Validation Keys (Quản lý khóa xác thực cấp linh kiện)
 * Container điều phối state, validation và các thao tác CRUD cấp Keypart
 */
export default function MachineValidationKeysTab({
  formData = {},
  onChange,
  isFoxconn = false
}) {
  // Trích xuất mã Step ngắn gọn từ formData.step (vd: "ST01 - Solder Paste..." -> "ST01")
  const defaultStepCode = (formData.step || 'ST01').split(' - ')[0].trim() || 'ST01';

  // State danh sách các key validation
  const validationKeys = Array.isArray(formData.validationKeys) ? formData.validationKeys : [];

  // State form nhập liệu thêm / sửa key
  const initialFormState = {
    keyName: '',
    displayName: '',
    valueType: 'string',
    isRequired: true,
    isBypass: false,
    isVerify: true,
    isSfcKeyPart: true,
    isActive: true
  };

  const [keyForm, setKeyForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Hiển thị toast thông báo nhanh
  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3000);
  };

  // Cập nhật giá trị trường form
  const handleFieldChange = (field, value) => {
    setKeyForm(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Hủy thao tác nhập / sửa
  const handleCancel = () => {
    setKeyForm(initialFormState);
    setEditingId(null);
    setFormErrors({});
  };

  // Kiểm tra tính hợp lệ trước khi lưu
  const validateForm = () => {
    const errors = {};
    const trimmedKeyName = keyForm.keyName?.trim().toUpperCase();

    if (!trimmedKeyName) {
      errors.keyName = 'Key Name không được để trống';
    } else if (!/^[A-Z0-9_]+$/.test(trimmedKeyName)) {
      errors.keyName = 'Key Name chỉ gồm chữ hoa, số và dấu gạch dưới (_)';
    } else {
      // Kiểm tra trùng lặp
      const isDuplicate = validationKeys.some(
        item => item.id !== editingId && item.keyName.toUpperCase() === trimmedKeyName
      );
      if (isDuplicate) {
        errors.keyName = `Key "${trimmedKeyName}" đã tồn tại trong danh sách`;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Lưu key config (Thêm mới hoặc Cập nhật)
  const handleSaveKey = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!validateForm()) return;

    const formattedKey = {
      ...keyForm,
      keyName: keyForm.keyName.trim().toUpperCase(),
      displayName: keyForm.displayName?.trim() || keyForm.keyName.trim().toUpperCase(),
      step: defaultStepCode
    };

    let updatedKeys;
    if (editingId) {
      // Đang sửa
      updatedKeys = validationKeys.map(item =>
        item.id === editingId ? { ...item, ...formattedKey } : item
      );
      showToast(`Đã cập nhật key "${formattedKey.keyName}" thành công!`);
    } else {
      // Thêm mới
      const newItem = {
        id: Date.now(),
        ...formattedKey
      };
      updatedKeys = [...validationKeys, newItem];
      showToast(`Đã thêm key "${formattedKey.keyName}" vào danh sách!`);
    }

    if (onChange) {
      onChange('validationKeys', updatedKeys);
    }

    handleCancel();
  };

  // Nạp dữ liệu vào form khi bấm Sửa
  const handleEditClick = (item) => {
    setEditingId(item.id);
    setKeyForm({
      keyName: item.keyName || '',
      displayName: item.displayName || '',
      valueType: item.valueType || 'string',
      isRequired: item.isRequired ?? true,
      isBypass: item.isBypass ?? false,
      isVerify: item.isVerify ?? true,
      isSfcKeyPart: item.isSfcKeyPart ?? true,
      isActive: item.isActive ?? true
    });
    setFormErrors({});
  };

  // Xóa key khỏi bảng
  const handleDeleteClick = (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa key "${item.keyName}" không?`)) {
      const updatedKeys = validationKeys.filter(k => k.id !== item.id);
      if (onChange) {
        onChange('validationKeys', updatedKeys);
      }
      if (editingId === item.id) {
        handleCancel();
      }
      showToast(`Đã xóa key "${item.keyName}"!`, 'info');
    }
  };

  // Bật/tắt trạng thái Active trực tiếp trên bảng
  const handleToggleStatus = (id) => {
    const updatedKeys = validationKeys.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    if (onChange) {
      onChange('validationKeys', updatedKeys);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar my-3 space-y-4 pr-1 max-h-[calc(92vh-230px)]">
      {/* Toast thông báo phản hồi nhanh */}
      {feedbackToast && (
        <div
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border shadow-md flex items-center justify-between gap-3 animate-fade-in ${
            feedbackToast.type === 'info'
              ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{feedbackToast.type === 'info' ? 'ℹ️' : '✅'}</span>
            <span>{feedbackToast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackToast(null)}
            className="text-xs hover:opacity-75 cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Khung Thêm / Sửa Key Config */}
      <ValidationKeyInputCard
        keyForm={keyForm}
        formErrors={formErrors}
        editingId={editingId}
        defaultStepCode={defaultStepCode}
        isFoxconn={isFoxconn}
        onFieldChange={handleFieldChange}
        onCancel={handleCancel}
        onSave={handleSaveKey}
      />

      {/* 2. Bảng Danh Sách Khóa Xác Thực */}
      <ValidationKeysTable
        validationKeys={validationKeys}
        editingId={editingId}
        defaultStepCode={defaultStepCode}
        isFoxconn={isFoxconn}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onToggleStatus={handleToggleStatus}
      />

      {/* 3. Khung Giải Nghĩa Logic Cờ Keypart */}
      <ValidationKeysExplanation isFoxconn={isFoxconn} />
    </div>
  );
}
