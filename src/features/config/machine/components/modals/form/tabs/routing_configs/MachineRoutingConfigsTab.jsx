import { useState } from 'react';
import StepRoutingConfigCard from './StepRoutingConfigCard';
import TwinStepInputCard from './TwinStepInputCard';
import RoutingConfigsTable from './RoutingConfigsTable';
import RoutingExplanation from './RoutingExplanation';
import { DEFAULT_MACHINE_ROUTING_CONFIGS, DEFAULT_STEP_ROUTING } from '../../constants/formModalConstants';

/**
 * Tab 3: Routing Configs (Cấu hình định tuyến & trạm song song)
 * Quản lý Step Routing (Main Key, Mode) và danh sách Twin Steps (Allow Swap, Picker)
 */
export default function MachineRoutingConfigsTab({
  formData = {},
  onChange,
  isFoxconn = false
}) {
  // Trích xuất thông tin cơ bản từ 1/3 cột trái
  const defaultProduct = formData.productName || 'NVIDIA HGX B200';
  const defaultLine = formData.line || formData.lineName || 'Line 01 - High-Speed SMT';
  const defaultStepCode = (formData.step || 'ST01').split(' - ')[0].trim() || 'ST01';

  // Lấy danh sách gợi ý key từ validationKeys
  const suggestedKeys = Array.isArray(formData.validationKeys)
    ? formData.validationKeys.map(k => k.keyName).filter(Boolean)
    : ['BARCODE_MAIN', 'MAC_ADDRESS'];

  // State cấu hình bước công đoạn (Step Routing)
  const [stepRoutingState, setStepRoutingState] = useState({
    mainKey: formData.stepRouting?.mainKey || DEFAULT_STEP_ROUTING.mainKey,
    mode: formData.stepRouting?.mode !== undefined ? formData.stepRouting.mode : DEFAULT_STEP_ROUTING.mode
  });
  const [stepRoutingErrors, setStepRoutingErrors] = useState({});

  // State danh sách Routing Configs (Twin Steps)
  const routingConfigs = Array.isArray(formData.routingConfigs)
    ? formData.routingConfigs
    : DEFAULT_MACHINE_ROUTING_CONFIGS;

  // State form thêm/sửa Twin Step
  const initialTwinForm = {
    twinStep: '',
    allowCarrierSwap: false,
    isPicker: false
  };

  const [twinStepForm, setTwinStepForm] = useState(initialTwinForm);
  const [editingId, setEditingId] = useState(null);
  const [twinStepErrors, setTwinStepErrors] = useState({});
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Hiển thị toast thông báo phản hồi
  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3000);
  };

  // 1. Handlers cho Step Routing Config (Khung 1)
  const handleStepFieldChange = (field, value) => {
    setStepRoutingState(prev => ({ ...prev, [field]: value }));
    if (stepRoutingErrors[field]) {
      setStepRoutingErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSaveStepConfig = () => {
    const errors = {};
    if (!stepRoutingState.mainKey?.trim()) {
      errors.mainKey = 'Main Key không được để trống';
    }

    if (Object.keys(errors).length > 0) {
      setStepRoutingErrors(errors);
      return;
    }

    const updatedStepRouting = {
      mainKey: stepRoutingState.mainKey.trim().toUpperCase(),
      mode: Number(stepRoutingState.mode)
    };

    if (onChange) {
      onChange('stepRouting', updatedStepRouting);
    }
    showToast(
      `Đã lưu cấu hình công đoạn: Main Key "${updatedStepRouting.mainKey}", Mode ${updatedStepRouting.mode}!`,
      'success'
    );
  };

  // 2. Handlers cho Twin Step Config (Khung 2)
  const handleTwinFieldChange = (field, value) => {
    setTwinStepForm(prev => ({ ...prev, [field]: value }));
    if (twinStepErrors[field]) {
      setTwinStepErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancelTwinStep = () => {
    setTwinStepForm(initialTwinForm);
    setEditingId(null);
    setTwinStepErrors({});
  };

  const handleSaveTwinStep = () => {
    const errors = {};
    const parsedNumber = Number(twinStepForm.twinStep);

    if (!twinStepForm.twinStep || isNaN(parsedNumber) || parsedNumber <= 0) {
      errors.twinStep = 'Twin Step phải là một số nguyên dương hợp lệ (vd: 10, 11)';
    } else {
      // Kiểm tra trùng lặp
      const isDuplicate = routingConfigs.some(
        item => item.id !== editingId && Number(item.twinStep) === parsedNumber
      );
      if (isDuplicate) {
        errors.twinStep = `Trạm song song "${parsedNumber}" đã tồn tại trong danh sách`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setTwinStepErrors(errors);
      return;
    }

    let updatedConfigs;
    if (editingId) {
      // Đang sửa
      updatedConfigs = routingConfigs.map(item =>
        item.id === editingId
          ? {
              ...item,
              twinStep: parsedNumber,
              mode: stepRoutingState.mode,
              allowCarrierSwap: !!twinStepForm.allowCarrierSwap,
              isPicker: !!twinStepForm.isPicker
            }
          : item
      );
      showToast(`Đã cập nhật trạm song song "${parsedNumber}" thành công!`, 'success');
    } else {
      // Thêm mới
      const newItem = {
        id: Date.now(),
        product: defaultProduct,
        line: defaultLine,
        step: defaultStepCode,
        twinStep: parsedNumber,
        mode: stepRoutingState.mode,
        allowCarrierSwap: !!twinStepForm.allowCarrierSwap,
        isPicker: !!twinStepForm.isPicker,
        isActive: true
      };
      updatedConfigs = [...routingConfigs, newItem];
      showToast(`Đã thêm trạm song song "${parsedNumber}" vào danh sách!`, 'success');
    }

    if (onChange) {
      onChange('routingConfigs', updatedConfigs);
    }

    handleCancelTwinStep();
  };

  const handleEditTwinStep = (item) => {
    setEditingId(item.id);
    setTwinStepForm({
      twinStep: item.twinStep !== undefined ? String(item.twinStep) : '',
      allowCarrierSwap: !!item.allowCarrierSwap,
      isPicker: !!item.isPicker
    });
    setTwinStepErrors({});
  };

  const handleDeleteTwinStep = (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa cấu hình trạm song song "${item.twinStep}" không?`)) {
      const updatedConfigs = routingConfigs.filter(r => r.id !== item.id);
      if (onChange) {
        onChange('routingConfigs', updatedConfigs);
      }
      if (editingId === item.id) {
        handleCancelTwinStep();
      }
      showToast(`Đã xóa cấu hình trạm song song "${item.twinStep}"!`, 'info');
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

      {/* 1. Khung Cấu hình Bước / Công đoạn (Step Routing Settings) */}
      <StepRoutingConfigCard
        stepRoutingState={stepRoutingState}
        errors={stepRoutingErrors}
        isFoxconn={isFoxconn}
        suggestedKeys={suggestedKeys}
        onFieldChange={handleStepFieldChange}
        onSave={handleSaveStepConfig}
      />

      {/* 2. Khung Thiết lập Trạm Song song (Add Twin Step Config) */}
      <TwinStepInputCard
        twinStepForm={twinStepForm}
        errors={twinStepErrors}
        editingId={editingId}
        isFoxconn={isFoxconn}
        onFieldChange={handleTwinFieldChange}
        onCancel={handleCancelTwinStep}
        onSave={handleSaveTwinStep}
      />

      {/* 3. Bảng Danh Sách Cấu Hình Định Tuyến */}
      <RoutingConfigsTable
        routingConfigs={routingConfigs}
        editingId={editingId}
        currentMode={stepRoutingState.mode}
        defaultStepCode={defaultStepCode}
        defaultProduct={defaultProduct}
        defaultLine={defaultLine}
        isFoxconn={isFoxconn}
        onEditClick={handleEditTwinStep}
        onDeleteClick={handleDeleteTwinStep}
      />

      {/* 4. Khung Giải Nghĩa & Ý Nghĩa Nghiệp Vụ */}
      <RoutingExplanation isFoxconn={isFoxconn} />
    </div>
  );
}
