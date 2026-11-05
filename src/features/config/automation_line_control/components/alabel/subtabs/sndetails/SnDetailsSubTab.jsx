import { useState } from 'react';
import useTheme from '../../../../../../../hooks/useTheme';
import { DB_ACTIVE_MODELS } from '../../../../constants/alabelConstants';
import SnCarrierTextInput from './SnCarrierTextInput';
import ModelTopLimitSelect from './ModelTopLimitSelect';
import ImplementingButton from './ImplementingButton';
import SnDetailsTable from './SnDetailsTable';

/**
 * Sub-Tab 6: SNDetails (Tra Cứu Bảng Hồ Sơ Dữ Liệu sndetails)
 *
 * @param {Object} props
 * @param {Object} [props.form] - Form state chứa targetType, targetCode, model, topLimit
 * @param {Function} [props.setForm] - Setter cập nhật form state
 * @param {Array<Object>} props.detailsList - Danh sách bản ghi thuộc tính chi tiết
 * @param {boolean} props.isExecuting - Trạng thái loading truy vấn
 * @param {Function} [props.onExecute] - Handler thực thi tra cứu ('sndetails')
 * @param {Function} [props.onRefresh] - Handler làm mới dữ liệu
 */
export default function SnDetailsSubTab({
  form,
  setForm,
  detailsList = [],
  isExecuting,
  onExecute,
  onRefresh,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // State dự phòng nếu form chưa được truyền từ cấp trên
  const [localForm, setLocalForm] = useState({
    targetType: 'sn',
    targetCode: 'SN8839210492-NV',
    model: '',
    topLimit: 100,
  });

  const activeForm = form || localForm;
  const updateForm = setForm || setLocalForm;

  const currentTargetType = activeForm.targetType || 'sn';
  const currentTargetCode = activeForm.targetCode || activeForm.sn || '';
  const currentModel = activeForm.model || '';
  const currentTopLimit = activeForm.topLimit || 100;

  // Handler: Đổi loại đối tượng (SN vs Carrier)
  const handleTargetTypeChange = (type) => {
    updateForm((prev) => ({ ...prev, targetType: type }));
  };

  // Handler: Thay đổi mã đối tượng
  const handleTargetCodeChange = (value) => {
    updateForm((prev) => ({ ...prev, targetCode: value, sn: value }));
  };

  // Handler: Thay đổi dòng sản phẩm
  const handleModelChange = (model) => {
    updateForm((prev) => ({ ...prev, model }));
  };

  // Handler: Thay đổi giới hạn bản ghi (Top Limit)
  const handleTopLimitChange = (topLimit) => {
    updateForm((prev) => ({ ...prev, topLimit }));
  };

  // Handler: Làm sạch form
  const handleReset = () => {
    updateForm({
      targetType: 'sn',
      targetCode: '',
      sn: '',
      model: '',
      topLimit: 100,
    });
  };

  // Điều kiện kích hoạt tra cứu
  const canExecute = Boolean(currentTargetCode.trim());

  // Thực thi tra cứu
  const handleExecuteAction = () => {
    if (onExecute) {
      onExecute('sndetails');
    } else if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="space-y-4">
      {/* Dòng 1: Ô text nhập có thể lựa chọn giữa mã SN or mã Carrier */}
      <SnCarrierTextInput
        isFoxconn={isFoxconn}
        currentTargetType={currentTargetType}
        handleTargetTypeChange={handleTargetTypeChange}
        currentTargetCode={currentTargetCode}
        handleTargetCodeChange={handleTargetCodeChange}
      />

      {/* Dòng 2: Dropdown menu chọn dòng sản phẩm (tùy chọn) & Dropdown menu giới hạn bản ghi (Top Limit) */}
      <ModelTopLimitSelect
        isFoxconn={isFoxconn}
        currentModel={currentModel}
        handleModelChange={handleModelChange}
        DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
        currentTopLimit={currentTopLimit}
        handleTopLimitChange={handleTopLimitChange}
      />

      {/* Dòng 3: Nút Thực thi tra cứu bảng sndetails & nút làm sạch */}
      <ImplementingButton
        isFoxconn={isFoxconn}
        isExecuting={isExecuting}
        canExecute={canExecute}
        onExecute={handleExecuteAction}
        onReset={handleReset}
      />

      {/* Dòng 4: Bảng hiển thị kết quả chi tiết đa cột */}
      <SnDetailsTable
        isFoxconn={isFoxconn}
        detailsList={detailsList}
        isExecuting={isExecuting}
      />
    </div>
  );
}
