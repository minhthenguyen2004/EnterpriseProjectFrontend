import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useTheme from '../../../../../../../../hooks/useTheme';
import {
  DB_ACTIVE_MODELS,
  ROUTER_STEPS_LIST,
} from '../../../../../constants/alabelConstants';
import IdentifyingInput from './IdentifyingInput';
import ProductTypeEmpCode from './ProductTypeEmpCode';
import StepChoice from './StepChoice';
import ImplementingButton from './ImplementingButton';


/**
 * Sub-Tab 2: Transfer (Điều Chuyển Khay Carrier & Router Step)
 * - Các trường text: Mã Serial Number, Mã khay cũ, Mã khay mới
 * - Dòng sản phẩm (Model): Dropdown menu có khả năng tự động giải mã từ mã đối tượng
 * - Mã nhân viên: Tự động truy xuất sau khi đăng nhập (Read-only / Disabled 🔒)
 * - Step chuyển sang: Dropdown menu router step
 * - Nút hành động: [Thực thi chuyển khay]
 */


export default function TransferSubTab({
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

  // State theo dõi xem người dùng có can thiệp chọn Model thủ công hay không
  const [isManualModel, setIsManualModel] = useState(false);

  // Đảm bảo operatorId được đồng bộ vào form state
  useEffect(() => {
    if (form.operatorId !== operatorId) {
      setForm((prev) => ({ ...prev, operatorId }));
    }
  }, [operatorId, form.operatorId, setForm]);

  // Hàm tự động giải mã model từ mã SN hoặc mã khay
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

  const handleSnChange = (value) => {
    const updatedForm = { ...form, sn: value };
    if (!isManualModel && value) {
      updatedForm.model = autoDecodeModel(value);
    }
    setForm(updatedForm);
  };

  const handleModelSelect = (value) => {
    setIsManualModel(true);
    setForm((prev) => ({ ...prev, model: value }));
  };

  const handleResetForm = () => {
    setIsManualModel(false);
    setForm({
      sn: '',
      oldCarrier: '',
      newCarrier: '',
      model: DB_ACTIVE_MODELS[0].id,
      operatorId,
      targetStep: '040',
    });
  };

  const currentSn = form.sn || '';
  const currentOldCarrier = form.oldCarrier || '';
  const currentNewCarrier = form.newCarrier || '';
  const currentModel = form.model || DB_ACTIVE_MODELS[0].id;
  const currentTargetStep = form.targetStep || '040';

  const isFormValid =
    currentSn.trim() !== '' &&
    currentOldCarrier.trim() !== '' &&
    currentNewCarrier.trim() !== '' &&
    currentOldCarrier.trim().toUpperCase() !== currentNewCarrier.trim().toUpperCase();

  return (
    <div className="space-y-4">
      {/* 1. CÁC TRƯỜNG TEXT ĐỊNH DANH (SN, Khay cũ, Khay mới) */}
      <IdentifyingInput
        isFoxconn={isFoxconn}
        currentSn={currentSn}
        currentOldCarrier={currentOldCarrier}
        currentNewCarrier={currentNewCarrier}
      />

      {/* 2. DÒNG SẢN PHẨM & MÃ NHÂN VIÊN (Lưới 2 cột) */}
      <ProductTypeEmpCode
         isFoxconn={isFoxconn} 
         currentModel={currentModel}
         handleModelSelect={handleModelSelect}
         DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
         operatorId={operatorId}
         isManualModel={isManualModel}
      />

      {/* 3. STEP CHUYỂN SANG (Dropdown Menu) */}
      <StepChoice
        isFoxconn={isFoxconn}
        currentTargetStep={currentTargetStep}
        ROUTER_STEPS_LIST={ROUTER_STEPS_LIST}
      />

      {/* 4. CỤM NÚT HÀNH ĐỘNG THỰC THI CHUYỂN KHAY */}
      <ImplementingButton
        isFoxconn={isFoxconn}
        handleResetForm={handleResetForm}
        isExecuting={isExecuting}
        isFormValid={isFormValid}
        onExecute={onExecute}
      />
    </div>
  );
}
