import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useTheme from '../../../../../../../hooks/useTheme';
import {
  DB_ACTIVE_MODELS,
  ROUTER_STEPS_LIST,
} from '../../../../constants/alabelConstants';
import SnCarrierBasedInput from './SnCarrierBasedInput';
import ProductTypeEmployeeCodeInputs from './ProductTypeEmployeeCodeInputs';
import UndoResetSubTab from './UndoResetSubTab';

/**
 * Sub-Tab 1: Undo / Reset (Hoàn Tác & Reset Chu Kỳ)
 * - Dòng 1: Nhập mã đối tượng (Tab chuyển đổi SN / Carrier + Text Input)
 * - Dòng 2: Lưới 2 cột (Dropdown Dòng sản phẩm & Mã nhân viên Read-only tự truy xuất)
 * - 2 Tab con: [Hoàn tác] và [Reset chu kỳ]
 *   + Khi chọn [Hoàn tác]: Dropdown chọn step mục tiêu + Nút [Thực thi hoàn tác về Step {targetStep}]
 *   + Khi chọn [Reset chu kỳ]: Nút [Thực thi reset chu kỳ về Step 0]
 */
export default function UndoResetFunction({
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

  // Đảm bảo operatorId được đồng bộ vào form state
  useEffect(() => {
    if (form.operatorId !== operatorId) {
      setForm((prev) => ({ ...prev, operatorId }));
    }
  }, [operatorId, form.operatorId, setForm]);

  const targetType = form.targetType || 'sn';
  const subMode = form.subMode || 'undo';
  const targetStep = form.targetStep || '020';
  const targetCode = form.targetCode !== undefined ? form.targetCode : (form.sn || '');
  const selectedModel = form.model || DB_ACTIVE_MODELS[0].id;

  const handleTargetTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      targetType: type,
      targetCode: type === 'carrier' ? 'CARRIER-RFID-8819' : 'SN8839210492-NV',
      sn: type === 'carrier' ? 'CARRIER-RFID-8819' : 'SN8839210492-NV',
    }));
  };

  const handleSubModeChange = (mode) => {
    setForm((prev) => ({
      ...prev,
      subMode: mode,
    }));
  };

  const handleResetForm = () => {
    setForm({
      targetType: 'sn',
      targetCode: '',
      sn: '',
      model: DB_ACTIVE_MODELS[0].id,
      operatorId,
      subMode: 'undo',
      targetStep: '020',
      station: 'ST03-SMT-A',
    });
  };

  return (
    <div className="space-y-4">
      {/* DÒNG 1: NHẬP MÃ ĐỐI TƯỢNG (Tab chuyển đổi SN / Carrier) */}
      <SnCarrierBasedInput
        isFoxconn={isFoxconn}
        handleTargetTypeChange={handleTargetTypeChange}
        targetType={targetType}
        targetCode={targetCode}
      />

      {/* DÒNG 2: DÒNG SẢN PHẨM & MÃ NHÂN VIÊN (Lưới 2 cột) */}
      <ProductTypeEmployeeCodeInputs
        isFoxconn={isFoxconn}
        selectedModel={selectedModel}
        DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
        operatorId={operatorId}
      />


      {/* DÒNG 3: 2 TAB NGHIỆP VỤ (Hoàn tác vs Reset chu kỳ) */}
      <UndoResetSubTab
        targetStep={targetStep}
        handleResetForm={handleResetForm}
        isFoxconn={isFoxconn}
        isExecuting={isExecuting}
        onExecute={onExecute}
        handleSubModeChange={handleSubModeChange}
        subMode={subMode}
        targetCode={targetCode}
      />
    </div>
  );
}
