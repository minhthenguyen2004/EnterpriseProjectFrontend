import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useTheme from '../../../../../../../hooks/useTheme';
import {
  DB_ACTIVE_MODELS,
  ROUTER_STEPS_LIST,
} from '../../../../constants/alabelConstants';
import SnCarrierTextInput from './SnCarrierTextInput';
import ProductTypeEmpNo from './ProductTypeEmpNo';
import UndoReworkDropdownMenu from './UndoReworkDropdownMenu';
import ImplementingButton from './ImplementingButton';

/**
 * Sub-Tab 3: Clear Undo / Rework (Giải Phóng Cờ Khóa Router)
 * Nghiệp vụ: shared_clearundorework
 *
 * @param {Object} props
 * @param {Object} props.form - State form clear undo
 * @param {string} props.form.targetType - 'sn' | 'carrier'
 * @param {string} props.form.targetCode - Mã đối tượng (SN hoặc mã khay)
 * @param {string} props.form.model - Dòng sản phẩm (Model ID)
 * @param {string} props.form.operatorId - Mã nhân viên (Read-only)
 * @param {string} [props.form.clearStep] - Step router đích cần giải undo/rework tới (tùy chọn)
 * @param {Function} props.setForm - Setter cập nhật form state
 * @param {boolean} props.isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} props.onExecute - Handler gửi lệnh thực thi ('clear_undo')
 */
export default function ClearUndoSubTab({
  form,
  setForm,
  isExecuting,
  onExecute,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Tự động truy xuất mã nhân viên từ tài khoản đăng nhập hiện tại
  const auth = useSelector((state) => state.auth);
  const operatorId = auth?.cardId || auth?.username || 'NV-2026-08819';

  // State theo dõi xem kỹ thuật viên có chủ động chọn Model thủ công hay không
  const [isManualModel, setIsManualModel] = useState(false);

  // Đảm bảo operatorId luôn đồng bộ vào form state
  useEffect(() => {
    if (form.operatorId !== operatorId) {
      setForm((prev) => ({ ...prev, operatorId }));
    }
  }, [operatorId, form.operatorId, setForm]);

  // Hàm tự động giải mã dòng sản phẩm từ mã SN hoặc mã khay Carrier
  const autoDecodeModel = (identifier) => {
    const q = (identifier || '').toUpperCase();
    if (q.includes('GB200') || q.includes('72')) return 'GB200_NVL72';
    if (q.includes('H100')) return 'HGX_H100_SXM5';
    if (q.includes('H200')) return 'HGX_H200_HBM3E';
    if (q.includes('NVLINK') || q.includes('SWITCH')) return 'NVLINK_SWITCH_TRAY';
    if (q.includes('DGX')) return 'DGX_SUPERPOD_B200';
    if (q.includes('SPECTRUM') || q.includes('SN5600')) return 'SPECTRUM4_SN5600';
    if (q.includes('CONNECTX')) return 'CONNECTX7_IB';
    return 'HGX_B200_NVL';
  };

  const currentTargetType = form.targetType || 'sn';
  const currentTargetCode = form.targetCode || form.targetId || '';
  const currentModel = form.model || DB_ACTIVE_MODELS[0].id;
  const currentClearStep = form.clearStep || '';

  // Handler: Đổi loại đối tượng (SN vs Carrier)
  const handleTargetTypeChange = (type) => {
    setForm((prev) => ({ ...prev, targetType: type }));
  };

  // Handler: Thay đổi mã đối tượng
  const handleTargetCodeChange = (value) => {
    const updatedForm = { ...form, targetCode: value, targetId: value };
    if (!isManualModel && value) {
      updatedForm.model = autoDecodeModel(value);
    }
    setForm(updatedForm);
  };

  // Handler: Chọn dòng sản phẩm thủ công
  const handleModelSelect = (value) => {
    setIsManualModel(true);
    setForm((prev) => ({ ...prev, model: value }));
  };

  // Handler: Chọn step router giải undo/rework
  const handleClearStepChange = (value) => {
    setForm((prev) => ({ ...prev, clearStep: value }));
  };

  // Handler: Làm sạch form
  const handleResetForm = () => {
    setIsManualModel(false);
    setForm({
      targetType: 'sn',
      targetCode: '',
      targetId: '',
      model: DB_ACTIVE_MODELS[0].id,
      operatorId,
      clearStep: '',
    });
  };

  const isFormValid = currentTargetCode.trim() !== '';

  return (
    <div className="space-y-4">
      {/* 1. DÒNG ĐẦU TIÊN: MÃ ĐỐI TƯỢNG VỚI TAB CHUYỂN ĐỔI (SN / CARRIER) */}
      <SnCarrierTextInput
        isFoxconn={isFoxconn}
        currentTargetType={currentTargetType}
        handleTargetTypeChange={handleTargetTypeChange}
        currentTargetCode={currentTargetCode}
        handleTargetCodeChange={handleTargetCodeChange}
      />

      {/* 2. DÒNG THỨ HAI: DÒNG SẢN PHẨM & MÃ NHÂN VIÊN (LƯỚI 2 CỘT) */}
      <ProductTypeEmpNo
        isFoxconn={isFoxconn}
        isManualModel={isManualModel}
        currentModel={currentModel}
        DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
        operatorId={operatorId}
        handleModelSelect={handleModelSelect}
      />

      {/* 3. DÒNG THỨ BA: GIẢI UNDO/REWORK ĐẾN STEP (TÙY CHỌN - OPTIONAL) */}
      <UndoReworkDropdownMenu
        isFoxconn={isFoxconn}
        currentClearStep={currentClearStep}
        ROUTER_STEPS_LIST={ROUTER_STEPS_LIST}
        handleClearStepChange={handleClearStepChange}
      />

      {/* 4. DÒNG THỨ TƯ: FOOTER NÚT THỰC THI & LÀM SẠCH FORM */}
      <ImplementingButton
        isExecuting={isExecuting}
        handleResetForm={handleResetForm}
        isFoxconn={isFoxconn}
        isFormValid={isFormValid}
        onExecute={onExecute}
      />
    </div>
  );
}
