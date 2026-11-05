import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useTheme from '../../../../../../../hooks/useTheme';
import { DB_ACTIVE_MODELS } from '../../../../constants/alabelConstants';
import SnCarrierCodeInput from './SnCarrierCodeInput';
import ProductTypeLineInput from './ProductTypeLineInput';
import TargetStepEmpNo from './TargetStepEmpNo';
import TechnicalNote from './TechnicalNote';
import ImplementingButton from './ImplementingButton';

/**
 * Sub-Tab 4: Bù SN_Details (Nạp Bù Seri Thủ Công)
 * Nghiệp vụ: Shared_ManualInsertSN qua Stored Procedure [AutoLine].[Shared_ManualInsertSn]
 *
 * @param {Object} props
 * @param {Object} props.form - State form nạp bù seri
 * @param {string} props.form.sn - Mã Serial Number nạp bù
 * @param {string} props.form.carrierCode - Mã Carrier Code (khay RFID/Pallet)
 * @param {string} props.form.model - Dòng sản phẩm (Model ID)
 * @param {string} props.form.line - Dây chuyền sản xuất
 * @param {string} props.form.targetStep - Bước router mục tiêu nạp bù tới
 * @param {string} props.form.operatorId - Mã nhân viên (Read-only)
 * @param {Function} props.setForm - Setter cập nhật form state
 * @param {boolean} props.isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} props.onExecute - Handler gửi lệnh thực thi ('compensate_detail')
 */
export default function CompensateSnDetailSubTab({
  form = {},
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
    if (form.operatorId !== operatorId && setForm) {
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

  const currentSn = form.sn || '';
  const currentCarrierCode = form.carrierCode || '';
  const currentModel = form.model || DB_ACTIVE_MODELS[0].id;
  const currentLine = form.line || 'LINE-01-SMT';
  const currentTargetStep = form.targetStep || '030';

  // Handler: Thay đổi Serial Number
  const handleSnChange = (value) => {
    const updatedForm = { ...form, sn: value };
    if (!isManualModel && value) {
      updatedForm.model = autoDecodeModel(value);
    }
    setForm(updatedForm);
  };

  // Handler: Thay đổi Carrier Code
  const handleCarrierCodeChange = (value) => {
    const updatedForm = { ...form, carrierCode: value };
    if (!isManualModel && !form.sn && value) {
      updatedForm.model = autoDecodeModel(value);
    }
    setForm(updatedForm);
  };

  // Handler: Chọn dòng sản phẩm thủ công
  const handleModelSelect = (value) => {
    setIsManualModel(true);
    setForm((prev) => ({ ...prev, model: value }));
  };

  // Handler: Thay đổi dây chuyền
  const handleLineChange = (value) => {
    setForm((prev) => ({ ...prev, line: value }));
  };

  // Handler: Thay đổi Target Step
  const handleTargetStepChange = (value) => {
    setForm((prev) => ({ ...prev, targetStep: value }));
  };

  // Handler: Làm sạch form
  const handleResetForm = () => {
    setIsManualModel(false);
    setForm({
      sn: '',
      carrierCode: '',
      model: DB_ACTIVE_MODELS[0].id,
      line: 'LINE-01-SMT',
      targetStep: '030',
      operatorId,
    });
  };

  const isFormValid =
    currentSn.trim() !== '' &&
    currentCarrierCode.trim() !== '' &&
    currentLine.trim() !== '' &&
    currentTargetStep.trim() !== '';

  return (
    <div className="space-y-4">

      {/* 1. DÒNG ĐẦU TIÊN: MÃ SERIAL NUMBER & MÃ CARRIER CODE (LƯỚI 2 CỘT) */}
      <SnCarrierCodeInput
        currentSn={currentSn} 
        isFoxconn={isFoxconn}
        handleSnChange={handleSnChange}
        handleCarrierCodeChange={handleCarrierCodeChange}
        currentCarrierCode={currentCarrierCode}
      />

      {/* 2. DÒNG THỨ HAI: DÒNG SẢN PHẨM & DÂY CHUYỀN SẢN XUẤT (LƯỚI 2 CỘT) */}
      <ProductTypeLineInput
        isManualModel={isManualModel}
        currentModel={currentModel}
        isFoxconn={isFoxconn}
        handleModelSelect={handleModelSelect} 
        DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
        currentLine={currentLine} 
        handleLineChange={handleLineChange}
      />

      {/* 3. DÒNG THỨ BA: TARGET STEP & MÃ NHÂN VIÊN THỰC THI (LƯỚI 2 CỘT) */}
      <TargetStepEmpNo
        currentTargetStep={currentCarrierCode}
        handleTargetStepChange={handleTargetStepChange}
        operatorId={operatorId}
      />

      {/* 4. KHUNG THÔNG BÁO LƯU Ý KỸ THUẬT */}
      <TechnicalNote
        isFoxconn={isFoxconn}
      />

      {/* 5. DÒNG THỨ NĂM: FOOTER NÚT THỰC THI & LÀM SẠCH FORM */}
      <ImplementingButton
        isFoxconn={isFoxconn}
        isExecuting={isExecuting}
        handleResetForm={handleResetForm}
        isFormValid={isFormValid}
        onExecute={onExecute}
      />
    </div>
  );
}
