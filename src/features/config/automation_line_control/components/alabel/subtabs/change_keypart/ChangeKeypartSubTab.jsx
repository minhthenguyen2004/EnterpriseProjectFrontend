import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useTheme from '../../../../../../../hooks/useTheme';
import {
  DB_ACTIVE_MODELS,
  KEYPART_CATEGORIES,
} from '../../../../constants/alabelConstants';
import SnCarrierTextInput from './SnCarrierTextInput';
import ProductTypeEmpNo from './ProductTypeEmpNo';
import KeypartValueInput from './KeypartValueInput';
import ImplementingButton from './ImplementingButton';

/**
 * Sub-Tab 5: Đổi Keypart (Hoán Đổi & Cập Nhật Giá Trị Keypart)
 * Thao tác dữ liệu: sndetaildatas
 *
 * @param {Object} props
 * @param {Object} props.form - State form đổi keypart
 * @param {string} props.form.targetType - 'sn' | 'carrier'
 * @param {string} props.form.targetCode - Mã đối tượng (SN hoặc Carrier RFID)
 * @param {string} props.form.model - Dòng sản phẩm (Model ID)
 * @param {string} props.form.operatorId - Mã nhân viên (Read-only)
 * @param {string} props.form.selectedKeypart - Mã keypart cần thay thế
 * @param {string} props.form.newKeypartValue - Giá trị barcode mới của keypart
 * @param {Function} props.setForm - Setter cập nhật form state
 * @param {boolean} props.isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} props.onExecute - Handler gửi lệnh thực thi ('change_keypart')
 */
export default function ChangeKeypartSubTab({
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
  const currentTargetCode = form.targetCode || form.sn || '';
  const currentModel = form.model || DB_ACTIVE_MODELS[0].id;
  const currentKeypart = form.selectedKeypart || form.keyCategory || KEYPART_CATEGORIES[0].id;
  const currentNewValue = form.newKeypartValue || form.newBarcode || '';

  // Handler: Đổi loại đối tượng (SN vs Carrier)
  const handleTargetTypeChange = (type) => {
    setForm((prev) => ({ ...prev, targetType: type }));
  };

  // Handler: Thay đổi mã đối tượng
  const handleTargetCodeChange = (value) => {
    const updatedForm = {
      ...form,
      targetCode: value,
      sn: value,
    };
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

  // Handler: Chọn Keypart
  const handleKeypartSelect = (value) => {
    setForm((prev) => ({
      ...prev,
      selectedKeypart: value,
      keyCategory: value,
    }));
  };

  // Handler: Thay đổi giá trị barcode mới
  const handleNewValueChange = (value) => {
    setForm((prev) => ({
      ...prev,
      newKeypartValue: value,
      newBarcode: value,
    }));
  };

  // Handler: Làm sạch form
  const handleResetForm = () => {
    setIsManualModel(false);
    setForm({
      targetType: 'sn',
      targetCode: '',
      sn: '',
      model: DB_ACTIVE_MODELS[0].id,
      operatorId,
      selectedKeypart: KEYPART_CATEGORIES[0].id,
      keyCategory: KEYPART_CATEGORIES[0].id,
      newKeypartValue: '',
      newBarcode: '',
    });
  };

  // Kiểm tra điều kiện có thể thực thi
  const canExecute = Boolean(
    currentTargetCode.trim() && currentKeypart && currentNewValue.trim()
  );

  return (
    <div className="space-y-4">
      
      {/* Dòng 1: Ô text mã đối tượng có thể nhập theo SN hoặc Carrier */}
      <SnCarrierTextInput
        isFoxconn={isFoxconn}
        currentTargetType={currentTargetType}
        handleTargetTypeChange={handleTargetTypeChange}
        currentTargetCode={currentTargetCode}
        handleTargetCodeChange={handleTargetCodeChange}
      />

      {/* Dòng 2: Dòng sản phẩm (Dropdown menu) & Mã nhân viên (Read-only) */}
      <ProductTypeEmpNo
        isFoxconn={isFoxconn}
        isManualModel={isManualModel}
        currentModel={currentModel}
        DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
        operatorId={operatorId}
        handleModelSelect={handleModelSelect}
      />

      {/* Dòng 3: Chọn keypart (Dropdown menu) & Nhập giá trị mới (Text input) */}
      <KeypartValueInput
        isFoxconn={isFoxconn}
        selectedKeypart={currentKeypart}
        handleKeypartSelect={handleKeypartSelect}
        KEYPART_CATEGORIES={KEYPART_CATEGORIES}
        newKeypartValue={currentNewValue}
        handleNewValueChange={handleNewValueChange}
      />

      {/* Dòng 4: Cụm nút xác nhận thay đổi giá trị keypart (sndetaildatas) & làm sạch form */}
      <ImplementingButton
        isFoxconn={isFoxconn}
        isExecuting={isExecuting}
        canExecute={canExecute}
        onExecute={onExecute}
        onReset={handleResetForm}
      />
    </div>
  );
}
